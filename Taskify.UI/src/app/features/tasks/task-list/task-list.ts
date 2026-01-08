import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
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
    <div style="margin-bottom: 10px;">
      <label>Status:</label>
      <select [(ngModel)]="filterStatus" (change)="applyFilters()">
        <option value="">All</option>
        <option *ngFor="let s of statuses">{{ s }}</option>
      </select>
      <label>Priority:</label>
      <select [(ngModel)]="filterPriority" (change)="applyFilters()">
        <option value="">All</option>
        <option *ngFor="let p of priorities">{{ p }}</option>
      </select>
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
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.dueDate | date }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button (click)="editTask(task)">Edit</button>
            <button (click)="deleteTask(task.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 5px; text-align: left; }
    input, select, button { margin-right: 5px; }
    button { cursor: pointer; }
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

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.applyFilters();
    });
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', dueDate: '', priority: 'Medium', status: 'Pending' };
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
