using System.Threading.Tasks;
using System.Collections.Generic;
using HR.API.Models;
using HR.API.DTOs;

namespace HR.API.Services
{
    public interface IMatchingService
    {
        Task<MatchingResult> CalculateMatchScoreAsync(int candidateId, int jobOfferId);
        Task<List<CandidateMatchDto>> RankCandidatesAsync(int jobOfferId, decimal? minScore = null);
    }
}
