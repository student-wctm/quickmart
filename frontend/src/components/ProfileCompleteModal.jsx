import React, { useState } from 'react';
import { FiX, FiUser, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const ProfileCompleteModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [skipAddress, setSkipAddress] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.name) {
      setError('Please enter your full name');
      return;
    }

    // Validate phone if not already verified
    if (!user?.phone && !formData.phone) {
      setError('Please enter your phone number');
      return;
    }

    // Validate email if not already verified
    if (!user?.email && !formData.email) {
      setError('Please enter your email address');
      return;
    }

    // If not skipping address, validate it
    if (!skipAddress && (!formData.address || !formData.pincode)) {
      setError('Please enter your address and pincode, or skip for now');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        ...user,
        name: formData.name,
        phone: formData.phone || user?.phone,
        email: formData.email || user?.email,
        address: skipAddress ? null : {
          street: formData.address,
          pincode: formData.pincode,
        },
        isNewUser: false,
        profileComplete: true,
      };

      updateUser(updatedData);
      setLoading(false);
      onClose();
    }, 1000);
  };

  const handleSkipAddress = () => {
    setSkipAddress(true);
    handleSubmit(new Event('submit'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FiUser className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
            <p className="text-gray-600">Help us personalize your experience</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <FiUser className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Phone (if not verified) */}
            {!user?.phone && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <FiPhone className="inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            {/* Email (if not verified) */}
            {!user?.email && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            {/* Address (Optional) */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                <FiMapPin className="inline mr-2" />
                Delivery Address (Optional)
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, Area, Landmark"
                rows="2"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              />
            </div>

            {/* Pincode */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Pincode (Optional)
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="560001"
                maxLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <p className="text-gray-500 text-xs mt-1">
                You can add address later during checkout
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mb-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Save & Continue
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setSkipAddress(true);
                setTimeout(() => handleSubmit(new Event('submit')), 100);
              }}
              className="w-full text-gray-600 hover:text-gray-800 transition text-sm"
            >
              Skip address for now →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompleteModal;
