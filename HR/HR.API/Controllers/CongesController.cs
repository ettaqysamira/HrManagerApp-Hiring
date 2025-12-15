using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CongesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CongesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Conge>>> GetConges()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (role == "HR")
            {
                return await _context.Conges
                    .Include(c => c.Employee)
                    .OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();
            }
            else
            {
                if (int.TryParse(userIdStr, out int userId))
                {
                    return await _context.Conges
                        .Where(c => c.EmployeeId == userId)
                        .OrderByDescending(c => c.CreatedAt)
                        .ToListAsync();
                }
                return Unauthorized();
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Conge>> PostConge(HR.API.DTOs.CreateCongeDto createCongeDto)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            if (createCongeDto.EndDate < createCongeDto.StartDate)
            {
                return BadRequest("La date de fin doit être après la date de début.");
            }

            var conge = new Conge
            {
                EmployeeId = userId,
                LeaveType = createCongeDto.LeaveType,
                StartDate = createCongeDto.StartDate,
                EndDate = createCongeDto.EndDate,
                Reason = createCongeDto.Reason,
                HalfDay = createCongeDto.HalfDay,
                Duration = createCongeDto.Duration,
                Status = "En attente",
                CreatedAt = DateTime.UtcNow
            };

            _context.Conges.Add(conge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConges", new { id = conge.Id }, conge);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "HR")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
        {
            var conge = await _context.Conges.FindAsync(id);

            if (conge == null)
            {
                return NotFound();
            }

            conge.Status = request.Status;
            conge.DecisionDate = DateTime.UtcNow;

            var notification = new Notification
            {
                UserId = conge.EmployeeId,
                Title = request.Status == "Approuvé" ? "Congé Approuvé" : "Congé Refusé",
                Message = request.Status == "Approuvé" 
                    ? $"Votre demande de congé du {conge.StartDate:dd/MM/yyyy} au {conge.EndDate:dd/MM/yyyy} a été acceptée." 
                    : $"Votre demande de congé du {conge.StartDate:dd/MM/yyyy} au {conge.EndDate:dd/MM/yyyy} a été refusée.",
                CreatedAt = DateTime.UtcNow,
                IsRead = false
            };
            _context.Notifications.Add(notification);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class UpdateStatusRequest
        {
            public string Status { get; set; } = string.Empty;
        }
    }
}
