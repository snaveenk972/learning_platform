import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Course, User } from '../../../models/models';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-4" *ngIf="course">
      <!-- Course Header -->
      <div class="row mb-4">
        <div class="col-lg-8">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
              <li class="breadcrumb-item"><a routerLink="/courses">Courses</a></li>
              <li class="breadcrumb-item active">{{ course.title }}</li>
            </ol>
          </nav>
          
          <div class="d-flex align-items-center mb-3">
            <span class="badge badge-category me-3">{{ course.category }}</span>
            <span class="badge" [class]="getDifficultyBadgeClass(course.difficultyLevel)">
              {{ course.difficultyLevel }}
            </span>
          </div>
          
          <h1 class="display-5 fw-bold mb-3">{{ course.title }}</h1>
          <p class="lead text-muted mb-4">{{ course.description }}</p>
          
          <div class="d-flex align-items-center gap-4 mb-4">
            <div class="rating">
              <i class="fas fa-star text-warning"></i>
              <span class="fw-bold">{{ course.rating }}</span>
              <span class="text-muted">({{ course.totalRatings }} reviews)</span>
            </div>
            <div>
              <i class="fas fa-users text-muted"></i>
              <span class="ms-1">{{ course.totalEnrollments }} students</span>
            </div>
            <div>
              <i class="fas fa-clock text-muted"></i>
              <span class="ms-1">{{ course.estimatedDuration }} hours</span>
            </div>
          </div>
          
          <div class="instructor-info d-flex align-items-center mb-4">
            <div class="avatar-circle me-3">
              {{ getInstructorInitials(course.instructorName) }}
            </div>
            <div>
              <p class="mb-0 fw-semibold">{{ course.instructorName }}</p>
              <small class="text-muted">Course Instructor</small>
            </div>
          </div>
        </div>
        
        <div class="col-lg-4">
          <div class="card course-summary-card sticky-top">
            <div class="card-body text-center">
              <div class="price-display mb-4">
                <span class="price fw-bold text-primary">
                  {{ course.price === 0 ? 'Free' : '$' + course.price }}
                </span>
              </div>
              
              <div class="d-grid gap-2 mb-3">
                <button 
                  *ngIf="!currentUser" 
                  class="btn btn-primary btn-lg" 
                  routerLink="/login"
                >
                  <i class="fas fa-sign-in-alt me-2"></i>
                  Sign In to Enroll
                </button>
                
                <button 
                  *ngIf="currentUser && !isEnrolled" 
                  class="btn btn-primary btn-lg"
                  (click)="enrollInCourse()"
                  [disabled]="enrolling"
                >
                  <span *ngIf="enrolling" class="spinner-border spinner-border-sm me-2"></span>
                  <i *ngIf="!enrolling" class="fas fa-plus me-2"></i>
                  {{ enrolling ? 'Enrolling...' : 'Enroll Now' }}
                </button>
                
                <div *ngIf="currentUser && isEnrolled" class="enrolled-status">
                  <div class="alert alert-success mb-3">
                    <i class="fas fa-check-circle me-2"></i>
                    You are enrolled in this course
                  </div>
                  <a [routerLink]="['/test', course.id]" class="btn btn-outline-primary">
                    <i class="fas fa-clipboard-check me-2"></i>
                    Take Test
                  </a>
                </div>
              </div>
              
              <div class="course-features">
                <ul class="list-unstyled text-start">
                  <li class="mb-2">
                    <i class="fas fa-infinity text-primary me-2"></i>
                    Lifetime access
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-mobile-alt text-primary me-2"></i>
                    Mobile accessible
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-certificate text-primary me-2"></i>
                    Certificate of completion
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-headset text-primary me-2"></i>
                    24/7 support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Course Content -->
      <div class="row">
        <div class="col-lg-8">
          <!-- Long Description -->
          <div class="content-section mb-5" *ngIf="course.longDescription">
            <h3 class="section-title">About This Course</h3>
            <div class="content-text" [innerHTML]="course.longDescription"></div>
          </div>
          
          <!-- Learning Outcomes -->
          <div class="content-section mb-5" *ngIf="course.learningOutcomes">
            <h3 class="section-title">What You'll Learn</h3>
            <div class="content-text" [innerHTML]="course.learningOutcomes"></div>
          </div>
          
          <!-- Prerequisites -->
          <div class="content-section mb-5" *ngIf="course.prerequisites">
            <h3 class="section-title">Prerequisites</h3>
            <div class="content-text" [innerHTML]="course.prerequisites"></div>
          </div>
          
          <!-- Syllabus -->
          <div class="content-section mb-5" *ngIf="course.syllabus">
            <h3 class="section-title">Course Syllabus</h3>
            <div class="content-text" [innerHTML]="course.syllabus"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Loading State -->
    <div *ngIf="loading" class="container py-5">
      <div class="text-center">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="text-muted">Loading course details...</p>
      </div>
    </div>
    
    <!-- Error State -->
    <div *ngIf="errorMessage" class="container py-5">
      <div class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .course-summary-card {
      top: 100px;
      box-shadow: var(--shadow-lg);
      border: none;
    }
    
    .price-display .price {
      font-size: 2.5rem;
    }
    
    .avatar-circle {
      width: 50px;
      height: 50px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }
    
    .badge-category {
      background-color: var(--primary-color);
      color: white;
    }
    
    .badge-beginner {
      background-color: var(--success-color);
      color: white;
    }
    
    .badge-intermediate {
      background-color: var(--warning-color);
      color: white;
    }
    
    .badge-advanced {
      background-color: var(--error-color);
      color: white;
    }
    
    .content-section {
      padding: 2rem 0;
      border-bottom: 1px solid var(--border-color);
    }
    
    .content-section:last-child {
      border-bottom: none;
    }
    
    .section-title {
      color: var(--text-primary);
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    
    .content-text {
      line-height: 1.8;
      color: var(--text-secondary);
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .enrolled-status .alert {
      border-radius: 8px;
    }
    
    @media (max-width: 992px) {
      .course-summary-card {
        position: static !important;
        margin-bottom: 2rem;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  currentUser: User | null = null;
  loading = true;
  errorMessage = '';
  enrolling = false;
  isEnrolled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.route.params.subscribe(params => {
      const courseId = +params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      }
    });
  }

  loadCourse(id: number): void {
    this.loading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
        if (this.currentUser) {
          this.checkEnrollmentStatus();
        }
      },
      error: (error) => {
        this.errorMessage = 'Course not found or failed to load.';
        this.loading = false;
        console.error('Error loading course:', error);
      }
    });
  }

  checkEnrollmentStatus(): void {
    if (this.currentUser && this.course) {
      this.enrollmentService.getUserEnrollments().subscribe({
        next: (enrollments) => {
          this.isEnrolled = enrollments.some(e => e.courseId === this.course!.id);
        },
        error: (error) => {
          console.error('Error checking enrollment status:', error);
        }
      });
    }
  }

  enrollInCourse(): void {
    if (!this.currentUser || !this.course) return;
    
    this.enrolling = true;
    this.enrollmentService.enrollInCourse({ courseId: this.course.id }).subscribe({
      next: (response) => {
        this.enrolling = false;
        this.isEnrolled = true;
        // Show success message
      },
      error: (error) => {
        this.enrolling = false;
        console.error('Error enrolling in course:', error);
        // Show error message
      }
    });
  }

  getDifficultyBadgeClass(difficulty: string): string {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'badge-beginner';
      case 'intermediate':
        return 'badge-intermediate';
      case 'advanced':
        return 'badge-advanced';
      default:
        return 'bg-secondary';
    }
  }

  getInstructorInitials(name: string): string {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  }
}
