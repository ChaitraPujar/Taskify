using Taskify.Core.Common;

namespace Taskify.Core.Entities
{
    /// <summary>
    /// Represents an application user.
    /// </summary>
    public class User : BaseEntity
    {
        /// <summary>
        /// User email address (unique).
        /// </summary>
        public string Email { get; set; } = default!;

        /// <summary>
        /// Hashed user password.
        /// </summary>
        public string PasswordHash { get; set; } = default!;
    }
}
