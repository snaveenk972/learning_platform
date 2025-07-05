import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { Course, User } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4 fade-in">
              Learn Skills That Matter
            </h1>
            <p class="lead mb-4 fade-in">
              Join thousands of learners advancing their careers with our comprehensive courses.
              Master new technologies, earn certificates, and achieve your goals.
            </p>
            <div class="d-flex gap-3 fade-in">
              <a routerLink="/courses" class="btn btn-light btn-lg">
                <i class="fas fa-search me-2"></i>
                Explore Courses
              </a>
              <a *ngIf="!currentUser" routerLink="/register" class="btn btn-outline-light btn-lg">
                <i class="fas fa-user-plus me-2"></i>
                Get Started
              </a>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <div class="hero-image fade-in">
              <i class="fas fa-graduation-cap" style="font-size: 15rem; opacity: 0.1;"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 mb-4">
            <div class="stat-card">
              <i class="fas fa-users text-primary mb-3" style="font-size: 3rem;"></i>
              <h3 class="fw-bold">10,000+</h3>
              <p class="text-muted">Active Students</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stat-card">
              <i class="fas fa-book text-primary mb-3" style="font-size: 3rem;"></i>
              <h3 class="fw-bold">500+</h3>
              <p class="text-muted">Courses Available</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stat-card">
              <i class="fas fa-certificate text-primary mb-3" style="font-size: 3rem;"></i>
              <h3 class="fw-bold">25,000+</h3>
              <p class="text-muted">Certificates Issued</p>
            </div>
          </div>
          <div class="col-md-3 mb-4">
            <div class="stat-card">
              <i class="fas fa-star text-primary mb-3" style="font-size: 3rem;"></i>
              <h3 class="fw-bold">4.8</h3>
              <p class="text-muted">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="py-5" *ngIf="featuredCourses.length > 0">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Featured Courses</h2>
          <p class="text-muted">Start your learning journey with our most popular courses</p>
        </div>
        
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4" *ngFor="let course of featuredCourses">
            <div class="card course-card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <span class="badge badge-category">{{ course.category }}</span>
                  <span class="badge bg-light text-dark">{{ course.difficultyLevel }}</span>
                </div>
                
                <h5 class="card-title">{{ course.title }}</h5>
                <p class="card-text text-muted">{{ course.description | slice:0:100 }}...</p>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div class="rating">
                    <i class="fas fa-star text-warning"></i>
                    <span class="ms-1">{{ course.rating }}</span>
                    <small class="text-muted">({{ course.totalRatings }})</small>
                  </div>
                  <span class="text-primary fw-bold">
                    {{ course.price === 0 ? 'Free' : '$' + course.price }}
                  </span>
                </div>
                
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">
                    <i class="fas fa-clock me-1"></i>
                    {{ course.estimatedDuration }} hours
                  </small>
                  <a [routerLink]="['/courses', course.id]" class="btn btn-primary btn-sm">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-4">
          <a routerLink="/courses" class="btn btn-outline-primary">
            View All Courses
            <i class="fas fa-arrow-right ms-2"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Why Choose Our Platform?</h2>
          <p class="text-muted">Everything you need to succeed in your learning journey</p>
        </div>
        
        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-play-circle text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">Interactive Content</h5>
              <p class="text-muted">Engage with hands-on exercises, quizzes, and real-world projects.</p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-users text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">Expert Instructors</h5>
              <p class="text-muted">Learn from industry professionals with years of experience.</p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-certificate text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">Earn Certificates</h5>
              <p class="text-muted">Get recognized for your achievements with verified certificates.</p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-mobile-alt text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">Learn Anywhere</h5>
              <p class="text-muted">Access your courses on any device, anytime, anywhere.</p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-clock text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">Self-Paced Learning</h5>
              <p class="text-muted">Learn at your own pace with lifetime access to content.</p>
            </div>
          </div>
          
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="feature-card text-center p-4">
              <i class="fas fa-headset text-primary mb-3" style="font-size: 3rem;"></i>
              <h5 class="fw-bold">24/7 Support</h5>
              <p class="text-muted">Get help whenever you need it with our dedicated support team.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-primary text-white" *ngIf="!currentUser">
      <div class="container text-center">
        <h2 class="fw-bold mb-3">Ready to Start Learning?</h2>
        <p class="lead mb-4">Join our community of learners and take the first step towards your goals.</p>
        <a routerLink="/register" class="btn btn-light btn-lg">
          <i class="fas fa-rocket me-2"></i>
          Get Started Today
        </a>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
      color: white;
      padding: 6rem 0;
    }
    
    .stat-card {
      padding: 2rem 1rem;
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-card {
      background: white;
      border-radius: 12px;
      box-shadow: var(--shadow);
      transition: all 0.3s ease;
      height: 100%;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .course-card {
      transition: all 0.3s ease;
    }
    
    .course-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .rating {
      font-size: 0.9rem;
    }
    
    .hero-image {
      position: relative;
    }
    
    @media (max-width: 768px) {
      .hero-section {
        padding: 4rem 0;
      }
      
      .display-4 {
        font-size: 2.5rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredCourses: Course[] = [];
  currentUser: User | null = null;
  loading = true;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.loadFeaturedCourses();
  }

  private loadFeaturedCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.featuredCourses = courses.slice(0, 6); // Show only 6 courses
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.loading = false;
      }
    });
  }
}
