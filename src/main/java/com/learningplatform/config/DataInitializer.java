package com.learningplatform.config;

import com.learningplatform.model.Course;
import com.learningplatform.model.Question;
import com.learningplatform.repository.CourseRepository;
import com.learningplatform.repository.QuestionRepository;
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
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Check if courses already exist
        if (courseRepository.count() == 0) {
            initializeSampleCourses();
        }
        
        // Check if questions already exist
        if (questionRepository.count() == 0) {
            initializeSampleQuestions();
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
    
    private void initializeSampleQuestions() {
        // Get all courses from the database
        var courses = courseRepository.findAll();
        
        // Create 5 questions for each course
        for (Course course : courses) {
            createQuestionsForCourse(course);
        }
        
        System.out.println("Sample questions initialized successfully!");
    }
    
    private void createQuestionsForCourse(Course course) {
        switch (course.getTitle()) {
            case "Java Programming Fundamentals":
                createJavaQuestions(course);
                break;
            case "Python for Data Science":
                createPythonQuestions(course);
                break;
            case "Modern JavaScript and Web Development":
                createJavaScriptQuestions(course);
                break;
            case "React.js Frontend Development":
                createReactQuestions(course);
                break;
            case "Node.js Backend Development":
                createNodeQuestions(course);
                break;
            case "Machine Learning with Python":
                createMLQuestions(course);
                break;
            case "Database Design and SQL":
                createSQLQuestions(course);
                break;
            case "DevOps and CI/CD Pipelines":
                createDevOpsQuestions(course);
                break;
            case "Mobile App Development with Flutter":
                createFlutterQuestions(course);
                break;
            case "UI/UX Design Principles":
                createUIUXQuestions(course);
                break;
            case "Graphic Design Fundamentals":
                createGraphicDesignQuestions(course);
                break;
            case "Cloud Computing with AWS":
                createAWSQuestions(course);
                break;
            case "Cybersecurity Fundamentals":
                createCybersecurityQuestions(course);
                break;
            default:
                createGenericQuestions(course);
                break;
        }
    }
    
    private void createJavaQuestions(Course course) {
        questionRepository.save(new Question(course,
            "What is the main purpose of the 'public static void main(String[] args)' method in Java?",
            "It's the entry point of a Java application",
            "It creates new objects",
            "It handles exceptions",
            "It connects to databases",
            "A",
            "The main method is the entry point where the JVM starts executing the program."));
            
        questionRepository.save(new Question(course,
            "Which of the following is NOT a primitive data type in Java?",
            "int",
            "String",
            "boolean",
            "double",
            "B",
            "String is a class in Java, not a primitive data type. Primitive types include int, boolean, double, char, etc."));
            
        questionRepository.save(new Question(course,
            "What does OOP stand for in Java programming?",
            "Object-Oriented Programming",
            "Optimized Online Processing",
            "Open Operations Protocol",
            "Organized Object Principles",
            "A",
            "OOP stands for Object-Oriented Programming, which is a programming paradigm based on objects and classes."));
            
        questionRepository.save(new Question(course,
            "Which keyword is used to inherit a class in Java?",
            "implements",
            "extends",
            "inherits",
            "super",
            "B",
            "The 'extends' keyword is used for class inheritance in Java."));
            
        questionRepository.save(new Question(course,
            "What will happen if you try to access an array element beyond its length?",
            "The program will return null",
            "The program will return 0",
            "ArrayIndexOutOfBoundsException will be thrown",
            "The program will automatically resize the array",
            "C",
            "Accessing an array beyond its bounds throws an ArrayIndexOutOfBoundsException."));
    }
    
    private void createPythonQuestions(Course course) {
        questionRepository.save(new Question(course,
            "Which library is commonly used for data manipulation in Python?",
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Scikit-learn",
            "B",
            "Pandas is the most popular library for data manipulation and analysis in Python."));
            
        questionRepository.save(new Question(course,
            "What does the 'print()' function do in Python?",
            "Prints documents",
            "Displays output to the console",
            "Creates variables",
            "Reads files",
            "B",
            "The print() function displays output to the console/terminal."));
            
        questionRepository.save(new Question(course,
            "Which of the following is used to create virtual environments in Python?",
            "pip",
            "conda",
            "venv",
            "All of the above",
            "D",
            "pip, conda, and venv can all be used to create virtual environments in Python."));
            
        questionRepository.save(new Question(course,
            "What is the correct way to import the pandas library?",
            "import pandas",
            "import pandas as pd",
            "from pandas import *",
            "All of the above are correct",
            "D",
            "All three methods are syntactically correct ways to import pandas, though 'import pandas as pd' is most common."));
            
        questionRepository.save(new Question(course,
            "Which method is used to read a CSV file using pandas?",
            "pd.read_csv()",
            "pd.load_csv()",
            "pd.import_csv()",
            "pd.get_csv()",
            "A",
            "pd.read_csv() is the standard method to read CSV files in pandas."));
    }
    
    private void createJavaScriptQuestions(Course course) {
        questionRepository.save(new Question(course,
            "What does 'DOM' stand for in web development?",
            "Data Object Model",
            "Document Object Model",
            "Dynamic Object Management",
            "Database Operation Method",
            "B",
            "DOM stands for Document Object Model, which represents the structure of HTML documents."));
            
        questionRepository.save(new Question(course,
            "Which method adds an element to the end of an array?",
            "push()",
            "pop()",
            "shift()",
            "unshift()",
            "A",
            "The push() method adds one or more elements to the end of an array."));
            
        questionRepository.save(new Question(course,
            "What is the difference between '==' and '===' in JavaScript?",
            "No difference",
            "'==' checks value only, '===' checks value and type",
            "'===' checks value only, '==' checks value and type",
            "Both are deprecated",
            "B",
            "'==' performs type coercion and compares values, while '===' compares both value and type strictly."));
            
        questionRepository.save(new Question(course,
            "Which keyword is used to declare a constant in ES6?",
            "var",
            "let",
            "const",
            "final",
            "C",
            "The 'const' keyword is used to declare constants in ES6 JavaScript."));
            
        questionRepository.save(new Question(course,
            "What does 'async/await' do in JavaScript?",
            "Creates loops",
            "Handles asynchronous operations",
            "Defines classes",
            "Manages memory",
            "B",
            "async/await is used to handle asynchronous operations in a more readable way than callbacks or promises."));
    }
    
    private void createReactQuestions(Course course) {
        questionRepository.save(new Question(course,
            "What is JSX in React?",
            "A new programming language",
            "JavaScript XML - a syntax extension",
            "A database query language",
            "A CSS framework",
            "B",
            "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript."));
            
        questionRepository.save(new Question(course,
            "Which hook is used to manage state in functional components?",
            "useEffect",
            "useState",
            "useContext",
            "useReducer",
            "B",
            "useState is the primary hook for managing state in React functional components."));
            
        questionRepository.save(new Question(course,
            "What is the purpose of the useEffect hook?",
            "To handle side effects",
            "To create components",
            "To manage routing",
            "To style components",
            "A",
            "useEffect is used to handle side effects like API calls, subscriptions, and manual DOM updates."));
            
        questionRepository.save(new Question(course,
            "How do you pass data from parent to child component?",
            "Through state",
            "Through props",
            "Through context",
            "Through refs",
            "B",
            "Props are used to pass data from parent components to child components."));
            
        questionRepository.save(new Question(course,
            "What is the virtual DOM?",
            "A physical representation of the DOM",
            "A JavaScript representation of the real DOM",
            "A database for storing DOM elements",
            "A CSS framework",
            "B",
            "The virtual DOM is a JavaScript representation of the real DOM that React uses for efficient updates."));
    }
    
    private void createNodeQuestions(Course course) {
        questionRepository.save(new Question(course,
            "What is Node.js?",
            "A front-end framework",
            "A JavaScript runtime for server-side development",
            "A database management system",
            "A CSS preprocessor",
            "B",
            "Node.js is a JavaScript runtime built on Chrome's V8 engine for server-side development."));
            
        questionRepository.save(new Question(course,
            "Which of the following is the package manager for Node.js?",
            "npm",
            "yarn",
            "pnpm",
            "All of the above",
            "D",
            "npm, yarn, and pnpm are all package managers that can be used with Node.js."));
            
        questionRepository.save(new Question(course,
            "What does 'npm init' do?",
            "Installs Node.js",
            "Creates a new package.json file",
            "Starts the Node.js server",
            "Updates all packages",
            "B",
            "npm init creates a new package.json file for your Node.js project."));
            
        questionRepository.save(new Question(course,
            "Which module is used to create HTTP servers in Node.js?",
            "fs",
            "path",
            "http",
            "url",
            "C",
            "The 'http' module is used to create HTTP servers and clients in Node.js."));
            
        questionRepository.save(new Question(course,
            "What is Express.js?",
            "A Node.js web application framework",
            "A database",
            "A front-end library",
            "A testing framework",
            "A",
            "Express.js is a minimal and flexible Node.js web application framework."));
    }
    
    private void createGenericQuestions(Course course) {
        questionRepository.save(new Question(course,
            "What is the primary focus of this course?",
            "Learning fundamental concepts",
            "Advanced programming techniques",
            "Database management",
            "Network security",
            "A",
            "This course focuses on learning fundamental concepts in the subject area."));
            
        questionRepository.save(new Question(course,
            "Which skill level is this course designed for?",
            "Expert level",
            course.getDifficultyLevel(),
            "PhD level",
            "Professional certification",
            "B",
            "This course is designed for " + course.getDifficultyLevel().toLowerCase() + " level learners."));
            
        questionRepository.save(new Question(course,
            "What is the estimated duration for this course?",
            course.getDurationHours() + " hours",
            "100 hours",
            "200 hours",
            "500 hours",
            "A",
            "The estimated duration for this course is " + course.getDurationHours() + " hours."));
            
        questionRepository.save(new Question(course,
            "Who is the instructor for this course?",
            "John Doe",
            course.getInstructorName(),
            "Jane Smith",
            "Unknown",
            "B",
            "The instructor for this course is " + course.getInstructorName() + "."));
            
        questionRepository.save(new Question(course,
            "What category does this course belong to?",
            "General",
            course.getCategory(),
            "Miscellaneous",
            "Other",
            "B",
            "This course belongs to the " + course.getCategory() + " category."));
    }
    
    // Create similar question methods for other courses...
    private void createMLQuestions(Course course) { createGenericQuestions(course); }
    private void createSQLQuestions(Course course) { createGenericQuestions(course); }
    private void createDevOpsQuestions(Course course) { createGenericQuestions(course); }
    private void createFlutterQuestions(Course course) { createGenericQuestions(course); }
    private void createUIUXQuestions(Course course) { createGenericQuestions(course); }
    private void createGraphicDesignQuestions(Course course) { createGenericQuestions(course); }
    private void createAWSQuestions(Course course) { createGenericQuestions(course); }
    private void createCybersecurityQuestions(Course course) { createGenericQuestions(course); }
}
