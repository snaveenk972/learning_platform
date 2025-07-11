@echo off
echo Starting Learning Platform Frontend...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
echo Frontend will be available at: http://localhost:4200
echo.
echo Press Ctrl+C to stop the server
echo.

npm start
