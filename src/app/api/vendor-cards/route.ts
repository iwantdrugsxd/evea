import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    // For development purposes, allow unauthenticated requests
    let vendorId = null;
    
    if (userError || !user) {
      console.log('No authenticated user found, using development mode');
      // In development, use the test vendor ID
      vendorId = '5d2a1e06-e3c5-46f3-bd23-af25db68bff8'; // Test vendor ID for development
    } else {
      // Get vendor details
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .select('id, verification_status')
        .eq('user_id', user.id)
        .single();

      if (vendorError || !vendor) {
        console.log('Vendor not found for user, using development mode');
        vendorId = '5d2a1e06-e3c5-46f3-bd23-af25db68bff8'; // Test vendor ID for development
      } else {
        if (vendor.verification_status !== 'verified') {
          console.log('Vendor not verified, but allowing in development mode');
        }
        vendorId = vendor.id;
      }
    }

    const body = await request.json();
    const {
      title,
      description,
      category_id,
      subcategory_id,
      base_price,
      starting_price,
      price_type,
      service_area,
      max_capacity,
      inclusions,
      exclusions,
      equipment_provided,
      cancellation_policy,
      tags,
      images,
      videos,
      portfolio_images,
      discount_percentage,
      years_of_experience,
      insurance_coverage,
      certifications,
      emergency_contact
    } = body;

    // Validate required fields
    if (!title || !description || !category_id || !base_price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Start transaction - only include fields that exist in the vendor_cards table
    const insertData = {
      vendor_id: vendorId,
      title,
      description,
      category_id,
      subcategory_id: subcategory_id || null,
      base_price,
      starting_price: starting_price || null,
      price_type,
      service_area: service_area || [],
      max_capacity: max_capacity || null,
      inclusions: inclusions || null,
      exclusions: exclusions || null,
      equipment_provided: equipment_provided || null,
      cancellation_policy: cancellation_policy || null,
      images: images || null,
      videos: videos || null,
      portfolio_images: portfolio_images || null,
      tags: tags || null,
      experience_years: years_of_experience || null,
      insurance_coverage: insurance_coverage || null,
      certifications: certifications || null,
      emergency_contact: emergency_contact || null,
      is_active: true,
      featured: false,
      average_rating: 0,
      total_reviews: 0
    };

    // Remove undefined values to avoid database errors
    Object.keys(insertData).forEach(key => {
      if (insertData[key] === undefined) {
        delete insertData[key];
      }
    });

    const { data: card, error: cardError } = await supabase
      .from('vendor_cards')
      .insert(insertData)
      .select()
      .single();

    if (cardError) {
      console.error('Card creation error:', cardError);
      console.error('Attempted to insert data:', {
        vendor_id: vendorId,
        title,
        description,
        category_id,
        base_price
      });
      return NextResponse.json({ 
        error: 'Failed to create service card',
        details: cardError.message 
      }, { status: 500 });
    }

    // Insert service areas
    if (service_area && service_area.length > 0) {
      const serviceAreaData = service_area.map((area: string) => ({
        service_id: card.id,
        area_name: area
      }));

      const { error: areaError } = await supabase
        .from('service_areas')
        .insert(serviceAreaData);

      if (areaError) {
        console.error('Service area insertion error:', areaError);
      }
    }

    // Insert service inclusions
    if (inclusions && inclusions.length > 0) {
      const inclusionData = inclusions
        .filter((inclusion: string) => inclusion.trim())
        .map((inclusion: string, index: number) => ({
          service_id: card.id,
          inclusion_text: inclusion,
          order_index: index
        }));

      if (inclusionData.length > 0) {
        const { error: inclusionError } = await supabase
          .from('service_inclusions')
          .insert(inclusionData);

        if (inclusionError) {
          console.error('Service inclusion insertion error:', inclusionError);
        }
      }
    }

    // Insert service exclusions
    if (exclusions && exclusions.length > 0) {
      const exclusionData = exclusions
        .filter((exclusion: string) => exclusion.trim())
        .map((exclusion: string, index: number) => ({
          service_id: card.id,
          exclusion_text: exclusion,
          order_index: index
        }));

      if (exclusionData.length > 0) {
        const { error: exclusionError } = await supabase
          .from('service_exclusions')
          .insert(exclusionData);

        if (exclusionError) {
          console.error('Service exclusion insertion error:', exclusionError);
        }
      }
    }

    // Insert service images
    if (images && images.length > 0) {
      const imageData = images.map((image: string, index: number) => ({
        service_id: card.id,
        image_url: image,
        is_primary: index === 0,
        order_index: index
      }));

      const { error: imageError } = await supabase
        .from('service_images')
        .insert(imageData);

      if (imageError) {
        console.error('Service image insertion error:', imageError);
      }
    }

    // Insert service pricing
    const { error: pricingError } = await supabase
      .from('service_pricing')
      .insert({
        service_id: card.id,
        pricing_type: price_type,
        base_price,
        currency: 'INR'
      });

    if (pricingError) {
      console.error('Service pricing insertion error:', pricingError);
    }

    // Update search index
    const { error: searchError } = await supabase
      .from('service_search_index')
      .insert({
        service_id: card.id,
        title,
        category_name: '', // Will be populated by trigger
        primary_image_url: images?.[0] || '',
        min_price: starting_price || base_price,
        max_price: base_price,
        tags_csv: tags?.join(',') || '',
        main_area: service_area?.[0] || '',
        status: 'active',
        vendor_name: '', // Will be populated by trigger
        average_rating: 0,
        total_reviews: 0
      });

    if (searchError) {
      console.error('Search index insertion error:', searchError);
    }

    // Create notification for admin review (if needed)
    if (user) {
      const { error: notificationError } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: 'service_card_created',
          title: 'New Service Card Created',
          message: `Service card "${title}" has been created successfully.`,
          data: { card_id: card.id, title }
        });

      if (notificationError) {
        console.error('Notification creation error:', notificationError);
      }
    }

    return NextResponse.json({
      success: true,
      card,
      message: 'Service card created successfully'
    });

  } catch (error) {
    console.error('Service card creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('vendor_cards')
      .select(`
        *,
        categories(name, slug),
        vendors(business_name, city, state),
        service_images(image_url, is_primary),
        service_pricing(base_price, pricing_type)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category_id', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: cards, error } = await query
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching cards:', error);
      return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
    }

    return NextResponse.json({
      cards: cards || [],
      hasMore: cards?.length === limit,
      total: cards?.length || 0
    });

  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
