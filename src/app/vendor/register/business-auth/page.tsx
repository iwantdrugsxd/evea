// Frontend: src/app/vendor/register/business-auth/page.tsx

const handleBusinessAuth = async (formData: FormData) => {
    const vendorId = localStorage.getItem('vendorId')
  
    // 1. Submit business details
    const response = await fetch('/api/vendor/business-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorId,
        gstNumber: formData.gstNumber,
        panNumber: formData.panNumber,
        aadharNumber: formData.aadharNumber,
        bankAccountNumber: formData.bankAccountNumber,
        bankIFSC: formData.bankIFSC,
        bankHolderName: formData.bankHolderName
      })
    })
  
    if (response.ok) {
      // 2. Upload documents
      await uploadDocuments(vendorId, documents)
      router.push('/vendor/register/services-location')
    }
  }
  
  const uploadDocuments = async (vendorId: string, documents: File[]) => {
    for (const doc of documents) {
      // Convert file to base64
      const base64 = await fileToBase64(doc)
      
      await fetch('/api/upload/google-drive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId,
          documentType: doc.type, // business_license, gst_certificate, etc.
          fileName: doc.name,
          mimeType: doc.type,
          fileData: base64
        })
      })
    }
  }