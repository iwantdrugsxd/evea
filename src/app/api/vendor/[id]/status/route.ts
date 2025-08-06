import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vendorId = params.id

    const { data: vendorData, error } = await supabase
      .from('vendors')
      .select(`
        id,
        business_name,
        registration_step,
        verification_status,
        created_at,
        users!inner (
          email_verified,
          phone_verified
        )
      `)
      .eq('id', vendorId)
      .single()

    if (error || !vendorData) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      )
    }

    // Get document upload status
    const { data: documents } = await supabase
      .from('vendor_documents')
      .select('document_type')
      .eq('vendor_id', vendorId)

    const uploadedDocTypes = documents?.map(doc => doc.document_type) || []

    return NextResponse.json({
      success: true,
      status: {
        registrationStep: vendorData.registration_step,
        verificationStatus: vendorData.verification_status,
        emailVerified: vendorData.users.email_verified,
        phoneVerified: vendorData.users.phone_verified,
        documentsUploaded: uploadedDocTypes,
        businessName: vendorData.business_name,
        createdAt: vendorData.created_at
      }
    })

  } catch (error) {
    console.error('Get status error:', error)
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    )
  }
}