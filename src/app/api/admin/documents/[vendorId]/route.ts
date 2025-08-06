
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/database/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { vendorId: string } }
) {
  try {
    const vendorId = params.vendorId

    // TODO: Add admin authentication check

    // Get vendor documents
    const { data: documents, error } = await supabase
      .from('vendor_documents')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      success: true,
      documents
    })

  } catch (error) {
    console.error('Get vendor documents error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}