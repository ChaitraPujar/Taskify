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
  template: `
  <div class="task-page">
    <h2>My Tasks</h2>

    <!-- Add Task Form -->
    <form (ngSubmit)="addTask()" style="margin-bottom: 20px;">
      <input [(ngModel)]="newTask.title" name="title" placeholder="Title" required />
      <input [(ngModel)]="newTask.description" name="description" placeholder="Description" />
      <input [(ngModel)]="newTask.dueDate" name="dueDate" type="date" required />
      <select [(ngModel)]="newTask.priority" name="priority">
        <option *ngFor="let p of priorities">{{ p }}</option>
      </select>
      <button type="submit">Add Task</button>
    </form>

    <!-- Filter -->
    <div class="filters">
      <div>
    <label>Status</label>
    <select [(ngModel)]="filterStatus" (change)="applyFilters()">
      <option value="">All</option>
      <option *ngFor="let s of statuses">{{ s }}</option>
    </select>
  </div>

  <div>
    <label>Priority</label>
    <select [(ngModel)]="filterPriority" (change)="applyFilters()">
      <option value="">All</option>
      <option *ngFor="let p of priorities">{{ p }}</option>
    </select>
  </div>
</div>

    <!-- Task Table -->
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let task of filteredTasks">
          <td [class.completed]="task.status === 'Completed'"> {{ task.title }} </td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate | date }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.status }}</td>
          <td class="actions">
            <button (click)="editTask(task)">Toggle</button>
            <button (click)="deleteTask(task.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`
  .task-page {
    max-width: 900px;
    margin: 40px auto;
    background: #ffffff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  /* Form layout */
  form {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr auto;
    gap: 10px;
    margin-bottom: 20px;
    align-items: stretch;
  }

  form input,
  form select {
    padding: 8px;
  }

  form button {
    height: 38px;
    padding: 0px 10px;
    width: auto;
    white-space: nowrap;
  }

  /* Filters */
  .filters {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background-color: #f0f0f0;
    text-align: left;
  }

  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  tr:hover {
    background-color: #fafafa;
  }

  .actions button {
    margin-right: 6px;
    width: auto;
    padding: 6px 10px;
  }

  .completed {
    text-decoration: line-through;
    color: gray;
  }
`],
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
