# 🔄 Restart Guide - Updated Configuration

## ⚠️ IMPORTANT: You Need to Restart!

I've updated the following files to fix the ngrok connection issue:

1. ✅ `backend/server.js` - Added better CORS, logging, and network binding
2. ✅ `frontend/vite.config.js` - Fixed HMR and host settings
3. ✅ `ngrok.yml` - Added host header configuration

**These changes require a full restart!**

---

## 🚀 How to Restart

### Step 1: Stop All Services

If services are running, **stop them** by:
- Closing all terminal windows, OR
- Press `Ctrl+C` in each terminal window

### Step 2: Restart Everything

**Option A: One-Click (Easiest)**
```powershell
# Just double-click:
start-with-ngrok.bat
```

**Option B: Manual**
```powershell
# Terminal 1 - Backend
cd C:\Users\akhil\Desktop\blinkit2\backend
npm run dev

# Terminal 2 - Frontend
cd C:\Users\akhil\Desktop\blinkit2\frontend
npm run dev

# Terminal 3 - ngrok
cd C:\Users\akhil\Desktop\blinkit2
ngrok start frontend --config ngrok.yml
```

### Step 3: Wait 30 Seconds

Let all services fully start up.

### Step 4: Test

Run the diagnostic script:
```powershell
powershell -ExecutionPolicy Bypass -File test-ngrok.ps1
```

---

## ✅ What Should You See

### Terminal 1 (Backend):
```
Server running in production mode on port 5000
Local: http://localhost:5000
Network: http://0.0.0.0:5000
MongoDB Connected: ac-h0tlzon...
```

### Terminal 2 (Frontend):
```
VITE v5.4.21  ready in 480 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

### Terminal 3 (ngrok):
```
Forwarding  https://fragment-unsubtle-simmering.ngrok-free.dev -> http://localhost:5173
```

---

## 📱 Test on Phone

1. Open browser on phone
2. Visit: `https://fragment-unsubtle-simmering.ngrok-free.dev`
3. Click "Visit Site" if ngrok warning appears
4. **Products should now load!** ✅

---

## 🔍 Debugging

If products still don't load:

1. **Check Backend Logs** (Terminal 1):
   - You should see requests coming in:
   ```
   2024-07-09T... - GET /api/products - Origin: https://fragment...
   ```

2. **Open ngrok Dashboard**:
   ```
   http://localhost:4040
   ```
   - Check if `/api/products` requests are coming through

3. **Check Phone Browser Console**:
   - Android Chrome: Connect USB → `chrome://inspect`
   - Look for any red error messages

4. **Test Direct API**:
   ```powershell
   curl http://localhost:5000/api/products
   ```
   Should return JSON with products

---

## 🎯 Key Changes Made

### backend/server.js:
- ✅ CORS now accepts ngrok domains
- ✅ Added request logging for debugging
- ✅ Listening on `0.0.0.0` (all interfaces)
- ✅ Added `ngrok-skip-browser-warning` header support

### frontend/vite.config.js:
- ✅ Host set to `0.0.0.0`
- ✅ HMR configured for HTTPS/ngrok
- ✅ Proxy settings improved

### ngrok.yml:
- ✅ Added `host_header` for proper routing

---

## ⚡ Quick Commands

```powershell
# Stop all services
taskkill /F /IM node.exe
taskkill /F /IM ngrok.exe

# Restart
.\start-with-ngrok.bat

# Test connection
powershell -ExecutionPolicy Bypass -File test-ngrok.ps1

# View logs
# Check Terminal windows
```

---

After restart, everything should work! 🎉
