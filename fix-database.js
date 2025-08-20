const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixDatabase() {
  try {
    console.log('🔧 Fixing database schema for Google OAuth...');
    
    // First, let's check what columns exist
    console.log('📋 Checking current table structure...');
    
    // Try to query the users table to see what columns exist
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('id, email')
      .limit(1);
    
    if (testError) {
      console.error('❌ Cannot access users table:', testError);
      return;
    }
    
    console.log('✅ Users table is accessible');
    
    // Now let's try to add a test user with the new columns to see if they exist
    console.log('🧪 Testing column existence...');
    
    try {
      const { data: testInsert, error: insertError } = await supabase
        .from('users')
        .insert({
          email: 'test-oauth@example.com',
          google_id: 'test-google-id-123',
          name: 'Test OAuth User',
          profile_image: 'https://example.com/test.jpg'
        })
        .select();
      
      if (insertError) {
        console.log('❌ Columns missing, need to add them manually');
        console.log('Error details:', insertError);
        
        console.log('\n📝 MANUAL MIGRATION REQUIRED:');
        console.log('================================');
        console.log('Please run these SQL commands in your Supabase Dashboard:');
        console.log('');
        console.log('1. Go to: https://supabase.com/dashboard');
        console.log('2. Select your project');
        console.log('3. Go to SQL Editor → New Query');
        console.log('4. Run these commands one by one:');
        console.log('');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);');
        console.log('CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);');
        console.log('');
        console.log('5. After running the commands, restart your development server');
        console.log('6. Test Google OAuth again');
        
        return;
      } else {
        console.log('✅ All columns exist! Removing test data...');
        
        // Clean up test data
        await supabase
          .from('users')
          .delete()
          .eq('email', 'test-oauth@example.com');
        
        console.log('✅ Database is ready for Google OAuth!');
        console.log('🚀 You can now test Google OAuth at: http://localhost:3000/login');
      }
      
    } catch (error) {
      console.error('❌ Error during test:', error);
    }
    
  } catch (error) {
    console.error('❌ Database fix error:', error);
  }
}

// Run the fix
fixDatabase();
