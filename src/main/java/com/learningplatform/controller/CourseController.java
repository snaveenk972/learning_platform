package com.learningplatform.controller;

import com.learningplatform.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Course controller for managing course-related operations
 * Provides endpoints for course discovery, filtering, and detailed information
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/courses")
public class CourseController {
    
    @Autowired
    private CourseService courseService;
    
    /**
     * Get all available courses
     */
    @GetMapping("/list")
    public ResponseEntity<?> getAllCourses() {
        return courseService.getAllCourses();
    }
    
    /**
     * Get course by ID
     */
    @GetMapping("/{courseId}")
    public ResponseEntity<?> getCourseById(@PathVariable Long courseId) {
        return courseService.getCourseById(courseId);
    }
    
    /**
     * Search courses by keyword
     */
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchCourses(@PathVariable String keyword) {
        return courseService.searchCourses(keyword);
    }
    
    /**
     * Get courses by category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getCoursesByCategory(@PathVariable String category) {
        return courseService.getCoursesByCategory(category);
    }
    
    /**
     * Get courses by difficulty level
     */
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<?> getCoursesByDifficulty(@PathVariable String difficulty) {
        return courseService.getCoursesByDifficulty(difficulty);
    }
    
    /**
     * Get courses by duration range
     */
    @GetMapping("/duration")
    public ResponseEntity<?> getCoursesByDuration(
            @RequestParam(defaultValue = "1") Integer minHours,
            @RequestParam(defaultValue = "100") Integer maxHours) {
        return courseService.getCoursesByDuration(minHours, maxHours);
    }
    
    /**
     * Get all available categories
     */
    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategories() {
        return courseService.getAllCategories();
    }
    
    /**
     * Get all available difficulty levels
     */
    @GetMapping("/difficulty-levels")
    public ResponseEntity<?> getAllDifficultyLevels() {
        return courseService.getAllDifficultyLevels();
    }
}
