import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const vendorData = await verifyVendorToken(request)
    if (!vendorData) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = supabaseAdmin

    // Fetch vendor profile, user, and primary service info
    const [
      { data: vendorProfile },
      { data: userProfile },
      { data: serviceInfo },
    ] = await Promise.all([
      supabase
        .from('vendors')
        .select(`
          id,
          business_name,
          address,
          city,
          state,
          postal_code,
          description,
          verification_status,
          approved_at,
          created_at
        `)
        .eq('id', vendorData.vendorId)
        .single(),
      supabase
        .from('users')
        .select(`
          id,
          full_name,
          email,
          phone,
          created_at
        `)
        .eq('id', vendorData.userId)
        .single(),
      supabase
        .from('vendor_services')
        .select(`
          id,
          vendor_id,
          category_id,
          service_type,
          wedding_price_min,
          wedding_price_max,
          corporate_price_min,
          corporate_price_max,
          birthday_price_min,
          birthday_price_max,
          festival_price_min,
          festival_price_max,
          basic_package_price,
          standard_package_price,
          premium_package_price,
          advance_payment_percentage,
          cancellation_policy
        `)
        .eq('vendor_id', vendorData.vendorId)
        .limit(1)
        .single(),
    ])

    // Get dashboard statistics
    const [
      { data: orders },
      { data: cards },
      { data: reviews },
      { data: payments }
    ] = await Promise.all([
      supabase
        .from('orders')
        .select('*')
        .eq('vendor_id', vendorData.vendorId),
      
      supabase
        .from('vendor_cards')
        .select('*')
        .eq('vendor_id', vendorData.vendorId),
      
      supabase
        .from('reviews')
        .select('*')
        .eq('vendor_id', vendorData.vendorId),
      
      supabase
        .from('payments')
        .select('*')
        .eq('vendor_id', vendorData.vendorId)
        .eq('status', 'completed')
    ])

    // Calculate statistics
    const totalOrders = orders?.length || 0
    const pendingOrders = (orders || []).filter((o: any) => o.status === 'pending').length || 0
    const completedOrders = (orders || []).filter((o: any) => o.status === 'completed').length || 0
    const totalRevenue = (payments || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0
    const averageRating = (reviews && reviews.length) 
      ? (reviews as any[]).reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length 
      : 0

    return NextResponse.json({
      success: true,
      vendor: vendorProfile
        ? {
            id: vendorProfile.id,
            businessName: vendorProfile.business_name,
            address: vendorProfile.address,
            city: vendorProfile.city,
            state: vendorProfile.state,
            postalCode: vendorProfile.postal_code,
            description: vendorProfile.description,
            verificationStatus: vendorProfile.verification_status,
            approvedAt: vendorProfile.approved_at,
            createdAt: vendorProfile.created_at,
          }
        : null,
      user: userProfile
        ? {
            id: userProfile.id,
            fullName: userProfile.full_name,
            email: userProfile.email,
            phone: userProfile.phone,
            createdAt: userProfile.created_at,
          }
        : null,
      service: serviceInfo
        ? {
            id: serviceInfo.id,
            categoryId: serviceInfo.category_id,
            categoryName: '',
            serviceType: serviceInfo.service_type || '',
            weddingPriceMin: serviceInfo.wedding_price_min || 0,
            weddingPriceMax: serviceInfo.wedding_price_max || 0,
            corporatePriceMin: serviceInfo.corporate_price_min || 0,
            corporatePriceMax: serviceInfo.corporate_price_max || 0,
            birthdayPriceMin: serviceInfo.birthday_price_min || 0,
            birthdayPriceMax: serviceInfo.birthday_price_max || 0,
            festivalPriceMin: serviceInfo.festival_price_min || 0,
            festivalPriceMax: serviceInfo.festival_price_max || 0,
            basicPackagePrice: serviceInfo.basic_package_price || 0,
            standardPackagePrice: serviceInfo.standard_package_price || 0,
            premiumPackagePrice: serviceInfo.premium_package_price || 0,
            advancePaymentPercentage: serviceInfo.advance_payment_percentage || 0,
            cancellationPolicy: serviceInfo.cancellation_policy || '',
          }
        : null,
      stats: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews?.length || 0,
         activeCards: (cards || []).filter((c: any) => c.is_active).length || 0
      },
      recentOrders: orders?.slice(0, 5) || [],
      recentReviews: reviews?.slice(0, 3) || []
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}