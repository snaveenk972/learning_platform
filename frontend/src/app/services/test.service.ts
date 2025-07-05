import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TestSubmissionRequest, TestResult, Question } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = `${environment.apiUrl}/api/tests`;

  constructor(private http: HttpClient) {}

  getTestQuestions(courseId: number): Observable<Question[]> {
    return this.http.get<any>(`${this.apiUrl}/course/${courseId}/questions`).pipe(
      map(response => response.data || [])
    );
  }

  submitTest(submission: TestSubmissionRequest): Observable<TestResult> {
    return this.http.post<any>(`${this.apiUrl}/submit`, submission).pipe(
      map(response => response.data)
    );
  }

  getUserTestResults(): Observable<TestResult[]> {
    return this.http.get<any>(`${this.apiUrl}/results`).pipe(
      map(response => response.data || [])
    );
  }

  getTestResult(testId: number): Observable<TestResult> {
    return this.http.get<any>(`${this.apiUrl}/result/${testId}`).pipe(
      map(response => response.data)
    );
  }

  getTestStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`).pipe(
      map(response => response.data)
    );
  }

  getCourseTestResults(courseId: number): Observable<TestResult[]> {
    return this.http.get<any>(`${this.apiUrl}/course/${courseId}/results`).pipe(
      map(response => response.data || [])
    );
  }
}
