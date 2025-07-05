import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="bg-dark text-light py-5 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <h5 class="text-primary mb-3">
              <i class="fas fa-graduation-cap me-2"></i>
              Learning Platform
            </h5>
            <p class="text-muted">
              Empowering learners worldwide with quality education and comprehensive skill development programs.
            </p>
            <div class="social-links">
              <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div class="col-md-2 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Platform</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">About Us</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Careers</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Blog</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Help Center</a></li>
            </ul>
          </div>
          
          <div class="col-md-2 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Courses</h6>
            <ul class="list-unstyled">
              <li><a routerLink="/courses" class="text-muted text-decoration-none">All Courses</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Programming</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Design</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Business</a></li>
            </ul>
          </div>
          
          <div class="col-md-2 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Support</h6>
            <ul class="list-unstyled">
              <li><a href="#" class="text-muted text-decoration-none">Contact Us</a></li>
              <li><a href="#" class="text-muted text-decoration-none">FAQ</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" class="text-muted text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>
          
          <div class="col-md-2 mb-4">
            <h6 class="text-uppercase fw-bold mb-3">Newsletter</h6>
            <p class="text-muted small">Stay updated with new courses and features.</p>
            <div class="input-group">
              <input type="email" class="form-control form-control-sm" placeholder="Your email">
              <button class="btn btn-primary btn-sm" type="button">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <hr class="my-4">
        
        <div class="row align-items-center">
          <div class="col-md-6">
            <p class="text-muted small mb-0">
              © {{ currentYear }} Learning Platform. All rights reserved.
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="text-muted small mb-0">
              Made with <i class="fas fa-heart text-danger"></i> for learners everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      margin-top: auto;
    }
    
    .social-links a {
      transition: color 0.3s ease;
    }
    
    .social-links a:hover {
      color: var(--primary-color) !important;
    }
    
    .list-unstyled li {
      margin-bottom: 0.5rem;
    }
    
    .list-unstyled a:hover {
      color: var(--primary-color) !important;
    }
    
    .input-group .form-control {
      border-right: none;
    }
    
    .input-group .btn {
      border-left: none;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
