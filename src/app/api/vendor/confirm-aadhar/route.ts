import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const ConfirmAadharSchema = z.object({
  vendorId: z.string().uuid(),
  verificationCode: z.string().length(6, 'Verification code must be 6 digits')
})

export async function POST(request: NextRequest) {
  try {
    console.log('--- Aadhar Confirmation Start ---')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const validatedData = ConfirmAadharSchema.parse(body)
    console.log('Validated data:', validatedData)

    // Get vendor data
    console.log('Fetching vendor data for ID:', validatedData.vendorId)
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('aadhar_verification_code, aadhar_verification_sent_at, aadhar_verified')
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      console.error('Vendor not found:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    console.log('Vendor found, verification code in DB:', vendorData.aadhar_verification_code)
    console.log('Verification code from request:', validatedData.verificationCode)

    // Check if already verified
    if (vendorData.aadhar_verified) {
      console.log('Aadhar already verified for vendor:', validatedData.vendorId)
      return NextResponse.json(
        { error: 'Aadhar already verified' },
        { status: 400 }
      )
    }

    // Check if code matches
    if (vendorData.aadhar_verification_code !== validatedData.verificationCode) {
      console.error('Invalid verification code. Expected:', vendorData.aadhar_verification_code, 'Received:', validatedData.verificationCode)
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Check if code expired (15 minutes)
    const sentTime = new Date(vendorData.aadhar_verification_sent_at)
    const currentTime = new Date()
    const diffMinutes = (currentTime.getTime() - sentTime.getTime()) / (1000 * 60)

    console.log('Code sent at:', sentTime)
    console.log('Current time:', currentTime)
    console.log('Time difference (minutes):', diffMinutes)

    if (diffMinutes > 15) {
      console.error('Verification code expired. Time difference:', diffMinutes, 'minutes')
      return NextResponse.json(
        { error: 'Verification code expired' },
        { status: 400 }
      )
    }

    // Mark as verified
    console.log('Marking Aadhar as verified...')
    const { error: updateError } = await supabase
      .from('vendors')
      .update({
        aadhar_verified: true,
        aadhar_verification_code: null,
        aadhar_verification_sent_at: null
      })
      .eq('id', validatedData.vendorId)

    if (updateError) {
      console.error('Database update error:', updateError)
      throw updateError
    }

    console.log('--- Aadhar Confirmation Success ---')
    return NextResponse.json({
      success: true,
      message: 'Aadhar verified successfully'
    })

  } catch (error) {
    console.error('Confirm aadhar error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Aadhar confirmation failed' },
      { status: 500 }
    )
  }
}