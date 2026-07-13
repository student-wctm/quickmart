# Quick-Commerce Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (comes with Node.js)

## Step-by-Step Installation

### 1. Install MongoDB

**Option A: Local Installation (Windows)**
```cmd
# Download MongoDB from: https://www.mongodb.com/try/download/community
# Run the installer and follow the setup wizard
# Start MongoDB service
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
- Visit https://www.mongodb.com/cloud/atlas
- Create a free account and cluster
- Get your connection string
- Update backend/.env with your connection string

### 2. Backend Setup

```cmd
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already created with default values
# If using MongoDB Atlas, update MONGODB_URI in .env

# Start the backend server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Seed Sample Products (Important!)

Open a new terminal and run:

```cmd
curl -X POST http://localhost:5000/api/products/seed
```

Or open your browser and visit: http://localhost:5000/api/products/seed

This will populate your database with sample products.

### 4. Frontend Setup

Open a new terminal:

```cmd
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on http://localhost:5173

### 5. Access the Application

Open your browser and visit: http://localhost:5173

## Testing the Application

1. **Browse Products**: The homepage displays products grouped by category
2. **Add to Cart**: Click the "ADD" button on any product
3. **View Cart**: Click the cart icon in the navbar
4. **Place Order**: Fill in delivery details and click "Place Order"

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create a new product
- `POST /api/products/seed` - Seed sample products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

## Project Structure

```
quick-commerce/
├── backend/
│   ├── config/db.js           # MongoDB connection
│   ├── models/
│   │   ├── Product.js         # Product schema
│   │   └── Order.js           # Order schema
│   ├── controllers/
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Banner.jsx
│   │   │   ├── CategorySection.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features Implemented

✅ Modern responsive UI with Tailwind CSS
✅ Product listing with categories
✅ Shopping cart functionality
✅ Add/Remove/Update cart items
✅ Cart persistence with localStorage
✅ Order placement
✅ Product search functionality
✅ Discount badges
✅ Stock management
✅ Animated banner slider
✅ Category-wise product display
✅ Real-time cart count

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check if MONGODB_URI in .env is correct
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend (5000): Kill the process using port 5000
- Frontend (5173): Kill the process using port 5173

```cmd
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Dependencies Installation Issues
```cmd
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install
```

## Next Steps

To enhance the application, consider adding:
- User authentication (JWT)
- Product search with filters
- Order tracking
- Payment gateway integration
- Admin dashboard
- Product reviews and ratings
- Wishlist functionality
- Multiple delivery addresses

## Support

For issues or questions:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify MongoDB is running
4. Check if ports 5000 and 5173 are available

Happy coding! 🚀
