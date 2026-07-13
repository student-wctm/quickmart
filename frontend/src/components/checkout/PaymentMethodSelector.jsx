import React from 'react';
import { FiTruck, FiCreditCard } from 'react-icons/fi';

const PaymentMethodSelector = ({ paymentMethod, onChange }) => {
  return (
    <div className="space-y-3">
      <label
        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
          paymentMethod === 'Cash on Delivery'
            ? 'border-primary bg-green-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value="Cash on Delivery"
          checked={paymentMethod === 'Cash on Delivery'}
          onChange={() => onChange('Cash on Delivery')}
          className="text-primary focus:ring-primary"
        />
        <FiTruck className="text-xl text-primary" />
        <div>
          <p className="font-semibold text-gray-800">Cash on Delivery</p>
          <p className="text-sm text-gray-500">Pay when your order arrives</p>
        </div>
      </label>

      <label
        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
          paymentMethod === 'Online Payment'
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value="Online Payment"
          checked={paymentMethod === 'Online Payment'}
          onChange={() => onChange('Online Payment')}
          className="text-blue-600 focus:ring-blue-600"
        />
        <FiCreditCard className="text-xl text-blue-600" />
        <div>
          <p className="font-semibold text-gray-800">Pay Online (UPI / Card)</p>
          <p className="text-sm text-gray-500">Secure payment via Razorpay</p>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethodSelector;
