import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('service_id');
    const limit = parseInt(searchParams.get('limit') || '4');

    if (!serviceId) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    // First, get the current service to understand its category
    const { data: currentService, error: currentServiceError } = await supabase
      .from('vendor_cards')
      .select('category_id, vendor_id')
      .eq('id', serviceId)
      .single();

    if (currentServiceError || !currentService) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Fetch similar services (same category, different vendor, active)
    const { data: recommendations, error: recommendationsError } = await supabase
      .from('vendor_cards')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, city, state),
        service_images(image_url, is_primary)
      `)
      .eq('category_id', currentService.category_id)
      .neq('vendor_id', currentService.vendor_id)
      .eq('is_active', true)
      .order('average_rating', { ascending: false })
      .limit(limit);

    if (recommendationsError) {
      console.error('Error fetching recommendations:', recommendationsError);
      return NextResponse.json({ error: 'Failed to fetch recommendations' }, { status: 500 });
    }

    // Transform the data
    const transformedRecommendations = recommendations?.map(service => ({
      ...service,
      images: service.service_images?.map(img => img.image_url) || []
    })) || [];

    return NextResponse.json({
      success: true,
      recommendations: transformedRecommendations
    });

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
