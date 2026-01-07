using Taskify.Core.Common;
using Taskify.Core.Enums;

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
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;

        /// <summary>
        /// Current status of the task.
        /// </summary>
        public Status Status { get; set; } = Status.Pending;

        /// <summary>
        /// Identifier of the user who owns this task.
        /// </summary>
        public Guid UserId { get; set; }
    }
}
