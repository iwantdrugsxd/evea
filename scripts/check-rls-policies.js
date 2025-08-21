require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRLSPolicies() {
  try {
    console.log('Checking RLS policies...');

    // Check if RLS is enabled on vendor_cards
    const { data: rlsInfo, error: rlsError } = await supabase
      .rpc('get_table_rls_info', { table_name: 'vendor_cards' });

    if (rlsError) {
      console.log('RLS info not available, checking manually...');
      
      // Try to insert a test record to see if RLS blocks it
      const { data: testInsert, error: insertError } = await supabase
        .from('vendor_cards')
        .insert({
          vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
          title: 'RLS Test',
          description: 'Testing RLS policies',
          category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
          base_price: 1000,
          price_type: 'fixed',
          service_area: ['Test'],
          is_active: true,
          featured: false,
          average_rating: 0,
          total_reviews: 0
        })
        .select()
        .single();

      if (insertError) {
        console.log('❌ RLS or other policy blocking insert:', insertError);
      } else {
        console.log('✅ Insert successful, RLS not blocking');
        console.log('Test record ID:', testInsert.id);
        
        // Clean up test record
        await supabase
          .from('vendor_cards')
          .delete()
          .eq('id', testInsert.id);
        console.log('Test record cleaned up');
      }
    } else {
      console.log('RLS Info:', rlsInfo);
    }

  } catch (error) {
    console.error('Error checking RLS policies:', error);
  }
}

checkRLSPolicies();
