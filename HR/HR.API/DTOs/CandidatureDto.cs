using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace HR.API.DTOs
{
    public class CandidatureDto
    {
        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        [Required]
        public IFormFile Resume { get; set; }

        public string Skills { get; set; } = string.Empty;

        [Required]
        public int JobOfferId { get; set; }
    }
}
