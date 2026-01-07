using Microsoft.EntityFrameworkCore;
using Taskify.Core.Common;
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

        /// <summary>
        /// Overriding and customizing default save changes behaviour of EF
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<BaseEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
