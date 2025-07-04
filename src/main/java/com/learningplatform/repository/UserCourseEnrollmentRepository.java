package com.learningplatform.repository;

import com.learningplatform.model.UserCourseEnrollment;
import com.learningplatform.model.UserCourseEnrollment.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for UserCourseEnrollment entity
 * Manages user course enrollment data and progress tracking
 */
@Repository
public interface UserCourseEnrollmentRepository extends JpaRepository<UserCourseEnrollment, Long> {
    
    /**
     * Find enrollment by user ID and course ID
     */
    Optional<UserCourseEnrollment> findByUserIdAndCourseId(Long userId, Long courseId);
    
    /**
     * Find all enrollments for a specific user
     */
    List<UserCourseEnrollment> findByUserId(Long userId);
    
    /**
     * Find enrollments by user ID and status
     */
    List<UserCourseEnrollment> findByUserIdAndStatus(Long userId, EnrollmentStatus status);
    
    /**
     * Find all learning courses for a user
     */
    @Query("SELECT e FROM UserCourseEnrollment e WHERE e.user.id = :userId AND e.status = 'LEARNING'")
    List<UserCourseEnrollment> findLearningCoursesByUserId(@Param("userId") Long userId);
    
    /**
     * Find all completed courses for a user (achievements)
     */
    @Query("SELECT e FROM UserCourseEnrollment e WHERE e.user.id = :userId AND e.status = 'COMPLETED'")
    List<UserCourseEnrollment> findCompletedCoursesByUserId(@Param("userId") Long userId);
    
    /**
     * Check if user is enrolled in a course
     */
    Boolean existsByUserIdAndCourseId(Long userId, Long courseId);
    
    /**
     * Count total enrollments for a user
     */
    Long countByUserId(Long userId);
    
    /**
     * Count completed courses for a user
     */
    Long countByUserIdAndStatus(Long userId, EnrollmentStatus status);
    
    /**
     * Find enrollments with course details for a user
     */
    @Query("SELECT e FROM UserCourseEnrollment e JOIN FETCH e.course WHERE e.user.id = :userId")
    List<UserCourseEnrollment> findByUserIdWithCourse(@Param("userId") Long userId);
    
    /**
     * Get user's progress statistics
     */
    @Query("SELECT AVG(e.progressPercentage) FROM UserCourseEnrollment e WHERE e.user.id = :userId")
    Double getAverageProgressByUserId(@Param("userId") Long userId);
}
