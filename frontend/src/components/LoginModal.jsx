import React, { useState } from 'react';
import { FiX, FiUser, FiPhone, FiLock } from 'react-icons/fi';

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1); // 1: Phone & Name, 2: OTP
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
  });
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Generate mock 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    console.log('Generated OTP:', otp); // For testing
    alert(`Your OTP is: ${otp}`); // For testing (remove in production)
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setError('');

    if (formData.otp !== generatedOTP) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    // Login successful
    onLoginSuccess({
      name: formData.name,
      phone: formData.phone,
    });

    // Reset and close
    setFormData({ name: '', phone: '', otp: '' });
    setStep(1);
    setGeneratedOTP('');
    onClose();
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', otp: '' });
    setStep(1);
    setGeneratedOTP('');
    setError('');
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
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 ? 'Welcome to QuickMart' : 'Verify OTP'}
          </h2>
          <p className="text-green-100 text-sm">
            {step === 1 ? 'Login to access exclusive deals' : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 ? (
            // Step 1: Phone & Name
            <form onSubmit={handleSendOTP} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength="10"
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
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Send OTP
              </button>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our Terms of Service & Privacy Policy
              </p>
            </form>
          ) : (
            // Step 2: OTP Verification
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 4-Digit OTP
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    placeholder="Enter OTP"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-2xl tracking-widest font-bold"
                    maxLength="4"
                    autoFocus
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600 text-center">
                OTP sent to +91 {formData.phone}
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setFormData({ ...formData, otp: '' });
                    setError('');
                  }}
                  className="text-primary font-semibold ml-2 hover:underline"
                >
                  Change
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
              >
                Verify & Login
              </button>

              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full text-primary font-semibold text-sm hover:underline"
              >
                Resend OTP
              </button>

              <p className="text-xs text-gray-500 text-center">
                Testing OTP: <span className="font-bold text-primary">{generatedOTP}</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
