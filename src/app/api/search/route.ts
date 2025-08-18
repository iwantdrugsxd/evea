import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all' // all, vendors, categories, services
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query.trim()) {
      return NextResponse.json({
        results: [],
        suggestions: [],
        total: 0
      })
    }

    const supabase = createClient()
    const results: any = {
      vendors: [],
      categories: [],
      services: []
    }

    // Search vendors
    if (type === 'all' || type === 'vendors') {
      const { data: vendors, error: vendorsError } = await supabase
        .from('marketplace_cards')
        .select(`
          id,
          title,
          description,
          base_price,
          average_rating,
          total_reviews,
          featured,
          vendor:vendor_id (
            business_name,
            city,
            state,
            verification_status
          ),
          category:category_id (
            name,
            slug,
            icon
          )
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,vendor.business_name.ilike.%${query}%`)
        .order('featured', { ascending: false })
        .order('average_rating', { ascending: false })
        .limit(limit)

      if (!vendorsError && vendors) {
        results.vendors = vendors.map(vendor => ({
          id: vendor.id,
          type: 'vendor',
          title: vendor.title,
          subtitle: vendor.vendor?.business_name,
          description: vendor.description,
          price: vendor.base_price,
          rating: vendor.average_rating,
          reviews: vendor.total_reviews,
          location: `${vendor.vendor?.city}, ${vendor.vendor?.state}`,
          category: vendor.category?.name,
          featured: vendor.featured,
          verified: vendor.vendor?.verification_status === 'verified'
        }))
      }
    }

    // Search categories
    if (type === 'all' || type === 'categories') {
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          id,
          name,
          slug,
          icon,
          description
        `)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('is_active', true)
        .limit(limit)

      if (!categoriesError && categories) {
        results.categories = categories.map(category => ({
          id: category.id,
          type: 'category',
          title: category.name,
          subtitle: category.description,
          icon: category.icon,
          slug: category.slug
        }))
      }
    }

    // Search services (vendor services)
    if (type === 'all' || type === 'services') {
      const { data: services, error: servicesError } = await supabase
        .from('vendor_services')
        .select(`
          id,
          service_name,
          service_description,
          basic_package_price,
          vendor:vendor_id (
            business_name,
            city,
            state
          ),
          category:category_id (
            name,
            slug
          )
        `)
        .or(`service_name.ilike.%${query}%,service_description.ilike.%${query}%`)
        .eq('is_active', true)
        .limit(limit)

      if (!servicesError && services) {
        results.services = services.map(service => ({
          id: service.id,
          type: 'service',
          title: service.service_name,
          subtitle: service.vendor?.business_name,
          description: service.service_description,
          price: service.basic_package_price,
          location: `${service.vendor?.city}, ${service.vendor?.state}`,
          category: service.category?.name
        }))
      }
    }

    // Combine and sort results
    const allResults = [
      ...results.vendors,
      ...results.categories,
      ...results.services
    ].sort((a, b) => {
      // Prioritize featured vendors
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then by rating (for vendors)
      if (a.rating && b.rating) {
        return b.rating - a.rating
      }
      
      return 0
    })

    // Generate search suggestions
    const suggestions = generateSearchSuggestions(query, allResults)

    return NextResponse.json({
      results: allResults.slice(0, limit),
      suggestions,
      total: allResults.length,
      breakdown: {
        vendors: results.vendors.length,
        categories: results.categories.length,
        services: results.services.length
      }
    })

  } catch (error) {
    console.error('Error in search API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateSearchSuggestions(query: string, results: any[]): string[] {
  const suggestions: string[] = []
  
  // Add category-based suggestions
  const categories = results.filter(r => r.type === 'category')
  categories.forEach(cat => {
    suggestions.push(`${cat.title} services`)
    suggestions.push(`${cat.title} vendors`)
  })

  // Add location-based suggestions
  const vendors = results.filter(r => r.type === 'vendor')
  const locations = [...new Set(vendors.map(v => v.location?.split(',')[0]).filter(Boolean))]
  locations.slice(0, 3).forEach(location => {
    suggestions.push(`${query} in ${location}`)
  })

  // Add price-based suggestions
  const vendorsWithPrice = vendors.filter(v => v.price)
  if (vendorsWithPrice.length > 0) {
    const avgPrice = vendorsWithPrice.reduce((sum, v) => sum + v.price, 0) / vendorsWithPrice.length
    if (avgPrice < 5000) {
      suggestions.push(`affordable ${query}`)
    } else if (avgPrice > 20000) {
      suggestions.push(`premium ${query}`)
    }
  }

  return [...new Set(suggestions)].slice(0, 5)
}
