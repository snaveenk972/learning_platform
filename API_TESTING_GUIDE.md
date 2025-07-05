# Learning Platform API Testing Guide

## Prerequisites
- Application running on http://localhost:8080
- REST client (Postman, curl, or similar)

## 1. Test Course Endpoints (No Authentication Required)

### Get All Courses
```bash
curl -X GET http://localhost:8080/api/courses/list
```

### Search Courses
```bash
curl -X GET http://localhost:8080/api/courses/search/java
```

### Get Courses by Category
```bash
curl -X GET http://localhost:8080/api/courses/category/Programming
```

### Get Available Categories
```bash
curl -X GET http://localhost:8080/api/courses/categories
```

## 2. User Registration and Authentication

### Register New User
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phoneNumber": "1234567890"
  }'
```

### User Login
```bash
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

**Save the JWT token from the login response for authenticated requests!**

## 3. Authenticated Endpoints (Requires JWT Token)

### Enroll in Courses
```bash
curl -X POST http://localhost:8080/api/enrollments/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "courseIds": [1, 2, 3]
  }'
```

### Get User's Learning Courses
```bash
curl -X GET http://localhost:8080/api/enrollments/learning \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Test Questions for a Course
```bash
curl -X GET http://localhost:8080/api/tests/course/1/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Submit Test Answers (Auto-Graded)
```bash
curl -X POST http://localhost:8080/api/tests/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "courseId": 1,
    "answers": {
      "1": "A",
      "2": "B",
      "3": "C",
      "4": "A",
      "5": "D"
    },
    "testDurationMinutes": 30
  }'
```

### Get Test Results
```bash
curl -X GET http://localhost:8080/api/tests/results \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Update Course Progress
```bash
curl -X PUT "http://localhost:8080/api/enrollments/progress/1?progressPercentage=75" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get User Statistics
```bash
curl -X GET http://localhost:8080/api/enrollments/stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Test Statistics
```bash
curl -X GET http://localhost:8080/api/tests/statistics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 4. Testing Flow Example

1. **Start the application** using `start.bat`
2. **Register a new user** using the signup endpoint
3. **Login** to get JWT token
4. **Browse courses** using the course endpoints
5. **Enroll in courses** using the enrollment endpoint
6. **Update progress** as you learn
7. **Get test questions** for a course you want to complete
8. **Submit test answers** for automatic grading
9. **View test results** and course completion status
10. **View achievements** and statistics

## 5. H2 Database Console

Access the H2 database console at: http://localhost:8080/api/h2-console

- **JDBC URL**: `jdbc:h2:mem:learning_platform`
- **Username**: `sa`
- **Password**: `password`

## 6. Sample Queries for Database

```sql
-- View all users
SELECT * FROM USERS;

-- View all courses
SELECT * FROM COURSES;

-- View enrollments
SELECT * FROM USER_COURSE_ENROLLMENTS;

-- View test results
SELECT * FROM TEST_RESULTS;

-- Get user learning progress
SELECT u.username, c.title, e.status, e.progress_percentage
FROM USERS u
JOIN USER_COURSE_ENROLLMENTS e ON u.id = e.user_id
JOIN COURSES c ON e.course_id = c.id;
```

## 7. Expected Response Formats

### Successful Response
```json
{
  "message": "Operation successful",
  "status": 200,
  "timestamp": "2025-01-04T...",
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error description",
  "status": 400,
  "timestamp": "2025-01-04T...",
  "data": null
}
```

Replace `YOUR_JWT_TOKEN` with the actual token received from the login response.
