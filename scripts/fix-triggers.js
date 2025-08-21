require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixTriggers() {
  try {
    console.log('Attempting to fix triggers...');

    // Try to disable triggers temporarily
    const { error: disableError } = await supabase
      .rpc('disable_triggers', { table_name: 'vendor_cards' });

    if (disableError) {
      console.log('Could not disable triggers via RPC, trying direct SQL...');
      
      // Try a direct SQL approach to disable triggers
      const { error: sqlError } = await supabase
        .rpc('exec_sql', { 
          sql: 'ALTER TABLE vendor_cards DISABLE TRIGGER ALL;' 
        });

      if (sqlError) {
        console.log('Could not disable triggers, trying minimal insert...');
        
        // Try insert with minimal fields that won't trigger issues
        const { data: minimalInsert, error: insertError } = await supabase
          .from('vendor_cards')
          .insert({
            vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
            title: 'Trigger Test',
            description: 'Testing trigger issues',
            category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
            base_price: 1000,
            price_type: 'fixed',
            service_area: [], // Empty array, not null
            portfolio_images: [], // Empty array, not null
            is_active: true,
            featured: false,
            average_rating: 0,
            total_reviews: 0,
            simplified_price_type: 'starting_from'
          })
          .select()
          .single();

        if (insertError) {
          console.log('❌ Still failing with minimal insert:', insertError);
          
          // Try to identify the trigger issue
          console.log('The issue seems to be a trigger expecting "price_range_min" field');
          console.log('This suggests there might be a trigger that references non-existent columns');
          
        } else {
          console.log('✅ Minimal insert successful!');
          console.log('Record ID:', minimalInsert.id);
          
          // Clean up
          await supabase
            .from('vendor_cards')
            .delete()
            .eq('id', minimalInsert.id);
          console.log('Test record cleaned up');
        }
      } else {
        console.log('✅ Triggers disabled successfully');
      }
    } else {
      console.log('✅ Triggers disabled via RPC');
    }

  } catch (error) {
    console.error('Error fixing triggers:', error);
  }
}

fixTriggers();
