import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new product (for seeding/testing)
// @route   POST /api/products
// @access  Public (should be protected in production)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Seed sample products
// @route   POST /api/products/seed
// @access  Public (should be protected in production)
export const seedProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: 'Fresh Tomatoes',
        price: 40,
        image: 'https://images.unsplash.com/photo-1546470427-e26264be0b1d?w=400',
        category: 'Vegetables & Fruits',
        stock: 100,
        unit: 'kg',
        description: 'Fresh and juicy tomatoes',
        discount: 10,
      },
      {
        name: 'Amul Milk',
        price: 28,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
        category: 'Dairy & Breakfast',
        stock: 50,
        unit: '500ml',
        description: 'Fresh dairy milk',
        discount: 0,
      },
      {
        name: 'Lays Chips',
        price: 20,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
        category: 'Snacks & Munchies',
        stock: 200,
        unit: 'pack',
        description: 'Crispy potato chips',
        discount: 15,
      },
      {
        name: 'Coca Cola',
        price: 40,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
        category: 'Beverages',
        stock: 150,
        unit: '750ml',
        description: 'Refreshing cold drink',
        discount: 0,
      },
      {
        name: 'Fresh Bananas',
        price: 50,
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
        category: 'Vegetables & Fruits',
        stock: 80,
        unit: 'dozen',
        description: 'Fresh yellow bananas',
        discount: 5,
      },
      {
        name: 'Bread',
        price: 35,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        category: 'Bakery & Biscuits',
        stock: 60,
        unit: 'pack',
        description: 'Whole wheat bread',
        discount: 0,
      },
      {
        name: 'Fresh Spinach',
        price: 30,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
        category: 'Vegetables & Fruits',
        stock: 40,
        unit: 'bunch',
        description: 'Fresh green spinach',
        discount: 8,
      },
      {
        name: 'Maggi Noodles',
        price: 14,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400',
        category: 'Instant & Frozen Food',
        stock: 300,
        unit: 'pack',
        description: '2-minute instant noodles',
        discount: 0,
      },
      {
        name: 'Fresh Apples',
        price: 150,
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
        category: 'Vegetables & Fruits',
        stock: 70,
        unit: 'kg',
        description: 'Crispy red apples',
        discount: 12,
      },
      {
        name: 'Colgate Toothpaste',
        price: 80,
        image: 'https://images.unsplash.com/photo-1622909090938-d1012b5958c7?w=400',
        category: 'Personal Care',
        stock: 120,
        unit: 'pack',
        description: 'Dental care toothpaste',
        discount: 20,
      },
      {
        name: 'Dettol Soap',
        price: 35,
        image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
        category: 'Personal Care',
        stock: 90,
        unit: 'pc',
        description: 'Antibacterial soap',
        discount: 10,
      },
      {
        name: 'Chicken Breast',
        price: 220,
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
        category: 'Meat & Seafood',
        stock: 30,
        unit: 'kg',
        description: 'Fresh chicken breast',
        discount: 0,
      },
    ];

    const products = await Product.insertMany(sampleProducts);
    res.status(201).json({
      message: 'Products seeded successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new product (Admin)
// @route   POST /api/products/add
// @access  Public (should be protected in production)
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, unit, stock, description, discount, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || !stock) {
      return res.status(400).json({ message: 'Please provide name, price, and stock' });
    }

    let imageLink = imageUrl;

    // If file uploaded, use Cloudinary with memory buffer
    if (req.file) {
      const cloudinary = (await import('../config/cloudinary.js')).default;
      
      // Upload buffer to Cloudinary using upload_stream
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'quickmart-products',
            transformation: [
              { width: 500, height: 500, crop: 'limit' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Write buffer to stream
        uploadStream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      imageLink = result.secure_url;
    }

    // Check if image exists
    if (!imageLink) {
      return res.status(400).json({ message: 'Please provide an image file or URL' });
    }

    // Create product
    const product = new Product({
      name,
      price: parseFloat(price),
      image: imageLink,
      category,
      stock: parseInt(stock),
      unit: unit || 'piece',
      description: description || '',
      discount: parseInt(discount) || 0,
      inStock: parseInt(stock) > 0
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      ...savedProduct.toObject()
    });

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ 
      message: 'Failed to add product',
      error: error.message 
    });
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
// @access  Public (should be protected in production)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image from Cloudinary if it's a Cloudinary URL
    if (product.image && product.image.includes('cloudinary.com')) {
      try {
        const cloudinary = (await import('../config/cloudinary.js')).default;
        // Extract public_id from Cloudinary URL
        const urlParts = product.image.split('/');
        const fileName = urlParts[urlParts.length - 1].split('.')[0];
        const folder = urlParts[urlParts.length - 2];
        const publicId = `${folder}/${fileName}`;
        
        await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted from Cloudinary:', publicId);
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError.message);
        // Continue with product deletion even if Cloudinary delete fails
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ 
      message: 'Product deleted successfully',
      deletedProduct: product
    });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: 'Failed to delete product',
      error: error.message 
    });
  }
};

// @desc    Toggle product stock status (Admin)
// @route   PATCH /api/products/:id/stock
// @access  Public (should be protected in production)
export const toggleProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Toggle inStock status
    product.inStock = !product.inStock;

    // If marking as out of stock, set stock to 0
    if (!product.inStock) {
      product.stock = 0;
    }

    const updatedProduct = await product.save();

    res.json({
      message: `Product marked as ${updatedProduct.inStock ? 'In Stock' : 'Out of Stock'}`,
      ...updatedProduct.toObject()
    });

  } catch (error) {
    console.error('Error toggling stock:', error);
    res.status(500).json({ 
      message: 'Failed to update stock status',
      error: error.message 
    });
  }
};
