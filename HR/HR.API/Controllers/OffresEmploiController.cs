using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffresEmploiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OffresEmploiController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/OffresEmploi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OffreEmploi>>> GetOffresEmploi()
        {
            return await _context.OffresEmploi.ToListAsync();
        }

        // GET: api/OffresEmploi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OffreEmploi>> GetOffreEmploi(int id)
        {
            var offreEmploi = await _context.OffresEmploi.FindAsync(id);

            if (offreEmploi == null)
            {
                return NotFound();
            }

            return offreEmploi;
        }

        // POST: api/OffresEmploi
        [HttpPost]
        public async Task<ActionResult<OffreEmploi>> PostOffreEmploi(OffreEmploi offreEmploi)
        {
            _context.OffresEmploi.Add(offreEmploi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOffreEmploi", new { id = offreEmploi.Id }, offreEmploi);
        }

        // PUT: api/OffresEmploi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOffreEmploi(int id, OffreEmploi offreEmploi)
        {
            if (id != offreEmploi.Id)
            {
                return BadRequest();
            }

            _context.Entry(offreEmploi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OffreEmploiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/OffresEmploi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffreEmploi(int id)
        {
            var offreEmploi = await _context.OffresEmploi.FindAsync(id);
            if (offreEmploi == null)
            {
                return NotFound();
            }

            _context.OffresEmploi.Remove(offreEmploi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OffreEmploiExists(int id)
        {
            return _context.OffresEmploi.Any(e => e.Id == id);
        }
    }
}
