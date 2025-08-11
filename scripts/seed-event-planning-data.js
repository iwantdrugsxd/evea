const { createClient } = require('@supabase/supabase-js')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Event types for planning
const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Anniversary',
  'Baby Shower',
  'Engagement',
  'Graduation Party',
  'House Warming',
  'Product Launch',
  'Conference',
  'Seminar',
  'Workshop',
  'Exhibition',
  'Fashion Show',
  'Concert',
  'Sports Event',
  'Religious Ceremony',
  'Cultural Festival',
  'Charity Event',
  'Team Building'
]

// Enhanced service categories matching frontend
const SERVICE_CATEGORIES = [
  {
    id: 'venue-location',
    name: 'Venue & Location',
    slug: 'venue-location',
    description: 'Find the perfect venue for your event',
    icon: '🏛️',
    color: 'bg-blue-500',
    is_active: true,
    sort_order: 1,
    subcategories: [
      { id: 'wedding-venues', name: 'Wedding Venues', slug: 'wedding-venues', description: 'Beautiful wedding venues', parent_id: 'venue-location', icon: '💒', is_active: true, sort_order: 1 },
      { id: 'corporate-venues', name: 'Corporate Venues', slug: 'corporate-venues', description: 'Professional corporate venues', parent_id: 'venue-location', icon: '🏢', is_active: true, sort_order: 2 },
      { id: 'outdoor-venues', name: 'Outdoor Venues', slug: 'outdoor-venues', description: 'Scenic outdoor locations', parent_id: 'venue-location', icon: '🌳', is_active: true, sort_order: 3 },
      { id: 'hotel-venues', name: 'Hotel Venues', slug: 'hotel-venues', description: 'Luxury hotel venues', parent_id: 'venue-location', icon: '🏨', is_active: true, sort_order: 4 },
      { id: 'banquet-halls', name: 'Banquet Halls', slug: 'banquet-halls', description: 'Traditional banquet halls', parent_id: 'venue-location', icon: '🏛️', is_active: true, sort_order: 5 },
      { id: 'garden-venues', name: 'Garden Venues', slug: 'garden-venues', description: 'Beautiful garden venues', parent_id: 'venue-location', icon: '🌺', is_active: true, sort_order: 6 },
      { id: 'beach-venues', name: 'Beach Venues', slug: 'beach-venues', description: 'Scenic beach locations', parent_id: 'venue-location', icon: '🏖️', is_active: true, sort_order: 7 },
      { id: 'farm-venues', name: 'Farm Venues', slug: 'farm-venues', description: 'Rustic farm venues', parent_id: 'venue-location', icon: '🚜', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'catering-food',
    name: 'Catering & Food',
    slug: 'catering-food',
    description: 'Delicious catering services for your event',
    icon: '🍽️',
    color: 'bg-orange-500',
    is_active: true,
    sort_order: 2,
    subcategories: [
      { id: 'wedding-catering', name: 'Wedding Catering', slug: 'wedding-catering', description: 'Specialized wedding catering', parent_id: 'catering-food', icon: '💒', is_active: true, sort_order: 1 },
      { id: 'corporate-catering', name: 'Corporate Catering', slug: 'corporate-catering', description: 'Professional corporate catering', parent_id: 'catering-food', icon: '🏢', is_active: true, sort_order: 2 },
      { id: 'buffet-catering', name: 'Buffet Catering', slug: 'buffet-catering', description: 'Buffet style catering', parent_id: 'catering-food', icon: '🍱', is_active: true, sort_order: 3 },
      { id: 'fine-dining', name: 'Fine Dining', slug: 'fine-dining', description: 'Premium fine dining services', parent_id: 'catering-food', icon: '🍷', is_active: true, sort_order: 4 },
      { id: 'vegetarian-catering', name: 'Vegetarian Catering', slug: 'vegetarian-catering', description: 'Specialized vegetarian catering', parent_id: 'catering-food', icon: '🥗', is_active: true, sort_order: 5 },
      { id: 'dessert-catering', name: 'Dessert Catering', slug: 'dessert-catering', description: 'Specialized dessert services', parent_id: 'catering-food', icon: '🍰', is_active: true, sort_order: 6 },
      { id: 'beverage-services', name: 'Beverage Services', slug: 'beverage-services', description: 'Professional beverage services', parent_id: 'catering-food', icon: '🥂', is_active: true, sort_order: 7 },
      { id: 'food-trucks', name: 'Food Trucks', slug: 'food-trucks', description: 'Mobile food truck catering', parent_id: 'catering-food', icon: '🚚', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    slug: 'photography-videography',
    description: 'Capture your special moments professionally',
    icon: '📸',
    color: 'bg-purple-500',
    is_active: true,
    sort_order: 3,
    subcategories: [
      { id: 'wedding-photography', name: 'Wedding Photography', slug: 'wedding-photography', description: 'Professional wedding photography', parent_id: 'photography-videography', icon: '💒', is_active: true, sort_order: 1 },
      { id: 'event-photography', name: 'Event Photography', slug: 'event-photography', description: 'General event photography', parent_id: 'photography-videography', icon: '📷', is_active: true, sort_order: 2 },
      { id: 'portrait-photography', name: 'Portrait Photography', slug: 'portrait-photography', description: 'Professional portrait sessions', parent_id: 'photography-videography', icon: '👤', is_active: true, sort_order: 3 },
      { id: 'wedding-videography', name: 'Wedding Videography', slug: 'wedding-videography', description: 'Cinematic wedding videos', parent_id: 'photography-videography', icon: '🎬', is_active: true, sort_order: 4 },
      { id: 'event-videography', name: 'Event Videography', slug: 'event-videography', description: 'Professional event videos', parent_id: 'photography-videography', icon: '📹', is_active: true, sort_order: 5 },
      { id: 'drone-photography', name: 'Drone Photography', slug: 'drone-photography', description: 'Aerial photography and videography', parent_id: 'photography-videography', icon: '🚁', is_active: true, sort_order: 6 },
      { id: 'photo-booths', name: 'Photo Booths', slug: 'photo-booths', description: 'Fun photo booth services', parent_id: 'photography-videography', icon: '📸', is_active: true, sort_order: 7 },
      { id: 'live-streaming', name: 'Live Streaming', slug: 'live-streaming', description: 'Professional live streaming services', parent_id: 'photography-videography', icon: '📺', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'decoration-styling',
    name: 'Decoration & Styling',
    slug: 'decoration-styling',
    description: 'Transform your venue with beautiful decorations',
    icon: '🎨',
    color: 'bg-pink-500',
    is_active: true,
    sort_order: 4,
    subcategories: [
      { id: 'wedding-decoration', name: 'Wedding Decoration', slug: 'wedding-decoration', description: 'Beautiful wedding decorations', parent_id: 'decoration-styling', icon: '💒', is_active: true, sort_order: 1 },
      { id: 'event-decoration', name: 'Event Decoration', slug: 'event-decoration', description: 'General event decorations', parent_id: 'decoration-styling', icon: '🎉', is_active: true, sort_order: 2 },
      { id: 'floral-decoration', name: 'Floral Decoration', slug: 'floral-decoration', description: 'Professional floral arrangements', parent_id: 'decoration-styling', icon: '🌸', is_active: true, sort_order: 3 },
      { id: 'lighting-decoration', name: 'Lighting Decoration', slug: 'lighting-decoration', description: 'Professional lighting services', parent_id: 'decoration-styling', icon: '💡', is_active: true, sort_order: 4 },
      { id: 'backdrop-decoration', name: 'Backdrop Decoration', slug: 'backdrop-decoration', description: 'Custom backdrop designs', parent_id: 'decoration-styling', icon: '🖼️', is_active: true, sort_order: 5 },
      { id: 'table-decoration', name: 'Table Decoration', slug: 'table-decoration', description: 'Elegant table settings', parent_id: 'decoration-styling', icon: '🍽️', is_active: true, sort_order: 6 },
      { id: 'balloon-decoration', name: 'Balloon Decoration', slug: 'balloon-decoration', description: 'Creative balloon arrangements', parent_id: 'decoration-styling', icon: '🎈', is_active: true, sort_order: 7 },
      { id: 'theme-decoration', name: 'Theme Decoration', slug: 'theme-decoration', description: 'Custom theme-based decorations', parent_id: 'decoration-styling', icon: '🎭', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Keep your guests entertained with amazing performances',
    icon: '🎵',
    color: 'bg-green-500',
    is_active: true,
    sort_order: 5,
    subcategories: [
      { id: 'live-music', name: 'Live Music', slug: 'live-music', description: 'Professional live music bands', parent_id: 'entertainment', icon: '🎸', is_active: true, sort_order: 1 },
      { id: 'dj-services', name: 'DJ Services', slug: 'dj-services', description: 'Professional DJ services', parent_id: 'entertainment', icon: '🎧', is_active: true, sort_order: 2 },
      { id: 'dance-performances', name: 'Dance Performances', slug: 'dance-performances', description: 'Professional dance performances', parent_id: 'entertainment', icon: '💃', is_active: true, sort_order: 3 },
      { id: 'magic-shows', name: 'Magic Shows', slug: 'magic-shows', description: 'Entertaining magic performances', parent_id: 'entertainment', icon: '🎩', is_active: true, sort_order: 4 },
      { id: 'comedy-shows', name: 'Comedy Shows', slug: 'comedy-shows', description: 'Professional comedy performances', parent_id: 'entertainment', icon: '😄', is_active: true, sort_order: 5 },
      { id: 'karaoke-services', name: 'Karaoke Services', slug: 'karaoke-services', description: 'Professional karaoke setup', parent_id: 'entertainment', icon: '🎤', is_active: true, sort_order: 6 },
      { id: 'face-painting', name: 'Face Painting', slug: 'face-painting', description: 'Creative face painting services', parent_id: 'entertainment', icon: '🎨', is_active: true, sort_order: 7 },
      { id: 'games-activities', name: 'Games & Activities', slug: 'games-activities', description: 'Fun games and activities', parent_id: 'entertainment', icon: '🎮', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    slug: 'transportation',
    description: 'Reliable transportation services for your guests',
    icon: '🚗',
    color: 'bg-yellow-500',
    is_active: true,
    sort_order: 6,
    subcategories: [
      { id: 'luxury-cars', name: 'Luxury Cars', slug: 'luxury-cars', description: 'Premium luxury car services', parent_id: 'transportation', icon: '🚙', is_active: true, sort_order: 1 },
      { id: 'bus-services', name: 'Bus Services', slug: 'bus-services', description: 'Professional bus transportation', parent_id: 'transportation', icon: '🚌', is_active: true, sort_order: 2 },
      { id: 'limo-services', name: 'Limo Services', slug: 'limo-services', description: 'Luxury limousine services', parent_id: 'transportation', icon: '🚗', is_active: true, sort_order: 3 },
      { id: 'airport-transport', name: 'Airport Transport', slug: 'airport-transport', description: 'Airport pickup and drop services', parent_id: 'transportation', icon: '✈️', is_active: true, sort_order: 4 },
      { id: 'shuttle-services', name: 'Shuttle Services', slug: 'shuttle-services', description: 'Convenient shuttle services', parent_id: 'transportation', icon: '🚐', is_active: true, sort_order: 5 },
      { id: 'bike-services', name: 'Bike Services', slug: 'bike-services', description: 'Motorcycle and bike services', parent_id: 'transportation', icon: '🏍️', is_active: true, sort_order: 6 },
      { id: 'boat-services', name: 'Boat Services', slug: 'boat-services', description: 'Luxury boat and yacht services', parent_id: 'transportation', icon: '⛵', is_active: true, sort_order: 7 },
      { id: 'helicopter-services', name: 'Helicopter Services', slug: 'helicopter-services', description: 'Premium helicopter services', parent_id: 'transportation', icon: '🚁', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Look your best with professional beauty services',
    icon: '💄',
    color: 'bg-red-500',
    is_active: true,
    sort_order: 7,
    subcategories: [
      { id: 'bridal-makeup', name: 'Bridal Makeup', slug: 'bridal-makeup', description: 'Professional bridal makeup', parent_id: 'beauty-wellness', icon: '👰', is_active: true, sort_order: 1 },
      { id: 'party-makeup', name: 'Party Makeup', slug: 'party-makeup', description: 'Professional party makeup', parent_id: 'beauty-wellness', icon: '💄', is_active: true, sort_order: 2 },
      { id: 'hair-styling', name: 'Hair Styling', slug: 'hair-styling', description: 'Professional hair styling', parent_id: 'beauty-wellness', icon: '💇', is_active: true, sort_order: 3 },
      { id: 'nail-art', name: 'Nail Art', slug: 'nail-art', description: 'Creative nail art services', parent_id: 'beauty-wellness', icon: '💅', is_active: true, sort_order: 4 },
      { id: 'spa-services', name: 'Spa Services', slug: 'spa-services', description: 'Relaxing spa treatments', parent_id: 'beauty-wellness', icon: '🧖', is_active: true, sort_order: 5 },
      { id: 'massage-services', name: 'Massage Services', slug: 'massage-services', description: 'Professional massage services', parent_id: 'beauty-wellness', icon: '💆', is_active: true, sort_order: 6 },
      { id: 'facial-services', name: 'Facial Services', slug: 'facial-services', description: 'Professional facial treatments', parent_id: 'beauty-wellness', icon: '🧴', is_active: true, sort_order: 7 },
      { id: 'grooming-services', name: 'Grooming Services', slug: 'grooming-services', description: 'Professional grooming services', parent_id: 'beauty-wellness', icon: '✂️', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'technology-services',
    name: 'Technology Services',
    slug: 'technology-services',
    description: 'Modern technology solutions for your event',
    icon: '💻',
    color: 'bg-indigo-500',
    is_active: true,
    sort_order: 8,
    subcategories: [
      { id: 'av-equipment', name: 'AV Equipment', slug: 'av-equipment', description: 'Professional audio-visual equipment', parent_id: 'technology-services', icon: '🎤', is_active: true, sort_order: 1 },
      { id: 'projection-services', name: 'Projection Services', slug: 'projection-services', description: 'Professional projection services', parent_id: 'technology-services', icon: '📽️', is_active: true, sort_order: 2 },
      { id: 'lighting-systems', name: 'Lighting Systems', slug: 'lighting-systems', description: 'Professional lighting systems', parent_id: 'technology-services', icon: '💡', is_active: true, sort_order: 3 },
      { id: 'sound-systems', name: 'Sound Systems', slug: 'sound-systems', description: 'Professional sound systems', parent_id: 'technology-services', icon: '🔊', is_active: true, sort_order: 4 },
      { id: 'virtual-events', name: 'Virtual Events', slug: 'virtual-events', description: 'Virtual event platforms', parent_id: 'technology-services', icon: '🖥️', is_active: true, sort_order: 5 },
      { id: 'event-apps', name: 'Event Apps', slug: 'event-apps', description: 'Custom event applications', parent_id: 'technology-services', icon: '📱', is_active: true, sort_order: 6 },
      { id: 'registration-systems', name: 'Registration Systems', slug: 'registration-systems', description: 'Event registration systems', parent_id: 'technology-services', icon: '📋', is_active: true, sort_order: 7 },
      { id: 'digital-signage', name: 'Digital Signage', slug: 'digital-signage', description: 'Digital signage solutions', parent_id: 'technology-services', icon: '🖥️', is_active: true, sort_order: 8 }
    ]
  }
]

// Portfolio images for vendors
const PORTFOLIO_IMAGES = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop'
]

// Business certifications
const BUSINESS_CERTIFICATIONS = [
  'ISO 9001:2015',
  'Food Safety Certification',
  'Professional Photography Association',
  'Event Planning Institute',
  'Wedding Industry Association',
  'Corporate Event Planners Association',
  'Catering Association',
  'Entertainment Industry Association',
  'Transportation Safety Certification',
  'Beauty Industry Certification'
]

// Generate random user data
function generateUsers(count = 500) {
  const users = []
  const firstNames = ['Aarav', 'Diya', 'Arjun', 'Zara', 'Vivaan', 'Anaya', 'Aditya', 'Kiara', 'Reyansh', 'Aisha', 'Ishaan', 'Myra', 'Advait', 'Riya', 'Krish', 'Saanvi', 'Shaurya', 'Aaradhya', 'Vihaan', 'Avni']
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Verma', 'Gupta', 'Joshi', 'Yadav', 'Kaur', 'Reddy', 'Malhotra', 'Kapoor', 'Chopra', 'Mehra', 'Bhatt', 'Nair', 'Iyer', 'Menon', 'Pillai', 'Nayak']
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`
    
    users.push({
      id: uuidv4(),
      email,
      password_hash: '$2b$10$dummy.hash.for.testing.purposes.only',
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`,
      phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      role: Math.random() > 0.8 ? 'vendor' : 'customer',
      is_active: true,
      email_verified: true,
      phone_verified: true,
      profile_completion_percentage: Math.floor(Math.random() * 40) + 60,
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return users
}

// Generate vendor data
function generateVendors(users, count = 200) {
  const vendors = []
  const businessNames = [
    'Elite Events & Catering', 'Royal Wedding Planners', 'Premier Photography Studio', 'Luxury Venue Management',
    'Gourmet Catering Services', 'Professional DJ Entertainment', 'Elegant Decorations', 'Premium Transportation',
    'Beauty & Glamour Studio', 'Corporate Event Solutions', 'Wedding Photography Pro', 'Fine Dining Caterers',
    'Live Music Entertainment', 'Floral Design Studio', 'Luxury Car Services', 'Professional Makeup Artists',
    'Event Technology Solutions', 'Outdoor Event Specialists', 'Cultural Event Planners', 'Destination Wedding Experts'
  ]
  
  const businessDescriptions = [
    'Leading event planning and catering service with over 10 years of experience in creating memorable celebrations.',
    'Professional wedding planning service specializing in luxury weddings and destination ceremonies.',
    'Award-winning photography studio capturing life\'s most precious moments with artistic excellence.',
    'Premium venue management company offering exclusive locations for corporate and social events.',
    'Gourmet catering service delivering exceptional culinary experiences for all types of events.',
    'Professional DJ and entertainment service providing high-energy performances for memorable celebrations.',
    'Creative decoration studio transforming venues into magical spaces with innovative designs.',
    'Luxury transportation service offering premium vehicles for special occasions and corporate events.',
    'Professional beauty and makeup studio specializing in bridal and party makeup services.',
    'Comprehensive corporate event solutions for conferences, seminars, and business gatherings.',
    'Specialized wedding photography service capturing every moment of your special day.',
    'Fine dining catering service offering gourmet cuisine for sophisticated events.',
    'Live music entertainment featuring talented musicians and bands for all occasions.',
    'Artistic floral design studio creating beautiful arrangements for weddings and events.',
    'Premium car rental service offering luxury vehicles for special occasions.',
    'Professional makeup artists specializing in bridal, party, and editorial makeup.',
    'Advanced event technology solutions including AV equipment and live streaming services.',
    'Outdoor event specialists creating memorable experiences in natural settings.',
    'Cultural event planners preserving traditions while creating modern celebrations.',
    'Destination wedding experts making your dream wedding a reality anywhere in the world.'
  ]
  
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Uttar Pradesh']
  
  for (let i = 0; i < count; i++) {
    const user = users.find(u => u.role === 'vendor' && !vendors.find(v => v.user_id === u.id))
    if (!user) continue
    
    const businessName = businessNames[Math.floor(Math.random() * businessNames.length)]
    const businessDesc = businessDescriptions[Math.floor(Math.random() * businessDescriptions.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const state = states[Math.floor(Math.random() * states.length)]
    
    // Generate business details
    const yearsInBusiness = Math.floor(Math.random() * 15) + 2
    const teamSize = Math.floor(Math.random() * 50) + 5
    const certifications = BUSINESS_CERTIFICATIONS.slice(0, Math.floor(Math.random() * 3) + 1)
    
    vendors.push({
      id: uuidv4(),
      user_id: user.id,
      business_name: businessName,
      business_description: businessDesc,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Street', 'Avenue', 'Road', 'Lane'][Math.floor(Math.random() * 4)]}, ${city}`,
      city,
      state,
      postal_code: Math.floor(Math.random() * 900000) + 100000,
      description: businessDesc,
      verification_status: Math.random() > 0.1 ? 'verified' : 'pending',
      gst_number: `GST${Math.floor(Math.random() * 900000000000000) + 100000000000000}`,
      pan_number: `ABCDE${Math.floor(Math.random() * 9000) + 1000}F`,
      aadhar_number: Math.floor(Math.random() * 900000000000) + 100000000000,
      business_type: Math.random() > 0.5 ? 'Proprietorship' : 'Partnership',
      years_in_business: yearsInBusiness,
      team_size: teamSize,
      certifications: JSON.stringify(certifications),
      business_hours: JSON.stringify({
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '10:00 AM - 4:00 PM',
        sunday: 'Closed'
      }),
      languages_spoken: JSON.stringify(['English', 'Hindi', 'Marathi', 'Gujarati'].slice(0, Math.floor(Math.random() * 3) + 2)),
      payment_methods: JSON.stringify(['Cash', 'Card', 'UPI', 'Bank Transfer']),
      primary_contact_name: user.full_name,
      business_email: user.email,
      mobile_number: user.phone,
      average_rating: (Math.random() * 2 + 3).toFixed(1),
      total_reviews: Math.floor(Math.random() * 500) + 10,
      service_area_radius: Math.floor(Math.random() * 100) + 50,
      max_events_per_month: Math.floor(Math.random() * 20) + 5,
      monthly_revenue_target: Math.floor(Math.random() * 500000) + 100000,
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return vendors
}

// Generate portfolio images for vendors
function generatePortfolioImages(vendorId, count = 8) {
  const images = []
  for (let i = 0; i < count; i++) {
    images.push({
      id: uuidv4(),
      vendor_id: vendorId,
      image_url: PORTFOLIO_IMAGES[Math.floor(Math.random() * PORTFOLIO_IMAGES.length)],
      title: `Portfolio Image ${i + 1}`,
      description: `Beautiful work showcase ${i + 1}`,
      is_featured: i < 3, // First 3 images are featured
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  return images
}

// Generate categories and subcategories
function generateCategories() {
  const categories = []
  const subcategories = []
  
  SERVICE_CATEGORIES.forEach((category, index) => {
    const categoryId = uuidv4()
    
    categories.push({
      id: categoryId,
      name: category.name,
      slug: category.slug,
      description: category.description,
      icon: category.icon,
      is_active: true,
      sort_order: index + 1,
      created_at: new Date().toISOString()
    })
    
    category.subcategories.forEach((subcategory, subIndex) => {
      const subcategoryId = uuidv4()
      subcategories.push({
        id: subcategoryId,
        name: subcategory.name,
        slug: subcategory.slug,
        description: subcategory.description,
        icon: subcategory.icon,
        parent_id: categoryId,
        is_active: true,
        sort_order: subIndex + 1,
        created_at: new Date().toISOString()
      })
    })
  })
  
  return { categories, subcategories }
}

// Generate vendor cards
function generateVendorCards(vendors, categories, subcategories, count = 1000) {
  const vendorCards = []
  const priceTypes = ['fixed', 'per_hour', 'per_day', 'per_person', 'custom']
  const serviceAreas = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow']
  
  for (let i = 0; i < count; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const categorySubcategories = subcategories.filter(s => s.parent_id === category.id)
    const subcategory = categorySubcategories[Math.floor(Math.random() * categorySubcategories.length)]
    
    if (!subcategory) continue
    
    const priceType = priceTypes[Math.floor(Math.random() * priceTypes.length)]
    const basePrice = Math.floor(Math.random() * 50000) + 5000
    const startingPrice = Math.floor(Math.random() * 30000) + 3000
    
    // Generate realistic pricing based on category and quality
    const qualityMultiplier = Math.random() * 0.5 + 0.75 // 0.75 to 1.25
    const categoryBasePrice = {
      'venue-location': 80000,
      'catering-food': 50000,
      'photography-videography': 35000,
      'decoration-styling': 25000,
      'entertainment': 30000
    }
    
    const categoryPrice = categoryBasePrice[category.slug] || 40000
    const adjustedBasePrice = Math.floor(categoryPrice * qualityMultiplier)
    const adjustedStartingPrice = Math.floor(adjustedBasePrice * 0.8)
    
    // Generate realistic rating based on vendor quality
    const vendorQuality = Math.random()
    let averageRating, totalReviews
    
    if (vendorQuality > 0.8) {
      averageRating = (Math.random() * 0.5 + 4.5).toFixed(1) // 4.5-5.0
      totalReviews = Math.floor(Math.random() * 100) + 50 // 50-150 reviews
    } else if (vendorQuality > 0.6) {
      averageRating = (Math.random() * 0.5 + 4.0).toFixed(1) // 4.0-4.5
      totalReviews = Math.floor(Math.random() * 80) + 30 // 30-110 reviews
    } else {
      averageRating = (Math.random() * 1.0 + 3.0).toFixed(1) // 3.0-4.0
      totalReviews = Math.floor(Math.random() * 50) + 10 // 10-60 reviews
    }
    
    vendorCards.push({
      id: uuidv4(),
      vendor_id: vendor.id,
      title: `${subcategory.name} by ${vendor.business_name}`,
      description: `Professional ${subcategory.name.toLowerCase()} services with excellent quality and competitive pricing.`,
      category_id: category.id,
      subcategory_id: subcategory.id,
      base_price: adjustedBasePrice,
      starting_price: adjustedStartingPrice,
      price_type: priceType,
      service_area: [serviceAreas[Math.floor(Math.random() * serviceAreas.length)]],
      max_capacity: Math.floor(Math.random() * 500) + 50,
      min_booking_time: Math.floor(Math.random() * 5) + 1,
      max_booking_time: Math.floor(Math.random() * 30) + 10,
      advance_booking_days: Math.floor(Math.random() * 30) + 7,
      cancellation_policy: '50% refund if cancelled 7 days before event',
      inclusions: ['Basic setup', 'Professional service', 'Quality assurance'],
      exclusions: ['Transportation', 'Additional decorations', 'Extra hours'],
      equipment_provided: ['Basic equipment', 'Professional tools'],
      images: [`https://picsum.photos/400/300?random=${i + 1}`],
      videos: [],
      is_active: true,
      featured: vendorQuality > 0.85, // Only high-quality vendors are featured
      average_rating: averageRating,
      total_reviews: totalReviews,
      portfolio_images: JSON.stringify([
        { url: `https://picsum.photos/400/300?random=${i + 1}`, alt: 'Portfolio Image 1' },
        { url: `https://picsum.photos/400/300?random=${i + 2}`, alt: 'Portfolio Image 2' },
        { url: `https://picsum.photos/400/300?random=${i + 3}`, alt: 'Portfolio Image 3' }
      ]),
      simplified_price_type: 'starting_from',
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return vendorCards
}

// Generate reviews
function generateReviews(vendorCards, users, count = 2000) {
  const reviews = []
  const reviewTitles = [
    'Excellent Service!', 'Highly Recommended', 'Great Experience', 'Professional Team',
    'Amazing Quality', 'Perfect Execution', 'Outstanding Work', 'Fantastic Service',
    'Very Satisfied', 'Exceeded Expectations', 'Wonderful Experience', 'Top Notch Service',
    'Best in the Business', 'Outstanding Quality', 'Professional Excellence', 'Perfect Planning',
    'Exceptional Service', 'Highly Skilled Team', 'Excellent Communication', 'Reliable Partner',
    'Quality Work', 'Great Value for Money', 'Professional Approach', 'Timely Delivery',
    'Creative Solutions', 'Attention to Detail', 'Customer Focused', 'Flexible and Accommodating',
    'Stress-Free Experience', 'Beautiful Results', 'Memorable Event', 'Exceeded All Expectations'
  ]
  
  const reviewComments = [
    'The service was absolutely fantastic! Everything was perfect and the team was very professional.',
    'Highly recommend this vendor. They delivered exactly what was promised and more.',
    'Great experience working with this team. Very responsive and professional.',
    'Amazing quality of work. The event was a huge success thanks to their expertise.',
    'Perfect execution of our requirements. The team was very cooperative and skilled.',
    'Outstanding work and attention to detail. Would definitely hire again.',
    'Fantastic service from start to finish. Very reliable and professional.',
    'Very satisfied with the results. The team went above and beyond our expectations.',
    'Exceeded our expectations in every way. Highly professional and skilled.',
    'Wonderful experience working with this vendor. Highly recommended for any event.',
    'The team was incredibly professional and made our special day perfect. Every detail was taken care of.',
    'Excellent communication throughout the process. They understood our vision perfectly.',
    'Quality of service was outstanding. Worth every penny spent.',
    'Very organized and efficient team. Made the entire process smooth and stress-free.',
    'Creative and innovative approach to event planning. Our guests were impressed.',
    'Reliable and punctual service. Everything was delivered on time and as promised.',
    'Great value for money. The quality exceeded our expectations for the price.',
    'Flexible and accommodating to our last-minute changes. Very professional.',
    'Beautiful work and attention to detail. Our event looked absolutely stunning.',
    'Excellent customer service. They were always available to answer our questions.',
    'Professional team with years of experience. It showed in the quality of work.',
    'Timely delivery and perfect execution. Could not have asked for better service.',
    'Creative solutions for our unique requirements. Very innovative approach.',
    'Stress-free experience from start to finish. Highly recommend for any event.',
    'Memorable event thanks to their expertise. Our guests are still talking about it.',
    'Exceeded all our expectations. The team went above and beyond.',
    'Quality workmanship and professional attitude. Worth every penny.',
    'Great communication and understanding of our needs. Perfect execution.',
    'Reliable partner for all our event needs. Will definitely hire again.',
    'Outstanding quality and attention to detail. Made our event special.',
    'Professional excellence in every aspect. Highly skilled team.',
    'Customer-focused approach. They really cared about making our event perfect.',
    'Flexible and accommodating to our requirements. Very professional service.',
    'Beautiful results that exceeded our expectations. Highly recommended.',
    'Timely delivery and perfect quality. Could not be happier with the service.',
    'Creative and innovative solutions. Made our event unique and memorable.',
    'Excellent value for money. Quality service at reasonable prices.',
    'Professional team with great attention to detail. Perfect execution.',
    'Reliable and trustworthy service. Everything was delivered as promised.',
    'Outstanding work quality and professional approach. Highly satisfied.',
    'Great experience from start to finish. Will definitely recommend to others.'
  ]
  
  // Generate around 20 reviews per vendor
  for (const vendorCard of vendorCards) {
    if (!vendorCard) continue
    
    const customers = users.filter(u => u.role === 'customer')
    if (customers.length === 0) continue
    
    // Generate 15-25 reviews per vendor
    const reviewCount = Math.floor(Math.random() * 11) + 15 // 15-25 reviews
    
    for (let j = 0; j < reviewCount; j++) {
      const user = customers[Math.floor(Math.random() * customers.length)]
      
      // Generate realistic rating distribution
      let rating
      const rand = Math.random()
      if (rand < 0.6) {
        rating = 5 // 60% 5-star reviews
      } else if (rand < 0.85) {
        rating = 4 // 25% 4-star reviews
      } else if (rand < 0.95) {
        rating = 3 // 10% 3-star reviews
      } else {
        rating = Math.floor(Math.random() * 2) + 1 // 5% 1-2 star reviews
      }
      
      const title = reviewTitles[Math.floor(Math.random() * reviewTitles.length)]
      const comment = reviewComments[Math.floor(Math.random() * reviewComments.length)]
    
          // Select review content based on rating
      let finalTitle, finalComment
      if (rating >= 4) {
        finalTitle = reviewTitles[Math.floor(Math.random() * 30)] // Positive reviews
        finalComment = reviewComments[Math.floor(Math.random() * 40)] // Positive comments
      } else if (rating === 3) {
        const neutralTitles = ['Decent Service', 'Okay Experience', 'Average Quality', 'Met Expectations']
        finalTitle = neutralTitles[Math.floor(Math.random() * neutralTitles.length)]
        finalComment = 'Service was okay but could be better. Met basic expectations but nothing extraordinary.'
      } else {
        const negativeTitles = ['Disappointing', 'Not Satisfied', 'Poor Experience', 'Below Expectations']
        finalTitle = negativeTitles[Math.floor(Math.random() * negativeTitles.length)]
        finalComment = 'Service was below expectations. Would not recommend for important events.'
      }
      
      // Create a simple order for this review
      const orderId = uuidv4()
      
      reviews.push({
        id: uuidv4(),
        order_id: orderId,
        customer_id: user.id,
        vendor_id: vendorCard.vendor_id,
        rating,
        title: finalTitle,
        comment: finalComment,
        images: Math.random() > 0.7 ? [`https://picsum.photos/400/300?random=${Date.now() + j}`] : null,
        is_verified: Math.random() > 0.3, // 70% verified reviews
        helpful_count: Math.floor(Math.random() * 50),
        created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      })
    }
  }
  
  return reviews
}

// Generate reviews with orders
function generateReviewsWithOrders(vendorCards, users, count = 2000) {
  const reviews = []
  const reviewOrders = []
  const reviewTitles = [
    'Excellent Service!', 'Highly Recommended', 'Great Experience', 'Professional Team',
    'Amazing Quality', 'Perfect Execution', 'Outstanding Work', 'Fantastic Service',
    'Very Satisfied', 'Exceeded Expectations', 'Wonderful Experience', 'Top Notch Service',
    'Best in the Business', 'Outstanding Quality', 'Professional Excellence', 'Perfect Planning',
    'Exceptional Service', 'Highly Skilled Team', 'Excellent Communication', 'Reliable Partner',
    'Quality Work', 'Great Value for Money', 'Professional Approach', 'Timely Delivery',
    'Creative Solutions', 'Attention to Detail', 'Customer Focused', 'Flexible and Accommodating',
    'Stress-Free Experience', 'Beautiful Results', 'Memorable Event', 'Exceeded All Expectations'
  ]
  
  const reviewComments = [
    'The service was absolutely fantastic! Everything was perfect and the team was very professional.',
    'Highly recommend this vendor. They delivered exactly what was promised and more.',
    'Great experience working with this team. Very responsive and professional.',
    'Amazing quality of work. The event was a huge success thanks to their expertise.',
    'Perfect execution of our requirements. The team was very cooperative and skilled.',
    'Outstanding work and attention to detail. Would definitely hire again.',
    'Fantastic service from start to finish. Very reliable and professional.',
    'Very satisfied with the results. The team went above and beyond our expectations.',
    'Exceeded our expectations in every way. Highly professional and skilled.',
    'Wonderful experience working with this vendor. Highly recommended for any event.',
    'The team was incredibly professional and made our special day perfect. Every detail was taken care of.',
    'Excellent communication throughout the process. They understood our vision perfectly.',
    'Quality of service was outstanding. Worth every penny spent.',
    'Very organized and efficient team. Made the entire process smooth and stress-free.',
    'Creative and innovative approach to event planning. Our guests were impressed.',
    'Reliable and punctual service. Everything was delivered on time and as promised.',
    'Great value for money. The quality exceeded our expectations for the price.',
    'Flexible and accommodating to our last-minute changes. Very professional.',
    'Beautiful work and attention to detail. Our event looked absolutely stunning.',
    'Excellent customer service. They were always available to answer our questions.',
    'Professional team with years of experience. It showed in the quality of work.',
    'Timely delivery and perfect execution. Could not have asked for better service.',
    'Creative solutions for our unique requirements. Very innovative approach.',
    'Stress-free experience from start to finish. Highly recommend for any event.',
    'Memorable event thanks to their expertise. Our guests are still talking about it.',
    'Exceeded all our expectations. The team went above and beyond.',
    'Quality workmanship and professional attitude. Worth every penny.',
    'Great communication and understanding of our needs. Perfect execution.',
    'Reliable partner for all our event needs. Will definitely hire again.',
    'Outstanding quality and attention to detail. Made our event special.',
    'Professional excellence in every aspect. Highly skilled team.',
    'Customer-focused approach. They really cared about making our event perfect.',
    'Flexible and accommodating to our requirements. Very professional service.',
    'Beautiful results that exceeded our expectations. Highly recommended.',
    'Timely delivery and perfect quality. Could not be happier with the service.',
    'Creative and innovative solutions. Made our event unique and memorable.',
    'Excellent value for money. Quality service at reasonable prices.',
    'Professional team with great attention to detail. Perfect execution.',
    'Reliable and trustworthy service. Everything was delivered as promised.',
    'Outstanding work quality and professional approach. Highly satisfied.',
    'Great experience from start to finish. Will definitely recommend to others.'
  ]
  
  const eventLocations = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh'
  ]
  
  // Generate around 20 reviews per vendor
  for (const vendorCard of vendorCards) {
    if (!vendorCard) continue
    
    const customers = users.filter(u => u.role === 'customer')
    if (customers.length === 0) continue
    
    // Generate 15-25 reviews per vendor
    const reviewCount = Math.floor(Math.random() * 11) + 15 // 15-25 reviews
    
    for (let j = 0; j < reviewCount; j++) {
      const user = customers[Math.floor(Math.random() * customers.length)]
      
      // Generate realistic rating distribution
      let rating
      const rand = Math.random()
      if (rand < 0.6) {
        rating = 5 // 60% 5-star reviews
      } else if (rand < 0.85) {
        rating = 4 // 25% 4-star reviews
      } else if (rand < 0.95) {
        rating = 3 // 10% 3-star reviews
      } else {
        rating = Math.floor(Math.random() * 2) + 1 // 5% 1-2 star reviews
      }
      
      // Select review content based on rating
      let finalTitle, finalComment
      if (rating >= 4) {
        finalTitle = reviewTitles[Math.floor(Math.random() * 30)] // Positive reviews
        finalComment = reviewComments[Math.floor(Math.random() * 40)] // Positive comments
      } else if (rating === 3) {
        const neutralTitles = ['Decent Service', 'Okay Experience', 'Average Quality', 'Met Expectations']
        finalTitle = neutralTitles[Math.floor(Math.random() * neutralTitles.length)]
        finalComment = 'Service was okay but could be better. Met basic expectations but nothing extraordinary.'
      } else {
        const negativeTitles = ['Disappointing', 'Not Satisfied', 'Poor Experience', 'Below Expectations']
        finalTitle = negativeTitles[Math.floor(Math.random() * negativeTitles.length)]
        finalComment = 'Service was below expectations. Would not recommend for important events.'
      }
      
      // Create order for this review
      const orderId = uuidv4()
      const eventDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
      const subtotal = vendorCard.base_price
      const platformFee = Math.floor(subtotal * 0.1)
      const totalAmount = subtotal + platformFee
      
      reviewOrders.push({
        id: orderId,
        customer_id: user.id,
        vendor_id: vendorCard.vendor_id,
        order_number: `ORD${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        event_date: eventDate.toISOString().split('T')[0],
        event_time: `${Math.floor(Math.random() * 12) + 10}:${Math.random() > 0.5 ? '00' : '30'}:00`,
        event_duration: Math.floor(Math.random() * 8) + 2,
        event_location: eventLocations[Math.floor(Math.random() * eventLocations.length)],
        guest_count: Math.floor(Math.random() * 200) + 20,
        special_requirements: Math.random() > 0.7 ? 'Special dietary requirements and accessibility needs' : null,
        subtotal,
        platform_fee: platformFee,
        tax_amount: Math.floor(subtotal * 0.18),
        total_amount: totalAmount,
        status: 'completed',
        payment_status: 'paid',
        created_at: eventDate.toISOString()
      })
      
      reviews.push({
        id: uuidv4(),
        order_id: orderId,
        customer_id: user.id,
        vendor_id: vendorCard.vendor_id,
        rating,
        title: finalTitle,
        comment: finalComment,
        images: Math.random() > 0.7 ? [`https://picsum.photos/400/300?random=${Date.now() + j}`] : null,
        is_verified: Math.random() > 0.3, // 70% verified reviews
        helpful_count: Math.floor(Math.random() * 50),
        created_at: new Date(eventDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() // Review posted 0-7 days after event
      })
    }
  }
  
  return { reviews, reviewOrders }
}

// Generate orders
function generateOrders(vendorCards, users, count = 1000) {
  const orders = []
  const eventLocations = [
    'Mumbai, Maharashtra', 'Delhi, Delhi', 'Bangalore, Karnataka', 'Hyderabad, Telangana',
    'Chennai, Tamil Nadu', 'Kolkata, West Bengal', 'Pune, Maharashtra', 'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh'
  ]
  
  for (let i = 0; i < count; i++) {
    const vendorCard = vendorCards[Math.floor(Math.random() * vendorCards.length)]
    if (!vendorCard) continue
    
    const customers = users.filter(u => u.role === 'customer')
    if (customers.length === 0) continue
    
    const customer = customers[Math.floor(Math.random() * customers.length)]
    const eventDate = new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000)
    const subtotal = vendorCard.base_price
    const platformFee = Math.floor(subtotal * 0.1)
    const totalAmount = subtotal + platformFee
    
    orders.push({
      id: uuidv4(),
      customer_id: customer.id,
      vendor_id: vendorCard.vendor_id,
      order_number: `ORD${Date.now()}${i + 1}`,
      event_date: eventDate.toISOString().split('T')[0],
      event_time: `${Math.floor(Math.random() * 12) + 10}:${Math.random() > 0.5 ? '00' : '30'}:00`,
      event_duration: Math.floor(Math.random() * 8) + 2,
      event_location: eventLocations[Math.floor(Math.random() * eventLocations.length)],
      guest_count: Math.floor(Math.random() * 200) + 20,
      special_requirements: Math.random() > 0.7 ? 'Special dietary requirements and accessibility needs' : null,
      subtotal,
      platform_fee: platformFee,
      tax_amount: Math.floor(subtotal * 0.18),
      total_amount: totalAmount,
      status: Math.random() > 0.3 ? 'completed' : 'confirmed',
      payment_status: Math.random() > 0.2 ? 'paid' : 'pending',
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return orders
}

// Main seeding function
async function seedEventPlanningData() {
  try {
    console.log('🚀 Starting event planning data seeding...')
    
    // Clear existing data (optional - uncomment if you want to start fresh)
    // console.log('🗑️ Clearing existing data...')
    // await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    // await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    // await supabase.from('vendor_cards').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    // await supabase.from('vendors').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    // await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    // await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // Generate data
    console.log('📊 Generating user data...')
    const generatedUsers = generateUsers(500)
    
    console.log('🏢 Generating vendor data...')
    const generatedVendors = generateVendors(generatedUsers, 200)
    
    console.log('📂 Generating categories...')
    const { categories: generatedCategories, subcategories: generatedSubcategories } = generateCategories()
    
    // We'll generate reviews after vendor cards are created
    console.log('📝 Reviews will be generated after vendor cards...')
    
    console.log('📋 Generating orders...')
    const orders = generateOrders([], generatedUsers, 1000) // Empty array for now
    
    // Insert data into database
    console.log('💾 Fetching existing users...')
    const { data: existingUsers, error: usersFetchError } = await supabase
      .from('users')
      .select('*')
    
    if (usersFetchError) {
      console.error('Error fetching users:', usersFetchError)
      return
    }
    
    console.log(`📊 Found ${existingUsers.length} users`)
    
    // Use existing users instead of generated ones
    const users = existingUsers
    
    console.log('💾 Fetching existing categories...')
    const { data: existingCategories, error: fetchError } = await supabase
      .from('categories')
      .select('*')
    
    if (fetchError) {
      console.error('Error fetching categories:', fetchError)
      return
    }
    
    // Use existing categories instead of generated ones
    const categories = existingCategories.filter(c => !c.parent_id)
    const subcategories = existingCategories.filter(c => c.parent_id)
    
    console.log(`📊 Found ${categories.length} categories and ${subcategories.length} subcategories`)
    
    console.log('💾 Fetching existing vendors...')
    const { data: existingVendors, error: vendorsFetchError } = await supabase
      .from('vendors')
      .select('*')
    
    if (vendorsFetchError) {
      console.error('Error fetching vendors:', vendorsFetchError)
      return
    }
    
    console.log(`📊 Found ${existingVendors.length} vendors`)
    
    // Use existing vendors instead of generated ones
    const vendors = existingVendors
    
    console.log('💳 Generating vendor cards with existing data...')
    const vendorCards = generateVendorCards(vendors, categories, subcategories, 1000)
    
    console.log('💾 Inserting vendor cards...')
    const { error: vendorCardsError } = await supabase
      .from('vendor_cards')
      .upsert(vendorCards, { onConflict: 'id' })
    
    if (vendorCardsError) {
      console.error('Error inserting vendor cards:', vendorCardsError)
      return
    }
    
    console.log('💾 Inserting orders...')
    const { error: ordersError } = await supabase
      .from('orders')
      .upsert(orders, { onConflict: 'id' })
    
    if (ordersError) {
      console.error('Error inserting orders:', ordersError)
      return
    }
    
    // Generate reviews and orders together
    console.log('📝 Generating reviews and orders for vendor cards...')
    const { reviews, reviewOrders } = generateReviewsWithOrders(vendorCards, users, 2000)
    
    console.log('💾 Inserting review orders...')
    const { error: reviewOrdersError } = await supabase
      .from('orders')
      .upsert(reviewOrders, { onConflict: 'id' })
    
    if (reviewOrdersError) {
      console.error('Error inserting review orders:', reviewOrdersError)
      return
    }
    
    console.log('💾 Inserting reviews...')
    const { error: reviewsError } = await supabase
      .from('reviews')
      .upsert(reviews, { onConflict: 'id' })
    
    if (reviewsError) {
      console.error('Error inserting reviews:', reviewsError)
      return
    }
    
    // Generate and insert portfolio images for vendors
    console.log('🖼️ Generating portfolio images for vendors...')
    const allPortfolioImages = []
    vendors.forEach(vendor => {
      const portfolioImages = generatePortfolioImages(vendor.id, 8)
      allPortfolioImages.push(...portfolioImages)
    })
    
    console.log('💾 Inserting portfolio images...')
    try {
      const { error: portfolioError } = await supabase
        .from('vendor_portfolio_items')
        .upsert(allPortfolioImages, { onConflict: 'id' })
      
      if (portfolioError) {
        console.error('Error inserting portfolio images:', portfolioError)
        console.log('⚠️ Skipping portfolio images insertion...')
      }
    } catch (error) {
      console.error('Error with portfolio images:', error)
      console.log('⚠️ Skipping portfolio images insertion...')
    }
    
    console.log('✅ Event planning data seeding completed successfully!')
    console.log(`📊 Seeded data summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Vendors: ${vendors.length}`)
    console.log(`   - Categories: ${categories.length}`)
    console.log(`   - Subcategories: ${subcategories.length}`)
    console.log(`   - Vendor Cards: ${vendorCards.length}`)
    console.log(`   - Orders: ${orders.length}`)
    console.log(`   - Reviews: ${reviews.length}`)
    console.log(`   - Portfolio Images: ${allPortfolioImages.length}`)
    
  } catch (error) {
    console.error('❌ Error seeding event planning data:', error)
  }
}

// Run the seeding
if (require.main === module) {
  seedEventPlanningData()
}

module.exports = {
  seedEventPlanningData,
  EVENT_TYPES,
  SERVICE_CATEGORIES
}
