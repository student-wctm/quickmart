import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE } from '../constants';
import { createOrder } from '../utils/orderApi';
import AddressForm from '../components/checkout/AddressForm';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';
import RazorpayButton from '../components/RazorpayButton';
import CancellationPolicy from '../components/checkout/CancellationPolicy';
import EnhancedBillDetails from '../components/checkout/EnhancedBillDetails';
import LocationModal from '../components/LocationModal';
import LocationUnavailable from '../components/LocationUnavailable';
import API_BASE_URL from '../config/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext() || {};
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [pincodeValid, setPincodeValid] = useState(true);
  const [allowedPincode, setAllowedPincode] = useState('');
  const [openMode, setOpenMode] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLocationUnavailable, setShowLocationUnavailable] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shopLocation, setShopLocation] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: '',
    phone: user?.phone || '',
    address: '',
    pincode: '',
  });

  const cartTotal = getCartTotal();
  const finalTotal = cartTotal + DELIVERY_FEE;

  // Validate pincode whenever it changes
  const validatePincodeInput = async (pincode) => {
    if (!pincode) {
      setPincodeError('');
      setPincodeValid(true);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/settings/validate-pincode`, {
        pincode: pincode
      });

      if (response.data.valid) {
        setPincodeValid(true);
        setPincodeError('');
        setOpenMode(response.data.openMode || false);
      } else {
        setPincodeValid(false);
        setPincodeError(response.data.message);
        setAllowedPincode(response.data.allowedPincode || '');
        setOpenMode(false);
      }
    } catch (err) {
      console.error('Pincode validation error:', err);
      // If validation API fails, allow order to proceed (fail-safe)
      setPincodeValid(true);
      setPincodeError('');
      setOpenMode(true);
    }
  };

  // Handle pincode change with debouncing
  const handlePincodeChange = (pincode) => {
    setFormData(prev => ({ ...prev, pincode }));
    
    // Clear previous validation after user starts typing
    if (pincode.length >= 6) {
      validatePincodeInput(pincode);
    } else {
      setPincodeError('');
      setPincodeValid(true);
    }
  };

  // Handle location confirmation from modal
  const handleLocationConfirm = async (locationData) => {
    const { latitude, longitude, address, pincode } = locationData;
    
    setSelectedLocation({latitude, longitude});
    
    // Validate location with backend
    try {
      const response = await axios.post(`${API_BASE_URL}/api/settings/validate-location`, {
        latitude,
        longitude
      });

      if (response.data.valid) {
        // Location is valid - update form
        setFormData(prev => ({
          ...prev,
          address: address,
          pincode: pincode || prev.pincode,
          latitude,
          longitude
        }));
        
        setShowLocationModal(false);
        setPincodeValid(true);
        setPincodeError('');
        
        // Validate pincode if extracted
        if (pincode) {
          validatePincodeInput(pincode);
        }
      } else {
        // Location is outside delivery zone
        setShowLocationModal(false);
        setShowLocationUnavailable(true);
      }
    } catch (error) {
      console.error('Location validation error:', error);
      // Fail-safe: allow location if validation fails
      setFormData(prev => ({
        ...prev,
        address: address,
        pincode: pincode || prev.pincode,
        latitude,
        longitude
      }));
      setShowLocationModal(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Nothing to checkout</h1>
        <p className="text-gray-500 mb-6">Your cart is empty</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      setError('Please fill in all required fields');
      return;
    }

    // For Cash on Delivery, proceed with order creation
    if (paymentMethod === 'Cash on Delivery') {
      setIsSubmitting(true);

      const orderData = {
        user: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            pincode: formData.pincode,
            latitude: formData.latitude,
            longitude: formData.longitude,
          },
        },
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.discount
            ? item.price - (item.price * item.discount) / 100
            : item.price,
          image: item.image,
        })),
        totalPrice: cartTotal,
        deliveryFee: DELIVERY_FEE,
        paymentMethod,
      };

      try {
        const createdOrder = await createOrder(orderData);
        clearCart();
        navigate(`/order-success/${createdOrder._id}`);
      } catch (err) {
        console.error('Error creating order:', err);
        setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
    // For Razorpay, the RazorpayButton component will handle the payment
  };

  const handleRazorpaySuccess = async (paymentDetails) => {
    setIsSubmitting(true);
    
    console.log('💳 Razorpay payment successful!', paymentDetails);
    console.log('📦 Creating order with payment details...');
    
    const orderData = {
      user: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.address,
          pincode: formData.pincode,
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      },
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.discount
          ? item.price - (item.price * item.discount) / 100
          : item.price,
        image: item.image,
      })),
      totalPrice: cartTotal,
      deliveryFee: DELIVERY_FEE,
      paymentMethod: 'Online Payment', // Fixed: Changed from 'Razorpay' to match Order model enum
      isPaid: true,
      paidAt: new Date().toISOString(), // Fixed: Convert to ISO string for proper serialization
      paymentDetails: {
        razorpay_order_id: paymentDetails.razorpay_order_id,
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_signature: paymentDetails.razorpay_signature,
      },
    };

    try {
      console.log('📤 Sending order data:', orderData);
      const createdOrder = await createOrder(orderData);
      console.log('✅ Order created successfully:', createdOrder);
      clearCart();
      navigate(`/order-success/${createdOrder._id}`);
    } catch (err) {
      console.error('❌ Error creating order after payment:', err);
      console.error('Error response:', err.response?.data);
      setError('Payment successful but order creation failed. Please contact support with Payment ID: ' + paymentDetails.razorpay_payment_id);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRazorpayFailure = (error) => {
    console.error('Razorpay payment failed:', error);
    setError(error.message || 'Payment failed. Please try again.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      <button
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition"
      >
        <FiArrowLeft />
        <span>Back to Cart</span>
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg text-gray-800">Delivery Address</h2>
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-green-50 transition"
                >
                  <FiMapPin />
                  Change Location
                </button>
              </div>
              
              <AddressForm 
                formData={formData} 
                onChange={(updatedData) => {
                  // Check if pincode changed
                  if (updatedData.pincode !== formData.pincode) {
                    handlePincodeChange(updatedData.pincode);
                  } else {
                    setFormData(updatedData);
                  }
                }} 
              />
              
              {/* Pincode Validation Message */}
              {pincodeError && (
                <div className="mt-4 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-2">
                  <FiAlertCircle className="text-xl mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Delivery Unavailable</p>
                    <p className="text-sm">{pincodeError}</p>
                  </div>
                </div>
              )}
              
              {formData.pincode && pincodeValid && !openMode && (
                <div className="mt-4 bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <FiCheckCircle className="text-xl" />
                  <span className="text-sm font-medium">✓ Delivery available in your area</span>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h2 className="font-bold text-lg mb-4 text-gray-800">Payment Method</h2>
              <PaymentMethodSelector
                paymentMethod={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>
          </div>

          <div className="space-y-4">
            <EnhancedBillDetails 
              cartTotal={cartTotal} 
              itemCount={cartItems.length}
            />

            <CancellationPolicy />

            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">{error}</div>
            )}

            {paymentMethod === 'Cash on Delivery' ? (
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.phone || !formData.address || !formData.pincode || !pincodeValid}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-700 transition btn-hover disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Placing Order...'
                  : !pincodeValid
                  ? 'Delivery Not Available'
                  : `Place Order — ₹${finalTotal.toFixed(2)}`}
              </button>
            ) : (
              <div>
                {(!formData.name || !formData.phone || !formData.address || !formData.pincode || !pincodeValid) && (
                  <p className="text-sm text-red-600 mb-2">
                    {!pincodeValid 
                      ? pincodeError 
                      : 'Please fill in all delivery details before proceeding to payment'}
                  </p>
                )}
                <RazorpayButton
                  amount={finalTotal}
                  currency="INR"
                  customerName={formData.name}
                  customerEmail={formData.email}
                  customerPhone={formData.phone}
                  onSuccess={handleRazorpaySuccess}
                  onFailure={handleRazorpayFailure}
                  disabled={!formData.name || !formData.phone || !formData.address || !formData.pincode || !pincodeValid}
                  buttonText={!pincodeValid ? 'Delivery Not Available' : `Pay ₹${finalTotal.toFixed(2)} with Razorpay`}
                  buttonClass="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Location Selection Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationConfirm={handleLocationConfirm}
        shopLocation={shopLocation}
      />

      {/* Location Unavailable Screen */}
      {showLocationUnavailable && (
        <LocationUnavailable
          onBack={() => {
            setShowLocationUnavailable(false);
            setShowLocationModal(true);
          }}
          locationName={formData.address}
        />
      )}
    </div>
  );
};

export default Checkout;
