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

    // Get cart items for the user
    const { data: cartItems, error: cartError } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        event_date,
        guest_count,
        special_requirements,
        created_at,
        vendor_card:vendor_card_id (
          id,
          title,
          description,
          base_price,
          price_range_min,
          price_range_max,
          images,
          vendor:vendor_id (
            business_name,
            city,
            state
          ),
          category:category_id (
            name,
            slug
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (cartError) {
      console.error('Error fetching cart:', cartError)
      return NextResponse.json(
        { error: 'Failed to fetch cart' },
        { status: 500 }
      )
    }

    // Calculate totals
    const total = cartItems?.reduce((sum, item) => {
      const price = item.vendor_card?.base_price || 0
      return sum + (price * item.quantity)
    }, 0) || 0

    const itemCount = cartItems?.length || 0

    return NextResponse.json({
      items: cartItems || [],
      total,
      itemCount,
      summary: {
        subtotal: total,
        serviceFee: Math.round(total * 0.05), // 5% service fee
        total: total + Math.round(total * 0.05)
      }
    })

  } catch (error) {
    console.error('Error in cart API:', error)
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
    const { vendorCardId, quantity = 1, eventDate, guestCount, specialRequirements } = body

    if (!vendorCardId) {
      return NextResponse.json(
        { error: 'Vendor card ID is required' },
        { status: 400 }
      )
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', user.id)
      .eq('vendor_card_id', vendorCardId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing cart item:', checkError)
      return NextResponse.json(
        { error: 'Failed to check cart' },
        { status: 500 }
      )
    }

    let result

    if (existingItem) {
      // Update existing item
      const newQuantity = existingItem.quantity + quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({
          quantity: newQuantity,
          event_date: eventDate,
          guest_count: guestCount,
          special_requirements: specialRequirements,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating cart item:', error)
        return NextResponse.json(
          { error: 'Failed to update cart' },
          { status: 500 }
        )
      }

      result = data
    } else {
      // Add new item
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          user_id: user.id,
          vendor_card_id: vendorCardId,
          quantity,
          event_date: eventDate,
          guest_count: guestCount,
          special_requirements: specialRequirements
        })
        .select()
        .single()

      if (error) {
        console.error('Error adding to cart:', error)
        return NextResponse.json(
          { error: 'Failed to add to cart' },
          { status: 500 }
        )
      }

      result = data
    }

    return NextResponse.json({
      success: true,
      item: result,
      message: existingItem ? 'Cart updated successfully' : 'Added to cart successfully'
    })

  } catch (error) {
    console.error('Error in cart API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
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
    const { itemId, quantity, eventDate, guestCount, specialRequirements } = body

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    // Update cart item
    const { data, error } = await supabase
      .from('cart_items')
      .update({
        quantity: quantity,
        event_date: eventDate,
        guest_count: guestCount,
        special_requirements: specialRequirements,
        updated_at: new Date().toISOString()
      })
      .eq('id', itemId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating cart item:', error)
      return NextResponse.json(
        { error: 'Failed to update cart item' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      item: data,
      message: 'Cart item updated successfully'
    })

  } catch (error) {
    console.error('Error in cart API:', error)
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
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      )
    }

    // Delete cart item
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting cart item:', error)
      return NextResponse.json(
        { error: 'Failed to delete cart item' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Cart item removed successfully'
    })

  } catch (error) {
    console.error('Error in cart API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
