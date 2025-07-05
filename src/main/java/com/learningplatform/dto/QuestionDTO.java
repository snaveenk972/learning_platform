package com.learningplatform.dto;

import com.learningplatform.model.Question;
import java.util.List;

/**
 * DTO for questions without revealing correct answers
 */
public class QuestionDTO {
    private Long id;
    private String questionText;
    private List<String> options;
    private String explanation;
    private String difficultyLevel;
    private Integer points;
    
    public QuestionDTO() {}
    
    public QuestionDTO(Question question) {
        this.id = question.getId();
        this.questionText = question.getQuestionText();
        this.options = List.of(
            question.getOptionA(),
            question.getOptionB(), 
            question.getOptionC(),
            question.getOptionD()
        );
        this.explanation = question.getExplanation();
        this.difficultyLevel = question.getDifficultyLevel();
        this.points = question.getPoints();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuestionText() {
        return questionText;
    }
    
    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
    
    public List<String> getOptions() {
        return options;
    }
    
    public void setOptions(List<String> options) {
        this.options = options;
    }
    
    public String getExplanation() {
        return explanation;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
    public String getDifficultyLevel() {
        return difficultyLevel;
    }
    
    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }
    
    public Integer getPoints() {
        return points;
    }
    
    public void setPoints(Integer points) {
        this.points = points;
    }
}
