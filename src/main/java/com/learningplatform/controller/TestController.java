package com.learningplatform.controller;

import com.learningplatform.dto.TestSubmissionRequest;
import com.learningplatform.service.TestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Test controller for managing course assessments and test results
 * Provides secure endpoints for test submission and performance analytics
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/tests")
//@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class TestController {
    
    @Autowired
    private TestService testService;
    
    /**
     * Submit test results
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitTest(@Valid @RequestBody TestSubmissionRequest testRequest) {
        return testService.submitTest(testRequest);
    }
    
    /**
     * Get test questions for a course
     */
    @GetMapping("/course/{courseId}/questions")
    public ResponseEntity<?> getTestQuestions(@PathVariable Long courseId) {
        return testService.getTestQuestions(courseId);
    }
    
    /**
     * Get user's test results
     */
    @GetMapping("/results")
    public ResponseEntity<?> getUserTestResults() {
        return testService.getUserTestResults();
    }
    
    /**
     * Get test results for specific course
     */
    @GetMapping("/results/course/{courseId}")
    public ResponseEntity<?> getTestResultsByCourse(@PathVariable Long courseId) {
        return testService.getTestResultsByCourse(courseId);
    }
    
    /**
     * Get latest test result for a course
     */
    @GetMapping("/results/latest/{courseId}")
    public ResponseEntity<?> getLatestTestResult(@PathVariable Long courseId) {
        return testService.getLatestTestResult(courseId);
    }
    
    /**
     * Get user's passed tests (achievements)
     */
    @GetMapping("/passed")
    public ResponseEntity<?> getUserPassedTests() {
        return testService.getUserPassedTests();
    }
    
    /**
     * Get test statistics for user
     */
    @GetMapping("/statistics")
    public ResponseEntity<?> getUserTestStatistics() {
        return testService.getUserTestStatistics();
    }
    
    /**
     * Get highest score for specific course
     */
    @GetMapping("/highest-score/{courseId}")
    public ResponseEntity<?> getHighestScoreForCourse(@PathVariable Long courseId) {
        return testService.getHighestScoreForCourse(courseId);
    }
}
