import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Get token from header
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const vendorId = decoded.vendorId

    // Get vendor data with stats
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        *,
        users!inner (
          full_name,
          email
        ),
        vendor_services (
          *,
          categories (
            name
          )
        )
      `)
      .eq('id', vendorId)
      .single()

    if (vendorError) throw vendorError

    // Get order statistics
    const { data: orderStats } = await supabase
      .from('orders')
      .select('status, total_amount')
      .eq('vendor_id', vendorId)

    // Calculate stats
    const totalOrders = orderStats?.length || 0
    const completedOrders = orderStats?.filter(o => o.status === 'completed').length || 0
    const totalRevenue = orderStats?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
    const pendingOrders = orderStats?.filter(o => o.status === 'pending').length || 0

    return NextResponse.json({
      success: true,
      vendor: vendorData,
      stats: {
        totalOrders,
        completedOrders,
        pendingOrders,
        totalRevenue,
        completionRate: totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0
      }
    })

  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
