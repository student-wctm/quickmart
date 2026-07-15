import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  testTelegramNotification,
} from '../controllers/orderController.js';

const router = express.Router();

// Test route - should be placed BEFORE parameterized routes
router.get('/test-telegram', testTelegramNotification);

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(updateOrderStatus);

export default router;
