using Microsoft.EntityFrameworkCore;
using Taskify.Core.Entities;

namespace Taskify.Infrastructure.Data
{
    /// <summary>
    /// EF Core DbContext for Taskify application.
    /// Handles Users and Tasks tables.
    /// </summary>
    public class TaskifyDbContext : DbContext
    {
        public TaskifyDbContext(DbContextOptions<TaskifyDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Users table
        /// </summary>
        public DbSet<User> Users => Set<User>();

        /// <summary>
        /// Tasks table
        /// </summary>
        public DbSet<TaskItem> Tasks => Set<TaskItem>();
    }
}
