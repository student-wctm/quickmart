import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const quantity = getItemQuantity(product._id);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-md text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.unit}</p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-bold text-xl">₹{discountedPrice.toFixed(0)}</span>
            {product.discount > 0 && (
              <span className="text-gray-400 text-sm line-through">₹{product.price}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {product.inStock && (
          <div>
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-white border-2 border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition btn-hover"
              >
                ADD
              </button>
            ) : (
              <div className="flex items-center justify-between bg-primary text-white rounded-lg overflow-hidden">
                <button
                  onClick={() => decreaseQuantity(product._id)}
                  className="px-4 py-2 hover:bg-green-700 transition"
                >
                  <FiMinus className="text-xl" />
                </button>
                <span className="px-4 py-2 font-bold">{quantity}</span>
                <button
                  onClick={() => increaseQuantity(product._id)}
                  className="px-4 py-2 hover:bg-green-700 transition"
                >
                  <FiPlus className="text-xl" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
