import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="container-fluid vh-100">
      <div class="row h-100">
        <!-- Left Side - Hero Image -->
        <div class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary">
          <div class="text-center text-white">
            <i class="fas fa-rocket mb-4" style="font-size: 8rem; opacity: 0.8;"></i>
            <h3 class="fw-bold mb-3">Start Your Learning Adventure</h3>
            <p class="lead">
              Join thousands of learners worldwide and unlock your potential with our comprehensive courses and expert instructors.
            </p>
          </div>
        </div>

        <!-- Right Side - Registration Form -->
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="register-form-container">
            <div class="text-center mb-4">
              <h2 class="fw-bold text-primary">Create Account</h2>
              <p class="text-muted">Sign up to start your learning journey</p>
            </div>

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="needs-validation" novalidate>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    formControlName="firstName"
                    placeholder="Enter your first name"
                    [class.is-invalid]="isFieldInvalid('firstName')"
                  >
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                    <div *ngIf="registerForm.get('firstName')?.errors?.['required']">First name is required</div>
                    <div *ngIf="registerForm.get('firstName')?.errors?.['minlength']">First name must be at least 2 characters</div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    formControlName="lastName"
                    placeholder="Enter your last name"
                    [class.is-invalid]="isFieldInvalid('lastName')"
                  >
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                    <div *ngIf="registerForm.get('lastName')?.errors?.['required']">Last name is required</div>
                    <div *ngIf="registerForm.get('lastName')?.errors?.['minlength']">Last name must be at least 2 characters</div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    formControlName="username"
                    placeholder="Choose a username"
                    [class.is-invalid]="isFieldInvalid('username')"
                    (blur)="checkUsernameAvailability()"
                  >
                  <span class="input-group-text" *ngIf="checkingUsername">
                    <div class="loading-spinner"></div>
                  </span>
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('username')">
                  <div *ngIf="registerForm.get('username')?.errors?.['required']">Username is required</div>
                  <div *ngIf="registerForm.get('username')?.errors?.['minlength']">Username must be at least 3 characters</div>
                  <div *ngIf="registerForm.get('username')?.errors?.['maxlength']">Username must be at most 20 characters</div>
                  <div *ngIf="registerForm.get('username')?.errors?.['pattern']">Username can only contain letters, numbers, and underscores</div>
                  <div *ngIf="registerForm.get('username')?.errors?.['taken']">Username is already taken</div>
                </div>
                <div class="valid-feedback" *ngIf="registerForm.get('username')?.valid && registerForm.get('username')?.value && !checkingUsername">
                  Username is available
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    placeholder="Enter your email address"
                    [class.is-invalid]="isFieldInvalid('email')"
                    (blur)="checkEmailAvailability()"
                  >
                  <span class="input-group-text" *ngIf="checkingEmail">
                    <div class="loading-spinner"></div>
                  </span>
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('email')">
                  <div *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</div>
                  <div *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email address</div>
                  <div *ngIf="registerForm.get('email')?.errors?.['taken']">Email is already registered</div>
                </div>
                <div class="valid-feedback" *ngIf="registerForm.get('email')?.valid && registerForm.get('email')?.value && !checkingEmail">
                  Email is available
                </div>
              </div>

              <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-phone"></i>
                  </span>
                  <input
                    type="tel"
                    class="form-control"
                    id="phoneNumber"
                    formControlName="phoneNumber"
                    placeholder="Enter your phone number"
                    [class.is-invalid]="isFieldInvalid('phoneNumber')"
                  >
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('phoneNumber')">
                  <div *ngIf="registerForm.get('phoneNumber')?.errors?.['required']">Phone number is required</div>
                  <div *ngIf="registerForm.get('phoneNumber')?.errors?.['pattern']">Please enter a valid phone number</div>
                </div>
                <div class="form-text">
                  Enter your phone number with country code (e.g., +1234567890)
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
                    placeholder="Create a strong password"
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
                  <div *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</div>
                  <div *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 8 characters</div>
                  <div *ngIf="registerForm.get('password')?.errors?.['pattern']">Password must contain at least one letter and one number</div>
                </div>
                <div class="form-text">
                  Password must be at least 8 characters long and contain letters and numbers.
                </div>
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input
                    [type]="showConfirmPassword ? 'text' : 'password'"
                    class="form-control"
                    id="confirmPassword"
                    formControlName="confirmPassword"
                    placeholder="Confirm your password"
                    [class.is-invalid]="isFieldInvalid('confirmPassword') || (registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched)"
                  >
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    (click)="toggleConfirmPassword()"
                  >
                    <i [class]="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <div class="invalid-feedback" *ngIf="isFieldInvalid('confirmPassword') || (registerForm.errors?.['passwordMismatch'] && registerForm.get('confirmPassword')?.touched)">
                  <div *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Please confirm your password</div>
                  <div *ngIf="registerForm.errors?.['passwordMismatch']">Passwords do not match</div>
                </div>
              </div>

              <div class="mb-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="agreeTerms"
                    formControlName="agreeTerms"
                    [class.is-invalid]="isFieldInvalid('agreeTerms')"
                  >
                  <label class="form-check-label" for="agreeTerms">
                    I agree to the <a href="#" class="text-decoration-none">Terms of Service</a> and 
                    <a href="#" class="text-decoration-none">Privacy Policy</a>
                  </label>
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('agreeTerms')">
                    You must agree to the terms and conditions
                  </div>
                </div>
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
                [disabled]="registerForm.invalid || loading"
              >
                <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i *ngIf="!loading" class="fas fa-user-plus me-2"></i>
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Already have an account?
                  <a routerLink="/login" class="text-decoration-none">Sign in here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-form-container {
      width: 100%;
      max-width: 500px;
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

    .valid-feedback {
      display: block;
      color: var(--success-color);
    }

    .bg-primary {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important;
    }

    @media (max-width: 992px) {
      .container-fluid {
        padding: 2rem 1rem;
      }
      
      .register-form-container {
        padding: 1rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  checkingUsername = false;
  checkingEmail = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = { ...this.registerForm.value };
      delete formData.confirmPassword;
      delete formData.agreeTerms;

      this.authService.register(formData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Account created successfully! Please sign in.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  checkUsernameAvailability(): void {
    const username = this.registerForm.get('username')?.value;
    if (username && username.length >= 3 && !this.registerForm.get('username')?.errors?.['pattern']) {
      this.checkingUsername = true;
      this.authService.checkUsernameAvailability(username).subscribe({
        next: (response) => {
          this.checkingUsername = false;
          // Username is available
        },
        error: (error) => {
          this.checkingUsername = false;
          this.registerForm.get('username')?.setErrors({ taken: true });
        }
      });
    }
  }

  checkEmailAvailability(): void {
    const email = this.registerForm.get('email')?.value;
    if (email && this.registerForm.get('email')?.valid) {
      this.checkingEmail = true;
      this.authService.checkEmailAvailability(email).subscribe({
        next: (response) => {
          this.checkingEmail = false;
          // Email is available
        },
        error: (error) => {
          this.checkingEmail = false;
          this.registerForm.get('email')?.setErrors({ taken: true });
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
