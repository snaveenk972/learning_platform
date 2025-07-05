package com.learningplatform.repository;

import com.learningplatform.model.Question;
import com.learningplatform.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Question entity operations
 * Provides custom queries for test question management
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    /**
     * Find all active questions for a specific course
     */
    List<Question> findByCourseAndIsActiveTrue(Course course);
    
    /**
     * Find all active questions for a course by course ID
     */
    @Query("SELECT q FROM Question q WHERE q.course.id = :courseId AND q.isActive = true")
    List<Question> findActiveByCourseId(@Param("courseId") Long courseId);
    
    /**
     * Find questions by difficulty level for a course
     */
    @Query("SELECT q FROM Question q WHERE q.course.id = :courseId AND q.difficultyLevel = :difficultyLevel AND q.isActive = true")
    List<Question> findByCourseIdAndDifficultyLevel(@Param("courseId") Long courseId, @Param("difficultyLevel") String difficultyLevel);
    
    /**
     * Count total questions for a course
     */
    @Query("SELECT COUNT(q) FROM Question q WHERE q.course.id = :courseId AND q.isActive = true")
    Long countActiveByCourseId(@Param("courseId") Long courseId);
    
    /**
     * Find random questions for a test (limited number)
     */
    @Query(value = "SELECT * FROM questions WHERE course_id = :courseId AND is_active = true ORDER BY RANDOM() LIMIT :limit", 
           nativeQuery = true)
    List<Question> findRandomQuestionsByCourseId(@Param("courseId") Long courseId, @Param("limit") int limit);
    
    /**
     * Find all questions for a course ordered by creation date
     */
    @Query("SELECT q FROM Question q WHERE q.course.id = :courseId ORDER BY q.createdAt ASC")
    List<Question> findAllByCourseIdOrderByCreatedAt(@Param("courseId") Long courseId);
}
