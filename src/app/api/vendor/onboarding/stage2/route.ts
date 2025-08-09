// src/app/api/vendor/onboarding/stage2/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase'

const Stage2Schema = z.object({
  vendorId: z.string().uuid(),
  business_type: z.string().optional(),
  years_in_business: z.string().optional(),
  business_address: z.string().optional(),
  coordinates: z.any().optional(),
  service_coverage_areas: z.array(z.string()).optional(),
  secondary_contact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.string().optional(),
  }).optional(),
  social_media_profiles: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional()
  }).optional(),
  website: z.string().optional(),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = Stage2Schema.parse(body)

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }
    if (data.business_type) updates.business_type = data.business_type
    if (data.years_in_business) updates.years_in_business = data.years_in_business
    if (data.business_address) updates.address = data.business_address
    if (data.service_coverage_areas) updates.service_coverage_areas = data.service_coverage_areas
    if (data.secondary_contact?.name) updates.secondary_contact_name = data.secondary_contact.name
    if (data.secondary_contact?.phone) updates.secondary_contact_phone = data.secondary_contact.phone
    if (data.secondary_contact?.role) updates.secondary_contact_role = data.secondary_contact.role
    if (data.social_media_profiles?.instagram) updates.instagram_handle = data.social_media_profiles.instagram
    if (data.social_media_profiles?.facebook) updates.facebook_page = data.social_media_profiles.facebook
    if (data.website) updates.business_website = data.website
    if (data.description) updates.description = data.description

    const { error: vUpdateErr } = await supabaseAdmin
      .from('vendors')
      .update(updates)
      .eq('id', data.vendorId)

    if (vUpdateErr) {
      return NextResponse.json({ error: 'Failed to update vendor details' }, { status: 500 })
    }

    // Upsert without requiring a DB unique constraint by manual merge
    const { data: existingProgress, error: findErr } = await supabaseAdmin
      .from('vendor_onboarding_progress')
      .select('id')
      .eq('vendor_id', data.vendorId)
      .maybeSingle()

    if (findErr) {
      return NextResponse.json({ error: 'Failed to fetch onboarding progress' }, { status: 500 })
    }

    const progressPayload = {
      vendor_id: data.vendorId,
      current_stage: 2,
      stage_2_data: {
        business_type: data.business_type,
        years_in_business: data.years_in_business,
        business_address: data.business_address,
        service_coverage_areas: data.service_coverage_areas,
        secondary_contact: data.secondary_contact,
        social_media_profiles: data.social_media_profiles,
      },
      last_updated_at: new Date().toISOString()
    }

    if (existingProgress?.id) {
      const { error: updErr } = await supabaseAdmin
        .from('vendor_onboarding_progress')
        .update(progressPayload)
        .eq('id', existingProgress.id)
      if (updErr) {
        return NextResponse.json({ error: 'Failed to update onboarding progress' }, { status: 500 })
      }
    } else {
      const { error: insErr } = await supabaseAdmin
        .from('vendor_onboarding_progress')
        .insert(progressPayload)
      if (insErr) {
        return NextResponse.json({ error: 'Failed to create onboarding progress' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


