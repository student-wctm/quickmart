# QuickMart - Quick Commerce Website

A full-stack quick-commerce e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js), featuring Razorpay payment integration, Telegram notifications, and a modern responsive UI.

![QuickMart](https://img.shields.io/badge/MERN-Stack-green)
![Razorpay](https://img.shields.io/badge/Payment-Razorpay-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

### Customer Features
- 🛒 **Product Browsing**: Browse products by categories (Vegetables, Dairy, Snacks, Drinks)
- 🔍 **Search Functionality**: Real-time product search
- 🛍️ **Shopping Cart**: Add/remove items with quantity management
- 💳 **Multiple Payment Methods**: 
  - Cash on Delivery (COD)
  - Online Payment (Razorpay - UPI, Cards, Wallets)
- 📱 **Mobile Responsive**: Fully optimized for mobile devices
- 📍 **Location Selector**: Geolocation and manual address input
- 🔐 **Login with OTP**: Phone-based authentication (mock for demo)
- 📲 **WhatsApp Sharing**: Share orders via WhatsApp
- 📧 **Telegram Notifications**: Real-time order notifications via Telegram Bot

### Technical Features
- ⚡ Fast and responsive UI with React + Vite
- 🎨 Beautiful styling with Tailwind CSS
- 🔒 Secure payment verification with Razorpay
- 🗄️ MongoDB Atlas cloud database
- 🔔 Real-time notifications via Telegram Bot API
- 📦 RESTful API architecture
- 🎯 Context API for state management

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18+) with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Icons** for UI icons
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** (v14+)
- **Express.js** for API server
- **MongoDB** with Mongoose ODM
- **Razorpay SDK** for payment processing
- **Axios** for external API calls (Telegram)

### Services & APIs
- **MongoDB Atlas** - Cloud database
- **Razorpay** - Payment gateway
- **Telegram Bot API** - Order notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

You'll also need accounts and API keys for:
- **MongoDB Atlas** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Razorpay** - [Sign up](https://razorpay.com/)
- **Telegram Bot** - Create via [@BotFather](https://t.me/botfather)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/quickmart.git
cd quickmart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```bash
cp .env.example .env
```

Update the `.env` file with your credentials:

```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quick-commerce?retryWrites=true&w=majority

# Razorpay Keys (from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx

# Telegram Bot (Get token from @BotFather, Chat ID from @userinfobot)
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=1234567890
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Seed Database (Optional)

To populate your database with sample products:

```bash
cd backend
node seed.js
```

This will add 27+ products across 4 categories.

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## 🔑 API Keys Setup Guide

### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Add your IP address to Network Access (or use 0.0.0.0/0 for testing)
5. Get your connection string and replace `<username>` and `<password>`

### Razorpay
1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test Keys for development
4. Copy `Key ID` and `Key Secret` to your `.env` file

### Telegram Bot
1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` and follow instructions
3. Copy the **Bot Token**
4. Search for [@userinfobot](https://t.me/userinfobot) on Telegram
5. Send `/start` to get your **Chat ID**

## 📁 Project Structure

```
quickmart/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── orderController.js  # Order logic
│   │   ├── paymentController.js # Razorpay integration
│   │   └── productController.js # Product logic
│   ├── models/
│   │   ├── Order.js           # Order schema
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── productRoutes.js
│   ├── services/
│   │   └── telegramService.js # Telegram notifications
│   ├── .env.example           # Environment variables template
│   ├── seed.js                # Database seeder
│   ├── server.js              # Express server
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── checkout/      # Checkout components
│   │   │   ├── CategorySection.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── LocationModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── RazorpayButton.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx # Cart state management
│   │   ├── hooks/
│   │   │   └── useRazorpay.js  # Razorpay SDK loader
│   │   ├── pages/
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── utils/
│   │   │   ├── orderApi.js     # Order API calls
│   │   │   └── productApi.js   # Product API calls
│   │   ├── App.jsx
│   │   ├── constants.js
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🧪 Testing Razorpay Integration

Use these **test credentials** in Razorpay test mode:

### Test Cards
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)
- **Name**: Any name

### Test UPI
- Enter any UPI ID (e.g., `success@razorpay`)
- Payment will succeed automatically in test mode

### Test Wallets
- Select any wallet (Paytm, PhonePe, etc.)
- Payment will succeed automatically

## 🚀 Deployment

### Backend Deployment (Heroku/Render/Railway)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the platform dashboard
4. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Push your code to GitHub
2. Import project in Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Update API URL in `vite.config.js` to your backend URL
6. Deploy!

## 📸 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Inspired by Blinkit (formerly Grofers)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For support, email your.email@example.com or create an issue in this repository.

---

⭐ **If you like this project, please give it a star!** ⭐
