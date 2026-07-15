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

// @desc    Validate location coordinates
// @route   POST /api/settings/validate-location
// @access  Public
export const validateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({
        valid: false,
        message: 'Latitude and longitude are required'
      });
    }

    const settings = await Settings.getSettings();
    
    // If no pincode restriction, check distance-based restriction
    if (!settings.allowedPincode || settings.allowedPincode.trim() === '') {
      // Open mode with distance check
      const shopLat = settings.storeLocation?.latitude || 26.8467;
      const shopLng = settings.storeLocation?.longitude || 80.9462;
      const maxRadius = settings.deliveryRadius || 10;

      const distance = calculateDistance(latitude, longitude, shopLat, shopLng);

      if (distance <= maxRadius) {
        return res.json({
          valid: true,
          openMode: true,
          distance: distance.toFixed(2),
          deliveryTime: getDeliveryTime(distance),
          message: 'Delivery available in your area'
        });
      } else {
        return res.json({
          valid: false,
          distance: distance.toFixed(2),
          maxRadius,
          message: `Location is ${distance.toFixed(1)}km away. We deliver within ${maxRadius}km radius only.`
        });
      }
    }

    // If pincode restriction exists, location validation happens after pincode check
    return res.json({
      valid: true,
      message: 'Location validation requires pincode check first'
    });

  } catch (error) {
    console.error('Error validating location:', error);
    res.status(500).json({
      valid: false,
      message: 'Failed to validate location',
      error: error.message
    });
  }
};

// Helper: Calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (degrees) => degrees * (Math.PI / 180);

const getDeliveryTime = (distanceKm) => {
  if (distanceKm <= 2) return '8-12 minutes';
  if (distanceKm <= 5) return '15-20 minutes';
  if (distanceKm <= 10) return '25-30 minutes';
  return '30-45 minutes';
};
