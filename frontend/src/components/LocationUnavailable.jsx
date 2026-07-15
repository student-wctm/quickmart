import React from 'react';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';

const LocationUnavailable = ({ onBack, locationName }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <FiMapPin className="text-6xl text-gray-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Quick Mart is not available at this location at the moment
        </h1>

        {/* Location Info */}
        {locationName && (
          <p className="text-gray-600 mb-6">
            Selected location: <span className="font-medium">{locationName}</span>
          </p>
        )}

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Please select a different location to continue shopping.
        </p>

        {/* Action Button */}
        <button
          onClick={onBack}
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <FiArrowLeft />
          Select Different Location
        </button>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-6">
          We're expanding to new areas soon. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default LocationUnavailable;
