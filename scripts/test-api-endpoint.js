require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testApiEndpoint() {
  try {
    console.log('Testing API endpoint directly...');
    
    const cardId = 'aa607224-b2a8-4b2b-863c-ef1d4f738024';
    
    // Test the exact query that the API uses
    const { data: service, error: serviceError } = await supabase
      .from('vendor_cards')
      .select(`
        *,
        categories(name, slug)
      `)
      .eq('id', cardId)
      .single();

    console.log('Query Error:', serviceError);
    console.log('Query Result:', service);

    if (serviceError) {
      console.log('❌ Query failed:', serviceError.message);
    } else {
      console.log('✅ Query successful');
      console.log('Service ID:', service.id);
      console.log('Service Title:', service.title);
      console.log('Category:', service.categories);
    }

  } catch (error) {
    console.error('Error testing API endpoint:', error);
  }
}

testApiEndpoint();
