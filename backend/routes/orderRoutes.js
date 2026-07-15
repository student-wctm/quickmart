import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  testWhatsAppNotificationEndpoint,
} from '../controllers/orderController.js';

const router = express.Router();

// Test route - should be placed BEFORE parameterized routes
router.get('/test-whatsapp', testWhatsAppNotificationEndpoint);

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(updateOrderStatus);

export default router;
