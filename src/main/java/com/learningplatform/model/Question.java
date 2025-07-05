package com.learningplatform.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Question entity for storing course test questions
 * Each question belongs to a course and contains multiple choice options
 */
@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @NotBlank(message = "Question text is required")
    @Column(name = "question_text", columnDefinition = "TEXT")
    private String questionText;
    
    @NotBlank(message = "Option A is required")
    @Column(name = "option_a")
    private String optionA;
    
    @NotBlank(message = "Option B is required")
    @Column(name = "option_b")
    private String optionB;
    
    @NotBlank(message = "Option C is required")
    @Column(name = "option_c")
    private String optionC;
    
    @NotBlank(message = "Option D is required")
    @Column(name = "option_d")
    private String optionD;
    
    @NotBlank(message = "Correct answer is required")
    @Column(name = "correct_answer")
    private String correctAnswer; // Should be A, B, C, or D
    
    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;
    
    @Column(name = "difficulty_level")
    private String difficultyLevel = "BEGINNER";
    
    @NotNull(message = "Points value is required")
    @Column(name = "points")
    private Integer points = 1;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public Question() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    public Question(Course course, String questionText, String optionA, String optionB, 
                   String optionC, String optionD, String correctAnswer, String explanation) {
        this();
        this.course = course;
        this.questionText = questionText;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
    }
    
    public Question(Course course, String questionText, String optionA, String optionB, 
                   String optionC, String optionD, String correctAnswer, String explanation,
                   String difficultyLevel, Integer points) {
        this(course, questionText, optionA, optionB, optionC, optionD, correctAnswer, explanation);
        this.difficultyLevel = difficultyLevel;
        this.points = points;
    }
    
    // Lifecycle callbacks
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
    
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    
    public String getOptionA() { return optionA; }
    public void setOptionA(String optionA) { this.optionA = optionA; }
    
    public String getOptionB() { return optionB; }
    public void setOptionB(String optionB) { this.optionB = optionB; }
    
    public String getOptionC() { return optionC; }
    public void setOptionC(String optionC) { this.optionC = optionC; }
    
    public String getOptionD() { return optionD; }
    public void setOptionD(String optionD) { this.optionD = optionD; }
    
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    
    public String getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(String difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    // Helper method to get options as a list (for frontend)
    public List<String> getOptions() {
        return List.of(optionA, optionB, optionC, optionD);
    }
    
    // Helper method to check if an answer is correct
    public boolean isCorrect(String answer) {
        return correctAnswer != null && correctAnswer.equalsIgnoreCase(answer);
    }
    
    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", course=" + (course != null ? course.getTitle() : "null") +
                ", questionText='" + questionText + '\'' +
                ", correctAnswer='" + correctAnswer + '\'' +
                ", difficultyLevel=" + difficultyLevel +
                ", points=" + points +
                '}';
    }
}
