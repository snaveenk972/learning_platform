# Learning Platform - Complete Full-Stack Application

This project now includes both the **Spring Boot backend** and the **Angular frontend** for a comprehensive learning management system.

## Project Structure

```
learning_platform/
├── src/                          # Spring Boot Backend
│   ├── main/
│   │   ├── java/
│   │   └── resources/
├── frontend/                     # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   ├── environments/
│   │   └── styles.css
│   ├── package.json
│   └── README.md
├── pom.xml                       # Backend dependencies
├── start.bat                     # Start backend script
└── README.md                     # This file
```

## Quick Start

### Prerequisites
- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Maven** (for backend)
- **Angular CLI** (for frontend)

### Option 1: Start Both Services

1. **Start the Backend** (Terminal 1):
```bash
# In project root
./start.bat
# or
mvn spring-boot:run
```

2. **Start the Frontend** (Terminal 2):
```bash
cd frontend
npm install
npm start
```

### Option 2: Individual Setup

#### Backend Setup
```bash
mvn clean install
mvn spring-boot:run
```
Backend will run on: `http://localhost:8080`

#### Frontend Setup
```bash
cd frontend
npm install
ng serve
```
Frontend will run on: `http://localhost:4200`

## System Architecture

### Backend (Spring Boot)
- **Authentication**: JWT-based security
- **Database**: H2 (development) / MySQL (production)
- **API**: RESTful endpoints
- **Features**: User management, Course management, Testing system, Enrollment tracking

### Frontend (Angular)
- **Framework**: Angular 17 with standalone components
- **Styling**: Bootstrap 5 + Custom CSS
- **State Management**: RxJS Observables
- **Features**: Responsive design, Real-time updates, Progressive Web App ready

## Key Features

### 🔐 Authentication System
- User registration and login
- JWT token management
- Role-based access control
- Password validation

### 📚 Course Management
- Course catalog browsing
- Search and filtering
- Detailed course information
- Instructor profiles

### 🎯 Assessment System
- Interactive quizzes/tests
- Real-time scoring
- Progress tracking
- Certificate generation

### 📊 Analytics Dashboard
- User progress tracking
- Learning statistics
- Performance analytics
- Enrollment management

### 📱 Responsive Design
- Mobile-first approach
- Cross-browser compatibility
- Touch-friendly interface
- Progressive Web App features

## API Documentation

### Authentication Endpoints
```
POST /api/auth/signin          # User login
POST /api/auth/signup          # User registration
GET  /api/auth/check-username  # Username availability
GET  /api/auth/check-email     # Email availability
```

### Course Endpoints
```
GET  /api/courses/list         # Get all courses
GET  /api/courses/{id}         # Get course by ID
GET  /api/courses/search       # Search courses
GET  /api/courses/category     # Filter by category
```

### Enrollment Endpoints
```
POST /api/enrollments/enroll   # Enroll in course
GET  /api/enrollments/user     # User enrollments
PUT  /api/enrollments/progress # Update progress
```

### Test Endpoints
```
GET  /api/tests/course/{id}    # Get test questions
POST /api/tests/submit         # Submit test answers
GET  /api/tests/results        # Get test results
```

## Development Workflow

### Backend Development
```bash
# Run tests
mvn test

# Build for production
mvn clean package

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=production
```

### Frontend Development
```bash
# Development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test

# Lint code
ng lint
```

## Configuration

### Backend Configuration
Update `src/main/resources/application.properties`:
```properties
# Database
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=update

# JWT
app.jwtSecret=mySecretKey
app.jwtExpirationMs=86400000

# CORS
app.cors.allowedOrigins=http://localhost:4200
```

### Frontend Configuration
Update `frontend/src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Database Schema

### Core Tables
- **users**: User information and authentication
- **courses**: Course catalog and metadata
- **user_course_enrollments**: Enrollment tracking
- **test_results**: Assessment results and scores

## Security Features

### Backend Security
- JWT token validation
- CORS configuration
- SQL injection prevention
- Input validation and sanitization

### Frontend Security
- JWT token management
- Route guards
- XSS protection
- CSRF protection ready

## Performance Optimizations

### Backend
- Database connection pooling
- Query optimization
- Caching strategies
- API rate limiting ready

### Frontend
- Lazy loading routes
- OnPush change detection
- Bundle optimization
- Service worker ready

## Testing

### Backend Testing
```bash
mvn test                    # Unit tests
mvn integration-test        # Integration tests
```

### Frontend Testing
```bash
ng test                     # Unit tests
ng e2e                      # End-to-end tests
```

## Deployment

### Backend Deployment
```bash
# Build JAR
mvn clean package

# Run JAR
java -jar target/learning-platform-backend-1.0.0.jar
```

### Frontend Deployment
```bash
# Build for production
ng build --configuration production

# Deploy dist/ folder to web server
```

## Monitoring and Logging

### Backend Monitoring
- Spring Boot Actuator endpoints
- Application metrics
- Health checks
- Custom logging

### Frontend Monitoring
- Error tracking ready
- Performance monitoring
- User analytics ready

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the documentation in each module
- Review the API documentation
- Check the troubleshooting guides
- Open an issue on GitHub

---

**Built with ❤️ using Spring Boot and Angular**
