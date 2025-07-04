package com.learningplatform.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for API response messages
 * Provides standardized response format for all API endpoints
 */
public class MessageResponse {
    
    private String message;
    private Integer status;
    private LocalDateTime timestamp;
    private Object data;
    
    public MessageResponse(String message) {
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
    
    public MessageResponse(String message, Integer status) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
    
    public MessageResponse(String message, Integer status, Object data) {
        this.message = message;
        this.status = status;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}
