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
    public class PresenceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PresenceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> ClockIn([FromBody] PresenceRequestDto request)
        {
            var qrContent = request.QrContent?.Trim();
            if (string.IsNullOrEmpty(qrContent))
            {
                return BadRequest(new { message = "Le contenu du code QR est vide." });
            }

            Console.WriteLine($"[DEBUG] ClockIn Attempt - QR Content: '{qrContent}'");

            var normalizedContent = qrContent.ToLowerInvariant().Replace(" ", "");

            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => 
                    (e.EmployeeId != null && e.EmployeeId.ToLower().Replace(" ", "") == normalizedContent) ||
                    (e.Login != null && e.Login.ToLower().Replace(" ", "") == normalizedContent) ||
                    (e.Id.ToString() == qrContent)
                );

            if (employee == null)
            {
                Console.WriteLine($"[DEBUG] Employee not found for QR: '{qrContent}'");
                return BadRequest(new { message = "Code QR invalide ou employé non reconnu." });
            }
            
            Console.WriteLine($"[DEBUG] Employee Found: {employee.FirstName} {employee.LastName} (ID: {employee.Id})");

            var today = DateTime.Today;
            var existing = await _context.Presences
                .Where(a => a.EmployeeId == employee.Id && a.Date.Date == today)
                .FirstOrDefaultAsync();

            if (existing != null && existing.Status != "Absent")
            {
                return BadRequest(new { message = "Vous avez déjà pointé pour aujourd'hui." });
            }

            var now = DateTime.Now;
            var time = now.TimeOfDay;
            
            // TEMPORARY TEST WINDOW: 13:00 to 15:00 (Original: 08:00 to 09:00)
            TimeSpan startLimit = new TimeSpan(04, 0, 0);
            TimeSpan endLimit = new TimeSpan(13, 0, 0);

            string status;
            string notes = "";
            bool isLate = false;

            if (time < startLimit)
            {
                status = "Rejected";
                notes = "Trop tôt (Avant 13:00)";
            }
            else if (time <= endLimit)
            {
                status = "Accepted";
                notes = "Arrivée à l'heure";
            }
            else
            {
                status = "Rejected";
                isLate = true;
                notes = "Retard (Après 15:00)";
            }

            if (existing != null && existing.Status == "Absent")
            {
                existing.Time = time;
                existing.Status = status;
                existing.IsLate = isLate;
                existing.Notes = notes + " (Pointé après marquage absence)";
                _context.Presences.Update(existing);
            }
            else
            {
                var attendance = new Presence
                {
                    EmployeeId = employee.Id,
                    Date = now,
                    Time = time,
                    Shift = "Morning",
                    Status = status,
                    IsLate = isLate,
                    Notes = notes
                };
                _context.Presences.Add(attendance);
            }

            await _context.SaveChangesAsync();

            return Ok(new 
            { 
                message = status == "Accepted" ? "Pointage réussi !" : $"Pointage refusé : {notes}", 
                status = status,
                time = time.ToString(@"hh\:mm"),
                employeeName = $"{employee.FirstName} {employee.LastName}"
            });
        }

        private async Task FillAbsencesForDate(DateTime date)
        {
            var targetDate = date.Date;
            TimeSpan endLimit = new TimeSpan(15, 0, 0);

            if (targetDate < DateTime.Today || (targetDate == DateTime.Today && DateTime.Now.TimeOfDay > endLimit))
            {
                var employees = await _context.Employees.ToListAsync();
                var presencesToday = await _context.Presences
                    .Where(p => p.Date.Date == targetDate)
                    .Select(p => p.EmployeeId)
                    .ToListAsync();

                var missingEmployees = employees.Where(e => !presencesToday.Contains(e.Id)).ToList();

                if (missingEmployees.Any())
                {
                    foreach (var emp in missingEmployees)
                    {
                        _context.Presences.Add(new Presence
                        {
                            EmployeeId = emp.Id,
                            Date = targetDate,
                            Time = endLimit, 
                            Shift = "Morning",
                            Status = "Absent",
                            IsLate = false,
                            Notes = "Absence automatique (non pointé)"
                        });
                    }
                    await _context.SaveChangesAsync();
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPresences([FromQuery] DateTime? date, [FromQuery] int? employeeId)
        {
            if (date.HasValue)
            {
                await FillAbsencesForDate(date.Value);
            }
            else
            {
                await FillAbsencesForDate(DateTime.Today);
            }

            var query = _context.Presences.Include(a => a.Employee).AsQueryable();

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
