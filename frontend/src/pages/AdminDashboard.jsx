import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { 
  FiUpload, 
  FiPackage, 
  FiDollarSign, 
  FiTag, 
  FiBox,
  FiFileText,
  FiPercent,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowLeft,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiSettings,
  FiMapPin,
  FiHome
} from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    allowedPincode: '',
    storeName: 'QuickMart',
    deliveryFee: 40,
  });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Vegetables & Fruits',
    unit: 'kg',
    stock: '',
    description: '',
    discount: '0',
    image: null,
    imageUrl: ''
  });

  const categories = [
    'Vegetables & Fruits',
    'Dairy & Breakfast',
    'Snacks & Munchies',
    'Cold Drinks & Juices',
    'Home & Cleaning',
    'Personal Care'
  ];

  const units = ['kg', 'g', 'L', 'ml', 'pack', 'piece', 'dozen'];

  useEffect(() => {
    fetchRecentProducts();
    fetchSettings();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setRecentProducts(response.data); // Show ALL products for admin (removed slice)
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/settings`);
      setSettings({
        allowedPincode: response.data.allowedPincode || '',
        storeName: response.data.storeName || 'QuickMart',
        deliveryFee: response.data.deliveryFee || 40,
      });
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    setSettingsError('');
    setSettingsSuccess('');

    try {
      await axios.put(`${API_BASE_URL}/api/settings`, settings);
      setSettingsSuccess('Settings updated successfully!');
      
      setTimeout(() => setSettingsSuccess(''), 3000);
    } catch (err) {
      console.error('Error updating settings:', err);
      setSettingsError(err.response?.data?.message || 'Failed to update settings');
      setTimeout(() => setSettingsError(''), 5000);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
      setSuccess(`Product "${productName}" deleted successfully!`);
      fetchRecentProducts(); // Refresh list
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || 'Failed to delete product');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleToggleStock = async (productId, productName, currentStatus) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'In Stock' : 'Out of Stock';

    if (!window.confirm(`Mark "${productName}" as ${action}?`)) {
      return;
    }

    try {
      await axios.patch(`${API_BASE_URL}/api/products/${productId}/stock`);
      setSuccess(`Product "${productName}" marked as ${action}!`);
      fetchRecentProducts(); // Refresh list
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error toggling stock:', err);
      setError(err.response?.data?.message || 'Failed to update stock status');
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
    
    if (url) {
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.name || !formData.price || !formData.stock) {
        throw new Error('Please fill in all required fields');
      }

      if (!formData.image && !formData.imageUrl) {
        throw new Error('Please upload an image or provide an image URL');
      }

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      submitData.append('unit', formData.unit);
      submitData.append('stock', formData.stock);
      submitData.append('description', formData.description);
      submitData.append('discount', formData.discount || 0);

      // Add image file or URL
      if (formData.image) {
        submitData.append('image', formData.image);
      } else if (formData.imageUrl) {
        submitData.append('imageUrl', formData.imageUrl);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/products/add`,
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(`Product "${response.data.name}" added successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        price: '',
        category: 'Vegetables & Fruits',
        unit: 'kg',
        stock: '',
        description: '',
        discount: '0',
        image: null,
        imageUrl: ''
      });
      setImagePreview('');

      // Refresh recent products
      fetchRecentProducts();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.message || err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FiPackage className="text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your product inventory and settings</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  showSettings 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiSettings />
                {showSettings ? 'Hide Settings' : 'Settings'}
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition"
              >
                <FiArrowLeft />
                Back to Store
              </button>
            </div>
          </div>
        </div>

        {/* Settings Section (Collapsible) */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiSettings className="text-primary" />
              Store Settings
            </h2>

            {settingsSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <FiCheckCircle className="text-xl" />
                <span>{settingsSuccess}</span>
              </div>
            )}

            {settingsError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <FiAlertCircle className="text-xl" />
                <span>{settingsError}</span>
              </div>
            )}

            <form onSubmit={handleSettingsUpdate} className="space-y-6">
              {/* Delivery Pincode Setting */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                  <FiMapPin className="text-blue-600" />
                  Delivery Location Settings
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed Delivery Pincode (Optional)
                  </label>
                  <input
                    type="text"
                    value={settings.allowedPincode}
                    onChange={(e) => setSettings({...settings, allowedPincode: e.target.value})}
                    placeholder="Leave BLANK for open mode or enter specific pincode (e.g., 226001)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="bg-white rounded-lg p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Open Mode (Recommended for Testing)</p>
                      <p className="text-sm text-gray-600">
                        Leave the field <strong>BLANK</strong> → Anyone from anywhere can place orders without restrictions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Restricted Mode</p>
                      <p className="text-sm text-gray-600">
                        Enter a specific pincode → Only customers with matching pincode can checkout
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <FiAlertCircle className="text-orange-600" />
                  <span className="text-gray-600">
                    Current Mode: <strong className={settings.allowedPincode ? 'text-blue-600' : 'text-green-600'}>
                      {settings.allowedPincode ? `Restricted to ${settings.allowedPincode}` : 'Open (No Restrictions)'}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiHome className="inline mr-2" />
                  Store Name
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({...settings, storeName: e.target.value})}
                  placeholder="QuickMart"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Delivery Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) => setSettings({...settings, deliveryFee: parseFloat(e.target.value)})}
                  placeholder="40"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={settingsLoading}
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {settingsLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving Settings...
                  </>
                ) : (
                  <>
                    <FiCheckCircle />
                    Save Settings
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <FiCheckCircle className="text-xl" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <FiAlertCircle className="text-xl" />
            <span>{error}</span>
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPackage className="inline mr-2" />
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Fresh Tomatoes"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiDollarSign className="inline mr-2" />
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="99"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiBox className="inline mr-2" />
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="100"
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Category and Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiTag className="inline mr-2" />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiPercent className="inline mr-2" />
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiFileText className="inline mr-2" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Product description..."
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiImage className="inline mr-2" />
                Product Image *
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                  />
                </div>
              )}

              {/* File Upload */}
              <div className="mb-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <FiUpload className="text-3xl text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* OR Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Image URL */}
              <input
                type="url"
                value={formData.imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Paste image URL (e.g., https://images.unsplash.com/...)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use Unsplash, Imgur, or any direct image URL
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <FiPackage />
                  Add Product to Inventory
                </>
              )}
            </button>
          </form>
        </div>

        {/* Recent Products */}
        {recentProducts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
                <p className="text-sm text-gray-600 mt-1">Total Products: {recentProducts.length}</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Products List */}
            <div className="space-y-3">
              {recentProducts
                .filter(product => {
                  const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
                  return matchesSearch && matchesCategory;
                })
                .map((product) => (
                  <div key={product._id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        ₹{product.price} • {product.category} • Stock: {product.stock}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {/* Toggle Stock Button */}
                      <button
                        onClick={() => handleToggleStock(product._id, product.name, product.inStock)}
                        className={`p-2 rounded-lg transition ${
                          product.inStock 
                            ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                        }`}
                        title={product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      >
                        {product.inStock ? (
                          <FiToggleRight className="text-xl" />
                        ) : (
                          <FiToggleLeft className="text-xl" />
                        )}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteProduct(product._id, product.name)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        title="Delete Product"
                      >
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              
              {/* No Results Message */}
              {recentProducts.filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
                return matchesSearch && matchesCategory;
              }).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <FiPackage className="text-5xl mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm">Try adjusting your search or filter</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
