import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, catchError, of } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  newTask: Task = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Pending', 'Completed'];

  filterStatus = '';
  filterPriority = '';

  isUpdating = false;
  isLoading = false;
  errorMessage = '';

  editingTaskId: string | null = null;
  editModel: {
    description?: string;
    status?: 'Pending' | 'Completed';
  } = {};

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasks()
      .pipe(
        catchError(() => {
          this.errorMessage = 'Failed to load tasks.';
          return of([]); // fallback empty list
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(tasks => {
        this.tasks = tasks;
        this.applyFilters();
      });
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.dueDate) {
      this.notificationService.show(
        'Title and Due Date are required.',
        'error'
      );
      return;
    }

    this.isLoading = true;

    this.taskService.createTask(this.newTask)
      .pipe(
        catchError(() => {
          this.notificationService.show(
            'Failed to create task.',
            'error'
          );
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(result => {
        if (!result) return;

        this.notificationService.show(
          'Task added successfully.',
          'success'
        );

        // Reset form
        this.newTask = {
          title: '',
          description: '',
          dueDate: '',
          priority: 'Medium',
          status: 'Pending'
        };
        this.loadTasks();
      });
  }

  editTask(task: Task) {

    if (!task.id) {
      this.notificationService.show(
        'Task ID missing. Cannot update.',
        'error'
      );
      return;
    }

    this.isUpdating = true;

    const updatedTask: Task = {
      ...task,
      description: this.editModel.description,
      status: this.editModel.status!
    };

    this.taskService.updateTask(updatedTask)
      .pipe(
        catchError(() => {
          this.notificationService.show(
            'Failed to update task.',
            'error'
          );
          return of(null);
        }),
        finalize(() => {
          this.isUpdating = false;
        })
      )
      .subscribe(result => {
        if (!result) return;

        this.notificationService.show(
          'Task updated successfully.',
          'success'
        );

        this.editingTaskId = null;
        this.editModel = {};
        this.loadTasks();
      });
  }

  deleteTask(id: string) {
    this.isLoading = true;

    this.taskService.deleteTask(id)
      .pipe(
        catchError(() => {
          this.notificationService.show(
            'Failed to delete task.',
            'error'
          );
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.notificationService.show(
          'Task deleted successfully.',
          'success'
        );

        this.loadTasks();
      });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(t =>
      (this.filterStatus ? t.status === this.filterStatus : true) &&
      (this.filterPriority ? t.priority === this.filterPriority : true)
    );
  }

  // grid inline editing methods
  startEdit(task: Task) {
    if (!task.id) return;

    this.editingTaskId = task.id;
    this.editModel = {
      description: task.description,
      status: task.status
    };
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editModel = {};
  }

}
