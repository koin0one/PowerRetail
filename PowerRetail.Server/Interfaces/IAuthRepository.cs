using PowerRetail.Server.Models;
using PowerRetail.Server.Models.DTOs;

namespace PowerRetail.Server.Interfaces
{
    public interface IAuthRepository
    {
        Task AddUserAsync(User user);
        Task<User> GetUserByEmailAsync(string userName);

        Task<string> ChangePasswordAsync(User request, string newPassword);
    }
}
