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
import Header from '@/components/layout/Header'
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
  // Documentation upload removed in new flow
  const [message, setMessage] = useState('Redirecting to Services...')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const vendorIdParam = searchParams.get('vendorId')
    if (vendorIdParam) {
      setVendorId(vendorIdParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (vendorId) router.push(`/vendor/register/services?vendorId=${vendorId}`)
    else router.push('/vendor/register')
  }

  const handleContinue = () => {
    if (vendorId) {
      router.push(`/vendor/register/services?vendorId=${vendorId}`)
    } else {
      router.push('/vendor/register')
    }
  }

  const requiredDocuments: any[] = []

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
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-heading">Documents Not Required</h1>
              <p className="text-gray-600">We’ve simplified the process. Click continue to set up your services.</p>
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
                      <div className="text-center text-gray-500">No documents required</div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-blue-800">{message}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push('/vendor/register')}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>

                      <Button type="submit" variant="primary">
                        Continue to Services Setup
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
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
