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
        public DbSet<Presence> Presences { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<OffreEmploi> OffresEmploi { get; set; }
        public DbSet<Candidat> Candidats { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Salary)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Contract>()
                .Property(c => c.Salary)
                .HasColumnType("decimal(18,2)");
        }
    }
}
