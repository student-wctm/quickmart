# Testing Guide - New Features

## 🎯 Features to Test

1. ✅ Enhanced Search Functionality
2. ✅ WhatsApp Order Notifications
3. ✅ Multiple Milk Product Varieties
4. ✅ "All" Category Filter
5. ✅ Category-Based Filtering

---

## 🔍 Test 1: Search Functionality

### Test Search for "Milk"

1. **Open**: http://localhost:5173
2. **Click** in the search bar (top of page)
3. **Type**: "milk"
4. **Expected Result**:
   - Page shows "Search Results for 'milk'"
   - Displays 4 milk products:
     - Amul Taaza Toned Milk (₹56, 1 L)
     - Amul Gold Full Cream Milk (₹33, 500 ml)
     - Mother Dairy Cow Milk (₹58, 1 L)
     - Nandini GoodLife Gold Milk (₹60, 1 L)
   - Shows "Found 4 product(s)"
   - "Clear Search" button visible

### Test Case-Insensitive Search

5. **Try these searches** (all should work):
   - "MILK" → Shows 4 products
   - "Milk" → Shows 4 products
   - "milk" → Shows 4 products
   - "MiLk" → Shows 4 products

### Test Search for Other Products

6. **Search**: "chips"
   - Should show: Lays Classic Chips

7. **Search**: "tomato"
   - Should show: Fresh Tomatoes

8. **Search**: "amul"
   - Should show: Multiple Amul products (Milk, Butter, Curd)

### Test Search with No Results

9. **Search**: "pizza"
   - Shows empty state with 🔍 icon
   - Message: "No products found for 'pizza'"
   - "View All Products" button appears

### Test Clear Search

10. **Click** "Clear Search" or "View All Products"
    - Returns to full catalog view
    - All categories visible again
    - Search bar cleared

---

## 🏷️ Test 2: Category Filtering

### Test "All" Category

1. **Click** on "All" category card (🛍️ icon)
   - Shows all 27 products grouped by 4 categories
   - "All" card highlighted with green border
   - All category sections visible:
     - Vegetables & Fruits (7 products)
     - Dairy & Breakfast (9 products)
     - Snacks & Munchies (6 products)
     - Cold Drinks & Juices (5 products)

### Test Individual Categories

2. **Click** "Dairy & Breakfast" (🥛 icon)
   - Only dairy products shown (9 items)
   - Category card highlighted with green border
   - "Show All" button appears
   - See all 4 milk varieties plus other dairy items

3. **Click** "Vegetables & Fruits" (🥬 icon)
   - Only vegetables/fruits shown (7 items)
   - Previous category deselected

4. **Click** "Snacks & Munchies" (🍿 icon)
   - Only snacks shown (6 items)

5. **Click** "Cold Drinks & Juices" (🥤 icon)
   - Only beverages shown (5 items)

### Test "Show All" Button

6. **From any category view**, click "Show All"
   - Returns to full catalog
   - All categories visible again

---

## 📱 Test 3: WhatsApp Order Notification

### Setup First (IMPORTANT!)

1. **Open**: `frontend/src/pages/Home.jsx`
2. **Find line 117**: `const shopWhatsAppNumber = '919876543210';`
3. **Replace** with YOUR WhatsApp number:
   - Format: Country code + number (no + or spaces)
   - Example: `919876543210` for India
   - Example: `14155552671` for USA

### Test Order Flow

4. **Add Products to Cart**:
   - Search for "milk"
   - Click ADD on "Amul Taaza Toned Milk"
   - Click ADD on "Fresh Tomatoes"
   - Click ADD on "Lays Classic Chips"

5. **Open Cart**:
   - Click cart icon (top right)
   - Verify 3 items in cart
   - See total price

6. **Fill Order Form**:
   - Name: Your Name
   - Email: your@email.com
   - Phone: Your Phone Number
   - Address: Your Full Address

7. **Place Order**:
   - Click "Place Order (Cash on Delivery)"
   - **WhatsApp should open automatically**

### Verify WhatsApp Message

8. **Check WhatsApp window**:
   - Should show pre-filled message with:
     - 🛒 NEW ORDER RECEIVED header
     - Order ID (MongoDB ID)
     - Customer details (name, phone, email, address)
     - Items ordered with quantities and prices
     - Item total, delivery fee, final total
     - Payment method

9. **Send the Message**:
   - Click Send in WhatsApp
   - You should receive the order notification
   - Order saved to MongoDB database

### Expected WhatsApp Format

```
🛒 NEW ORDER RECEIVED!

Order ID: 6a4fe21208f36f5ac7a19525

Customer Details:
Name: John Doe
Phone: 9876543210
Email: john@example.com
Address: 123 Main Street, City

Items Ordered:
• Amul Taaza Toned Milk x1 - ₹56
• Fresh Tomatoes x2 - ₹72
• Lays Classic Chips x1 - ₹17

Item Total: ₹145.00
Delivery Fee: ₹20.00
Total Amount: ₹165.00

Payment Method: Cash on Delivery
```

---

## 🧪 Test 4: Combined Features

### Test Search + Add to Cart

1. **Search**: "milk"
2. **Add** multiple milk products to cart
3. **Place order**
4. **Verify** WhatsApp shows correct milk items

### Test Category + Add to Cart

1. **Click** "Snacks & Munchies"
2. **Add** several snacks to cart
3. **Place order**
4. **Verify** WhatsApp notification

### Test Multiple Searches

1. **Search**: "milk" → Add items
2. **Search**: "chips" → Add items
3. **Search**: "tomato" → Add items
4. **View cart** → Should show all items
5. **Place order** → WhatsApp shows all

---

## 📊 Database Verification

### Check Products in Database

```bash
# From backend folder
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://quickmart:Quick123@cluster0.d2otalv.mongodb.net/quick-commerce')
  .then(() => mongoose.connection.db.collection('products').find().toArray())
  .then(products => console.log('Total Products:', products.length))
  .then(() => process.exit(0));
"
```

### Expected Product Count

- **Total**: 27 products
- **Vegetables & Fruits**: 7 products
- **Dairy & Breakfast**: 9 products (including 4 milk varieties)
- **Snacks & Munchies**: 6 products
- **Cold Drinks & Juices**: 5 products

---

## 🐛 Troubleshooting

### Search Not Working?
- Check browser console for errors
- Verify products are loaded (check Network tab)
- Clear browser cache and reload

### WhatsApp Not Opening?
- Verify WhatsApp number format (country code + number)
- Check if WhatsApp is installed
- Try on mobile device (works better)
- Check browser allows popups

### Category Filter Not Working?
- Clear browser cache
- Check if ProductCard component is imported
- Verify products have correct category names

### Products Not Showing?
- Run seed script: `node seed.js` in backend folder
- Check MongoDB connection
- Verify API endpoint: http://localhost:5000/api/products

---

## ✅ Success Checklist

- [ ] Search for "milk" shows 4 milk products
- [ ] Search is case-insensitive
- [ ] "All" category shows all products grouped
- [ ] Individual categories filter correctly
- [ ] "Show All" button returns to full view
- [ ] Cart functionality works
- [ ] Order form accepts all details
- [ ] WhatsApp opens with order details
- [ ] Order saved to database
- [ ] Success message appears after order

---

## 🎉 All Tests Passed?

Your Quick-Commerce website is ready for your shop! 

**Next Steps:**
1. Update WhatsApp number to your actual shop number
2. Test with real products from your shop
3. Customize product images and prices
4. Add more categories as needed
5. Share the website with customers!

**Website URL**: http://localhost:5173
**Admin Panel** (MongoDB): https://cloud.mongodb.com

Happy selling! 🛒🎊
