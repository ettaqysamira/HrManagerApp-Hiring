using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.API.Models
{
    public class OffreEmploi
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        public string Requirements { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public DateTime PostedDate { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Open";

        public string? RequiredSkills { get; set; }  // JSON array
        public int? MinYearsExperience { get; set; }
        public string? RequiredEducation { get; set; }
        public string? RequiredLanguages { get; set; }  // JSON array
        
        public decimal? MinMatchingScore { get; set; } 
    }
}
