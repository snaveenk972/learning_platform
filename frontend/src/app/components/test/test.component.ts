import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { CourseService } from '../../services/course.service';
import { Question, Course, TestSubmissionRequest } from '../../models/models';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container py-4">
      <!-- Test Header -->
      <div class="card mb-4" *ngIf="course">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h2 class="mb-2">{{ course.title }} - Assessment</h2>
              <p class="text-muted mb-0">
                Complete this test to earn your certificate for this course.
              </p>
            </div>
            <div class="col-md-4 text-md-end">
              <div class="test-info">
                <div class="mb-1">
                  <i class="fas fa-questions me-2"></i>
                  <strong>{{ questions.length }}</strong> Questions
                </div>
                <div class="mb-1" *ngIf="timeRemaining > 0">
                  <i class="fas fa-clock me-2"></i>
                  <strong>{{ formatTime(timeRemaining) }}</strong> Remaining
                </div>
                <div>
                  <i class="fas fa-percentage me-2"></i>
                  <strong>70%</strong> to Pass
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="loading-spinner mx-auto mb-3"></div>
        <p class="text-muted">Loading test questions...</p>
      </div>

      <!-- Test Questions -->
      <div *ngIf="!loading && !submitted && questions.length > 0">
        <div class="card mb-4" *ngFor="let question of questions; let i = index">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Question {{ i + 1 }}</h5>
            <span class="badge bg-primary">{{ i + 1 }} / {{ questions.length }}</span>
          </div>
          <div class="card-body">
            <p class="question-text mb-4">{{ question.questionText }}</p>
            
            <div class="options">
              <div class="form-check mb-3" *ngFor="let option of question.options; let j = index">
                <input
                  class="form-check-input"
                  type="radio"
                  [name]="'question_' + question.id"
                  [id]="'q' + question.id + '_' + j"
                  [value]="getOptionLetter(j)"
                  [(ngModel)]="answers[question.id]"
                >
                <label class="form-check-label" [for]="'q' + question.id + '_' + j">
                  <strong>{{ getOptionLetter(j) }}.</strong> {{ option }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Section -->
        <div class="card">
          <div class="card-body text-center">
            <h5 class="mb-3">Ready to Submit?</h5>
            <p class="text-muted mb-4">
              Make sure you have answered all questions before submitting. 
              You cannot change your answers after submission.
            </p>
            
            <div class="progress mb-4">
              <div 
                class="progress-bar" 
                [style.width.%]="getCompletionPercentage()"
                [class]="getProgressBarClass()"
              >
                {{ getAnsweredCount() }} / {{ questions.length }} Answered
              </div>
            </div>
            
            <button
              class="btn btn-success btn-lg"
              (click)="submitTest()"
              [disabled]="submitting || !isTestComplete()"
            >
              <span *ngIf="submitting" class="spinner-border spinner-border-sm me-2"></span>
              <i *ngIf="!submitting" class="fas fa-paper-plane me-2"></i>
              {{ submitting ? 'Submitting...' : 'Submit Test' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Test Results -->
      <div *ngIf="submitted && testResult" class="text-center py-5">
        <div class="result-container">
          <div class="result-icon mb-4">
            <i 
              [class]="testResult.passed ? 'fas fa-check-circle text-success' : 'fas fa-times-circle text-danger'"
              style="font-size: 5rem;"
            ></i>
          </div>
          
          <h2 class="mb-3">
            {{ testResult.passed ? 'Congratulations!' : 'Test Not Passed' }}
          </h2>
          
          <div class="score-display mb-4">
            <div class="score-circle" [class]="testResult.passed ? 'score-pass' : 'score-fail'">
              <span class="score-text">{{ testResult.score }}%</span>
            </div>
          </div>
          
          <div class="row justify-content-center mb-4">
            <div class="col-md-8">
              <div class="row text-center">
                <div class="col-4">
                  <div class="result-stat">
                    <h4 class="text-primary">{{ testResult.correctAnswers }}</h4>
                    <p class="text-muted">Correct Answers</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="result-stat">
                    <h4 class="text-info">{{ testResult.totalQuestions }}</h4>
                    <p class="text-muted">Total Questions</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="result-stat">
                    <h4 class="text-warning">{{ testResult.completionTime }}m</h4>
                    <p class="text-muted">Time Taken</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="result-message mb-4">
            <p *ngIf="testResult.passed" class="text-success">
              You have successfully passed this test! Your certificate will be available in your dashboard.
            </p>
            <p *ngIf="!testResult.passed" class="text-danger">
              You need at least 70% to pass this test. Don't worry, you can retake it anytime.
            </p>
          </div>
          
          <div class="d-flex justify-content-center gap-3">
            <a routerLink="/dashboard" class="btn btn-primary">
              <i class="fas fa-tachometer-alt me-2"></i>
              Go to Dashboard
            </a>
            <a [routerLink]="['/courses', courseId]" class="btn btn-outline-primary">
              <i class="fas fa-book me-2"></i>
              Back to Course
            </a>
            <button *ngIf="!testResult.passed" class="btn btn-outline-success" (click)="retakeTest()">
              <i class="fas fa-redo me-2"></i>
              Retake Test
            </button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .test-info {
      font-size: 0.9rem;
    }
    
    .question-text {
      font-size: 1.1rem;
      line-height: 1.6;
    }
    
    .form-check {
      padding: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    .form-check:hover {
      background-color: var(--background-color);
    }
    
    .form-check-input:checked + .form-check-label {
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border: 8px solid;
      transition: all 0.3s ease;
    }
    
    .score-pass {
      border-color: var(--success-color);
      background-color: rgba(16, 185, 129, 0.1);
    }
    
    .score-fail {
      border-color: var(--error-color);
      background-color: rgba(239, 68, 68, 0.1);
    }
    
    .score-text {
      font-size: 2.5rem;
      font-weight: bold;
    }
    
    .result-stat {
      padding: 1rem;
      border-radius: 8px;
      background-color: var(--background-color);
    }
    
    .result-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .progress {
      height: 25px;
    }
    
    .progress-bar {
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .score-circle {
        width: 120px;
        height: 120px;
      }
      
      .score-text {
        font-size: 2rem;
      }
    }
  `]
})
export class TestComponent implements OnInit {
  courseId!: number;
  course: Course | null = null;
  questions: Question[] = [];
  answers: { [questionId: number]: string } = {};
  testResult: any = null;
  
  loading = true;
  submitting = false;
  submitted = false;
  errorMessage = '';
  timeRemaining = 3600; // 1 hour in seconds
  timer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['courseId'];
      this.loadCourse();
      this.loadTestQuestions();
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.course = course;
      },
      error: (error) => {
        console.error('Error loading course:', error);
      }
    });
  }

  loadTestQuestions(): void {
    this.loading = true;
    this.testService.getTestQuestions(this.courseId).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.loading = false;
        this.startTimer();
      },
      error: (error) => {
        this.errorMessage = 'Failed to load test questions. Please try again.';
        this.loading = false;
        console.error('Error loading test questions:', error);
      }
    });
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.submitTest();
      }
    }, 1000);
  }

  submitTest(): void {
    if (this.submitting || this.submitted) return;
    
    this.submitting = true;
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    const submission: TestSubmissionRequest = {
      courseId: this.courseId,
      answers: this.answers
    };
    
    this.testService.submitTest(submission).subscribe({
      next: (result) => {
        this.testResult = result;
        this.submitted = true;
        this.submitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit test. Please try again.';
        this.submitting = false;
        console.error('Error submitting test:', error);
      }
    });
  }

  retakeTest(): void {
    this.answers = {};
    this.testResult = null;
    this.submitted = false;
    this.submitting = false;
    this.errorMessage = '';
    this.timeRemaining = 3600;
    this.startTimer();
  }

  getAnsweredCount(): number {
    return Object.keys(this.answers).filter(key => this.answers[+key]).length;
  }

  getCompletionPercentage(): number {
    if (this.questions.length === 0) return 0;
    return (this.getAnsweredCount() / this.questions.length) * 100;
  }

  getProgressBarClass(): string {
    const percentage = this.getCompletionPercentage();
    if (percentage === 100) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-info';
  }

  isTestComplete(): boolean {
    return this.getAnsweredCount() === this.questions.length;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  getOptionLetter(index: number): string {
    return ['A', 'B', 'C', 'D'][index];
  }
}
