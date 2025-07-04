@echo off
echo Starting Learning Platform Backend Application
echo ============================================

echo.
echo Building the application...
call mvn clean install -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo Build failed! Please check the errors above.
    pause
    exit /b 1
)

echo.
echo Build successful! Starting the application...
echo.
echo The application will be available at:
echo - Main API: http://localhost:8080/api
echo - H2 Database Console: http://localhost:8080/api/h2-console
echo.
echo Sample endpoints to test:
echo - GET /api/courses/list (Get all courses)
echo - POST /api/auth/signup (Register new user)
echo - POST /api/auth/signin (User login)
echo.
echo Press Ctrl+C to stop the application
echo.

call mvn spring-boot:run
