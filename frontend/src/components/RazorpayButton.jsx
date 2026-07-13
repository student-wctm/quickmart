import React, { useState } from 'react';
import axios from 'axios';
import useRazorpay from '../hooks/useRazorpay';

const RazorpayButton = ({
  amount,
  currency = 'INR',
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
  buttonText = 'Pay Now',
  buttonClass = 'w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition',
  disabled = false,
}) => {
  const { isLoaded, error: loadError } = useRazorpay();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (disabled) {
      return;
    }

    if (!isLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    if (loadError) {
      alert('Payment system failed to load. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order on backend
      const { data } = await axios.post('/api/payments/create-order', {
        amount: amount,
        currency: currency,
        receipt: `order_${orderId || Date.now()}`,
      });

      if (!data.success) {
        throw new Error('Failed to create payment order');
      }

      // Step 2: Razorpay checkout options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: 'QuickMart',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyData = await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            });

            if (verifyData.data.success) {
              if (onSuccess) {
                onSuccess({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            if (onFailure) {
              onFailure(error);
            }
          }
        },
        prefill: {
          name: customerName || '',
          email: customerEmail || '',
          contact: customerPhone || '',
        },
        notes: {
          order_id: orderId || 'N/A',
        },
        theme: {
          color: '#0C831F',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            if (onFailure) {
              onFailure({ message: 'Payment cancelled by user' });
            }
          },
        },
      };

      // Step 4: Open Razorpay checkout
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      if (onFailure) {
        onFailure(error);
      }
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading || !isLoaded}
      className={buttonClass}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default RazorpayButton;
