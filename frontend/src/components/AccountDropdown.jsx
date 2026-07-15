import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogOut, FiSettings, FiMapPin, FiChevronDown, FiEdit } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AccountDropdown = ({ onEditProfile }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Account Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-green-50 px-3 md:px-4 py-2 rounded-lg hover:bg-green-100 transition"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <FiUser className="text-white" />
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-xs text-gray-500">Hello,</span>
          <span className="text-sm font-semibold text-primary truncate max-w-[100px]">
            {user?.name || 'User'}
          </span>
        </div>
        <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-800">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 mt-1">
              {user?.email || user?.phone || user?.verifiedContact}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                onEditProfile();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <FiEdit className="text-lg" />
              <span className="text-sm">Edit Profile</span>
            </button>

            <button
              onClick={() => {
                onEditProfile('address');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <FiMapPin className="text-lg" />
              <span className="text-sm">Manage Addresses</span>
            </button>

            <button
              onClick={() => {
                alert('Settings coming soon!');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <FiSettings className="text-lg" />
              <span className="text-sm">Settings</span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-200 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              <FiLogOut className="text-lg" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
