using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.API.Models
{
    public class Presence
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [ForeignKey("EmployeeId")]
        public Employee? Employee { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public TimeSpan Time { get; set; } = DateTime.Now.TimeOfDay;

        [Required]
        public string Shift { get; set; } 

        [Required]
        public string Status { get; set; } 

        public bool IsLate { get; set; }

        public string? Notes { get; set; }
    }
}
