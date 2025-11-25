@echo off
echo Starting Grocery MERN App...

start cmd /k "cd backend && npm start"
start cmd /k "cd frontend && npm run dev"

echo Backend and Frontend servers are starting in separate windows.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 (or similar)
pause
