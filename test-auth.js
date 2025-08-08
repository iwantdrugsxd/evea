require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function testAuth() {
  try {
    console.log('🔍 Testing Authentication Flow...');
    
    // Test JWT token generation
    const testUser = {
      userId: 'f1ab249b-d74e-4f75-a616-e9775669b430',
      email: 'test@example.com',
      role: 'customer'
    };
    
    const token = jwt.sign(testUser, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ JWT token generated:', token.substring(0, 50) + '...');
    
    // Test JWT token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ JWT token verified:', decoded);
    
    // Test password hashing
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed:', hashedPassword.substring(0, 20) + '...');
    
    // Test password verification
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    console.log('✅ Password verification:', isPasswordValid);
    
    console.log('\n🎉 All authentication tests passed!');
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error);
  }
}

testAuth();

