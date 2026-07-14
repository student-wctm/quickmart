# 🚀 Vercel Deployment Guide - QuickMart

## 🎯 Overview

Deploy your QuickMart app to Vercel for free hosting with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Continuous deployment from GitHub
- ✅ Custom domains
- ✅ Zero server maintenance

---

## 📋 Prerequisites

Before deploying, make sure you have:

- ✅ GitHub account (code already pushed)
- ✅ Vercel account (free) - Sign up at https://vercel.com
- ✅ MongoDB Atlas connection string (from your `.env` file)
- ✅ Razorpay test keys (from your `.env` file)
- ✅ Telegram bot credentials (from your `.env` file)

⚠️ **IMPORTANT:** All credentials should be in your local `backend/.env` file. Never commit this file to GitHub!

---

## 🚀 Step 1: Deploy Backend to Vercel

### 1.1 Import Project

1. Go to https://vercel.com/new
2. Import your GitHub repository: `student-wctm/quickmart`
3. Vercel will detect your project automatically

### 1.2 Configure Backend

- **Framework Preset**: Other
- **Root Directory**: `backend` ← **Important: Select the backend folder!**
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### 1.3 Add Environment Variables

⚠️ **Get these values from your local `backend/.env` file!**

Add these variables one by one:

| Name | Value | Example |
|------|-------|---------|
| `NODE_ENV` | `production` | Exact value |
| `PORT` | `5000` | Exact value |
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://username:password@...` |
| `RAZORPAY_KEY_ID` | Your Razorpay test key | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret | From dashboard |
| `TELEGRAM_BOT_TOKEN` | Your bot token | From @BotFather |
| `TELEGRAM_CHAT_ID` | Your chat ID | From @userinfobot |

### 1.4 Deploy Backend

1. Click **"Deploy"**
2. Wait 1-2 minutes
3. Copy your backend URL: `https://quickmart-backend-xyz.vercel.app`

### 1.5 Test Backend

Visit: `https://your-backend-url.vercel.app`

Should return:
```json
{"message": "Quick-Commerce API is running..."}
```

Test products: `https://your-backend-url.vercel.app/api/products`

---

## 🚀 Step 2: Deploy Frontend to Vercel

### 2.1 Import Project Again

1. Go to https://vercel.com/new
2. Import the same repository again
3. This time configure for frontend

### 2.2 Configure Frontend

- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `frontend` ← **Important: Select the frontend folder!**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 2.3 Add Environment Variable

Add ONE variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your backend URL from Step 1.4 |

**Example:** `https://quickmart-backend-xyz.vercel.app`

### 2.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app is live!

---

## 📱 Step 3: Test Your Deployed App

### 3.1 Test Features

Visit your frontend URL and test:
- ✅ Browse products
- ✅ Add to cart
- ✅ Search functionality
- ✅ Category filtering
- ✅ Checkout flow
- ✅ Razorpay payment (test card: `4111 1111 1111 1111`)
- ✅ Order placement
- ✅ Telegram notifications

---

## 🌐 Step 4: Custom Domain (Optional)

### Add Your Domain

1. Go to your frontend project on Vercel
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

### Update Backend CORS

If you add a custom domain, update `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
    // ... other domains
  ]
}));
```

Then commit and push - Vercel will auto-deploy!

---

## 🔄 Continuous Deployment

### How It Works

Vercel automatically:
1. Watches your GitHub repository
2. Detects new commits
3. Builds and deploys automatically
4. Creates preview URLs for pull requests

### Making Updates

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Vercel auto-deploys!
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check MongoDB Atlas Network Access
- Allow all IPs: `0.0.0.0/0`
- Verify connection string

**Environment Variables Not Working**
- Go to Vercel → Project → Settings → Environment Variables
- Check all variables are added
- Redeploy: Deployments → ⋯ → Redeploy

### Frontend Issues

**Products Not Loading**
- Check frontend `VITE_API_URL` is correct
- Test backend API directly
- Check browser console for errors

**CORS Error**
- Verify backend CORS includes Vercel URLs
- Check backend logs in Vercel dashboard

### Build Failures

- Check Vercel build logs
- Ensure dependencies in `package.json`
- Verify syntax errors
- Check root directory is set correctly

---

## 💰 Vercel Free Tier

| Feature | Free Tier |
|---------|-----------|
| Bandwidth | 100 GB/month |
| Serverless Executions | 100 GB-Hrs |
| Build Minutes | 6000 minutes/month |
| Deployments | Unlimited |
| Custom Domains | Unlimited |

Perfect for personal projects and portfolios!

---

## 🔒 Security Best Practices

### ⚠️ Critical Security Rules

1. **Never commit `.env` to GitHub**
   - It's in `.gitignore` for a reason
   - Contains sensitive credentials

2. **Use Environment Variables**
   - Add secrets ONLY in Vercel dashboard
   - Never hardcode API keys in code

3. **Rotate Keys if Exposed**
   - If keys are accidentally pushed to GitHub:
     1. Delete the commit
     2. Rotate ALL keys immediately
     3. Update Vercel environment variables

4. **MongoDB Security**
   - Use strong passwords
   - Enable IP whitelisting (or `0.0.0.0/0` for serverless)
   - Regular backups

5. **Razorpay**
   - Use test keys for development
   - Switch to live keys ONLY in production
   - Enable webhooks for verification

---

## 📊 Monitoring

### Vercel Analytics

Enable in dashboard for free:
- Page views
- Unique visitors
- Performance metrics

### View Logs

- Vercel Dashboard → Your Project → Deployments
- Click on deployment → View Function Logs
- See real-time errors and requests

---

## 🎯 Production Checklist

Before going live:

- [ ] Backend deployed and tested
- [ ] Frontend deployed and tested
- [ ] All environment variables configured
- [ ] CORS configured for production URLs
- [ ] MongoDB connection working
- [ ] Razorpay tested (use test keys first!)
- [ ] Telegram notifications working
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled (automatic)
- [ ] Mobile responsive verified
- [ ] All features tested end-to-end

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **MongoDB Docs**: https://docs.mongodb.com/
- **Razorpay Docs**: https://razorpay.com/docs/

---

## 🎉 Success!

Once deployed, your app will be live at:
- **Backend**: `https://your-backend.vercel.app`
- **Frontend**: `https://your-app.vercel.app`

**Features:**
- ✅ 24/7 uptime
- ✅ Global CDN
- ✅ Auto HTTPS
- ✅ Zero maintenance
- ✅ Auto-deploy from GitHub

**Share your live app with the world!** 🌍🚀

---

## ⚠️ Security Reminder

This guide uses **placeholder examples** for credentials. 

**Always:**
- Get actual values from your local `backend/.env` file
- Never commit real credentials to GitHub
- Add secrets ONLY in Vercel dashboard
- Keep `.env` in `.gitignore`

Your credentials are safe when kept local and added only through Vercel's secure environment variable system! 🔒
