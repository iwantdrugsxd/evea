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

    // First, try to get an existing user
    const { data: existingUsers, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .limit(1);

    if (userError) {
      console.error('Error fetching users:', userError);
      return;
    }

    let userId;
    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
      console.log('Using existing user:', existingUsers[0].email);
    } else {
      console.log('No users found, creating a dummy vendor ID');
      userId = '00000000-0000-0000-0000-000000000000';
    }

    // Create a test vendor
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: userId,
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
      if (vendorError.code === '23505') {
        console.log('Test vendor already exists, getting existing vendor...');
        const { data: existingVendor } = await supabase
          .from('vendors')
          .select('id')
          .eq('business_email', 'test-vendor@example.com')
          .single();
        
        if (existingVendor) {
          console.log('Test vendor ID for development:', existingVendor.id);
          return existingVendor.id;
        }
      } else {
        console.error('Error creating test vendor:', vendorError);
        return;
      }
    } else {
      console.log('Test vendor created successfully:', vendor.id);
      console.log('You can now use this vendor ID for testing:', vendor.id);
      return vendor.id;
    }

  } catch (error) {
    console.error('Error in createTestVendor:', error);
  }
}

createTestVendor();
