import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, SignupRequest, JwtResponse, MessageResponse, User } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${environment.apiUrl}/api/auth/signin`, credentials)
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          // Backend returns accessToken, frontend expects token
          const token = (response as any).accessToken || response.token;
          this.setToken(token);
          const user: User = {
            id: response.id,
            username: response.username,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            phoneNumber: response.phoneNumber,
            totalCoursesCompleted: 0,
            totalTestsCompleted: 0,
            averageTestScore: 0,
            registrationDate: new Date().toISOString(),
            isActive: true
          };
          this.setCurrentUser(user);
        })
      );
  }

  register(userData: SignupRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${environment.apiUrl}/api/auth/signup`, userData);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Checking authentication - token exists:', !!token);
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp > Date.now() / 1000;
      console.log('Token validation:', { 
        exp: payload.exp, 
        now: Date.now() / 1000, 
        isValid 
      });
      return isValid;
    } catch (error) {
      console.error('Token parsing error:', error);
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  checkUsernameAvailability(username: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${environment.apiUrl}/api/auth/check-username/${username}`);
  }

  checkEmailAvailability(email: string): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${environment.apiUrl}/api/auth/check-email/${email}`);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
