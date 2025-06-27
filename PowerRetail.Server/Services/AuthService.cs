using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;
using PowerRetail.Server.Models.DTOs;
using System.Text.RegularExpressions;

namespace PowerRetail.Server.Services
{
    public class AuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        public async Task<User?> RegisterAsync(User request)
        {
            if (string.IsNullOrWhiteSpace(request.UserName))
                throw new ArgumentException("Username is required!");
            if (string.IsNullOrWhiteSpace(request.Password))
                throw new ArgumentException("Password is required!");
            if (string.IsNullOrWhiteSpace(request.FullName))
                throw new ArgumentException("Full name is required!");
            if (string.IsNullOrWhiteSpace(request.SecondPassword))
                throw new ArgumentException("Second password is required!");

            if (!Regex.IsMatch(request.UserName, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                throw new ArgumentException("Invalid email format!");

            var existingUser = await _authRepository.GetUserByEmailAsync(request.UserName);
            if (existingUser != null)
            {
                throw new InvalidOperationException("Trùng tên đăng nhập");
            }

            request.UserId = Guid.NewGuid();
            await _authRepository.AddUserAsync(request);

            return request;
        }

        public async Task<User> Login(LoginDTO request)
        {
            User user = await _authRepository.GetUserByEmailAsync(request.UserName);

            if (user == null)
            {
                throw new InvalidOperationException("Invalid username or password!!!");
            }

            if (user.Password != request.Password)
            {
                throw new InvalidOperationException("Invalid username or password!!!");
            }
            return user;
        }

        public async Task<string> ChangePassword(ChangePasswordDTO request)
        {
            User user = await _authRepository.GetUserByEmailAsync(request.UserName);

            if (user == null)
            {
                throw new InvalidOperationException("Invalid username or password!!!");
            }

            if (user.Password != request.OldPassword)
            {
                throw new InvalidOperationException("Invalid username or password!!!");
            }

            var message = await _authRepository.ChangePasswordAsync(user, request.NewPassword);

            return message;
        }

    }
}
