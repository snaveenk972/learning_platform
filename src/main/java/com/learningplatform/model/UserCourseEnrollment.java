package com.learningplatform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * User Course Enrollment entity managing the relationship between users and courses
 * Tracks enrollment status, progress, and completion details
 */
@Entity
@Table(name = "user_course_enrollments", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "course_id"})
})

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserCourseEnrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EnrollmentStatus status = EnrollmentStatus.LEARNING;
    
    @Column(name = "progress_percentage")
    private Double progressPercentage = 0.0;
    
    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum EnrollmentStatus {
        LEARNING,
        COMPLETED
    }
    
    public UserCourseEnrollment() {}
    
    public UserCourseEnrollment(User user, Course course) {
        this.user = user;
        this.course = course;
        this.status = EnrollmentStatus.LEARNING;
        this.progressPercentage = 0.0;
    }
    
    @PrePersist
    protected void onCreate() {
        enrolledAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (status == EnrollmentStatus.COMPLETED && completedAt == null) {
            completedAt = LocalDateTime.now();
        }
    }
    
    // Method to mark course as completed
    public void markAsCompleted() {
        this.status = EnrollmentStatus.COMPLETED;
        this.progressPercentage = 100.0;
        this.completedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    
    public EnrollmentStatus getStatus() { return status; }
    public void setStatus(EnrollmentStatus status) { this.status = status; }
    
    public Double getProgressPercentage() { return progressPercentage; }
    public void setProgressPercentage(Double progressPercentage) { this.progressPercentage = progressPercentage; }
    
    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }
    
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
