@echo off
echo Setting up Flosendo Website...
echo.

echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing root dependencies. Please make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies.
    pause
    exit /b 1
)
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies.
    pause
    exit /b 1
)
cd ..

echo.
echo Setup complete! You can now run:
echo   npm run dev    - Start development server
echo   npm start      - Start production server
echo.
pause
