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

  if (!botToken || !chatId) {
    console.warn('Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured');
    return { success: false, reason: 'not_configured' };
  }

  try {
    const response = await fetch(`${TELEGRAM_API_BASE}${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatOrderMessage(order),
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data.description || 'Unknown error');
      return { success: false, reason: data.description };
    }

    console.log('Telegram order notification sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Failed to send Telegram notification:', error.message);
    return { success: false, reason: error.message };
  }
};
