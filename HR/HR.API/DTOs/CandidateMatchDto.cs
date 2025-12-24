using System;
using System.Collections.Generic;
using HR.API.Models;

namespace HR.API.DTOs
{
    public class CandidateMatchDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime AppliedDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public decimal MatchingScore { get; set; }
        public List<string> ExtractedSkills { get; set; } = new List<string>();
        public int? YearsOfExperience { get; set; }
        public string Education { get; set; } = string.Empty;
        public List<string> Languages { get; set; } = new List<string>();
        public MatchingResult? MatchingDetails { get; set; }
        public bool IsAnalyzed { get; set; }
    }

    public class BatchAnalysisResult
    {
        public int TotalProcessed { get; set; }
        public int SuccessCount { get; set; }
        public int FailureCount { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
