package com.learningplatform.repository;

import com.learningplatform.model.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for TestResult entity
 * Manages test results and assessment data
 */
@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    
    /**
     * Find test results by user ID
     */
    List<TestResult> findByUserId(Long userId);
    
    /**
     * Find test results by course ID
     */
    List<TestResult> findByCourseId(Long courseId);
    
    /**
     * Find test result by user ID and course ID (latest attempt)
     */
    @Query("SELECT t FROM TestResult t WHERE t.user.id = :userId AND t.course.id = :courseId " +
           "ORDER BY t.testTakenAt DESC")
    List<TestResult> findByUserIdAndCourseIdOrderByTestTakenAtDesc(@Param("userId") Long userId, 
                                                                  @Param("courseId") Long courseId);
    
    /**
     * Get latest test result for user and course
     */
    @Query("SELECT t FROM TestResult t WHERE t.user.id = :userId AND t.course.id = :courseId " +
           "ORDER BY t.testTakenAt DESC LIMIT 1")
    Optional<TestResult> findLatestByUserIdAndCourseId(@Param("userId") Long userId, 
                                                       @Param("courseId") Long courseId);
    
    /**
     * Find passed test results by user ID
     */
    List<TestResult> findByUserIdAndPassedTrue(Long userId);
    
    /**
     * Find failed test results by user ID
     */
    List<TestResult> findByUserIdAndPassedFalse(Long userId);
    
    /**
     * Get average score for a user
     */
    @Query("SELECT AVG(t.score) FROM TestResult t WHERE t.user.id = :userId")
    Double getAverageScoreByUserId(@Param("userId") Long userId);
    
    /**
     * Get average score for a course
     */
    @Query("SELECT AVG(t.score) FROM TestResult t WHERE t.course.id = :courseId")
    Double getAverageScoreByCourseId(@Param("courseId") Long courseId);
    
    /**
     * Count total tests taken by user
     */
    Long countByUserId(Long userId);
    
    /**
     * Count passed tests by user
     */
    Long countByUserIdAndPassedTrue(Long userId);
    
    /**
     * Get highest score for user and course
     */
    @Query("SELECT MAX(t.score) FROM TestResult t WHERE t.user.id = :userId AND t.course.id = :courseId")
    Optional<Double> getHighestScoreByUserIdAndCourseId(@Param("userId") Long userId, 
                                                        @Param("courseId") Long courseId);
}
