require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function executeSqlFix() {
  try {
    console.log('Executing SQL fix for triggers...');

    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'fix-database-triggers.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.log(`Statement ${i + 1} failed:`, error.message);
          // Continue with next statement
        } else {
          console.log(`Statement ${i + 1} executed successfully`);
        }
      } catch (err) {
        console.log(`Statement ${i + 1} error:`, err.message);
      }
    }

    console.log('SQL fix execution completed');

    // Test if the fix worked
    console.log('\nTesting if the fix worked...');
    
    const { data: testInsert, error: testError } = await supabase
      .from('vendor_cards')
      .insert({
        vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
        title: 'SQL Fix Test',
        description: 'Testing after SQL fix',
        category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
        base_price: 1000,
        price_type: 'fixed',
        service_area: [],
        portfolio_images: [],
        is_active: true,
        featured: false,
        average_rating: 0,
        total_reviews: 0,
        simplified_price_type: 'starting_from'
      })
      .select()
      .single();

    if (testError) {
      console.log('❌ Test insert still failing:', testError);
    } else {
      console.log('✅ Test insert successful!');
      console.log('Test record ID:', testInsert.id);
      
      // Clean up test record
      await supabase
        .from('vendor_cards')
        .delete()
        .eq('id', testInsert.id);
      console.log('Test record cleaned up');
    }

  } catch (error) {
    console.error('Error executing SQL fix:', error);
  }
}

executeSqlFix();
