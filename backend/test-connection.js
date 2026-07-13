import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB Connection...');
console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:@]+@/, ':****@'));

const testConnection = async () => {
  try {
    console.log('\nAttempting to connect...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ SUCCESS! MongoDB Connected:', conn.connection.host);
    console.log('Database Name:', conn.connection.name);
    
    await mongoose.connection.close();
    console.log('\nConnection closed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n🔑 AUTHENTICATION ERROR:');
      console.error('- Check if username "snapwc65_db_user" exists in MongoDB Atlas');
      console.error('- Verify the password is correct');
      console.error('- Ensure user has "Read and write to any database" privileges');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('\n🔒 SSL/TLS ERROR:');
      console.error('- This often indicates incorrect credentials');
      console.error('- Try resetting your database user password in MongoDB Atlas');
    }
    
    process.exit(1);
  }
};

testConnection();
