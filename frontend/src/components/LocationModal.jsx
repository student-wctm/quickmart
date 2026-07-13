import React, { useState } from 'react';
import { FiX, FiMapPin, FiNavigation, FiSearch } from 'react-icons/fi';

const LocationModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [manualAddress, setManualAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    setLoading(true);
    setError('');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Use reverse geocoding to get address
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            
            const address = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            onLocationSelect(address);
            setLoading(false);
            handleClose();
          } catch (err) {
            setError('Failed to get address. Please enter manually.');
            setLoading(false);
          }
        },
        (err) => {
          setError('Location access denied. Please enter manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported. Please enter manually.');
      setLoading(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualAddress.trim()) {
      setError('Please enter a delivery address');
      return;
    }
    onLocationSelect(manualAddress.trim());
    handleClose();
  };

  const handleClose = () => {
    setManualAddress('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-green-600 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition"
          >
            <FiX className="text-xl" />
          </button>
          <div className="flex items-center space-x-3">
            <FiMapPin className="text-3xl" />
            <div>
              <h2 className="text-2xl font-bold">Select Location</h2>
              <p className="text-green-100 text-sm">Choose your delivery address</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Use Current Location Button */}
          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiNavigation className={`text-xl ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Getting Location...' : 'Use Current Location'}</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>

          {/* Manual Address Input */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Delivery Address
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Enter your address, street, landmark..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Confirm Location
            </button>
          </form>

          {/* Saved Addresses (Optional) */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">Recent Locations</p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onLocationSelect('Home - 123 Main Street, Bangalore');
                  handleClose();
                }}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-start space-x-2">
                  <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Home</p>
                    <p className="text-xs text-gray-500">123 Main Street, Bangalore</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  onLocationSelect('Work - Tech Park, Whitefield, Bangalore');
                  handleClose();
                }}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-start space-x-2">
                  <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">Work</p>
                    <p className="text-xs text-gray-500">Tech Park, Whitefield, Bangalore</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
