@echo off
echo ========================================
echo Git Repository Status Check
echo ========================================
echo.

REM Check if git is initialized
echo Checking git repository...
git rev-parse --is-inside-work-tree
if %errorlevel% neq 0 (
    echo Git repository not initialized!
    echo Initializing git repository...
    git init
)

echo.
echo ========================================
echo Checking Repository Status
echo ========================================
git status

echo.
echo ========================================
echo Adding files to git...
echo ========================================
git add .

echo.
echo ========================================
echo Current Status After Adding Files
echo ========================================
git status

echo.
echo ========================================
echo Ready to commit and push!
echo ========================================
echo.
echo Please run the following commands manually:
echo.
echo 1. git commit -m "Initial commit - MERN Grocery Store project"
echo 2. git remote add origin YOUR_GITHUB_REPO_URL
echo 3. git branch -M main
echo 4. git push -u origin main
echo.
echo Note: Replace YOUR_GITHUB_REPO_URL with your actual GitHub repository URL
echo.
pause
