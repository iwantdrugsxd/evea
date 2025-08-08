import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const VerifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Email Verification Start ---')
    
    let body
    try {
      body = await request.json()
      console.log('Request body:', body)
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError)
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      )
    }
    
    const validatedData = VerifyEmailSchema.parse(body)
    console.log('Data validated successfully')

    // Find user with this verification token
    console.log('Finding user with verification token...')
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, email_verified, verification_token')
      .eq('verification_token', validatedData.token)
      .single()

    if (userError || !user) {
      console.error('User not found or invalid token:', validatedData.token)
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      )
    }

    console.log('User found:', user.id)

    // Check if email is already verified
    if (user.email_verified) {
      console.log('Email already verified for user:', user.id)
      return NextResponse.json({
        success: true,
        message: 'Email is already verified. You can login to your account.'
      })
    }

    // Update user to mark email as verified
    console.log('Updating user email verification status...')
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        email_verified: true,
        verification_token: null // Clear the token after use
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Failed to update user verification status:', updateError)
      return NextResponse.json(
        { error: 'Failed to verify email. Please try again.' },
        { status: 500 }
      )
    }

    console.log('Email verification successful for user:', user.id)

    // Send welcome email
    try {
      const { sendEmail } = await import('@/lib/email/sender')
      await sendEmail({
        to: user.email,
        subject: 'Welcome to EVEA - Your Email is Verified!',
        template: 'welcome-email',
        data: {
          name: user.full_name,
          loginLink: `${process.env.NEXT_PUBLIC_APP_URL}/login`
        }
      })
      console.log('Welcome email sent successfully')
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail verification if email fails
    }

    console.log('--- Email Verification Success ---')
    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! You can now login to your account.',
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name
      }
    })

  } catch (error) {
    console.error('💥 Email verification error:', error)
    if (error instanceof z.ZodError) {
      console.error('Zod validation errors:', error.issues)
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Email verification failed' },
      { status: 500 }
    )
  }
}
