import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Product image is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'Vegetables & Fruits',
        'Dairy & Breakfast',
        'Snacks & Munchies',
        'Cold Drinks & Juices',
        'Beverages',
        'Instant & Frozen Food',
        'Personal Care',
        'Home & Cleaning',
        'Baby Care',
        'Bakery & Biscuits',
        'Meat & Seafood',
      ],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    unit: {
      type: String,
      default: 'pc',
    },
    description: {
      type: String,
      default: '',
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
