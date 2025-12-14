using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpPut("{id}/profile")]
        public async Task<IActionResult> UpdateEmployeeProfile(int id, [FromBody] EmployeeProfileUpdateDto updateDto)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(updateDto.Phone)) employee.Phone = updateDto.Phone;
            if (!string.IsNullOrEmpty(updateDto.Address)) employee.Address = updateDto.Address;
            if (!string.IsNullOrEmpty(updateDto.PhotoUrl)) employee.PhotoUrl = updateDto.PhotoUrl;
            
            if (updateDto.BirthDate.HasValue) employee.BirthDate = updateDto.BirthDate.Value;
            if (!string.IsNullOrEmpty(updateDto.PlaceOfBirth)) employee.PlaceOfBirth = updateDto.PlaceOfBirth;
            if (!string.IsNullOrEmpty(updateDto.Gender)) employee.Gender = updateDto.Gender;
            if (!string.IsNullOrEmpty(updateDto.MaritalStatus)) employee.MaritalStatus = updateDto.MaritalStatus;
            if (!string.IsNullOrEmpty(updateDto.Nationality)) employee.Nationality = updateDto.Nationality;
            if (!string.IsNullOrEmpty(updateDto.SocialSecurityNumber)) employee.SocialSecurityNumber = updateDto.SocialSecurityNumber;

            if (!string.IsNullOrEmpty(updateDto.Email)) employee.Email = updateDto.Email;

            employee.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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

        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }

    public class EmployeeProfileUpdateDto
    {
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? PhotoUrl { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? MaritalStatus { get; set; }
        public string? Nationality { get; set; }
        public string? SocialSecurityNumber { get; set; }
    }
}
