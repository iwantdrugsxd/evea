require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const categories = [
  { name: 'Venue & Location', slug: 'venue-location', icon: '🏛️' },
  { name: 'Catering & Food', slug: 'catering-food', icon: '🍽️' },
  { name: 'Photography & Videography', slug: 'photography-videography', icon: '📸' },
  { name: 'Decoration & Styling', slug: 'decoration-styling', icon: '🎨' },
  { name: 'Entertainment', slug: 'entertainment', icon: '🎭' },
  { name: 'Wedding Venues', slug: 'wedding-venues', icon: '💒' },
  { name: 'Wedding Catering', slug: 'wedding-catering', icon: '🍰' },
  { name: 'Conference Halls', slug: 'conference-halls', icon: '🏢' },
  { name: 'Corporate Venues', slug: 'corporate-venues', icon: '🏢' },
  { name: 'Dessert Catering', slug: 'dessert-catering', icon: '🍰' },
  { name: 'Event Photography', slug: 'event-photography', icon: '📷' },
  { name: 'Wedding Decoration', slug: 'wedding-decoration', icon: '💐' },
  { name: 'Backdrop Decoration', slug: 'backdrop-decoration', icon: '🎪' },
  { name: 'Cultural Performances', slug: 'cultural-performances', icon: '🎭' },
  { name: 'Wedding Cars', slug: 'wedding-cars', icon: '🚗' },
  { name: 'Sound Systems', slug: 'sound-systems', icon: '🔊' },
  { name: 'Lighting Systems', slug: 'lighting-systems', icon: '💡' },
  { name: 'Projection Systems', slug: 'projection-systems', icon: '📽️' },
  { name: 'Event Planning', slug: 'event-planning', icon: '📋' },
  { name: 'Event Security', slug: 'event-security', icon: '🛡️' },
  { name: 'Comedy Shows', slug: 'comedy-shows', icon: '😄' },
  { name: 'Limo Services', slug: 'limo-services', icon: '🚙' },
  { name: 'Spa Services', slug: 'spa-services', icon: '💆' },
  { name: 'Massage Services', slug: 'massage-services', icon: '💆‍♀️' },
  { name: 'Planning & Coordination', slug: 'planning-coordination', icon: '📅' },
  { name: 'Security & Safety', slug: 'security-safety', icon: '🔒' }
]

const vendorData = [
  // Venue & Location
  {
    business_name: 'Grand Plaza Events',
    category: 'venue-location',
    title: 'Luxury Event Venue',
    description: 'Elegant venue perfect for weddings, corporate events, and celebrations',
    base_price: 5000,
    max_capacity: 200,
    average_rating: 4.8,
    total_reviews: 156,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Royal Gardens',
    category: 'venue-location',
    title: 'Garden Wedding Venue',
    description: 'Beautiful outdoor venue with lush gardens and modern amenities',
    base_price: 3500,
    max_capacity: 150,
    average_rating: 4.6,
    total_reviews: 89,
    city: 'Pune',
    state: 'Maharashtra'
  },
  {
    business_name: 'Skyline Terrace',
    category: 'venue-location',
    title: 'Rooftop Event Space',
    description: 'Stunning rooftop venue with city skyline views',
    base_price: 4500,
    max_capacity: 100,
    average_rating: 4.7,
    total_reviews: 67,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Catering & Food
  {
    business_name: 'Culinary Delights',
    category: 'catering-food',
    title: 'Premium Catering Services',
    description: 'Exquisite catering with diverse menu options and professional service',
    base_price: 800,
    max_capacity: 300,
    average_rating: 4.9,
    total_reviews: 234,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Spice Route Catering',
    category: 'catering-food',
    title: 'Multi-Cuisine Catering',
    description: 'Authentic Indian and international cuisine for all occasions',
    base_price: 600,
    max_capacity: 250,
    average_rating: 4.5,
    total_reviews: 178,
    city: 'Bangalore',
    state: 'Karnataka'
  },
  {
    business_name: 'Gourmet Express',
    category: 'catering-food',
    title: 'Corporate Catering',
    description: 'Professional catering services for corporate events and meetings',
    base_price: 500,
    max_capacity: 200,
    average_rating: 4.4,
    total_reviews: 92,
    city: 'Hyderabad',
    state: 'Telangana'
  },

  // Photography & Videography
  {
    business_name: 'Capture Moments',
    category: 'photography-videography',
    title: 'Wedding Photography & Videography',
    description: 'Professional photography and videography services for special moments',
    base_price: 2500,
    max_capacity: 500,
    average_rating: 4.8,
    total_reviews: 189,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Studio Lens',
    category: 'photography-videography',
    title: 'Event Photography',
    description: 'High-quality photography for corporate events and celebrations',
    base_price: 1500,
    max_capacity: 300,
    average_rating: 4.6,
    total_reviews: 134,
    city: 'Delhi',
    state: 'Delhi'
  },
  {
    business_name: 'Visual Stories',
    category: 'photography-videography',
    title: 'Cinematic Videography',
    description: 'Cinematic video production for weddings and special events',
    base_price: 3000,
    max_capacity: 400,
    average_rating: 4.7,
    total_reviews: 76,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Decoration & Styling
  {
    business_name: 'Elegant Decor',
    category: 'decoration-styling',
    title: 'Wedding Decoration',
    description: 'Beautiful floral arrangements and elegant decorations',
    base_price: 1200,
    max_capacity: 200,
    average_rating: 4.5,
    total_reviews: 167,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Creative Styling',
    category: 'decoration-styling',
    title: 'Event Styling & Design',
    description: 'Creative event styling and theme-based decorations',
    base_price: 900,
    max_capacity: 150,
    average_rating: 4.4,
    total_reviews: 98,
    city: 'Bangalore',
    state: 'Karnataka'
  },
  {
    business_name: 'Floral Fantasy',
    category: 'decoration-styling',
    title: 'Floral Decoration',
    description: 'Exquisite floral arrangements and garden-style decorations',
    base_price: 800,
    max_capacity: 100,
    average_rating: 4.6,
    total_reviews: 123,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Entertainment
  {
    business_name: 'Rhythm & Melody',
    category: 'entertainment',
    title: 'Live Music Band',
    description: 'Professional live music band for weddings and events',
    base_price: 2000,
    max_capacity: 300,
    average_rating: 4.7,
    total_reviews: 145,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Dance Academy',
    category: 'entertainment',
    title: 'Cultural Dance Performances',
    description: 'Traditional and contemporary dance performances',
    base_price: 1500,
    max_capacity: 200,
    average_rating: 4.5,
    total_reviews: 87,
    city: 'Delhi',
    state: 'Delhi'
  },
  {
    business_name: 'Magic Moments',
    category: 'entertainment',
    title: 'Magic & Illusion Shows',
    description: 'Entertaining magic shows for corporate and private events',
    base_price: 1800,
    max_capacity: 150,
    average_rating: 4.6,
    total_reviews: 67,
    city: 'Hyderabad',
    state: 'Telangana'
  },

  // Wedding Venues
  {
    business_name: 'Wedding Palace',
    category: 'wedding-venues',
    title: 'Luxury Wedding Venue',
    description: 'Exclusive wedding venue with royal ambiance',
    base_price: 8000,
    max_capacity: 500,
    average_rating: 4.9,
    total_reviews: 234,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Garden Wedding Resort',
    category: 'wedding-venues',
    title: 'Resort Wedding Venue',
    description: 'Beautiful resort venue with accommodation for guests',
    base_price: 6000,
    max_capacity: 300,
    average_rating: 4.7,
    total_reviews: 156,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Wedding Catering
  {
    business_name: 'Wedding Feast',
    category: 'wedding-catering',
    title: 'Wedding Catering Services',
    description: 'Specialized wedding catering with traditional and modern menus',
    base_price: 1200,
    max_capacity: 500,
    average_rating: 4.8,
    total_reviews: 189,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Royal Wedding Catering',
    category: 'wedding-catering',
    title: 'Premium Wedding Catering',
    description: 'Luxury wedding catering with international cuisine',
    base_price: 1500,
    max_capacity: 400,
    average_rating: 4.6,
    total_reviews: 134,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Conference Halls
  {
    business_name: 'Business Center',
    category: 'conference-halls',
    title: 'Modern Conference Hall',
    description: 'State-of-the-art conference facilities with AV equipment',
    base_price: 3000,
    max_capacity: 200,
    average_rating: 4.5,
    total_reviews: 98,
    city: 'Mumbai',
    state: 'Maharashtra'
  },
  {
    business_name: 'Corporate Hub',
    category: 'conference-halls',
    title: 'Corporate Conference Center',
    description: 'Professional conference center for business events',
    base_price: 2500,
    max_capacity: 150,
    average_rating: 4.4,
    total_reviews: 76,
    city: 'Bangalore',
    state: 'Karnataka'
  },

  // Corporate Venues
  {
    business_name: 'Executive Venues',
    category: 'corporate-venues',
    title: 'Corporate Event Venue',
    description: 'Premium corporate event venues with modern amenities',
    base_price: 4000,
    max_capacity: 300,
    average_rating: 4.6,
    total_reviews: 112,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Dessert Catering
  {
    business_name: 'Sweet Delights',
    category: 'dessert-catering',
    title: 'Dessert Catering Services',
    description: 'Specialized dessert catering with custom cakes and pastries',
    base_price: 400,
    max_capacity: 200,
    average_rating: 4.7,
    total_reviews: 89,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Event Photography
  {
    business_name: 'Event Lens',
    category: 'event-photography',
    title: 'Event Photography Services',
    description: 'Professional event photography for all occasions',
    base_price: 1800,
    max_capacity: 400,
    average_rating: 4.5,
    total_reviews: 145,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Wedding Decoration
  {
    business_name: 'Wedding Decor Studio',
    category: 'wedding-decoration',
    title: 'Wedding Decoration Services',
    description: 'Complete wedding decoration with themes and styling',
    base_price: 2000,
    max_capacity: 300,
    average_rating: 4.6,
    total_reviews: 167,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Backdrop Decoration
  {
    business_name: 'Backdrop Masters',
    category: 'backdrop-decoration',
    title: 'Backdrop Decoration',
    description: 'Creative backdrop designs for events and photo booths',
    base_price: 600,
    max_capacity: 100,
    average_rating: 4.4,
    total_reviews: 67,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Cultural Performances
  {
    business_name: 'Cultural Arts',
    category: 'cultural-performances',
    title: 'Cultural Performance Group',
    description: 'Traditional cultural performances and dance shows',
    base_price: 2500,
    max_capacity: 200,
    average_rating: 4.5,
    total_reviews: 98,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Wedding Cars
  {
    business_name: 'Luxury Cars',
    category: 'wedding-cars',
    title: 'Wedding Car Services',
    description: 'Luxury wedding cars and transportation services',
    base_price: 1500,
    max_capacity: 10,
    average_rating: 4.6,
    total_reviews: 134,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Sound Systems
  {
    business_name: 'Audio Pro',
    category: 'sound-systems',
    title: 'Professional Sound Systems',
    description: 'High-quality sound systems for events and concerts',
    base_price: 800,
    max_capacity: 500,
    average_rating: 4.4,
    total_reviews: 87,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Lighting Systems
  {
    business_name: 'Light Masters',
    category: 'lighting-systems',
    title: 'Event Lighting Systems',
    description: 'Professional lighting and stage effects for events',
    base_price: 1000,
    max_capacity: 300,
    average_rating: 4.5,
    total_reviews: 76,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Projection Systems
  {
    business_name: 'Visual Tech',
    category: 'projection-systems',
    title: 'Projection & AV Systems',
    description: 'Professional projection and audio-visual equipment',
    base_price: 1200,
    max_capacity: 200,
    average_rating: 4.3,
    total_reviews: 65,
    city: 'Bangalore',
    state: 'Karnataka'
  },

  // Event Planning
  {
    business_name: 'Event Masters',
    category: 'event-planning',
    title: 'Event Planning Services',
    description: 'Complete event planning and coordination services',
    base_price: 3000,
    max_capacity: 500,
    average_rating: 4.7,
    total_reviews: 189,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Event Security
  {
    business_name: 'Secure Events',
    category: 'event-security',
    title: 'Event Security Services',
    description: 'Professional security services for events and functions',
    base_price: 500,
    max_capacity: 1000,
    average_rating: 4.5,
    total_reviews: 112,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Comedy Shows
  {
    business_name: 'Laugh Factory',
    category: 'comedy-shows',
    title: 'Comedy Entertainment',
    description: 'Professional comedy shows and stand-up performances',
    base_price: 2000,
    max_capacity: 150,
    average_rating: 4.4,
    total_reviews: 78,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Limo Services
  {
    business_name: 'Luxury Limos',
    category: 'limo-services',
    title: 'Luxury Limousine Services',
    description: 'Premium limousine services for special occasions',
    base_price: 2500,
    max_capacity: 8,
    average_rating: 4.6,
    total_reviews: 89,
    city: 'Pune',
    state: 'Maharashtra'
  },

  // Spa Services
  {
    business_name: 'Wellness Spa',
    category: 'spa-services',
    title: 'Spa & Wellness Services',
    description: 'Relaxing spa services for events and parties',
    base_price: 800,
    max_capacity: 50,
    average_rating: 4.5,
    total_reviews: 67,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Massage Services
  {
    business_name: 'Relaxation Zone',
    category: 'massage-services',
    title: 'Massage Therapy Services',
    description: 'Professional massage therapy for events',
    base_price: 600,
    max_capacity: 30,
    average_rating: 4.4,
    total_reviews: 54,
    city: 'Delhi',
    state: 'Delhi'
  },

  // Planning & Coordination
  {
    business_name: 'Event Coordinators',
    category: 'planning-coordination',
    title: 'Event Coordination Services',
    description: 'Professional event coordination and management',
    base_price: 2500,
    max_capacity: 300,
    average_rating: 4.6,
    total_reviews: 145,
    city: 'Mumbai',
    state: 'Maharashtra'
  },

  // Security & Safety
  {
    business_name: 'Safety First',
    category: 'security-safety',
    title: 'Event Safety & Security',
    description: 'Comprehensive safety and security services for events',
    base_price: 400,
    max_capacity: 500,
    average_rating: 4.5,
    total_reviews: 98,
    city: 'Bangalore',
    state: 'Karnataka'
  }
]

async function seedVendorData() {
  try {
    console.log('Starting vendor data seeding...')

    // First, get or create a test user for vendors
    let { data: testUser, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'vendor@test.com')
      .single()

    if (userError || !testUser) {
      // Create user if it doesn't exist
      const { data: newUser, error: createUserError } = await supabase
        .from('users')
        .insert([{
          email: 'vendor@test.com',
          full_name: 'Test Vendor User',
          phone: '+1234567890',
          password_hash: '$2a$10$dummy.hash.for.test.user.123456789',
          is_active: true
        }])
        .select()

      if (createUserError) {
        console.error('Error creating test user:', createUserError)
        return
      }
      testUser = newUser[0]
    }

    const userId = testUser.id
    console.log('Using test user with ID:', userId)

    // First, ensure all categories exist
    for (const category of categories) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category.slug)
        .single()

      if (!existingCategory) {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert([category])
          .select()

        if (error) {
          console.error(`Error creating category ${category.slug}:`, error)
        } else {
          console.log(`Created category: ${category.name}`)
        }
      }
    }

    // Get all categories for reference
    const { data: allCategories } = await supabase
      .from('categories')
      .select('id, slug')

    const categoryMap = allCategories.reduce((acc, cat) => {
      acc[cat.slug] = cat.id
      return acc
    }, {})

    // Create vendors and vendor cards
    for (const vendorInfo of vendorData) {
      // Create vendor
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .insert([{
          user_id: userId,
          business_name: vendorInfo.business_name,
          business_type: 'service_provider',
          address: `${vendorInfo.city}, ${vendorInfo.state}`,
          city: vendorInfo.city,
          state: vendorInfo.state,
          postal_code: '400001',
          description: `${vendorInfo.business_name} provides ${vendorInfo.title.toLowerCase()} services.`,
          verification_status: 'verified',
          average_rating: vendorInfo.average_rating,
          total_reviews: vendorInfo.total_reviews
        }])
        .select()

      if (vendorError) {
        console.error(`Error creating vendor ${vendorInfo.business_name}:`, vendorError)
        continue
      }

      const vendorId = vendor[0].id

      // Create vendor card
      const { error: cardError } = await supabase
        .from('vendor_cards')
        .insert([{
          vendor_id: vendorId,
          title: vendorInfo.title,
          description: vendorInfo.description,
          category_id: categoryMap[vendorInfo.category],
          base_price: vendorInfo.base_price,
          price_type: 'fixed',
          service_area: [vendorInfo.city, vendorInfo.state, 'India'],
          max_capacity: vendorInfo.max_capacity,
          is_active: true,
          featured: Math.random() > 0.7, // 30% chance of being featured
          average_rating: vendorInfo.average_rating,
          total_reviews: vendorInfo.total_reviews
        }])

      if (cardError) {
        console.error(`Error creating vendor card for ${vendorInfo.business_name}:`, cardError)
      } else {
        console.log(`Created vendor: ${vendorInfo.business_name} (${vendorInfo.category})`)
      }
    }

    console.log('Vendor data seeding completed!')
  } catch (error) {
    console.error('Error seeding vendor data:', error)
  }
}

seedVendorData()
