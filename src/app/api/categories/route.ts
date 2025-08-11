
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug, icon')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      )
    }

    // Get vendor count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const { count, error: countError } = await supabase
          .from('vendor_cards')
          .select('*', { count: 'exact', head: true })
          .eq('category_id', category.id)
          .eq('is_active', true)

        if (countError) {
          console.error(`Error counting vendors for category ${category.id}:`, countError)
          return {
            ...category,
            vendor_count: 0
          }
        }

        return {
          ...category,
          vendor_count: count || 0
        }
      })
    )

    // Filter out categories with no vendors
    const activeCategories = categoriesWithCounts.filter(cat => cat.vendor_count > 0)

    return NextResponse.json(activeCategories)
  } catch (error) {
    console.error('Error in categories API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}