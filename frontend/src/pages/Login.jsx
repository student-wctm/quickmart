import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiShield, 
  FiClock, 
  FiRefreshCw, 
  FiTruck,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Choose method, 2: Enter contact, 3: Enter OTP
  const [verificationType, setVerificationType] = useState(''); // 'phone' or 'email'
  const [contactInfo, setContactInfo] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  // Generate random 4-digit OTP (mock)
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

    // Simulate OTP generation (in production, call backend API)
    setTimeout(() => {
      const mockOTP = generateOTP();
      setGeneratedOTP(mockOTP);
      console.log('🔐 Mock OTP Generated:', mockOTP); // For testing
      const channel = verificationType === 'email' ? 'Email' : 'SMS';
      alert(`Demo OTP: ${mockOTP}\n(In production, this will be sent via ${channel})`);
      setStep(3);
      setLoading(false);
    }, 1500);
  };

  const handleOTPChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
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

    // Simulate OTP verification (in production, call backend API)
    setTimeout(() => {
      if (enteredOTP === generatedOTP) {
        // Successful login
        console.log('✅ Login successful!');
        
        // Store user info (mock)
        const user = {
          phone: contactInfo,
          name: 'Guest User',
          loggedIn: true
        };
        localStorage.setItem('quickmart_user', JSON.stringify(user));
        
        navigate('/');
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        document.getElementById('otp-0').focus();
      }
      setLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    const newOTP = generateOTP();
    setGeneratedOTP(newOTP);
    setOtp(['', '', '', '']);
    console.log('🔐 New OTP Generated:', newOTP);
    const channel = verificationType === 'email' ? 'Email' : 'SMS';
    alert(`New Demo OTP: ${newOTP}\n(In production, this will be sent via ${channel})`);
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

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-50 to-green-100 p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">QuickMart</h1>
          <p className="text-gray-600 text-lg">Fresh groceries at your doorstep</p>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why choose QuickMart?</h2>

          <div className="flex items-start gap-4">
            <div className="bg-white p-4 rounded-full shadow-md">
              <FiShield className="text-3xl text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Products</h3>
              <p className="text-gray-600">
                Handpicked fresh fruits, vegetables, and daily essentials with quality guarantee.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-4 rounded-full shadow-md">
              <FiClock className="text-3xl text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">On-Time Delivery</h3>
              <p className="text-gray-600">
                Quick delivery within minutes to your doorstep. Track your order in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-4 rounded-full shadow-md">
              <FiRefreshCw className="text-3xl text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return within 2 hours for full refund. Customer satisfaction guaranteed.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-4 rounded-full shadow-md">
              <FiTruck className="text-3xl text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Free Delivery</h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹99. No hidden charges or surprise fees.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-gray-700 font-semibold mb-4">Find us on:</p>
          <div className="flex gap-4">
            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="font-bold">App Store</p>
              </div>
            </div>

            <div className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs">GET IT ON</p>
                <p className="font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">QuickMart</h1>
            <p className="text-gray-400">Fresh groceries at your doorstep</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-gray-400 mb-8">
              {step === 1 ? 'Choose your verification method' : 
               step === 2 ? 'Enter your details to get started' : 
               'Enter the OTP sent to your device'}
            </p>

            {step === 1 ? (
              // Step 1: Choose Verification Method
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Select verification method:</h3>
                
                {/* Email Option */}
                <button
                  type="button"
                  onClick={() => handleSelectMethod('email')}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white p-6 rounded-lg transition flex items-center gap-4 group"
                >
                  <div className="bg-primary p-4 rounded-full group-hover:scale-110 transition">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-xl font-bold mb-1">Email OTP</h4>
                    <p className="text-gray-400 text-sm">Receive verification code via email</p>
                  </div>
                  <FiArrowRight className="text-2xl text-gray-400 group-hover:text-primary transition" />
                </button>

                {/* Phone Option */}
                <button
                  type="button"
                  onClick={() => handleSelectMethod('phone')}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white p-6 rounded-lg transition flex items-center gap-4 group"
                >
                  <div className="bg-primary p-4 rounded-full group-hover:scale-110 transition">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-xl font-bold mb-1">Phone OTP</h4>
                    <p className="text-gray-400 text-sm">Receive verification code via SMS</p>
                  </div>
                  <FiArrowRight className="text-2xl text-gray-400 group-hover:text-primary transition" />
                </button>

                <p className="text-gray-500 text-xs mt-6 text-center">
                  By continuing, you agree to our{' '}
                  <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              </div>
            ) : step === 2 ? (
              // Step 2: Enter Email/Phone
              <form onSubmit={handleSendOTP}>
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    {verificationType === 'email' ? (
                      <>
                        <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Address
                      </>
                    ) : (
                      <>
                        <svg className="inline w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Phone Number
                      </>
                    )}
                  </label>
                  <input
                    type={verificationType === 'email' ? 'email' : 'tel'}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={verificationType === 'email' ? 'your@email.com' : '9876543210'}
                    required
                    autoFocus
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <p className="text-gray-500 text-xs mt-2">
                    {verificationType === 'email' 
                      ? 'We\'ll send a 4-digit OTP to your email' 
                      : 'We\'ll send a 4-digit OTP to your phone'}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending OTP...
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
                  className="w-full text-gray-400 hover:text-white transition text-center text-sm"
                >
                  ← Change verification method
                </button>
              </form>
            ) : (
              // Step 3: OTP Verification
              <form onSubmit={handleVerifyOTP}>
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-4">
                    Enter 4-Digit OTP
                  </label>
                  <div className="flex gap-3 justify-center mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl font-bold bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      OTP sent to {verificationType === 'email' ? 'email:' : 'phone:'}
                    </p>
                    <p className="text-primary font-medium text-lg mt-1">{contactInfo}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {verificationType === 'email' 
                        ? 'Check your inbox and spam folder' 
                        : 'Check your SMS messages'}
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle />
                      Verify & Login
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="text-gray-400 hover:text-white transition"
                  >
                    ← Change {verificationType === 'email' ? 'email' : 'number'}
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-primary hover:text-green-400 transition"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-6 text-gray-400 hover:text-white transition text-center"
          >
            Skip and browse as guest →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
