import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CardQueries } from '@/lib/database/queries/card-queries'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    const cardId = params.id
    
    // Get vendor ID from session (implement auth middleware)
    const vendorId = request.headers.get('x-vendor-id') || request.nextUrl.searchParams.get('vendorId')
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Verify the service card exists and belongs to the vendor
    const { data: existingCard, error: cardError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, status, title, is_active')
      .eq('id', cardId)
      .eq('vendor_id', vendorId)
      .single()

    if (cardError || !existingCard) {
      return NextResponse.json(
        { error: 'Service card not found or access denied' },
        { status: 404 }
      )
    }

    // Parse request body
    const { action, reason } = await request.json()
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    let newStatus: string
    let isActive: boolean
    let message: string

    switch (action) {
      case 'publish':
        // Check if card has required fields for publishing
        const { data: cardDetails } = await supabase
          .from('vendor_cards')
          .select('title, description, base_price, service_images, service_area')
          .eq('id', cardId)
          .single()

        if (!cardDetails?.service_images || cardDetails.service_images.length === 0) {
          return NextResponse.json(
            { error: 'Service card must have at least one image to be published' },
            { status: 400 }
          )
        }

        if (!cardDetails?.service_area || cardDetails.service_area.length === 0) {
          return NextResponse.json(
            { error: 'Service card must have service areas defined to be published' },
            { status: 400 }
          )
        }

        newStatus = 'active'
        isActive = true
        message = 'Service card published successfully'
        break

      case 'unpublish':
        newStatus = 'draft'
        isActive = false
        message = 'Service card unpublished successfully'
        break

      case 'submit_for_review':
        newStatus = 'pending'
        isActive = false
        message = 'Service card submitted for review'
        break

      case 'save_as_draft':
        newStatus = 'draft'
        isActive = false
        message = 'Service card saved as draft'
        break

      case 'deactivate':
        newStatus = 'inactive'
        isActive = false
        message = 'Service card deactivated successfully'
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    // Update the service card status
    const updatedCard = await cardQueries.updateServiceCardStatus(cardId, newStatus, isActive)

    // Log the status change for analytics
    await supabase
      .from('vendor_card_activity_logs')
      .insert({
        vendor_id: vendorId,
        card_id: cardId,
        action: `status_changed_to_${newStatus}`,
        details: {
          title: existingCard.title,
          previous_status: existingCard.status,
          new_status: newStatus,
          reason: reason || null
        },
        ip_address: request.headers.get('x-forwarded-for') || request.ip,
        user_agent: request.headers.get('user-agent')
      })

    // If publishing, send notification to admin for review (if needed)
    if (action === 'publish') {
      await supabase
        .from('admin_notifications')
        .insert({
          type: 'service_card_published',
          title: 'New Service Card Published',
          message: `Service card "${existingCard.title}" has been published by vendor`,
          data: {
            vendor_id: vendorId,
            card_id: cardId,
            card_title: existingCard.title
          },
          is_read: false,
          priority: 'medium'
        })
    }

    return NextResponse.json({
      success: true,
      data: updatedCard,
      message
    })

  } catch (error) {
    console.error('Update service card status error:', error)
    return NextResponse.json(
      { error: 'Failed to update service card status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const cardId = params.id
    
    // Get service card details
    const { data: card, error } = await supabase
      .from('vendor_cards')
      .select(`
        id,
        title,
        status,
        is_active,
        created_at,
        updated_at,
        published_at,
        rejection_reason,
        admin_notes
      `)
      .eq('id', cardId)
      .single()

    if (error || !card) {
      return NextResponse.json(
        { error: 'Service card not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: card
    })

  } catch (error) {
    console.error('Get service card status error:', error)
    return NextResponse.json(
      { error: 'Failed to get service card status' },
      { status: 500 }
    )
  }
}
