import express from 'express';
import {
  getSettings,
  updateSettings,
  validatePincode,
  validateLocation,
} from '../controllers/settingsController.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/validate-pincode', validatePincode);
router.post('/validate-location', validateLocation);

export default router;
