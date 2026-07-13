import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  seedProducts,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/seed').post(seedProducts);
router.route('/category/:category').get(getProductsByCategory);
router.route('/:id').get(getProductById);

export default router;
