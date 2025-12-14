using HR.API.Data;
using HR.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
            var employee = await _context.Employees
                .FirstOrDefaultAsync(u => u.Login == request.Login && u.Password == request.Password);

            if (employee == null)
            {
                return Unauthorized(new { message = "Identifiant ou mot de passe incorrect." });
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            
            // Generate claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, employee.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{employee.FirstName} {employee.LastName}"),
                new Claim(ClaimTypes.Role, "Employee") // Default role, can be enhanced later
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(8), // 8 hour working day
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

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
                    employee.SocialSecurityNumber
                }
            });
        }
    }
}
