import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

// Initialize Razorpay instance lazily
let razorpayInstance = null;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials not found in environment variables');
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Public
export const createRazorpayOrder = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    // Amount should be in smallest currency unit (paise for INR)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order',
      error: error.message,
    });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
// @access  Public
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification parameters',
      });
    }

    // Generate signature for verification
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    // Compare signatures
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order with payment details
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentMethod = 'Razorpay';
          order.paymentDetails = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          };
          await order.save();
        }
      }

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        razorpay_order_id,
        razorpay_payment_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification error',
      error: error.message,
    });
  }
};

// @desc    Get payment details
// @route   GET /api/payments/:paymentId
// @access  Public
export const getPaymentDetails = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    const { paymentId } = req.params;

    const payment = await razorpay.payments.fetch(paymentId);

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message,
    });
  }
};

// @desc    Initiate refund
// @route   POST /api/payments/refund
// @access  Public (should be protected in production)
export const initiateRefund = async (req, res) => {
  try {
    const razorpay = getRazorpayInstance();
    const { paymentId, amount } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: 'Payment ID is required' });
    }

    const refundOptions = {
      payment_id: paymentId,
    };

    if (amount) {
      refundOptions.amount = Math.round(amount * 100); // Convert to paise
    }

    const refund = await razorpay.payments.refund(paymentId, refundOptions);

    res.status(200).json({
      success: true,
      message: 'Refund initiated successfully',
      refund,
    });
  } catch (error) {
    console.error('Error initiating refund:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate refund',
      error: error.message,
    });
  }
};
