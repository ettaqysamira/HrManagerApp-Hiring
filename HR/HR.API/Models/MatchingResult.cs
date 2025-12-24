using System.Collections.Generic;

namespace HR.API.Models
{
    public class MatchingResult
    {
        public decimal TotalScore { get; set; }
        public decimal SkillsScore { get; set; }
        public decimal ExperienceScore { get; set; }
        public decimal EducationScore { get; set; }
        public decimal LanguagesScore { get; set; }
        public List<string> MatchedSkills { get; set; } = new List<string>();
        public List<string> MissingSkills { get; set; } = new List<string>();
        public List<string> BonusSkills { get; set; } = new List<string>();
        public string Recommendation { get; set; } = string.Empty;
    }
}
