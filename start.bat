@echo off

echo ===============================
echo Starting Battleship Application
echo ===============================

echo.
echo Starting backend...
start "Backend" cmd /k "cd /d server && npm install && npm start"

timeout /t 3 >nul

echo.
echo Starting frontend...
start "Frontend" cmd /k "cd /d client && npm install && npm run dev"

timeout /t 3 >nul

start http://localhost:5173

echo.
echo Battleship started!
pause