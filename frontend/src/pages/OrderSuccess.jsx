import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiClock } from 'react-icons/fi';
import { getOrderById } from '../utils/orderApi';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Could not load order details.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-6">{error || 'Order not found'}</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center animate-scale-in">
        <FiCheckCircle className="text-6xl text-primary mx-auto mb-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you, {order.user.name}! Your order is on its way.
        </p>

        <div className="bg-green-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-semibold text-gray-800 break-all">{order._id}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-left">
          <div className="bg-gray-50 rounded-lg p-4">
            <FiPackage className="text-primary mb-2" />
            <p className="text-sm text-gray-500">Items</p>
            <p className="font-semibold">{order.orderItems.length} products</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <FiClock className="text-primary mb-2" />
            <p className="text-sm text-gray-500">Delivery</p>
            <p className="font-semibold">~10 minutes</p>
          </div>
        </div>

        <div className="border-t pt-4 mb-6 text-left space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Item Total</span>
            <span>₹{order.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total Paid</span>
            <span>₹{order.finalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Payment</span>
            <span>{order.paymentMethod}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm">
          <p className="font-semibold text-gray-800 mb-1">Delivery to:</p>
          <p className="text-gray-600">{order.user.address?.street}</p>
          <p className="text-gray-600">{order.user.phone}</p>
        </div>

        <Link
          to="/"
          className="inline-block w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-700 transition btn-hover"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
