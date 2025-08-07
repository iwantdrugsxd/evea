import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const BusinessAuthSchema = z.object({
  vendorId: z.string().uuid(),
  gstNumber: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  aadharNumber: z.string().regex(/^\d{12}$/, 'Invalid Aadhar format'),
  bankAccountNumber: z.string().min(9, 'Invalid account number'),
  bankIFSC: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  bankHolderName: z.string().min(2, 'Account holder name is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = BusinessAuthSchema.parse(body)

    // Verify vendor exists and is in correct step
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select('id, registration_step, user_id')
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    if (vendorData.registration_step !== 1) {
      return NextResponse.json(
        { error: 'Invalid registration step' },
        { status: 400 }
      )
    }

    // Check email verification
    const { data: userData } = await supabase
      .from('users')
      .select('email_verified')
      .eq('id', vendorData.user_id)
      .single()

    if (!userData?.email_verified) {
      return NextResponse.json(
        { error: 'Please verify your email first' },
        { status: 400 }
      )
    }

    // Update vendor with business details
    const { error: updateError } = await supabase
      .from('vendors')
      .update({
        gst_number: validatedData.gstNumber,
        pan_number: validatedData.panNumber,
        aadhar_number: validatedData.aadharNumber,
        bank_account_number: validatedData.bankAccountNumber,
        bank_ifsc: validatedData.bankIFSC,
        bank_holder_name: validatedData.bankHolderName,
        registration_step: 2
      })
      .eq('id', validatedData.vendorId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      message: 'Business authentication completed'
    })

  } catch (error) {
    console.error('Business auth error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Business authentication failed' },
      { status: 500 }
    )
  }
}