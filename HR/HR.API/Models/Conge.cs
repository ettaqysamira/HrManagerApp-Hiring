using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.API.Models
{
    public class Conge
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        [Required]
        public string LeaveType { get; set; } = string.Empty; 

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public bool HalfDay { get; set; }

        public double Duration { get; set; } 

        [Required]
        public string Reason { get; set; } = string.Empty;

        public string Status { get; set; } = "En attente"; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? DecisionDate { get; set; }
    }
}
