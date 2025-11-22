@echo off
echo.
echo ========================================================================
echo   GROCERY MERN STORE - AUTOMATED GITHUB PUSH
echo ========================================================================
echo.
echo Your project is ready to push to GitHub!
echo.
echo STEP 1: Create GitHub Repository
echo ========================================================================
echo.
echo Please follow these quick steps:
echo.
echo 1. The browser window should already be open at GitHub
echo    (if not, go to: https://github.com/new)
echo.
echo 2. Log in to GitHub if you haven't already
echo.
echo 3. Fill in the repository details:
echo    - Repository name: grocery-mern-store
echo    - Description: Full-stack MERN grocery e-commerce application
echo    - Make it Public or Private (your choice)
echo    - DO NOT add README, .gitignore, or license
echo.
echo 4. Click "Create repository"
echo.
echo 5. Copy the repository URL (it will look like):
echo    https://github.com/YOUR-USERNAME/grocery-mern-store.git
echo.
echo ========================================================================
echo.
set /p REPO_URL="Paste your GitHub repository URL here and press Enter: "
echo.
echo ========================================================================
echo STEP 2: Pushing to GitHub
echo ========================================================================
echo.
echo Repository URL: %REPO_URL%
echo.
echo Adding remote repository...
git remote add origin %REPO_URL% 2>nul
if %errorlevel% neq 0 (
    echo Remote already exists, updating...
    git remote set-url origin %REPO_URL%
)

echo.
echo Setting branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================================
    echo   SUCCESS! Your project is now on GitHub!
    echo ========================================================================
    echo.
    echo Repository URL: %REPO_URL%
    echo.
    echo You can view your project at:
    echo https://github.com/YOUR-USERNAME/grocery-mern-store
    echo.
    echo Next steps:
    echo - Share your repository with others
    echo - Add collaborators if needed
    echo - Set up GitHub Actions for CI/CD (optional)
    echo.
) else (
    echo.
    echo ========================================================================
    echo   AUTHENTICATION REQUIRED
    echo ========================================================================
    echo.
    echo GitHub is asking for authentication.
    echo.
    echo If you have 2FA enabled, you need a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token" (classic)
    echo 3. Give it a name: "Grocery MERN Push"
    echo 4. Select scopes: repo (full control)
    echo 5. Click "Generate token"
    echo 6. Copy the token and use it as your password
    echo.
    echo Then run this command:
    echo git push -u origin main
    echo.
)

echo.
pause
