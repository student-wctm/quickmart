# 🔍 How to Check Vercel Backend Logs

## 🎯 Goal

Check the **exact error message** that's causing "Failed to place order" on your checkout page.

---

## 📋 Method 1: View Function Logs (Recommended)

### Step 1: Go to Vercel Dashboard

1. Visit: https://vercel.com/dashboard
2. Click on your **backend** project: `quickmart-backend` or similar
3. Make sure you're on the correct project (the one with URL ending in `-six.vercel.app`)

### Step 2: Navigate to Deployments

1. Click the **"Deployments"** tab at the top
2. You'll see a list of all deployments

### Step 3: View Latest Deployment Logs

1. Click on the **most recent deployment** (should be at the top)
2. Look for the deployment that's currently **"Ready"** or **"Current"**

### Step 4: View Function Logs

1. Scroll down to the **"Logs"** section
2. Or click **"View Function Logs"** button
3. This shows **real-time** logs from your backend

### Step 5: Trigger the Error

With the logs open:

1. Open another tab: https://quickmart-orpin.vercel.app/checkout
2. Add items to cart
3. Fill in checkout form
4. Click **"Place Order"**
5. Watch the Vercel logs update in real-time!

### Step 6: Look for Error Messages

Common errors you might see:

**MongoDB Connection Error:**
```
MongoServerError: bad auth: Authentication failed
```

**Missing Environment Variables:**
```
Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured
```

**CORS Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Validation Error:**
```
ValidationError: orderItems: Path `orderItems` is required
```

---

## 📋 Method 2: Real-Time Logs (CLI)

You can also watch logs from your terminal using Vercel CLI.

### Install Vercel CLI:

```bash
npm install -g vercel
```

### Login to Vercel:

```bash
vercel login
```

### View Logs:

```bash
# Navigate to your project
cd C:\Users\akhil\Desktop\blinkit2\backend

# Link to Vercel project (first time only)
vercel link

# View real-time logs
vercel logs --follow
```

This will stream logs in real-time as requests come in!

---

## 📋 Method 3: Check Specific Deployment Logs

### Via Dashboard:

1. Deployments → Click deployment
2. Scroll to **"Build Logs"** section
3. Shows logs from the build process

### Via CLI:

```bash
# List deployments
vercel ls

# View specific deployment logs
vercel logs <deployment-url>
```

---

## 🔍 What to Look For

### 1. MongoDB Connection Issues

**Error:**
```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster
```

**Solution:**
- Check MongoDB Atlas Network Access
- Add `0.0.0.0/0` to IP whitelist
- Verify `MONGODB_URI` in environment variables

### 2. Missing Environment Variables

**Error:**
```
Error: TELEGRAM_BOT_TOKEN is undefined
```

**Solution:**
- Go to Settings → Environment Variables
- Add missing variable
- Redeploy

### 3. Invalid Order Data

**Error:**
```
ValidationError: orderItems validation failed
```

**Solution:**
- Check frontend is sending correct data format
- Verify Order model schema

### 4. CORS Issues

**Error:**
```
Origin https://quickmart-orpin.vercel.app is not allowed by CORS
```

**Solution:**
- Check `server.js` CORS configuration
- Add frontend URL to allowed origins

---

## 🐛 Debug Checklist

When checking logs, verify:

- [ ] MongoDB connection successful
- [ ] Environment variables loaded
- [ ] Request received from frontend
- [ ] Request body format correct
- [ ] No validation errors
- [ ] Order saved to database
- [ ] Telegram notification attempted
- [ ] Response sent back to frontend

---

## 📸 Screenshot Guide

### Where to Find Logs:

**Dashboard → Project → Deployments → Click Latest → Logs Section**

You should see:
```
[GET] /api/products
[POST] /api/orders
Server running in production mode on port 5000
MongoDB Connected: ...
```

---

## 💡 Pro Tips

### Enable More Verbose Logging

Add to your `orderController.js`:

```javascript
export const createOrder = async (req, res) => {
  try {
    console.log('📥 Received order request');
    console.log('📦 Order data:', JSON.stringify(req.body, null, 2));
    
    // ... rest of code
    
    console.log('✅ Order saved:', createdOrder._id);
    console.log('📱 Sending Telegram notification...');
    
    // ... rest of code
    
  } catch (error) {
    console.error('❌ Order creation failed:', error);
    console.error('Stack trace:', error.stack);
    res.status(400).json({ message: error.message });
  }
};
```

Then redeploy and check logs again!

### Use Console Statements

Add strategic `console.log()` statements:

```javascript
// At the start
console.log('Environment check:', {
  mongoUri: process.env.MONGODB_URI ? 'Set' : 'Missing',
  telegramToken: process.env.TELEGRAM_BOT_TOKEN ? 'Set' : 'Missing',
  telegramChatId: process.env.TELEGRAM_CHAT_ID ? 'Set' : 'Missing'
});
```

---

## 🎯 Expected Logs (Success)

When order works correctly, logs should show:

```
2024-07-11T... - POST /api/orders - Origin: https://quickmart-orpin.vercel.app
📥 Received order request
📦 Order data: { user: {...}, orderItems: [...] }
MongoDB: Order document created
✅ Order saved: 6a520d035f9bbf8f43d271be
📱 Sending Telegram notification...
Telegram API response: { ok: true, result: {...} }
✅ Telegram order notification sent successfully
Response sent: 201 Created
```

---

## 🎯 Expected Logs (Failure)

When order fails, you might see:

```
2024-07-11T... - POST /api/orders - Origin: https://quickmart-orpin.vercel.app
📥 Received order request
❌ MongoDB connection error: Authentication failed
Error: MongoServerError: bad auth
Response sent: 400 Bad Request
```

---

## 📞 Quick Actions Based on Logs

### If you see "MongoDB connection failed":
1. Check Network Access in MongoDB Atlas
2. Verify MONGODB_URI in Vercel
3. Test connection string locally

### If you see "TELEGRAM_BOT_TOKEN not configured":
1. Go to Settings → Environment Variables
2. Add TELEGRAM_BOT_TOKEN
3. Add TELEGRAM_CHAT_ID
4. Redeploy

### If you see "CORS error":
1. Update server.js CORS configuration
2. Add frontend URL to allowed origins
3. Commit and push to GitHub

### If you see "No logs at all":
1. Make sure you're on the right project
2. Try clicking "View Function Logs"
3. Trigger order again while watching logs

---

## 🚀 Real-Time Debugging Session

**Best practice:**

1. Open 3 windows side-by-side:
   - **Window 1**: Vercel Logs (Dashboard)
   - **Window 2**: Your website checkout page
   - **Window 3**: Browser DevTools Network tab

2. Trigger the order

3. Watch all 3 windows simultaneously:
   - Vercel shows backend errors
   - Browser shows frontend errors
   - Network tab shows API requests/responses

This gives you complete visibility!

---

## ✅ Action Items

After checking logs:

1. [ ] Identify the exact error message
2. [ ] Note which environment variables are missing
3. [ ] Check if MongoDB connection works
4. [ ] Verify CORS configuration
5. [ ] Test Telegram notification separately
6. [ ] Fix the identified issue
7. [ ] Redeploy
8. [ ] Test again

---

**Once you check the logs, you'll know exactly what's wrong!** 🎯

The error message in the logs will tell you whether it's:
- MongoDB connection issue
- Missing environment variables
- Data validation error
- CORS problem
- Something else

Share the error message and I can help you fix it immediately! 🚀
