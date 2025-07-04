package com.learningplatform.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Data Transfer Object for test submission
 * Contains test results and performance metrics
 */
public class TestSubmissionRequest {
    
    @NotNull(message = "Course ID is required")
    private Long courseId;
    
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score cannot be less than 0")
    @Max(value = 100, message = "Score cannot be more than 100")
    private Double score;
    
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer testDurationMinutes;
    
    public TestSubmissionRequest() {}
    
    public TestSubmissionRequest(Long courseId, Double score, Integer totalQuestions, 
                               Integer correctAnswers, Integer testDurationMinutes) {
        this.courseId = courseId;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.testDurationMinutes = testDurationMinutes;
    }
    
    // Getters and Setters
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
    
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }
    
    public Integer getTestDurationMinutes() { return testDurationMinutes; }
    public void setTestDurationMinutes(Integer testDurationMinutes) { this.testDurationMinutes = testDurationMinutes; }
}
