package com.learningplatform.service;

import com.learningplatform.dto.MessageResponse;
import com.learningplatform.model.Course;
import com.learningplatform.repository.CourseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Course service for managing course operations
 * Handles course retrieval, filtering, and search functionality
 */
@Service
public class CourseService {
    
    private static final Logger logger = LoggerFactory.getLogger(CourseService.class);
    
    @Autowired
    private CourseRepository courseRepository;
    
    /**
     * Get all active courses
     */
    public ResponseEntity<?> getAllCourses() {
        try {
            List<Course> courses = courseRepository.findByIsActiveTrue();
            return ResponseEntity.ok(new MessageResponse("Courses retrieved successfully", 200, courses));
        } catch (Exception e) {
            logger.error("Failed to retrieve courses", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve courses", 400));
        }
    }
    
    /**
     * Get course by ID
     */
    public ResponseEntity<?> getCourseById(Long courseId) {
        try {
            Optional<Course> course = courseRepository.findById(courseId);
            if (course.isPresent() && course.get().getIsActive()) {
                return ResponseEntity.ok(new MessageResponse("Course retrieved successfully", 200, course.get()));
            } else {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Course not found", 404));
            }
        } catch (Exception e) {
            logger.error("Failed to retrieve course with ID: {}", courseId, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve course", 400));
        }
    }
    
    /**
     * Search courses by keyword
     */
    public ResponseEntity<?> searchCourses(String keyword) {
        try {
            List<Course> courses = courseRepository.searchByKeyword(keyword);
            return ResponseEntity.ok(new MessageResponse("Search completed successfully", 200, courses));
        } catch (Exception e) {
            logger.error("Failed to search courses with keyword: {}", keyword, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Search failed", 400));
        }
    }
    
    /**
     * Get courses by category
     */
    public ResponseEntity<?> getCoursesByCategory(String category) {
        try {
            List<Course> courses = courseRepository.findByCategoryIgnoreCaseAndIsActiveTrue(category);
            return ResponseEntity.ok(new MessageResponse("Courses retrieved by category", 200, courses));
        } catch (Exception e) {
            logger.error("Failed to retrieve courses by category: {}", category, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve courses by category", 400));
        }
    }
    
    /**
     * Get courses by difficulty level
     */
    public ResponseEntity<?> getCoursesByDifficulty(String difficulty) {
        try {
            List<Course> courses = courseRepository.findByDifficultyLevelIgnoreCaseAndIsActiveTrue(difficulty);
            return ResponseEntity.ok(new MessageResponse("Courses retrieved by difficulty", 200, courses));
        } catch (Exception e) {
            logger.error("Failed to retrieve courses by difficulty: {}", difficulty, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve courses by difficulty", 400));
        }
    }
    
    /**
     * Get courses by duration range
     */
    public ResponseEntity<?> getCoursesByDuration(Integer minHours, Integer maxHours) {
        try {
            List<Course> courses = courseRepository.findByDurationHoursBetweenAndIsActiveTrue(minHours, maxHours);
            return ResponseEntity.ok(new MessageResponse("Courses retrieved by duration", 200, courses));
        } catch (Exception e) {
            logger.error("Failed to retrieve courses by duration range: {} - {}", minHours, maxHours, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve courses by duration", 400));
        }
    }
    
    /**
     * Get all available categories
     */
    public ResponseEntity<?> getAllCategories() {
        try {
            List<String> categories = courseRepository.findDistinctCategories();
            return ResponseEntity.ok(new MessageResponse("Categories retrieved successfully", 200, categories));
        } catch (Exception e) {
            logger.error("Failed to retrieve categories", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve categories", 400));
        }
    }
    
    /**
     * Get all available difficulty levels
     */
    public ResponseEntity<?> getAllDifficultyLevels() {
        try {
            List<String> difficultyLevels = courseRepository.findDistinctDifficultyLevels();
            return ResponseEntity.ok(new MessageResponse("Difficulty levels retrieved successfully", 200, difficultyLevels));
        } catch (Exception e) {
            logger.error("Failed to retrieve difficulty levels", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve difficulty levels", 400));
        }
    }
}
