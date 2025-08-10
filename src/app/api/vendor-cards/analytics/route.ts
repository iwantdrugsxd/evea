import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { CardQueries } from '@/lib/database/queries/card-queries'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const cardQueries = new CardQueries(supabase)
    
    const { searchParams } = new URL(request.url)
    const vendorId = searchParams.get('vendorId')
    const period = searchParams.get('period') || '30' // days
    
    if (!vendorId) {
      return NextResponse.json(
        { error: 'Vendor ID is required' },
        { status: 400 }
      )
    }

    // Verify vendor exists
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id, business_name')
      .eq('id', vendorId)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Get basic card statistics
    const cardStats = await cardQueries.getVendorCardStats(vendorId)

    // Get period-based analytics
    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(period))

    // Get views analytics for the period
    const { data: viewsData, error: viewsError } = await supabase
      .from('vendor_card_views')
      .select('card_id, viewed_at, ip_address')
      .gte('viewed_at', daysAgo.toISOString())
      .in('card_id', 
        supabase
          .from('vendor_cards')
          .select('id')
          .eq('vendor_id', vendorId)
      )

    if (viewsError) {
      console.error('Views analytics error:', viewsError)
    }

    // Get search analytics for the period
    const { data: searchData, error: searchError } = await supabase
      .from('vendor_card_searches')
      .select('card_id, search_term, searched_at, ip_address')
      .gte('searched_at', daysAgo.toISOString())
      .in('card_id', 
        supabase
          .from('vendor_cards')
          .select('id')
          .eq('vendor_id', vendorId)
      )

    if (searchError) {
      console.error('Search analytics error:', searchError)
    }

    // Get booking analytics for the period
    const { data: bookingData, error: bookingError } = await supabase
      .from('orders')
      .select('id, service_card_id, total_amount, created_at, status')
      .gte('created_at', daysAgo.toISOString())
      .in('service_card_id', 
        supabase
          .from('vendor_cards')
          .select('id')
          .eq('vendor_id', vendorId)
      )

    if (bookingError) {
      console.error('Booking analytics error:', bookingError)
    }

    // Get review analytics for the period
    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .select('id, service_card_id, rating, created_at')
      .gte('created_at', daysAgo.toISOString())
      .in('service_card_id', 
        supabase
          .from('vendor_cards')
          .select('id')
          .eq('vendor_id', vendorId)
      )

    if (reviewError) {
      console.error('Review analytics error:', reviewError)
    }

    // Calculate period analytics
    const periodViews = viewsData?.length || 0
    const periodSearches = searchData?.length || 0
    const periodBookings = bookingData?.filter(b => b.status === 'completed').length || 0
    const periodRevenue = bookingData?.filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0
    const periodReviews = reviewData?.length || 0
    const periodAverageRating = reviewData && reviewData.length > 0 
      ? reviewData.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewData.length 
      : 0

    // Get top performing cards
    const { data: topCards, error: topCardsError } = await supabase
      .from('vendor_cards')
      .select(`
        id,
        title,
        total_views,
        total_bookings,
        average_rating,
        total_reviews,
        base_price
      `)
      .eq('vendor_id', vendorId)
      .eq('status', 'active')
      .eq('is_active', true)
      .order('total_views', { ascending: false })
      .limit(5)

    if (topCardsError) {
      console.error('Top cards error:', topCardsError)
    }

    // Get category performance
    const { data: categoryPerformance, error: categoryError } = await supabase
      .from('vendor_cards')
      .select(`
        categories (
          id,
          name,
          slug
        ),
        total_views,
        total_bookings,
        average_rating
      `)
      .eq('vendor_id', vendorId)
      .eq('status', 'active')
      .eq('is_active', true)

    if (categoryError) {
      console.error('Category performance error:', categoryError)
    }

    // Aggregate category data
    const categoryStats = categoryPerformance?.reduce((acc, card) => {
      const categoryId = card.categories?.id
      const categoryName = card.categories?.name
      
      if (!acc[categoryId]) {
        acc[categoryId] = {
          id: categoryId,
          name: categoryName,
          totalViews: 0,
          totalBookings: 0,
          totalRating: 0,
          cardCount: 0
        }
      }
      
      acc[categoryId].totalViews += card.total_views || 0
      acc[categoryId].totalBookings += card.total_bookings || 0
      acc[categoryId].totalRating += card.average_rating || 0
      acc[categoryId].cardCount += 1
      
      return acc
    }, {} as Record<string, any>) || {}

    // Calculate averages for categories
    Object.values(categoryStats).forEach((category: any) => {
      category.averageRating = category.cardCount > 0 ? category.totalRating / category.cardCount : 0
    })

    // Get trending search terms
    const searchTerms = searchData?.reduce((acc, search) => {
      const term = search.search_term?.toLowerCase()
      if (term) {
        acc[term] = (acc[term] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>) || {}

    const trendingTerms = Object.entries(searchTerms)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([term, count]) => ({ term, count }))

    // Calculate conversion rates
    const totalViews = cardStats.totalViews
    const totalBookings = cardStats.totalBookings
    const viewToBookingRate = totalViews > 0 ? (totalBookings / totalViews) * 100 : 0

    const analytics = {
      overview: {
        totalCards: cardStats.totalCards,
        activeCards: cardStats.activeCards,
        draftCards: cardStats.draftCards,
        pendingCards: cardStats.pendingCards,
        totalViews: cardStats.totalViews,
        totalBookings: cardStats.totalBookings,
        averageRating: cardStats.averageRating,
        totalReviews: cardStats.totalReviews
      },
      period: {
        days: parseInt(period),
        views: periodViews,
        searches: periodSearches,
        bookings: periodBookings,
        revenue: periodRevenue,
        reviews: periodReviews,
        averageRating: periodAverageRating
      },
      performance: {
        viewToBookingRate: Math.round(viewToBookingRate * 100) / 100,
        averageRevenuePerCard: cardStats.activeCards > 0 ? periodRevenue / cardStats.activeCards : 0,
        topPerformingCards: topCards || [],
        categoryPerformance: Object.values(categoryStats)
      },
      trends: {
        trendingSearchTerms: trendingTerms,
        popularCategories: Object.values(categoryStats)
          .sort((a: any, b: any) => b.totalViews - a.totalViews)
          .slice(0, 5)
      }
    }

    return NextResponse.json({
      success: true,
      data: analytics,
      vendor: {
        id: vendor.id,
        businessName: vendor.business_name
      }
    })

  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
