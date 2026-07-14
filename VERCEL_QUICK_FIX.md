# ⚡ Vercel Deployment - Quick Fix Guide

## 🎯 The Error You Might Get

```
Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist.
```

## ✅ FIXED!

The `vercel.json` files are configured correctly. You'll add environment variables directly in the Vercel dashboard.

---

## 🚀 Correct Way to Deploy Backend

### Step 1: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click **"Import"** next to your repo: `student-wctm/quickmart`

### Step 2: Configure Backend

**Project Settings:**
- **Project Name**: `quickmart-backend`
- **Framework Preset**: `Other` (or leave as detected)
- **Root Directory**: Click **Edit** → Select `backend`
- **Build Command**: Leave empty (not needed)
- **Output Directory**: Leave empty
- **Install Command**: `npm install` (auto-detected)

### Step 3: Add Environment Variables

Click **"Environment Variables"** section and add these **ONE BY ONE**:

**Add each variable separately:**

1. **NODE_ENV**
   - Name: `NODE_ENV`
   - Value: `production`

2. **PORT**
   - Name: `PORT`
   - Value: `5000`

3. **MONGODB_URI**
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string from `.env` file
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority`

4. **RAZORPAY_KEY_ID**
   - Name: `RAZORPAY_KEY_ID`
   - Value: Your Razorpay test key ID (starts with `rzp_test_`)

5. **RAZORPAY_KEY_SECRET**
   - Name: `RAZORPAY_KEY_SECRET`
   - Value: Your Razorpay secret key

6. **TELEGRAM_BOT_TOKEN**
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: Your Telegram bot token (from @BotFather)

7. **TELEGRAM_CHAT_ID**
   - Name: `TELEGRAM_CHAT_ID`
   - Value: Your Telegram chat ID (from @userinfobot)

### Step 4: Deploy

Click **"Deploy"** button and wait 1-2 minutes.

### Step 5: Get Your Backend URL

Once deployed, Vercel will show you a URL like:
```
https://quickmart-backend-abc123.vercel.app
```

**Copy this URL!** You'll need it for the frontend.

### Step 6: Test Backend

Visit your backend URL in browser:
```
https://your-backend-url.vercel.app
```

You should see:
```json
{"message": "Quick-Commerce API is running..."}
```

Test the API:
```
https://your-backend-url.vercel.app/api/products
```

Should return JSON array of products.

---

## 🚀 Deploy Frontend

### Step 1: Import Project Again

1. Go to https://vercel.com/new
2. Click **"Import"** next to `student-wctm/quickmart` again
3. This time we'll deploy the frontend

### Step 2: Configure Frontend

**Project Settings:**
- **Project Name**: `quickmart` (or `quickmart-frontend`)
- **Framework Preset**: `Vite` (auto-detected)
- **Root Directory**: Click **Edit** → Select `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 3: Add Environment Variable

Click **"Environment Variables"** and add:

**IMPORTANT:** Use YOUR backend URL from Step 5 above!

- Name: `VITE_API_URL`
- Value: `https://your-backend-url.vercel.app` (YOUR actual backend URL)

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes.

### Step 5: Your App is Live! 🎉

Visit your frontend URL:
```
https://quickmart-abc123.vercel.app
```

Your app should load with all products!

---

## 📸 Where to Find Your Credentials

All credentials are in your local `backend/.env` file. **DO NOT** commit this file to GitHub!

To find them:
1. Open `backend/.env` on your computer
2. Copy each value and paste into Vercel dashboard

---

## ✅ Checklist

**Backend:**
- [ ] Root directory set to `backend`
- [ ] All 7 environment variables added (from your `.env` file)
- [ ] Deployed successfully
- [ ] Backend URL copied
- [ ] Tested `/` endpoint
- [ ] Tested `/api/products` endpoint

**Frontend:**
- [ ] Root directory set to `frontend`
- [ ] `VITE_API_URL` added with YOUR backend URL
- [ ] Deployed successfully
- [ ] App loads in browser
- [ ] Products are visible

---

## 🐛 Troubleshooting

### Issue: "Environment Variables" section not visible

**Solution:** Scroll down on the deployment configuration page. It's below the build settings.

### Issue: Can't find "Root Directory" option

**Solution:** Look for "Root Directory" field with an "Edit" button next to it. Click "Edit" and select your folder.

### Issue: Backend deployed but frontend shows no products

**Possible causes:**
1. Wrong backend URL in frontend env variable
2. CORS issue
3. MongoDB not connected

**Solution:**
1. Check Vercel backend logs for errors
2. Verify backend URL is correct in frontend env
3. Test backend API directly in browser

---

## 🔒 Security Notes

- ⚠️ Never commit `.env` file to GitHub
- ⚠️ Never share API keys publicly
- ⚠️ Use test keys for development
- ⚠️ Rotate keys if accidentally exposed
- ✅ Add secrets only in Vercel dashboard
- ✅ Keep `.env` in `.gitignore`

---

**After both deployments, your app will be live 24/7 on Vercel!** 🚀
