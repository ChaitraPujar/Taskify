import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Notification } from './features/notification/notification';
import { AuthService } from './core/services/auth.service';
import { NotificationService } from './core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Notification],
  template: `
  <header class="app-header">
    <div class="header-left"></div>
    <div class="header-center"><h1>Taskify</h1></div>
    <div class="header-right">   
      @if(authService.isLoggedIn()){
        <button (click)="logout()" class="logout-btn" title="Logout from app">
          <svg class="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Logout
        </button>
      }
    </div>
  </header>

  <main>
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  </main>
  `,
  styleUrl: './app.css'
})
export class App {
  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  logout() {
    this.authService.logout();
    this.notificationService.show('Logged out successfully', 'success');
    this.router.navigate(['/login']);
  }
  protected readonly title = signal('Taskify');
}
