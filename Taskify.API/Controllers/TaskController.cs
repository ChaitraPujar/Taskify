using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Taskify.Core.Entities;
using Taskify.Core.Enums;
using Taskify.Infrastructure.Services;

namespace Taskify.API.Controllers
{
    /// <summary>
    /// Controller responsible for managing task-related operations.
    /// Provides endpoints to create, read, update, delete, and filter tasks.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        /// <summary>
        /// Initializes a new instance of the <see cref="TaskController"/> class.
        /// </summary>
        /// <param name="taskService">Service handling task business logic.</param>
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Creates a new task.
        /// </summary>
        /// <param name="task">The task details to create.</param>
        /// <returns>
        /// HTTP 200 with the created task.
        /// </returns>
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskItem task)
        {
            task.UserId = GetUserIdFromClaims();
            var createdTask = await _taskService.CreateTaskAsync(task);
            return Ok(createdTask);
        }

        /// <summary>
        /// Retrieves a task by its identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the task.</param>
        /// <returns>
        /// HTTP 200 with the task if found.
        /// HTTP 404 if the task does not exist.
        /// </returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        /// <summary>
        /// Retrieves all tasks, optionally filtered by status and/or priority.
        /// </summary>
        /// <param name="status">Optional task status filter.</param>
        /// <param name="priority">Optional task priority filter.</param>
        /// <returns>
        /// HTTP 200 with a list of matching tasks.
        /// </returns>
        [HttpGet]
        public async Task<IActionResult> GetTasks(
            [FromQuery] Status? status,
            [FromQuery] TaskPriority? priority)
        {
            var tasks = await _taskService.GetTasksAsync(status, priority);
            return Ok(tasks);
        }

        /// <summary>
        /// Updates an existing task.
        /// </summary>
        /// <param name="id">The identifier of the task to update.</param>
        /// <param name="task">The updated task data.</param>
        /// <returns>
        /// HTTP 200 with the updated task if successful.
        /// HTTP 400 if route Id does not match task Id.
        /// HTTP 404 if the task does not exist.
        /// </returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(string id, [FromBody] TaskItem task)
        {
            if (id != task.Id.ToString())
                return BadRequest("Task ID mismatch.");

            var updatedTask = await _taskService.UpdateTaskAsync(task);
            if (updatedTask == null)
                return NotFound();

            return Ok(updatedTask);
        }

        /// <summary>
        /// Deletes a task by its identifier.
        /// </summary>
        /// <param name="id">The identifier of the task to delete.</param>
        /// <returns>
        /// HTTP 204 if deletion is successful.
        /// HTTP 404 if the task does not exist.
        /// </returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(string id)
        {
            var deleted = await _taskService.DeleteTaskAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

        #region Private methods
        private Guid GetUserIdFromClaims()
        {
            if (User?.Identity == null || !User.Identity.IsAuthenticated)
                throw new UnauthorizedAccessException("User is not authenticated.");

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User ID claim not found.");

            return Guid.Parse(userIdClaim.Value);
        }
        #endregion
    }
}
