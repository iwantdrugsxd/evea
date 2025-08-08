require('dotenv').config({ path: '.env.local' });

async function testRegistration() {
  console.log('🧪 Testing Registration API');
  console.log('============================\n');

  const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '9876543210',
    password: 'password123',
    role: 'customer'
  };

  console.log('📝 Test user data:', testUser);

  try {
    console.log('📤 Sending registration request...');
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    const data = await response.json();
    console.log('📊 Response data:', data);

    if (response.ok) {
      console.log('✅ Registration API is working!');
    } else {
      console.log('❌ Registration API failed:', data.error);
    }

  } catch (error) {
    console.error('💥 Error testing registration:', error.message);
  }
}

// Wait a bit for the server to start
setTimeout(testRegistration, 3000);

