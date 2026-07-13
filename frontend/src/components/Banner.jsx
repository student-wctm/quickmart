import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Get 50% OFF on First Order',
      subtitle: 'Use code: FIRST50',
      bgColor: 'bg-gradient-to-r from-orange-400 to-pink-500',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    },
    {
      id: 2,
      title: 'Fresh Vegetables & Fruits',
      subtitle: 'Delivered in 10 minutes',
      bgColor: 'bg-gradient-to-r from-green-400 to-blue-500',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
    },
    {
      id: 3,
      title: 'Mega Sale on Snacks',
      subtitle: 'Up to 30% OFF',
      bgColor: 'bg-gradient-to-r from-purple-400 to-pink-500',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl mb-8">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`min-w-full h-full ${banner.bgColor} flex items-center justify-between px-8 md:px-16`}
          >
            <div className="text-white z-10 max-w-lg">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
              <p className="text-lg md:text-xl mb-4">{banner.subtitle}</p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition btn-hover">
                Shop Now
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-64 h-64 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition z-20"
      >
        <FiChevronLeft className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition z-20"
      >
        <FiChevronRight className="text-2xl text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
