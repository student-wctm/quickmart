# MongoDB Setup Guide

Your backend server is running but cannot connect to MongoDB. You have two options:

## Option 1: Use MongoDB Atlas (Recommended - Free Cloud Database) ⭐

This is the easiest option and requires no local installation!

### Steps:

1. **Create Free MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up with your email or Google account
   - Choose the FREE tier (M0 Sandbox)

2. **Create a Cluster**
   - Click "Build a Database"
   - Select "M0 FREE" tier
   - Choose your preferred region (closest to you)
   - Click "Create"

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Set username: `quickmart`
   - Set password: `quickmart123` (or your own)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)

6. **Update Your .env File**
   - Open `backend/.env`
   - Replace the MONGODB_URI line with:
   ```
   MONGODB_URI=mongodb+srv://quickmart:quickmart123@cluster0.xxxxx.mongodb.net/quick-commerce?retryWrites=true&w=majority
   ```
   (Replace `quickmart123` with your password and update cluster URL)

7. **Restart Backend Server**
   - The server should auto-restart with nodemon
   - You should see "MongoDB Connected" message

---

## Option 2: Install MongoDB Locally

### For Windows:

1. **Download MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Select "Windows" and "msi" package
   - Download the installer

2. **Install MongoDB**
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Install MongoDB as a Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Start MongoDB Service**
   Open Command Prompt as Administrator and run:
   ```cmd
   net start MongoDB
   ```

4. **Verify Installation**
   ```cmd
   mongod --version
   ```

5. **Backend will automatically connect**
   - Once MongoDB service is running, the backend will connect
   - Default connection: `mongodb://localhost:27017/quick-commerce`

---

## Quick Test

After setting up MongoDB, test the connection:

1. **Check Backend Console**
   - You should see: "MongoDB Connected: cluster0.xxxxx.mongodb.net" (Atlas)
   - Or: "MongoDB Connected: localhost" (Local)

2. **Seed Sample Products**
   Open browser and visit:
   ```
   http://localhost:5000/api/products/seed
   ```
   
   You should see a success message with 12 products created.

3. **Open the Application**
   ```
   http://localhost:5173
   ```

---

## Troubleshooting

### Backend says "ECONNREFUSED"
- MongoDB is not running or connection string is incorrect
- For local: Start MongoDB service
- For Atlas: Check connection string and network access settings

### Backend says "Authentication failed"
- Check username and password in connection string
- Verify database user exists in MongoDB Atlas

### "Bad auth: Authentication failed"
- Ensure password doesn't have special characters that need URL encoding
- Or use MongoDB Compass to connect first and verify credentials

---

## What's Next?

Once MongoDB is connected:
1. Seed the products (visit the seed endpoint)
2. Open http://localhost:5173
3. Browse products and add them to cart
4. Place test orders

Happy coding! 🚀
