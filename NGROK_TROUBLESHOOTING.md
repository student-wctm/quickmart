# 🔧 ngrok Troubleshooting Guide

## 🎯 Quick Diagnosis

Run this command to test everything:
```powershell
powershell -ExecutionPolicy Bypass -File test-ngrok.ps1
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Site Loads but No Products

**Symptoms:**
- ngrok URL opens
- Blank page or loading spinner
- Products don't show up

**Root Cause:**
Frontend can't reach backend API through ngrok proxy

**Solution:**

1. **Restart Both Servers** with updated configs:
```powershell
# Stop all running services (Ctrl+C in each terminal)

# Then restart:
.\start-with-ngrok.bat
```

2. **Check Backend Logs** (Terminal 1):
Look for: `Server running in production mode on port 5000`

3. **Check Frontend Logs** (Terminal 2):
Look for: `Local:   http://localhost:5173/`

4. **Check Browser Console** on phone:
- Open the ngrok URL
- Look for error messages about API calls

---

### Issue 2: CORS Error

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. **Verify backend server.js has latest CORS config**:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fragment-unsubtle-simmering.ngrok-free.dev',
    /\.ngrok-free\.dev$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));
```

2. **Restart backend server**:
```powershell
cd backend
npm run dev
```

---

### Issue 3: Vite HMR Not Working

**Symptoms:**
- Page loads but hot reload doesn't work
- Need to manually refresh page for changes

**This is normal with ngrok!** HMR (Hot Module Replacement) doesn't work through ngrok tunnels.

**Workaround:**
- Develop locally on `http://localhost:5173`
- Only use ngrok URL for mobile testing

---

### Issue 4: "502 Bad Gateway"

**Symptoms:**
```
502 Bad Gateway
ngrok error
```

**Causes:**
1. Frontend server (port 5173) is not running
2. ngrok can't reach the server

**Solution:**
```powershell
# Check if frontend is running:
curl http://localhost:5173

# If not, start it:
cd frontend
npm run dev
```

---

### Issue 5: "Tunnel not found"

**Symptoms:**
```
Tunnel xyz.ngrok-free.dev not found
```

**Solution:**

1. **Check ngrok.yml has correct domain**:
```yaml
domain: fragment-unsubtle-simmering.ngrok-free.dev
```

2. **Verify authtoken is set**:
```powershell
ngrok config check
```

3. **Re-add authtoken if needed**:
```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

---

### Issue 6: API Calls Timing Out

**Symptoms:**
- Site loads
- Products load very slowly or timeout
- Console shows: `net::ERR_CONNECTION_TIMED_OUT`

**Solution:**

1. **Check if backend can receive external connections**:
```powershell
# Backend should listen on 0.0.0.0, not just localhost
# server.js should have:
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

2. **Check Windows Firewall**:
```powershell
# Allow Node.js through firewall
New-NetFirewallRule -DisplayName "Node.js Server" -Direction Inbound -Program "C:\Program Files\nodejs\node.exe" -Action Allow
```

3. **Verify ports are accessible**:
```powershell
# Test backend
curl http://localhost:5000/api/products

# Test frontend
curl http://localhost:5173
```

---

### Issue 7: "ngrok-skip-browser-warning" Error

**Symptoms:**
API calls fail with 403 error about browser warning

**Solution:**

Backend is updated to handle this. If you still see it, add this header to API calls:

```javascript
axios.get('/api/products', {
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});
```

---

## 🧪 Testing Checklist

Run through this checklist:

```powershell
# 1. Backend running?
curl http://localhost:5000
# Expected: {"message": "Quick-Commerce API is running..."}

# 2. Products API working?
curl http://localhost:5000/api/products
# Expected: JSON array of products

# 3. Frontend running?
curl http://localhost:5173
# Expected: HTML page

# 4. ngrok running?
curl http://localhost:4040/api/tunnels
# Expected: JSON with tunnel info

# 5. ngrok URL accessible?
curl https://fragment-unsubtle-simmering.ngrok-free.dev
# Expected: HTML page (your app)
```

---

## 📱 Mobile-Specific Issues

### Issue: Can't Access on Phone

**Check:**
1. Phone has internet connection (WiFi or mobile data)
2. Typed URL correctly (HTTPS, not HTTP)
3. ngrok tunnel is active on computer
4. Computer is not in sleep mode

### Issue: Slow Loading on Phone

**Normal!** ngrok adds latency:
- localhost: ~10ms
- ngrok: ~100-300ms

This is fine for testing, but for production, use cloud hosting.

---

## 🔍 Debug Mode

### Enable Verbose Logging

1. **Backend logs** (server.js has request logging):
```
2024-07-09T20:30:45.123Z - GET /api/products - Origin: https://fragment-unsubtle-simmering.ngrok-free.dev
```

2. **ngrok inspection**: Open http://localhost:4040
- See all HTTP requests
- View request/response headers
- Replay requests

3. **Browser DevTools on phone**:
- Android Chrome: `chrome://inspect`
- iOS Safari: Safari > Develop > [Your Phone]

---

## 🎯 Step-by-Step Reset

If nothing works, try this complete reset:

```powershell
# 1. Stop ALL services
taskkill /F /IM node.exe
taskkill /F /IM ngrok.exe

# 2. Wait 5 seconds
timeout /t 5

# 3. Clear port bindings
netstat -ano | findstr :5000
netstat -ano | findstr :5173
# If any processes found, kill them

# 4. Navigate to project
cd C:\Users\akhil\Desktop\blinkit2

# 5. Start everything fresh
.\start-with-ngrok.bat

# 6. Wait 30 seconds for all services to start
timeout /t 30

# 7. Test the URL
start https://fragment-unsubtle-simmering.ngrok-free.dev
```

---

## 📊 Expected Output

When everything is working, you should see:

**Terminal 1 (Backend):**
```
Server running in production mode on port 5000
Local: http://localhost:5000
Network: http://0.0.0.0:5000
MongoDB Connected: ac-h0tlzon-shard-00-01.d2otalv.mongodb.net
```

**Terminal 2 (Frontend):**
```
VITE v5.4.21  ready in 480 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

**Terminal 3 (ngrok):**
```
Session Status                online
Account                       [Your Name]
Version                       3.x.x
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://fragment-unsubtle-simmering.ngrok-free.dev -> http://localhost:5173
```

---

## 🆘 Still Not Working?

Try these commands to get diagnostic info:

```powershell
# Run full diagnostic
powershell -ExecutionPolicy Bypass -File test-ngrok.ps1

# Check what's running on ports
netstat -ano | findstr :5000
netstat -ano | findstr :5173
netstat -ano | findstr :4040

# View ngrok config
ngrok config check

# View current tunnels
curl http://localhost:4040/api/tunnels | ConvertFrom-Json

# Test backend directly
Invoke-RestMethod http://localhost:5000/api/products

# Test ngrok URL
Invoke-WebRequest https://fragment-unsubtle-simmering.ngrok-free.dev
```

---

## 💡 Pro Tips

1. **Always test locally first**: If `http://localhost:5173` doesn't work, ngrok won't either

2. **Check ngrok dashboard**: `http://localhost:4040` shows all requests in real-time

3. **Use browser DevTools**: Check Network tab for failed API calls

4. **Monitor backend logs**: Watch Terminal 1 for incoming requests

5. **Test incrementally**:
   - Backend works locally? ✅
   - Frontend works locally? ✅
   - ngrok tunnel active? ✅
   - Then test ngrok URL ✅

---

**Need more help?** Check the server logs in each terminal window for specific error messages.
