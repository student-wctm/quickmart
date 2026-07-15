# 📱 WhatsApp Notification Setup Guide (Twilio)

This guide will help you set up WhatsApp notifications for your QuickMart e-commerce platform using Twilio.

---

## 🚀 Quick Start Steps

### Step 1: Create a Twilio Account

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up for a **free trial account** (you get free credits!)
3. Verify your email and phone number

### Step 2: Get Your Twilio Credentials

1. After logging in, go to your **Twilio Console**: [https://console.twilio.com/](https://console.twilio.com/)
2. On the dashboard, you'll see:
   - **Account SID** (looks like: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
   - **Auth Token** (click "View" to reveal it)
3. Copy both values - you'll need them later

### Step 3: Activate Twilio WhatsApp Sandbox

1. Go to **WhatsApp Sandbox**: [https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
2. You'll see a **Twilio WhatsApp number** (like `+1 415 523 8886`)
3. You'll also see a **join code** (like `join your-sandbox-name`)
4. **Important:** Open WhatsApp on your phone and:
   - Send a message to the Twilio WhatsApp number
   - Message content: `join your-sandbox-name` (use the exact code shown)
   - You'll receive a confirmation message
5. Copy your **Twilio WhatsApp Sandbox Number** (format: `+14155238886`)

### Step 4: Get Your Personal WhatsApp Number

Your WhatsApp number is simply your phone number with country code.

**Format examples:**
- 🇮🇳 India: `+919876543210` (no spaces, no dashes)
- 🇺🇸 USA: `+11234567890`
- 🇬🇧 UK: `+441234567890`

---

## ⚙️ Configuration

### For Local Development

Edit your `backend/.env` file and add:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
MY_WHATSAPP_NUMBER=whatsapp:+919876543210
```

**Important Notes:**
- Add `whatsapp:` prefix to both phone numbers
- No spaces in phone numbers
- Replace with your actual credentials

### For Vercel Production

1. Go to your backend project on Vercel:
   - [https://vercel.com/student-wctm/quickmart-backend-six/settings/environment-variables](https://vercel.com/student-wctm/quickmart-backend-six/settings/environment-variables)

2. Add these **4 environment variables**:

   | Variable Name | Value | Example |
   |---------------|-------|---------|
   | `TWILIO_ACCOUNT_SID` | Your Account SID from Twilio Console | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
   | `TWILIO_AUTH_TOKEN` | Your Auth Token from Twilio Console | `your_auth_token_here` |
   | `TWILIO_WHATSAPP_NUMBER` | Twilio Sandbox WhatsApp number with prefix | `whatsapp:+14155238886` |
   | `MY_WHATSAPP_NUMBER` | Your personal WhatsApp number with prefix | `whatsapp:+919876543210` |

3. After adding all variables, click **"Save"**

4. Go to the **Deployments** tab and click **"Redeploy"** to apply the new environment variables

---

## 🧪 Testing the Integration

### Method 1: Test Endpoint (Easiest)

1. Wait 2-3 minutes after Vercel deployment
2. Open this URL in your browser:
   ```
   https://quickmart-backend-six.vercel.app/api/orders/test-whatsapp
   ```
3. Check the response:
   - ✅ **Success**: You'll receive a test order notification on WhatsApp
   - ❌ **Error**: The response will tell you what's wrong and how to fix it

### Method 2: Place a Real Order

1. Go to your website: [https://quickmart-orpin.vercel.app/](https://quickmart-orpin.vercel.app/)
2. Add items to cart
3. Complete checkout with any address
4. You should receive a WhatsApp notification instantly!

---

## 🔍 Troubleshooting

### Error: "missing_credentials"
**Problem:** Twilio Account SID or Auth Token not set

**Solution:**
1. Check you've added both `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` to Vercel
2. Make sure there are no extra spaces in the values
3. Redeploy after adding them

---

### Error: "missing_phone_numbers"
**Problem:** Phone numbers not configured

**Solution:**
1. Make sure you've added both `TWILIO_WHATSAPP_NUMBER` and `MY_WHATSAPP_NUMBER`
2. Check the format includes `whatsapp:` prefix
3. Example: `whatsapp:+919876543210` (not just `+919876543210`)

---

### Error Code: 20003 - "Authentication Error"
**Problem:** Invalid Twilio credentials

**Solution:**
1. Go back to [Twilio Console](https://console.twilio.com/)
2. Copy the Account SID and Auth Token again
3. Make sure you're copying the LIVE credentials, not TEST credentials
4. Update in Vercel and redeploy

---

### Error Code: 21608 - "Phone number not verified"
**Problem:** You haven't joined the Twilio WhatsApp Sandbox

**Solution:**
1. Open WhatsApp on your phone
2. Send `join your-sandbox-name` to the Twilio WhatsApp number
3. Wait for confirmation message
4. Try the test endpoint again

---

### Error Code: 21211 - "Invalid 'To' phone number"
**Problem:** Your WhatsApp number format is wrong

**Solution:**
1. Check `MY_WHATSAPP_NUMBER` has correct format
2. Must start with `whatsapp:+` followed by country code and number
3. No spaces, dashes, or brackets
4. Examples:
   - ✅ Correct: `whatsapp:+919876543210`
   - ❌ Wrong: `+91 98765 43210`
   - ❌ Wrong: `whatsapp:9876543210` (missing country code)

---

### Error Code: 21212 - "Invalid 'From' phone number"
**Problem:** Twilio WhatsApp Sandbox number is wrong

**Solution:**
1. Go to [WhatsApp Sandbox page](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn)
2. Copy the exact number shown (usually `+1 415 523 8886`)
3. Format it as: `whatsapp:+14155238886` (remove spaces)
4. Update in Vercel and redeploy

---

### Still Not Working?

Check Vercel Function Logs:
1. Go to [https://vercel.com/student-wctm/quickmart-backend-six/logs](https://vercel.com/student-wctm/quickmart-backend-six/logs)
2. Look for logs with emojis:
   - 🔍 = Configuration check
   - 📤 = Sending notification
   - ✅ = Success
   - ❌ = Error with details
3. The logs will tell you exactly what's wrong

---

## 📊 What the WhatsApp Message Looks Like

When an order is placed, you'll receive a message like this:

```
🛒 NEW ORDER RECEIVED!

━━━━━━━━━━━━━━━━━━━━━━

📋 Order Details
Order ID: 65a1b2c3d4e5f6g7h8i9j0k1
Status: Pending
Payment: Cash on Delivery

━━━━━━━━━━━━━━━━━━━━━━

👤 Customer Information
Name: John Doe
Phone: +91 98765 43210
Email: john@example.com
Address: 123 MG Road, Bangalore
Pincode: 560001

━━━━━━━━━━━━━━━━━━━━━━

📦 Items Ordered
1. Fresh Milk (1L) × 2 — ₹130
2. Brown Bread × 1 — ₹40

━━━━━━━━━━━━━━━━━━━━━━

💰 Payment Summary
Subtotal: ₹170.00
Delivery: ₹30.00
TOTAL: ₹200.00

━━━━━━━━━━━━━━━━━━━━━━

⏰ Ordered at: Jan 13, 2025, 2:30 PM

✅ Please prepare and dispatch the order.
```

---

## 💰 Twilio Free Trial Limits

- **Free Credits:** $15.50 USD (when you sign up)
- **WhatsApp Cost:** ~$0.005 per message (very cheap!)
- **Sandbox Limitation:** Can only send to verified numbers (numbers that joined your sandbox)
- **Production:** To send to any WhatsApp number, you need to:
  1. Upgrade to a paid account
  2. Request WhatsApp Business API approval
  3. Get message templates approved

For a personal business store, the **free sandbox is perfect** - you only need notifications for yourself!

---

## 🎯 Next Steps

1. ✅ Complete the setup above
2. ✅ Test with the test endpoint
3. ✅ Place a real order to verify
4. ✅ Keep your Twilio credits balance in check
5. 🚀 Enjoy instant WhatsApp order notifications!

---

## 📞 Need Help?

- Twilio Documentation: [https://www.twilio.com/docs/whatsapp](https://www.twilio.com/docs/whatsapp)
- Twilio Support: [https://support.twilio.com/](https://support.twilio.com/)
- Check Vercel logs for detailed error messages
