import { supabaseAdmin } from '@/lib/supabase'

// Server-side Supabase client factory used by API routes
// We default to the admin client to avoid RLS issues for server operations
export function createClient() {
  return supabaseAdmin
}

export type { SupabaseClient } from '@supabase/supabase-js'


