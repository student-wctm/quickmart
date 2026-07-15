// Headless E2E Test (faster, no browser UI)
const { chromium } = require('playwright');

async function quickTest() {
  console.log('🚀 Running Quick Headless Test...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Test 1: Homepage
    console.log('1️⃣  Testing Homepage...');
    await page.goto('https://quickmart-orpin.vercel.app');
    const title = await page.title();
    console.log(`   ✅ Title: ${title}`);

    // Test 2: Products API
    console.log('\n2️⃣  Testing Backend API...');
    const response = await page.request.get('https://quickmart-backend-six.vercel.app/api/products');
    console.log(`   ✅ Status: ${response.status()}`);
    const products = await response.json();
    console.log(`   ✅ Products: ${products.length}`);

    // Test 3: Place Order API (Direct)
    console.log('\n3️⃣  Testing Order API Directly...');
    const orderData = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '9876543210',
        address: { street: '123 Test St', pincode: '560001' }
      },
      orderItems: [
        {
          product: products[0]._id,
          name: products[0].name,
          quantity: 1,
          price: products[0].price,
          image: products[0].image
        }
      ],
      totalPrice: products[0].price,
      deliveryFee: 30,
      paymentMethod: 'Cash on Delivery'
    };

    const orderResponse = await page.request.post('https://quickmart-backend-six.vercel.app/api/orders', {
      data: orderData,
      headers: { 'Content-Type': 'application/json' }
    });

    console.log(`   Status: ${orderResponse.status()}`);
    
    if (orderResponse.ok()) {
      const orderResult = await orderResponse.json();
      console.log(`   ✅ Order Created: ${orderResult._id}`);
      console.log(`   💡 Check Telegram for notification!`);
    } else {
      const errorText = await orderResponse.text();
      console.log(`   ❌ Failed: ${errorText}`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

quickTest();
