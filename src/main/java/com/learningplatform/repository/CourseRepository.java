package com.learningplatform.repository;

import com.learningplatform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Course entity with custom query methods
 * Provides data access operations for course management and filtering
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    
    /**
     * Find all active courses
     */
    List<Course> findByIsActiveTrue();
    
    /**
     * Find courses by category
     */
    List<Course> findByCategoryIgnoreCaseAndIsActiveTrue(String category);
    
    /**
     * Find courses by difficulty level
     */
    List<Course> findByDifficultyLevelIgnoreCaseAndIsActiveTrue(String difficultyLevel);
    
    /**
     * Find courses by instructor
     */
    List<Course> findByInstructorNameIgnoreCaseContainingAndIsActiveTrue(String instructorName);
    
    /**
     * Search courses by title or description
     */
    @Query("SELECT c FROM Course c WHERE (LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND c.isActive = true")
    List<Course> searchByKeyword(@Param("keyword") String keyword);
    
    /**
     * Find courses by duration range
     */
    @Query("SELECT c FROM Course c WHERE c.durationHours BETWEEN :minHours AND :maxHours AND c.isActive = true")
    List<Course> findByDurationHoursBetweenAndIsActiveTrue(@Param("minHours") Integer minHours, 
                                                          @Param("maxHours") Integer maxHours);
    
    /**
     * Get all distinct categories
     */
    @Query("SELECT DISTINCT c.category FROM Course c WHERE c.isActive = true ORDER BY c.category")
    List<String> findDistinctCategories();
    
    /**
     * Get all distinct difficulty levels
     */
    @Query("SELECT DISTINCT c.difficultyLevel FROM Course c WHERE c.isActive = true ORDER BY c.difficultyLevel")
    List<String> findDistinctDifficultyLevels();
}
