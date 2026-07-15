# 📱 ngrok Setup Guide - Access QuickMart from Any Phone

## 🎯 What You'll Achieve

Access your QuickMart app from **any phone, anywhere** using your permanent ngrok domain:
```
https://fragment-unsubtle-simmering.ngrok-free.dev
```

This URL will **never change** and will work as long as your computer is running the app and ngrok.

---

## 📋 Prerequisites

### 1. Install ngrok

**Option A: Download from Website**
1. Go to https://ngrok.com/download
2. Download ngrok for Windows
3. Extract `ngrok.exe` to a folder (e.g., `C:\ngrok\`)
4. Add to PATH or place in your project folder

**Option B: Install via Chocolatey**
```powershell
choco install ngrok
```

**Option C: Install via Scoop**
```powershell
scoop install ngrok
```

### 2. Get Your ngrok Authtoken

1. Go to https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy your authtoken (looks like: `2abc...xyz`)
3. Keep it ready for the next step

---

## ⚙️ Configuration Steps

### Step 1: Configure ngrok Authtoken

Open PowerShell and run:

```powershell
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

**Example:**
```powershell
ngrok config add-authtoken 2abcdefghijklmnopqrstuvwxyz1234567890
```

This stores your token in `C:\Users\YOUR_USERNAME\.ngrok2\ngrok.yml`

### Step 2: Update Project ngrok Config

Open `ngrok.yml` in your project folder and add your authtoken:

```yaml
version: "2"
authtoken: YOUR_NGROK_AUTHTOKEN_HERE  # Replace this!

tunnels:
  frontend:
    proto: http
    addr: 5173
    domain: fragment-unsubtle-simmering.ngrok-free.dev
    inspect: true
```

### Step 3: Verify Configuration

Run this to test if ngrok is configured correctly:

```powershell
ngrok config check
```

---

## 🚀 Starting the App

You have **3 options** to start the app:

### Option 1: One-Click Start (Recommended)

**Double-click one of these files:**
- `start-with-ngrok.bat` (Windows Command Prompt)
- `start-with-ngrok.ps1` (PowerShell - Right-click → Run with PowerShell)

This will automatically:
1. ✅ Start the backend server (port 5000)
2. ✅ Start the frontend server (port 5173)
3. ✅ Start ngrok tunnel with your permanent domain
4. ✅ Open 3 terminal windows (one for each service)

### Option 2: Manual Start (PowerShell)

```powershell
# Navigate to project
cd C:\Users\akhil\Desktop\blinkit2

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 (New window) - Frontend
cd frontend
npm run dev

# Terminal 3 (New window) - ngrok
cd C:\Users\akhil\Desktop\blinkit2
ngrok start frontend --config ngrok.yml
```

### Option 3: Manual Start (CMD)

```cmd
REM Terminal 1 - Backend
cd C:\Users\akhil\Desktop\blinkit2\backend
npm run dev

REM Terminal 2 - Frontend
cd C:\Users\akhil\Desktop\blinkit2\frontend
npm run dev

REM Terminal 3 - ngrok
cd C:\Users\akhil\Desktop\blinkit2
ngrok start frontend --config ngrok.yml
```

---

## 📱 Accessing from Your Phone

Once all services are running:

### Your URLs:

| Access Point | URL | Use Case |
|-------------|-----|----------|
| **Local Computer** | http://localhost:5173 | Development/Testing |
| **Phone/Tablet** | https://fragment-unsubtle-simmering.ngrok-free.dev | Mobile access |
| **Friends/Family** | https://fragment-unsubtle-simmering.ngrok-free.dev | Share your app |
| **Backend API** | http://localhost:5000/api | Direct API access |

### Steps to Open on Phone:

1. **Ensure your computer is running:**
   - ✅ Backend server (Terminal 1)
   - ✅ Frontend server (Terminal 2)
   - ✅ ngrok tunnel (Terminal 3)

2. **On your phone:**
   - Open any browser (Chrome, Safari, etc.)
   - Type: `https://fragment-unsubtle-simmering.ngrok-free.dev`
   - Press Enter

3. **If you see ngrok warning page:**
   - Click "Visit Site" or "Continue"
   - This is a one-time warning for free ngrok accounts

4. **Your app loads!** 🎉

---

## 🔍 Monitoring & Debugging

### ngrok Web Interface

ngrok provides a local web interface to monitor requests:

**URL:** http://localhost:4040

**Features:**
- 📊 See all HTTP requests
- 🔍 Inspect request/response headers
- 🐛 Debug API calls
- 📈 View traffic statistics

**To open:**
```powershell
start http://localhost:4040
```

### Check if Services are Running

```powershell
# Check backend
curl http://localhost:5000

# Check frontend
curl http://localhost:5173

# Check ngrok status
curl http://localhost:4040/api/tunnels
```

---

## 🛠️ Troubleshooting

### Issue 1: "ngrok not found"

**Solution:**
```powershell
# Add ngrok to PATH, or run from full path:
C:\path\to\ngrok.exe start frontend --config ngrok.yml
```

### Issue 2: "Invalid authtoken"

**Solution:**
```powershell
# Re-add your authtoken
ngrok config add-authtoken YOUR_ACTUAL_TOKEN
```

### Issue 3: "Domain already in use"

**Solution:**
- Only ONE ngrok tunnel can use your domain at a time
- Check if ngrok is already running:
  ```powershell
  tasklist | findstr ngrok
  ```
- Kill existing ngrok:
  ```powershell
  taskkill /F /IM ngrok.exe
  ```

### Issue 4: "ERR_CONNECTION_REFUSED" on phone

**Solution:**
- Ensure all 3 services are running (backend, frontend, ngrok)
- Check if ngrok tunnel shows "online" status
- Verify: http://localhost:4040/status

### Issue 5: "502 Bad Gateway"

**Solution:**
- Backend might not be running
- Restart backend server
- Wait 10 seconds and try again

### Issue 6: ngrok "Visit Site" button appears every time

**Solution:**
- This is normal for free ngrok accounts
- Just click "Visit Site" each time
- To remove: Upgrade to ngrok paid plan

---

## 🎮 Usage Scenarios

### Scenario 1: Demo to Client/Friend
```
1. Start app with: start-with-ngrok.bat
2. Share link: https://fragment-unsubtle-simmering.ngrok-free.dev
3. They can access from anywhere!
```

### Scenario 2: Test on Real Mobile Device
```
1. Start app
2. Open link on your phone
3. Test mobile responsiveness, touch interactions, etc.
```

### Scenario 3: Show in Portfolio/Interview
```
1. Keep your computer running
2. Share the permanent link in your resume/portfolio
3. Interviewer can access instantly!
```

---

## 📊 Performance Notes

### Speed Considerations:
- **Local access (localhost:5173):** ⚡ Fastest
- **ngrok tunnel:** 🚀 Fast (adds ~50-200ms latency)
- **Phone on same WiFi:** 🚀 Fast
- **Phone on mobile data:** 🚀 Fast (depends on connection)

### Data Usage:
- ngrok uses your **internet upload bandwidth**
- Each request goes: Phone → ngrok servers → Your PC → Backend
- For development/demo: Perfectly fine! ✅
- For production: Deploy to a cloud server

---

## 🔒 Security Notes

### Important:
- ⚠️ Your `.env` file is still SAFE (not uploaded to GitHub)
- ⚠️ Anyone with the link can access your app while it's running
- ⚠️ Only share with trusted people during development
- ✅ ngrok provides HTTPS encryption automatically
- ✅ Your MongoDB/Razorpay credentials are never exposed to the client

### Best Practices:
1. **Don't share your authtoken** with anyone
2. **Monitor access** via ngrok dashboard (localhost:4040)
3. **Stop ngrok** when not testing on mobile
4. **Use environment variables** for production deployment

---

## 🎯 Quick Reference Commands

```powershell
# Start everything (one command)
.\start-with-ngrok.bat

# Check ngrok status
ngrok tunnels list

# View ngrok logs
# Open: http://localhost:4040

# Stop all services
# Close the 3 terminal windows or press Ctrl+C in each

# Restart ngrok only
taskkill /F /IM ngrok.exe
ngrok start frontend --config ngrok.yml
```

---

## 📱 Testing Checklist

Before sharing your link, test these:

- [ ] App loads on your phone
- [ ] Can browse products
- [ ] Can add items to cart
- [ ] Can proceed to checkout
- [ ] Search functionality works
- [ ] Images load properly
- [ ] Razorpay payment works
- [ ] Mobile UI looks good
- [ ] Touch interactions work smoothly

---

## 🚀 Going to Production

When ready to deploy for real users:

### Recommended Hosting:

**Frontend:**
- Vercel (Free, automatic HTTPS, custom domain)
- Netlify (Free, automatic HTTPS, custom domain)

**Backend:**
- Render (Free tier available, automatic HTTPS)
- Railway (Free tier, automatic HTTPS)
- Heroku (Paid after free tier ends)

**Benefits of Cloud Hosting:**
- ✅ No need to keep your computer running 24/7
- ✅ Faster load times worldwide
- ✅ Custom domain (yourdomain.com)
- ✅ Auto-scaling for more users
- ✅ Free SSL/HTTPS

---

## 🎉 Success!

Your QuickMart app is now accessible from any device at:

### 🌐 Your Permanent Link:
```
https://fragment-unsubtle-simmering.ngrok-free.dev
```

**Share it proudly!** 🚀

---

## 💡 Tips & Tricks

1. **Bookmark the URL** on your phone's home screen for quick access
2. **Add to home screen** (iOS/Android) to make it look like a native app
3. **Use ngrok's edge features** for additional security (paid plans)
4. **Monitor bandwidth** via ngrok dashboard to estimate hosting costs
5. **Test payment flows** using your phone's actual UPI apps

---

## 📞 Support

- ngrok Docs: https://ngrok.com/docs
- ngrok Dashboard: https://dashboard.ngrok.com
- Project Issues: Create an issue on your GitHub repo

---

**Happy Mobile Testing! 📱🚀**
