// Service-wise image mapping for vendor cards
// All images are from legitimate sources and represent real services

export interface CategoryImage {
  url: string
  alt: string
  source: string
}

export const categoryImages: { [key: string]: CategoryImage[] } = {
  // Catering
  'catering': [
    {
      url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
      alt: 'Elegant catering setup with gourmet dishes',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
      alt: 'Professional catering service with beautiful presentation',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Wedding catering with elegant table setup',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      alt: 'Corporate catering with professional service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
      alt: 'Fine dining catering experience',
      source: 'Unsplash'
    }
  ],

  // Photography
  'photography': [
    {
      url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
      alt: 'Professional wedding photography',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
      alt: 'Event photography with professional equipment',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      alt: 'Portrait photography studio setup',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop',
      alt: 'Corporate event photography',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      alt: 'Professional camera equipment',
      source: 'Unsplash'
    }
  ],

  // Venue
  'venue': [
    {
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
      alt: 'Elegant wedding venue with chandeliers',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Modern conference venue',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
      alt: 'Luxury event space',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Outdoor wedding venue',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
      alt: 'Corporate event venue',
      source: 'Unsplash'
    }
  ],

  // Entertainment
  'entertainment': [
    {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      alt: 'Live band performing at event',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      alt: 'DJ setup with professional equipment',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop',
      alt: 'Magician performing at party',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      alt: 'Live music performance',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      alt: 'Professional sound system setup',
      source: 'Unsplash'
    }
  ],

  // Decoration
  'decoration': [
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Beautiful floral decorations',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Wedding decoration setup',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Event decoration with flowers',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Professional decoration service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop',
      alt: 'Elegant event decorations',
      source: 'Unsplash'
    }
  ],

  // Transportation
  'transportation': [
    {
      url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      alt: 'Luxury limousine service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      alt: 'Professional transportation service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      alt: 'Wedding transportation',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      alt: 'Corporate transportation',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop',
      alt: 'Event transportation service',
      source: 'Unsplash'
    }
  ],

  // Beauty & Makeup
  'beauty-makeup': [
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      alt: 'Professional makeup artist at work',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      alt: 'Bridal makeup service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      alt: 'Professional beauty services',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      alt: 'Event makeup and styling',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      alt: 'Professional beauty consultation',
      source: 'Unsplash'
    }
  ],

  // Planning & Coordination
  'planning-coordination': [
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Event planning meeting',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Professional event coordination',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Wedding planning service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Corporate event planning',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      alt: 'Event management services',
      source: 'Unsplash'
    }
  ],

  // Technology & AV
  'technology-av': [
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Professional audio visual setup',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Event technology services',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Professional sound and lighting',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'AV equipment for events',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Event technology solutions',
      source: 'Unsplash'
    }
  ],

  // Security
  'security': [
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Professional security service',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Event security personnel',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Professional security team',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Event security management',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Professional security solutions',
      source: 'Unsplash'
    }
  ],

  // Health & Wellness
  'health-wellness': [
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Wellness and spa services',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Health and wellness consultation',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Professional wellness services',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Health consultation services',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      alt: 'Wellness event services',
      source: 'Unsplash'
    }
  ]
}

// Default images for unknown categories
export const defaultImages: CategoryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    alt: 'Professional event service',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop',
    alt: 'Event planning and coordination',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
    alt: 'Professional service provider',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop',
    alt: 'Quality event services',
    source: 'Unsplash'
  },
  {
    url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
    alt: 'Professional event solutions',
    source: 'Unsplash'
  }
]

/**
 * Get a random image for a specific category
 */
export function getCategoryImage(categorySlug: string): CategoryImage {
  const images = categoryImages[categorySlug] || defaultImages
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}

/**
 * Get all images for a specific category
 */
export function getCategoryImages(categorySlug: string): CategoryImage[] {
  return categoryImages[categorySlug] || defaultImages
}

/**
 * Get a specific image by index for a category
 */
export function getCategoryImageByIndex(categorySlug: string, index: number): CategoryImage {
  const images = categoryImages[categorySlug] || defaultImages
  return images[index % images.length]
}

/**
 * Get image URLs for a category (for vendor card images array)
 */
export function getCategoryImageUrls(categorySlug: string): string[] {
  const images = categoryImages[categorySlug] || defaultImages
  return images.map(img => img.url)
}



