using System.ComponentModel.DataAnnotations;

namespace HR.API.DTOs
{
    public class AttendanceRequestDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string Shift { get; set; } 

        [Required]
        public string QrContent { get; set; }
    }
}
