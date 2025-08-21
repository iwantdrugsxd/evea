import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const isVendorView = searchParams.get('vendor') === 'true';

    // Build the query
    let query = supabase
      .from('vendor_cards')
      .select(`
        *,
        categories(name, slug),
        vendors(
          id,
          business_name,
          city,
          state,
          description,
          average_rating,
          total_reviews,
          years_in_business,
          business_website,
          instagram_handle,
          facebook_page
        ),
        service_images(image_url, is_primary, order_index),
        service_inclusions(inclusion_text, order_index),
        service_exclusions(exclusion_text, order_index),
        service_pricing(base_price, pricing_type, currency),
        service_areas(area_name, city, state)
      `)
      .eq('id', id);

    // Only filter by is_active for public view
    if (!isVendorView) {
      query = query.eq('is_active', true);
    }

    const { data: service, error: serviceError } = await query.single();

    if (serviceError || !service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Fetch reviews for this service
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        title,
        comment,
        created_at,
        customers:users(first_name, last_name)
      `)
      .eq('vendor_id', service.vendor_id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError);
    }

    // Transform reviews data
    const transformedReviews = reviews?.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      customer_name: `${review.customers?.first_name || ''} ${review.customers?.last_name || ''}`.trim() || 'Anonymous',
      created_at: review.created_at
    })) || [];

    // Calculate average rating and total reviews
    const totalReviews = transformedReviews.length;
    const averageRating = totalReviews > 0 
      ? transformedReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
      : 0;

    // Transform service data
    const transformedService = {
      ...service,
      reviews: transformedReviews,
      average_rating: averageRating,
      total_reviews: totalReviews,
      total_orders: 0, // TODO: Calculate from orders table
      images: service.service_images?.map(img => img.image_url) || [],
      inclusions: service.service_inclusions?.map(inc => inc.inclusion_text) || [],
      exclusions: service.service_exclusions?.map(exc => exc.exclusion_text) || [],
      service_area: service.service_areas?.map(area => area.area_name) || []
    };

    return NextResponse.json({
      success: true,
      service: transformedService
    });

  } catch (error) {
    console.error('Error fetching service details:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { id } = params;

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get vendor details
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (vendorError || !vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Check if the card belongs to the vendor
    const { data: card, error: cardError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id')
      .eq('id', id)
      .single();

    if (cardError || !card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }

    if (card.vendor_id !== vendor.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the card
    const { error: deleteError } = await supabase
      .from('vendor_cards')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting card:', deleteError);
      return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Card deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting card:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
