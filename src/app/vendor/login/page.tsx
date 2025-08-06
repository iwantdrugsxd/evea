// Frontend: src/app/vendor/login/page.tsx

const handleLogin = async (email: string, password: string) => {
    const response = await fetch('/api/auth/vendor-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
  
    const result = await response.json()
    
    if (result.success) {
      // Store token
      localStorage.setItem('vendorToken', result.token)
      // Store user data
      localStorage.setItem('vendorData', JSON.stringify(result.user))
      // Redirect to dashboard
      router.push('/vendor/dashboard')
    }
  }