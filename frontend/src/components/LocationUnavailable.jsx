import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const LocationUnavailable = ({ onBack, locationName }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Blinkit-style Illustration - Person with Binoculars */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto relative">
            {/* SVG Illustration matching Blinkit's "Oops" screen */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Sky background */}
              <circle cx="100" cy="100" r="100" fill="#E8F4F8"/>
              
              {/* Person's head */}
              <circle cx="100" cy="90" r="30" fill="#FFE4C4"/>
              
              {/* Hair */}
              <path d="M 70 70 Q 70 50 100 50 Q 130 50 130 70" fill="#8B4513"/>
              
              {/* Binoculars */}
              <g transform="translate(100,80)">
                {/* Left lens */}
                <circle cx="-15" cy="0" r="12" fill="#2C3E50" stroke="#1A252F" strokeWidth="2"/>
                <circle cx="-15" cy="0" r="8" fill="#3498DB" opacity="0.6"/>
                
                {/* Right lens */}
                <circle cx="15" cy="0" r="12" fill="#2C3E50" stroke="#1A252F" strokeWidth="2"/>
                <circle cx="15" cy="0" r="8" fill="#3498DB" opacity="0.6"/>
                
                {/* Bridge */}
                <rect x="-3" y="-3" width="6" height="6" fill="#2C3E50"/>
              </g>
              
              {/* Body/shirt */}
              <path d="M 70 110 L 130 110 L 130 150 L 70 150 Z" fill="#4A90E2"/>
              
              {/* Arms looking through binoculars */}
              <path d="M 70 115 L 60 100 L 75 95" fill="#FFE4C4" stroke="#D4A574" strokeWidth="2"/>
              <path d="M 130 115 L 140 100 L 125 95" fill="#FFE4C4" stroke="#D4A574" strokeWidth="2"/>
              
              {/* Search waves */}
              <g opacity="0.4">
                <circle cx="100" cy="80" r="40" fill="none" stroke="#3498DB" strokeWidth="2" strokeDasharray="5,5">
                  <animate attributeName="r" from="40" to="60" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite"/>
                </circle>
              </g>
            </svg>
          </div>
        </div>

        {/* Heading - Exact Blinkit style */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Oops!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-700 mb-2">
          Quick Mart is not available at this location at the moment.
        </p>

        {/* Location Info */}
        {locationName && (
          <p className="text-sm text-gray-500 mb-6">
            {locationName}
          </p>
        )}

        {/* Subtext */}
        <p className="text-gray-600 mb-8">
          Please select a different location to continue shopping.
        </p>

        {/* Action Button - Blinkit style */}
        <button
          onClick={onBack}
          className="w-full bg-white border-2 border-primary text-primary py-4 rounded-lg font-bold hover:bg-green-50 transition flex items-center justify-center gap-2 text-lg"
        >
          <FiArrowLeft className="text-xl" />
          Change Location
        </button>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-6">
          We're expanding to new areas soon 🚀
        </p>
      </div>
    </div>
  );
};

export default LocationUnavailable;
