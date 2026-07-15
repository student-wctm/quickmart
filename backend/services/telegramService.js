const TELEGRAM_API_BASE = 'https://api.telegram.org/bot';

const formatOrderMessage = (order) => {
  const itemsList = order.orderItems
    .map((item) => `• ${item.name} x${item.quantity} — ₹${(item.price * item.quantity).toFixed(0)}`)
    .join('\n');

  const address = order.user.address?.street || 'Not provided';
  const pincode = order.user.address?.pincode ? `\nPincode: ${order.user.address.pincode}` : '';

  return (
    `🛒 *NEW ORDER RECEIVED!*\n\n` +
    `*Order ID:* ${order._id}\n` +
    `*Status:* ${order.status}\n\n` +
    `*Customer Details:*\n` +
    `Name: ${order.user.name}\n` +
    `Phone: ${order.user.phone}\n` +
    `Email: ${order.user.email}\n` +
    `Address: ${address}${pincode}\n\n` +
    `*Items Ordered:*\n${itemsList}\n\n` +
    `*Item Total:* ₹${order.totalPrice.toFixed(2)}\n` +
    `*Delivery Fee:* ₹${order.deliveryFee.toFixed(2)}\n` +
    `*Total Amount:* ₹${order.finalAmount.toFixed(2)}\n\n` +
    `*Payment Method:* ${order.paymentMethod}`
  );
};

export const sendOrderNotification = async (order) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Enhanced logging for debugging
  console.log('🔍 Telegram Configuration Check:');
  console.log('  - BOT_TOKEN exists:', !!botToken);
  console.log('  - BOT_TOKEN length:', botToken ? botToken.length : 0);
  console.log('  - BOT_TOKEN preview:', botToken ? `${botToken.substring(0, 10)}...` : 'NOT SET');
  console.log('  - CHAT_ID exists:', !!chatId);
  console.log('  - CHAT_ID value:', chatId || 'NOT SET');

  if (!botToken || !chatId) {
    console.warn('⚠️  Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
    return { success: false, reason: 'not_configured' };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const telegramUrl = `${TELEGRAM_API_BASE}${botToken}/sendMessage`;
    console.log('📤 Sending Telegram notification to:', telegramUrl.substring(0, 50) + '...');

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatOrderMessage(order),
        parse_mode: 'Markdown',
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    console.log('📥 Telegram API Response:');
    console.log('  - Status Code:', response.status);
    console.log('  - Response OK:', response.ok);
    console.log('  - Data:', JSON.stringify(data, null, 2));

    if (!response.ok || !data.ok) {
      const errorDetails = {
        status: response.status,
        error_code: data.error_code,
        description: data.description,
        raw: data
      };
      console.error('❌ Telegram API error:', JSON.stringify(errorDetails, null, 2));
      
      // Specific error handling
      if (response.status === 401 || data.description?.includes('Unauthorized')) {
        console.error('🚨 TELEGRAM ERROR: Invalid BOT_TOKEN! Please check your token from @BotFather');
      } else if (response.status === 400 && data.description?.includes('chat not found')) {
        console.error('🚨 TELEGRAM ERROR: Invalid CHAT_ID! Get your Chat ID from @userinfobot or @raw_data_bot');
      } else if (data.description?.includes('bot was blocked')) {
        console.error('🚨 TELEGRAM ERROR: Bot was blocked by the user. Please unblock and restart the bot');
      }
      
      return { success: false, reason: data.description || 'api_error', details: errorDetails };
    }

    console.log('✅ Telegram order notification sent successfully');
    return { success: true };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('❌ Telegram notification timeout (10s exceeded)');
      return { success: false, reason: 'timeout' };
    }
    console.error('❌ Failed to send Telegram notification:', error.message);
    console.error('❌ Error stack:', error.stack);
    return { success: false, reason: error.message };
  }
};
