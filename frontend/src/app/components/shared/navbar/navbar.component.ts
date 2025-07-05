import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-graduation-cap me-2"></i>
          Learning Platform
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <i class="fas fa-home me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/courses" routerLinkActive="active">
                <i class="fas fa-book me-1"></i>Courses
              </a>
            </li>
            <li class="nav-item" *ngIf="currentUser">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="fas fa-tachometer-alt me-1"></i>Dashboard
              </a>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <ng-container *ngIf="currentUser; else guestMenu">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" 
                   role="button" data-bs-toggle="dropdown">
                  <div class="avatar-circle me-2">
                    {{ currentUser.firstName.charAt(0) }}{{ currentUser.lastName.charAt(0) }}
                  </div>
                  {{ currentUser.firstName }}
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a class="dropdown-item" routerLink="/profile">
                      <i class="fas fa-user me-2"></i>Profile
                    </a>
                  </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item" href="#" (click)="logout($event)">
                      <i class="fas fa-sign-out-alt me-2"></i>Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ng-container>
            
            <ng-template #guestMenu>
              <li class="nav-item">
                <a class="nav-link" routerLink="/login" routerLinkActive="active">
                  <i class="fas fa-sign-in-alt me-1"></i>Login
                </a>
              </li>
              <li class="nav-item">
                <a class="btn btn-primary ms-2" routerLink="/register">
                  <i class="fas fa-user-plus me-1"></i>Sign Up
                </a>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      z-index: 1030;
    }
    
    .navbar-brand {
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--primary-color) !important;
    }
    
    .nav-link {
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover {
      color: var(--primary-color) !important;
    }
    
    .nav-link.active {
      color: var(--primary-color) !important;
      font-weight: 600;
    }
    
    .avatar-circle {
      width: 32px;
      height: 32px;
      background-color: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .dropdown-menu {
      border: none;
      box-shadow: var(--shadow-lg);
      border-radius: 8px;
    }
    
    .dropdown-item {
      padding: 0.5rem 1rem;
      transition: background-color 0.3s ease;
    }
    
    .dropdown-item:hover {
      background-color: var(--background-color);
      color: var(--primary-color);
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
