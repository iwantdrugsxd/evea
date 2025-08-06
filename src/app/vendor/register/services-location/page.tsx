// Frontend: src/app/vendor/register/services-location/page.tsx

const handleServicesLocation = async (formData: FormData) => {
    const vendorId = localStorage.getItem('vendorId')
  
    const response = await fetch('/api/vendor/services-location', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorId,
        // Location data from Google Maps
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        latitude: formData.coordinates.lat,
        longitude: formData.coordinates.lng,
        serviceAreaRadius: formData.serviceAreaRadius,
        // Service data
        categoryId: formData.categoryId,
        serviceType: formData.serviceType,
        // Pricing data
        weddingPriceMin: formData.weddingPriceMin,
        // ... all other pricing fields
        cancellationPolicy: formData.cancellationPolicy
      })
    })
  
    if (response.ok) {
      router.push('/vendor/pending')
    }
  }