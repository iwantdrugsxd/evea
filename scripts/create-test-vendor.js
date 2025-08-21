require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTestVendor() {
  try {
    console.log('Creating test vendor...');

    // First, create a test user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: 'test-vendor@example.com',
      password: 'testpassword123',
      email_confirm: true
    });

    if (userError) {
      console.error('Error creating test user:', userError);
      return;
    }

    console.log('Test user created:', user.user.id);

    // Insert user into users table
    const { error: userInsertError } = await supabase
      .from('users')
      .insert({
        id: user.user.id,
        email: 'test-vendor@example.com',
        password_hash: 'dummy_hash_for_test',
        role: 'vendor',
        is_active: true,
        full_name: 'Test Vendor',
        first_name: 'Test',
        last_name: 'Vendor'
      });

    if (userInsertError) {
      console.error('Error inserting user into users table:', userInsertError);
      return;
    }

    console.log('User inserted into users table successfully');

    // Create a test vendor
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: user.user.id,
        business_name: 'Test Vendor Services',
        address: '123 Test Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400001',
        description: 'Test vendor for development purposes',
        verification_status: 'verified',
        business_type: 'Individual',
        years_in_business: '5+ years',
        primary_contact_name: 'Test Vendor',
        business_email: 'test-vendor@example.com',
        mobile_number: '+91-98765-43210'
      })
      .select()
      .single();

    if (vendorError) {
      console.error('Error creating test vendor:', vendorError);
      return;
    }

    console.log('Test vendor created successfully:', vendor.id);
    console.log('You can now use this vendor ID for testing:', vendor.id);

  } catch (error) {
    console.error('Error in createTestVendor:', error);
  }
}

createTestVendor();
