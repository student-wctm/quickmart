# ⚡ Vercel Deployment - Quick Fix Guide

## 🎯 The Error You Got

```
Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist.
```

## ✅ FIXED!

I've updated the `vercel.json` files to remove the secret references. Now you'll add environment variables directly in the Vercel dashboard.

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

1. **Variable 1:**
   - Name: `NODE_ENV`
   - Value: `production`
   - Click "Add"

2. **Variable 2:**
   - Name: `PORT`
   - Value: `5000`
   - Click "Add"

3. **Variable 3:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority`
   - Click "Add"

4. **Variable 4:**
   - Name: `RAZORPAY_KEY_ID`
   - Value: `rzp_test_TCERL7k0LC51DU`
   - Click "Add"

5. **Variable 5:**
   - Name: `RAZORPAY_KEY_SECRET`
   - Value: `AMj31VKTIn4eZXX7ZRSw1Gza`
   - Click "Add"

6. **Variable 6:**
   - Name: `TELEGRAM_BOT_TOKEN`
   - Value: `7992265335:AAEq5Skrf8gWZ8_2snZsZ3KOVnu1fRihYeQ`
   - Click "Add"

7. **Variable 7:**
   - Name: `TELEGRAM_CHAT_ID`
   - Value: `7639954021`
   - Click "Add"

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
- Value: `https://quickmart-backend-abc123.vercel.app` (YOUR actual backend URL)
- Click "Add"

### Step 4: Deploy

Click **"Deploy"** and wait 2-3 minutes.

### Step 5: Your App is Live! 🎉

Visit your frontend URL:
```
https://quickmart-abc123.vercel.app
```

Your app should load with all products!

---

## 📸 Screenshot Guide

### Where to Add Environment Variables

When you're on the deployment configuration page:

1. Scroll down to **"Environment Variables"**
2. You'll see 3 fields:
   - **Name** (e.g., `MONGODB_URI`)
   - **Value** (e.g., your MongoDB connection string)
   - **Environment** (leave as "All" - Production, Preview, Development)
3. Click **"Add"** after each variable
4. Repeat for all variables

---

## ✅ Checklist

**Backend:**
- [ ] Root directory set to `backend`
- [ ] All 7 environment variables added
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

### Issue: "Build failed"

**Solution:**
1. Check build logs in Vercel
2. Make sure you selected correct root directory
3. Ensure `package.json` exists in the root directory

---

## 🎯 Quick Reference

**Backend Environment Variables:**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_TCERL7k0LC51DU
RAZORPAY_KEY_SECRET=AMj31VKTIn4eZXX7ZRSw1Gza
TELEGRAM_BOT_TOKEN=7992265335:AAEq5Skrf8gWZ8_2snZsZ3KOVnu1fRihYeQ
TELEGRAM_CHAT_ID=7639954021
```

**Frontend Environment Variable:**
```
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 📞 Need More Help?

If you still face issues:
1. Take a screenshot of the error
2. Check Vercel deployment logs
3. Verify all environment variables are added correctly

---

**After both deployments, your app will be live 24/7 on Vercel!** 🚀
