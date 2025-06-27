using Microsoft.AspNetCore.Mvc;
using PowerRetail.Server.Models;
using PowerRetail.Server.Models.DTOs;
using PowerRetail.Server.Services;

namespace PowerRetail.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController: ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User request)
        {
            try
            {
                var user = new User
                {
                    FullName = request.FullName,
                    UserName = request.UserName,
                    Password = request.Password,
                    SecondPassword = request.SecondPassword,
                    CreatedAt = DateTime.Now,
                    ModifedAt = DateTime.Now
                };
                var newUser = await _authService.RegisterAsync(user);
                return Ok(newUser);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO request)
        {
            try
            {
                var loginUser = await _authService.Login(request);
                return Ok(loginUser);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO request)
        {
            try
            {
                var result = await _authService.ChangePassword(request);
                return Ok(new
                {
                    Success = true,
                    Message = "Password changed successfully",
                    Data = result
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

    }
}
