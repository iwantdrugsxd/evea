require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const testUser = {
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '9876543210',
      password_hash: await bcrypt.hash('password123', 10),
      role: 'customer',
      is_active: true,
      email_verified: true,
      phone_verified: false
    };

    const { data, error } = await supabase
      .from('users')
      .insert(testUser)
      .select('id, email, full_name')
      .single();

    if (error) {
      console.error('Error creating test user:', error);
      return;
    }

    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: password123');
    console.log('🆔 User ID:', data.id);
    console.log('\nYou can now use these credentials to test login/logout functionality.');

  } catch (error) {
    console.error('Failed to create test user:', error);
  }
}

createTestUser();
