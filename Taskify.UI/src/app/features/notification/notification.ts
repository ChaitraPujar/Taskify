import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div *ngIf="notificationService.notification$ | async as notif" 
         class="notification" [ngClass]="notif.type">
      {{ notif.message }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 4px;
      color: white;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      font-size: 0.9rem;
    }
    .success { background-color: #4caf50; }
    .error { background-color: #f44336; }
    .info { background-color: #2196f3; }
  `]
})
export class Notification {
  constructor(public notificationService: NotificationService) {}
}
