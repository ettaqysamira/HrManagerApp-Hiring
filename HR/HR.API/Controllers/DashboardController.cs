using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var totalEmployees = await _context.Employees.CountAsync();
            var activeContracts = await _context.Contracts.CountAsync(c => c.Status == "Active");
            var pendingLeaveRequests = await _context.Conges.CountAsync(c => c.Status == "En attente");
            var openPositions = await _context.OffresEmploi.CountAsync(o => o.Status == "Open");
            
            var thirtyDaysFromNow = DateTime.UtcNow.AddDays(30);
            var expiringContracts = await _context.Contracts.CountAsync(c => c.EndDate != null && c.EndDate <= thirtyDaysFromNow && c.Status == "Active");
            
            var totalApplications = await _context.Candidats.CountAsync();
            
            // Absence Rate calculation: (Rejected Presences / Total Presences) for the last 30 days
            var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
            var totalPresences = await _context.Presences.CountAsync(p => p.Date >= thirtyDaysAgo);
            var rejectedPresences = await _context.Presences.CountAsync(p => p.Date >= thirtyDaysAgo && p.Status == "Rejected");
            
            double absenceRate = 0;
            if (totalPresences > 0)
            {
                absenceRate = (double)rejectedPresences / totalPresences * 100;
            }

            return Ok(new
            {
                TotalEmployees = totalEmployees,
                ActiveContracts = activeContracts,
                PendingLeaveRequests = pendingLeaveRequests,
                OpenPositions = openPositions,
                ExpiringContracts = expiringContracts,
                TotalApplications = totalApplications,
                AbsenceRate = Math.Round(absenceRate, 1)
            });
        }
    }
}
