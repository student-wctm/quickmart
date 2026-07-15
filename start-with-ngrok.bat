@echo off
echo ========================================
echo   QuickMart - Starting with ngrok
echo ========================================
echo.

REM Check if ngrok is installed
where ngrok >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] ngrok is not installed!
    echo Please install ngrok from: https://ngrok.com/download
    echo.
    pause
    exit /b 1
)

echo [1/4] Starting Backend Server...
start "QuickMart Backend" cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak >nul

echo [2/4] Starting Frontend Server...
start "QuickMart Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo [3/4] Starting ngrok tunnel...
echo Connecting to: fragment-unsubtle-simmering.ngrok-free.dev
start "ngrok Tunnel" cmd /k "ngrok start frontend --config ngrok.yml"
timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   All Services Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Public:   https://fragment-unsubtle-simmering.ngrok-free.dev
echo.
echo Your app is now accessible from ANY device at:
echo https://fragment-unsubtle-simmering.ngrok-free.dev
echo.
echo Press any key to open the local frontend...
pause >nul
start http://localhost:5173
