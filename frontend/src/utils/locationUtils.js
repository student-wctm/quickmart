/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Check if customer location is within delivery radius
 * @param {number} customerLat - Customer latitude
 * @param {number} customerLng - Customer longitude
 * @param {number} shopLat - Shop latitude
 * @param {number} shopLng - Shop longitude
 * @param {number} radiusKm - Delivery radius in kilometers
 * @returns {boolean} - True if within radius
 */
export const isWithinDeliveryRadius = (customerLat, customerLng, shopLat, shopLng, radiusKm = 10) => {
  const distance = calculateDistance(customerLat, customerLng, shopLat, shopLng);
  return distance <= radiusKm;
};

/**
 * Format coordinates for display
 */
export const formatCoordinates = (lat, lng) => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

/**
 * Get delivery time estimate based on distance
 * @param {number} distanceKm - Distance in kilometers
 * @returns {string} - Estimated delivery time
 */
export const getDeliveryTimeEstimate = (distanceKm) => {
  if (distanceKm <= 2) return '8-12 minutes';
  if (distanceKm <= 5) return '15-20 minutes';
  if (distanceKm <= 10) return '25-30 minutes';
  return '30-45 minutes';
};
