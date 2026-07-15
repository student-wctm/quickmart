import React from 'react';
import { FiPackage, FiTruck, FiDollarSign } from 'react-icons/fi';
import { DELIVERY_FEE } from '../../constants';

const EnhancedBillDetails = ({ cartTotal, itemCount }) => {
  const HANDLING_CHARGE = 2;
  const grandTotal = cartTotal + DELIVERY_FEE + HANDLING_CHARGE;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Bill Details</h3>
      
      <div className="space-y-3">
        {/* Items Total */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <FiPackage className="text-sm" />
            <span className="text-sm">Items total ({itemCount} items)</span>
          </div>
          <span className="font-medium text-gray-800">₹{cartTotal.toFixed(2)}</span>
        </div>

        {/* Delivery Charge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <FiTruck className="text-sm" />
            <span className="text-sm">Delivery charge</span>
          </div>
          <span className="font-medium text-gray-800">₹{DELIVERY_FEE.toFixed(2)}</span>
        </div>

        {/* Handling Charge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <FiDollarSign className="text-sm" />
            <span className="text-sm">Handling charge</span>
          </div>
          <span className="font-medium text-gray-800">₹{HANDLING_CHARGE.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-base text-gray-900">Grand Total</span>
          <span className="font-bold text-lg text-primary">₹{grandTotal.toFixed(2)}</span>
        </div>

        {/* Savings Badge (if applicable) */}
        {cartTotal > 500 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 mt-3">
            <p className="text-xs text-green-700 font-medium text-center">
              🎉 You're saving ₹{DELIVERY_FEE.toFixed(2)} on delivery with this order!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBillDetails;
