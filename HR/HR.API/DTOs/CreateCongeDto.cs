using System.ComponentModel.DataAnnotations;

namespace HR.API.DTOs
{
    public class CreateCongeDto
    {
        [Required]
        public string LeaveType { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public string Reason { get; set; } = string.Empty;

        public bool HalfDay { get; set; }

        public double Duration { get; set; }
    }
}
