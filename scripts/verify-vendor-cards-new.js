require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyVendorCards() {
  try {
    console.log('🔍 Verifying vendor cards...');
    
    // Get all vendor cards
    const { data: allCards, error: fetchError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, title, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching cards:', fetchError);
      return;
    }

    // Group cards by vendor_id
    const vendorGroups = {};
    allCards.forEach(card => {
      if (!vendorGroups[card.vendor_id]) {
        vendorGroups[card.vendor_id] = [];
      }
      vendorGroups[card.vendor_id].push(card);
    });

    // Find vendors with multiple cards
    const vendorsWithMultipleCards = Object.entries(vendorGroups)
      .filter(([vendorId, cards]) => cards.length > 1)
      .map(([vendorId, cards]) => ({
        vendorId,
        cardCount: cards.length,
        cards: cards.map(c => ({ id: c.id, title: c.title, created_at: c.created_at }))
      }));

    console.log(`📊 Total vendor cards: ${allCards.length}`);
    console.log(`👥 Total unique vendors: ${Object.keys(vendorGroups).length}`);
    console.log(`⚠️  Vendors with multiple cards: ${vendorsWithMultipleCards.length}`);

    if (vendorsWithMultipleCards.length > 0) {
      console.log('\n📋 Vendors with multiple cards (showing first 5):');
      vendorsWithMultipleCards.slice(0, 5).forEach(({ vendorId, cardCount, cards }) => {
        console.log(`\nVendor ${vendorId}:`);
        console.log(`  Cards: ${cardCount}`);
        cards.forEach(card => {
          console.log(`    - ${card.id}: "${card.title}" (${card.created_at})`);
        });
      });
      
      if (vendorsWithMultipleCards.length > 5) {
        console.log(`\n... and ${vendorsWithMultipleCards.length - 5} more vendors with multiple cards`);
      }
      
      // Show next steps
      console.log('\n📝 To fix this, run: node scripts/add-vendor-card-constraint.js');
    } else {
      console.log('✅ All vendors have only one card!');
      console.log('📝 Next step: Add the unique constraint via database migration');
      console.log('   Run: ALTER TABLE vendor_cards ADD CONSTRAINT vendor_cards_vendor_id_unique UNIQUE (vendor_id);');
    }

  } catch (error) {
    console.error('❌ Error during verification:', error);
  }
}

verifyVendorCards();
