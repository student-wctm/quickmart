import React, { useState } from 'react';
import { FiX, FiArrowRight, FiCheckCircle, FiMail, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: Choose method, 2: Enter contact, 3: Enter OTP
  const [verificationType, setVerificationType] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  if (!isOpen) return null;

  const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleSelectMethod = (method) => {
    setVerificationType(method);
    setStep(2);
    setError('');
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');

    // Validate based on selected method
    if (verificationType === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(contactInfo)) {
        setError('Please enter a valid 10-digit phone number (starts with 6-9)');
        return;
      }
    } else if (verificationType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setLoading(true);

    // Simulate OTP generation
    setTimeout(() => {
      const mockOTP = generateOTP();
      setGeneratedOTP(mockOTP);
      console.log('🔐 OTP Generated:', mockOTP);
      alert(`Demo OTP: ${mockOTP}\n(Production: will be sent via ${verificationType === 'email' ? 'Email' : 'SMS'})`);
      setStep(3);
      setLoading(false);
    }, 1000);
  };

  const handleOTPChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < 3) {
      document.getElementById(`modal-otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`modal-otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 4) {
      setError('Please enter complete 4-digit OTP');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (enteredOTP === generatedOTP) {
        // Successful OTP verification - create basic user object
        const userData = {
          email: verificationType === 'email' ? contactInfo : '',
          phone: verificationType === 'phone' ? contactInfo : '',
          verifiedContact: contactInfo,
          verificationType: verificationType,
          isNewUser: true, // Flag to show profile completion
        };

        login(userData);
        resetModal();
        onClose();
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        document.getElementById('modal-otp-0')?.focus();
      }
      setLoading(false);
    }, 1000);
  };

  const handleResendOTP = () => {
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setOtp(['', '', '', '']);
    console.log('🔐 New OTP:', newOTP);
    alert(`New OTP: ${newOTP}`);
    setError('');
  };

  const handleGoBack = () => {
    if (step === 3) {
      setStep(2);
      setOtp(['', '', '', '']);
    } else if (step === 2) {
      setStep(1);
      setContactInfo('');
      setVerificationType('');
    }
    setError('');
  };

  const resetModal = () => {
    setStep(1);
    setVerificationType('');
    setContactInfo('');
    setOtp(['', '', '', '']);
    setError('');
    setGeneratedOTP('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <FiX className="text-2xl" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 ? 'Welcome to QuickMart!' : 'Verify Your Identity'}
          </h2>
          <p className="text-gray-600 mb-6">
            {step === 1 ? 'Choose your verification method' : 
             step === 2 ? 'Enter your details to continue' : 
             'Enter the OTP sent to you'}
          </p>

          {step === 1 ? (
            // Step 1: Choose Method
            <div className="space-y-4">
              <button
                onClick={() => handleSelectMethod('email')}
                className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary p-6 rounded-xl transition flex items-center gap-4 group"
              >
                <div className="bg-primary p-3 rounded-full group-hover:scale-110 transition">
                  <FiMail className="text-white text-2xl" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-lg font-bold text-gray-800">Email OTP</h4>
                  <p className="text-gray-600 text-sm">Verify via email address</p>
                </div>
                <FiArrowRight className="text-xl text-gray-400 group-hover:text-primary transition" />
              </button>

              <button
                onClick={() => handleSelectMethod('phone')}
                className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary p-6 rounded-xl transition flex items-center gap-4 group"
              >
                <div className="bg-primary p-3 rounded-full group-hover:scale-110 transition">
                  <FiPhone className="text-white text-2xl" />
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-lg font-bold text-gray-800">Phone OTP</h4>
                  <p className="text-gray-600 text-sm">Verify via phone number</p>
                </div>
                <FiArrowRight className="text-xl text-gray-400 group-hover:text-primary transition" />
              </button>
            </div>
          ) : step === 2 ? (
            // Step 2: Enter Contact
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  {verificationType === 'email' ? 'Email Address' : 'Phone Number'}
                </label>
                <input
                  type={verificationType === 'email' ? 'email' : 'tel'}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder={verificationType === 'email' ? 'your@email.com' : '9876543210'}
                  required
                  autoFocus
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <p className="text-gray-500 text-xs mt-2">
                  We'll send a 4-digit OTP to your {verificationType}
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
                    Sending...
                  </>
                ) : (
                  <>
                    Send OTP
                    <FiArrowRight />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleGoBack}
                className="w-full text-gray-600 hover:text-gray-800 transition text-sm"
              >
                ← Change method
              </button>
            </form>
          ) : (
            // Step 3: Enter OTP
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-4">
                  Enter 4-Digit OTP
                </label>
                <div className="flex gap-3 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`modal-otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm">OTP sent to:</p>
                  <p className="text-primary font-medium">{contactInfo}</p>
                </div>
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
                    Verifying...
                  </>
                ) : (
                  <>
                    <FiCheckCircle />
                    Verify & Continue
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  ← Change {verificationType}
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-primary hover:text-green-700 transition"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
