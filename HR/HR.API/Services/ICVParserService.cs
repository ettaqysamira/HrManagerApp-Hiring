using System.Threading.Tasks;

namespace HR.API.Services
{
    public interface ICVParserService
    {
        Task<string> ExtractTextFromPdfAsync(string filePath);
        Task<string> ExtractTextFromDocxAsync(string filePath);
        Task<string> ExtractTextAsync(string filePath);
    }
}
