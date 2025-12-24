using System;
using System.Collections.Generic;

namespace HR.API.Models
{
    public class CVAnalysisResult
    {
        public List<string> Skills { get; set; } = new List<string>();
        public int YearsOfExperience { get; set; }
        public List<EducationEntry> Education { get; set; } = new List<EducationEntry>();
        public List<string> Languages { get; set; } = new List<string>();
        public List<string> Certifications { get; set; } = new List<string>();
        public List<WorkExperience> WorkHistory { get; set; } = new List<WorkExperience>();
        public string Summary { get; set; } = string.Empty;
    }

    public class EducationEntry
    {
        public string Degree { get; set; } = string.Empty;
        public string Institution { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public int? Year { get; set; }
    }

    public class WorkExperience
    {
        public string Position { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new List<string>();
    }
}
