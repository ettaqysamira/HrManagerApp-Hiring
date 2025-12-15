using HR.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HR.API.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Ensure DB is created
            await context.Database.MigrateAsync();

            // Check if HR user exists
            var hrEmail = "samira@ettaqy.com";
            
            // 1. Separate HR Table Seeding
            var hrUser = await context.HRs.FirstOrDefaultAsync(h => h.Email == hrEmail);

            if (hrUser == null)
            {
                var newHr = new HrUser
                {
                    FirstName = "Samira",
                    LastName = "Ettaqy",
                    Email = hrEmail,
                    Login = hrEmail,
                    Password = HashPassword("ettaqy2020"),
                    Role = "HR",
                    CreatedAt = DateTime.UtcNow
                };

                context.HRs.Add(newHr);
                await context.SaveChangesAsync();
            }

            // Optional: Clean up if Samira exists in Employees table (to avoid confusion)
            var oldEmployeeEntry = await context.Employees.FirstOrDefaultAsync(e => e.Email == hrEmail);
            if (oldEmployeeEntry != null)
            {
                context.Employees.Remove(oldEmployeeEntry);
                await context.SaveChangesAsync();
            }
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
