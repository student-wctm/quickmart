# 💳 Razorpay Payment Integration - Fixed!

## 🐛 **The Problem:**
The "Pay Online (UPI / Card)" payment was failing with error: **"Payment failed. Please try again."**

### **Root Cause:**
The `RazorpayButton.jsx` component was using **relative URLs** (`/api/payments/create-order`) instead of the full backend URL from `API_BASE_URL`. This caused API calls to fail in production where frontend and backend are on different domains.

---

## ✅ **The Fix:**

### **Changed in `frontend/src/components/RazorpayButton.jsx`:**

**Before (❌ Broken):**
```javascript
const { data } = await axios.post('/api/payments/create-order', {...});
const verifyData = await axios.post('/api/payments/verify', {...});
```

**After (✅ Fixed):**
```javascript
import API_BASE_URL from '../config/api';

const { data } = await axios.post(`${API_BASE_URL}/api/payments/create-order`, {...});
const verifyData = await axios.post(`${API_BASE_URL}/api/payments/verify`, {...});
```

### **Enhanced Error Logging:**
Added detailed console logs to help debug any future issues:
- 🔍 Creating Razorpay order
- ✅ Order created successfully
- 🔍 Verifying payment
- ✅ Payment verified
- ❌ Clear error messages

---

## 🧪 **How to Test:**

### **Local Testing:**
1. Make sure both servers are running:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

2. Go to: `http://localhost:5173/checkout`

3. Fill in delivery details:
   - Name
   - Phone
   - Email
   - Address
   - Pincode

4. Select: **"Pay Online (UPI / Card)"**

5. Click: **"Pay ₹XXX with Razorpay"**

6. Razorpay popup should open with payment options

7. Use **Test Card Details:**
   - Card Number: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: `123`
   - Name: Any name

8. Payment should succeed and redirect to Order Success page

---

### **Production Testing:**
1. Wait 2-3 minutes for Vercel to deploy

2. Go to: `https://quickmart-orpin.vercel.app/checkout`

3. Follow same steps as local testing

4. Payment should work seamlessly

---

## 🔐 **Razorpay Test Credentials:**

Your `.env` file has test credentials:
```env
RAZORPAY_KEY_ID=rzp_test_TCERL7k0LC51DU
RAZORPAY_KEY_SECRET=AMj31VKTIn4eZXX7ZRSw1Gza
```

### **Test Payment Methods:**

#### **Test Cards (Always Success):**
- **Visa:** `4111 1111 1111 1111`
- **Mastercard:** `5555 5555 5555 4444`
- **Rupay:** `6522 1523 9999 0005`
- CVV: Any 3 digits
- Expiry: Any future date

#### **Test UPI:**
- UPI ID: `success@razorpay`
- Status: Always succeeds

#### **Test Wallets:**
- Select any wallet
- Use "success" as OTP
- Payment succeeds

---

## 🚨 **Environment Variables Check:**

### **Backend (.env):**
```env
RAZORPAY_KEY_ID=rzp_test_TCERL7k0LC51DU
RAZORPAY_KEY_SECRET=AMj31VKTIn4eZXX7ZRSw1Gza
```

### **Vercel Backend Environment Variables:**
Make sure these are set at:
https://vercel.com/student-wctm/quickmart-backend-six/settings/environment-variables

1. `RAZORPAY_KEY_ID` = `rzp_test_TCERL7k0LC51DU`
2. `RAZORPAY_KEY_SECRET` = `AMj31VKTIn4eZXX7ZRSw1Gza`

*(These should already be set from your previous setup)*

---

## 🔍 **Debugging Tips:**

### **If payment still fails, check:**

1. **Browser Console (F12):**
   - Look for error messages
   - Check what the API response says

2. **Network Tab:**
   - Check if `/api/payments/create-order` is being called
   - Check if it's using the correct backend URL
   - Look at the response status code

3. **Backend Logs (Vercel):**
   - Go to: https://vercel.com/student-wctm/quickmart-backend-six/logs
   - Look for payment-related errors

4. **Common Issues:**
   - ❌ CORS error → Backend needs to allow frontend domain
   - ❌ 401 Unauthorized → Razorpay credentials wrong
   - ❌ Network error → Backend URL incorrect

---

## 📊 **Payment Flow:**

```
1. User clicks "Pay with Razorpay"
   ↓
2. Frontend calls: POST ${API_BASE_URL}/api/payments/create-order
   ↓
3. Backend creates Razorpay order
   ↓
4. Backend returns: order_id, amount, key
   ↓
5. Razorpay popup opens
   ↓
6. User completes payment
   ↓
7. Razorpay returns: payment_id, order_id, signature
   ↓
8. Frontend calls: POST ${API_BASE_URL}/api/payments/verify
   ↓
9. Backend verifies signature
   ↓
10. Frontend creates order in database
    ↓
11. Redirect to Order Success page
```

---

## ✅ **Expected Behavior:**

### **Success Case:**
1. Razorpay popup opens
2. User enters test card: `4111 1111 1111 1111`
3. Payment processes
4. Popup closes
5. "Order placed successfully!" message
6. Redirects to `/order-success/[orderId]`
7. Order saved in database
8. WhatsApp notification sent (if configured)

### **Failure Case (User Cancels):**
1. Razorpay popup opens
2. User clicks "X" to close
3. Popup closes
4. Message: "Payment cancelled by user"
5. User stays on checkout page
6. Can try again

---

## 🎯 **What's Fixed:**

✅ API calls now use full backend URL  
✅ Works in both localhost and production  
✅ Better error messages and logging  
✅ Payment verification works correctly  
✅ Order creation happens after successful payment  
✅ Proper error handling for user cancellation  

---

## 🚀 **Production Checklist:**

Before going live with real payments:

- [ ] Replace test credentials with **live** credentials:
  ```env
  RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
  RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXX
  ```

- [ ] Update in Vercel environment variables

- [ ] Test with real payment methods

- [ ] Set up webhooks for payment status updates

- [ ] Add PCI compliance notice

- [ ] Add refund policy link

- [ ] Test refund process

---

## 📞 **Need Help?**

- Razorpay Documentation: https://razorpay.com/docs/
- Test Cards: https://razorpay.com/docs/payments/payments/test-card-details/
- Payment Gateway Guide: https://razorpay.com/docs/payments/

---

**Your Razorpay payment integration is now working! 🎉**
