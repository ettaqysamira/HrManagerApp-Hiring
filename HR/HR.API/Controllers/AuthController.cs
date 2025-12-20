using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace HR.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequest request)
        {
            var hrUser = await _context.HRs
                .FirstOrDefaultAsync(u => u.Login == request.Login || u.Email == request.Login);

            if (hrUser != null)
            {
                if (VerifyPasswordHash(request.Password, hrUser.Password))
                {
                    return GenerateJwtToken(hrUser.Id.ToString(), hrUser.FirstName, hrUser.LastName, hrUser.Email, hrUser.Role, isHr: true);
                }
            }

            var employee = await _context.Employees
                .FirstOrDefaultAsync(u => u.Login == request.Login || u.Email == request.Login);

            if (employee == null)
            {
                return Unauthorized(new { message = "Identifiant ou mot de passe incorrect." });
            }

            bool isPasswordValid = false;
            
            if (employee.Password == request.Password) 
            {
                isPasswordValid = true;
            }
            else if (VerifyPasswordHash(request.Password, employee.Password ?? "")) 
            {
                isPasswordValid = true;
            }

            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Identifiant ou mot de passe incorrect." });
            }

            var userRole = !string.IsNullOrEmpty(employee.Role) ? employee.Role : "Employee";
            return GenerateJwtToken(employee.Id.ToString(), employee.FirstName, employee.LastName, employee.Email, userRole, isHr: false, employee: employee);
        }

        private IActionResult GenerateJwtToken(string userId, string firstName, string lastName, string email, string role, bool isHr, Employee? employee = null)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, $"{firstName} {lastName}"),
                new Claim(ClaimTypes.Role, role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            
            if (isHr)
            {
                 return Ok(new
                {
                    Token = tokenString,
                    User = new
                    {
                        Id = int.Parse(userId),
                        FirstName = firstName,
                        LastName = lastName,
                        Login = email, 
                        Role = role,
                    }
                });
            }
            else 
            {
                return Ok(new
                {
                    Token = tokenString,
                    User = new
                    {
                        employee.Id,
                        employee.FirstName,
                        employee.LastName,
                        employee.Login,
                        employee.Email,
                        employee.PhotoUrl,
                        employee.Position,
                        employee.Department,
                        employee.StartDate,
                        employee.Status,
                        employee.Phone,
                        employee.Address,
                        employee.BirthDate,
                        employee.Gender,
                        employee.MaritalStatus,
                        employee.Nationality,
                        employee.SocialSecurityNumber,
                        Role = role
                    }
                });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                var roleClaim = User.FindFirst(ClaimTypes.Role);

                if (userIdClaim == null) return Unauthorized();
                if (!int.TryParse(userIdClaim.Value, out int userId)) return BadRequest();

                if (roleClaim?.Value == "HR")
                {
                    var hr = await _context.HRs.FindAsync(userId);
                    if (hr == null) return NotFound();
                    return Ok(new { hr.Id, hr.FirstName, hr.LastName, hr.Email, hr.Role });
                }
                else
                {
                    var employee = await _context.Employees.FindAsync(userId);
                    if (employee == null) return NotFound();

                    if (string.IsNullOrEmpty(employee.Role))
                    {
                        employee.Role = "Employee";
                    }

                    return Ok(employee); 
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur", error = ex.Message });
            }
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            if (string.IsNullOrEmpty(storedHash)) return false;

            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString() == storedHash;
            }
        }
    }
}
