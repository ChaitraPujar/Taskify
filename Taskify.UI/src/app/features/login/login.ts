import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
  <div class="page-container">
    <h2>Login</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>Email</label>
        <input type="email" formControlName="email" />
      </div>

      <div>
        <label>Password</label>
        <input type="password" formControlName="password" />
      </div>

      <button type="submit" [disabled]="form.invalid">
        Login
      </button>
    </form>

    <div class="switch-auth">
      Don't have an account? 
      <a [routerLink]="['/register']">Register here</a>
    </div>

  </div>
  `,
  styleUrl: './login.css',
})
export class Login {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService : NotificationService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.notificationService.show('Login successful', 'success');
        this.router.navigate(['/tasks']);
      },
      error: err => {
        this.notificationService.show('Invalid credentials', 'error');
      }
    });
  }
}
