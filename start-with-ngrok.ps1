# QuickMart - Start with ngrok (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   QuickMart - Starting with ngrok" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if ngrok is installed
$ngrokInstalled = Get-Command ngrok -ErrorAction SilentlyContinue
if (-not $ngrokInstalled) {
    Write-Host "[ERROR] ngrok is not installed!" -ForegroundColor Red
    Write-Host "Please install ngrok from: https://ngrok.com/download" -ForegroundColor Yellow
    Write-Host "Or install via Chocolatey: choco install ngrok" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "[1/4] Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Normal

Write-Host "Waiting for backend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 5

Write-Host "[2/4] Starting Frontend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev" -WindowStyle Normal

Write-Host "Waiting for frontend to start..." -ForegroundColor Gray
Start-Sleep -Seconds 5

Write-Host "[3/4] Starting ngrok tunnel..." -ForegroundColor Yellow
Write-Host "Connecting to: fragment-unsubtle-simmering.ngrok-free.dev" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; ngrok start frontend --config ngrok.yml" -WindowStyle Normal

Write-Host "Waiting for ngrok to connect..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   All Services Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5173" -ForegroundColor Yellow
Write-Host "Public:   " -NoNewline -ForegroundColor White
Write-Host "https://fragment-unsubtle-simmering.ngrok-free.dev" -ForegroundColor Green
Write-Host ""
Write-Host "Your app is now accessible from ANY device at:" -ForegroundColor Cyan
Write-Host "https://fragment-unsubtle-simmering.ngrok-free.dev" -ForegroundColor Green -BackgroundColor Black
Write-Host ""
Write-Host "Press any key to open the local frontend..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Start-Process "http://localhost:5173"
