# 🔧 Fix: Products Not Showing on Vercel

## 🎯 Problem

Your backend is working perfectly! ✅
- Backend URL: https://quickmart-backend-six.vercel.app
- Products API: https://quickmart-backend-six.vercel.app/api/products
- Returns: 37 products

But your frontend at https://quickmart-orpin.vercel.app shows no products because it's missing the environment variable linking to the backend.

---

## ✅ Solution: Add Environment Variable to Frontend

### Step 1: Go to Vercel Frontend Project

1. Visit: https://vercel.com/dashboard
2. Click on your frontend project: **`quickmart`** or **`quickmart-frontend`**

### Step 2: Add Environment Variable

1. Click **"Settings"** tab
2. Click **"Environment Variables"** in the left sidebar
3. Click **"Add New"** button

### Step 3: Enter the Variable

**Add this EXACT variable:**

- **Key (Name)**: `VITE_API_URL`
- **Value**: `https://quickmart-backend-six.vercel.app`
- **Environment**: Select **All** (Production, Preview, and Development)

### Step 4: Redeploy

1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the **⋯ (three dots)** menu
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

### Step 5: Wait for Deployment

Wait 2-3 minutes for the build to complete.

### Step 6: Test Your Site

Visit: https://quickmart-orpin.vercel.app

**You should now see all 37 products!** 🎉

---

## 📋 What the Environment Variable Does

The `VITE_API_URL` tells your frontend where to find the backend:

```javascript
// Without VITE_API_URL:
axios.get('/api/products')  // ❌ Tries to call same domain

// With VITE_API_URL:
axios.get('https://quickmart-backend-six.vercel.app/api/products')  // ✅ Calls backend
```

---

## 🐛 Troubleshooting

### Issue: Still No Products After Redeploy

**Solution 1: Check Environment Variable**
- Make sure the variable name is EXACTLY: `VITE_API_URL` (case-sensitive!)
- Make sure the value is EXACTLY: `https://quickmart-backend-six.vercel.app` (no trailing slash)

**Solution 2: Check Build Logs**
- Go to Deployments → Click on latest deployment
- Check build logs for any errors

**Solution 3: Clear Browser Cache**
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Or open in incognito/private mode

### Issue: Can't Find Environment Variables Option

**Solution:**
1. Make sure you're on the correct project (frontend, not backend)
2. Click "Settings" at the top
3. Look for "Environment Variables" in the left sidebar
4. If still not visible, you might not have the correct permissions

---

## 🎯 Verification Checklist

After adding the environment variable and redeploying:

- [ ] Environment variable added to frontend project
- [ ] Variable name is: `VITE_API_URL`
- [ ] Variable value is: `https://quickmart-backend-six.vercel.app`
- [ ] Redeployed the frontend
- [ ] Waited for deployment to complete
- [ ] Visited https://quickmart-orpin.vercel.app
- [ ] Can see all products
- [ ] Can browse categories
- [ ] Can search for products
- [ ] Can add items to cart

---

## 📸 Visual Guide

### Where to Add Environment Variable

1. **Dashboard** → Your Project → **Settings**
2. **Left Sidebar** → **Environment Variables**
3. Click **"Add New"**
4. Enter:
   ```
   Key: VITE_API_URL
   Value: https://quickmart-backend-six.vercel.app
   ```
5. Select: **Production, Preview, and Development**
6. Click **"Save"**

### Where to Redeploy

1. **Deployments** tab
2. Find latest deployment
3. Click **⋯** (three dots)
4. Click **"Redeploy"**
5. Confirm

---

## ✅ Expected Result

After following these steps:

**Before:**
- ❌ Empty product section
- ❌ No items displaying
- ❌ Blank categories

**After:**
- ✅ 37 products displayed
- ✅ 4 categories visible:
  - Vegetables & Fruits (7 products)
  - Dairy & Breakfast (9 products)
  - Snacks & Munchies (6 products)
  - Cold Drinks & Juices (5 products)
  - Home & Cleaning (7 products)
  - Personal Care (3 products)
- ✅ Product cards with images, titles, prices
- ✅ Add to cart buttons working
- ✅ Search functionality working

---

## 🎉 Success!

Once you add the environment variable and redeploy, your site will be fully functional!

Your products are already in the database and the backend is working perfectly. We just need to connect the frontend to it.

---

## 📞 Quick Support

**Still having issues?**

1. **Check backend is working:**
   - Visit: https://quickmart-backend-six.vercel.app/api/products
   - Should show JSON with products

2. **Check frontend console:**
   - Open your site: https://quickmart-orpin.vercel.app
   - Press F12 (DevTools)
   - Go to Console tab
   - Look for error messages

3. **Check Network tab:**
   - In DevTools, go to Network tab
   - Refresh the page
   - Look for `/api/products` request
   - Check if it's calling the correct URL

---

**Let me know once you've added the environment variable and I'll verify it's working!** 🚀
