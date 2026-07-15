// API Configuration
// This determines the backend URL based on the environment

const getApiUrl = () => {
  // In production (Vercel), use environment variable or default production backend
  if (import.meta.env.PROD) {
    const prodUrl = import.meta.env.VITE_API_URL || 'https://quickmart-backend-six.vercel.app';
    console.log('Production - Using API URL:', prodUrl);
    return prodUrl;
  }
  
  // In development, check if VITE_API_URL is explicitly set
  const devUrl = import.meta.env.VITE_API_URL;
  if (devUrl) {
    console.log('Development - Using custom API URL:', devUrl);
    return devUrl;
  }
  
  // Development default: use Vite proxy or localhost backend
  console.log('Development - Using local backend');
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiUrl();

export default API_BASE_URL;
