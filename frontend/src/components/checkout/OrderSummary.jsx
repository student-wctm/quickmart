import React from 'react';
import { DELIVERY_FEE } from '../../constants';

const OrderSummary = ({ cartItems, cartTotal }) => {
  const finalTotal = cartTotal + DELIVERY_FEE;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Order Summary</h3>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {cartItems.map((item) => {
          const itemPrice = item.discount
            ? item.price - (item.price * item.discount) / 100
            : item.price;

          return (
            <div key={item._id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ₹{itemPrice.toFixed(0)}
                </p>
              </div>
              <p className="font-semibold text-gray-800">
                ₹{(itemPrice * item.quantity).toFixed(0)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4 space-y-2">
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
    </div>
  );
};

export default OrderSummary;
