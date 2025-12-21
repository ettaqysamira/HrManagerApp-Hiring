using HR.API.Data;
using HR.API.DTOs;
using HR.API.Models;
using HR.API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly IEmailService _emailService;

        public CandidatsController(AppDbContext context, IWebHostEnvironment environment, IEmailService emailService)
        {
            _context = context;
            _environment = environment;
            _emailService = emailService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidat>>> GetCandidats([FromQuery] string? skill = null, [FromQuery] int? jobOfferId = null)
        {
            var query = _context.Candidats.Include(c => c.OffreEmploi).AsQueryable();

            if (jobOfferId.HasValue)
            {
                query = query.Where(c => c.JobOfferId == jobOfferId.Value);
            }

            if (!string.IsNullOrEmpty(skill))
            {
                string lowerSkill = skill.ToLower();
                query = query.Where(c => c.Skills.ToLower().Contains(lowerSkill) 
                                      || c.FullName.ToLower().Contains(lowerSkill));
            }

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Candidat>> GetCandidat(int id)
        {
            var candidat = await _context.Candidats.Include(c => c.OffreEmploi).FirstOrDefaultAsync(c => c.Id == id);

            if (candidat == null)
            {
                return NotFound();
            }

            return candidat;
        }

        [HttpPost("apply")]
        public async Task<ActionResult<Candidat>> Apply([FromForm] CandidatureDto candidatureDto)
        {
            string? uniqueFileName = null;
            if (candidatureDto.Resume != null)
            {
                string rootPath = !string.IsNullOrEmpty(_environment.WebRootPath) ? _environment.WebRootPath : _environment.ContentRootPath;
                string uploadsFolder = Path.Combine(rootPath, "uploads", "resumes");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                uniqueFileName = Guid.NewGuid().ToString() + "_" + candidatureDto.Resume.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await candidatureDto.Resume.CopyToAsync(fileStream);
                }
            }

            var candidat = new Candidat
            {
                FullName = candidatureDto.FullName,
                Email = candidatureDto.Email,
                Phone = candidatureDto.Phone,
                Skills = candidatureDto.Skills,
                JobOfferId = candidatureDto.JobOfferId,
                AppliedDate = DateTime.Now,
                ResumePath = uniqueFileName ?? string.Empty
            };

            _context.Candidats.Add(candidat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCandidat", new { id = candidat.Id }, candidat);
        }

        [HttpPut("{id}/accept")]
        public async Task<IActionResult> AcceptCandidate(int id, [FromBody] AcceptCandidateDto dto)
        {
            var candidat = await _context.Candidats.Include(c => c.OffreEmploi).FirstOrDefaultAsync(c => c.Id == id);
            if (candidat == null) return NotFound();

            if (string.IsNullOrEmpty(dto.InterviewDate) || !DateTime.TryParse(dto.InterviewDate, out DateTime interviewDate))
            {
                return BadRequest("Invalid or missing interview date.");
            }

            candidat.Status = "Accepté";
            candidat.InterviewDate = interviewDate;

            await _context.SaveChangesAsync();

            var subject = "Invitation à un entretien - HR Manager";
            var body = $@"
                <h3>Bonjour {candidat.FullName},</h3>
                <p>Nous avons le plaisir de vous informer que votre candidature pour le poste de <strong>{candidat.OffreEmploi?.Title}</strong> a été retenue pour un entretien.</p>
                <p>L'entretien aura lieu le : <strong>{interviewDate:dd/MM/yyyy HH:mm}</strong>.</p>
                <p>Veuillez confirmer votre présence par retour de mail.</p>
                <br/>
                <p>Cordialement,<br/>L'équipe RH</p>";

            try {
                await _emailService.SendEmailAsync(candidat.Email, subject, body);
            } catch (Exception ex) {
                Console.WriteLine($"[CRITICAL ERROR] Email sending failed for candidate {id}: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
            }

            return NoContent();
        }

        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectCandidate(int id)
        {
            var candidat = await _context.Candidats.Include(c => c.OffreEmploi).FirstOrDefaultAsync(c => c.Id == id);
            if (candidat == null) return NotFound();

            candidat.Status = "Rejeté";
            await _context.SaveChangesAsync();

            var subject = "Mise à jour de votre candidature - HR Manager";
            var body = $@"
                <h3>Bonjour {candidat.FullName},</h3>
                <p>Nous vous remercions de l'intérêt porté à notre entreprise et au poste de <strong>{candidat.OffreEmploi?.Title}</strong>.</p>
                <p>Après étude de votre dossier, nous avons le regret de vous informer que nous ne pouvons donner une suite favorable à votre candidature pour le moment.</p>
                <p>Nous conserverons vos coordonnées pour d'éventuels besoins futurs.</p>
                <br/>
                <p>Nous vous souhaitons pleine réussite dans vos recherches.</p>
                <br/>
                <p>Cordialement,<br/>L'équipe RH</p>";

            try {
                await _emailService.SendEmailAsync(candidat.Email, subject, body);
            } catch (Exception ex) {
                Console.WriteLine($"Error sending email: {ex.Message}");
            }

            return NoContent();
        }
    }
}
