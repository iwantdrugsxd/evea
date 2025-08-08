require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUserData() {
  try {
    console.log('🔍 Checking test user data...');
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'test@example.com')
      .single();

    if (error) {
      console.error('❌ Error fetching user:', error);
      return;
    }

    console.log('✅ User found:');
    console.log('ID:', user.id);
    console.log('Email:', user.email);
    console.log('Full Name:', user.full_name);
    console.log('Role:', user.role);
    console.log('Is Active:', user.is_active);
    console.log('Email Verified:', user.email_verified);
    console.log('Created At:', user.created_at);
    console.log('Updated At:', user.updated_at);
    
    // Check if user has isActive field
    console.log('\n🔍 Checking isActive field...');
    if (user.is_active === true) {
      console.log('✅ User is active');
    } else {
      console.log('❌ User is not active');
    }
    
  } catch (error) {
    console.error('💥 Error:', error);
  }
}

checkUserData();
