'use client'

import React, { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X, Trash2, Eye } from 'lucide-react'

interface FormData {
  serviceImages: File[]
  portfolioImages: File[]
}

interface MediaUploadStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export default function MediaUploadStep({ formData, updateFormData }: MediaUploadStepProps) {
  const serviceImagesInputRef = useRef<HTMLInputElement>(null)
  const portfolioImagesInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleUploadClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.click()
  }

  const handleFileSelect = (files: FileList | null, type: 'service' | 'portfolio') => {
    if (!files) return

    const fileArray = Array.from(files)
    const imageFiles = fileArray.filter(file => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    )

    if (imageFiles.length !== fileArray.length) {
      console.warn('Some files were filtered out - only images are allowed')
    }

    if (type === 'service') {
      updateFormData({ 
        serviceImages: [...(formData.serviceImages || []), ...imageFiles] 
      })
    } else {
      updateFormData({ 
        portfolioImages: [...(formData.portfolioImages || []), ...imageFiles] 
      })
    }
  }

  const removeFile = (index: number, type: 'service' | 'portfolio') => {
    if (type === 'service') {
      const updatedFiles = (formData.serviceImages || []).filter((_, i) => i !== index)
      updateFormData({ serviceImages: updatedFiles })
    } else {
      const updatedFiles = (formData.portfolioImages || []).filter((_, i) => i !== index)
      updateFormData({ portfolioImages: updatedFiles })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const UploadArea = ({ 
    title, 
    description, 
    files, 
    inputRef, 
    type, 
    maxFiles = 5 
  }: {
    title: string
    description: string
    files: File[]
    inputRef: React.RefObject<HTMLInputElement>
    type: 'service' | 'portfolio'
    maxFiles?: number
  }) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => handleUploadClick(inputRef)}
        className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h5 className="text-lg font-medium text-gray-900 mb-2">
          Choose Images
        </h5>
        <p className="text-gray-600 mb-4">
          Click to select or drag and drop image files
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: JPG, PNG, GIF, WebP (Max 10MB each)
        </p>
        
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files, type)}
          className="hidden"
        />
      </div>

      {/* File List */}
      {files && files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-gray-900">
              Selected Images ({files.length}/{maxFiles})
            </h5>
            {files.length >= maxFiles && (
              <span className="text-sm text-red-600">
                Maximum {maxFiles} images reached
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile(index, type)
                    }}
                    className="flex-shrink-0 p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Media
        </h3>
        <p className="text-gray-600">
          Add high-quality images to showcase your services and portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Images */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <UploadArea
            title="Service Images"
            description="Upload images that showcase your services, equipment, and team"
            files={formData.serviceImages || []}
            inputRef={serviceImagesInputRef}
            type="service"
            maxFiles={5}
          />
        </div>

        {/* Portfolio Images */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <UploadArea
            title="Portfolio Images"
            description="Upload images of your best work and completed projects"
            files={formData.portfolioImages || []}
            inputRef={portfolioImagesInputRef}
            type="portfolio"
            maxFiles={10}
          />
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h5 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Image Guidelines
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <h6 className="font-medium mb-2">Service Images:</h6>
            <ul className="space-y-1">
              <li>• High-quality photos of your equipment</li>
              <li>• Team members at work</li>
              <li>• Service setup and preparation</li>
              <li>• Before/after transformations</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium mb-2">Portfolio Images:</h6>
            <ul className="space-y-1">
              <li>• Your best completed projects</li>
              <li>• Client testimonials with photos</li>
              <li>• Awards and certifications</li>
              <li>• Behind-the-scenes moments</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Pro tip:</strong> Use images with good lighting, clear composition, and professional quality. 
            Images should be at least 800x600 pixels for optimal display.
          </p>
        </div>
      </div>

      {/* Upload Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h5 className="text-lg font-semibold text-gray-900 mb-4">
          Upload Summary
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Service Images</span>
              <span className="text-sm text-gray-500">
                {(formData.serviceImages || []).length}/5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(((formData.serviceImages || []).length / 5) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Portfolio Images</span>
              <span className="text-sm text-gray-500">
                {(formData.portfolioImages || []).length}/10
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(((formData.portfolioImages || []).length / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
