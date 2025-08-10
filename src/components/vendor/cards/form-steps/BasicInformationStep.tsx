'use client'

import { useState, useEffect } from 'react'
import { ServiceCardFormData, ServiceCardValidationErrors, Category } from '@/types/card'
import { Tag, Hash, FileText } from 'lucide-react'

interface BasicInformationStepProps {
  formData: ServiceCardFormData
  updateFormData: (updates: Partial<ServiceCardFormData>) => void
  errors: ServiceCardValidationErrors
}

export default function BasicInformationStep({
  formData,
  updateFormData,
  errors
}: BasicInformationStepProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [newTag, setNewTag] = useState('')
  const [newKeyword, setNewKeyword] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (formData.categoryId) {
      fetchSubcategories(formData.categoryId)
    }
  }, [formData.categoryId])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}/subcategories`)
      if (response.ok) {
        const data = await response.json()
        setSubcategories(data.subcategories || [])
      }
    } catch (error) {
      console.error('Failed to fetch subcategories:', error)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateFormData({ tags: [...formData.tags, newTag.trim()] })
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    updateFormData({ tags: formData.tags.filter(tag => tag !== tagToRemove) })
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.seoKeywords.includes(newKeyword.trim())) {
      updateFormData({ seoKeywords: [...formData.seoKeywords, newKeyword.trim()] })
      setNewKeyword('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    updateFormData({ seoKeywords: formData.seoKeywords.filter(keyword => keyword !== keywordToRemove) })
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      action()
    }
  }

  return (
    <div className="space-y-6">
      {/* Service Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Service Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => updateFormData({ title: e.target.value })}
          placeholder="e.g., Professional Wedding Photography, Birthday Party Decoration"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Create a clear, descriptive title that highlights your service
        </p>
      </div>

      {/* Service Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Service Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Describe your service in detail. What makes it special? What can customers expect?"
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Be detailed and engaging. This helps customers understand your service better.
        </p>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.categoryId}
            onChange={(e) => {
              updateFormData({ 
                categoryId: e.target.value,
                subcategoryId: '' // Reset subcategory when category changes
              })
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.categoryId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
          )}
        </div>

        <div>
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
            Subcategory
          </label>
          <select
            id="subcategory"
            value={formData.subcategoryId}
            onChange={(e) => updateFormData({ subcategoryId: e.target.value })}
            disabled={!formData.categoryId || subcategories.length === 0}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
          {!formData.categoryId && (
            <p className="mt-1 text-sm text-gray-500">Select a category first</p>
          )}
        </div>
      </div>

      {/* Service Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service Tags
        </label>
        <div className="flex items-center space-x-2 mb-3">
          <Tag className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTag)}
            placeholder="Add a tag (e.g., wedding, photography, decoration)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={addTag}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            Add
          </button>
        </div>
        
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-purple-600 hover:text-purple-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Add relevant tags to help customers find your service
        </p>
      </div>

      {/* SEO Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SEO Keywords
        </label>
        <div className="flex items-center space-x-2 mb-3">
          <Hash className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addKeyword)}
            placeholder="Add SEO keywords for better search visibility"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={addKeyword}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Add
          </button>
        </div>
        
        {formData.seoKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.seoKeywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Add relevant keywords to improve your service's search visibility
        </p>
      </div>

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Tips for Better Service Cards</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use clear, descriptive titles that highlight your unique value</li>
              <li>• Write detailed descriptions that answer customer questions</li>
              <li>• Choose the most relevant category and subcategory</li>
              <li>• Add relevant tags and keywords for better discoverability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
