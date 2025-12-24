using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace HR.API.DTOs
{
    public class CreateContractDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        public string Type { get; set; } 

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } 

        [Required]
        public decimal Salary { get; set; }

        public string Status { get; set; } = "Active"; 
    }
}
