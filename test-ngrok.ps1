# ngrok Connection Test Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   ngrok Connection Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Backend Server
Write-Host "[Test 1] Testing Backend Server..." -ForegroundColor Yellow
try {
    $backend = Invoke-RestMethod -Uri "http://localhost:5000" -TimeoutSec 5
    Write-Host "✅ Backend is running: $($backend.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend is NOT running on port 5000" -ForegroundColor Red
    Write-Host "   Please start: cd backend && npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Test 2: Frontend Server
Write-Host "[Test 2] Testing Frontend Server..." -ForegroundColor Yellow
try {
    $frontend = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✅ Frontend is running (Status: $($frontend.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Frontend is NOT running on port 5173" -ForegroundColor Red
    Write-Host "   Please start: cd frontend && npm run dev" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Backend API
Write-Host "[Test 3] Testing Backend API (Products)..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -TimeoutSec 5
    $count = $products.Count
    Write-Host "✅ API is working: Found $count products" -ForegroundColor Green
} catch {
    Write-Host "❌ API is NOT responding" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: ngrok Tunnel
Write-Host "[Test 4] Testing ngrok Tunnel..." -ForegroundColor Yellow
try {
    $tunnels = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -TimeoutSec 5
    if ($tunnels.tunnels.Count -gt 0) {
        Write-Host "✅ ngrok is running" -ForegroundColor Green
        foreach ($tunnel in $tunnels.tunnels) {
            Write-Host "   $($tunnel.name): $($tunnel.public_url)" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️  ngrok is running but no tunnels found" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ ngrok is NOT running" -ForegroundColor Red
    Write-Host "   Please start: ngrok start frontend --config ngrok.yml" -ForegroundColor Yellow
}

Write-Host ""

# Test 5: Test ngrok URL
Write-Host "[Test 5] Testing ngrok Public URL..." -ForegroundColor Yellow
$ngrokUrl = "https://fragment-unsubtle-simmering.ngrok-free.dev"
Write-Host "Attempting to connect to: $ngrokUrl" -ForegroundColor Gray
try {
    $response = Invoke-WebRequest -Uri $ngrokUrl -TimeoutSec 10 -UseBasicParsing
    Write-Host "✅ ngrok URL is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Cannot reach ngrok URL" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Possible issues:" -ForegroundColor Yellow
    Write-Host "   1. ngrok tunnel not started" -ForegroundColor White
    Write-Host "   2. Domain not correctly configured in ngrok.yml" -ForegroundColor White
    Write-Host "   3. Authtoken not set in ngrok" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Test Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If all tests pass, your app should work on:" -ForegroundColor White
Write-Host "$ngrokUrl" -ForegroundColor Green
Write-Host ""
Write-Host "To view ngrok dashboard, visit: http://localhost:4040" -ForegroundColor Cyan
Write-Host ""
