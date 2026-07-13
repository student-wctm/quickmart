import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { DELIVERY_FEE } from '../constants';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  const cartTotal = getCartTotal();
  const finalTotal = cartTotal + DELIVERY_FEE;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add some items to get started</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition"
      >
        <FiArrowLeft />
        <span>Continue Shopping</span>
      </button>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        My Cart ({getCartCount()} items)
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const itemPrice = item.discount
              ? item.price - (item.price * item.discount) / 100
              : item.price;

            return (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">₹{itemPrice.toFixed(0)} each</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-gray-100 border p-1 rounded hover:bg-gray-200"
                    >
                      <FiMinus />
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-gray-100 border p-1 rounded hover:bg-gray-200"
                    >
                      <FiPlus />
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="font-bold text-gray-800">
                  ₹{(itemPrice * item.quantity).toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4 text-gray-800">Bill Details</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Item Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee</span>
              <span>₹{DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-700 transition btn-hover"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
