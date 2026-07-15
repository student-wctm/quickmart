import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendWhatsAppOrderNotification, testWhatsAppNotification } from '../services/whatsappService.js';

// @desc    Test WhatsApp notification (for debugging)
// @route   GET /api/orders/test-whatsapp
// @access  Public
export const testWhatsAppNotificationEndpoint = async (req, res) => {
  try {
    console.log('🧪 Testing WhatsApp notification...');
    
    const result = await testWhatsAppNotification();
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: '✅ Test WhatsApp notification sent successfully! Check your WhatsApp.',
        messageSid: result.messageSid,
        status: result.status
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: '❌ Failed to send test WhatsApp notification',
        reason: result.reason,
        error: result.message,
        troubleshooting: result.troubleshooting || {
          'missing_credentials': 'Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in Vercel environment variables',
          'missing_phone_numbers': 'Set TWILIO_WHATSAPP_NUMBER (like whatsapp:+14155238886) and MY_WHATSAPP_NUMBER (like whatsapp:+919876543210)',
          '20003': 'Invalid Twilio credentials - Check your Account SID and Auth Token',
          '21608': 'Phone number not verified in Twilio Sandbox - Join the sandbox first',
          '21211': 'Invalid recipient phone number format',
          '21212': 'Invalid sender phone number - Must be your Twilio WhatsApp Sandbox number'
        }
      });
    }
  } catch (error) {
    console.error('Test WhatsApp notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during WhatsApp test',
      error: error.message 
    });
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
export const createOrder = async (req, res) => {
  try {
    const { user, orderItems, totalPrice, deliveryFee, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // Calculate final amount
    const finalAmount = totalPrice + (deliveryFee || 0);

    const order = new Order({
      user,
      orderItems,
      totalPrice,
      deliveryFee,
      finalAmount,
      paymentMethod,
    });

    const createdOrder = await order.save();

    // Update product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        if (product.stock <= 0) {
          product.inStock = false;
        }
        await product.save();
      }
    }

    // Send WhatsApp notification (non-blocking, with error handling)
    sendWhatsAppOrderNotification(createdOrder)
      .then((result) => {
        if (result.success) {
          console.log('✅ WhatsApp notification sent successfully');
        } else {
          console.warn('⚠️  WhatsApp notification skipped or failed:', result.reason);
          console.warn('⚠️  Details:', result.message);
        }
      })
      .catch((err) => {
        console.error('❌ WhatsApp notification error (non-critical):', err.message);
      });

    // Always return success response even if WhatsApp fails
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('orderItems.product');

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public (should be protected in production)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('orderItems.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Public (should be protected in production)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;

      if (status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
