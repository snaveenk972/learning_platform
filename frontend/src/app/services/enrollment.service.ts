import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnrollmentRequest, Enrollment, MessageResponse } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/api/enrollments`;

  constructor(private http: HttpClient) {}

  enrollInCourse(request: EnrollmentRequest): Observable<MessageResponse> {
    // Convert single courseId to array if needed
    const requestBody = request.courseIds ? request : { courseIds: [request.courseId!] };
    return this.http.post<MessageResponse>(`${this.apiUrl}/enroll`, requestBody);
  }

  getUserEnrollments(): Observable<Enrollment[]> {
    return this.http.get<any>(`${this.apiUrl}/all`).pipe(
      map(response => response.data || [])
    );
  }

  getEnrollmentById(id: number): Observable<Enrollment> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  updateProgress(enrollmentId: number, progress: number): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/${enrollmentId}/progress`, { progress });
  }

  dropCourse(enrollmentId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${this.apiUrl}/${enrollmentId}`);
  }

  getEnrollmentStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`).pipe(
      map(response => response.data)
    );
  }

  getEnrollmentSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`).pipe(
      map(response => response.data)
    );
  }
}
