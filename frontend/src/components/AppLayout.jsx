import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import LocationModal from './LocationModal';

const AppLayout = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState('Select Location');

  const handleSearch = (query) => {
    navigate('/', { state: { searchQuery: query } });
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onSearch={handleSearch}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        location={location}
        onLocationClick={() => setShowLocationModal(true)}
      />

      <main className="flex-grow">
        <Outlet context={{ user, setUser, location }} />
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationSelect={handleLocationSelect}
      />
    </div>
  );
};

export default AppLayout;
