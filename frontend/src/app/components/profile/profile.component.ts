import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="card">
            <div class="card-header">
              <h4 class="mb-0">
                <i class="fas fa-user me-2"></i>
                My Profile
              </h4>
            </div>
            <div class="card-body">
              <div class="row">
                <!-- Profile Picture Section -->
                <div class="col-md-3 text-center mb-4">
                  <div class="profile-picture-container">
                    <div class="profile-picture">
                      {{ getInitials() }}
                    </div>
                    <button class="btn btn-sm btn-outline-primary mt-2">
                      <i class="fas fa-camera me-1"></i>
                      Change Photo
                    </button>
                  </div>
                </div>
                
                <!-- Profile Information -->
                <div class="col-md-9">
                  <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="firstName" class="form-label">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="firstName"
                          formControlName="firstName"
                          [class.is-invalid]="isFieldInvalid('firstName')"
                        >
                        <div class="invalid-feedback" *ngIf="isFieldInvalid('firstName')">
                          First name is required
                        </div>
                      </div>
                      
                      <div class="col-md-6 mb-3">
                        <label for="lastName" class="form-label">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="lastName"
                          formControlName="lastName"
                          [class.is-invalid]="isFieldInvalid('lastName')"
                        >
                        <div class="invalid-feedback" *ngIf="isFieldInvalid('lastName')">
                          Last name is required
                        </div>
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          formControlName="username"
                          readonly
                        >
                      </div>
                      
                      <div class="col-md-6 mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          formControlName="email"
                          readonly
                        >
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="phoneNumber" class="form-label">Phone Number</label>
                        <input
                          type="tel"
                          class="form-control"
                          id="phoneNumber"
                          formControlName="phoneNumber"
                          placeholder="Enter your phone number"
                          [class.is-invalid]="isFieldInvalid('phoneNumber')"
                        >
                        <div class="invalid-feedback" *ngIf="isFieldInvalid('phoneNumber')">
                          Please enter a valid phone number
                        </div>
                      </div>
                      
                      <div class="col-md-6 mb-3">
                        <!-- Empty column for layout balance -->
                      </div>
                    </div>
                    
                    <div class="mb-3">
                      <label for="bio" class="form-label">Bio</label>
                      <textarea
                        class="form-control"
                        id="bio"
                        formControlName="bio"
                        rows="3"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="location" class="form-label">Location</label>
                        <input
                          type="text"
                          class="form-control"
                          id="location"
                          formControlName="location"
                          placeholder="Your location"
                        >
                      </div>
                      
                      <div class="col-md-6 mb-3">
                        <label for="website" class="form-label">Website</label>
                        <input
                          type="url"
                          class="form-control"
                          id="website"
                          formControlName="website"
                          placeholder="https://yourwebsite.com"
                        >
                      </div>
                    </div>
                    
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="linkedinProfile" class="form-label">LinkedIn Profile</label>
                        <input
                          type="url"
                          class="form-control"
                          id="linkedinProfile"
                          formControlName="linkedinProfile"
                          placeholder="https://linkedin.com/in/yourprofile"
                        >
                      </div>
                      
                      <div class="col-md-6 mb-3">
                        <label for="githubProfile" class="form-label">GitHub Profile</label>
                        <input
                          type="url"
                          class="form-control"
                          id="githubProfile"
                          formControlName="githubProfile"
                          placeholder="https://github.com/yourusername"
                        >
                      </div>
                    </div>
                    
                    <div class="alert alert-success" *ngIf="successMessage" role="alert">
                      <i class="fas fa-check-circle me-2"></i>
                      {{ successMessage }}
                    </div>
                    
                    <div class="alert alert-danger" *ngIf="errorMessage" role="alert">
                      <i class="fas fa-exclamation-triangle me-2"></i>
                      {{ errorMessage }}
                    </div>
                    
                    <div class="d-flex gap-2">
                      <button
                        type="submit"
                        class="btn btn-primary"
                        [disabled]="profileForm.invalid || loading"
                      >
                        <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
                        <i *ngIf="!loading" class="fas fa-save me-2"></i>
                        {{ loading ? 'Saving...' : 'Save Changes' }}
                      </button>
                      
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="resetForm()"
                      >
                        <i class="fas fa-undo me-2"></i>
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Learning Statistics -->
          <div class="card mt-4" *ngIf="currentUser">
            <div class="card-header">
              <h5 class="mb-0">
                <i class="fas fa-chart-line me-2"></i>
                Learning Statistics
              </h5>
            </div>
            <div class="card-body">
              <div class="row text-center">
                <div class="col-md-3 mb-3">
                  <div class="stat-item">
                    <h3 class="text-primary">{{ currentUser.totalCoursesCompleted }}</h3>
                    <p class="text-muted mb-0">Courses Completed</p>
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <div class="stat-item">
                    <h3 class="text-success">{{ currentUser.totalTestsCompleted }}</h3>
                    <p class="text-muted mb-0">Tests Completed</p>
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <div class="stat-item">
                    <h3 class="text-warning">{{ currentUser.averageTestScore }}%</h3>
                    <p class="text-muted mb-0">Average Score</p>
                  </div>
                </div>
                <div class="col-md-3 mb-3">
                  <div class="stat-item">
                    <h3 class="text-info">{{ getDaysSinceRegistration() }}</h3>
                    <p class="text-muted mb-0">Days Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-picture {
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0 auto 1rem;
      box-shadow: var(--shadow-lg);
    }
    
    .stat-item {
      padding: 1rem;
      border-radius: 8px;
      background-color: var(--background-color);
      transition: transform 0.3s ease;
    }
    
    .stat-item:hover {
      transform: translateY(-2px);
    }
    
    .card {
      border: none;
      box-shadow: var(--shadow);
    }
    
    .card-header {
      background-color: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
    }
    
    .form-control:read-only {
      background-color: var(--background-color);
    }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: [''],
      email: [''],
      phoneNumber: ['', [Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      bio: [''],
      location: [''],
      website: [''],
      linkedinProfile: [''],
      githubProfile: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber || '',
          bio: user.bio || '',
          location: user.location || '',
          website: user.website || '',
          linkedinProfile: user.linkedinProfile || '',
          githubProfile: user.githubProfile || ''
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        username: this.currentUser.username,
        email: this.currentUser.email,
        phoneNumber: this.currentUser.phoneNumber || '',
        bio: this.currentUser.bio || '',
        location: this.currentUser.location || '',
        website: this.currentUser.website || '',
        linkedinProfile: this.currentUser.linkedinProfile || '',
        githubProfile: this.currentUser.githubProfile || ''
      });
    }
    this.successMessage = '';
    this.errorMessage = '';
  }

  getInitials(): string {
    if (!this.currentUser) return 'U';
    return (this.currentUser.firstName.charAt(0) + this.currentUser.lastName.charAt(0)).toUpperCase();
  }

  getDaysSinceRegistration(): number {
    if (!this.currentUser?.registrationDate) return 0;
    const registrationDate = new Date(this.currentUser.registrationDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - registrationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
