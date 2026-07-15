// Quick test script for WhatsApp notifications
// Run this AFTER joining the Twilio WhatsApp Sandbox

const fetch = require('node-fetch');

console.log('🧪 Testing WhatsApp notification...');
console.log('📍 Endpoint: http://localhost:5000/api/orders/test-whatsapp\n');

fetch('http://localhost:5000/api/orders/test-whatsapp')
  .then(res => res.json())
  .then(data => {
    console.log('✅ Response received:\n');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('\n🎉 SUCCESS! Check WhatsApp on +918543838313');
      console.log('You should receive a test order notification!');
    } else {
      console.log('\n❌ FAILED!');
      console.log('Reason:', data.reason);
      console.log('\n💡 Troubleshooting:');
      console.log(JSON.stringify(data.troubleshooting, null, 2));
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    console.log('\n💡 Make sure the backend server is running:');
    console.log('   cd backend');
    console.log('   npm start');
    process.exit(1);
  });
