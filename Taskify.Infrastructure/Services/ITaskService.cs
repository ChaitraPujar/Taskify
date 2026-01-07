using Taskify.Core.Entities;
using Taskify.Core.Enums;

namespace Taskify.Infrastructure.Services
{
    /// <summary>
    /// Service interface for task CRUD operations.
    /// </summary>
    public interface ITaskService
    {
        /// <summary>
        /// Creates a task
        /// </summary>
        /// <param name="task"></param>
        /// <returns>Newly created task</returns>
        Task<TaskItem> CreateTaskAsync(TaskItem task);

        /// <summary>
        /// Gets a task by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Retrieved task</returns>
        Task<TaskItem?> GetTaskByIdAsync(int id);

        /// <summary>
        /// Retrieve tasks by status and priority
        /// </summary>
        /// <param name="status"></param>
        /// <param name="priority"></param>
        /// <returns>Filtered tasks</returns>
        Task<IEnumerable<TaskItem>> GetTasksAsync(Status? status = null, TaskPriority? priority = null);

        /// <summary>
        /// Updates a task
        /// </summary>
        /// <param name="task"></param>
        /// <returns>Updated task</returns>
        Task<TaskItem?> UpdateTaskAsync(TaskItem task);

        /// <summary>
        /// Deletes a task using id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Returns true if operation is successful otherwise false</returns>
        Task<bool> DeleteTaskAsync(string id);
    }
}
