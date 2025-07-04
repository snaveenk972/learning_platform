package com.learningplatform.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Course entity representing learning courses with comprehensive metadata
 * Includes course details, content management, and enrollment tracking
 */
@Entity
@Table(name = "courses")
public class Course {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Course title is required")
    @Size(min = 3, max = 200, message = "Course title must be between 3 and 200 characters")
    @Column(nullable = false)
    private String title;
    
    @NotBlank(message = "Course description is required")
    @Size(min = 10, max = 1000, message = "Course description must be between 10 and 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Duration in hours is required")
    private Integer durationHours;
    
    @NotBlank(message = "Difficulty level is required")
    @Column(name = "difficulty_level")
    private String difficultyLevel; // BEGINNER, INTERMEDIATE, ADVANCED
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @Column(name = "instructor_name")
    private String instructorName;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Relationship with user enrollments
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<UserCourseEnrollment> enrollments = new HashSet<>();
    
    // Relationship with test results
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<TestResult> testResults = new HashSet<>();
    
    public Course() {}
    
    public Course(String title, String description, Integer durationHours, 
                  String difficultyLevel, String category, String instructorName) {
        this.title = title;
        this.description = description;
        this.durationHours = durationHours;
        this.difficultyLevel = difficultyLevel;
        this.category = category;
        this.instructorName = instructorName;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getDurationHours() { return durationHours; }
    public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public Set<UserCourseEnrollment> getEnrollments() { return enrollments; }
    public void setEnrollments(Set<UserCourseEnrollment> enrollments) { this.enrollments = enrollments; }
    
    public Set<TestResult> getTestResults() { return testResults; }
    public void setTestResults(Set<TestResult> testResults) { this.testResults = testResults; }
}
