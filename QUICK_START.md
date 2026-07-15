# ⚡ Quick Start - 3 Steps to Access from Phone

## 🎯 Goal
Access your app on phone using: **https://fragment-unsubtle-simmering.ngrok-free.dev**

---

## 📋 One-Time Setup (5 minutes)

### Step 1: Install ngrok
Download from: https://ngrok.com/download
Extract to: `C:\ngrok\` (or anywhere)

### Step 2: Get Authtoken
1. Go to: https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy your token
3. Run in PowerShell:
```powershell
ngrok config add-authtoken YOUR_TOKEN_HERE
```

### Step 3: Update Project Config
Open `ngrok.yml` in project folder and paste your token:
```yaml
authtoken: YOUR_TOKEN_HERE
```

---

## 🚀 Starting the App (Every Time)

### Option 1: Automatic (Easiest)
**Double-click:** `start-with-ngrok.bat`

### Option 2: Manual
Open 3 terminals and run:
```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev

# Terminal 3
ngrok start frontend --config ngrok.yml
```

---

## 📱 Access from Phone

1. Ensure your computer is running the app
2. On your phone, open browser and visit:
   ```
   https://fragment-unsubtle-simmering.ngrok-free.dev
   ```
3. Click "Visit Site" if ngrok warning appears
4. Your app loads! 🎉

---

## 🎯 URLs Summary

| Device | URL |
|--------|-----|
| Your Computer | http://localhost:5173 |
| Any Phone | https://fragment-unsubtle-simmering.ngrok-free.dev |
| ngrok Dashboard | http://localhost:4040 |

---

## ❓ Issues?

**App not loading?**
- Check all 3 services are running (backend, frontend, ngrok)
- Visit: http://localhost:4040 to see ngrok status

**ngrok not found?**
```powershell
# Run from full path
C:\ngrok\ngrok.exe start frontend --config ngrok.yml
```

**Domain in use?**
```powershell
# Kill existing ngrok
taskkill /F /IM ngrok.exe
# Then start again
```

---

## 🎉 That's It!

Your app is now accessible from any phone, anywhere!

For detailed guide, see: `NGROK_SETUP_GUIDE.md`
