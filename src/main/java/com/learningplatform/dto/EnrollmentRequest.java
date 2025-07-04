package com.learningplatform.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * Data Transfer Object for course enrollment request
 * Handles multiple course enrollment in a single request
 */
public class EnrollmentRequest {
    
    @NotEmpty(message = "At least one course ID is required")
    private List<Long> courseIds;
    
    public EnrollmentRequest() {}
    
    public EnrollmentRequest(List<Long> courseIds) {
        this.courseIds = courseIds;
    }
    
    // Getters and Setters
    public List<Long> getCourseIds() { return courseIds; }
    public void setCourseIds(List<Long> courseIds) { this.courseIds = courseIds; }
}
