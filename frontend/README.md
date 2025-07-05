# Learning Platform Frontend

A modern, responsive Angular frontend application for the Learning Platform backend system. Built with Angular 17, Bootstrap 5, and TypeScript, this application provides a comprehensive user interface for course management, user authentication, testing, and learning progress tracking.

## Features

### 🔐 Authentication
- User registration with validation (including phone number)
- Secure login with JWT tokens
- Username and email availability checking
- Password strength validation
- Phone number validation with international format support
- Remember me functionality

### 📚 Course Management
- Browse all available courses
- Search and filter courses by category, difficulty, and keywords
- Detailed course views with instructor information
- Course enrollment system
- Progress tracking

### 🎯 Testing System
- Interactive course assessments
- Multiple-choice questions
- Real-time timer
- Instant results with detailed feedback
- Certificate generation for passed tests
- Retake functionality

### 📊 User Dashboard
- Personalized learning dashboard
- Enrollment statistics
- Test results overview
- Progress tracking
- Recent activity

### 👤 User Profile
- Comprehensive profile management
- Personal information editing (including phone number)
- Learning statistics
- Social media links
- Profile picture (placeholder)

### 🎨 Modern UI/UX
- Responsive design for all devices
- Bootstrap 5 integration
- Font Awesome icons
- Smooth animations and transitions
- Dark/light theme support (customizable)

## Technology Stack

- **Framework**: Angular 17 (Standalone Components)
- **Styling**: Bootstrap 5, Custom CSS
- **Icons**: Font Awesome 6
- **HTTP Client**: Angular HttpClient with Interceptors
- **Routing**: Angular Router with Guards
- **Forms**: Reactive Forms with Validation
- **State Management**: RxJS Observables
- **Build Tool**: Angular CLI

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── courses/
│   │   │   ├── course-list/
│   │   │   └── course-detail/
│   │   ├── shared/
│   │   │   ├── navbar/
│   │   │   └── footer/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── test/
│   │   └── home/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── course.service.ts
│   │   ├── enrollment.service.ts
│   │   └── test.service.ts
│   ├── models/
│   │   └── models.ts
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── environments/
├── assets/
└── styles.css
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the backend API URL in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'  // Update this to match your backend URL
};
```

4. Start the development server:
```bash
npm start
# or
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
# or
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Configuration

### Backend API Integration

The frontend is configured to work with the Spring Boot backend. Update the API URL in the environment files:

- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

### Authentication

The application uses JWT tokens for authentication. The auth interceptor automatically adds the token to HTTP requests.

### Styling Customization

The application uses CSS custom properties for theming. You can customize the colors in `src/styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --primary-dark: #1d4ed8;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  /* ... more variables */
}
```

## Features in Detail

### Phone Number Integration
- **Signup Form**: Phone number field with international format validation
- **Profile Management**: Users can view and edit their phone number
- **Validation**: Supports international phone number formats with country codes
- **Format**: Accepts numbers like +1234567890, +44123456789, etc.
- **Backend Integration**: Phone number is stored and returned in JWT responses

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface elements
- Optimized for all screen sizes

### Performance Optimizations
- Lazy loading of routes
- OnPush change detection strategy
- Optimized bundle sizes
- Image optimization ready

### Security Features
- JWT token management
- Route guards for protected pages
- XSS protection through Angular's built-in sanitization
- CSRF protection ready

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast support

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/check-username/{username}` - Username availability
- `GET /api/auth/check-email/{email}` - Email availability

### Courses
- `GET /api/courses/list` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/search/{keyword}` - Search courses
- `GET /api/courses/category/{category}` - Get courses by category

### Enrollments
- `POST /api/enrollments/enroll` - Enroll in course
- `GET /api/enrollments/user` - Get user enrollments
- `PUT /api/enrollments/{id}/progress` - Update progress

### Tests
- `GET /api/tests/course/{courseId}/questions` - Get test questions
- `POST /api/tests/submit` - Submit test answers
- `GET /api/tests/user/results` - Get user test results

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Follow the Angular style guide
2. Use TypeScript strict mode
3. Write unit tests for new components
4. Follow the existing code structure
5. Update documentation for new features

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend is configured to allow requests from `http://localhost:4200`

2. **API Connection Issues**: Verify the backend API URL in environment files

3. **Authentication Issues**: Check if JWT tokens are being stored and sent correctly

4. **Styling Issues**: Ensure Bootstrap CSS is properly loaded

### Development Tips

- Use Angular DevTools browser extension for debugging
- Enable source maps for better debugging experience
- Use the Angular CLI for generating components and services
- Follow the reactive patterns with RxJS

## License

This project is part of the Learning Platform system. Please refer to the main project license for details.
