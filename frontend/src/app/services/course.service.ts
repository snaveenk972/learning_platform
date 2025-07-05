import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, ApiResponse } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/api/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<any>(`${this.apiUrl}/list`).pipe(
      map(response => response.data || [])
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  searchCourses(keyword: string): Observable<Course[]> {
    return this.http.get<any>(`${this.apiUrl}/search/${keyword}`).pipe(
      map(response => response.data || [])
    );
  }

  getCoursesByCategory(category: string): Observable<Course[]> {
    return this.http.get<any>(`${this.apiUrl}/category/${category}`).pipe(
      map(response => response.data || [])
    );
  }

  getCoursesByDifficulty(difficulty: string): Observable<Course[]> {
    return this.http.get<any>(`${this.apiUrl}/difficulty/${difficulty}`).pipe(
      map(response => response.data || [])
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<any>(`${this.apiUrl}/categories`).pipe(
      map(response => response.data || [])
    );
  }
}
