'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { ArrowLeft, ArrowRight, CheckCircle, Upload, FileText, CreditCard, Landmark } from 'lucide-react'

type UploadItem = {
  key: string
  label: string
  description: string
  accept: string
}

const uploadItems: UploadItem[] = [
  { key: 'pan_card', label: 'PAN Card', description: 'Upload PAN card (PDF/JPG/PNG)', accept: '.pdf,.jpg,.jpeg,.png' },
  { key: 'gst_registration', label: 'GST Registration', description: 'Upload GST certificate (PDF/JPG/PNG)', accept: '.pdf,.jpg,.jpeg,.png' },
  { key: 'business_registration', label: 'Business Registration', description: 'Upload business registration certificate', accept: '.pdf,.jpg,.jpeg,.png' },
  { key: 'aadhar_card', label: 'Aadhar Card', description: 'Upload Aadhar card (optional)', accept: '.pdf,.jpg,.jpeg,.png' },
]

export default function DocumentsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const vendorId = searchParams.get('vendorId')

  const [files, setFiles] = useState<Record<string, File | null>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [googleReady, setGoogleReady] = useState(false)
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    if (!vendorId) {
      router.push('/vendor/onboarding')
    }
  }, [vendorId])

  // Mark Google Identity Services ready when script loads
  const onGisLoad = () => setGoogleReady(true)

  const requestDriveToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          scope: 'https://www.googleapis.com/auth/drive.file',
          prompt: 'consent',
          callback: (resp: any) => {
            if (resp && resp.access_token) {
              resolve(resp.access_token)
            } else {
              reject(new Error('Failed to obtain Google access token'))
            }
          }
        })
        tokenClient.requestAccessToken({ prompt: 'consent' })
      } catch (e) {
        reject(e as Error)
      }
    })
  }

  const onFileChange = (key: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [key]: file }))
  }

  const uploadAll = async () => {
    if (!vendorId) return { ok: true }
    let token = accessToken
    if (!token) {
      if (!googleReady) return { ok: false, error: 'Google not initialized yet. Please wait and try again.' }
      token = await requestDriveToken().catch(() => '')
      if (!token) return { ok: false, error: 'Google authorization was cancelled or failed.' }
      setAccessToken(token)
    }
    const formData = new FormData()
    formData.append('vendorId', vendorId)
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append('documents', file)
        formData.append('documentTypes', key)
      }
    })
    formData.append('googleAccessToken', token)
    const res = await fetch('/api/vendor/upload-documents', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    if (!res.ok) return { ok: false, error: 'Upload failed' }
    return { ok: true }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await uploadAll()
      if (!result.ok) {
        setError(result.error || 'Upload failed')
        return
      }
      router.push(`/vendor/onboarding/services?vendorId=${vendorId}&step=4`)
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={onGisLoad} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Documents Upload</h1>
              <p className="text-gray-600">Upload required documents. Verification is not required now.</p>
            </div>
            <div className="text-sm text-gray-500">Step 3 of 5</div>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div className="flex items-center justify-between p-3 rounded-md bg-blue-50 border border-blue-100">
              <div className="text-sm text-blue-800">
                Connect Google Drive to store your documents securely (scope: drive.file)
              </div>
              <button
                type="button"
                onClick={async () => {
                  setError('')
                  try {
                    const token = await requestDriveToken()
                    setAccessToken(token)
                  } catch (e: any) {
                    setError(e?.message || 'Google authorization failed')
                  }
                }}
                className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                {accessToken ? 'Connected' : 'Connect Google Drive'}
              </button>
            </div>
            {uploadItems.map(item => (
              <div key={item.key} className="">
                <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept={item.accept}
                    onChange={(e) => onFileChange(item.key, e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files[item.key] && (
                    <span className="text-sm text-green-700 flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Selected</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              <span>{loading ? 'Uploading...' : 'Continue to Services'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


