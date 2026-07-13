import { useEffect, useState } from 'react';

const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Razorpay script is already loaded
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('Failed to load Razorpay SDK');
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return { isLoaded, error };
};

export default useRazorpay;
