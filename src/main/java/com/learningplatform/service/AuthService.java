package com.learningplatform.service;

import com.learningplatform.dto.*;
import com.learningplatform.model.User;
import com.learningplatform.repository.UserRepository;
import com.learningplatform.security.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.learningplatform.security.UserPrincipal;

/**
 * Authentication service handling user registration and login
 * Implements secure authentication with JWT token generation
 */
@Service
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    /**
     * Authenticate user and generate JWT token
     */
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsernameOrEmail(), 
                    loginRequest.getPassword())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            
            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getFirstName(),
                    userDetails.getLastName()));
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", loginRequest.getUsernameOrEmail(), e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Invalid username/email or password", 400));
        }
    }
    
    /**
     * Register new user with comprehensive validation
     */
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        try {
            // Check if username already exists
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Username is already taken!", 400));
            }
            
            // Check if email already exists
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Email is already in use!", 400));
            }
            
            // Create new user account
            User user = new User(signUpRequest.getUsername(),
                               encoder.encode(signUpRequest.getPassword()),
                               signUpRequest.getFirstName(),
                               signUpRequest.getLastName(),
                               signUpRequest.getEmail(),
                               signUpRequest.getPhoneNumber());
            
            userRepository.save(user);
            
            logger.info("User registered successfully: {}", user.getUsername());
            return ResponseEntity.ok(new MessageResponse("User registered successfully!", 200));
        } catch (Exception e) {
            logger.error("User registration failed for username: {}", signUpRequest.getUsername(), e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Registration failed. Please try again.", 400));
        }
    }
    
    /**
     * Validate if username is available
     */
    public ResponseEntity<?> checkUsernameAvailability(String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return ResponseEntity.ok(new MessageResponse("Username availability checked", 200, isAvailable));
    }
    
    /**
     * Validate if email is available
     */
    public ResponseEntity<?> checkEmailAvailability(String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return ResponseEntity.ok(new MessageResponse("Email availability checked", 200, isAvailable));
    }
}
