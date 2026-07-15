import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const CancellationPolicy = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-3">
        <FiAlertCircle className="text-orange-500 text-xl flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-2">
            Cancellation Policy
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, 
            a refund will be provided, if applicable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
