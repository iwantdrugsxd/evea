const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedSampleData() {
  try {
    console.log('🌱 Starting to seed sample data...')

    // 1. Create sample categories
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
      },
      {
        name: 'Music & Entertainment',
        slug: 'music-entertainment',
        description: 'Live music, DJs, and entertainment services',
        is_active: true,
        sort_order: 4
      },
      {
        name: 'Venue',
        slug: 'venue',
        description: 'Event venues and spaces for rent',
        is_active: true,
        sort_order: 5
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

    // 2. Create sample users (vendors)
    console.log('👥 Creating vendor users...')
    const vendorUsers = [
      {
        email: 'photographer@example.com',
        phone: '+1234567890',
        password_hash: '$2a$10$example.hash.for.testing',
        role: 'vendor',
        first_name: 'John',
        last_name: 'Photographer',
        is_email_verified: true,
        is_phone_verified: true,
        verification_status: 'verified',
        profile_completion_percentage: 100,
        is_active: true
      },
      {
        email: 'caterer@example.com',
        phone: '+1234567891',
        password_hash: '$2a$10$example.hash.for.testing',
        role: 'vendor',
        first_name: 'Sarah',
        last_name: 'Caterer',
        is_email_verified: true,
        is_phone_verified: true,
        verification_status: 'verified',
        profile_completion_percentage: 100,
        is_active: true
      },
      {
        email: 'decorator@example.com',
        phone: '+1234567892',
        password_hash: '$2a$10$example.hash.for.testing',
        role: 'vendor',
        first_name: 'Mike',
        last_name: 'Decorator',
        is_email_verified: true,
        is_phone_verified: true,
        verification_status: 'verified',
        profile_completion_percentage: 100,
        is_active: true
      },
      {
        email: 'dj@example.com',
        phone: '+1234567893',
        password_hash: '$2a$10$example.hash.for.testing',
        role: 'vendor',
        first_name: 'Lisa',
        last_name: 'DJ',
        is_email_verified: true,
        is_phone_verified: true,
        verification_status: 'verified',
        profile_completion_percentage: 100,
        is_active: true
      },
      {
        email: 'venue@example.com',
        phone: '+1234567894',
        password_hash: '$2a$10$example.hash.for.testing',
        role: 'vendor',
        first_name: 'David',
        last_name: 'Venue',
        is_email_verified: true,
        is_phone_verified: true,
        verification_status: 'verified',
        profile_completion_percentage: 100,
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

    // 3. Create sample vendors
    console.log('🏢 Creating vendors...')
    const vendors = [
      {
        user_id: userData[0].id,
        business_name: 'Perfect Shots Photography',
        business_type: 'Photography Studio',
        business_description: 'Professional photography services for weddings, events, and portraits. We capture your special moments with creativity and style.',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        business_address: '123 Photography Lane, Mumbai',
        contact_person_phone: '+1234567890',
        contact_person_email: 'photographer@example.com',
        website_url: 'https://perfectshots.com',
        verification_status: 'verified',
        average_rating: 4.8,
        total_reviews: 45,
        total_orders: 120,
        is_featured: true,
        is_active: true
      },
      {
        user_id: userData[1].id,
        business_name: 'Delicious Delights Catering',
        business_type: 'Catering Service',
        business_description: 'Exquisite catering services for all occasions. From intimate gatherings to large corporate events, we deliver exceptional taste.',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        business_address: '456 Food Street, Delhi',
        contact_person_phone: '+1234567891',
        contact_person_email: 'caterer@example.com',
        website_url: 'https://deliciousdelights.com',
        verification_status: 'verified',
        average_rating: 4.6,
        total_reviews: 38,
        total_orders: 95,
        is_featured: true,
        is_active: true
      },
      {
        user_id: userData[2].id,
        business_name: 'Elegant Events Decor',
        business_type: 'Event Decoration',
        business_description: 'Transform your events with our stunning decorations. We specialize in floral arrangements and creative event styling.',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India',
        business_address: '789 Decoration Road, Bangalore',
        contact_person_phone: '+1234567892',
        contact_person_email: 'decorator@example.com',
        website_url: 'https://elegantevents.com',
        verification_status: 'verified',
        average_rating: 4.7,
        total_reviews: 52,
        total_orders: 140,
        is_featured: true,
        is_active: true
      },
      {
        user_id: userData[3].id,
        business_name: 'Groove Masters DJ',
        business_type: 'Entertainment',
        business_description: 'Professional DJ services for weddings, parties, and corporate events. We keep the party going with the best music selection.',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        business_address: '321 Music Avenue, Chennai',
        contact_person_phone: '+1234567893',
        contact_person_email: 'dj@example.com',
        website_url: 'https://groovemasters.com',
        verification_status: 'verified',
        average_rating: 4.5,
        total_reviews: 29,
        total_orders: 75,
        is_featured: true,
        is_active: true
      },
      {
        user_id: userData[4].id,
        business_name: 'Grand Venue Palace',
        business_type: 'Event Venue',
        business_description: 'Luxurious event venues for weddings, corporate events, and special celebrations. Multiple spaces available for different group sizes.',
        city: 'Hyderabad',
        state: 'Telangana',
        country: 'India',
        business_address: '654 Venue Boulevard, Hyderabad',
        contact_person_phone: '+1234567894',
        contact_person_email: 'venue@example.com',
        website_url: 'https://grandvenue.com',
        verification_status: 'verified',
        average_rating: 4.9,
        total_reviews: 67,
        total_orders: 180,
        is_featured: true,
        is_active: true
      }
    ]

    const { data: vendorData, error: vendorError } = await supabase
      .from('vendors')
      .upsert(vendors, { onConflict: 'user_id' })
      .select()

    if (vendorError) {
      console.error('Error creating vendors:', vendorError)
      return
    }

    console.log(`✅ Created ${vendorData.length} vendors`)

    // 4. Create sample vendor cards
    console.log('🎴 Creating vendor cards...')
    const vendorCards = [
      {
        vendor_id: vendorData[0].id,
        category_id: categoryData[0].id,
        title: 'Wedding Photography Package',
        description: 'Complete wedding photography coverage including pre-wedding, ceremony, and reception. Professional editing and high-resolution images included.',
        base_price: 25000.00,
        price_range_min: 20000.00,
        price_range_max: 50000.00,
        images: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
        ],
        videos: [],
        inclusions: ['8 hours coverage', '500+ edited photos', 'Online gallery', 'USB drive', 'Engagement session'],
        exclusions: ['Travel beyond 50km', 'Additional prints', 'Wedding album'],
        service_area: ['Mumbai', 'Thane', 'Navi Mumbai'],
        availability_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        response_time_hours: 2,
        cancellation_policy: '50% refund if cancelled 7 days before event',
        featured: true,
        average_rating: 4.8,
        total_reviews: 45,
        total_orders: 120,
        is_active: true
      },
      {
        vendor_id: vendorData[1].id,
        category_id: categoryData[1].id,
        title: 'Corporate Catering Service',
        description: 'Professional catering for corporate events, meetings, and conferences. Fresh, delicious food with excellent service.',
        base_price: 500.00,
        price_range_min: 300.00,
        price_range_max: 1500.00,
        images: [
          'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'
        ],
        videos: [],
        inclusions: ['Fresh ingredients', 'Professional staff', 'Setup and cleanup', 'Dietary accommodations'],
        exclusions: ['Alcohol service', 'Specialty equipment', 'Extended service hours'],
        service_area: ['Delhi', 'Gurgaon', 'Noida'],
        availability_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        response_time_hours: 4,
        cancellation_policy: 'Full refund if cancelled 24 hours before event',
        featured: true,
        average_rating: 4.6,
        total_reviews: 38,
        total_orders: 95,
        is_active: true
      },
      {
        vendor_id: vendorData[2].id,
        category_id: categoryData[2].id,
        title: 'Wedding Decoration Package',
        description: 'Complete wedding decoration including mandap, stage, and venue styling. Fresh flowers and elegant designs.',
        base_price: 35000.00,
        price_range_min: 25000.00,
        price_range_max: 80000.00,
        images: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
        ],
        videos: [],
        inclusions: ['Mandap decoration', 'Stage setup', 'Entrance decoration', 'Table centerpieces', 'Fresh flowers'],
        exclusions: ['Lighting equipment', 'Additional structures', 'Outdoor setup'],
        service_area: ['Bangalore', 'Mysore', 'Mangalore'],
        availability_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        response_time_hours: 6,
        cancellation_policy: '30% refund if cancelled 3 days before event',
        featured: true,
        average_rating: 4.7,
        total_reviews: 52,
        total_orders: 140,
        is_active: true
      },
      {
        vendor_id: vendorData[3].id,
        category_id: categoryData[3].id,
        title: 'Wedding DJ Package',
        description: 'Professional DJ services for weddings with music selection, MC services, and sound equipment included.',
        base_price: 15000.00,
        price_range_min: 12000.00,
        price_range_max: 30000.00,
        images: [
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
          'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800'
        ],
        videos: [],
        inclusions: ['6 hours performance', 'Professional sound system', 'MC services', 'Music selection', 'Setup and teardown'],
        exclusions: ['Additional hours', 'Specialty lighting', 'Video projection'],
        service_area: ['Chennai', 'Coimbatore', 'Madurai'],
        availability_days: ['Friday', 'Saturday', 'Sunday'],
        response_time_hours: 3,
        cancellation_policy: '25% refund if cancelled 48 hours before event',
        featured: true,
        average_rating: 4.5,
        total_reviews: 29,
        total_orders: 75,
        is_active: true
      },
      {
        vendor_id: vendorData[4].id,
        category_id: categoryData[4].id,
        title: 'Luxury Wedding Venue',
        description: 'Exclusive wedding venue with multiple spaces, catering kitchen, and professional event coordination.',
        base_price: 100000.00,
        price_range_min: 80000.00,
        price_range_max: 200000.00,
        images: [
          'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800'
        ],
        videos: [],
        inclusions: ['Venue rental', 'Basic decoration', 'Event coordination', 'Parking space', 'Kitchen facilities'],
        exclusions: ['Catering services', 'Alcohol license', 'Additional decoration'],
        service_area: ['Hyderabad', 'Secunderabad'],
        availability_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        response_time_hours: 12,
        cancellation_policy: '50% refund if cancelled 30 days before event',
        featured: true,
        average_rating: 4.9,
        total_reviews: 67,
        total_orders: 180,
        is_active: true
      }
    ]

    const { data: cardData, error: cardError } = await supabase
      .from('vendor_cards')
      .upsert(vendorCards, { onConflict: 'vendor_id' })
      .select()

    if (cardError) {
      console.error('Error creating vendor cards:', cardError)
      return
    }

    console.log(`✅ Created ${cardData.length} vendor cards`)

    console.log('🎉 Sample data seeding completed successfully!')
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

seedSampleData() 