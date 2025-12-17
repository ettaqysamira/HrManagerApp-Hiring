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
    public class ContractsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContractsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contract>>> GetContracts()
        {
            return await _context.Contracts.Include(c => c.Employee).OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        [HttpGet("my-contracts")]
        [Authorize] 
        public async Task<ActionResult<IEnumerable<Contract>>> GetMyContracts()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

           
            if (!int.TryParse(userIdClaim.Value, out int employeeId))
            {
                
                 return BadRequest("Invalid User ID");
            }

           
            
            var contracts = await _context.Contracts
                .Include(c => c.Employee)
                .Where(c => c.EmployeeId == employeeId)
                .OrderByDescending(c => c.StartDate)
                .ToListAsync();

            return contracts;
        }

        [HttpPost]
        public async Task<ActionResult<Contract>> CreateContract(Contract contract)
        {
            if (contract.EndDate.HasValue && contract.EndDate < contract.StartDate)
            {
                return BadRequest("End date cannot be earlier than start date.");
            }

            var employee = await _context.Employees.FindAsync(contract.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            employee.ContractType = contract.Type;
            employee.Salary = contract.Salary;
            
            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContract", new { id = contract.Id }, contract);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> GetContract(int id)
        {
            var contract = await _context.Contracts.Include(c => c.Employee).FirstOrDefaultAsync(c => c.Id == id);

            if (contract == null)
            {
                return NotFound();
            }

            return contract;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContract(int id, Contract contract)
        {
            if (id != contract.Id)
            {
                return BadRequest();
            }

            _context.Entry(contract).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContractExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            var contract = await _context.Contracts.FindAsync(id);
            if (contract == null)
            {
                return NotFound();
            }

            _context.Contracts.Remove(contract);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContractExists(int id)
        {
            return _context.Contracts.Any(e => e.Id == id);
        }
    }
}
