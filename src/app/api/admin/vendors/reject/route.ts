import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email/sender'
import { z } from 'zod'

const RejectVendorSchema = z.object({
  vendorId: z.string().uuid(),
  adminId: z.string().uuid(),
  rejectionReason: z.string().min(10, 'Rejection reason is required')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = RejectVendorSchema.parse(body)

    // TODO: Verify admin authentication
    
    // Get vendor and user data
    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .select(`
        id,
        business_name,
        users!inner (
          id,
          full_name,
          email
        )
      `)
      .eq('id', validatedData.vendorId)
      .single()

    if (vendorError || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Update vendor status to rejected
    const { error: updateVendorError } = await supabase
      .from('vendors')
      .update({
        verification_status: 'rejected'
      })
      .eq('id', validatedData.vendorId)

    if (updateVendorError) throw updateVendorError

    // Record admin review
    const { error: reviewError } = await supabase
      .from('admin_reviews')
      .insert({
        vendor_id: validatedData.vendorId,
        admin_id: validatedData.adminId,
        review_status: 'rejected',
        review_notes: validatedData.rejectionReason,
        documents_reviewed: true,
        business_info_reviewed: true,
        services_reviewed: true
      })

    if (reviewError) throw reviewError

    // Send rejection email
    await sendEmail({
      to: vendorData.users.email,
      subject: 'EVEA Vendor Application - Update Required',
      template: 'vendor-rejection',
      data: {
        vendorName: vendorData.users.full_name,
        businessName: vendorData.business_name,
        rejectionReason: validatedData.rejectionReason,
        supportEmail: 'support@evea.com'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Vendor application rejected'
    })

  } catch (error) {
    console.error('Vendor rejection error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Vendor rejection failed' },
      { status: 500 }
    )
  }
}