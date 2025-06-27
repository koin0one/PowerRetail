using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PowerRetail.Server.Data;
using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;
using PowerRetail.Server.Models.DTOs;

namespace PowerRetail.Server.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly RetailContext _context;
        public AuthRepository(RetailContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string userName) => await _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);

        public async Task AddUserAsync(User request)
        {
            _context.Users.Add(request);
            await _context.SaveChangesAsync();
        }

        public async Task<string> ChangePasswordAsync(User request, string newPassword)
        {
            request.Password = newPassword;
            await _context.SaveChangesAsync();
            return "Đổi mật khẩu thành công!";
        }
    }
}
