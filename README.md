# Learning Platform Backend

A comprehensive backend application for a learning management system built with **Java Spring Boot** and **H2 in-memory database**.

## 🚀 Features

### 1. User Authentication & Management
- **User Registration**: Sign up with username, password, first name, last name, email, and phone number
- **User Login**: Secure login using username or email with JWT token authentication
- **User Validation**: Real-time username and email availability checking
- **Security**: Password encryption using BCrypt and JWT-based authentication

### 2. Course Management
- **Course Catalog**: Browse all available courses with detailed information
- **Course Search**: Search courses by keyword, category, or difficulty level
- **Course Filtering**: Filter courses by duration, instructor, and other criteria
- **Course Details**: Comprehensive course information including description, duration, and difficulty

### 3. Enrollment System
- **Multiple Enrollment**: Enroll in one or more courses simultaneously
- **Learning Tracking**: Track course progress with percentage completion
- **Status Management**: Automatic status updates (Learning → Completed)
- **Enrollment Statistics**: Detailed analytics on user learning progress

### 4. Assessment & Testing System
- **Question Bank**: Each course has 5 multiple-choice questions with explanations
- **Test Taking**: Interactive test interface with timer and progress tracking
- **Auto-Grading**: Automatic scoring based on correct answers (A, B, C, D format)
- **Test Results**: Comprehensive results with score, pass/fail status, and timing
- **Achievement System**: Automatic course completion based on test results (70% passing grade)
- **Test Analytics**: Comprehensive statistics on test performance
- **Question Security**: Correct answers are not exposed to frontend during test-taking

### 5. Achievement System
- **Course Completion**: Courses marked as completed upon successful test completion
- **Achievement Tracking**: View all completed courses and certifications
- **Progress Analytics**: Detailed insights into learning journey

## 🛠 Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: H2 In-Memory Database
- **Security**: Spring Security with JWT Authentication
- **Build Tool**: Maven
- **Documentation**: Comprehensive REST API

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd learning-platform-backend
```

### 2. Build the Project
```bash
mvn clean install
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access H2 Database Console
- URL: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:learning_platform`
- Username: `sa`
- Password: `password`

## 🔧 Configuration

### Database Configuration
The application uses H2 in-memory database with the following settings:
- **URL**: `jdbc:h2:mem:learning_platform`
- **Driver**: `org.h2.Driver`
- **Username**: `sa`
- **Password**: `password`

### JWT Configuration
- **Secret Key**: Configurable in `application.properties`
- **Token Expiration**: 24 hours (86400000 ms)
- **Token Type**: Bearer

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "username": "johndoe",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "1234567890"
}
```

#### POST `/api/auth/signin`
User login
```json
{
  "usernameOrEmail": "johndoe",
  "password": "password123"
}
```

#### GET `/api/auth/check-username/{username}`
Check username availability

#### GET `/api/auth/check-email/{email}`
Check email availability

### Course Endpoints

#### GET `/api/courses/list`
Get all available courses

#### GET `/api/courses/{courseId}`
Get course details by ID

#### GET `/api/courses/search/{keyword}`
Search courses by keyword

#### GET `/api/courses/category/{category}`
Get courses by category

#### GET `/api/courses/difficulty/{difficulty}`
Get courses by difficulty level

#### GET `/api/courses/categories`
Get all available categories

#### GET `/api/courses/difficulty-levels`
Get all difficulty levels

### Enrollment Endpoints (Authenticated)

#### POST `/api/enrollments/enroll`
Enroll in multiple courses
```json
{
  "courseIds": [1, 2, 3]
}
```

#### GET `/api/enrollments/learning`
Get user's current learning courses

#### GET `/api/enrollments/achievements`
Get user's completed courses

#### GET `/api/enrollments/all`
Get all user enrollments

#### PUT `/api/enrollments/progress/{courseId}?progressPercentage=75`
Update course progress

#### PUT `/api/enrollments/complete/{courseId}`
Mark course as completed

#### GET `/api/enrollments/stats`
Get enrollment statistics

### Test Endpoints (Authenticated)

#### GET `/api/tests/course/{courseId}/questions`
Get test questions for a course
```json
// Response format:
{
  "message": "Questions retrieved successfully",
  "status": 200,
  "data": [
    {
      "id": 1,
      "questionText": "What is the main purpose of the 'public static void main(String[] args)' method in Java?",
      "options": [
        "It's the entry point of a Java application",
        "It creates new objects",
        "It handles exceptions",
        "It connects to databases"
      ],
      "explanation": "The main method is the entry point where the JVM starts executing the program.",
      "difficultyLevel": "BEGINNER",
      "points": 1
    }
  ]
}
```

#### POST `/api/tests/submit`
Submit test answers with automatic grading
```json
{
  "courseId": 1,
  "answers": {
    "1": "A",
    "2": "B",
    "3": "C",
    "4": "A",
    "5": "D"
  },
  "testDurationMinutes": 30
}
```

#### GET `/api/tests/results`
Get user's test results

#### GET `/api/tests/results/course/{courseId}`
Get test results for specific course

#### GET `/api/tests/results/latest/{courseId}`
Get latest test result for course

#### GET `/api/tests/passed`
Get user's passed tests

#### GET `/api/tests/statistics`
Get test statistics

#### GET `/api/tests/highest-score/{courseId}`
Get highest score for course

## 🗃 Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `password` (Encrypted)
- `first_name`
- `last_name`
- `email` (Unique)
- `phone_number`
- `created_at`
- `updated_at`

### Courses Table
- `id` (Primary Key)
- `title`
- `description`
- `duration_hours`
- `difficulty_level`
- `category`
- `instructor_name`
- `is_active`
- `created_at`
- `updated_at`

### Questions Table
- `id` (Primary Key)
- `course_id` (Foreign Key)
- `question_text`
- `option_a`
- `option_b`
- `option_c`
- `option_d`
- `correct_answer` (A, B, C, or D)
- `explanation`
- `difficulty_level`
- `points`
- `is_active`
- `created_at`
- `updated_at`

### User Course Enrollments Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `course_id` (Foreign Key)
- `status` (LEARNING/COMPLETED)
- `progress_percentage`
- `enrolled_at`
- `completed_at`
- `updated_at`

### Test Results Table
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `course_id` (Foreign Key)
- `score`
- `total_questions`
- `correct_answers`
- `test_duration_minutes`
- `passed`
- `test_taken_at`
- `created_at`

## 🧪 Sample Data

The application comes with pre-populated sample courses:

### Programming
- Java Programming Fundamentals (Beginner, 40 hours)
- Python for Data Science (Intermediate, 35 hours)
- Modern JavaScript and Web Development (Intermediate, 45 hours)
- React.js Complete Guide (Advanced, 50 hours)

### Data Science
- Data Analytics with SQL (Beginner, 30 hours)
- Machine Learning Fundamentals (Advanced, 60 hours)

### Business
- Digital Marketing Strategy (Beginner, 25 hours)
- Agile Project Management (Intermediate, 35 hours)

### Design
- UI/UX Design Principles (Beginner, 40 hours)
- Advanced Graphic Design (Advanced, 45 hours)

### Technology
- Cloud Computing with AWS (Intermediate, 55 hours)
- Cybersecurity Fundamentals (Intermediate, 40 hours)

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt hashing for password security
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive validation for all inputs
- **SQL Injection Prevention**: Parameterized queries with JPA
- **Error Handling**: Secure error responses without sensitive information

## 📈 Performance Features

- **Connection Pooling**: Optimized database connections
- **Lazy Loading**: Efficient entity loading strategies
- **Caching**: Strategic caching for improved performance
- **Pagination Support**: Ready for large dataset handling
- **Transaction Management**: Proper transaction boundaries

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 📝 Logging

The application includes comprehensive logging:
- **Authentication Events**: Login attempts, failures
- **Enrollment Activities**: Course enrollments, completions
- **Test Submissions**: Test results, scores
- **Error Tracking**: Detailed error logs with stack traces

## 🚀 Deployment Considerations

### Environment Variables
For production deployment, consider externalizing:
- JWT secret key
- Database configuration
- CORS origins
- Logging levels

### Database Migration
For production use:
- Replace H2 with persistent database (PostgreSQL, MySQL)
- Implement proper database migrations
- Configure connection pooling
- Set up database monitoring

### Security Enhancements
- Implement rate limiting
- Add API versioning
- Configure HTTPS
- Implement audit logging
- Add input sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please create an issue in the repository.

---

**Built with ❤️ using Spring Boot and Java**
