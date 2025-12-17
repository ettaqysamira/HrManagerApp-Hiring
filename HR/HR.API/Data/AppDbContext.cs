using HR.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HR.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<HrUser> HRs { get; set; }
        public DbSet<Conge> Conges { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Contract> Contracts { get; set; }
    }
}
