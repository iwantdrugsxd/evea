require('dotenv').config({ path: '.env.local' });

async function testLoginFlow() {
  try {
    console.log('🔍 Testing Login Flow...');
    
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    console.log('📤 Sending login request...');
    const response = await fetch('http://localhost:3004/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('📥 Response data:', JSON.stringify(data, null, 2));
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('👤 User data:', data.user);
      
      // Check if auth-token cookie is set
      const cookies = response.headers.get('set-cookie');
      console.log('🍪 Cookies:', cookies);
      
    } else {
      console.log('❌ Login failed:', data.error);
    }
    
  } catch (error) {
    console.error('💥 Login test failed:', error);
  }
}

testLoginFlow();

