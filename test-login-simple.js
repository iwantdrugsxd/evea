require('dotenv').config({ path: '.env.local' });

async function testLoginSimple() {
  try {
    console.log('🔍 Testing Simple Login...');
    
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('📤 Sending login request to localhost:3003...');
    const response = await fetch('http://localhost:3003/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    console.log('📥 Response status:', response.status);
    
    const data = await response.json();
    console.log('📥 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('👤 User data:', data.user);
      console.log('🍪 Cookies should be set automatically');
      
      // Test the /api/auth/me endpoint
      console.log('\n🔍 Testing /api/auth/me endpoint...');
      const meResponse = await fetch('http://localhost:3003/api/auth/me', {
        headers: {
          'Cookie': response.headers.get('set-cookie') || ''
        }
      });
      
      console.log('📥 /me Response status:', meResponse.status);
      const meData = await meResponse.json();
      console.log('📥 /me Response data:', JSON.stringify(meData, null, 2));
      
    } else {
      console.log('❌ Login failed:', data.error);
    }
    
  } catch (error) {
    console.error('💥 Login test failed:', error);
  }
}

testLoginSimple();
