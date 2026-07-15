# Quick Testing Guide 🧪

## After Vercel Deploys (Wait 2-3 minutes), Test These Features:

---

## 1️⃣ Test Policy Pages (30 seconds)

**Steps:**
1. Go to: https://quickmart-dbtlqj3j8-beeta1.vercel.app
2. Scroll to bottom footer
3. Click **"Privacy Policy"** → Should open full page
4. Click **"Back to Home"** → Returns to homepage
5. Click **"Refund Policy"** → Opens refund page
6. Click **"Terms of Service"** → Opens terms page

**Expected Result:** ✅ All 3 pages load with professional content

---

## 2️⃣ Test Admin Dashboard - Delete Product (1 minute)

**Steps:**
1. Go to: https://quickmart-dbtlqj3j8-beeta1.vercel.app/admin
2. Scroll to "Product Inventory" section
3. Find any product you want to delete
4. Click the **red trash icon** 🗑️
5. Confirm deletion in popup
6. Wait 2 seconds

**Expected Result:** ✅ Product disappears from list, success message appears

**Verify:**
- Product removed from homepage
- Image deleted from Cloudinary

---

## 3️⃣ Test Admin Dashboard - Stock Toggle (30 seconds)

**Steps:**
1. Still on `/admin` page
2. Find a product that's "In Stock"
3. Click the **orange toggle icon** 🔄
4. Confirm action in popup
5. See status change to "Out of Stock"

**Expected Result:** ✅ Status badge turns red, shows "Out of Stock"

**Verify Homepage:**
1. Go back to main website
2. Find the same product
3. Should show "Out of Stock" badge
4. "ADD" button should be disabled or hidden

---

## 4️⃣ Test OTP Login Page (2 minutes)

**Steps:**

### Step 1: Enter Phone Number
1. Go to: https://quickmart-dbtlqj3j8-beeta1.vercel.app/login
2. See split-screen design (desktop) or stacked (mobile)
3. Enter a 10-digit phone: `9876543210`
4. Click **"Continue"**
5. Wait 1-2 seconds

**Expected:** Alert shows demo OTP (e.g., "1234")

### Step 2: Verify OTP
1. Note the OTP from alert
2. Enter each digit in the 4 boxes
3. Click **"Verify & Login"**
4. Wait 1-2 seconds

**Expected Result:** ✅ Redirects to homepage, logged in

**Test Wrong OTP:**
1. Repeat steps above
2. Enter wrong OTP (e.g., "0000")
3. Click verify

**Expected:** ❌ Error message: "Invalid OTP. Please try again."

**Test Resend OTP:**
1. On OTP screen, click **"Resend OTP"**
2. New alert shows new OTP
3. Enter new OTP → Login succeeds

---

## 5️⃣ Test Checkout Fix (2 minutes)

**IMPORTANT:** This is the critical bug fix!

**Steps:**
1. Go to homepage
2. Add 2-3 products to cart
3. Click cart icon
4. Click **"Proceed to Checkout"**
5. Fill in delivery details:
   ```
   Name: Test User
   Phone: 9876543210
   Email: test@example.com
   Address: 123 Test Street
   Pincode: 560001
   ```
6. Select **"Cash on Delivery"**
7. Click **"Place Order"**
8. Wait 2-3 seconds

**Expected Result:** ✅ **Order Success page appears!**

**What to Check:**
- ✅ Order ID displayed
- ✅ Order details shown
- ✅ "Continue Shopping" button works
- ✅ Cart is now empty

**Even If Telegram Fails:**
- Order still saved in MongoDB
- You still see success page
- No "Failed to place order" error

---

## 🔍 Check Backend Logs (If Curious)

**To see Telegram notification status:**

1. Go to: https://vercel.com/dashboard
2. Click your **backend project** (quickmart-backend-six)
3. Click **"Deployments"**
4. Click latest deployment
5. Click **"View Function Logs"**
6. Look for:
   - ✅ "Telegram notification sent successfully"
   - ⚠️ "Telegram notification skipped: not_configured"
   - ❌ "Telegram notification error (non-critical)"

**Note:** Even if you see errors, orders still work!

---

## 📱 Mobile Testing

**Test on Your Phone:**
1. Open: https://quickmart-dbtlqj3j8-beeta1.vercel.app
2. Test all features above
3. Verify responsive design:
   - Login page stacks vertically
   - Admin dashboard buttons are tap-friendly
   - Policy pages are readable
   - Checkout form works

---

## ✅ All Tests Passed?

If all 5 tests work:
🎉 **Your upgrade is 100% successful!**

If something fails:
1. Check `MAJOR_UPGRADE_SUMMARY.md` for troubleshooting
2. Clear browser cache (Ctrl+Shift+R)
3. Wait 5 minutes for Vercel cache to update
4. Check Vercel deployment logs

---

## 🎯 Quick Feature Access

| Feature | URL |
|---------|-----|
| Homepage | https://quickmart-dbtlqj3j8-beeta1.vercel.app |
| Login (OTP) | /login |
| Admin Dashboard | /admin |
| Privacy Policy | /privacy-policy |
| Refund Policy | /refund-policy |
| Terms of Service | /terms-of-service |

---

## 🚨 Common Issues

### "Page Not Found" on Policy Pages:
- Wait 2-3 minutes for Vercel deploy
- Hard refresh (Ctrl+Shift+R)
- Check deployment status on Vercel

### Admin Delete/Toggle Not Working:
- Check browser console for errors
- Verify you're logged into Vercel
- Check backend deployment status

### OTP Alert Doesn't Show:
- Check if popup blocked
- Look in browser console
- Try different browser

### Checkout Still Says "Failed":
- Check MongoDB Network Access (allow 0.0.0.0/0)
- Verify Vercel backend deployed
- Check environment variables

---

**Happy Testing! 🎊**
