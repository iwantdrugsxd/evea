// src/app/api/vendor/onboarding/stage1/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const Stage1Schema = z.object({
  userId: z.string().uuid(),
  vendorId: z.string().uuid(),
  business_name: z.string().min(2),
  primary_service_categories: z.array(z.string().uuid()).min(1),
  primary_contact_name: z.string().min(2),
  business_email: z.string().email(),
  mobile_number: z.string().min(8)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = Stage1Schema.parse(body)

    // Ensure uniqueness: email and business name
    const [{ data: user, error: userErr }, { data: vendor, error: vendErr }] = await Promise.all([
      supabaseAdmin.from('users').select('id').eq('email', data.business_email).maybeSingle(),
      supabaseAdmin.from('vendors').select('id').eq('business_name', data.business_name).maybeSingle()
    ])

    if (user) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 })
    }
    if (vendor) {
      return NextResponse.json({ error: 'Business name already in use' }, { status: 400 })
    }

    // Update vendors basic info
    const { error: vUpdateErr } = await supabaseAdmin
      .from('vendors')
      .update({
        business_name: data.business_name,
        primary_contact_name: data.primary_contact_name,
        business_email: data.business_email,
        mobile_number: data.mobile_number,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.vendorId)

    if (vUpdateErr) {
      return NextResponse.json({ error: 'Failed to update vendor' }, { status: 500 })
    }

    // Track onboarding progress
    const { error: progErr } = await supabaseAdmin
      .from('vendor_onboarding_progress')
      .upsert({
        vendor_id: data.vendorId,
        current_stage: 1,
        stage_1_data: {
          business_name: data.business_name,
          primary_service_categories: data.primary_service_categories,
          primary_contact_name: data.primary_contact_name,
          business_email: data.business_email,
          mobile_number: data.mobile_number
        },
        last_updated_at: new Date().toISOString()
      }, { onConflict: 'vendor_id' })

    if (progErr) {
      return NextResponse.json({ error: 'Failed to update onboarding progress' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


