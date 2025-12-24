using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HR.API.Data;
using HR.API.Models;
using HR.API.DTOs;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HR.API.Services
{
    public class MatchingService : IMatchingService
    {
        private readonly AppDbContext _context;

        public MatchingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MatchingResult> CalculateMatchScoreAsync(int candidateId, int jobOfferId)
        {
            var candidate = await _context.Candidats.FindAsync(candidateId);
            var jobOffer = await _context.OffresEmploi.FindAsync(jobOfferId);

            if (candidate == null || jobOffer == null)
            {
                throw new ArgumentException("Candidate or Job Offer not found");
            }

            var result = new MatchingResult();

            var candidateSkills = ParseJsonArray(candidate.ExtractedSkills);
            var requiredSkills = ParseJsonArray(jobOffer.RequiredSkills);
            var candidateLanguages = ParseJsonArray(candidate.Languages);
            var requiredLanguages = ParseJsonArray(jobOffer.RequiredLanguages);

            result.SkillsScore = CalculateSkillsScore(candidateSkills, requiredSkills, out var matched, out var missing, out var bonus);
            result.MatchedSkills = matched;
            result.MissingSkills = missing;
            result.BonusSkills = bonus;

            result.ExperienceScore = CalculateExperienceScore(
                candidate.YearsOfExperience ?? 0,
                jobOffer.MinYearsExperience ?? 0
            );

            result.EducationScore = CalculateEducationScore(
                candidate.Education ?? "",
                jobOffer.RequiredEducation ?? ""
            );

            result.LanguagesScore = CalculateLanguagesScore(candidateLanguages, requiredLanguages);

            result.TotalScore = Math.Round(
                (result.SkillsScore * 0.40m) +
                (result.ExperienceScore * 0.30m) +
                (result.EducationScore * 0.20m) +
                (result.LanguagesScore * 0.10m),
                2
            );

            result.Recommendation = GenerateRecommendation(result.TotalScore, result.MissingSkills.Count);

            return result;
        }

        public async Task<List<CandidateMatchDto>> RankCandidatesAsync(int jobOfferId, decimal? minScore = null)
        {
            var candidates = await _context.Candidats
                .Where(c => c.JobOfferId == jobOfferId)
                .Include(c => c.OffreEmploi)
                .ToListAsync();

            var rankedCandidates = new List<CandidateMatchDto>();

            foreach (var candidate in candidates)
            {
                MatchingResult? matchingResult = null;
                
                if (!string.IsNullOrEmpty(candidate.ExtractedSkills))
                {
                    try
                    {
                        matchingResult = await CalculateMatchScoreAsync(candidate.Id, jobOfferId);
                        
                        candidate.MatchingScore = matchingResult.TotalScore;
                        candidate.MatchingDetails = JsonConvert.SerializeObject(matchingResult);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error calculating match for candidate {candidate.Id}: {ex.Message}");
                    }
                }

                var dto = new CandidateMatchDto
                {
                    Id = candidate.Id,
                    FullName = candidate.FullName,
                    Email = candidate.Email,
                    Phone = candidate.Phone,
                    AppliedDate = candidate.AppliedDate,
                    Status = candidate.Status,
                    MatchingScore = candidate.MatchingScore ?? 0,
                    ExtractedSkills = ParseJsonArray(candidate.ExtractedSkills),
                    YearsOfExperience = candidate.YearsOfExperience,
                    Education = candidate.Education ?? "",
                    Languages = ParseJsonArray(candidate.Languages),
                    MatchingDetails = matchingResult,
                    IsAnalyzed = !string.IsNullOrEmpty(candidate.ExtractedSkills)
                };

                rankedCandidates.Add(dto);
            }

            await _context.SaveChangesAsync();

            if (minScore.HasValue)
            {
                rankedCandidates = rankedCandidates
                    .Where(c => c.MatchingScore >= minScore.Value)
                    .ToList();
            }

            return rankedCandidates
                .OrderByDescending(c => c.MatchingScore)
                .ThenByDescending(c => c.AppliedDate)
                .ToList();
        }

        private decimal CalculateSkillsScore(
            List<string> candidateSkills,
            List<string> requiredSkills,
            out List<string> matched,
            out List<string> missing,
            out List<string> bonus)
        {
            matched = new List<string>();
            missing = new List<string>();
            bonus = new List<string>();

            if (!requiredSkills.Any())
            {
                return candidateSkills.Any() ? 70m : 50m;
            }

            foreach (var required in requiredSkills)
            {
                if (candidateSkills.Any(cs => cs.Equals(required, StringComparison.OrdinalIgnoreCase)))
                {
                    matched.Add(required);
                }
                else
                {
                    missing.Add(required);
                }
            }

            bonus = candidateSkills
                .Where(cs => !requiredSkills.Any(rs => rs.Equals(cs, StringComparison.OrdinalIgnoreCase)))
                .ToList();

            if (requiredSkills.Count == 0) return 100m;
            
            var matchPercentage = (decimal)matched.Count / requiredSkills.Count;
            var bonusPoints = Math.Min(bonus.Count * 5m, 20m); 
            
            return Math.Min(100m, (matchPercentage * 100m) + bonusPoints);
        }

        private decimal CalculateExperienceScore(int candidateYears, int requiredYears)
        {
            if (requiredYears == 0) return 100m;
            
            if (candidateYears >= requiredYears)
            {
                var overqualification = candidateYears - requiredYears;
                return Math.Min(100m, 100m + (overqualification * 2m)); 
            }
            else
            {
                return Math.Max(0m, (decimal)candidateYears / requiredYears * 100m);
            }
        }

        private decimal CalculateEducationScore(string candidateEducation, string requiredEducation)
        {
            if (string.IsNullOrWhiteSpace(requiredEducation)) return 100m;
            if (string.IsNullOrWhiteSpace(candidateEducation)) return 50m;

            var educationLevels = new Dictionary<string, int>
            {
                { "doctorat", 5 }, { "phd", 5 }, { "ph.d", 5 },
                { "master", 4 }, { "msc", 4 }, { "m.sc", 4 }, { "mba", 4 },
                { "licence", 3 }, { "bachelor", 3 }, { "bac+3", 3 },
                { "ingénieur", 4 }, { "engineer", 4 },
                { "bac+5", 4 }, { "bac+4", 4 },
                { "dut", 2 }, { "bts", 2 }, { "bac+2", 2 }
            };

            int candidateLevel = 0;
            int requiredLevel = 0;

            foreach (var level in educationLevels)
            {
                if (candidateEducation.Contains(level.Key, StringComparison.OrdinalIgnoreCase))
                {
                    candidateLevel = Math.Max(candidateLevel, level.Value);
                }
                if (requiredEducation.Contains(level.Key, StringComparison.OrdinalIgnoreCase))
                {
                    requiredLevel = Math.Max(requiredLevel, level.Value);
                }
            }

            if (requiredLevel == 0) return 100m;
            if (candidateLevel == 0) return 60m;

            if (candidateLevel >= requiredLevel)
            {
                return 100m;
            }
            else
            {
                return Math.Max(50m, (decimal)candidateLevel / requiredLevel * 100m);
            }
        }

        private decimal CalculateLanguagesScore(List<string> candidateLanguages, List<string> requiredLanguages)
        {
            if (!requiredLanguages.Any()) return 100m;
            if (!candidateLanguages.Any()) return 0m;

            var matchedCount = requiredLanguages.Count(rl => 
                candidateLanguages.Any(cl => cl.Equals(rl, StringComparison.OrdinalIgnoreCase))
            );

            return (decimal)matchedCount / requiredLanguages.Count * 100m;
        }

        private string GenerateRecommendation(decimal totalScore, int missingSkillsCount)
        {
            if (totalScore >= 85m)
            {
                return "Excellent candidat ! Profil très adapté au poste.";
            }
            else if (totalScore >= 70m)
            {
                return missingSkillsCount > 0
                    ? $"Bon candidat. Quelques compétences manquantes ({missingSkillsCount}) mais profil prometteur."
                    : "Bon candidat avec un profil solide.";
            }
            else if (totalScore >= 50m)
            {
                return "Candidat acceptable. Nécessite une évaluation approfondie.";
            }
            else
            {
                return "Profil peu adapté au poste. Nombreuses compétences manquantes.";
            }
        }

        private List<string> ParseJsonArray(string? json)
        {
            if (string.IsNullOrWhiteSpace(json)) return new List<string>();

            try
            {
                return JsonConvert.DeserializeObject<List<string>>(json) ?? new List<string>();
            }
            catch
            {
                 If not valid JSON, try splitting by comma
                return json.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(s => s.Trim())
                    .Where(s => !string.IsNullOrEmpty(s))
                    .ToList();
            }
        }
    }
}
