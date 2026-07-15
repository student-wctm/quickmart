import Settings from '../models/Settings.js';

// @desc    Get current settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Failed to fetch settings', error: error.message });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Public (should be protected in production)
export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    
    // Clean up allowedPincode - trim whitespace
    if (updates.allowedPincode !== undefined) {
      updates.allowedPincode = updates.allowedPincode.trim();
    }
    
    const settings = await Settings.updateSettings(updates);
    
    res.json({
      message: 'Settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Failed to update settings', error: error.message });
  }
};

// @desc    Check if pincode is allowed
// @route   POST /api/settings/validate-pincode
// @access  Public
export const validatePincode = async (req, res) => {
  try {
    const { pincode } = req.body;
    
    if (!pincode) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Pincode is required' 
      });
    }
    
    const settings = await Settings.getSettings();
    const allowedPincode = settings.allowedPincode.trim();
    
    // If allowedPincode is empty, "Open Mode" - all pincodes allowed
    if (!allowedPincode) {
      return res.json({
        valid: true,
        openMode: true,
        message: 'Delivery available everywhere',
      });
    }
    
    // Check if customer's pincode matches allowed pincode
    const customerPincode = pincode.trim();
    const isValid = customerPincode === allowedPincode;
    
    if (isValid) {
      return res.json({
        valid: true,
        openMode: false,
        message: 'Delivery available in your area',
      });
    } else {
      return res.json({
        valid: false,
        openMode: false,
        allowedPincode: allowedPincode,
        message: `Delivery Unavailable: We are currently delivering only in pincode ${allowedPincode}!`,
      });
    }
  } catch (error) {
    console.error('Error validating pincode:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Failed to validate pincode', 
      error: error.message 
    });
  }
};
