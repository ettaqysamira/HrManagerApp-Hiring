using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Authorization;
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
            var openPositions = await _context.OffresEmploi
                .CountAsync(o => o.Status.ToLower() == "open" || o.Status.ToLower() == "ouverte");
            
            var thirtyDaysFromNow = DateTime.UtcNow.AddDays(30);
            var expiringContracts = await _context.Contracts.CountAsync(c => c.EndDate != null && c.EndDate <= thirtyDaysFromNow && c.Status == "Active");
            
            var totalApplications = await _context.Candidats.CountAsync();
            var interviewsPlanned = await _context.Candidats.CountAsync(c => c.Status == "Accepté");
            var rejectedApplications = await _context.Candidats.CountAsync(c => c.Status == "Rejeté");
            var newApplications = totalApplications - interviewsPlanned - rejectedApplications;
            
            try {
                for (int i = 0; i < 7; i++) {
                    await FillAbsencesForDate(DateTime.Today.AddDays(-i));
                }
            } catch {}

            var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
            
            double absenceRate = 0;
            if (totalEmployees > 0)
            {
                var totalRecorded = await _context.Presences.CountAsync(p => p.Date >= thirtyDaysAgo);
                var absentOrRejected = await _context.Presences.CountAsync(p => p.Date >= thirtyDaysAgo && (p.Status == "Rejected" || p.Status == "Absent"));
                
                if (totalRecorded > 0)
                {
                    absenceRate = (double)absentOrRejected / totalRecorded * 100;
                }
            }

            var expiringSoon = await _context.Contracts
                .Include(c => c.Employee)
                .Where(c => c.EndDate != null && c.EndDate <= thirtyDaysFromNow && c.Status == "Active")
                .Select(c => new {
                    Title = $"Contrat de {c.Employee.FirstName} {c.Employee.LastName} expire bientôt",
                    Description = $"{c.Type} - Dépt. {c.Employee.Department} - Fin le {c.EndDate.Value.ToShortDateString()}",
                    Priority = c.EndDate <= DateTime.UtcNow.AddDays(7) ? "high" : "medium",
                    DueDate = (c.EndDate != null) ? c.EndDate.Value.ToShortDateString() : "",
                    Category = "contract"
                })
                .ToListAsync();

            var pendingLeaves = await _context.Conges
                .Include(c => c.Employee)
                .Where(c => c.Status == "En attente")
                .Select(c => new {
                    Title = $"Demande de congé - {c.Employee.FirstName} {c.Employee.LastName}",
                    Description = $"{c.LeaveType} du {c.StartDate.ToShortDateString()} au {c.EndDate.ToShortDateString()}",
                    Priority = "medium",
                    DueDate = c.CreatedAt.ToShortDateString(),
                    Category = "leave"
                })
                .ToListAsync();

            var priorityActions = expiringSoon.AsEnumerable().Cast<object>().Concat(pendingLeaves.AsEnumerable().Cast<object>()).Take(6).ToList();

            var sixMonths = Enumerable.Range(0, 6)
                .Select(i => DateTime.UtcNow.AddMonths(-i))
                .OrderBy(d => d)
                .ToList();

            var absenceChartData = new List<object>();
            foreach (var month in sixMonths)
            {
                var startOfMonth = new DateTime(month.Year, month.Month, 1);
                var endOfMonth = startOfMonth.AddMonths(1);

                var sickCount = await _context.Conges
                    .CountAsync(c => (c.LeaveType.Contains("Maladie") || c.LeaveType.Contains("maladie") || c.LeaveType.Contains("Sickness")) && 
                                     c.Status == "Approuvé" && c.StartDate >= startOfMonth && c.StartDate < endOfMonth);
                
                var vacationCount = await _context.Conges
                    .CountAsync(c => (c.LeaveType.Contains("Congé") || c.LeaveType.Contains("payes") || c.LeaveType.Contains("Vacation")) && 
                                     c.Status == "Approuvé" && c.StartDate >= startOfMonth && c.StartDate < endOfMonth);
                
                var otherCount = await _context.Presences
                    .CountAsync(p => (p.Status == "Rejected" || p.Status == "Absent") && p.Date >= startOfMonth && p.Date < endOfMonth);

                absenceChartData.Add(new {
                    month = month.ToString("MMMM", new System.Globalization.CultureInfo("fr-FR")),
                    sick = sickCount,
                    vacation = vacationCount,
                    other = otherCount
                });
            }

            return Ok(new
            {
                TotalEmployees = totalEmployees,
                ActiveContracts = activeContracts,
                PendingLeaveRequests = pendingLeaveRequests,
                OpenPositions = openPositions,
                ExpiringContracts = expiringContracts,
                TotalApplications = totalApplications,
                InterviewsPlanned = interviewsPlanned,
                NewApplications = newApplications,
                RejectedApplications = rejectedApplications,
                AbsenceRate = Math.Round(absenceRate, 1),
                PriorityActions = priorityActions,
                AbsenceChartData = absenceChartData
            });
        }

        [HttpGet("employee-stats")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeStats()
        {
            var userIdStr = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId))
            {
                return Unauthorized();
            }

            var employee = await _context.Employees.FindAsync(userId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var totalLeaveDays = 25.0;
            var usedLeaveDays = await _context.Conges
                .Where(c => c.EmployeeId == userId && c.Status == "Approuvé" && c.StartDate.Year == DateTime.Now.Year)
                .SumAsync(c => c.Duration);
            var leaveBalance = totalLeaveDays - usedLeaveDays;

            var startOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            var endOfMonth = startOfMonth.AddMonths(1);
            var absencesThisMonth = await _context.Presences
                .CountAsync(p => p.EmployeeId == userId && 
                                 p.Date >= startOfMonth && 
                                 p.Date < endOfMonth && 
                                 (p.Status == "Absent" || p.Status == "Rejected"));

            var startOfLastMonth = startOfMonth.AddMonths(-1);
            var absencesLastMonth = await _context.Presences
                .CountAsync(p => p.EmployeeId == userId && 
                                 p.Date >= startOfLastMonth && 
                                 p.Date < startOfMonth && 
                                 (p.Status == "Absent" || p.Status == "Rejected"));

            var approvedLeaves = await _context.Conges
                .Where(c => c.EmployeeId == userId && 
                           c.Status == "Approuvé" && 
                           c.StartDate > DateTime.Now)
                .OrderBy(c => c.StartDate)
                .ToListAsync();

            var nextLeave = approvedLeaves.FirstOrDefault();
            var daysUntilNextLeave = nextLeave != null ? (nextLeave.StartDate - DateTime.Now).Days : 0;

            var currentYear = DateTime.Now.Year;
            
            var usedPaidLeave = await _context.Conges
                .Where(c => c.EmployeeId == userId && c.Status == "Approuvé" && c.StartDate.Year == currentYear && (c.LeaveType == "conges_payes" || c.LeaveType.Contains("Payé")))
                .SumAsync(c => c.Duration);
            var countPaidLeave = await _context.Conges
                .CountAsync(c => c.EmployeeId == userId && c.StartDate.Year == currentYear && (c.LeaveType == "conges_payes" || c.LeaveType.Contains("Payé")));
                
            var usedSickLeave = await _context.Conges
                .Where(c => c.EmployeeId == userId && c.Status == "Approuvé" && c.StartDate.Year == currentYear && (c.LeaveType == "conges_maladie" || c.LeaveType.Contains("Maladie")))
                .SumAsync(c => c.Duration);
            var countSickLeave = await _context.Conges
                .CountAsync(c => c.EmployeeId == userId && c.StartDate.Year == currentYear && (c.LeaveType == "conges_maladie" || c.LeaveType.Contains("Maladie")));
                
            var usedUnpaidLeave = await _context.Conges
                .Where(c => c.EmployeeId == userId && c.Status == "Approuvé" && c.StartDate.Year == currentYear && (c.LeaveType == "conges_sans_solde" || c.LeaveType.Contains("Sans Solde")))
                .SumAsync(c => c.Duration);
            var countUnpaidLeave = await _context.Conges
                .CountAsync(c => c.EmployeeId == userId && c.StartDate.Year == currentYear && (c.LeaveType == "conges_sans_solde" || c.LeaveType.Contains("Sans Solde")));
                
            var usedRecoveryLeave = await _context.Conges
                .Where(c => c.EmployeeId == userId && c.Status == "Approuvé" && c.StartDate.Year == currentYear && (c.LeaveType == "conges_recuperation" || c.LeaveType.Contains("Récupération")))
                .SumAsync(c => c.Duration);
            var countRecoveryLeave = await _context.Conges
                .CountAsync(c => c.EmployeeId == userId && c.StartDate.Year == currentYear && (c.LeaveType == "conges_recuperation" || c.LeaveType.Contains("Récupération")));

            var presences = await _context.Presences
                .Where(p => p.EmployeeId == userId && p.Date <= DateTime.Now && (p.Status == "Approved" || p.Status == "Present"))
                .OrderByDescending(p => p.Date)
                .Take(100)
                .ToListAsync();

            int currentStreak = 0;
            DateTime? lastCheckDate = DateTime.Now.Date;
            
            foreach (var presence in presences)
            {
                if (presence.Date.Date == lastCheckDate.Value.Date)
                {
                    currentStreak++;
                    lastCheckDate = lastCheckDate.Value.AddDays(-1);
                }
                else if (presence.Date.Date < lastCheckDate.Value.Date.AddDays(-1))
                {
                    break;
                }
            }

            return Ok(new
            {
                LeaveBalances = new {
                    Paid = new { used = usedPaidLeave, total = 25.0, remaining = 25.0 - usedPaidLeave, count = countPaidLeave },
                    Sick = new { used = usedSickLeave, total = 10.0, remaining = 10.0 - usedSickLeave, count = countSickLeave },
                    Unpaid = new { used = usedUnpaidLeave, total = 100.0, remaining = 100.0 - usedUnpaidLeave, count = countUnpaidLeave },
                    Recovery = new { used = usedRecoveryLeave, total = 5.0, remaining = 5.0 - usedRecoveryLeave, count = countRecoveryLeave }
                },
                AbsencesThisMonth = absencesThisMonth,
                AbsencesTrend = absencesLastMonth - absencesThisMonth,
                AbsencesTrendDirection = (absencesThisMonth < absencesLastMonth) ? "down" : (absencesThisMonth > absencesLastMonth ? "up" : "neutral"),
                
                ApprovedLeavesCount = approvedLeaves.Count,
                DaysUntilNextLeave = daysUntilNextLeave,
                NextLeaveDate = nextLeave?.StartDate.ToString("dd/MM/yyyy"),
                
                CurrentStreak = currentStreak,
                MaxStreak = currentStreak,
                IsRecordStreak = true
            });
        }

        private async Task FillAbsencesForDate(DateTime date)
        {
            var targetDate = date.Date;
            TimeSpan endLimit = new TimeSpan(13, 0, 0);

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
    }
}
