import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Server-side Supabase client factory used by API routes
// We default to the admin client to avoid RLS issues for server operations
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createSupabaseClient(supabaseUrl, serviceRoleKey)
}

export type { SupabaseClient } from '@supabase/supabase-js'


