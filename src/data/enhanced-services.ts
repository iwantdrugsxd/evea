export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  subcategories: ServiceSubcategory[]
  is_active: boolean
  sort_order: number
}

export interface ServiceSubcategory {
  id: string
  name: string
  slug: string
  description: string
  parent_id: string
  icon: string
  is_active: boolean
  sort_order: number
}

export const enhancedServiceCategories: ServiceCategory[] = [
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
      { id: 'stage-decoration', name: 'Stage Decoration', slug: 'stage-decoration', description: 'Professional stage setups', parent_id: 'decoration-styling', icon: '🎭', is_active: true, sort_order: 7 },
      { id: 'theme-decoration', name: 'Theme Decoration', slug: 'theme-decoration', description: 'Custom theme decorations', parent_id: 'decoration-styling', icon: '🎪', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    slug: 'entertainment',
    description: 'Keep your guests entertained with amazing performances',
    icon: '🎭',
    color: 'bg-red-500',
    is_active: true,
    sort_order: 5,
    subcategories: [
      { id: 'live-music', name: 'Live Music', slug: 'live-music', description: 'Professional live music bands', parent_id: 'entertainment', icon: '🎵', is_active: true, sort_order: 1 },
      { id: 'dj-services', name: 'DJ Services', slug: 'dj-services', description: 'Professional DJ services', parent_id: 'entertainment', icon: '🎧', is_active: true, sort_order: 2 },
      { id: 'dance-performances', name: 'Dance Performances', slug: 'dance-performances', description: 'Professional dance performances', parent_id: 'entertainment', icon: '💃', is_active: true, sort_order: 3 },
      { id: 'magic-shows', name: 'Magic Shows', slug: 'magic-shows', description: 'Entertaining magic performances', parent_id: 'entertainment', icon: '🎩', is_active: true, sort_order: 4 },
      { id: 'comedy-shows', name: 'Comedy Shows', slug: 'comedy-shows', description: 'Professional comedy performances', parent_id: 'entertainment', icon: '😄', is_active: true, sort_order: 5 },
      { id: 'cultural-performances', name: 'Cultural Performances', slug: 'cultural-performances', description: 'Traditional cultural performances', parent_id: 'entertainment', icon: '🎭', is_active: true, sort_order: 6 },
      { id: 'karaoke-services', name: 'Karaoke Services', slug: 'karaoke-services', description: 'Professional karaoke setup', parent_id: 'entertainment', icon: '🎤', is_active: true, sort_order: 7 },
      { id: 'games-activities', name: 'Games & Activities', slug: 'games-activities', description: 'Interactive games and activities', parent_id: 'entertainment', icon: '🎮', is_active: true, sort_order: 8 }
    ]
  },
  {
    id: 'transportation',
    name: 'Transportation',
    slug: 'transportation',
    description: 'Reliable transportation services for your guests',
    icon: '🚗',
    color: 'bg-green-500',
    is_active: true,
    sort_order: 6,
    subcategories: [
      { id: 'luxury-cars', name: 'Luxury Cars', slug: 'luxury-cars', description: 'Premium luxury car services', parent_id: 'transportation', icon: '🚙', is_active: true, sort_order: 1 },
      { id: 'wedding-cars', name: 'Wedding Cars', slug: 'wedding-cars', description: 'Specialized wedding car services', parent_id: 'transportation', icon: '💒', is_active: true, sort_order: 2 },
      { id: 'bus-services', name: 'Bus Services', slug: 'bus-services', description: 'Professional bus transportation', parent_id: 'transportation', icon: '🚌', is_active: true, sort_order: 3 },
      { id: 'limo-services', name: 'Limo Services', slug: 'limo-services', description: 'Luxury limousine services', parent_id: 'transportation', icon: '🚗', is_active: true, sort_order: 4 },
      { id: 'airport-transport', name: 'Airport Transport', slug: 'airport-transport', description: 'Airport pickup and drop services', parent_id: 'transportation', icon: '✈️', is_active: true, sort_order: 5 },
      { id: 'group-transport', name: 'Group Transport', slug: 'group-transport', description: 'Group transportation services', parent_id: 'transportation', icon: '👥', is_active: true, sort_order: 6 }
    ]
  },
  {
    id: 'beauty-wellness',
    name: 'Beauty & Wellness',
    slug: 'beauty-wellness',
    description: 'Look your best with professional beauty services',
    icon: '💄',
    color: 'bg-purple-400',
    is_active: true,
    sort_order: 7,
    subcategories: [
      { id: 'bridal-makeup', name: 'Bridal Makeup', slug: 'bridal-makeup', description: 'Professional bridal makeup services', parent_id: 'beauty-wellness', icon: '👰', is_active: true, sort_order: 1 },
      { id: 'party-makeup', name: 'Party Makeup', slug: 'party-makeup', description: 'Professional party makeup', parent_id: 'beauty-wellness', icon: '💄', is_active: true, sort_order: 2 },
      { id: 'hair-styling', name: 'Hair Styling', slug: 'hair-styling', description: 'Professional hair styling services', parent_id: 'beauty-wellness', icon: '💇‍♀️', is_active: true, sort_order: 3 },
      { id: 'nail-art', name: 'Nail Art', slug: 'nail-art', description: 'Professional nail art services', parent_id: 'beauty-wellness', icon: '💅', is_active: true, sort_order: 4 },
      { id: 'spa-services', name: 'Spa Services', slug: 'spa-services', description: 'Relaxing spa treatments', parent_id: 'beauty-wellness', icon: '🧖‍♀️', is_active: true, sort_order: 5 },
      { id: 'massage-services', name: 'Massage Services', slug: 'massage-services', description: 'Professional massage services', parent_id: 'beauty-wellness', icon: '💆‍♀️', is_active: true, sort_order: 6 }
    ]
  },
  {
    id: 'technology-av',
    name: 'Technology & AV',
    slug: 'technology-av',
    description: 'Professional audio-visual and technology services',
    icon: '🎤',
    color: 'bg-blue-600',
    is_active: true,
    sort_order: 8,
    subcategories: [
      { id: 'sound-systems', name: 'Sound Systems', slug: 'sound-systems', description: 'Professional sound equipment', parent_id: 'technology-av', icon: '🔊', is_active: true, sort_order: 1 },
      { id: 'lighting-systems', name: 'Lighting Systems', slug: 'lighting-systems', description: 'Professional lighting equipment', parent_id: 'technology-av', icon: '💡', is_active: true, sort_order: 2 },
      { id: 'projection-systems', name: 'Projection Systems', slug: 'projection-systems', description: 'Professional projection equipment', parent_id: 'technology-av', icon: '📽️', is_active: true, sort_order: 3 },
      { id: 'live-streaming', name: 'Live Streaming', slug: 'live-streaming', description: 'Professional live streaming setup', parent_id: 'technology-av', icon: '📺', is_active: true, sort_order: 4 },
      { id: 'video-production', name: 'Video Production', slug: 'video-production', description: 'Professional video production services', parent_id: 'technology-av', icon: '🎬', is_active: true, sort_order: 5 },
      { id: 'technical-support', name: 'Technical Support', slug: 'technical-support', description: 'On-site technical support', parent_id: 'technology-av', icon: '🛠️', is_active: true, sort_order: 6 }
    ]
  },
  {
    id: 'planning-coordination',
    name: 'Planning & Coordination',
    slug: 'planning-coordination',
    description: 'Professional event planning and coordination services',
    icon: '📋',
    color: 'bg-indigo-500',
    is_active: true,
    sort_order: 9,
    subcategories: [
      { id: 'wedding-planning', name: 'Wedding Planning', slug: 'wedding-planning', description: 'Complete wedding planning services', parent_id: 'planning-coordination', icon: '💒', is_active: true, sort_order: 1 },
      { id: 'event-planning', name: 'Event Planning', slug: 'event-planning', description: 'Professional event planning', parent_id: 'planning-coordination', icon: '📅', is_active: true, sort_order: 2 },
      { id: 'day-coordination', name: 'Day Coordination', slug: 'day-coordination', description: 'On-the-day event coordination', parent_id: 'planning-coordination', icon: '🎯', is_active: true, sort_order: 3 },
      { id: 'vendor-coordination', name: 'Vendor Coordination', slug: 'vendor-coordination', description: 'Professional vendor management', parent_id: 'planning-coordination', icon: '🤝', is_active: true, sort_order: 4 },
      { id: 'timeline-planning', name: 'Timeline Planning', slug: 'timeline-planning', description: 'Detailed event timeline planning', parent_id: 'planning-coordination', icon: '⏰', is_active: true, sort_order: 5 },
      { id: 'budget-planning', name: 'Budget Planning', slug: 'budget-planning', description: 'Professional budget management', parent_id: 'planning-coordination', icon: '💰', is_active: true, sort_order: 6 }
    ]
  },
  {
    id: 'security-safety',
    name: 'Security & Safety',
    slug: 'security-safety',
    description: 'Ensure the safety and security of your event',
    icon: '🛡️',
    color: 'bg-gray-600',
    is_active: true,
    sort_order: 10,
    subcategories: [
      { id: 'event-security', name: 'Event Security', slug: 'event-security', description: 'Professional event security services', parent_id: 'security-safety', icon: '👮', is_active: true, sort_order: 1 },
      { id: 'crowd-management', name: 'Crowd Management', slug: 'crowd-management', description: 'Professional crowd control', parent_id: 'security-safety', icon: '👥', is_active: true, sort_order: 2 },
      { id: 'first-aid', name: 'First Aid', slug: 'first-aid', description: 'On-site first aid services', parent_id: 'security-safety', icon: '🚑', is_active: true, sort_order: 3 },
      { id: 'fire-safety', name: 'Fire Safety', slug: 'fire-safety', description: 'Fire safety equipment and personnel', parent_id: 'security-safety', icon: '🔥', is_active: true, sort_order: 4 },
      { id: 'insurance-services', name: 'Insurance Services', slug: 'insurance-services', description: 'Event insurance coverage', parent_id: 'security-safety', icon: '📋', is_active: true, sort_order: 5 }
    ]
  }
]

export const getAllServices = () => {
  return enhancedServiceCategories.flatMap(category => 
    category.subcategories.map(sub => ({
      ...sub,
      category: category
    }))
  )
}

export const getServiceById = (id: string) => {
  return getAllServices().find(service => service.id === id)
}

export const getServicesByCategory = (categoryId: string) => {
  const category = enhancedServiceCategories.find(cat => cat.id === categoryId)
  return category?.subcategories || []
}
