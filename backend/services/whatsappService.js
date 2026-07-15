import twilio from 'twilio';

/**
 * Format order details into a clean, professional WhatsApp message
 */
const formatWhatsAppOrderMessage = (order) => {
  // Format items list
  const itemsList = order.orderItems
    .map((item, index) => `${index + 1}. ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toFixed(0)}`)
    .join('\n');

  // Format address
  const address = order.user.address?.street || 'Not provided';
  const pincode = order.user.address?.pincode ? `\nPincode: ${order.user.address.pincode}` : '';

  // Build the message
  const message = 
    `🛒 *NEW ORDER RECEIVED!*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📋 *Order Details*\n` +
    `Order ID: ${order._id}\n` +
    `Status: ${order.status}\n` +
    `Payment: ${order.paymentMethod}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `👤 *Customer Information*\n` +
    `Name: ${order.user.name}\n` +
    `Phone: ${order.user.phone}\n` +
    `Email: ${order.user.email}\n` +
    `Address: ${address}${pincode}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `📦 *Items Ordered*\n${itemsList}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `💰 *Payment Summary*\n` +
    `Subtotal: ₹${order.totalPrice.toFixed(2)}\n` +
    `Delivery: ₹${order.deliveryFee.toFixed(2)}\n` +
    `*TOTAL: ₹${order.finalAmount.toFixed(2)}*\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `⏰ Ordered at: ${new Date(order.createdAt || Date.now()).toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    })}\n\n` +
    `✅ Please prepare and dispatch the order.`;

  return message;
};

/**
 * Send WhatsApp notification for new order using Twilio
 */
export const sendWhatsAppOrderNotification = async (order) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Format: whatsapp:+14155238886
  const myWhatsAppNumber = process.env.MY_WHATSAPP_NUMBER; // Format: whatsapp:+919876543210

  // Enhanced logging for debugging
  console.log('🔍 WhatsApp/Twilio Configuration Check:');
  console.log('  - TWILIO_ACCOUNT_SID exists:', !!accountSid);
  console.log('  - TWILIO_ACCOUNT_SID preview:', accountSid ? `${accountSid.substring(0, 10)}...` : 'NOT SET');
  console.log('  - TWILIO_AUTH_TOKEN exists:', !!authToken);
  console.log('  - TWILIO_AUTH_TOKEN preview:', authToken ? `${authToken.substring(0, 10)}...` : 'NOT SET');
  console.log('  - TWILIO_WHATSAPP_NUMBER:', twilioWhatsAppNumber || 'NOT SET');
  console.log('  - MY_WHATSAPP_NUMBER:', myWhatsAppNumber || 'NOT SET');

  // Validate configuration
  if (!accountSid || !authToken) {
    console.warn('⚠️  WhatsApp notification skipped: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not configured');
    return { 
      success: false, 
      reason: 'missing_credentials',
      message: 'Twilio credentials not configured in environment variables'
    };
  }

  if (!twilioWhatsAppNumber || !myWhatsAppNumber) {
    console.warn('⚠️  WhatsApp notification skipped: Phone numbers not configured');
    return { 
      success: false, 
      reason: 'missing_phone_numbers',
      message: 'TWILIO_WHATSAPP_NUMBER or MY_WHATSAPP_NUMBER not configured'
    };
  }

  try {
    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    console.log('📤 Sending WhatsApp notification...');
    console.log('  - From:', twilioWhatsAppNumber);
    console.log('  - To:', myWhatsAppNumber);

    // Send the message
    const message = await client.messages.create({
      body: formatWhatsAppOrderMessage(order),
      from: twilioWhatsAppNumber,
      to: myWhatsAppNumber
    });

    console.log('✅ WhatsApp notification sent successfully!');
    console.log('  - Message SID:', message.sid);
    console.log('  - Status:', message.status);
    console.log('  - Date sent:', message.dateCreated);

    return { 
      success: true, 
      messageSid: message.sid,
      status: message.status
    };

  } catch (error) {
    console.error('❌ WhatsApp notification error:', error.message);
    console.error('  - Error code:', error.code);
    console.error('  - Error status:', error.status);
    console.error('  - More info:', error.moreInfo);

    // Specific error handling with helpful messages
    let troubleshootingTip = '';
    
    if (error.code === 20003) {
      troubleshootingTip = '🚨 Authentication failed - Check your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN';
    } else if (error.code === 21211) {
      troubleshootingTip = '🚨 Invalid "To" phone number - Check MY_WHATSAPP_NUMBER format (must include whatsapp: prefix)';
    } else if (error.code === 21212) {
      troubleshootingTip = '🚨 Invalid "From" phone number - Check TWILIO_WHATSAPP_NUMBER (must be your Twilio Sandbox number)';
    } else if (error.code === 21608) {
      troubleshootingTip = '🚨 Number not verified in Twilio Sandbox - Join the sandbox first by sending the code to your Twilio WhatsApp number';
    } else if (error.code === 63007) {
      troubleshootingTip = '🚨 WhatsApp message rejected - Check Twilio Sandbox status and template approval';
    }

    if (troubleshootingTip) {
      console.error(troubleshootingTip);
    }

    return { 
      success: false, 
      reason: error.code || 'twilio_error',
      message: error.message,
      troubleshooting: troubleshootingTip
    };
  }
};

/**
 * Test WhatsApp notification with a mock order
 */
export const testWhatsAppNotification = async () => {
  const mockOrder = {
    _id: 'TEST-' + Date.now(),
    user: {
      name: 'Test Customer',
      email: 'test@quickmart.com',
      phone: '+91 98765 43210',
      address: {
        street: '123 MG Road, Bangalore',
        pincode: '560001'
      }
    },
    orderItems: [
      {
        name: 'Fresh Milk (1L)',
        quantity: 2,
        price: 65
      },
      {
        name: 'Brown Bread',
        quantity: 1,
        price: 40
      }
    ],
    totalPrice: 170,
    deliveryFee: 30,
    finalAmount: 200,
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
    createdAt: new Date()
  };

  return await sendWhatsAppOrderNotification(mockOrder);
};
