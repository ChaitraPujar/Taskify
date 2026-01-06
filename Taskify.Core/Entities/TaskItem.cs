using Taskify.Core.Common;
using Taskify.Core.Enums;
using TaskStatus = Taskify.Core.Enums.TaskStatus;

namespace Taskify.Core.Entities
{
    /// <summary>
    /// Represents a task created by a user.
    /// </summary>
    public class TaskItem : BaseEntity
    {
        /// <summary>
        /// Short title describing the task.
        /// </summary>
        public string Title { get; set; } = default!;

        /// <summary>
        /// Optional detailed description of the task.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// Due date of the task.
        /// </summary>
        public DateTime DueDate { get; set; }

        /// <summary>
        /// Priority level of the task.
        /// </summary>
        public TaskPriority Priority { get; set; }

        /// <summary>
        /// Current status of the task.
        /// </summary>
        public TaskStatus Status { get; set; } = TaskStatus.Pending;

        /// <summary>
        /// Identifier of the user who owns this task.
        /// </summary>
        public Guid UserId { get; set; }
    }
}
