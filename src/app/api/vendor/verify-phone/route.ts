import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const SendOTPSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number')
})

const VerifyOTPSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  otp: z.string().length(6, 'OTP must be 6 digits')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'send') {
      const validatedData = SendOTPSchema.parse(body)
      
      // Check if phone already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('phone', validatedData.phone)
        .single()

      if (existingUser) {
        return NextResponse.json(
          { error: 'Phone number already registered' },
          { status: 400 }
        )
      }

      // Format phone number for Supabase (add +91)
      const formattedPhone = `+91${validatedData.phone}`
      
      console.log('📱 Sending OTP via Supabase...')
      console.log('Phone:', formattedPhone)

      // Use Supabase's built-in phone auth
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: false // Don't create user automatically
        }
      })

      if (error) {
        console.error('❌ Supabase phone auth error:', error)
        return NextResponse.json(
          { error: 'Failed to send OTP' },
          { status: 500 }
        )
      }

      console.log('✅ OTP sent successfully via Supabase')
      return NextResponse.json({
        success: true,
        message: 'OTP sent successfully',
        phone: validatedData.phone
      })
    }

    if (action === 'verify') {
      const validatedData = VerifyOTPSchema.parse(body)
      
      // Format phone number for Supabase (add +91)
      const formattedPhone = `+91${validatedData.phone}`
      
      console.log('🔍 Verifying OTP via Supabase...')
      console.log('Phone:', formattedPhone)
      console.log('OTP:', validatedData.otp)

      // Verify OTP with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: validatedData.otp,
        type: 'sms'
      })

      if (error) {
        console.error('❌ OTP verification error:', error)
        return NextResponse.json(
          { 
            error: 'Invalid OTP',
            message: 'Please check the OTP sent to your phone or request a new one'
          },
          { status: 400 }
        )
      }

      console.log('✅ OTP verified successfully via Supabase')
      return NextResponse.json({
        success: true,
        message: 'Phone verified successfully'
      })
    }

    // Development endpoint to check phone auth status
    if (action === 'debug' && process.env.NODE_ENV === 'development') {
      const { phone } = body
      const formattedPhone = `+91${phone}`
      
      return NextResponse.json({
        phone: formattedPhone,
        message: 'Supabase phone auth is active. Check your phone for OTP.'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Phone verification error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Phone verification failed' },
      { status: 500 }
    )
  }
}