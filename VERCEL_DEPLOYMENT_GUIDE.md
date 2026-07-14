# 🚀 Vercel Deployment Guide - QuickMart

## 🎯 Overview

Deploy your QuickMart app to Vercel for free hosting with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Continuous deployment from GitHub
- ✅ Custom domains
- ✅ Zero server maintenance

---

## 📋 Deployment Strategy

We'll deploy in 2 parts:

1. **Backend** → Vercel Serverless Functions
2. **Frontend** → Vercel Static Hosting

Both will be connected and work seamlessly!

---

## 🔧 Prerequisites

- ✅ GitHub account (with code already pushed)
- ✅ Vercel account (free) - Sign up at https://vercel.com
- ✅ MongoDB Atlas (already set up)
- ✅ Razorpay test keys (already have)
- ✅ Telegram bot (already configured)

---

## 🚀 Step 1: Deploy Backend to Vercel

### 1.1 Create Backend Project on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository: `student-wctm/quickmart`
3. Vercel will detect your project automatically

**Configure Backend:**
- **Framework Preset**: Other
- **Root Directory**: `backend`
- **Build Command**: (leave empty - not needed for Node.js)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### 1.2 Add Environment Variables

Click **Environment Variables** and add these:

| Name | Value | Notes |
|------|-------|-------|
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `5000` | Port number |
| `MONGODB_URI` | `mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce?retryWrites=true&w=majority` | Your MongoDB connection |
| `RAZORPAY_KEY_ID` | `rzp_test_TCERL7k0LC51DU` | Your Razorpay test key |
| `RAZORPAY_KEY_SECRET` | `AMj31VKTIn4eZXX7ZRSw1Gza` | Your Razorpay secret |
| `TELEGRAM_BOT_TOKEN` | `7992265335:AAEq5Skrf8gWZ8_2snZsZ3KOVnu1fRihYeQ` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | `7639954021` | Your Telegram chat ID |

### 1.3 Deploy

1. Click **Deploy**
2. Wait for deployment to complete (1-2 minutes)
3. Copy your backend URL (e.g., `https://quickmart-backend.vercel.app`)

**Note:** Vercel will give you a URL like:
- `https://quickmart-backend-student-wctm.vercel.app`
- or `https://quickmart-backend.vercel.app`

**Save this URL!** You'll need it for the frontend.

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Create Frontend Project on Vercel

1. Go to https://vercel.com/new again
2. Import the same repository: `student-wctm/quickmart`
3. Vercel will detect React/Vite automatically

**Configure Frontend:**
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.2 Add Environment Variable

Click **Environment Variables** and add:

| Name | Value | Notes |
|------|-------|-------|
| `VITE_API_URL` | `https://quickmart-backend.vercel.app` | Your backend URL from Step 1 |

**Important:** Replace with your actual backend URL!

### 2.3 Update Frontend Code for Production

Before deploying, we need to update the API calls to use the environment variable.

**This is already done if you follow Step 3 below!**

### 2.4 Deploy

1. Click **Deploy**
2. Wait for deployment to complete (2-3 minutes)
3. Your frontend will be live at: `https://quickmart.vercel.app`

---

## 🔄 Step 3: Update Code for Vercel (Required)

We need to update the backend CORS and frontend API configuration.

### 3.1 Update Backend CORS

Your `backend/server.js` already has CORS configured for ngrok, but we need to add Vercel domains:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://fragment-unsubtle-simmering.ngrok-free.dev',
    'https://quickmart.vercel.app',  // Add your frontend Vercel URL
    'https://quickmart-student-wctm.vercel.app',  // Add if different
    /\.vercel\.app$/,  // Allow all Vercel preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));
```

### 3.2 Update Frontend API Configuration

Update the `frontend/src/config/api.js` file:

```javascript
// API Configuration for Vercel deployment
const getApiUrl = () => {
  // Use environment variable if set (production)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // In development, use Vite proxy (relative URL)
  return '';
};

export const API_BASE_URL = getApiUrl();
export default API_BASE_URL;
```

### 3.3 Update API Calls

Update `frontend/src/pages/Home.jsx` to use the API configuration:

```javascript
import axios from 'axios';
import API_BASE_URL from '../config/api';

// In fetchProducts function:
const response = await axios.get(`${API_BASE_URL}/api/products`);
```

**These changes are being made automatically - see next section!**

---

## 🛠️ Automated Configuration Updates

I'm creating updated files for you. After I finish, you'll need to:

1. Commit the changes
2. Push to GitHub
3. Vercel will auto-deploy!

---

## 📱 Step 4: Test Your Deployed App

### 4.1 Test Backend

Visit your backend URL:
```
https://quickmart-backend.vercel.app/
```

You should see:
```json
{"message": "Quick-Commerce API is running..."}
```

Test products API:
```
https://quickmart-backend.vercel.app/api/products
```

Should return JSON array of products.

### 4.2 Test Frontend

Visit your frontend URL:
```
https://quickmart.vercel.app
```

Your app should load with all products!

### 4.3 Test Features

- ✅ Browse products
- ✅ Add to cart
- ✅ Search functionality
- ✅ Category filtering
- ✅ Checkout flow
- ✅ Razorpay payment (test mode)
- ✅ Order placement
- ✅ Telegram notifications

---

## 🌐 Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain to Frontend

1. Go to your frontend project on Vercel
2. Settings → Domains
3. Add your custom domain (e.g., `quickmart.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

### 5.2 Update Backend CORS

Add your custom domain to CORS:
```javascript
origin: [
  'https://quickmart.com',
  'https://www.quickmart.com',
  // ... other domains
]
```

---

## 🔄 Continuous Deployment

### How It Works

Once connected, Vercel automatically:
1. ✅ Watches your GitHub repository
2. ✅ Detects new commits
3. ✅ Builds and deploys automatically
4. ✅ Creates preview URLs for pull requests

### Making Updates

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys!
```

Check deployment status at: https://vercel.com/dashboard

---

## 🐛 Troubleshooting

### Issue: "Module not found" Error

**Solution:** Ensure all dependencies are in `package.json`:
```bash
cd backend
npm install
# or
cd frontend
npm install
```

### Issue: API Calls Failing (CORS Error)

**Solution:** 
1. Check backend CORS includes your frontend Vercel URL
2. Redeploy backend after updating CORS
3. Clear browser cache

### Issue: Environment Variables Not Working

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Make sure all variables are added
3. Redeploy the project (Deployments → ⋯ → Redeploy)

### Issue: Build Failed

**Check Vercel Logs:**
1. Go to Deployments tab
2. Click on failed deployment
3. Check build logs for errors

**Common fixes:**
- Missing dependencies in `package.json`
- Syntax errors in code
- Incorrect build commands

### Issue: MongoDB Connection Failed

**Solution:**
1. Check MongoDB Atlas Network Access
2. Add Vercel IPs or use `0.0.0.0/0` (all IPs)
3. Verify connection string in environment variables

---

## 💰 Vercel Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| Bandwidth | 100 GB/month |
| Serverless Function Executions | 100 GB-Hrs |
| Build Minutes | 6000 minutes/month |
| Deployments | Unlimited |
| Team Members | 1 (you) |
| Custom Domains | Unlimited |

**Perfect for:**
- ✅ Personal projects
- ✅ Portfolios
- ✅ Small apps with moderate traffic

**Upgrade if:**
- ❌ More than 100GB bandwidth/month
- ❌ Need team collaboration
- ❌ Enterprise features

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` to GitHub
- ✅ All secrets in Vercel Environment Variables
- ✅ Use different keys for production

### 2. MongoDB
- ✅ Use strong passwords
- ✅ Enable IP whitelisting
- ✅ Regular backups

### 3. Razorpay
- ✅ Use test keys for testing
- ✅ Switch to live keys only in production
- ✅ Enable webhooks for payment verification

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Free)

Enable in Vercel Dashboard:
- Page views
- Unique visitors
- Performance metrics

### Custom Monitoring

Add services:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - User analytics

---

## 🎯 Production Checklist

Before going live:

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] All environment variables set correctly
- [ ] CORS configured with production URLs
- [ ] MongoDB connection working
- [ ] Razorpay payment tested
- [ ] Telegram notifications working
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled (automatic with Vercel)
- [ ] Error tracking set up
- [ ] Performance tested
- [ ] Mobile responsive verified
- [ ] SEO optimized (meta tags, sitemap)

---

## 🚀 Deploy Now!

### Quick Commands

```bash
# 1. Make sure latest code is committed
git status

# 2. If changes, commit them
git add .
git commit -m "Add Vercel configuration"

# 3. Push to GitHub
git push origin main

# 4. Go to Vercel and connect your repo!
```

Visit: https://vercel.com/new

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Discord**: https://vercel.com/discord
- **GitHub Issues**: Create issues in your repo
- **Stack Overflow**: Tag `vercel`

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Backend**: `https://quickmart-backend.vercel.app`
- **Frontend**: `https://quickmart.vercel.app`

**Features:**
- ✅ 24/7 uptime
- ✅ Global CDN
- ✅ Auto HTTPS
- ✅ Zero server management
- ✅ Automatic deployments from GitHub

**Share your live app with the world!** 🌍🚀
