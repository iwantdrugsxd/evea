import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    console.log('--- Get User Profile Start ---')
    
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value || 
                  // request.cookies.get('vendor-token')?.value ||
                  request.cookies.get('vendorToken')?.value

    if (!token) {
      console.error('No authentication token found')
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
      console.log('Token verified for user:', decoded.userId)
    } catch (jwtError) {
      console.error('Token verification failed:', jwtError)
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user data
    console.log('Fetching user data...')
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        full_name,
        phone,
        role,
        is_active,
        email_verified,
        phone_verified,
        created_at,
        updated_at
      `)
      .eq('id', decoded.userId)
      .single()

    if (userError || !userData) {
      console.error('User not found:', decoded.userId)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('User found:', userData.full_name)

    // Check if account is active
    if (!userData.is_active) {
      console.error('Account is deactivated for user:', userData.id)
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // If user is a vendor, get vendor data
    let vendorData = null
    if (userData.role === 'vendor') {
      console.log('Fetching vendor data...')
      const { data: vendor, error: vendorError } = await supabaseAdmin
        .from('vendors')
        .select(`
          id,
          business_name,
          verification_status,
          registration_step
        `)
        .eq('user_id', userData.id)
        .single()

      if (!vendorError && vendor) {
        vendorData = vendor
        console.log('Vendor data found:', vendor.business_name)
      }
    }

    console.log('--- Get User Profile Success ---')
    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.full_name?.split(' ')[0] || '',
        lastName: userData.full_name?.split(' ').slice(1).join(' ') || '',
        phone: userData.phone,
        role: userData.role,
        isActive: userData.is_active,
        emailVerified: userData.email_verified,
        phoneVerified: userData.phone_verified,
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
        vendor: vendorData ? {
          id: vendorData.id,
          businessName: vendorData.business_name,
          verificationStatus: vendorData.verification_status,
          registrationStep: vendorData.registration_step
        } : null
      }
    })

  } catch (error) {
    console.error('Get user profile error:', error)
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    )
  }
}
