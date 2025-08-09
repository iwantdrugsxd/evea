// src/app/api/vendor/check-business-name/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessName = searchParams.get('businessName')?.trim()

    if (!businessName) {
      return NextResponse.json({ error: 'businessName is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('vendors')
      .select('id')
      .ilike('business_name', businessName)
      .limit(1)

    if (error) {
      console.error('Business name check error:', error)
      return NextResponse.json({ error: 'Failed to check business name' }, { status: 500 })
    }

    const isAvailable = !data || data.length === 0
    return NextResponse.json({ available: isAvailable })
  } catch (error) {
    console.error('Business name check exception:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


