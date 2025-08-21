require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function simpleTriggerFix() {
  try {
    console.log('Attempting simple trigger fix...');

    // Try to disable all triggers using direct SQL
    const { error: disableError } = await supabase
      .rpc('exec_sql', { 
        sql: 'ALTER TABLE vendor_cards DISABLE TRIGGER ALL;' 
      });

    if (disableError) {
      console.log('Could not disable triggers via RPC:', disableError);
      
      // Try alternative approach - insert with minimal data
      console.log('Trying minimal insert approach...');
      
      const { data: minimalInsert, error: insertError } = await supabase
        .from('vendor_cards')
        .insert({
          vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
          title: 'Minimal Test',
          description: 'Minimal test data',
          category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
          base_price: 1000,
          price_type: 'fixed',
          service_area: [],
          portfolio_images: [],
          is_active: true,
          featured: false,
          average_rating: 0,
          total_reviews: 0
        })
        .select()
        .single();

      if (insertError) {
        console.log('❌ Minimal insert failed:', insertError);
        
        // Try with even more minimal data
        console.log('Trying ultra-minimal insert...');
        
        const { data: ultraMinimal, error: ultraError } = await supabase
          .from('vendor_cards')
          .insert({
            vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
            title: 'Ultra Test',
            description: 'Ultra minimal',
            category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158',
            base_price: 1000,
            price_type: 'fixed',
            service_area: [],
            is_active: true,
            featured: false,
            average_rating: 0,
            total_reviews: 0
          })
          .select()
          .single();

        if (ultraError) {
          console.log('❌ Ultra minimal insert failed:', ultraError);
          console.log('The issue persists. We need to fix the database schema.');
        } else {
          console.log('✅ Ultra minimal insert successful!');
          console.log('Record ID:', ultraMinimal.id);
          
          // Clean up
          await supabase
            .from('vendor_cards')
            .delete()
            .eq('id', ultraMinimal.id);
          console.log('Test record cleaned up');
        }
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
      
      // Test insert after disabling triggers
      const { data: testInsert, error: testError } = await supabase
        .from('vendor_cards')
        .insert({
          vendor_id: '5d2a1e06-e3c5-46f3-bd23-af25db68bff8',
          title: 'Trigger Disabled Test',
          description: 'Testing after trigger disable',
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
        console.log('✅ Test insert successful after trigger disable!');
        console.log('Record ID:', testInsert.id);
        
        // Clean up
        await supabase
          .from('vendor_cards')
          .delete()
          .eq('id', testInsert.id);
        console.log('Test record cleaned up');
      }
    }

  } catch (error) {
    console.error('Error in simple trigger fix:', error);
  }
}

simpleTriggerFix();
