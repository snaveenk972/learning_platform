package com.learningplatform.exception;

import com.learningplatform.dto.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * Global exception handler for comprehensive error management
 * Provides consistent error responses across the application
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    /**
     * Handle validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        logger.warn("Validation failed: {}", errors);
        return ResponseEntity.badRequest()
                .body(new MessageResponse("Validation failed", HttpStatus.BAD_REQUEST.value(), errors));
    }
    
    /**
     * Handle authentication errors
     */
    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException ex, WebRequest request) {
        logger.warn("Authentication failed: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse("Authentication failed: " + ex.getMessage(), 
                      HttpStatus.UNAUTHORIZED.value()));
    }
    
    /**
     * Handle access denied errors
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        logger.warn("Access denied: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new MessageResponse("Access denied: " + ex.getMessage(), 
                      HttpStatus.FORBIDDEN.value()));
    }
    
    /**
     * Handle runtime exceptions
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex, WebRequest request) {
        logger.error("Runtime exception occurred: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("An error occurred: " + ex.getMessage(), 
                      HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
    
    /**
     * Handle illegal argument exceptions
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
        logger.warn("Invalid argument: {}", ex.getMessage());
        return ResponseEntity.badRequest()
                .body(new MessageResponse("Invalid request: " + ex.getMessage(), 
                      HttpStatus.BAD_REQUEST.value()));
    }
    
    /**
     * Handle all other exceptions
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        logger.error("Unexpected error occurred: {}", ex.getMessage(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new MessageResponse("An unexpected error occurred. Please try again later.", 
                      HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }
}
