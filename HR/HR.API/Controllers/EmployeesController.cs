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
        private readonly HR.API.Services.IEmailService _emailService;

        public EmployeesController(AppDbContext context, HR.API.Services.IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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


        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            if (!string.IsNullOrEmpty(employee.Password))
            {
                employee.Password = HashPassword(employee.Password);
            }

            if (string.IsNullOrEmpty(employee.EmployeeId))
            {
                employee.EmployeeId = $"EMP-{DateTime.UtcNow.Year}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
            }

            employee.CreatedAt = DateTime.UtcNow;

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            try 
            {
                Console.WriteLine($"[DEBUG] Generating QR for EmployeeID: {employee.EmployeeId}");
                Console.WriteLine($"[DEBUG] Employee Login: {employee.Login} (Is Null/Empty: {string.IsNullOrEmpty(employee.Login)})");

                byte[] qrCodeBytes = GenerateQrCode(employee.EmployeeId);
                Console.WriteLine($"[DEBUG] QR Code Generated. Size: {qrCodeBytes?.Length ?? 0} bytes");

                string subject = "Bienvenue chez HR Manager - Votre Badge Collaborateur";
                string body = $@"
                    <h2>Bienvenue {employee.FirstName} {employee.LastName},</h2>
                    <p>Votre compte employé a été créé avec succès.</p>
                    <p>Voici vos identifiants :</p>
                    <ul>
                        <li><strong>Identifiant :</strong> {employee.Login ?? "Non défini"}</li>
                        <li><strong>Email :</strong> {employee.Email}</li>
                    </ul>
                    <p>Veuillez trouver en pièce jointe votre Badge QR Code unique pour le pointage.</p>
                    <p>Cordialement,<br>L'équipe RH</p>
                ";

                Console.WriteLine($"[DEBUG] Sending email to {employee.Email}...");
                await _emailService.SendEmailWithAttachmentAsync(employee.Email, subject, body, qrCodeBytes, "Badge_QR.png");
                Console.WriteLine("[DEBUG] Email sent successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Error sending welcome email: {ex.ToString()}");
            }

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        private byte[] GenerateQrCode(string text)
        {
            using (var qrGenerator = new QRCoder.QRCodeGenerator())
            {
                var qrCodeData = qrGenerator.CreateQrCode(text, QRCoder.QRCodeGenerator.ECCLevel.Q);
                using (var qrCode = new QRCoder.PngByteQRCode(qrCodeData))
                {
                    return qrCode.GetGraphic(20);
                }
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existingEmployee = await _context.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
            
            if (existingEmployee == null)
            {
                 return NotFound();
            }

            if (string.IsNullOrEmpty(employee.Password))
            {
                employee.Password = existingEmployee.Password;
            }
            else
            {
                employee.Password = HashPassword(employee.Password);
            }

            employee.CreatedAt = existingEmployee.CreatedAt;
            employee.UpdatedAt = DateTime.UtcNow;

            _context.Entry(employee).State = EntityState.Modified;

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string HashPassword(string password)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                var builder = new System.Text.StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
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
