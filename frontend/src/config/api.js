// API Configuration
// This determines the backend URL based on the environment

const getApiUrl = () => {
  // Check if we're in production (Vercel) and have VITE_API_URL set
  const apiUrl = import.meta.env.VITE_API_URL;
  
  if (apiUrl) {
    console.log('Using API URL:', apiUrl);
    return apiUrl;
  }
  
  // In development, use Vite proxy (relative URL)
  // This works with localhost and ngrok
  return '';
};

export const API_BASE_URL = getApiUrl();

export default API_BASE_URL;
