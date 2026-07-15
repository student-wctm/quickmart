import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { FiX, FiNavigation, FiMapPin, FiSearch } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const shopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map clicks and dragging
const LocationMarker = ({ position, setPosition, onLocationSelect }) => {
  const markerRef = useRef(null);

  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPos = marker.getLatLng();
        setPosition([newPos.lat, newPos.lng]);
        onLocationSelect(newPos.lat, newPos.lng);
      }
    },
  };

  return position ? (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={customerIcon}
    >
      <Popup>
        <div className="text-center">
          <p className="font-semibold">Your Delivery Location</p>
          <p className="text-xs text-gray-600">Drag to adjust</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

const LocationModal = ({ isOpen, onClose, onLocationConfirm, shopLocation }) => {
  const [customerPosition, setCustomerPosition] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Default shop location (you can configure this in settings)
  const defaultShopLocation = shopLocation || [26.8467, 80.9462]; // Example: Lucknow coordinates

  useEffect(() => {
    if (isOpen && !customerPosition) {
      // Set default position near shop
      setCustomerPosition(defaultShopLocation);
    }
  }, [isOpen]);

  const handleDetectLocation = () => {
    setDetectingLocation(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCustomerPosition([latitude, longitude]);
          reverseGeocode(latitude, longitude);
          setDetectingLocation(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          alert("Unable to detect location. Please enter manually or check location permissions.");
          setDetectingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setDetectingLocation(false);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat, lng) => {
    reverseGeocode(lat, lng);
  };

  const handleConfirm = () => {
    if (customerPosition && address) {
      onLocationConfirm({
        latitude: customerPosition[0],
        longitude: customerPosition[1],
        address: address,
        pincode: extractPincode(address)
      });
    } else {
      alert("Please select a location on the map");
    }
  };

  const extractPincode = (addressString) => {
    // Extract Indian pincode pattern (6 digits)
    const pincodeMatch = addressString.match(/\b\d{6}\b/);
    return pincodeMatch ? pincodeMatch[0] : '';
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      // Using OpenStreetMap Nominatim API for geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        setCustomerPosition([parseFloat(lat), parseFloat(lon)]);
        setAddress(display_name);
      } else {
        alert("Location not found. Please try a different search.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error searching location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiMapPin className="text-primary" />
            Select Delivery Location
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search for area, street name..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              Search
            </button>
          </div>
          
          <button
            onClick={handleDetectLocation}
            disabled={detectingLocation}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-green-50 transition disabled:opacity-50"
          >
            <FiNavigation className={detectingLocation ? 'animate-spin' : ''} />
            {detectingLocation ? 'Detecting...' : 'Detect my location'}
          </button>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {customerPosition && (
            <MapContainer
              center={customerPosition}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Shop Location Marker */}
              <Marker position={defaultShopLocation} icon={shopIcon}>
                <Popup>
                  <div className="text-center">
                    <p className="font-semibold text-primary">Quick Mart Store</p>
                    <p className="text-xs text-gray-600">Our Location</p>
                  </div>
                </Popup>
              </Marker>

              {/* Customer Location Marker (Draggable) */}
              <LocationMarker
                position={customerPosition}
                setPosition={setCustomerPosition}
                onLocationSelect={handleLocationSelect}
              />
            </MapContainer>
          )}
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-gray-600">Loading location...</p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Address Display */}
        {address && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-600 mb-1">Selected Address:</p>
            <p className="font-medium text-gray-800">{address}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!customerPosition || !address}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Location
          </button>
        </div>

        {/* Instruction */}
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 text-center">
            💡 Tip: Click on the map or drag the red marker to adjust your delivery location
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
