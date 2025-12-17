using HR.API.Data;
using HR.API.DTOs;
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
    public class AttendanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AttendanceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> ClockIn([FromBody] AttendanceRequestDto request)
        {
            if (request.QrContent != "HR_ACCESS_2024")
            {
                return BadRequest(new { Message = "Invalid QR Code" });
            }

            var employee = await _context.Employees.FindAsync(request.EmployeeId);
            if (employee == null)
            {
                return NotFound(new { Message = "Employee not found" });
            }

            var today = DateTime.Today;
            var existing = await _context.Attendances
                .Where(a => a.EmployeeId == request.EmployeeId && a.Date.Date == today && a.Shift == request.Shift)
                .FirstOrDefaultAsync();

            if (existing != null)
            {
                return BadRequest(new { Message = "Already clocked in for this shift today." });
            }

            var now = DateTime.Now;
            var time = now.TimeOfDay;
            string status = "Accepted";
            bool isLate = false;
            string notes = "";

            // Time Validation Logic
            // Morning: Limit 09:00:00
            // Evening: Limit 17:00:00 (5 PM) 
            
            TimeSpan morningLimit = new TimeSpan(9, 30, 0); 
            TimeSpan eveningLimit = new TimeSpan(18, 0, 0); 

            if (request.Shift == "Morning")
            {
                if (time > morningLimit)
                {
                    status = "Rejected";
                    notes = "Arrived after 09:30 AM";
                }
            }
            else if (request.Shift == "Evening")
            {
                if (time > eveningLimit)
                {
                    status = "Rejected";
                    notes = "Arrived after 06:00 PM";
                }
            }

            var attendance = new Attendance
            {
                EmployeeId = request.EmployeeId,
                Date = now,
                Time = time,
                Shift = request.Shift,
                Status = status,
                IsLate = status == "Rejected", 
                Notes = notes
            };


            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                Message = status == "Accepted" ? "Check-in Successful" : "Check-in Rejected (Late)", 
                Status = status,
                Time = time.ToString(@"hh\:mm")
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAttendances([FromQuery] DateTime? date, [FromQuery] int? employeeId)
        {
            var query = _context.Attendances.Include(a => a.Employee).AsQueryable();

            if (date.HasValue)
            {
                query = query.Where(a => a.Date.Date == date.Value.Date);
            }

            if (employeeId.HasValue)
            {
                query = query.Where(a => a.EmployeeId == employeeId);
            }

            var list = await query.OrderByDescending(a => a.Date).ThenByDescending(a => a.Time).ToListAsync();

            return Ok(list);
        }
    }
}
