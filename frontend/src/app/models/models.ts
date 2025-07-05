export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profilePicture?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedinProfile?: string;
  githubProfile?: string;
  totalCoursesCompleted: number;
  totalTestsCompleted: number;
  averageTestScore: number;
  registrationDate: string;
  lastLoginDate?: string;
  isActive: boolean;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface JwtResponse {
  accessToken: string;
  token?: string; // Support both for compatibility
  tokenType: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface MessageResponse {
  message: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedDuration: number;
  price: number;
  imageUrl?: string;
  instructorName: string;
  rating: number;
  totalRatings: number;
  totalEnrollments: number;
  isActive: boolean;
  createdDate: string;
  lastUpdatedDate: string;
  prerequisites?: string;
  learningOutcomes?: string;
  syllabus?: string;
}

export interface TestSubmissionRequest {
  courseId: number;
  answers: { [questionId: number]: string };
}

export interface TestResult {
  id: number;
  userId: number;
  courseId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  completionTime: number;
  submissionDate: string;
  passed: boolean;
}

export interface EnrollmentRequest {
  courseIds?: number[]; // Backend expects array of course IDs
  courseId?: number; // For backward compatibility
}

export interface Enrollment {
  id: number;
  userId?: number; // For compatibility
  courseId?: number; // For compatibility  
  user?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  };
  course?: {
    id: number;
    title: string;
    description: string;
    durationHours: number;
    difficultyLevel: string;
    category: string;
    instructorName: string;
    isActive: boolean;
  };
  enrollmentDate?: string; // For compatibility
  enrolledAt: string;
  completionDate?: string; // For compatibility
  completedAt?: string;
  status: 'LEARNING' | 'COMPLETED' | 'DROPPED';
  progress?: number; // For compatibility
  progressPercentage: number;
  updatedAt: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  explanation?: string;
  difficultyLevel?: string;
  points?: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}
