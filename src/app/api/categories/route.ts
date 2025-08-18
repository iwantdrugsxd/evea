
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching categories with vendor counts...')
    
    // First, get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug, description, icon')
      .eq('is_active', true)

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    if (!categories || categories.length === 0) {
      console.log('No categories found')
      return NextResponse.json({
        categories: [],
        total_categories: 0,
        total_vendors: 0
      })
    }

    // Get vendor counts for each category
    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        // Get vendor count for this category
        const { count, error: countError } = await supabase
          .from('vendor_cards')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_active', true)

        if (countError) {
          console.error(`Error counting vendors for category ${category.name}:`, countError)
        }

        const vendorCount = count || 0

        // Get top vendors for this category
        const { data: topVendors, error: topVendorsError } = await supabase
          .from('vendor_cards')
          .select(`
            id,
            title,
            base_price,
            average_rating,
            total_reviews,
            featured,
            vendor:vendor_id (
              business_name,
              city,
              verification_status
            )
          `)
          .eq('category_id', category.id)
          .eq('is_active', true)
          .order('average_rating', { ascending: false })
          .order('total_reviews', { ascending: false })
          .limit(3)

        // Define category-specific images and styling
        const categoryConfig = getCategoryConfig(category.slug)

        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
          icon: category.icon || categoryConfig.icon,
          description: category.description || categoryConfig.description,
          image: categoryConfig.image,
          vendor_count: vendorCount,
          top_vendors: topVendors || [],
          // Add styling properties
          bgColor: categoryConfig.bgColor,
          color: categoryConfig.color,
          textColor: categoryConfig.textColor
        }
      })
    )

    // If no categories have vendors, return all categories with 0 counts
    const hasVendors = categoriesWithStats.some(cat => cat.vendor_count > 0)
    
    let activeCategories
    if (hasVendors) {
      // Filter out categories with no vendors and sort by vendor count (highest first)
      activeCategories = categoriesWithStats
        .filter(cat => cat.vendor_count > 0)
        .sort((a, b) => b.vendor_count - a.vendor_count)
        .slice(0, 8) // Get top 8 categories
    } else {
      // If no vendors exist, return all categories with 0 counts
      activeCategories = categoriesWithStats
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 8)
    }

    console.log(`Found ${activeCategories.length} categories with vendors`)

    return NextResponse.json({
      categories: activeCategories,
      total_categories: activeCategories.length,
      total_vendors: activeCategories.reduce((sum, cat) => sum + cat.vendor_count, 0)
    })

  } catch (error) {
    console.error('Error in categories API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get category-specific configuration
function getCategoryConfig(slug: string) {
  const configs: { [key: string]: any } = {
    'catering-food': {
      icon: '🍽️',
      description: 'Delicious food and beverage services',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
      color: 'from-orange-500 to-amber-500',
      textColor: 'text-orange-700'
    },
    'transportation': {
      icon: '🚗',
      description: 'Transportation and logistics services',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-700'
    },
    'beauty-wellness': {
      icon: '💄',
      description: 'Beauty and wellness services',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-700'
    },
    'decoration-styling': {
      icon: '🎨',
      description: 'Beautiful decorations and styling services',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
      color: 'from-purple-500 to-violet-500',
      textColor: 'text-purple-700'
    },
    'activities-games': {
      icon: '🎮',
      description: 'Fun activities and games for events',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-700'
    },
    'entertainment': {
      icon: '🎭',
      description: 'Entertainment and performance services',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-blue-700'
    },
    'technology-av': {
      icon: '🎤',
      description: 'Technology and audio-visual services',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50',
      color: 'from-gray-500 to-slate-500',
      textColor: 'text-gray-700'
    },
    'venue-location': {
      icon: '🏛️',
      description: 'Beautiful venues and locations for your special events',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
      color: 'from-teal-500 to-cyan-500',
      textColor: 'text-teal-700'
    },
    'photography-videography': {
      icon: '📸',
      description: 'Professional photography and videography services',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-700'
    },
    'music-entertainment': {
      icon: '🎵',
      description: 'Live music and entertainment services',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-700'
    }
  }

  return configs[slug] || {
    icon: '🎯',
    description: `${slug.replace('-', ' ')} services`,
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=300&fit=crop&crop=center',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    color: 'from-blue-500 to-indigo-500',
    textColor: 'text-blue-700'
  }
}