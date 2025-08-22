require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCardExists() {
  try {
    console.log('Checking if card exists...');
    
    const cardId = 'aa607224-b2a8-4b2b-863c-ef1d4f738024';
    
    // Check if card exists
    const { data: card, error } = await supabase
      .from('vendor_cards')
      .select('*')
      .eq('id', cardId)
      .single();

    if (error) {
      console.log('❌ Card not found:', error.message);
      
      // Check what cards exist
      const { data: allCards, error: allCardsError } = await supabase
        .from('vendor_cards')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (allCardsError) {
        console.log('Error fetching cards:', allCardsError);
      } else {
        console.log('Recent cards:', allCards);
      }
    } else {
      console.log('✅ Card found:', card);
    }

  } catch (error) {
    console.error('Error checking card:', error);
  }
}

checkCardExists();
