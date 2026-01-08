import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, catchError, of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  private taskService = inject(TaskService);

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  newTask: Task = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Pending', 'Completed'];

  filterStatus = '';
  filterPriority = '';

  isLoading = false;
  errorMessage = '';

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
      this.errorMessage = 'Title and Due Date are required.';
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    this.taskService.createTask(this.newTask)
      .pipe(
        catchError(() => {
          this.errorMessage = 'Failed to create task.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(result => {
        if (!result) return;

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
    const updatedStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    this.taskService.updateTask({ ...task, status: updatedStatus }).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(t =>
      (this.filterStatus ? t.status === this.filterStatus : true) &&
      (this.filterPriority ? t.priority === this.filterPriority : true)
    );
  }
}
