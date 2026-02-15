@echo off
echo.
echo ================================================
echo NouNou V2 - React + Vite + Three.js Setup
echo ================================================
echo.

if not exist "node_modules" (
    echo Downloading dependencies... This may take a minute.
    call npm install
) else (
    echo Dependencies already installed.
)

echo.
echo Starting development server...
echo.
echo Open your browser at: http://localhost:5173
echo.
pause

call npm run dev
pause
