using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Taskify.Core.Entities;
using Taskify.Infrastructure.Data;

namespace Taskify.Infrastructure.Services
{
    /// <summary>
    /// Implements user-related operations such as registration, password verification, and lookup.
    /// </summary>
    public class UserService : IUserService
    {
        private readonly TaskifyDbContext _dbContext;
        private readonly PasswordHasher<User> _passwordHasher = new();

        /// <summary>
        /// Constructor that injects dbcontext
        /// </summary>
        /// <param name="dbContext"></param>
        public UserService(TaskifyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Retrieves a user by their email address.
        /// </summary>
        /// <param name="email">The email of the user to retrieve.</param>
        /// <returns>The <see cref="User"/> if found; otherwise, null.</returns>
        public async Task<User?> GetByEmailAsync(string email)
            => await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        /// <summary>
        /// Creates a new user in the database with a hashed password.
        /// </summary>
        /// <param name="user">The user entity containing Email and other details.</param>
        /// <param name="password">The plain text password to hash and store.</param>
        /// <returns>The created <see cref="User"/> entity with Id populated.</returns>
        public async Task<User> CreateUserAsync(User user, string password)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        /// <summary>
        /// Verifies whether the provided password matches the stored hashed password.
        /// </summary>
        /// <param name="user">The user entity with stored PasswordHash.</param>
        /// <param name="password">The plain text password to verify.</param>
        /// <returns>True if password is correct; otherwise, false.</returns>
        public Task<bool> VerifyPasswordAsync(User user, string password)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            return Task.FromResult(result != PasswordVerificationResult.Failed);
        }
    }
}
