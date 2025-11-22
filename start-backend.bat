@echo off
title Grocery App - Backend Server
color 0A
cd /d "%~dp0backend"
echo.
echo ========================================
echo   GROCERY APP - BACKEND SERVER
echo ========================================
echo.
echo Starting server on port 5000...
echo.
node src/server.js
echo.
echo Server stopped. Press any key to close...
pause >nul
