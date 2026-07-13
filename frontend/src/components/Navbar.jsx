import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMapPin, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch, user, onLoginClick, location, onLocationClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 md:h-16 md:py-0">
          <Link to="/" className="flex items-center flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              Quick<span className="text-accent">Mart</span>
            </h1>
          </Link>

          <button
            onClick={onLocationClick}
            className="flex items-center space-x-2 bg-gray-100 px-3 md:px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition flex-shrink-0"
          >
            <FiMapPin className="text-gray-600 flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 whitespace-nowrap">Delivery in 10 min</span>
              <span className="text-sm font-semibold text-gray-700 truncate max-w-[120px] lg:max-w-xs flex items-center">
                {location}
                <FiChevronDown className="ml-1 text-gray-500 flex-shrink-0" />
              </span>
            </div>
          </button>

          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </form>

          <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6 flex-shrink-0">
            {user ? (
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 md:px-4 py-2 rounded-lg">
                <FiUser className="text-primary" />
                <span className="text-sm font-medium text-primary truncate max-w-[100px]">{user.name}</span>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-2 hover:text-primary transition"
              >
                <FiUser className="text-xl" />
                <span className="text-sm font-medium">Login</span>
              </button>
            )}

            <Link
              to="/cart"
              className="relative flex items-center space-x-2 bg-primary text-white px-3 md:px-4 py-2 rounded-lg hover:bg-green-700 transition btn-hover"
            >
              <FiShoppingCart className="text-xl" />
              <span className="hidden md:inline font-medium">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
