package com.learningplatform.controller;

import com.learningplatform.dto.EnrollmentRequest;
import com.learningplatform.service.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Enrollment controller for managing user course enrollments
 * Provides secure endpoints for enrollment operations and progress tracking
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    /**
     * Enroll in multiple courses
     */
    @PostMapping("/enroll")
    public ResponseEntity<?> enrollInCourses(@Valid @RequestBody EnrollmentRequest enrollmentRequest) {
        return enrollmentService.enrollInCourses(enrollmentRequest);
    }
    
    /**
     * Get user's current learning courses
     */
    @GetMapping("/learning")
    public ResponseEntity<?> getUserLearningCourses() {
        return enrollmentService.getUserLearningCourses();
    }
    
    /**
     * Get user's completed courses (achievements)
     */
    @GetMapping("/achievements")
    public ResponseEntity<?> getUserAchievements() {
        return enrollmentService.getUserAchievements();
    }
    
    /**
     * Get all user enrollments
     */
    @GetMapping("/all")
    public ResponseEntity<?> getUserEnrollments() {
        return enrollmentService.getUserEnrollments();
    }
    
    /**
     * Update course progress
     */
    @PutMapping("/progress/{courseId}")
    public ResponseEntity<?> updateCourseProgress(
            @PathVariable Long courseId,
            @RequestParam Double progressPercentage) {
        return enrollmentService.updateCourseProgress(courseId, progressPercentage);
    }
    
    /**
     * Mark course as completed
     */
    @PutMapping("/complete/{courseId}")
    public ResponseEntity<?> markCourseAsCompleted(@PathVariable Long courseId) {
        return enrollmentService.markCourseAsCompleted(courseId);
    }
    
    /**
     * Get enrollment statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getUserEnrollmentStats() {
        return enrollmentService.getUserEnrollmentStats();
    }
}
