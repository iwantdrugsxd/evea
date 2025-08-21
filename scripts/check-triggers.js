require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTriggers() {
  try {
    console.log('Checking database triggers...');

    // Query to check triggers on vendor_cards table
    const { data: triggers, error: triggerError } = await supabase
      .rpc('get_table_triggers', { table_name: 'vendor_cards' });

    if (triggerError) {
      console.log('Trigger info not available via RPC, checking manually...');
      
      // Try a simpler insert without any potential trigger fields
      const { data: simpleInsert, error: simpleError } = await supabase
        .from('vendor_cards')
        .insert({
          vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
          title: 'Simple Test',
          description: 'Simple test without complex fields',
          category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
          base_price: 1000,
          price_type: 'fixed',
          service_area: ['Test'],
          is_active: true,
          featured: false,
          average_rating: 0,
          total_reviews: 0,
          simplified_price_type: 'starting_from'
        })
        .select()
        .single();

      if (simpleError) {
        console.log('❌ Simple insert also failed:', simpleError);
        
        // Try with even fewer fields
        const { data: minimalInsert, error: minimalError } = await supabase
          .from('vendor_cards')
          .insert({
            vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
            title: 'Minimal Test',
            description: 'Minimal test',
            category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
            base_price: 1000,
            price_type: 'fixed',
            is_active: true,
            featured: false,
            average_rating: 0,
            total_reviews: 0
          })
          .select()
          .single();

        if (minimalError) {
          console.log('❌ Minimal insert also failed:', minimalError);
        } else {
          console.log('✅ Minimal insert successful');
          console.log('Minimal record ID:', minimalInsert.id);
          
          // Clean up
          await supabase
            .from('vendor_cards')
            .delete()
            .eq('id', minimalInsert.id);
        }
      } else {
        console.log('✅ Simple insert successful');
        console.log('Simple record ID:', simpleInsert.id);
        
        // Clean up
        await supabase
          .from('vendor_cards')
          .delete()
          .eq('id', simpleInsert.id);
      }
    } else {
      console.log('Triggers found:', triggers);
    }

  } catch (error) {
    console.error('Error checking triggers:', error);
  }
}

checkTriggers();
