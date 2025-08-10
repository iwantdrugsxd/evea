const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkVendors() {
  try {
    console.log('🔍 Checking vendors in database...')

    // Check vendors
    const { data: vendors, error: vendorError } = await supabase
      .from('vendors')
      .select('id, business_name, user_id')
      .limit(10)

    if (vendorError) {
      console.error('Error fetching vendors:', vendorError)
      return
    }

    console.log('📋 Vendors found:')
    vendors.forEach(vendor => {
      console.log(`- ID: ${vendor.id}`)
      console.log(`  Business: ${vendor.business_name}`)
      console.log(`  User ID: ${vendor.user_id}`)
      console.log('')
    })

    // Check vendor cards
    const { data: cards, error: cardError } = await supabase
      .from('vendor_cards')
      .select('id, vendor_id, title')
      .limit(10)

    if (cardError) {
      console.error('Error fetching vendor cards:', cardError)
      return
    }

    console.log('🎴 Vendor cards found:')
    cards.forEach(card => {
      console.log(`- ID: ${card.id}`)
      console.log(`  Vendor ID: ${card.vendor_id}`)
      console.log(`  Title: ${card.title}`)
      console.log('')
    })

  } catch (error) {
    console.error('❌ Error checking vendors:', error)
  }
}

checkVendors() 