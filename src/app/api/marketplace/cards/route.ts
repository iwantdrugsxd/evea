import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper function to get category name by ID
const getCategoryName = (categoryId: string) => {
  const categoryMap: { [key: string]: string } = {
    '1': 'Photography & Video',
    '2': 'Catering & Food',
    '3': 'Decoration & Styling',
    '4': 'Music & Entertainment',
    '5': 'Transportation',
    '6': 'Venues & Locations',
    '7': 'Wedding Services',
    '8': 'Corporate Events',
    '9': 'Party Planning',
    '10': 'Beauty & Makeup'
  };
  return categoryMap[categoryId] || 'Uncategorized';
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('Fetching vendor cards with params:', { category, search, limit, offset });

    let query = supabase
      .from('vendor_cards')
      .select(`
        id,
        title,
        description,
        base_price,
        category_id,
        vendor_id,
        images,
        portfolio_images,
        average_rating,
        total_reviews,
        created_at,
        updated_at,
        vendors!inner(
          business_name,
          business_type,
          city,
          state,
          verification_status
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Filter by category if provided
    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    // Filter by search term if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: cards, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch vendor cards', details: error.message },
        { status: 500 }
      );
    }

    console.log(`Fetched ${cards?.length || 0} vendor cards`);

    // Transform the data to match the expected format
    const transformedCards = cards?.map(card => ({
      id: card.id,
      title: card.title || 'Untitled Service',
      description: card.description || 'No description available',
      base_price: card.base_price || 0,
      category_id: card.category_id,
      vendor_id: card.vendor_id,
      service_images: card.images || card.portfolio_images || [],
      average_rating: card.average_rating || 0,
      total_reviews: card.total_reviews || 0,
      total_orders: 0, // This field doesn't exist in the schema
      created_at: card.created_at,
      updated_at: card.updated_at,
      vendor: {
        business_name: card.vendors?.business_name || 'Unknown Vendor',
        location: `${card.vendors?.city || ''}, ${card.vendors?.state || ''}`.trim() || 'Location not specified'
      },
      category: {
        name: getCategoryName(card.category_id) || 'Uncategorized'
      }
    })) || [];

    return NextResponse.json({ 
      cards: transformedCards,
      total: count || transformedCards.length,
      hasMore: (count || 0) > offset + limit
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
