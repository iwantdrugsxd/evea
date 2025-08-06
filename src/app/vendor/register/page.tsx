// Frontend: src/app/vendor/register/page.tsx

const handleRegistration = async (formData: FormData) => {
    // 1. Send OTP first
    await fetch('/api/vendor/verify-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formData.phone })
    })
  
    // 2. User enters OTP, then submit registration
    const response = await fetch('/api/vendor/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        businessName: formData.businessName,
        otp: formData.otp
      })
    })
  
    const result = await response.json()
    if (result.success) {
      // Store vendorId for next steps
      localStorage.setItem('vendorId', result.vendorId)
      // Show email verification message
      router.push('/vendor/verify-email')
    }
  }