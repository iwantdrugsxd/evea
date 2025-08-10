const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedSimpleData() {
  try {
    console.log('🌱 Starting to seed simple sample data...')

    // 1. Create sample categories (simplified)
    console.log('📂 Creating categories...')
    const categories = [
      {
        name: 'Photography',
        slug: 'photography',
        description: 'Professional photography services for events and portraits',
        is_active: true,
        sort_order: 1
      },
      {
        name: 'Catering',
        slug: 'catering',
        description: 'Delicious catering services for all types of events',
        is_active: true,
        sort_order: 2
      },
      {
        name: 'Decoration',
        slug: 'decoration',
        description: 'Beautiful decorations and floral arrangements',
        is_active: true,
        sort_order: 3
      }
    ]

    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'slug' })
      .select()

    if (categoryError) {
      console.error('Error creating categories:', categoryError)
      return
    }

    console.log(`✅ Created ${categoryData.length} categories`)

    // 2. Create simple users (vendors)
    console.log('👥 Creating vendor users...')
    const vendorUsers = [
      {
        email: 'photographer@example.com',
        phone: '+1234567890',
        password_hash: '$2a$10$dummy.hash.for.testing.purposes.only',
        role: 'vendor',
        first_name: 'John',
        last_name: 'Photographer',
        is_active: true
      },
      {
        email: 'caterer@example.com',
        phone: '+1234567891',
        password_hash: '$2a$10$dummy.hash.for.testing.purposes.only',
        role: 'vendor',
        first_name: 'Sarah',
        last_name: 'Caterer',
        is_active: true
      },
      {
        email: 'decorator@example.com',
        phone: '+1234567892',
        password_hash: '$2a$10$dummy.hash.for.testing.purposes.only',
        role: 'vendor',
        first_name: 'Mike',
        last_name: 'Decorator',
        is_active: true
      }
    ]

    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert(vendorUsers, { onConflict: 'email' })
      .select()

    if (userError) {
      console.error('Error creating users:', userError)
      return
    }

    console.log(`✅ Created ${userData.length} vendor users`)

    // 3. Create simple vendors
    console.log('🏢 Creating vendors...')
    const vendors = [
      {
        user_id: userData[0].id,
        business_name: 'Perfect Shots Photography',
        business_type: 'Photography Studio',
        address: '123 Photography Lane, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        postal_code: '400001',
        verification_status: 'verified'
      },
      {
        user_id: userData[1].id,
        business_name: 'Delicious Delights Catering',
        business_type: 'Catering Service',
        address: '456 Food Street, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        postal_code: '110001',
        verification_status: 'verified'
      },
      {
        user_id: userData[2].id,
        business_name: 'Elegant Events Decor',
        business_type: 'Event Decoration',
        address: '789 Decoration Road, Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        postal_code: '560001',
        verification_status: 'verified'
      }
    ]

    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .insert(vendors)
      .select()

    if (vendorError) {
      console.error('Error creating vendors:', vendorError)
      return
    }

    console.log(`✅ Created ${vendorData.length} vendors`)

    // 4. Create simple vendor cards
    console.log('🎴 Creating vendor cards...')
    const vendorCards = [
      {
        vendor_id: vendorData[0].id,
        category_id: categoryData[0].id,
        title: 'Wedding Photography Package',
        description: 'Complete wedding photography coverage including pre-wedding, ceremony, and reception.',
        base_price: 25000.00,
        service_area: ['Mumbai', 'Thane', 'Navi Mumbai'],
        featured: true,
        is_active: true
      },
      {
        vendor_id: vendorData[1].id,
        category_id: categoryData[1].id,
        title: 'Corporate Catering Service',
        description: 'Professional catering for corporate events, meetings, and conferences.',
        base_price: 500.00,
        service_area: ['Delhi', 'Gurgaon', 'Noida'],
        featured: true,
        is_active: true
      },
      {
        vendor_id: vendorData[2].id,
        category_id: categoryData[2].id,
        title: 'Wedding Decoration Package',
        description: 'Complete wedding decoration including mandap, stage, and venue styling.',
        base_price: 35000.00,
        service_area: ['Bangalore', 'Mysore', 'Mangalore'],
        featured: true,
        is_active: true
      }
    ]

    const { data: cardData, error: cardError } = await supabase
      .from('vendor_cards')
      .insert(vendorCards)
      .select()

    if (cardError) {
      console.error('Error creating vendor cards:', cardError)
      return
    }

    console.log(`✅ Created ${cardData.length} vendor cards`)

    console.log('🎉 Simple sample data seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Categories: ${categoryData.length}`)
    console.log(`- Users: ${userData.length}`)
    console.log(`- Vendors: ${vendorData.length}`)
    console.log(`- Vendor Cards: ${cardData.length}`)
    console.log('\n🌐 You can now test the marketplace at: http://localhost:3000/marketplace')

  } catch (error) {
    console.error('❌ Error seeding sample data:', error)
  }
}

seedSimpleData() 