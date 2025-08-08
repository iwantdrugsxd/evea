'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  Building2, 
  CreditCard,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

interface DocumentFile {
  file: File
  type: string
  name: string
  size: number
}

export default function VendorDocumentUploadPage() {
  const [vendorId, setVendorId] = useState<string | null>(null)
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const vendorIdParam = searchParams.get('vendorId')
    if (vendorIdParam) {
      setVendorId(vendorIdParam)
    }
  }, [searchParams])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = event.target.files?.[0]
    if (file) {
      const newDocument: DocumentFile = {
        file,
        type: documentType,
        name: file.name,
        size: file.size
      }

      setDocuments(prev => {
        const filtered = prev.filter(doc => doc.type !== documentType)
        return [...filtered, newDocument]
      })
    }
  }

  const removeDocument = (documentType: string) => {
    setDocuments(prev => prev.filter(doc => doc.type !== documentType))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vendorId) {
      setUploadStatus('error')
      setMessage('Vendor ID not found. Please start registration again.')
      return
    }

    if (documents.length === 0) {
      setUploadStatus('error')
      setMessage('Please upload at least one document.')
      return
    }

    setIsUploading(true)
    setUploadStatus('idle')

    try {
      const formData = new FormData()
      formData.append('vendorId', vendorId)
      
      documents.forEach(doc => {
        formData.append('documents', doc.file)
        formData.append('documentTypes', doc.type)
      })

      const response = await fetch('/api/vendor/upload-documents', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUploadStatus('success')
        setMessage('Documents uploaded successfully! You can now proceed to set up your services.')
      } else {
        setUploadStatus('error')
        setMessage(data.error || 'Failed to upload documents. Please try again.')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setMessage('An error occurred during upload. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleContinue = () => {
    if (vendorId) {
      router.push(`/vendor/register/services?vendorId=${vendorId}`)
    } else {
      router.push('/vendor/register')
    }
  }

  const requiredDocuments = [
    {
      type: 'business_license',
      name: 'Business License',
      description: 'Valid business license or registration certificate',
      icon: Building2
    },
    {
      type: 'gst_certificate',
      name: 'GST Certificate',
      description: 'GST registration certificate (if applicable)',
      icon: FileText
    },
    {
      type: 'pan_card',
      name: 'PAN Card',
      description: 'PAN card of the business owner',
      icon: CreditCard
    },
    {
      type: 'aadhar_card',
      name: 'Aadhar Card',
      description: 'Aadhar card of the business owner',
      icon: CreditCard
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <Header />
      
      <main className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">
                Upload Business Documents
              </h1>
              <p className="text-gray-600">
                Please upload the required documents to verify your business
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-center">Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {requiredDocuments.map((doc) => {
                        const Icon = doc.icon
                        const uploadedDoc = documents.find(d => d.type === doc.type)
                        
                        return (
                          <div key={doc.type} className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-400 transition-colors">
                            <div className="text-center">
                              <Icon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                              <h3 className="font-semibold text-gray-900 mb-2">{doc.name}</h3>
                              <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                              
                              {uploadedDoc ? (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-center space-x-2 text-green-600">
                                    <CheckCircle className="h-5 w-5" />
                                    <span className="text-sm font-medium">Uploaded</span>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {uploadedDoc.name} ({(uploadedDoc.size / 1024 / 1024).toFixed(2)} MB)
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeDocument(doc.type)}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <label className="cursor-pointer">
                                    <input
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      onChange={(e) => handleFileChange(e, doc.type)}
                                      className="hidden"
                                    />
                                    <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                      <Upload className="h-4 w-4 mr-2" />
                                      Upload {doc.name}
                                    </div>
                                  </label>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {uploadStatus === 'success' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-green-800">{message}</span>
                        </div>
                      </div>
                    )}

                    {uploadStatus === 'error' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-red-800">{message}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push('/vendor/register')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      {uploadStatus === 'success' ? (
                        <Button
                          type="button"
                          variant="primary"
                          onClick={handleContinue}
                        >
                          Continue to Services Setup
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={isUploading || documents.length === 0}
                          loading={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            'Upload Documents'
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
