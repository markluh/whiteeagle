@echo off
REM White Eagle Full Stack Setup Script for Windows
REM This script sets up both frontend and backend

echo ==========================================
echo White Eagle - Full Stack Setup
echo ==========================================

REM Frontend setup
echo.
echo Setting up Frontend...
call npm install

REM Create frontend env file if it doesn't exist
if not exist .env.local (
    echo Creating .env.local for frontend...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env.local
)

REM Backend setup
echo.
echo Setting up Backend...
cd server

call npm install

REM Create backend env file if it doesn't exist
if not exist .env.local (
    echo Creating .env.local for backend...
    (
        echo PORT=5000
        echo GEMINI_API_KEY=your_gemini_api_key_here
        echo NODE_ENV=development
        echo ADMIN_PASSWORD=admin123
    ) > .env.local
    echo.
    echo WARNING: Edit server\.env.local and add your GEMINI_API_KEY
)

cd ..

echo.
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo To start the application:
echo.
echo Terminal 1 - Backend:
echo   cd server
echo   npm run dev
echo.
echo Terminal 2 - Frontend:
echo   npm run dev
echo.
echo The app will be available at http://localhost:5173
echo The API will be at http://localhost:5000/api
echo.
pause
