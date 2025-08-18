import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's favorite vendors
    const { data: favorites, error: favoritesError } = await supabase
      .from('user_favorites')
      .select(`
        id,
        created_at,
        vendor_card:vendor_card_id (
          id,
          title,
          description,
          base_price,
          price_range_min,
          price_range_max,
          average_rating,
          total_reviews,
          featured,
          images,
          vendor:vendor_id (
            business_name,
            business_logo_url,
            city,
            state,
            verification_status
          ),
          category:category_id (
            name,
            slug,
            icon
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (favoritesError) {
      console.error('Error fetching favorites:', favoritesError)
      return NextResponse.json(
        { error: 'Failed to fetch favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      favorites: favorites || [],
      count: favorites?.length || 0
    })

  } catch (error) {
    console.error('Error in favorites API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { vendorCardId } = body

    if (!vendorCardId) {
      return NextResponse.json(
        { error: 'Vendor card ID is required' },
        { status: 400 }
      )
    }

    // Check if already favorited
    const { data: existingFavorite, error: checkError } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('vendor_card_id', vendorCardId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing favorite:', checkError)
      return NextResponse.json(
        { error: 'Failed to check favorites' },
        { status: 500 }
      )
    }

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Vendor is already in favorites' },
        { status: 400 }
      )
    }

    // Add to favorites
    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: user.id,
        vendor_card_id: vendorCardId
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding to favorites:', error)
      return NextResponse.json(
        { error: 'Failed to add to favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      favorite: data,
      message: 'Added to favorites successfully'
    })

  } catch (error) {
    console.error('Error in favorites API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const vendorCardId = searchParams.get('vendorCardId')

    if (!vendorCardId) {
      return NextResponse.json(
        { error: 'Vendor card ID is required' },
        { status: 400 }
      )
    }

    // Remove from favorites
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('vendor_card_id', vendorCardId)

    if (error) {
      console.error('Error removing from favorites:', error)
      return NextResponse.json(
        { error: 'Failed to remove from favorites' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Removed from favorites successfully'
    })

  } catch (error) {
    console.error('Error in favorites API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
