using System.Threading.Tasks;
using HR.API.Models;

namespace HR.API.Services
{
    public interface IContractGeneratorService
    {
        Task<string> GenerateContractFileAsync(Contract contract);
    }
}
