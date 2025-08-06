import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import crypto from 'crypto'
import { sendEmail } from '@/lib/email/sender'
import { sendOTP } from '@/lib/sms/sender'

const RegisterSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  businessName: z.string().min(2, 'Business name is required'),
  otp: z.string().length(6, 'Invalid OTP')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = RegisterSchema.parse(body)

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', validatedData.email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Verify OTP (implement your OTP verification logic)
    const otpValid = await verifyOTP(validatedData.phone, validatedData.otp)
    if (!otpValid) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 10)

    // Generate email verification token
    const verificationToken = crypto.randomUUID()
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        email: validatedData.email,
        password_hash: passwordHash,
        full_name: validatedData.fullName,
        phone: validatedData.phone,
        role: 'vendor_pending',
        phone_verified: true,
        verification_token: verificationToken,
        token_expires_at: tokenExpiry.toISOString()
      })
      .select()
      .single()

    if (userError) throw userError

    // Create vendor record
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .insert({
        user_id: userData.id,
        business_name: validatedData.businessName,
        registration_step: 1,
        verification_status: 'pending'
      })
      .select()
      .single()

    if (vendorError) throw vendorError

    // Send verification email
    await sendEmail({
      to: validatedData.email,
      subject: 'Verify Your EVEA Vendor Account',
      template: 'email-verification',
      data: {
        name: validatedData.fullName,
        verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/verify-email?token=${verificationToken}`
      }
    })

    return NextResponse.json({
      success: true,
      vendorId: vendorData.id,
      message: 'Registration successful. Please verify your email.'
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}

async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  // Implement your OTP verification logic here
  // This could be with Twilio, AWS SNS, or your SMS provider
  return true // Placeholder
}
