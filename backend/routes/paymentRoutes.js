import express from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails,
  initiateRefund,
} from '../controllers/paymentController.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', createRazorpayOrder);

// Verify payment signature
router.post('/verify', verifyPayment);

// Get payment details
router.get('/:paymentId', getPaymentDetails);

// Initiate refund
router.post('/refund', initiateRefund);

export default router;
