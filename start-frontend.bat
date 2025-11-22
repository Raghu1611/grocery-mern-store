@echo off
title Grocery App - Frontend Server
color 0B
cd /d "%~dp0frontend"
echo.
echo ========================================
echo   GROCERY APP - FRONTEND SERVER
echo ========================================
echo.
echo Starting Vite dev server...
echo.
npm run dev
echo.
echo Server stopped. Press any key to close...
pause >nul
