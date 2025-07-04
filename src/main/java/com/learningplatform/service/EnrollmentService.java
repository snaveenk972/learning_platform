package com.learningplatform.service;

import com.learningplatform.dto.EnrollmentRequest;
import com.learningplatform.dto.MessageResponse;
import com.learningplatform.model.Course;
import com.learningplatform.model.User;
import com.learningplatform.model.UserCourseEnrollment;
import com.learningplatform.repository.CourseRepository;
import com.learningplatform.repository.UserCourseEnrollmentRepository;
import com.learningplatform.repository.UserRepository;
import com.learningplatform.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Enrollment service for managing user course enrollments
 * Handles enrollment operations, progress tracking, and achievement management
 */
@Service
@Transactional
public class EnrollmentService {
    
    private static final Logger logger = LoggerFactory.getLogger(EnrollmentService.class);
    
    @Autowired
    private UserCourseEnrollmentRepository enrollmentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    /**
     * Enroll user in multiple courses
     */
    public ResponseEntity<?> enrollInCourses(EnrollmentRequest enrollmentRequest) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            User user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            List<UserCourseEnrollment> enrollments = new ArrayList<>();
            List<String> errors = new ArrayList<>();
            List<String> successMessages = new ArrayList<>();
            
            for (Long courseId : enrollmentRequest.getCourseIds()) {
                try {
                    // Check if course exists and is active
                    Optional<Course> courseOpt = courseRepository.findById(courseId);
                    if (!courseOpt.isPresent() || !courseOpt.get().getIsActive()) {
                        errors.add("Course with ID " + courseId + " not found or inactive");
                        continue;
                    }
                    
                    Course course = courseOpt.get();
                    
                    // Check if user is already enrolled
                    if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), courseId)) {
                        errors.add("Already enrolled in course: " + course.getTitle());
                        continue;
                    }
                    
                    // Create new enrollment
                    UserCourseEnrollment enrollment = new UserCourseEnrollment(user, course);
                    enrollments.add(enrollment);
                    successMessages.add("Enrolled in course: " + course.getTitle());
                    
                } catch (Exception e) {
                    logger.error("Failed to enroll in course ID: {}", courseId, e);
                    errors.add("Failed to enroll in course ID: " + courseId);
                }
            }
            
            // Save all successful enrollments
            if (!enrollments.isEmpty()) {
                enrollmentRepository.saveAll(enrollments);
            }
            
            // Prepare response
            String message = String.format("Enrollment process completed. Success: %d, Errors: %d", 
                    successMessages.size(), errors.size());
            
            return ResponseEntity.ok(new MessageResponse(message, 200, 
                    new EnrollmentSummary(successMessages, errors)));
                    
        } catch (Exception e) {
            logger.error("Failed to process enrollments", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Enrollment failed", 400));
        }
    }
    
    /**
     * Get user's current learning courses
     */
    public ResponseEntity<?> getUserLearningCourses() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<UserCourseEnrollment> learningCourses = 
                    enrollmentRepository.findLearningCoursesByUserId(userPrincipal.getId());
            
            return ResponseEntity.ok(new MessageResponse("Learning courses retrieved successfully", 200, learningCourses));
        } catch (Exception e) {
            logger.error("Failed to retrieve learning courses", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve learning courses", 400));
        }
    }
    
    /**
     * Get user's completed courses (achievements)
     */
    public ResponseEntity<?> getUserAchievements() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<UserCourseEnrollment> completedCourses = 
                    enrollmentRepository.findCompletedCoursesByUserId(userPrincipal.getId());
            
            return ResponseEntity.ok(new MessageResponse("Achievements retrieved successfully", 200, completedCourses));
        } catch (Exception e) {
            logger.error("Failed to retrieve achievements", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve achievements", 400));
        }
    }
    
    /**
     * Get all user enrollments with details
     */
    public ResponseEntity<?> getUserEnrollments() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<UserCourseEnrollment> enrollments = 
                    enrollmentRepository.findByUserIdWithCourse(userPrincipal.getId());
            
            return ResponseEntity.ok(new MessageResponse("Enrollments retrieved successfully", 200, enrollments));
        } catch (Exception e) {
            logger.error("Failed to retrieve user enrollments", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve enrollments", 400));
        }
    }
    
    /**
     * Update course progress
     */
    public ResponseEntity<?> updateCourseProgress(Long courseId, Double progressPercentage) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            
            Optional<UserCourseEnrollment> enrollmentOpt = 
                    enrollmentRepository.findByUserIdAndCourseId(userPrincipal.getId(), courseId);
            
            if (!enrollmentOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Enrollment not found", 404));
            }
            
            UserCourseEnrollment enrollment = enrollmentOpt.get();
            enrollment.setProgressPercentage(progressPercentage);
            
            // Auto-complete if progress reaches 100%
            if (progressPercentage >= 100.0) {
                enrollment.markAsCompleted();
            }
            
            enrollmentRepository.save(enrollment);
            
            return ResponseEntity.ok(new MessageResponse("Progress updated successfully", 200, enrollment));
        } catch (Exception e) {
            logger.error("Failed to update course progress", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to update progress", 400));
        }
    }
    
    /**
     * Mark course as completed
     */
    public ResponseEntity<?> markCourseAsCompleted(Long courseId) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            
            Optional<UserCourseEnrollment> enrollmentOpt = 
                    enrollmentRepository.findByUserIdAndCourseId(userPrincipal.getId(), courseId);
            
            if (!enrollmentOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Enrollment not found", 404));
            }
            
            UserCourseEnrollment enrollment = enrollmentOpt.get();
            enrollment.markAsCompleted();
            enrollmentRepository.save(enrollment);
            
            return ResponseEntity.ok(new MessageResponse("Course marked as completed", 200, enrollment));
        } catch (Exception e) {
            logger.error("Failed to mark course as completed", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to complete course", 400));
        }
    }
    
    /**
     * Get enrollment statistics for user
     */
    public ResponseEntity<?> getUserEnrollmentStats() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            Long userId = userPrincipal.getId();
            
            Long totalEnrollments = enrollmentRepository.countByUserId(userId);
            Long completedCourses = enrollmentRepository.countByUserIdAndStatus(userId, 
                    UserCourseEnrollment.EnrollmentStatus.COMPLETED);
            Long learningCourses = enrollmentRepository.countByUserIdAndStatus(userId, 
                    UserCourseEnrollment.EnrollmentStatus.LEARNING);
            Double averageProgress = enrollmentRepository.getAverageProgressByUserId(userId);
            
            EnrollmentStats stats = new EnrollmentStats(totalEnrollments, completedCourses, 
                    learningCourses, averageProgress != null ? averageProgress : 0.0);
            
            return ResponseEntity.ok(new MessageResponse("Enrollment statistics retrieved", 200, stats));
        } catch (Exception e) {
            logger.error("Failed to retrieve enrollment statistics", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve statistics", 400));
        }
    }
    
    private UserPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserPrincipal) authentication.getPrincipal();
    }
    
    // Helper classes for response data
    public static class EnrollmentSummary {
        private List<String> successMessages;
        private List<String> errors;
        
        public EnrollmentSummary(List<String> successMessages, List<String> errors) {
            this.successMessages = successMessages;
            this.errors = errors;
        }
        
        public List<String> getSuccessMessages() { return successMessages; }
        public List<String> getErrors() { return errors; }
    }
    
    public static class EnrollmentStats {
        private Long totalEnrollments;
        private Long completedCourses;
        private Long learningCourses;
        private Double averageProgress;
        
        public EnrollmentStats(Long totalEnrollments, Long completedCourses, 
                             Long learningCourses, Double averageProgress) {
            this.totalEnrollments = totalEnrollments;
            this.completedCourses = completedCourses;
            this.learningCourses = learningCourses;
            this.averageProgress = averageProgress;
        }
        
        public Long getTotalEnrollments() { return totalEnrollments; }
        public Long getCompletedCourses() { return completedCourses; }
        public Long getLearningCourses() { return learningCourses; }
        public Double getAverageProgress() { return averageProgress; }
    }
}
