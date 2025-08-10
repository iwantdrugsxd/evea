import { supabase } from './supabase'

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getVendorId = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null
    
    // Get vendor profile for the current user
    const { data: vendorProfile } = await supabase
      .from('vendors')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    return vendorProfile?.id || null
  } catch (error) {
    console.error('Error getting vendor ID:', error)
    return null
  }
}