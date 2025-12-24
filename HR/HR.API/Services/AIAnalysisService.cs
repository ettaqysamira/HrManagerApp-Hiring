using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HR.API.Models;
using Microsoft.Extensions.Configuration;

namespace HR.API.Services
{
    public class AIAnalysisService : IAIAnalysisService
    {
        private readonly IConfiguration _configuration;
        private readonly string _provider;

        private static readonly HashSet<string> TechnicalSkills = new()
        {
            "C#", "Java", "Python", "JavaScript", "TypeScript", "C++", "C", "Go", "Rust", "PHP", 
            "Ruby", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Dart", "Objective-C",
            
            "HTML", "CSS", "React", "Angular", "Vue", "Node.js", "Express", "Next.js", "Nuxt", 
            "jQuery", "Bootstrap", "Tailwind", "SASS", "LESS", "Webpack", "Vite",
            
            ".NET", "ASP.NET", "Spring", "Django", "Flask", "FastAPI", "Laravel", "Rails", 
            "Symfony", "NestJS", "Gin", "Fiber",
            
            "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Cassandra", "Oracle", 
            "SQL Server", "SQLite", "MariaDB", "DynamoDB", "Elasticsearch", "Neo4j",
            
            "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions",
            "Terraform", "Ansible", "Chef", "Puppet", "CircleCI", "Travis CI",
            
            "React Native", "Flutter", "Xamarin", "Ionic", "Android", "iOS", "SwiftUI",
            
            "Git", "SVN", "Jira", "Confluence", "Postman", "Swagger", "REST API", "GraphQL",
            "Microservices", "Agile", "Scrum", "TDD", "CI/CD", "Machine Learning", "AI",
            "Data Science", "Big Data", "Hadoop", "Spark", "Kafka", "RabbitMQ", "gRPC"
        };

        private static readonly HashSet<string> Languages = new()
        {
            "Français", "Anglais", "Espagnol", "Allemand", "Italien", "Portugais", "Arabe",
            "Chinois", "Japonais", "Russe", "Hindi", "Néerlandais", "Turc", "Coréen",
            "French", "English", "Spanish", "German", "Italian", "Portuguese", "Arabic",
            "Chinese", "Japanese", "Russian", "Hindi", "Dutch", "Turkish", "Korean"
        };

        public AIAnalysisService(IConfiguration configuration)
        {
            _configuration = configuration;
            _provider = _configuration["AISettings:Provider"] ?? "Local";
        }

        public async Task<CVAnalysisResult> AnalyzeCVAsync(string cvText, string jobDescription = "")
        {
            var result = new CVAnalysisResult
            {
                Skills = await ExtractSkillsAsync(cvText),
                YearsOfExperience = await ExtractYearsOfExperienceAsync(cvText),
                Education = await ExtractEducationAsync(cvText),
                Languages = await ExtractLanguagesAsync(cvText),
                Certifications = await ExtractCertificationsAsync(cvText),
                WorkHistory = ExtractWorkHistory(cvText),
                Summary = ExtractSummary(cvText)
            };

            return result;
        }

        public async Task<List<string>> ExtractSkillsAsync(string cvText)
        {
            return await Task.Run(() =>
            {
                var extractedSkills = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
                var textUpper = cvText.ToUpper();

                foreach (var skill in TechnicalSkills)
                {
                    var pattern = $@"\b{Regex.Escape(skill)}\b";
                    if (Regex.IsMatch(cvText, pattern, RegexOptions.IgnoreCase))
                    {
                        extractedSkills.Add(skill);
                    }
                }

                var skillsSectionPattern = @"(?:COMPÉTENCES|SKILLS|TECHNOLOGIES|TECHNICAL SKILLS)[\s:]*\n(.*?)(?:\n\n|\n[A-Z]{2,}|$)";
                var match = Regex.Match(cvText, skillsSectionPattern, RegexOptions.IgnoreCase | RegexOptions.Singleline);
                
                if (match.Success)
                {
                    var skillsSection = match.Groups[1].Value;
                    var items = Regex.Split(skillsSection, @"[,•\-\n]")
                        .Select(s => s.Trim())
                        .Where(s => s.Length > 2 && s.Length < 30);
                    
                    foreach (var item in items)
                    {
                        extractedSkills.Add(item);
                    }
                }

                return extractedSkills.ToList();
            });
        }

        public async Task<int> ExtractYearsOfExperienceAsync(string cvText)
        {
            return await Task.Run(() =>
            {
                var currentYear = DateTime.Now.Year;
                var years = new List<int>();

                var experiencePattern = @"(\d+)\s*(?:ans?|years?)\s*(?:d[''']expérience|of experience|experience)";
                var match = Regex.Match(cvText, experiencePattern, RegexOptions.IgnoreCase);
                if (match.Success && int.TryParse(match.Groups[1].Value, out int explicitYears))
                {
                    return explicitYears;
                }

                var datePatterns = new[]
                {
                    @"\b(19\d{2}|20\d{2})\s*[-–—]\s*(19\d{2}|20\d{2}|présent|present|aujourd'hui|current)\b",
                    @"\b(19\d{2}|20\d{2})\b"
                };

                foreach (var pattern in datePatterns)
                {
                    var matches = Regex.Matches(cvText, pattern, RegexOptions.IgnoreCase);
                    foreach (Match m in matches)
                    {
                        if (int.TryParse(m.Groups[1].Value, out int year))
                        {
                            years.Add(year);
                        }
                    }
                }

                if (years.Any())
                {
                    var earliestYear = years.Min();
                    var calculatedYears = currentYear - earliestYear;
                    return Math.Max(0, Math.Min(calculatedYears, 50));
                }

                return 0;
            });
        }

        public async Task<List<string>> ExtractLanguagesAsync(string cvText)
        {
            return await Task.Run(() =>
            {
                var extractedLanguages = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

                foreach (var language in Languages)
                {
                    var pattern = $@"\b{Regex.Escape(language)}\b";
                    if (Regex.IsMatch(cvText, pattern, RegexOptions.IgnoreCase))
                    {
                        var normalized = language.ToLower() switch
                        {
                            "français" => "French",
                            "anglais" => "English",
                            "espagnol" => "Spanish",
                            "allemand" => "German",
                            "italien" => "Italian",
                            "portugais" => "Portuguese",
                            "arabe" => "Arabic",
                            "chinois" => "Chinese",
                            "japonais" => "Japanese",
                            "russe" => "Russian",
                            "néerlandais" => "Dutch",
                            "turc" => "Turkish",
                            "coréen" => "Korean",
                            _ => language
                        };
                        extractedLanguages.Add(normalized);
                    }
                }

                return extractedLanguages.ToList();
            });
        }

        public async Task<List<EducationEntry>> ExtractEducationAsync(string cvText)
        {
            return await Task.Run(() =>
            {
                var educationList = new List<EducationEntry>();
                
                var degreePatterns = new[]
                {
                    @"(Master|M\.Sc|MSc|MBA|Doctorat|PhD|Ph\.D|Licence|Bachelor|Bac\+\d|Ingénieur|DUT|BTS)\s+(?:en|in|de)?\s*([^\n,]{5,50})",
                    @"(Diplôme|Degree)\s+(?:en|in|de)\s*([^\n,]{5,50})"
                };

                foreach (var pattern in degreePatterns)
                {
                    var matches = Regex.Matches(cvText, pattern, RegexOptions.IgnoreCase);
                    foreach (Match match in matches)
                    {
                        educationList.Add(new EducationEntry
                        {
                            Degree = match.Groups[1].Value.Trim(),
                            Field = match.Groups[2].Value.Trim()
                        });
                    }
                }

                var yearPattern = @"\b(19\d{2}|20\d{2})\b";
                var yearMatches = Regex.Matches(cvText, yearPattern);
                if (yearMatches.Count > 0 && educationList.Count > 0)
                {
                    var years = yearMatches.Cast<Match>()
                        .Select(m => int.Parse(m.Value))
                        .OrderByDescending(y => y)
                        .ToList();
                    
                    for (int i = 0; i < Math.Min(educationList.Count, years.Count); i++)
                    {
                        educationList[i].Year = years[i];
                    }
                }

                return educationList.Distinct().Take(5).ToList();
            });
        }

        public async Task<List<string>> ExtractCertificationsAsync(string cvText)
        {
            return await Task.Run(() =>
            {
                var certifications = new List<string>();
                
                var certPattern = @"(?:CERTIFICATIONS?|CERTIFICATES?)[\s:]*\n(.*?)(?:\n\n|\n[A-Z]{2,}|$)";
                var match = Regex.Match(cvText, certPattern, RegexOptions.IgnoreCase | RegexOptions.Singleline);
                
                if (match.Success)
                {
                    var certSection = match.Groups[1].Value;
                    var items = Regex.Split(certSection, @"[•\-\n]")
                        .Select(s => s.Trim())
                        .Where(s => s.Length > 5 && s.Length < 100);
                    
                    certifications.AddRange(items);
                }

                var commonCerts = new[]
                {
                    "AWS Certified", "Azure Certified", "Google Cloud Certified", "PMP", "CISSP",
                    "Scrum Master", "Product Owner", "ITIL", "CompTIA", "Cisco", "Oracle Certified"
                };

                foreach (var cert in commonCerts)
                {
                    if (cvText.Contains(cert, StringComparison.OrdinalIgnoreCase))
                    {
                        certifications.Add(cert);
                    }
                }

                return certifications.Distinct().ToList();
            });
        }

        private List<WorkExperience> ExtractWorkHistory(string cvText)
        {
            var workHistory = new List<WorkExperience>();
            
            var jobPattern = @"(?:^|\n)([A-Z][^\n]{10,60})\s*(?:at|chez|@)\s*([A-Z][^\n]{3,40})";
            var matches = Regex.Matches(cvText, jobPattern, RegexOptions.Multiline);
            
            foreach (Match match in matches.Cast<Match>().Take(10))
            {
                workHistory.Add(new WorkExperience
                {
                    Position = match.Groups[1].Value.Trim(),
                    Company = match.Groups[2].Value.Trim()
                });
            }

            return workHistory;
        }

        private string ExtractSummary(string cvText)
        {
            var summaryPattern = @"(?:RÉSUMÉ|SUMMARY|PROFIL|PROFILE|ABOUT)[\s:]*\n(.*?)(?:\n\n|\n[A-Z]{2,}|$)";
            var match = Regex.Match(cvText, summaryPattern, RegexOptions.IgnoreCase | RegexOptions.Singleline);
            
            if (match.Success)
            {
                return match.Groups[1].Value.Trim().Substring(0, Math.Min(500, match.Groups[1].Value.Trim().Length));
            }

            return cvText.Substring(0, Math.Min(300, cvText.Length)).Trim();
        }
    }
}
