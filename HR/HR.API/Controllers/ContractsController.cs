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
        private readonly IWebHostEnvironment _environment;
        private readonly HR.API.Services.IContractGeneratorService _contractGenerator;

        public ContractsController(AppDbContext context, IWebHostEnvironment environment, HR.API.Services.IContractGeneratorService contractGenerator)
        {
            _context = context;
            _environment = environment;
            _contractGenerator = contractGenerator;
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
            if (userIdClaim == null) 
            {
                Console.WriteLine("[DEBUG] GetMyContracts: No NameIdentifier claim found.");
                return Unauthorized();
            }

            if (!int.TryParse(userIdClaim.Value, out int employeeId))
            {
                Console.WriteLine($"[DEBUG] GetMyContracts: Invalid User ID in claim: '{userIdClaim.Value}'");
                return BadRequest("Invalid User ID");
            }

            Console.WriteLine($"[DEBUG] GetMyContracts: Fetching contracts for Employee PK: {employeeId}");
            
            var contracts = await _context.Contracts
                .Include(c => c.Employee)
                .Where(c => c.EmployeeId == employeeId)
                .ToListAsync();
            Console.WriteLine($"[DEBUG] GetMyContracts: Found {contracts.Count} contracts.");
            bool changed = false;
            foreach(var c in contracts)
            {
                if (string.IsNullOrEmpty(c.DocumentUrl))
                {
                    Console.WriteLine($"[DEBUG] Contract {c.Id} has no DocumentUrl. Regenerating...");
                    try {
                        c.Employee = await _context.Employees.FindAsync(c.EmployeeId);
                        string newUrl = await _contractGenerator.GenerateContractFileAsync(c);
                        c.DocumentUrl = newUrl;
                        changed = true;
                        Console.WriteLine($"[DEBUG] Regenerated: {newUrl}");
                    } catch (Exception ex) {
                        Console.WriteLine($"[ERROR] Regeneration failed: {ex.Message}");
                    }
                }
            }

            if (changed)
            {
                await _context.SaveChangesAsync();
            }

            return contracts;
        }

        [HttpPost]
        public async Task<ActionResult<Contract>> CreateContract([FromBody] HR.API.DTOs.CreateContractDto dto)
        {
            if (dto.EndDate.HasValue && dto.EndDate < dto.StartDate)
            {
                return BadRequest("End date cannot be earlier than start date.");
            }

            var employee = await _context.Employees.FindAsync(dto.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            var contract = new Contract
            {
                EmployeeId = dto.EmployeeId,
                Type = dto.Type,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Salary = dto.Salary,
                Status = dto.Status,
                CreatedAt = DateTime.UtcNow
            };

            contract.Employee = employee;

            try
            {
                string relativeUrl = await _contractGenerator.GenerateContractFileAsync(contract);
                contract.DocumentUrl = relativeUrl;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Failed to generate contract file: {ex.Message}");
            }

            employee.ContractType = contract.Type;
            employee.Salary = contract.Salary;
            
            _context.Contracts.Add(contract);
            await _context.SaveChangesAsync();

            contract.Employee = null;

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
