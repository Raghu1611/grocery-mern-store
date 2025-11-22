@echo off
echo.
echo =================================================================
echo VERIFYING FILES TO BE COMMITTED
echo =================================================================
echo.

cd /d c:\Users\DHANUNJAI\grocery-mern

echo Checking git repository status...
echo.

git add .

echo.
echo Files that will be committed:
echo -----------------------------------------------------------------
git status --short
echo.

echo.
echo =================================================================
echo IMPORTANT: Review the list above and verify that:
echo =================================================================
echo [✓] NO .env files are listed
echo [✓] NO .log files are listed  
echo [✓] NO .txt files are listed
echo [✓] NO node_modules folders are listed
echo.
echo If you see any sensitive files, press Ctrl+C to cancel.
echo Otherwise, press any key to continue with commit...
echo =================================================================
pause

echo.
echo Committing files...
git commit -m "Initial commit - MERN Grocery Store project"

echo.
echo =================================================================
echo Commit completed!
echo =================================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Create a repository on GitHub
echo 2. Run this command (replace with your GitHub URL):
echo    git remote add origin https://github.com/YOUR-USERNAME/grocery-mern.git
echo.
echo 3. Run these commands:
echo    git branch -M main
echo    git push -u origin main
echo.
echo See GITHUB_PUSH_GUIDE.md for detailed instructions.
echo =================================================================
pause
