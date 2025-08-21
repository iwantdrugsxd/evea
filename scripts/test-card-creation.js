require('dotenv').config({ path: '.env.local' });

async function testCardCreation() {
  try {
    console.log('Testing vendor card creation...');

    const testData = {
      title: 'Test Photography Service',
      description: 'A test photography service for development',
      category_id: '3b1b021e-182a-4e51-88b8-4f52f3c3a158', // Photography category
      base_price: 5000,
      price_type: 'fixed',
      service_area: ['Mumbai'],
      max_capacity: 100,
      inclusions: ['Professional photographer', 'Edited photos'],
      exclusions: ['Travel costs'],
      cancellation_policy: '24 hour notice required',
      images: [],
      videos: [],
      portfolio_images: [],
      tags: ['photography', 'test'],
      years_of_experience: 2,
      insurance_coverage: 'Basic coverage',
      certifications: 'None',
      emergency_contact: '+91-1234567890'
    };

    const response = await fetch('http://localhost:3000/api/vendor-cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response:', result);

    if (response.ok) {
      console.log('✅ Card creation successful!');
      console.log('Card ID:', result.card?.id);
    } else {
      console.log('❌ Card creation failed!');
      console.log('Error:', result.error);
    }

  } catch (error) {
    console.error('Error testing card creation:', error);
  }
}

testCardCreation();
