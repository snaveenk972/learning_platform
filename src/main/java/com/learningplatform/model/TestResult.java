package com.learningplatform.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * Test Result entity storing assessment outcomes and scores
 * Tracks user performance on course completion tests
 */
@Entity
@Table(name = "test_results")
public class TestResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @NotNull(message = "Score is required")
    @Min(value = 0, message = "Score cannot be less than 0")
    @Max(value = 100, message = "Score cannot be more than 100")
    private Double score;
    
    @Column(name = "total_questions")
    private Integer totalQuestions;
    
    @Column(name = "correct_answers")
    private Integer correctAnswers;
    
    @Column(name = "test_duration_minutes")
    private Integer testDurationMinutes;
    
    @Column(name = "passed")
    private Boolean passed;
    
    @Column(name = "test_taken_at")
    private LocalDateTime testTakenAt;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public TestResult() {}
    
    public TestResult(User user, Course course, Double score, Integer totalQuestions, 
                     Integer correctAnswers, Integer testDurationMinutes) {
        this.user = user;
        this.course = course;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.testDurationMinutes = testDurationMinutes;
        this.passed = score >= 70.0; // 70% passing grade
    }
    
    @PrePersist
    protected void onCreate() {
        testTakenAt = LocalDateTime.now();
        createdAt = LocalDateTime.now();
        if (passed == null && score != null) {
            passed = score >= 70.0; // Default passing grade
        }
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    
    public Double getScore() { return score; }
    public void setScore(Double score) { 
        this.score = score;
        if (score != null) {
            this.passed = score >= 70.0;
        }
    }
    
    public Integer getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
    
    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }
    
    public Integer getTestDurationMinutes() { return testDurationMinutes; }
    public void setTestDurationMinutes(Integer testDurationMinutes) { this.testDurationMinutes = testDurationMinutes; }
    
    public Boolean getPassed() { return passed; }
    public void setPassed(Boolean passed) { this.passed = passed; }
    
    public LocalDateTime getTestTakenAt() { return testTakenAt; }
    public void setTestTakenAt(LocalDateTime testTakenAt) { this.testTakenAt = testTakenAt; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
