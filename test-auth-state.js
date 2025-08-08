require('dotenv').config({ path: '.env.local' });

async function testAuthState() {
  try {
    console.log('🔍 Testing Authentication State...');
    
    // Test login
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('📤 Logging in...');
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    console.log('📥 Login status:', loginResponse.status);
    const loginResult = await loginResponse.json();
    console.log('📥 Login result:', JSON.stringify(loginResult, null, 2));
    
    if (loginResult.success) {
      console.log('✅ Login successful!');
      
      // Get cookies from response
      const cookies = loginResponse.headers.get('set-cookie');
      console.log('🍪 Cookies:', cookies);
      
      // Test /api/auth/me endpoint
      console.log('\n🔍 Testing /api/auth/me...');
      const meResponse = await fetch('http://localhost:3001/api/auth/me', {
        headers: {
          'Cookie': cookies || ''
        }
      });
      
      console.log('📥 /me status:', meResponse.status);
      const meResult = await meResponse.json();
      console.log('📥 /me result:', JSON.stringify(meResult, null, 2));
      
      if (meResult.success) {
        console.log('✅ User data retrieved successfully!');
        console.log('👤 User:', meResult.user);
        console.log('🔐 isActive:', meResult.user.isActive);
        console.log('📧 Email:', meResult.user.email);
      } else {
        console.log('❌ Failed to get user data:', meResult.error);
      }
    } else {
      console.log('❌ Login failed:', loginResult.error);
    }
    
  } catch (error) {
    console.error('💥 Test failed:', error);
  }
}

testAuthState();
