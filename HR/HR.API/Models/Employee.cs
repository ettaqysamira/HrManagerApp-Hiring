using System.ComponentModel.DataAnnotations;

namespace HR.API.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string? EmployeeId { get; set; }

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Required]
        public string Department { get; set; } = string.Empty;

        [Required]
        public string Position { get; set; } = string.Empty;

        public string? ContractType { get; set; }

        public string? Manager { get; set; }

        public DateTime StartDate { get; set; }

        public string? Status { get; set; }

        public DateTime? BirthDate { get; set; }

        public string? Address { get; set; }

        public decimal Salary { get; set; }

        public string? PlaceOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? MaritalStatus { get; set; }
        public string? Nationality { get; set; }
        public string? SocialSecurityNumber { get; set; }

        public string? PhotoUrl { get; set; }

        public string? Login { get; set; }

        public string? Password { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public string? Role { get; set; }
    }
}
