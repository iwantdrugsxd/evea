import { NextRequest, NextResponse } from 'next/server'
import { verifyVendorToken } from '@/lib/vendor/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const tokenData = await verifyVendorToken(request)
    if (!tokenData) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Try to load user + vendor from DB; fall back to basic payload if missing
    const [userRes, vendorRes] = await Promise.all([
      supabaseAdmin
        .from('users')
        .select('id, email, first_name, last_name, full_name, role')
        .eq('id', tokenData.userId)
        .maybeSingle(),
      supabaseAdmin
        .from('vendors')
        .select('id, business_name, verification_status')
        .eq('id', tokenData.vendorId)
        .maybeSingle(),
    ])

    const user = userRes.data
    const vendor = vendorRes.data

    return NextResponse.json({
      success: true,
      user: {
        id: user?.id || tokenData.userId,
        email: user?.email || tokenData.email,
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        role: (user?.role as string) || tokenData.role,
        vendor: {
          id: vendor?.id || tokenData.vendorId,
          businessName: vendor?.business_name || 'Your Business',
          verificationStatus: vendor?.verification_status || 'pending',
        },
      },
    })
  } catch (error) {
    console.error('Auth/me error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}


