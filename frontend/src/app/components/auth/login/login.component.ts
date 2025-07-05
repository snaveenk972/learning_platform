import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <!-- Left Side - Login Form -->
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="login-form-container">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Welcome Back!</h2>
              <p class="text-muted">Sign in to continue your learning journey</p>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
              <div class="mb-3">
                <label for="usernameOrEmail" class="form-label">Username or Email</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="usernameOrEmail"
                    formControlName="usernameOrEmail"
                    placeholder="Enter your username or email"
                    [class.is-invalid]="isFieldInvalid('usernameOrEmail')"
                  >
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('usernameOrEmail')">
                  Username or email is required
                </div>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    formControlName="password"
                    placeholder="Enter your password"
                    [class.is-invalid]="isFieldInvalid('password')"
                  >
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    (click)="togglePassword()"
                  >
                    <i [class]="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('password')">
                  Password is required
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">
                    Remember me
                  </label>
                </div>
                <a href="#" class="text-decoration-none">Forgot password?</a>
              </div>

              <div class="alert alert-danger" *ngIf="errorMessage" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ errorMessage }}
              </div>

              <div class="alert alert-success" *ngIf="successMessage" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                {{ successMessage }}
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-2 mb-3"
                [disabled]="loginForm.invalid || loading"
              >
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i *ngIf="!loading" class="fas fa-sign-in-alt me-2"></i>
                {{ loading ? 'Signing In...' : 'Sign In' }}
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Don't have an account?
                  <a routerLink="/register" class="text-decoration-none">Sign up here</a>
                </p>
              </div>
            </form>

            <div class="divider my-4">
              <span class="text-muted">or continue with</span>
            </div>

            <div class="social-login">
              <button class="btn btn-outline-secondary w-100 mb-2">
                <i class="fab fa-google me-2"></i>
                Continue with Google
              </button>
              <button class="btn btn-outline-secondary w-100">
                <i class="fab fa-github me-2"></i>
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side - Hero Image -->
        <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary">
          <div class="text-center text-white">
            <i class="fas fa-graduation-cap mb-4" style="font-size: 8rem; opacity: 0.8;"></i>
            <h3 class="fw-bold mb-3">Continue Your Learning Journey</h3>
            <p class="lead">
              Access your personalized dashboard, track progress, and achieve your goals with our comprehensive learning platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-form-container {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }

    .input-group-text {
      background-color: var(--background-color);
      border-right: none;
    }

    .form-control {
      border-left: none;
    }

    .form-control:focus {
      border-left: none;
      box-shadow: none;
    }

    .input-group:focus-within .input-group-text {
      border-color: var(--primary-color);
    }

    .divider {
      position: relative;
      text-align: center;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--border-color);
    }

    .divider span {
      background-color: white;
      padding: 0 1rem;
      position: relative;
    }

    .social-login .btn {
      transition: all 0.3s ease;
    }

    .social-login .btn:hover {
      background-color: var(--background-color);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .bg-primary {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important;
    }

    @media (max-width: 992px) {
      .container-fluid {
        padding: 2rem 1rem;
      }
      
      .login-form-container {
        padding: 1rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Login successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
