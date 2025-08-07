import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const AadharVerificationSchema = z.object({
  vendorId: z.string().uuid(),
  aadharNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhar format'),
  otp: z.string().length(6, 'OTP must be 6 digits').optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body
    const validatedData = AadharVerificationSchema.parse(body)

    // Verify vendor exists
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('id, aadhar_number')
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    if (action === 'send_otp') {
      // Here you would integrate with UIDAI Aadhar verification service
      // For now, we'll simulate the process
      
      // Validate Aadhar number format
      if (vendorData.aadhar_number !== validatedData.aadharNumber) {
        return NextResponse.json(
          { error: 'Aadhar number does not match records' },
          { status: 400 }
        )
      }

      // In real implementation, call UIDAI API to send OTP
      // await sendAadharOTP(validatedData.aadharNumber)
      
      return NextResponse.json({
        success: true,
        message: 'OTP sent to registered mobile number with Aadhar'
      })
    }

    if (action === 'verify_otp') {
      if (!validatedData.otp) {
        return NextResponse.json(
          { error: 'OTP is required' },
          { status: 400 }
        )
      }

      // In real implementation, verify OTP with UIDAI
      // const isValid = await verifyAadharOTP(validatedData.aadharNumber, validatedData.otp)
      const isValid = validatedData.otp === '123456' // Demo OTP

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid OTP' },
          { status: 400 }
        )
      }

      // Update vendor as Aadhar verified
      const { error: updateError } = await supabase
        .from('vendors')
        .update({ aadhar_verified: true })
        .eq('id', validatedData.vendorId)

      if (updateError) throw updateError

      return NextResponse.json({
        success: true,
        message: 'Aadhar verified successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Aadhar verification error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Aadhar verification failed' },
      { status: 500 }
    )
  }
}