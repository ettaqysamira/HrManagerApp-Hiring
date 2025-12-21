using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR.API.Models
{
    public class Candidat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string ResumePath { get; set; } = string.Empty; 

        public string Skills { get; set; } = string.Empty; 

        public DateTime AppliedDate { get; set; } = DateTime.Now;

        public string Status { get; set; } = "Nouveau";

        public DateTime? InterviewDate { get; set; }

        public int JobOfferId { get; set; }

        [ForeignKey("JobOfferId")]
        public OffreEmploi? OffreEmploi { get; set; }
    }
}
