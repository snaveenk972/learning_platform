package com.learningplatform.controller;

import com.learningplatform.dto.LoginRequest;
import com.learningplatform.dto.SignupRequest;
import com.learningplatform.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication controller handling user registration and login
 * Provides secure endpoints for user authentication and account management
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    /**
     * User login endpoint
     * Supports login with username or email
     */
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest);
    }
    
    /**
     * User registration endpoint
     * Creates new user account with comprehensive validation
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return authService.registerUser(signUpRequest);
    }
    
    /**
     * Check username availability
     */
    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsernameAvailability(@PathVariable String username) {
        return authService.checkUsernameAvailability(username);
    }
    
    /**
     * Check email availability
     */
    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmailAvailability(@PathVariable String email) {
        return authService.checkEmailAvailability(email);
    }
}
