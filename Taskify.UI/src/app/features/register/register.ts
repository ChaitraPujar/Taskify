import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
  <div class="page-container">
    <h2>Register</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label>Email:</label>
        <input formControlName="email" type="email" required>
      </div>
      <div>
        <label>Password:</label>
        <input formControlName="password" type="password" required>
      </div>
      <button type="submit" [disabled]="form.invalid">Register</button>
    </form>

    <div class="switch-auth">
      Already have an account? 
      <a [routerLink]="['/login']">Login here</a>
    </div>
  </div>
  `,
  styleUrl: './register.css'
})
export class Register {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

   onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.register(email, password).subscribe({
        next: () => {
          this.notificationService.show('Registration successful. Please login.', 'success');
          this.router.navigate(['/login']);
        },
        error: err => {
          //Remove this later
          console.log(err.error?.message || err.message);
          this.notificationService.show('Registration failed', 'error');
        }
      });
    }
  }

}
