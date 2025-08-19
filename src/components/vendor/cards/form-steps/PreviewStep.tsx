'use client'

import React from 'react'
import { 
  CheckCircle, 
  AlertCircle, 
  Star, 
  MapPin, 
  DollarSign, 
  Calendar,
  User,
  Image as ImageIcon,
  Tag,
  Package,
  Shield,
  Clock,
  Users
} from 'lucide-react'

interface FormData {
  title: string
  description: string
  categoryId: string
  basePrice: number
  serviceArea: string[]
  tags: string[]
  portfolioItems: Array<{
    title: string
    description: string
    imageUrl: string
    projectValue: number
    projectDate: string
    clientName: string
  }>
  serviceImages: File[]
  portfolioImages: File[]
  inclusions: string[]
  exclusions: string[]
  equipmentProvided: string[]
  experienceYears: number
  certifications: string[]
  insuranceCoverage: string
  emergencyContact: string
  cancellationPolicy: string
  responseTime: number
  maxCapacity: number
}

interface PreviewStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export default function PreviewStep({ formData }: PreviewStepProps) {
  const validationIssues: string[] = []

  // Validation checks
  if (!formData.title) validationIssues.push('Service title is required')
  if (!formData.description) validationIssues.push('Service description is required')
  if (!formData.categoryId) validationIssues.push('Category selection is required')
  if (formData.basePrice <= 0) validationIssues.push('Base price must be greater than 0')
  if (!formData.serviceArea || formData.serviceArea.length === 0) validationIssues.push('At least one service area is required')
  if (!formData.inclusions || formData.inclusions.length === 0) validationIssues.push('At least one inclusion is required')

  const isFormValid = validationIssues.length === 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Service Card
        </h3>
        <p className="text-gray-600">
          Preview how your service will appear to potential clients
        </p>
      </div>

      {/* Validation Status */}
      <div className={`rounded-xl p-6 border-2 ${
        isFormValid 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          {isFormValid ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          )}
          <h4 className={`text-lg font-semibold ${
            isFormValid ? 'text-green-900' : 'text-yellow-900'
          }`}>
            {isFormValid ? 'Ready to Submit!' : 'Please Fix the Following Issues:'}
          </h4>
        </div>
        
        {!isFormValid && (
          <ul className="space-y-2">
            {validationIssues.map((issue, index) => (
              <li key={index} className="flex items-center space-x-2 text-yellow-800">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        )}
        
        {isFormValid && (
          <p className="text-green-800">
            All required fields are completed. Your service card is ready to be published!
          </p>
        )}
      </div>

      {/* Service Card Preview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            {formData.title || 'Service Title'}
          </h2>
          <div className="flex items-center space-x-4 text-blue-100">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>New Service</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{formData.serviceArea?.join(', ') || 'Service Area'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>₹{(formData.basePrice || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">
              {formData.description || 'No description provided'}
            </p>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">Base Price</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                ₹{(formData.basePrice || 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Service Areas</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {formData.serviceArea?.map((area, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {area}
                  </span>
                )) || <span className="text-gray-500">Not specified</span>}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Max Capacity</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {formData.maxCapacity || 'Unlimited'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Response Time</span>
              </div>
              <p className="text-lg font-semibold text-orange-600">
                {formData.responseTime || 'Not specified'} hours
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-900">Experience</span>
              </div>
              <p className="text-lg font-semibold text-indigo-600">
                {formData.experienceYears || 'Not specified'} years
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-900">Insurance</span>
              </div>
              <p className="text-sm text-gray-700">
                {formData.insuranceCoverage || 'Not specified'}
              </p>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                What's Included
              </h4>
              <ul className="space-y-2">
                {formData.inclusions?.map((inclusion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{inclusion}</span>
                  </li>
                )) || <li className="text-gray-500">No inclusions specified</li>}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                What's Not Included
              </h4>
              <ul className="space-y-2">
                {formData.exclusions?.map((exclusion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{exclusion}</span>
                  </li>
                )) || <li className="text-gray-500">No exclusions specified</li>}
              </ul>
            </div>
          </div>

          {/* Equipment Provided */}
          {formData.equipmentProvided && formData.equipmentProvided.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Package className="w-5 h-5 text-blue-600 mr-2" />
                Equipment Provided
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.equipmentProvided.map((equipment, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {formData.certifications && formData.certifications.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 text-purple-600 mr-2" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Preview */}
          {formData.portfolioItems && formData.portfolioItems.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 text-indigo-600 mr-2" />
                Portfolio ({formData.portfolioItems.length} items)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.portfolioItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-900 mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.clientName}</span>
                      <span>₹{item.projectValue?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Media Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Media Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Service Images</p>
                  <p className="text-sm text-gray-600">
                    {(formData.serviceImages || []).length} images selected
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Portfolio Images</p>
                  <p className="text-sm text-gray-600">
                    {(formData.portfolioImages || []).length} images selected
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-blue-900">Emergency Contact</p>
                <p className="text-blue-800">{formData.emergencyContact || 'Not provided'}</p>
              </div>
              <div>
                <p className="font-medium text-blue-900">Cancellation Policy</p>
                <p className="text-blue-800">{formData.cancellationPolicy || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Notes */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h5 className="text-lg font-semibold text-green-900 mb-3">
          🎉 Ready to Go Live!
        </h5>
        <p className="text-green-800 mb-4">
          Your service card will be reviewed and published within 24-48 hours. 
          You'll receive a notification once it's live on the marketplace.
        </p>
        <div className="bg-green-100 rounded-lg p-4">
          <h6 className="font-semibold text-green-900 mb-2">What happens next?</h6>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Your service will be reviewed for quality and compliance</li>
            <li>• Once approved, it will appear in search results</li>
            <li>• Clients can contact you through the platform</li>
            <li>• You can edit your service card anytime</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
