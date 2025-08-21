require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkVendorCardsSchema() {
  try {
    console.log('Checking vendor_cards table schema...');

    // Try to get one record to see the structure
    const { data, error } = await supabase
      .from('vendor_cards')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Error fetching vendor_cards:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('Sample vendor_cards record:');
      console.log(JSON.stringify(data[0], null, 2));
      
      console.log('\nAvailable columns:');
      Object.keys(data[0]).forEach(column => {
        console.log(`- ${column}: ${typeof data[0][column]}`);
      });
    } else {
      console.log('No records found in vendor_cards table');
    }

  } catch (error) {
    console.error('Error in checkVendorCardsSchema:', error);
  }
}

checkVendorCardsSchema();
