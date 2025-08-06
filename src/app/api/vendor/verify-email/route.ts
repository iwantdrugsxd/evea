import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find user with this token
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, token_expires_at')
      .eq('verification_token', token)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

    // Check if token expired
    if (new Date() > new Date(userData.token_expires_at)) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      )
    }

    // Update user as email verified
    const { error: updateError } = await supabase
      .from('users')
      .update({
        email_verified: true,
        verification_token: null,
        token_expires_at: null
      })
      .eq('id', userData.id)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}