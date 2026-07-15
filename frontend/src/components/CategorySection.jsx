import React from 'react';
import ProductCard from './ProductCard';

const CategorySection = ({ category, products = [], onSeeAll, onLoginRequired }) => {
  if (!Array.isArray(products) || products.length === 0) return null;

  const visibleProducts = products.slice(0, 5);

  const handleSeeAll = () => {
    if (typeof onSeeAll === 'function') {
      onSeeAll(category);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {category || 'Products'}
        </h2>
        <button
          type="button"
          onClick={handleSeeAll}
          className="text-primary hover:text-green-700 font-semibold transition"
        >
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product?._id || `${category}-${product?.name}`}
            product={product}
            onLoginRequired={onLoginRequired}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
