require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTestCategories() {
  try {
    console.log('Creating test categories...');

    const categories = [
      {
        name: 'Photography & Videography',
        slug: 'photography-videography',
        description: 'Professional photography and videography services for events',
        icon: '📸',
        sort_order: 1
      },
      {
        name: 'Event Planning & Coordination',
        slug: 'event-planning',
        description: 'Complete event planning and coordination services',
        icon: '🎉',
        sort_order: 2
      },
      {
        name: 'Catering & Food Services',
        slug: 'catering-food',
        description: 'Catering and food services for events',
        icon: '🍽️',
        sort_order: 3
      },
      {
        name: 'Decoration & Styling',
        slug: 'decoration-styling',
        description: 'Event decoration and styling services',
        icon: '🎨',
        sort_order: 4
      },
      {
        name: 'Entertainment & Music',
        slug: 'entertainment-music',
        description: 'Entertainment and music services for events',
        icon: '🎵',
        sort_order: 5
      },
      {
        name: 'Transportation & Logistics',
        slug: 'transportation-logistics',
        description: 'Transportation and logistics services',
        icon: '🚗',
        sort_order: 6
      }
    ];

    for (const category of categories) {
      const { data, error } = await supabase
        .from('categories')
        .insert(category)
        .select()
        .single();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          console.log(`Category "${category.name}" already exists, skipping...`);
        } else {
          console.error(`Error creating category "${category.name}":`, error);
        }
      } else {
        console.log(`Category "${category.name}" created successfully:`, data.id);
      }
    }

    console.log('Test categories creation completed!');

  } catch (error) {
    console.error('Error in createTestCategories:', error);
  }
}

createTestCategories();
