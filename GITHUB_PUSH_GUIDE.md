=================================================================
📋 STEP-BY-STEP GUIDE TO PUSH YOUR PROJECT TO GITHUB
=================================================================

IMPORTANT: All .txt, .log, .env files, and node_modules are now 
excluded via .gitignore. Only necessary project files will be pushed.

=================================================================
STEP 1: CREATE A NEW REPOSITORY ON GITHUB
=================================================================

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Click "New repository"
4. Name it: grocery-mern (or any name you prefer)
5. Choose Public or Private
6. DO NOT initialize with README, .gitignore, or license
7. Click "Create repository"
8. Copy the repository URL (it will look like: 
   https://github.com/YOUR-USERNAME/grocery-mern.git)

=================================================================
STEP 2: RUN THESE COMMANDS IN YOUR TERMINAL
=================================================================

Open PowerShell or Command Prompt and navigate to your project:

cd c:\Users\DHANUNJAI\grocery-mern

Then run these commands ONE BY ONE:

------- Command 1: Add all files -------
git add .

------- Command 2: Check what will be committed -------
git status

REVIEW THE OUTPUT! Make sure:
✓ No .env files are listed
✓ No .log files are listed  
✓ No .txt files are listed
✓ No node_modules folders are listed

------- Command 3: Commit the files -------
git commit -m "Initial commit - MERN Grocery Store project"

------- Command 4: Add your GitHub repository as remote -------
git remote add origin YOUR_GITHUB_REPO_URL

REPLACE "YOUR_GITHUB_REPO_URL" with the URL you copied from GitHub!
Example:
git remote add origin https://github.com/yourusername/grocery-mern.git

------- Command 5: Rename branch to main -------
git branch -M main

------- Command 6: Push to GitHub -------
git push -u origin main

If prompted, enter your GitHub username and password.
Note: For password, use a Personal Access Token if you have 2FA enabled.

=================================================================
STEP 3: VERIFY ON GITHUB
=================================================================

1. Go to your GitHub repository in your browser
2. Refresh the page
3. You should see all your project files!

Check that sensitive files are NOT there:
- backend/.env should NOT be visible
- .log files should NOT be visible
- .txt debug files should NOT be visible
- node_modules folders should NOT be visible

But these SHOULD be visible:
- backend/.env.example ✓
- README.md ✓
- frontend/ and backend/ source code ✓
- package.json files ✓

=================================================================
FILES THAT WILL BE PUSHED (IMPORTANT FILES):
=================================================================

✓ backend/src/ - All source code
✓ backend/package.json
✓ backend/.env.example (template for environment variables)
✓ backend/seed.js
✓ frontend/src/ - All source code  
✓ frontend/package.json
✓ frontend/index.html
✓ frontend/vite.config.js
✓ frontend/tailwind.config.js
✓ .gitignore
✓ README.md
✓ start-backend.bat
✓ start-frontend.bat

=================================================================
FILES THAT WILL BE EXCLUDED (GITIGNORE):
=================================================================

✗ All .env files (contains secrets)
✗ All .log files
✗ All .txt files  
✗ All node_modules/ folders
✗ All package-lock.json files
✗ backend/test-gmail-smtp.js
✗ frontend/dist/ and build/ folders

=================================================================
TROUBLESHOOTING
=================================================================

ERROR: "fatal: not a git repository"
SOLUTION: Run this first: git init

ERROR: "failed to push some refs"
SOLUTION: Try: git pull origin main --rebase
          Then: git push -u origin main

ERROR: Authentication failed
SOLUTION: Use a Personal Access Token instead of password
          Generate at: https://github.com/settings/tokens

=================================================================
