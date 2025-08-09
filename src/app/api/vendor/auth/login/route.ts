import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const supabase = supabaseAdmin

    // Get user data first
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, full_name, password_hash, role, is_active, email_verified')
      .eq('email', email)
      .eq('role', 'vendor')
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    if (!user.password_hash) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Fetch vendor by user_id
    const { data: vendor, error: vendorError } = await supabase
      .from('vendors')
      .select('id, business_name, verification_status')
      .eq('user_id', user.id)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json(
        { message: 'Vendor profile not found' },
        { status: 404 }
      )
    }

    // For now, allow login regardless of verification status

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        vendorId: vendor.id 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    // Set HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        vendor: {
          id: vendor.id,
          businessName: vendor.business_name,
          verificationStatus: vendor.verification_status
        }
      }
    })

    response.cookies.set('vendor-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return response
  } catch (error) {
    console.error('Vendor login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}