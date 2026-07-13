import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const routeLocation = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (routeLocation.state?.searchQuery !== undefined) {
      const query = routeLocation.state.searchQuery;
      setSearchQuery(query);
      if (query.trim()) {
        setSelectedCategory('Search Results');
      } else {
        setSelectedCategory('All');
      }
    }
  }, [routeLocation.state]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categories = ['All', ...Object.keys(groupedProducts)];

  const handleSeeAll = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToAll = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let filteredProducts = products;

  if (searchQuery.trim()) {
    filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  } else if (selectedCategory !== 'All' && selectedCategory !== 'Search Results') {
    filteredProducts = products.filter(
      (product) =>
        product.category &&
        product.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8 w-full">
      <Banner />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchQuery('');
              }}
              className={`bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition cursor-pointer ${
                selectedCategory === category ? 'ring-2 ring-primary bg-green-50' : ''
              }`}
            >
              <div className="text-4xl mb-2">
                {category === 'All'
                  ? '🛍️'
                  : category === 'Vegetables & Fruits'
                    ? '🥬'
                    : category === 'Dairy & Breakfast'
                      ? '🥛'
                      : category === 'Snacks & Munchies'
                        ? '🍿'
                        : category === 'Cold Drinks & Juices'
                          ? '🥤'
                          : '🛒'}
              </div>
              <h3
                className={`text-sm font-semibold ${
                  selectedCategory === category ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {category}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available. Please run the seed script.</p>
        </div>
      ) : (
        <div>
          {searchQuery.trim() ? (
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Search Results for "{searchQuery}"
                </h2>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-primary hover:text-green-700 font-semibold transition self-start sm:self-auto"
                >
                  Clear Search
                </button>
              </div>
              {filteredProducts.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-4">Found {filteredProducts.length} product(s)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg mb-2">No products found for "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-primary hover:text-green-700 font-semibold"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          ) : selectedCategory === 'All' ? (
            Object.keys(groupedProducts).length > 0 ? (
              Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <CategorySection
                  key={category}
                  category={category}
                  products={categoryProducts}
                  onSeeAll={handleSeeAll}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available</p>
              </div>
            )
          ) : (
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-primary font-semibold">Category</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{selectedCategory}</h2>
                </div>
                <button
                  onClick={handleBackToAll}
                  className="text-primary hover:text-green-700 font-semibold transition self-start sm:self-auto"
                >
                  Back to All Categories
                </button>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-gray-500 text-lg mb-2">No products found in "{selectedCategory}"</p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-primary hover:text-green-700 font-semibold"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
