package com.learningplatform.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

/**
 * Data Transfer Object for test submission
 * Contains answers to questions for automatic scoring
 */
public class TestSubmissionRequest {
    
    @NotNull(message = "Course ID is required")
    private Long courseId;
    
    @NotNull(message = "Answers are required")
    private Map<Long, String> answers; // questionId -> selectedAnswer (A, B, C, D)
    
    private Integer testDurationMinutes;
    
    public TestSubmissionRequest() {}
    
    public TestSubmissionRequest(Long courseId, Map<Long, String> answers, Integer testDurationMinutes) {
        this.courseId = courseId;
        this.answers = answers;
        this.testDurationMinutes = testDurationMinutes;
    }
    
    // Getters and Setters
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
    
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
    
    public Integer getTestDurationMinutes() { return testDurationMinutes; }
    public void setTestDurationMinutes(Integer testDurationMinutes) { this.testDurationMinutes = testDurationMinutes; }
}
