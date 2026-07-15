import axios from 'axios';
import API_BASE_URL from '../config/api';

export const createOrder = async (orderData) => {
  const response = await axios.post(`${API_BASE_URL}/api/orders`, orderData);
  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`);
  return response.data;
};
