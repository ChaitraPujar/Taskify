using Microsoft.EntityFrameworkCore;
using Taskify.Core.Entities;
using Taskify.Core.Enums;
using Taskify.Infrastructure.Data;

namespace Taskify.Infrastructure.Services
{
    /// <summary>
    /// Implements CRUD operations for <see cref="TaskItem"/> entities.
    /// </summary>
    public class TaskService : ITaskService
    {
        private readonly TaskifyDbContext _dbContext;

        public TaskService(TaskifyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Creates a new task in the database.
        /// </summary>
        /// <param name="task">The task to create.</param>
        /// <returns>The created <see cref="TaskItem"/> with Id populated.</returns>
        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        /// <summary>
        /// Retrieves a task by its identifier.
        /// </summary>
        /// <param name="id">The Id of the task.</param>
        /// <returns>The <see cref="TaskItem"/> if found; otherwise, null.</returns>
        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            return await _dbContext.Tasks.FindAsync(id);
        }

        /// <summary>
        /// Retrieves all tasks, optionally filtered by status and/or priority.
        /// </summary>
        /// <param name="status">Optional <see cref="Status"/> filter.</param>
        /// <param name="priority">Optional <see cref="TaskPriority"/> filter.</param>
        /// <returns>List of <see cref="TaskItem"/> matching the filters.</returns>
        public async Task<IEnumerable<TaskItem>> GetTasksAsync(Status? status = null, TaskPriority? priority = null)
        {
            var query = _dbContext.Tasks.AsQueryable();

            if (status.HasValue)
                query = query.Where(t => t.Status == status.Value);

            if (priority.HasValue)
                query = query.Where(t => t.Priority == priority.Value);

            return await query.ToListAsync();
        }

        /// <summary>
        /// Updates an existing task.
        /// </summary>
        /// <param name="task">The task with updated values. Must include Id.</param>
        /// <returns>The updated <see cref="TaskItem"/> if found; otherwise, null.</returns>
        public async Task<TaskItem?> UpdateTaskAsync(TaskItem task)
        {
            var existing = await _dbContext.Tasks.FindAsync(task.Id);
            if (existing == null) return null;

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.DueDate = task.DueDate;
            existing.Priority = task.Priority;
            existing.Status = task.Status;

            await _dbContext.SaveChangesAsync();
            return existing;
        }

        /// <summary>
        /// Deletes a task by its identifier.
        /// </summary>
        /// <param name="id">The Id of the task to delete.</param>
        /// <returns>True if deletion succeeded; otherwise, false.</returns>
        public async Task<bool> DeleteTaskAsync(string id)
        {
            var existing = await _dbContext.Tasks.FindAsync(id);
            if (existing == null) return false;

            _dbContext.Tasks.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
