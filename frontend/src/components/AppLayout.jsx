import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import LocationModal from './LocationModal';
import ProfileCompleteModal from './ProfileCompleteModal';
import { useAuth } from '../context/AuthContext';

const AppLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [location, setLocation] = useState('Select Location');

  // Check if profile needs completion after login
  useEffect(() => {
    if (isAuthenticated && user?.isNewUser) {
      setShowProfileModal(true);
    }
  }, [isAuthenticated, user]);

  const handleSearch = (query) => {
    navigate('/', { state: { searchQuery: query } });
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleEditProfile = (section) => {
    setShowProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onSearch={handleSearch}
        onLoginClick={() => setShowLoginModal(true)}
        onEditProfile={handleEditProfile}
        location={location}
        onLocationClick={() => setShowLocationModal(true)}
      />

      <main className="flex-grow">
        <Outlet context={{ user, location, onLoginRequired: () => setShowLoginModal(true) }} />
      </main>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <ProfileCompleteModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
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
