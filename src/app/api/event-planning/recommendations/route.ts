import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Event planning specific parameters
    const eventType = searchParams.get('eventType')
    const eventDate = searchParams.get('eventDate')
    const guestCount = searchParams.get('guestCount')
    const budget = searchParams.get('budget')
    const location = searchParams.get('location')
    const services = searchParams.get('services')

    console.log('Event Planning Recommendations API called with params:', {
      eventType,
      eventDate,
      guestCount,
      budget,
      location,
      services
    })
    
    const supabase = createClient()
    
    // Parse services into array
    const serviceSlugs = services ? services.split(',').filter(Boolean) : []
    
    // Get all categories that match the requested services
    let categoryQuery = supabase
      .from('categories')
      .select('id, name, slug, icon')
    
    if (serviceSlugs.length > 0) {
      categoryQuery = categoryQuery.in('slug', serviceSlugs)
    }
    
    const { data: categories, error: categoryError } = await categoryQuery
    
    if (categoryError) {
      console.error('Error fetching categories:', categoryError)
      return NextResponse.json(
        { error: 'Failed to fetch categories', details: categoryError },
        { status: 500 }
      )
    }
    
    const vendorsByCategory: any = {}
    
    // For each category, get at least 20 vendors
    for (const category of categories || []) {
      let query = supabase
        .from('vendor_cards')
        .select(`
          id, 
          title, 
          description, 
          base_price, 
          featured, 
          average_rating, 
          total_reviews,
          created_at,
          vendor_id,
          category_id
        `)
        .eq('category_id', category.id)
        .order('featured', { ascending: false })
        .order('average_rating', { ascending: false })
        .order('total_reviews', { ascending: false })
        .limit(25) // Get 25 to ensure we have at least 20 after filtering
      
      // Apply event-specific filters
      if (budget) {
        const budgetNum = parseInt(budget)
        if (budgetNum > 0) {
          query = query.lte('base_price', budgetNum * 1.2) // Allow 20% over budget for variety
        }
      }
      
      if (guestCount) {
        const guestNum = parseInt(guestCount)
        if (guestNum > 0) {
          // Note: This would need a capacity field in vendor_cards table
          // For now, we'll skip this filter
        }
      }
      
      const { data: vendors, error: vendorError } = await query
      
      if (vendorError) {
        console.error(`Error fetching vendors for category ${category.name}:`, vendorError)
        continue
      }
      
      // Transform vendors to match expected format
      const transformedVendors = vendors?.map(vendor => ({
        id: vendor.id,
        title: vendor.title,
        description: vendor.description,
        base_price: vendor.base_price,
        price_range_min: vendor.base_price * 0.8,
        price_range_max: vendor.base_price * 1.2,
        average_rating: vendor.average_rating || 0,
        total_reviews: vendor.total_reviews || 0,
        total_orders: Math.floor(Math.random() * 100) + 10, // Mock data
        max_capacity: Math.floor(Math.random() * 500) + 50, // Mock data
        featured: vendor.featured || false,
        images: [
          '/images/hero/theme.jpeg',
          '/images/hero/Diwali Decoration Ideas By Artbyte Studio.jpeg',
          '/images/hero/_ (3).jpeg'
        ],
        videos: [],
        inclusions: [
          'Professional setup and teardown',
          'Quality assurance guarantee',
          '24/7 customer support'
        ],
        exclusions: [
          'Travel beyond service area',
          'Additional equipment rental',
          'Overtime charges'
        ],
        service_area: [location || 'Mumbai', 'Pune', 'Delhi', 'Bangalore'],
        response_time_hours: Math.floor(Math.random() * 24) + 1,
        vendor: {
          id: vendor.vendor_id || 'vendor-' + vendor.id,
          business_name: `${vendor.title} Services`,
          business_logo_url: null,
          city: location || 'Mumbai',
          state: 'Maharashtra',
          verification_status: 'verified',
          verification_tier: vendor.featured ? 'premium' : 'standard',
          portfolio_quality_score: Math.floor(Math.random() * 30) + 70
        },
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          icon: category.icon
        }
      })) || []
      
      // Ensure we have at least 20 vendors, if not, add some mock vendors
      if (transformedVendors.length < 20) {
        const mockVendorsNeeded = 20 - transformedVendors.length
        for (let i = 0; i < mockVendorsNeeded; i++) {
          const mockVendor = {
            id: `mock-${category.id}-${i}`,
            title: `${category.name} Provider ${i + 1}`,
            description: `Professional ${category.name.toLowerCase()} services with years of experience in creating memorable events.`,
            base_price: Math.floor(Math.random() * 50000) + 10000,
            price_range_min: 8000,
            price_range_max: 60000,
            average_rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
            total_reviews: Math.floor(Math.random() * 200) + 20,
            total_orders: Math.floor(Math.random() * 150) + 30,
            max_capacity: Math.floor(Math.random() * 400) + 100,
            featured: Math.random() > 0.7, // 30% chance of being featured
            images: [
              '/images/hero/theme.jpeg',
              '/images/hero/Fotos Plateia _ Freepik.jpeg',
              '/images/hero/_ (3).jpeg'
            ],
            videos: [],
            inclusions: [
              'Professional setup and teardown',
              'Quality assurance guarantee',
              '24/7 customer support',
              'Flexible customization options'
            ],
            exclusions: [
              'Travel beyond service area',
              'Additional equipment rental',
              'Overtime charges',
              'Special permits and licenses'
            ],
            service_area: [location || 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai'],
            response_time_hours: Math.floor(Math.random() * 12) + 2,
            vendor: {
              id: `mock-vendor-${category.id}-${i}`,
              business_name: `${category.name} Excellence ${i + 1}`,
              business_logo_url: null,
              city: location || 'Mumbai',
              state: 'Maharashtra',
              verification_status: 'verified',
              verification_tier: Math.random() > 0.6 ? 'premium' : 'standard',
              portfolio_quality_score: Math.floor(Math.random() * 25) + 75
            },
            category: {
              id: category.id,
              name: category.name,
              slug: category.slug,
              icon: category.icon
            }
          }
          transformedVendors.push(mockVendor)
        }
      }
      
      vendorsByCategory[category.slug] = {
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          icon: category.icon
        },
        vendors: transformedVendors.slice(0, 20) // Ensure exactly 20 vendors
      }
    }
    
    console.log('Event planning recommendations generated:', {
      categoriesCount: Object.keys(vendorsByCategory).length,
      totalVendors: Object.values(vendorsByCategory).reduce((acc: number, cat: any) => acc + (cat.vendors?.length || 0), 0)
    })
    
    return NextResponse.json({
      vendorsByCategory,
      eventType,
      eventDate,
      guestCount,
      budget,
      location,
      services: serviceSlugs
    })
    
  } catch (error) {
    console.error('Error in event planning recommendations API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
