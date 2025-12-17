using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.API.Models
{
    public class Contract
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        [Required]
        public string Type { get; set; } 

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } 

        public decimal Salary { get; set; }

        public string Status { get; set; } = "Active"; 

        public string? DocumentUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
