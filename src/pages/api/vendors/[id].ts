import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query

    // Fetch vendor details
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        *,
        user:users(
          id,
          name,
          email,
          avatar,
          phone
        )
      `)
      .eq('id', id)
      .single()

    if (vendorError || !vendor) {
      return res.status(404).json({ error: 'Vendor not found' })
    }

    // Fetch vendor cards
    const { data: vendorCards, error: cardsError } = await supabase
      .from('vendor_cards')
      .select(`
        *,
        category:categories(name, slug, icon),
        subcategory:categories!vendor_cards_subcategory_id_fkey(name, slug)
      `)
      .eq('vendor_id', id)
      .eq('is_active', true)

    if (cardsError) {
      console.error('Error fetching vendor cards:', cardsError)
    }

    // Fetch reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        *,
        customer:users(name, avatar),
        order:orders(event_date, event_location, guest_count)
      `)
      .eq('vendor_id', id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError)
    }

    // Fetch order statistics
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .eq('vendor_id', id)

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
    }

    // Calculate statistics
    const totalOrders = orders?.length || 0
    const completedOrders = orders?.filter(o => o.status === 'completed').length || 0
    const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
    const averageRating = reviews?.reduce((sum, review) => sum + review.rating, 0) / (reviews?.length || 1) || 0

    // Get recent events
    const recentEvents = orders?.slice(0, 10).map(order => ({
      id: order.id,
      eventDate: order.event_date,
      eventLocation: order.event_location,
      guestCount: order.guest_count,
      status: order.status,
      totalAmount: order.total_amount
    })) || []

    // Get portfolio images
    const portfolioImages = vendorCards?.flatMap(card => {
      try {
        return JSON.parse(card.portfolio_images || '[]')
      } catch {
        return []
      }
    }) || []

    const vendorProfile = {
      ...vendor,
      vendorCards: vendorCards || [],
      reviews: reviews || [],
      statistics: {
        totalOrders,
        completedOrders,
        totalRevenue,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews?.length || 0,
        completionRate: totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0
      },
      recentEvents,
      portfolioImages: portfolioImages.slice(0, 20) // Limit to 20 images
    }

    res.status(200).json(vendorProfile)
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
