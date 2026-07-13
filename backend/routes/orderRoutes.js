import express from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(updateOrderStatus);

export default router;
