package com.learningplatform.service;

import com.learningplatform.dto.MessageResponse;
import com.learningplatform.dto.QuestionDTO;
import com.learningplatform.dto.TestSubmissionRequest;
import com.learningplatform.model.Course;
import com.learningplatform.model.Question;
import com.learningplatform.model.TestResult;
import com.learningplatform.model.User;
import com.learningplatform.model.UserCourseEnrollment;
import com.learningplatform.repository.CourseRepository;
import com.learningplatform.repository.QuestionRepository;
import com.learningplatform.repository.TestResultRepository;
import com.learningplatform.repository.UserCourseEnrollmentRepository;
import com.learningplatform.repository.UserRepository;
import com.learningplatform.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Test service for managing course assessments and test results
 * Handles test submission, scoring, and performance analytics
 */
@Service
@Transactional
public class TestService {
    
    private static final Logger logger = LoggerFactory.getLogger(TestService.class);
    
    @Autowired
    private TestResultRepository testResultRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private UserCourseEnrollmentRepository enrollmentRepository;
    
    /**
     * Submit test results and update course completion status
     */
    public ResponseEntity<?> submitTest(TestSubmissionRequest testRequest) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            User user = userRepository.findById(userPrincipal.getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Validate course exists
            Course course = courseRepository.findById(testRequest.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            
            // Check if user is enrolled in the course
            Optional<UserCourseEnrollment> enrollmentOpt = 
                    enrollmentRepository.findByUserIdAndCourseId(user.getId(), course.getId());
            
            if (!enrollmentOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("User not enrolled in this course", 400));
            }
            
            // Get all questions for the course
            List<Question> questions = questionRepository.findActiveByCourseId(course.getId());
            
            if (questions.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("No questions found for this course", 400));
            }
            
            // Calculate score based on answers
            int totalQuestions = questions.size();
            int correctAnswers = 0;
            
            for (Question question : questions) {
                String userAnswer = testRequest.getAnswers().get(question.getId());
                if (userAnswer != null && question.isCorrect(userAnswer)) {
                    correctAnswers++;
                }
            }
            
            double score = totalQuestions > 0 ? (double) correctAnswers / totalQuestions * 100 : 0;
            
            // Create test result
            TestResult testResult = new TestResult(
                    user, 
                    course, 
                    score,
                    totalQuestions,
                    correctAnswers,
                    testRequest.getTestDurationMinutes()
            );
            
            testResultRepository.save(testResult);
            
            // Update enrollment status if test is passed (score >= 70%)
            if (testResult.getPassed()) {
                UserCourseEnrollment enrollment = enrollmentOpt.get();
                enrollment.markAsCompleted();
                enrollmentRepository.save(enrollment);
                
                logger.info("User {} completed course {} with score {}", 
                        user.getUsername(), course.getTitle(), testResult.getScore());
            }
            
            String message = testResult.getPassed() ? 
                    "Test submitted successfully. Course completed!" : 
                    "Test submitted successfully. Retake available if needed.";
            
            return ResponseEntity.ok(new MessageResponse(message, 200, testResult));
            
        } catch (Exception e) {
            logger.error("Failed to submit test", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to submit test", 400));
        }
    }
    
    /**
     * Get user's test results
     */
    public ResponseEntity<?> getUserTestResults() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<TestResult> testResults = testResultRepository.findByUserId(userPrincipal.getId());
            
            return ResponseEntity.ok(new MessageResponse("Test results retrieved successfully", 200, testResults));
        } catch (Exception e) {
            logger.error("Failed to retrieve user test results", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve test results", 400));
        }
    }
    
    /**
     * Get test results for a specific course
     */
    public ResponseEntity<?> getTestResultsByCourse(Long courseId) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<TestResult> testResults = testResultRepository
                    .findByUserIdAndCourseIdOrderByTestTakenAtDesc(userPrincipal.getId(), courseId);
            
            return ResponseEntity.ok(new MessageResponse("Course test results retrieved", 200, testResults));
        } catch (Exception e) {
            logger.error("Failed to retrieve test results for course ID: {}", courseId, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve test results", 400));
        }
    }
    
    /**
     * Get latest test result for a course
     */
    public ResponseEntity<?> getLatestTestResult(Long courseId) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            Optional<TestResult> testResult = testResultRepository
                    .findLatestByUserIdAndCourseId(userPrincipal.getId(), courseId);
            
            if (testResult.isPresent()) {
                return ResponseEntity.ok(new MessageResponse("Latest test result retrieved", 200, testResult.get()));
            } else {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("No test results found for this course", 404));
            }
        } catch (Exception e) {
            logger.error("Failed to retrieve latest test result for course ID: {}", courseId, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve test result", 400));
        }
    }
    
    /**
     * Get user's passed tests (achievements)
     */
    public ResponseEntity<?> getUserPassedTests() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            List<TestResult> passedTests = testResultRepository.findByUserIdAndPassedTrue(userPrincipal.getId());
            
            return ResponseEntity.ok(new MessageResponse("Passed tests retrieved successfully", 200, passedTests));
        } catch (Exception e) {
            logger.error("Failed to retrieve passed tests", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve passed tests", 400));
        }
    }
    
    /**
     * Get test statistics for user
     */
    public ResponseEntity<?> getUserTestStatistics() {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            Long userId = userPrincipal.getId();
            
            Long totalTests = testResultRepository.countByUserId(userId);
            Long passedTests = testResultRepository.countByUserIdAndPassedTrue(userId);
            Double averageScore = testResultRepository.getAverageScoreByUserId(userId);
            
            TestStatistics stats = new TestStatistics(
                    totalTests, 
                    passedTests, 
                    totalTests > 0 ? passedTests * 100.0 / totalTests : 0.0,
                    averageScore != null ? averageScore : 0.0
            );
            
            return ResponseEntity.ok(new MessageResponse("Test statistics retrieved", 200, stats));
        } catch (Exception e) {
            logger.error("Failed to retrieve test statistics", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve test statistics", 400));
        }
    }
    
    /**
     * Get highest score for a specific course
     */
    public ResponseEntity<?> getHighestScoreForCourse(Long courseId) {
        try {
            UserPrincipal userPrincipal = getCurrentUser();
            Optional<Double> highestScore = testResultRepository
                    .getHighestScoreByUserIdAndCourseId(userPrincipal.getId(), courseId);
            
            if (highestScore.isPresent()) {
                return ResponseEntity.ok(new MessageResponse("Highest score retrieved", 200, highestScore.get()));
            } else {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("No test results found for this course", 404));
            }
        } catch (Exception e) {
            logger.error("Failed to retrieve highest score for course ID: {}", courseId, e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Failed to retrieve highest score", 400));
        }
    }
    
    private UserPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserPrincipal) authentication.getPrincipal();
    }
    
    /**
     * Get test questions for a course
     */
    public ResponseEntity<?> getTestQuestions(Long courseId) {
        try {
            Optional<Course> courseOpt = courseRepository.findById(courseId);
            if (!courseOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Course not found", 404));
            }
            
            Course course = courseOpt.get();
            List<Question> questions = questionRepository.findActiveByCourseId(courseId);
            
            if (questions.isEmpty()) {
                return ResponseEntity.ok()
                        .body(new ApiResponse<>("No questions available for this course", 200, List.of()));
            }
            
            // Create a simplified version of questions without the correct answers
            List<QuestionDTO> questionDTOs = questions.stream()
                    .map(q -> new QuestionDTO(q))
                    .toList();
            
            logger.info("Retrieved {} questions for course: {}", questionDTOs.size(), course.getTitle());
            return ResponseEntity.ok()
                    .body(new ApiResponse<>("Questions retrieved successfully", 200, questionDTOs));
            
        } catch (Exception e) {
            logger.error("Error retrieving questions for course {}: {}", courseId, e.getMessage(), e);
            return ResponseEntity.internalServerError()
                    .body(new MessageResponse("Error retrieving questions", 500));
        }
    }
    
    /**
     * API Response wrapper
     */
    public static class ApiResponse<T> {
        private String message;
        private int status;
        private T data;
        private String timestamp;
        
        public ApiResponse(String message, int status, T data) {
            this.message = message;
            this.status = status;
            this.data = data;
            this.timestamp = java.time.LocalDateTime.now().toString();
        }
        
        public String getMessage() { return message; }
        public int getStatus() { return status; }
        public T getData() { return data; }
        public String getTimestamp() { return timestamp; }
    }
    
    // Helper class for test statistics
    public static class TestStatistics {
        private Long totalTests;
        private Long passedTests;
        private Double passRate;
        private Double averageScore;
        
        public TestStatistics(Long totalTests, Long passedTests, Double passRate, Double averageScore) {
            this.totalTests = totalTests;
            this.passedTests = passedTests;
            this.passRate = passRate;
            this.averageScore = averageScore;
        }
        
        public Long getTotalTests() { return totalTests; }
        public Long getPassedTests() { return passedTests; }
        public Double getPassRate() { return passRate; }
        public Double getAverageScore() { return averageScore; }
    }
}
