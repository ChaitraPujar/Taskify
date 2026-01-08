import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Register } from './features/register/register';
import { TaskList } from './features/tasks/task-list/task-list';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'tasks', component: TaskList, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
