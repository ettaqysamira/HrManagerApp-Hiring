using System;
using System.ComponentModel.DataAnnotations;

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
    }
}
