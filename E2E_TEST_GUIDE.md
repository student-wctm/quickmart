# 🧪 E2E Testing Guide for QuickMart

## 🎯 Purpose

This automated test script will:
1. ✅ Navigate to your live website
2. ✅ Add products to cart
3. ✅ Fill checkout form
4. ✅ Place order
5. ✅ Capture all API requests/responses
6. ✅ Verify Telegram notification trigger
7. ✅ Take screenshots at each step
8. ✅ Log detailed network activity

---

## 📦 Installation

### Step 1: Install Dependencies

Open PowerShell/CMD in your project folder:

```bash
cd C:\Users\akhil\Desktop\blinkit2
```

Install Playwright:

```bash
npm install
```

Install Playwright browsers (one-time):

```bash
npx playwright install chromium
```

---

## 🚀 Running the Tests

### Option 1: Full Visual Test (Recommended for First Run)

This opens a browser so you can see what's happening:

```bash
npm run test:e2e
```

**What you'll see:**
- Browser window opens
- Automatically navigates and clicks
- Forms get filled
- Order is placed
- Detailed logs in terminal
- Screenshots saved

### Option 2: Quick Headless Test

Faster test without browser UI:

```bash
npm run test:headless
```

**What it does:**
- Tests homepage
- Tests backend API
- Directly tests order creation API
- Logs results to terminal

### Option 3: Direct Node Command

```bash
node e2e-test.js
```

---

## 📊 Understanding the Output

### Success Output:

```
🚀 Starting QuickMart E2E Test...

Step 1: Navigating to homepage...
✅ Homepage loaded

Step 2: Checking if products are loaded...
   Found 37 product cards
✅ Products are loaded

Step 3: Adding product to cart...
✅ Product added to cart

...

Step 8: Placing order...
   Listening for API response...

📥 Order API Response:
   Status: 201
   Body: {
     "_id": "6a520d...",
     "user": {...},
     "orderItems": [...]
   }

✅ Order placed successfully!
   Order ID: 6a520d...

🎉 TEST PASSED: Order completed successfully!
📱 Check your Telegram for notification
```

### Failure Output:

```
❌ Order failed with status: 400
   Response: {
     "message": "MongoDB connection failed"
   }

🔍 Possible issues:
   1. MongoDB connection error
   2. Missing environment variables
   3. CORS configuration issue
   4. Telegram credentials missing
```

---

## 📸 Screenshots Generated

The test automatically saves screenshots:

| File | When Captured | Purpose |
|------|---------------|---------|
| `checkout-form-filled.png` | After filling form | Verify form data |
| `order-success.png` | After successful order | Success confirmation |
| `order-error.png` | On order failure | Error state |
| `error-no-products.png` | If no products load | Frontend issue |
| `test-error.png` | On any test failure | Debug info |

---

## 🔍 What the Test Checks

### Frontend Checks:
- [ ] Homepage loads
- [ ] Products are visible
- [ ] Add to cart works
- [ ] Cart page accessible
- [ ] Checkout form renders
- [ ] Form inputs work
- [ ] Submit button clickable

### Backend Checks:
- [ ] Backend health endpoint responds
- [ ] Products API returns data
- [ ] Order API accepts POST request
- [ ] Order saved to database
- [ ] Telegram notification triggered
- [ ] Correct HTTP status returned

### Network Checks:
- [ ] CORS headers present
- [ ] API calls succeed
- [ ] Response format correct
- [ ] Error messages clear

---

## 🐛 Troubleshooting

### Error: "No products found on homepage"

**Cause:** Frontend missing `VITE_API_URL` environment variable

**Fix:**
1. Go to Vercel → Frontend Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://quickmart-backend-six.vercel.app`
3. Redeploy frontend

### Error: "Failed to place order"

**Cause:** Backend issue (MongoDB, env vars, CORS)

**Fix:**
1. Check Vercel backend logs (see `CHECK_VERCEL_LOGS.md`)
2. Verify all environment variables:
   - MONGODB_URI
   - TELEGRAM_BOT_TOKEN
   - TELEGRAM_CHAT_ID
   - NODE_ENV
   - PORT

### Error: "Timeout waiting for response"

**Cause:** API request taking too long or failing silently

**Fix:**
1. Check network tab in browser DevTools
2. Verify backend is accessible: `https://quickmart-backend-six.vercel.app`
3. Check Vercel function logs for errors

### Error: "Cannot find module 'playwright'"

**Cause:** Dependencies not installed

**Fix:**
```bash
npm install
npx playwright install chromium
```

---

## 📋 Test Configuration

Edit `e2e-test.js` to customize:

```javascript
const CONFIG = {
  frontendUrl: 'https://quickmart-orpin.vercel.app',
  backendUrl: 'https://quickmart-backend-six.vercel.app',
  headless: false,  // Set to true for headless mode
  slowMo: 500,      // Adjust speed (ms)
};

const DUMMY_USER = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  address: '123 Test Street, Test City',
  pincode: '560001',
};
```

---

## 📊 Advanced: Network Logging

The test captures all network activity:

```
📤 Request: POST https://quickmart-backend-six.vercel.app/api/orders
📥 Response: 201 https://quickmart-backend-six.vercel.app/api/orders
   Body: {
     "_id": "6a520d...",
     "status": "Pending",
     ...
   }
```

This helps debug:
- CORS issues
- Request/response format
- Error messages
- Status codes

---

## 🎯 Debugging Backend Issues

### 1. Check Environment Variables

Run this test to verify backend config:

```bash
curl https://quickmart-backend-six.vercel.app/
```

Should return:
```json
{"message": "Quick-Commerce API is running..."}
```

### 2. Test Products API

```bash
curl https://quickmart-backend-six.vercel.app/api/products
```

Should return array of 37 products.

### 3. Test Order API Directly

```bash
curl -X POST https://quickmart-backend-six.vercel.app/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "name": "Test",
      "email": "test@test.com",
      "phone": "1234567890",
      "address": {"street": "123 St", "pincode": "12345"}
    },
    "orderItems": [
      {
        "product": "6a520d035f9bbf8f43d271be",
        "name": "Potato",
        "quantity": 1,
        "price": 30,
        "image": "https://..."
      }
    ],
    "totalPrice": 30,
    "deliveryFee": 30,
    "paymentMethod": "Cash on Delivery"
  }'
```

This bypasses frontend and tests backend directly!

---

## 🔐 Security Note

The test uses **dummy data** - no real personal information is submitted.

Dummy data used:
- Name: Test User
- Email: test@example.com
- Phone: 9876543210
- Address: 123 Test Street

This is safe for testing!

---

## 📞 Next Steps After Running Test

### If Test Passes:
1. ✅ Frontend is working
2. ✅ Backend is working
3. ✅ Order creation works
4. ✅ Check Telegram for notification
5. ✅ Your app is production-ready!

### If Test Fails:
1. ❌ Note the error message
2. ❌ Check screenshot files
3. ❌ Follow `CHECK_VERCEL_LOGS.md` guide
4. ❌ Review environment variables
5. ❌ Fix the issue and re-run test

---

## 🎯 Common Issues & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| No products | Missing VITE_API_URL | Add to frontend env vars |
| Order fails | MongoDB connection | Check MONGODB_URI |
| CORS error | Frontend not allowed | Update server.js CORS |
| Telegram fails | Missing bot token | Add TELEGRAM_BOT_TOKEN |
| 401 Unauthorized | Wrong credentials | Verify MongoDB password |
| 500 Server Error | Backend crash | Check Vercel logs |

---

## 💡 Pro Tips

### Run Multiple Tests

```bash
# Run 5 times to test consistency
for i in {1..5}; do npm run test:headless; done
```

### Save Logs to File

```bash
npm run test:e2e > test-results.log 2>&1
```

### Test Different Scenarios

Edit `DUMMY_USER` in `e2e-test.js` to test:
- Different phone numbers
- Different addresses
- International pincodes
- Edge cases

---

## 📚 Additional Resources

- **Playwright Docs**: https://playwright.dev/
- **Check Logs Guide**: See `CHECK_VERCEL_LOGS.md`
- **Fix Checkout Guide**: See `VERCEL_FIX_CHECKOUT.md`

---

## ✅ Success Criteria

Your test passes when:

1. ✅ All 10 steps complete
2. ✅ Order API returns 201 status
3. ✅ Order ID is returned
4. ✅ Telegram notification received
5. ✅ No error screenshots generated
6. ✅ Console shows: "🎉 TEST PASSED"

---

**Run the test now and share the output - I'll help you fix any issues!** 🚀

```bash
npm run test:e2e
```
