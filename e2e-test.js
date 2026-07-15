// E2E Test for QuickMart Checkout Flow using Playwright
// This script tests the complete checkout flow and verifies Telegram notifications

const { chromium } = require('playwright');

const CONFIG = {
  frontendUrl: 'https://quickmart-orpin.vercel.app',
  backendUrl: 'https://quickmart-backend-six.vercel.app',
  headless: false, // Set to true to run without browser UI
  slowMo: 500, // Slow down by 500ms to see actions
};

const DUMMY_USER = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '9876543210',
  address: '123 Test Street, Test City',
  pincode: '560001',
};

async function runE2ETest() {
  console.log('🚀 Starting QuickMart E2E Test...\n');
  
  const browser = await chromium.launch({
    headless: CONFIG.headless,
    slowMo: CONFIG.slowMo,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  });

  // Enable request/response logging
  const page = await context.newPage();
  
  // Log all network requests
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log(`📤 Request: ${request.method()} ${request.url()}`);
    }
  });

  // Log all network responses
  page.on('response', async response => {
    if (response.url().includes('/api/')) {
      console.log(`📥 Response: ${response.status()} ${response.url()}`);
      try {
        const body = await response.json();
        console.log('   Body:', JSON.stringify(body, null, 2));
      } catch (e) {
        // Not JSON or empty body
      }
    }
  });

  // Log console messages from the page
  page.on('console', msg => {
    console.log(`🖥️  Browser Console: ${msg.text()}`);
  });

  try {
    // Step 1: Navigate to homepage
    console.log('Step 1: Navigating to homepage...');
    await page.goto(CONFIG.frontendUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log('✅ Homepage loaded\n');

    // Step 2: Check if products are loaded
    console.log('Step 2: Checking if products are loaded...');
    const productCards = await page.locator('[data-testid="product-card"], .product-card, button:has-text("ADD")').count();
    console.log(`   Found ${productCards} product cards`);
    
    if (productCards === 0) {
      console.error('❌ No products found on homepage!');
      console.log('   This might be due to missing VITE_API_URL environment variable in frontend');
      await page.screenshot({ path: 'error-no-products.png' });
      throw new Error('No products loaded');
    }
    console.log('✅ Products are loaded\n');

    // Step 3: Add first product to cart
    console.log('Step 3: Adding product to cart...');
    await page.waitForTimeout(1000);
    
    // Try multiple selectors for the ADD button
    const addButton = page.locator('button:has-text("ADD")').first();
    await addButton.waitFor({ timeout: 5000 });
    await addButton.click();
    await page.waitForTimeout(1500);
    console.log('✅ Product added to cart\n');

    // Step 4: Verify cart count
    console.log('Step 4: Verifying cart count...');
    const cartIcon = page.locator('[class*="cart"], [href="/cart"]');
    await cartIcon.waitFor({ timeout: 5000 });
    console.log('✅ Cart icon found\n');

    // Step 5: Navigate to cart
    console.log('Step 5: Navigating to cart...');
    await page.goto(`${CONFIG.frontendUrl}/cart`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log('✅ Cart page loaded\n');

    // Step 6: Proceed to checkout
    console.log('Step 6: Proceeding to checkout...');
    const checkoutButton = page.locator('button:has-text("Proceed to Checkout"), a:has-text("Proceed to Checkout")').first();
    await checkoutButton.waitFor({ timeout: 5000 });
    await checkoutButton.click();
    await page.waitForTimeout(2000);
    console.log('✅ Checkout page loaded\n');

    // Step 7: Fill in delivery details
    console.log('Step 7: Filling in delivery details...');
    
    // Fill name
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first();
    await nameInput.waitFor({ timeout: 5000 });
    await nameInput.fill(DUMMY_USER.name);
    console.log(`   Name: ${DUMMY_USER.name}`);

    // Fill email
    const emailInput = page.locator('input[name="email"], input[type="email"]').first();
    await emailInput.fill(DUMMY_USER.email);
    console.log(`   Email: ${DUMMY_USER.email}`);

    // Fill phone
    const phoneInput = page.locator('input[name="phone"], input[type="tel"], input[placeholder*="Phone" i]').first();
    await phoneInput.fill(DUMMY_USER.phone);
    console.log(`   Phone: ${DUMMY_USER.phone}`);

    // Fill address
    const addressInput = page.locator('input[name="address"], textarea[name="address"], input[placeholder*="Address" i]').first();
    await addressInput.fill(DUMMY_USER.address);
    console.log(`   Address: ${DUMMY_USER.address}`);

    // Fill pincode
    const pincodeInput = page.locator('input[name="pincode"], input[placeholder*="Pincode" i], input[placeholder*="ZIP" i]').first();
    await pincodeInput.fill(DUMMY_USER.pincode);
    console.log(`   Pincode: ${DUMMY_USER.pincode}`);

    await page.waitForTimeout(1000);
    console.log('✅ Form filled\n');

    // Take screenshot before submitting
    await page.screenshot({ path: 'checkout-form-filled.png' });
    console.log('📸 Screenshot saved: checkout-form-filled.png\n');

    // Step 8: Submit the order
    console.log('Step 8: Placing order...');
    console.log('   Listening for API response...\n');

    // Set up promise to catch the order response
    const orderResponsePromise = page.waitForResponse(
      response => response.url().includes('/api/orders') && response.request().method() === 'POST',
      { timeout: 30000 }
    );

    // Click submit button
    const submitButton = page.locator('button[type="submit"]:has-text("Place Order"), button:has-text("Place Order")').first();
    await submitButton.click();

    // Wait for and capture the response
    try {
      const orderResponse = await orderResponsePromise;
      const status = orderResponse.status();
      const responseBody = await orderResponse.json();

      console.log('📥 Order API Response:');
      console.log(`   Status: ${status}`);
      console.log(`   Body: ${JSON.stringify(responseBody, null, 2)}\n`);

      if (status === 201 || status === 200) {
        console.log('✅ Order placed successfully!');
        console.log(`   Order ID: ${responseBody._id || responseBody.id || 'N/A'}`);
        
        // Wait for redirect or success message
        await page.waitForTimeout(3000);
        
        // Take screenshot of success page
        await page.screenshot({ path: 'order-success.png' });
        console.log('📸 Screenshot saved: order-success.png\n');

        console.log('🎉 TEST PASSED: Order completed successfully!');
        console.log('📱 Check your Telegram for notification\n');
      } else {
        console.error('❌ Order failed with status:', status);
        console.error('   Response:', responseBody);
        
        // Take screenshot of error
        await page.screenshot({ path: 'order-error.png' });
        console.log('📸 Screenshot saved: order-error.png\n');
        
        console.log('🔍 Possible issues:');
        console.log('   1. MongoDB connection error');
        console.log('   2. Missing environment variables');
        console.log('   3. CORS configuration issue');
        console.log('   4. Telegram credentials missing\n');
      }
    } catch (error) {
      console.error('❌ Failed to capture order response');
      console.error('   Error:', error.message);
      
      // Check page content for error messages
      const pageContent = await page.textContent('body');
      if (pageContent.includes('Failed to place order')) {
        console.error('   Page shows: "Failed to place order. Please try again"\n');
      }
      
      await page.screenshot({ path: 'order-timeout.png' });
      console.log('📸 Screenshot saved: order-timeout.png\n');
    }

    // Step 9: Test backend health
    console.log('Step 9: Testing backend health...');
    const healthResponse = await page.request.get(CONFIG.backendUrl);
    console.log(`   Backend status: ${healthResponse.status()}`);
    const healthBody = await healthResponse.json();
    console.log(`   Backend message: ${healthBody.message}\n`);

    // Step 10: Test products API
    console.log('Step 10: Testing products API...');
    const productsResponse = await page.request.get(`${CONFIG.backendUrl}/api/products`);
    console.log(`   Products API status: ${productsResponse.status()}`);
    const products = await productsResponse.json();
    console.log(`   Products count: ${products.length}\n`);

  } catch (error) {
    console.error('\n❌ TEST FAILED');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Take final error screenshot
    await page.screenshot({ path: 'test-error.png' });
    console.log('📸 Screenshot saved: test-error.png\n');
  } finally {
    console.log('\n🏁 Test completed. Closing browser...');
    await browser.close();
  }
}

// Run the test
runE2ETest()
  .then(() => {
    console.log('\n✅ Test script execution completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test script failed:', error);
    process.exit(1);
  });
