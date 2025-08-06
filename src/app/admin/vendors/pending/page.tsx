// Frontend: src/app/admin/vendors/pending/page.tsx

const fetchPendingVendors = async () => {
    const response = await fetch('/api/admin/vendors/pending')
    const data = await response.json()
    return data.vendors
  }
  
  const approveVendor = async (vendorId: string) => {
    const adminId = getCurrentAdminId() // Get from auth context
  
    const response = await fetch('/api/admin/vendors/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vendorId, adminId })
    })
  
    if (response.ok) {
      // Refresh vendor list
      refetchVendors()
      // Show success message
      toast.success('Vendor approved successfully!')
    }
  }