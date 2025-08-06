import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendOTP } from '@/lib/sms/sender'

const PhoneSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone } = PhoneSchema.parse(body)

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP in database with expiry (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    
    // You might want to create an OTP table for this
    // For now, we'll use a simple in-memory store or Redis
    await storeOTP(phone, otp, expiresAt)

    // Send OTP via SMS
    await sendOTP(phone, otp)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    })

  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}

async function storeOTP(phone: string, otp: string, expiresAt: Date) {
  // Implement OTP storage logic
  // Could be Redis, database table, or in-memory store
}