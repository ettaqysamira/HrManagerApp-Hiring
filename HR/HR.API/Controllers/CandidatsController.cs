using HR.API.Data;
using HR.API.DTOs;
using HR.API.Models;
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

        public CandidatsController(AppDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
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

        // GET: api/Candidats/5
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

        // POST: api/Candidats/apply
        [HttpPost("apply")]
        public async Task<ActionResult<Candidat>> Apply([FromForm] CandidatureDto candidatureDto)
        {
            // 1. Save the file
            string uniqueFileName = null;
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

            // 2. Create Candidat entity
            var candidat = new Candidat
            {
                FullName = candidatureDto.FullName,
                Email = candidatureDto.Email,
                Phone = candidatureDto.Phone,
                Skills = candidatureDto.Skills,
                JobOfferId = candidatureDto.JobOfferId,
                AppliedDate = DateTime.Now,
                ResumePath = uniqueFileName
            };

            _context.Candidats.Add(candidat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCandidat", new { id = candidat.Id }, candidat);
        }
    }
}
