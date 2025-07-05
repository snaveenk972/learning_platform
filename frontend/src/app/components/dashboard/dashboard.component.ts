import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { TestService } from '../../services/test.service';
import { User, Enrollment, TestResult } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container-fluid py-4">
      <!-- Welcome Section -->
      <div class="row mb-4">
        <div class="col">
          <div class="welcome-section p-4 bg-primary text-white rounded">
            <h1 class="h2 mb-2">Welcome back, {{ currentUser?.firstName }}!</h1>
            <p class="mb-0 opacity-75">Continue your learning journey and achieve your goals.</p>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row mb-4">
        <div class="col-md-3 mb-3">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <i class="fas fa-book-open text-primary mb-3" style="font-size: 2.5rem;"></i>
              <h3 class="fw-bold">{{ enrollments.length }}</h3>
              <p class="text-muted mb-0">Enrolled Courses</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <i class="fas fa-certificate text-success mb-3" style="font-size: 2.5rem;"></i>
              <h3 class="fw-bold">{{ completedCourses }}</h3>
              <p class="text-muted mb-0">Completed</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <i class="fas fa-clipboard-check text-warning mb-3" style="font-size: 2.5rem;"></i>
              <h3 class="fw-bold">{{ testResults.length }}</h3>
              <p class="text-muted mb-0">Tests Taken</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <div class="card stat-card h-100">
            <div class="card-body text-center">
              <i class="fas fa-star text-danger mb-3" style="font-size: 2.5rem;"></i>
              <h3 class="fw-bold">{{ averageScore }}%</h3>
              <p class="text-muted mb-0">Average Score</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- My Courses -->
        <div class="col-lg-8 mb-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">My Courses</h5>
              <a routerLink="/courses" class="btn btn-sm btn-outline-primary">
                Browse More
              </a>
            </div>
            <div class="card-body">
              <div *ngIf="loading" class="text-center py-4">
                <div class="loading-spinner mx-auto mb-3"></div>
                <p class="text-muted">Loading your courses...</p>
              </div>
              
              <div *ngIf="!loading && enrollments.length === 0" class="text-center py-4">
                <i class="fas fa-book text-muted mb-3" style="font-size: 3rem; opacity: 0.3;"></i>
                <h6 class="text-muted">No courses enrolled yet</h6>
                <p class="text-muted small mb-3">Start learning by enrolling in your first course!</p>
                <a routerLink="/courses" class="btn btn-primary">
                  <i class="fas fa-search me-2"></i>
                  Explore Courses
                </a>
              </div>
              
              <div class="row" *ngIf="!loading && enrollments.length > 0">
                <div class="col-md-6 mb-3" *ngFor="let enrollment of enrollments.slice(0, 4)">
                  <div class="course-card p-3 border rounded">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <span class="badge bg-primary">{{ enrollment.status }}</span>
                      <small class="text-muted">{{ getDateFromString(enrollment.enrolledAt) | date:'MMM d' }}</small>
                    </div>
                    
                    <h6 class="mb-2">{{ enrollment.course?.title || 'Course #' + (enrollment.courseId || enrollment.course?.id) }}</h6>
                    <p class="text-muted small mb-3">Enrolled: {{ getDateFromString(enrollment.enrolledAt) | date:'mediumDate' }}</p>
                    
                    <div class="progress mb-2" style="height: 6px;">
                      <div class="progress-bar" 
                           [style.width.%]="enrollment.progressPercentage || enrollment.progress || 0"
                           [class]="getProgressBarClass(enrollment.progressPercentage || enrollment.progress || 0)">
                      </div>
                    </div>
                    <small class="text-muted">{{ enrollment.progressPercentage || enrollment.progress || 0 }}% complete</small>
                    
                    <div class="mt-3 d-flex gap-2">
                      <a [routerLink]="['/courses', enrollment.courseId || enrollment.course?.id]" class="btn btn-sm btn-outline-primary">
                        View Course
                      </a>
                      <a [routerLink]="['/test', enrollment.courseId || enrollment.course?.id]" class="btn btn-sm btn-primary">
                        Take Test
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Test Results -->
        <div class="col-lg-4 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Recent Test Results</h5>
            </div>
            <div class="card-body">
              <div *ngIf="testResults.length === 0" class="text-center py-4">
                <i class="fas fa-clipboard-check text-muted mb-3" style="font-size: 2rem; opacity: 0.3;"></i>
                <p class="text-muted small">No tests taken yet</p>
              </div>
              
              <div *ngFor="let result of testResults.slice(0, 5)" class="test-result-item mb-3 p-3 border rounded">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h6 class="mb-0">Course #{{ result.courseId }}</h6>
                  <span class="badge" [class]="getScoreBadgeClass(result.score)">
                    {{ result.score }}%
                  </span>
                </div>
                
                <div class="row text-center small text-muted">
                  <div class="col-6">
                    <div>{{ result.correctAnswers }}/{{ result.totalQuestions }}</div>
                    <div>Correct</div>
                  </div>
                  <div class="col-6">
                    <div>{{ result.completionTime }}m</div>
                    <div>Duration</div>
                  </div>
                </div>
                
                <div class="mt-2">
                  <small class="text-muted">{{ getDateFromString(result.submissionDate) | date:'MMM d, y' }}</small>
                  <span class="badge ms-2" [class]="result.passed ? 'bg-success' : 'bg-danger'">
                    {{ result.passed ? 'Passed' : 'Failed' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-section {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%) !important;
    }
    
    .stat-card {
      transition: transform 0.3s ease;
      border: none;
      box-shadow: var(--shadow);
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    
    .course-card {
      transition: all 0.3s ease;
      background-color: var(--surface-color);
    }
    
    .course-card:hover {
      box-shadow: var(--shadow);
      transform: translateY(-2px);
    }
    
    .test-result-item {
      background-color: var(--background-color);
      transition: all 0.3s ease;
    }
    
    .test-result-item:hover {
      box-shadow: var(--shadow);
    }
    
    .progress-bar {
      transition: width 0.3s ease;
    }
    
    .progress-bar-success {
      background-color: var(--success-color);
    }
    
    .progress-bar-warning {
      background-color: var(--warning-color);
    }
    
    .progress-bar-info {
      background-color: var(--primary-color);
    }
    
    .card-header {
      background-color: var(--surface-color);
      border-bottom: 1px solid var(--border-color);
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  enrollments: Enrollment[] = [];
  testResults: TestResult[] = [];
  loading = true;
  completedCourses = 0;
  averageScore = 0;

  constructor(
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    console.log('Loading dashboard data...');
    
    // Load enrollments
    this.enrollmentService.getUserEnrollments().subscribe({
      next: (enrollments) => {
        console.log('Enrollments loaded:', enrollments);
        this.enrollments = enrollments;
        this.completedCourses = enrollments.filter(e => e.status === 'COMPLETED').length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading enrollments:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        this.loading = false;
      }
    });
    
    // Load test results
    this.testService.getUserTestResults().subscribe({
      next: (results) => {
        console.log('Test results loaded:', results);
        this.testResults = results.sort((a, b) => 
          new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime()
        );
        this.calculateAverageScore();
      },
      error: (error) => {
        console.error('Error loading test results:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
      }
    });
  }

  calculateAverageScore(): void {
    if (this.testResults.length === 0) {
      this.averageScore = 0;
      return;
    }
    
    const totalScore = this.testResults.reduce((sum, result) => sum + result.score, 0);
    this.averageScore = Math.round(totalScore / this.testResults.length);
  }

  getProgressBarClass(progress: number): string {
    if (progress >= 80) return 'progress-bar-success';
    if (progress >= 50) return 'progress-bar-warning';
    return 'progress-bar-info';
  }

  getScoreBadgeClass(score: number): string {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  }

  getDateFromString(dateString: string): Date {
    return new Date(dateString);
  }
}
