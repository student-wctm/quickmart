import express from 'express';
import {
  getSettings,
  updateSettings,
  validatePincode,
} from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/validate-pincode', validatePincode);

export default router;
