import express from 'express';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  seedProducts,
  addProduct,
} from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.route('/').get(getProducts).post(createProduct);
router.route('/seed').post(seedProducts);
router.route('/add').post(upload.single('image'), addProduct);
router.route('/category/:category').get(getProductsByCategory);
router.route('/:id').get(getProductById);

export default router;
