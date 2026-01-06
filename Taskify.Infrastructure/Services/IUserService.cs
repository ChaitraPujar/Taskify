using Taskify.Core.Entities;

namespace Taskify.Infrastructure.Services
{
    /// <summary>
    /// Service interface for user-related operations.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Gets a user by email.
        /// </summary>
        Task<User?> GetByEmailAsync(string email);

        /// <summary>
        /// Creates a new user with hashed password.
        /// </summary>
        Task<User> CreateUserAsync(User user, string password);

        /// <summary>
        /// Verifies user password.
        /// </summary>
        Task<bool> VerifyPasswordAsync(User user, string password);
    }
}
