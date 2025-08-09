import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const vendorData = await verifyVendorToken(request)
    if (!vendorData) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '6months'

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    
    switch (period) {
      case '3months':
        startDate.setMonth(endDate.getMonth() - 3)
        break
      case '6months':
        startDate.setMonth(endDate.getMonth() - 6)
        break
      case '12months':
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }

    // Get analytics data
    const [
      { data: orders },
      { data: payments },
      { data: reviews },
      { data: cardViews }
    ] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendorData.vendorId)
        .gte('created_at', startDate.toISOString()),
      
      supabase
        .from('payments')
        .select('*')
        .eq('vendor_id', vendorData.vendorId)
        .eq('status', 'completed')
        .gte('created_at', startDate.toISOString()),
      
      supabase
        .from('reviews')
        .select('*')
        .eq('vendor_id', vendorData.vendorId)
        .gte('created_at', startDate.toISOString()),
      
      supabase
        .from('card_views')
        .select('*')
        .eq('vendor_id', vendorData.vendorId)
        .gte('created_at', startDate.toISOString())
    ])

    // Calculate metrics
    const totalRevenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0
    const totalOrders = orders?.length || 0
    const totalViews = cardViews?.length || 0
    const averageRating = reviews?.length 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0

    // Generate monthly trends
    const monthlyTrends = []
    for (let i = 5; i >= 0; i--) {
      const month = new Date()
      month.setMonth(month.getMonth() - i)
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1)
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0)

      const monthOrders = orders?.filter(o => {
        const orderDate = new Date(o.created_at)
        return orderDate >= monthStart && orderDate <= monthEnd
      }) || []

      const monthPayments = payments?.filter(p => {
        const paymentDate = new Date(p.created_at)
        return paymentDate >= monthStart && paymentDate <= monthEnd
      }) || []

      const monthViews = cardViews?.filter(v => {
        const viewDate = new Date(v.created_at)
        return viewDate >= monthStart && viewDate <= monthEnd
      }) || []

      monthlyTrends.push({
        month: month.toLocaleDateString('en-US', { month: 'short' }),
        revenue: monthPayments.reduce((sum, p) => sum + p.amount, 0),
        bookings: monthOrders.length,
        views: monthViews.length
      })
    }

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalViews,
      averageRating: Math.round(averageRating * 10) / 10,
      monthlyTrends,
      conversionRate: totalViews > 0 ? (totalOrders / totalViews * 100).toFixed(2) : 0
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}