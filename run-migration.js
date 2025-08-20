const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  try {
    console.log('🔧 Running Google OAuth database migration...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'add-google-oauth-columns.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Migration SQL loaded');
    console.log('🚀 Executing migration...');
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('❌ Migration failed:', error);
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('📋 Added columns:');
    console.log('   - google_id (VARCHAR(255) UNIQUE)');
    console.log('   - profile_image (TEXT)');
    console.log('   - name (VARCHAR(255))');
    console.log('   - Index on google_id for performance');
    
    // Verify the columns were added
    console.log('\n🔍 Verifying migration...');
    const { data: columns, error: verifyError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'users')
      .in('column_name', ['google_id', 'profile_image', 'name']);
    
    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
      return;
    }
    
    console.log('✅ Verification successful!');
    console.log('📋 Found columns:', columns.map(col => col.column_name));
    
  } catch (error) {
    console.error('❌ Migration script error:', error);
  }
}

// Alternative method using direct SQL execution
async function runMigrationAlternative() {
  try {
    console.log('🔧 Running Google OAuth database migration (alternative method)...');
    
    // Add google_id column
    console.log('📝 Adding google_id column...');
    const { error: error1 } = await supabase.rpc('exec_sql', { 
      sql: 'ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;' 
    });
    
    if (error1) {
      console.error('❌ Failed to add google_id:', error1);
      return;
    }
    
    // Add profile_image column
    console.log('📝 Adding profile_image column...');
    const { error: error2 } = await supabase.rpc('exec_sql', { 
      sql: 'ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;' 
    });
    
    if (error2) {
      console.error('❌ Failed to add profile_image:', error2);
      return;
    }
    
    // Add name column
    console.log('📝 Adding name column...');
    const { error: error3 } = await supabase.rpc('exec_sql', { 
      sql: 'ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);' 
    });
    
    if (error3) {
      console.error('❌ Failed to add name:', error3);
      return;
    }
    
    // Create index
    console.log('📝 Creating index...');
    const { error: error4 } = await supabase.rpc('exec_sql', { 
      sql: 'CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);' 
    });
    
    if (error4) {
      console.error('❌ Failed to create index:', error4);
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration script error:', error);
  }
}

// Check if we can use the RPC method
async function checkRPCAvailability() {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1;' });
    
    if (error) {
      console.log('⚠️  RPC method not available, using alternative method...');
      await runMigrationAlternative();
    } else {
      console.log('✅ RPC method available, using standard method...');
      await runMigration();
    }
  } catch (error) {
    console.log('⚠️  RPC method not available, using alternative method...');
    await runMigrationAlternative();
  }
}

// Run the migration
checkRPCAvailability();
