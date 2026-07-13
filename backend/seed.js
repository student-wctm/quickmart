import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const sampleProducts = [
      { name: 'Fresh Potato', price: 30, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', category: 'Vegetables & Fruits', stock: 150, unit: 'kg', description: 'Fresh farm potatoes', discount: 5 },
      { name: 'Fresh Onion', price: 35, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400', category: 'Vegetables & Fruits', stock: 120, unit: 'kg', description: 'Fresh red onions', discount: 0 },
      { name: 'Fresh Tomatoes', price: 40, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b1d?w=400', category: 'Vegetables & Fruits', stock: 100, unit: 'kg', description: 'Fresh and juicy tomatoes', discount: 10 },
      { name: 'Fresh Bananas', price: 50, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', category: 'Vegetables & Fruits', stock: 80, unit: 'dozen', description: 'Fresh yellow bananas', discount: 5 },
      { name: 'Fresh Apples', price: 150, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', category: 'Vegetables & Fruits', stock: 70, unit: 'kg', description: 'Crispy red apples', discount: 12 },
      { name: 'Fresh Carrots', price: 45, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', category: 'Vegetables & Fruits', stock: 90, unit: 'kg', description: 'Fresh orange carrots', discount: 8 },
      { name: 'Fresh Oranges', price: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', category: 'Vegetables & Fruits', stock: 60, unit: 'kg', description: 'Sweet and juicy oranges', discount: 10 },
      { name: 'Amul Taaza Toned Milk', price: 56, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', category: 'Dairy & Breakfast', stock: 100, unit: '1 L', description: 'Fresh toned milk', discount: 0 },
      { name: 'Amul Gold Full Cream Milk', price: 33, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', category: 'Dairy & Breakfast', stock: 120, unit: '500 ml', description: 'Full cream fresh milk', discount: 0 },
      { name: 'Mother Dairy Cow Milk', price: 58, image: 'https://images.unsplash.com/photo-1623769025577-f1f288a34cc9?w=400', category: 'Dairy & Breakfast', stock: 90, unit: '1 L', description: 'Pure cow milk', discount: 5 },
      { name: 'Nandini GoodLife Gold Milk', price: 60, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', category: 'Dairy & Breakfast', stock: 80, unit: '1 L', description: 'Premium quality milk', discount: 0 },
      { name: 'Whole Wheat Bread', price: 35, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', category: 'Dairy & Breakfast', stock: 80, unit: 'pack', description: 'Whole wheat bread', discount: 0 },
      { name: 'Amul Butter', price: 52, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', category: 'Dairy & Breakfast', stock: 70, unit: '100g', description: 'Utterly butterly delicious', discount: 5 },
      { name: 'Fresh Paneer', price: 90, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', category: 'Dairy & Breakfast', stock: 50, unit: '200g', description: 'Fresh cottage cheese', discount: 0 },
      { name: 'Amul Curd', price: 30, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400', category: 'Dairy & Breakfast', stock: 90, unit: '400g', description: 'Fresh thick curd', discount: 0 },
      { name: 'Cornflakes', price: 180, image: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400', category: 'Dairy & Breakfast', stock: 60, unit: '500g', description: 'Crunchy breakfast cereal', discount: 15 },
      { name: 'Lays Classic Chips', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', category: 'Snacks & Munchies', stock: 200, unit: 'pack', description: 'Crispy potato chips', discount: 15 },
      { name: 'Kurkure Masala Munch', price: 20, image: 'https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400', category: 'Snacks & Munchies', stock: 180, unit: 'pack', description: 'Crunchy spicy snack', discount: 10 },
      { name: 'Dairy Milk Chocolate', price: 45, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400', category: 'Snacks & Munchies', stock: 150, unit: '52g', description: 'Smooth milk chocolate', discount: 5 },
      { name: 'Parle-G Biscuits', price: 10, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', category: 'Snacks & Munchies', stock: 250, unit: 'pack', description: 'Classic glucose biscuits', discount: 0 },
      { name: 'Oreo Cookies', price: 30, image: 'https://images.unsplash.com/photo-1606312619070-d48b4dcd7bf7?w=400', category: 'Snacks & Munchies', stock: 140, unit: 'pack', description: 'Chocolate cream cookies', discount: 12 },
      { name: 'Haldiram Namkeen', price: 35, image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400', category: 'Snacks & Munchies', stock: 160, unit: '200g', description: 'Traditional Indian snack', discount: 8 },
      { name: 'Coca Cola', price: 40, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400', category: 'Cold Drinks & Juices', stock: 150, unit: '750ml', description: 'Refreshing cold drink', discount: 0 },
      { name: 'Sprite', price: 40, image: 'https://images.unsplash.com/photo-1625740504070-7a8f7e17e92f?w=400', category: 'Cold Drinks & Juices', stock: 140, unit: '750ml', description: 'Lemon lime soda', discount: 0 },
      { name: 'Real Mango Juice', price: 110, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', category: 'Cold Drinks & Juices', stock: 80, unit: '1L', description: 'Real fruit juice', discount: 10 },
      { name: 'Pepsi', price: 40, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400', category: 'Cold Drinks & Juices', stock: 130, unit: '750ml', description: 'Refreshing cola drink', discount: 0 },
      { name: 'Tropicana Orange Juice', price: 120, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', category: 'Cold Drinks & Juices', stock: 70, unit: '1L', description: '100% orange juice', discount: 15 },
      { name: 'Aashirvaad Superior MP Atta', price: 65, image: 'https://images.unsplash.com/photo-1586201375761-8386672b3d6c?w=400', category: 'Home & Cleaning', stock: 100, unit: '5kg', description: 'Premium whole wheat flour', discount: 8 },
      { name: 'Fortune Chakki Fresh Atta', price: 72, image: 'https://images.unsplash.com/photo-1586201375761-8386672b3d6c?w=400', category: 'Home & Cleaning', stock: 95, unit: '5kg', description: 'Stone-ground wheat flour', discount: 7 },
      { name: 'India Gate Basmati Rice', price: 120, image: 'https://images.unsplash.com/photo-1586201375761-8386672b3d6c?w=400', category: 'Home & Cleaning', stock: 90, unit: '1kg', description: 'Long grain aromatic rice', discount: 10 },
      { name: 'Daawat Rozana Rice', price: 95, image: 'https://images.unsplash.com/photo-1586201375761-8386672b3d6c?w=400', category: 'Home & Cleaning', stock: 88, unit: '1kg', description: 'Everyday cooking rice', discount: 6 },
      { name: 'Dettol Original Soap', price: 35, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400', category: 'Personal Care', stock: 110, unit: 'pack', description: 'Antibacterial bathing bar', discount: 10 },
      { name: 'Lux Soft Glow Soap', price: 38, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400', category: 'Personal Care', stock: 100, unit: 'pack', description: 'Smooth and fragrant bathing bar', discount: 8 },
      { name: 'Pears Pure Soap', price: 42, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400', category: 'Personal Care', stock: 90, unit: 'pack', description: 'Gentle and mild soap', discount: 5 },
      { name: 'Surf Excel Matic Liquid', price: 180, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', category: 'Home & Cleaning', stock: 75, unit: '1L', description: 'Laundry detergent liquid', discount: 12 },
      { name: 'Lizol Disinfectant', price: 160, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', category: 'Home & Cleaning', stock: 70, unit: '500ml', description: 'Surface disinfectant spray', discount: 10 },
      { name: 'Fortune Soyabean Oil', price: 140, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400', category: 'Home & Cleaning', stock: 80, unit: '1L', description: 'Cooking oil for daily meals', discount: 8 },
      { name: 'Patanjali Cow Ghee', price: 420, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400', category: 'Home & Cleaning', stock: 65, unit: '500g', description: 'Pure clarified butter', discount: 5 }
    ];

    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully seeded ${products.length} products!`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
