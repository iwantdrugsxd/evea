
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        id,
        email,
        password_hash,
        full_name,
        role,
        vendors (
          id,
          business_name,
          verification_status
        )
      `)
      .eq('email', email)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if user is vendor
    if (!['vendor', 'vendor_pending'].includes(userData.role)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, userData.password_hash)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if vendor is approved
    if (userData.vendors?.verification_status !== 'verified') {
      return NextResponse.json(
        { error: 'Account pending approval' },
        { status: 403 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: userData.id,
        vendorId: userData.vendors.id,
        role: userData.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.full_name,
        role: userData.role,
        vendorId: userData.vendors.id,
        businessName: userData.vendors.business_name
      }
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}