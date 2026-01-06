using Microsoft.AspNetCore.Mvc;
using Taskify.Core.Entities;
using Taskify.Infrastructure.Auth;
using Taskify.Infrastructure.Services;

namespace Taskify.API.Controllers
{
    /// <summary>
    /// Controller responsible for user registration and login.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtService _jwtService;

        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController"/> class.
        /// </summary>
        /// <param name="userService">Service for user-related operations.</param>
        /// <param name="jwtService">Service for generating JWT tokens.</param>
        public AuthController(IUserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        /// <summary>
        /// Registers a new user with email and password.
        /// </summary>
        /// <param name="user">
        /// The user object containing:
        /// - <see cref="User.Email"/> (required)
        /// - <see cref="User.PasswordHash"/> (plain text password)
        /// </param>
        /// <returns>
        /// HTTP 200 with the created user Id and Email if successful.
        /// HTTP 400 if the email is already in use.
        /// </returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _userService.GetByEmailAsync(user.Email) != null)
                return BadRequest("Email already in use");

            var createdUser = await _userService.CreateUserAsync(user, user.PasswordHash);
            return Ok(new { createdUser.Id, createdUser.Email });
        }

        /// <summary>
        /// Authenticates a user and returns a JWT token.
        /// </summary>
        /// <param name="user">
        /// The user object containing:
        /// - <see cref="User.Email"/> (required)
        /// - <see cref="User.PasswordHash"/> (plain text password)
        /// </param>
        /// <returns>
        /// HTTP 200 with a JWT token if credentials are valid.
        /// HTTP 401 if credentials are invalid.
        /// </returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _userService.GetByEmailAsync(user.Email);
            if (existingUser == null) return Unauthorized("Invalid credentials");

            var validPassword = await _userService.VerifyPasswordAsync(existingUser, user.PasswordHash);
            if (!validPassword) return Unauthorized("Invalid credentials");

            var token = _jwtService.GenerateToken(existingUser);
            return Ok(new { token });
        }
    }
}
