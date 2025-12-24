using System.Threading.Tasks;
using System.Collections.Generic;
using HR.API.Models;

namespace HR.API.Services
{
    public interface IAIAnalysisService
    {
        Task<CVAnalysisResult> AnalyzeCVAsync(string cvText, string jobDescription = "");
        Task<List<string>> ExtractSkillsAsync(string cvText);
        Task<int> ExtractYearsOfExperienceAsync(string cvText);
        Task<List<string>> ExtractLanguagesAsync(string cvText);
        Task<List<EducationEntry>> ExtractEducationAsync(string cvText);
        Task<List<string>> ExtractCertificationsAsync(string cvText);
    }
}
