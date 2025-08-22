require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addVendorCardConstraint() {
  try {
    console.log('🔒 Adding vendor card constraint...');

    // Get all vendor cards to check for duplicates
    console.log('📋 Checking for vendors with multiple cards...');
    
    const { data: allCards, error: fetchError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching cards:', fetchError);
      return;
    }

    // Group cards by vendor_id
    const vendorCardGroups = {};
    allCards.forEach(card => {
      if (!vendorCardGroups[card.vendor_id]) {
        vendorCardGroups[card.vendor_id] = [];
      }
      vendorCardGroups[card.vendor_id].push(card);
    });

    // Find vendors with multiple cards
    const vendorsWithMultipleCards = Object.entries(vendorCardGroups)
      .filter(([vendorId, cards]) => cards.length > 1)
      .map(([vendorId, cards]) => ({ vendorId, cards }));

    if (vendorsWithMultipleCards.length > 0) {
      console.log(`Found ${vendorsWithMultipleCards.length} vendors with multiple cards`);
      
      // Keep only the most recent card for each vendor
      for (const { vendorId, cards } of vendorsWithMultipleCards) {
        console.log(`Processing vendor ${vendorId} with ${cards.length} cards`);
        
        // Keep the first (most recent) card, delete the rest
        const cardsToDelete = cards.slice(1).map(card => card.id);
        
        const { error: deleteError } = await supabase
          .from('vendor_cards')
          .delete()
          .in('id', cardsToDelete);

        if (deleteError) {
          console.error('Error deleting duplicate cards:', deleteError);
        } else {
          console.log(`Deleted ${cardsToDelete.length} duplicate cards for vendor ${vendorId}`);
        }
      }
    } else {
      console.log('No vendors with multiple cards found');
    }

    // Note: We can't add the constraint directly through the client
    // This would need to be done through a database migration or direct SQL
    console.log('⚠️  Note: Unique constraint needs to be added manually via database migration');
    console.log('   Run: ALTER TABLE vendor_cards ADD CONSTRAINT vendor_cards_vendor_id_unique UNIQUE (vendor_id);');

    // Verify the constraint by checking again
    console.log('🔍 Verifying no vendors have multiple cards...');
    
    const { data: verificationCards, error: verifyError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, created_at')
      .order('created_at', { ascending: false });

    if (verifyError) {
      console.error('Error verifying constraint:', verifyError);
    } else {
      const verificationGroups = {};
      verificationCards.forEach(card => {
        if (!verificationGroups[card.vendor_id]) {
          verificationGroups[card.vendor_id] = [];
        }
        verificationGroups[card.vendor_id].push(card);
      });

      const vendorsWithMultipleCardsAfter = Object.entries(verificationGroups)
        .filter(([vendorId, cards]) => cards.length > 1);

      if (vendorsWithMultipleCardsAfter.length > 0) {
        console.log('❌ Verification failed - still found vendors with multiple cards');
      } else {
        console.log('✅ Verification successful - no vendors with multiple cards');
      }
    }

    console.log('🎉 Vendor card constraint setup completed!');
    console.log('📝 Next step: Add the unique constraint via database migration');

  } catch (error) {
    console.error('❌ Error during constraint setup:', error);
  }
}

addVendorCardConstraint();
