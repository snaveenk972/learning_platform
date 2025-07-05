import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/models';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container py-4">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col">
          <h1 class="display-5 fw-bold text-primary">Explore Courses</h1>
          <p class="lead text-muted">Discover our comprehensive collection of courses to advance your skills</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="row mb-4">
        <div class="col-md-6 mb-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search courses..."
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
            >
            <button class="btn btn-primary" type="button" (click)="onSearch()">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        
        <div class="col-md-3 mb-3">
          <select class="form-select" [(ngModel)]="selectedCategory" (change)="onCategoryChange()">
            <option value="">All Categories</option>
            <option *ngFor="let category of categories" [value]="category">{{ category }}</option>
          </select>
        </div>
        
        <div class="col-md-3 mb-3">
          <select class="form-select" [(ngModel)]="selectedDifficulty" (change)="onDifficultyChange()">
            <option value="">All Levels</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="text-muted">Loading courses...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ errorMessage }}
      </div>

      <!-- Course Grid -->
      <div class="row" *ngIf="!loading && !errorMessage">
        <div class="col-lg-4 col-md-6 mb-4" *ngFor="let course of paginatedCourses">
          <div class="card course-card h-100">
            <div class="card-body d-flex flex-column">
              <!-- Course Header -->
              <div class="d-flex justify-content-between align-items-start mb-3">
                <span class="badge badge-category">{{ course.category }}</span>
                <span class="badge" [class]="getDifficultyBadgeClass(course.difficultyLevel)">
                  {{ course.difficultyLevel }}
                </span>
              </div>
              
              <!-- Course Title and Description -->
              <h5 class="card-title">{{ course.title }}</h5>
              <p class="card-text text-muted flex-grow-1">
                {{ course.description | slice:0:120 }}{{ course.description.length > 120 ? '...' : '' }}
              </p>
              
              <!-- Course Info -->
              <div class="course-info mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <div class="rating">
                    <i class="fas fa-star text-warning"></i>
                    <span class="ms-1">{{ course.rating }}</span>
                    <small class="text-muted">({{ course.totalRatings }})</small>
                  </div>
                  <span class="text-primary fw-bold">
                    {{ course.price === 0 ? 'Free' : '$' + course.price }}
                  </span>
                </div>
                
                <div class="d-flex justify-content-between align-items-center text-muted small">
                  <span>
                    <i class="fas fa-clock me-1"></i>
                    {{ course.estimatedDuration }} hours
                  </span>
                  <span>
                    <i class="fas fa-user me-1"></i>
                    {{ course.totalEnrollments }} enrolled
                  </span>
                </div>
                
                <div class="mt-2">
                  <small class="text-muted">
                    <i class="fas fa-chalkboard-teacher me-1"></i>
                    {{ course.instructorName }}
                  </small>
                </div>
              </div>
              
              <!-- Action Button -->
              <a [routerLink]="['/courses', course.id]" class="btn btn-primary w-100 mt-auto">
                <i class="fas fa-eye me-2"></i>
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !errorMessage && filteredCourses.length === 0" class="text-center py-5">
        <i class="fas fa-search text-muted mb-3" style="font-size: 4rem; opacity: 0.3;"></i>
        <h3 class="text-muted">No courses found</h3>
        <p class="text-muted">Try adjusting your search criteria or browse all courses.</p>
        <button class="btn btn-primary" (click)="clearFilters()">
          <i class="fas fa-refresh me-2"></i>
          Clear Filters
        </button>
      </div>

      <!-- Pagination -->
      <nav *ngIf="totalPages > 1" class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" [class.disabled]="currentPage === 1">
            <button class="page-link" (click)="goToPage(currentPage - 1)" [disabled]="currentPage === 1">
              <i class="fas fa-chevron-left"></i>
            </button>
          </li>
          
          <li 
            class="page-item" 
            *ngFor="let page of getPageNumbers()" 
            [class.active]="page === currentPage"
          >
            <button class="page-link" (click)="goToPage(page)">{{ page }}</button>
          </li>
          
          <li class="page-item" [class.disabled]="currentPage === totalPages">
            <button class="page-link" (click)="goToPage(currentPage + 1)" [disabled]="currentPage === totalPages">
              <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .course-card {
      transition: all 0.3s ease;
      border: none;
      box-shadow: var(--shadow);
    }
    
    .course-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
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
    
    .course-info {
      font-size: 0.9rem;
    }
    
    .rating {
      display: flex;
      align-items: center;
    }
    
    .pagination .page-link {
      border: none;
      color: var(--primary-color);
      border-radius: 8px;
      margin: 0 2px;
    }
    
    .pagination .page-item.active .page-link {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
    
    .pagination .page-link:hover {
      background-color: var(--background-color);
      color: var(--primary-dark);
    }
  `]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  paginatedCourses: Course[] = [];
  categories: string[] = [];
  
  searchTerm = '';
  selectedCategory = '';
  selectedDifficulty = '';
  
  loading = true;
  errorMessage = '';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 9;
  totalPages = 1;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadCategories();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.filteredCourses = [...courses];
        this.updatePagination();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        this.loading = false;
        console.error('Error loading courses:', error);
      }
    });
  }

  loadCategories(): void {
    this.courseService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        // Fallback: extract categories from courses
        this.categories = [...new Set(this.courses.map(course => course.category))];
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onDifficultyChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchesSearch = !this.searchTerm || 
        course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || course.category === this.selectedCategory;
      const matchesDifficulty = !this.selectedDifficulty || course.difficultyLevel === this.selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedDifficulty = '';
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    this.updatePaginatedCourses();
  }

  updatePaginatedCourses(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCourses();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const halfMax = Math.floor(maxPagesToShow / 2);
    
    let startPage = Math.max(1, this.currentPage - halfMax);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
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
}
