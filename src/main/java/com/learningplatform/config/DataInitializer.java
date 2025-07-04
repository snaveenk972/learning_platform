package com.learningplatform.config;

import com.learningplatform.model.Course;
import com.learningplatform.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Data initialization component for populating sample courses
 * Ensures the application has demo data for testing and demonstration
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if courses already exist
        if (courseRepository.count() == 0) {
            initializeSampleCourses();
        }
    }
    
    private void initializeSampleCourses() {
        // Programming Courses
        Course java = new Course(
            "Java Programming Fundamentals",
            "Learn the basics of Java programming including object-oriented programming, data structures, and algorithms. Perfect for beginners starting their programming journey.",
            40,
            "BEGINNER",
            "Programming",
            "Dr. Sarah Johnson"
        );
        
        Course python = new Course(
            "Python for Data Science",
            "Comprehensive Python course covering data analysis, visualization, and machine learning with popular libraries like pandas, matplotlib, and scikit-learn.",
            35,
            "INTERMEDIATE",
            "Programming",
            "Prof. Michael Chen"
        );
        
        Course javascript = new Course(
            "Modern JavaScript and Web Development",
            "Master modern JavaScript ES6+, async programming, DOM manipulation, and build dynamic web applications with real-world projects.",
            45,
            "INTERMEDIATE",
            "Programming",
            "Alex Rodriguez"
        );
        
        Course react = new Course(
            "React.js Complete Guide",
            "Build powerful, interactive web applications using React.js. Learn components, hooks, state management, and deployment strategies.",
            50,
            "ADVANCED",
            "Programming",
            "Emma Wilson"
        );
        
        // Data Science Courses
        Course dataAnalytics = new Course(
            "Data Analytics with SQL",
            "Master SQL for data analysis, database design, and complex query optimization. Learn to extract meaningful insights from large datasets.",
            30,
            "BEGINNER",
            "Data Science",
            "Dr. Robert Kim"
        );
        
        Course machineLearning = new Course(
            "Machine Learning Fundamentals",
            "Introduction to machine learning algorithms, supervised and unsupervised learning, model evaluation, and practical implementation.",
            60,
            "ADVANCED",
            "Data Science",
            "Dr. Lisa Zhang"
        );
        
        // Business Courses
        Course digitalMarketing = new Course(
            "Digital Marketing Strategy",
            "Learn comprehensive digital marketing strategies including SEO, social media marketing, content marketing, and analytics.",
            25,
            "BEGINNER",
            "Business",
            "Mark Thompson"
        );
        
        Course projectManagement = new Course(
            "Agile Project Management",
            "Master Agile methodologies, Scrum framework, and project management best practices for delivering successful projects.",
            35,
            "INTERMEDIATE",
            "Business",
            "Jennifer Davis"
        );
        
        // Design Courses
        Course uiux = new Course(
            "UI/UX Design Principles",
            "Learn user interface and user experience design principles, wireframing, prototyping, and user-centered design methodologies.",
            40,
            "BEGINNER",
            "Design",
            "David Miller"
        );
        
        Course graphicDesign = new Course(
            "Advanced Graphic Design",
            "Master advanced graphic design techniques, typography, color theory, and brand identity development using industry-standard tools.",
            45,
            "ADVANCED",
            "Design",
            "Sophie Brown"
        );
        
        // Technology Courses
        Course cloudComputing = new Course(
            "Cloud Computing with AWS",
            "Learn cloud computing fundamentals with Amazon Web Services. Cover EC2, S3, RDS, and cloud architecture best practices.",
            55,
            "INTERMEDIATE",
            "Technology",
            "James Anderson"
        );
        
        Course cybersecurity = new Course(
            "Cybersecurity Fundamentals",
            "Understand cybersecurity principles, threat assessment, network security, encryption, and security incident response.",
            40,
            "INTERMEDIATE",
            "Technology",
            "Dr. Amanda Taylor"
        );
        
        // Save all courses
        courseRepository.save(java);
        courseRepository.save(python);
        courseRepository.save(javascript);
        courseRepository.save(react);
        courseRepository.save(dataAnalytics);
        courseRepository.save(machineLearning);
        courseRepository.save(digitalMarketing);
        courseRepository.save(projectManagement);
        courseRepository.save(uiux);
        courseRepository.save(graphicDesign);
        courseRepository.save(cloudComputing);
        courseRepository.save(cybersecurity);
        
        System.out.println("Sample courses initialized successfully!");
    }
}
