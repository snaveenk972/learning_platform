package com.learningplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for Learning Platform Backend
 * Provides comprehensive learning management system with user authentication,
 * course management, progress tracking, and assessment capabilities
 */
@SpringBootApplication
public class LearningPlatformApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningPlatformApplication.class, args);
    }
}
