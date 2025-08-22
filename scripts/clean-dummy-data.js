require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function cleanDummyData() {
  try {
    console.log('🧹 Starting cleanup of dummy data...');

    // 1. Clean up dummy vendor cards
    console.log('📋 Cleaning up dummy vendor cards...');
    
    const { data: dummyCards, error: cardsError } = await supabase
      .from('vendor_cards')
      .select('*')
      .or('title.ilike.%test%,title.ilike.%dummy%,title.ilike.%sample%,description.ilike.%test%,description.ilike.%dummy%,description.ilike.%sample%');

    if (cardsError) {
      console.error('Error fetching dummy cards:', cardsError);
    } else {
      console.log(`Found ${dummyCards?.length || 0} dummy cards to delete`);
      
      if (dummyCards && dummyCards.length > 0) {
        const cardIds = dummyCards.map(card => card.id);
        const { error: deleteCardsError } = await supabase
          .from('vendor_cards')
          .delete()
          .in('id', cardIds);

        if (deleteCardsError) {
          console.error('Error deleting dummy cards:', deleteCardsError);
        } else {
          console.log(`✅ Deleted ${dummyCards.length} dummy cards`);
        }
      }
    }

    // 2. Clean up dummy vendors (vendors without real cards)
    console.log('🏢 Cleaning up dummy vendors...');
    
    const { data: vendorsWithCards, error: vendorsError } = await supabase
      .from('vendors')
      .select(`
        id,
        business_name,
        vendor_cards!inner(id)
      `);

    if (vendorsError) {
      console.error('Error fetching vendors with cards:', vendorsError);
    } else {
      console.log(`Found ${vendorsWithCards?.length || 0} vendors with real cards`);
      
      // Get all vendor IDs
      const { data: allVendors, error: allVendorsError } = await supabase
        .from('vendors')
        .select('id, business_name');

      if (allVendorsError) {
        console.error('Error fetching all vendors:', allVendorsError);
      } else {
        const vendorsWithRealCards = vendorsWithCards?.map(v => v.id) || [];
        const allVendorIds = allVendors?.map(v => v.id) || [];
        const vendorsToDelete = allVendorIds.filter(id => !vendorsWithRealCards.includes(id));

        console.log(`Found ${vendorsToDelete.length} vendors without real cards to delete`);

        if (vendorsToDelete.length > 0) {
          const { error: deleteVendorsError } = await supabase
            .from('vendors')
            .delete()
            .in('id', vendorsToDelete);

          if (deleteVendorsError) {
            console.error('Error deleting dummy vendors:', deleteVendorsError);
          } else {
            console.log(`✅ Deleted ${vendorsToDelete.length} dummy vendors`);
          }
        }
      }
    }

    // 3. Clean up dummy orders
    console.log('📦 Cleaning up dummy orders...');
    
    const { data: dummyOrders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .or('order_number.ilike.%test%,order_number.ilike.%dummy%,customer_name.ilike.%test%,customer_name.ilike.%dummy%');

    if (ordersError) {
      console.error('Error fetching dummy orders:', ordersError);
    } else {
      console.log(`Found ${dummyOrders?.length || 0} dummy orders to delete`);
      
      if (dummyOrders && dummyOrders.length > 0) {
        const orderIds = dummyOrders.map(order => order.id);
        const { error: deleteOrdersError } = await supabase
          .from('orders')
          .delete()
          .in('id', orderIds);

        if (deleteOrdersError) {
          console.error('Error deleting dummy orders:', deleteOrdersError);
        } else {
          console.log(`✅ Deleted ${dummyOrders.length} dummy orders`);
        }
      }
    }

    // 4. Clean up dummy reviews
    console.log('⭐ Cleaning up dummy reviews...');
    
    const { data: dummyReviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .or('comment.ilike.%test%,comment.ilike.%dummy%,comment.ilike.%sample%');

    if (reviewsError) {
      console.error('Error fetching dummy reviews:', reviewsError);
    } else {
      console.log(`Found ${dummyReviews?.length || 0} dummy reviews to delete`);
      
      if (dummyReviews && dummyReviews.length > 0) {
        const reviewIds = dummyReviews.map(review => review.id);
        const { error: deleteReviewsError } = await supabase
          .from('reviews')
          .delete()
          .in('id', reviewIds);

        if (deleteReviewsError) {
          console.error('Error deleting dummy reviews:', deleteReviewsError);
        } else {
          console.log(`✅ Deleted ${dummyReviews.length} dummy reviews`);
        }
      }
    }

    // 5. Get final statistics
    console.log('\n📊 Final database statistics:');
    
    const { count: finalCards } = await supabase
      .from('vendor_cards')
      .select('*', { count: 'exact', head: true });

    const { count: finalVendors } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true });

    const { count: finalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    const { count: finalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true });

    console.log(`📋 Vendor Cards: ${finalCards || 0}`);
    console.log(`🏢 Vendors: ${finalVendors || 0}`);
    console.log(`📦 Orders: ${finalOrders || 0}`);
    console.log(`⭐ Reviews: ${finalReviews || 0}`);

    console.log('\n✅ Cleanup completed successfully!');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  }
}

cleanDummyData();
