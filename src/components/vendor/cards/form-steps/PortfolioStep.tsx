'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Edit, Image as ImageIcon, Calendar, DollarSign, User } from 'lucide-react'

interface PortfolioItem {
  title: string
  description: string
  imageUrl: string
  projectValue: number
  projectDate: string
  clientName: string
}

interface FormData {
  portfolioItems: PortfolioItem[]
}

interface PortfolioStepProps {
  formData: FormData
  updateFormData: (updates: Partial<FormData>) => void
}

export default function PortfolioStep({ formData, updateFormData }: PortfolioStepProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newItem, setNewItem] = useState<PortfolioItem>({
    title: '',
    description: '',
    imageUrl: '',
    projectValue: 0,
    projectDate: '',
    clientName: ''
  })

  const addPortfolioItem = () => {
    if (newItem.title && newItem.description) {
      const updatedItems = [...(formData.portfolioItems || []), newItem]
      updateFormData({ portfolioItems: updatedItems })
      setNewItem({
        title: '',
        description: '',
        imageUrl: '',
        projectValue: 0,
        projectDate: '',
        clientName: ''
      })
    }
  }

  const updatePortfolioItem = (index: number, updatedItem: PortfolioItem) => {
    const updatedItems = [...(formData.portfolioItems || [])]
    updatedItems[index] = updatedItem
    updateFormData({ portfolioItems: updatedItems })
    setEditingIndex(null)
  }

  const deletePortfolioItem = (index: number) => {
    const updatedItems = (formData.portfolioItems || []).filter((_, i) => i !== index)
    updateFormData({ portfolioItems: updatedItems })
  }

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setNewItem(formData.portfolioItems?.[index] || {
      title: '',
      description: '',
      imageUrl: '',
      projectValue: 0,
      projectDate: '',
      clientName: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Showcase Your Work
        </h3>
        <p className="text-gray-600">
          Add your best projects to build trust with potential clients
        </p>
      </div>

      {/* Portfolio Items List */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2" />
          Portfolio Items ({formData.portfolioItems?.length || 0})
        </h4>

        {formData.portfolioItems && formData.portfolioItems.length > 0 ? (
          <div className="grid gap-4">
            {formData.portfolioItems.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h5 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h5>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{item.projectDate}</span>
                        <DollarSign className="w-4 h-4" />
                        <span>₹{item.projectValue?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{item.clientName}</span>
                      </div>
                      {item.imageUrl && (
                        <div className="flex items-center">
                          <ImageIcon className="w-4 h-4 mr-1" />
                          <span>Image uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => startEditing(index)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deletePortfolioItem(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h5 className="text-lg font-medium text-gray-900 mb-2">
              No portfolio items yet
            </h5>
            <p className="text-gray-600">
              Add your best work to showcase your expertise
            </p>
          </div>
        )}
      </div>

      {/* Add New Item Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          {editingIndex !== null ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Luxury Wedding at Taj Palace"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={newItem.clientName}
              onChange={(e) => setNewItem({ ...newItem, clientName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Priya & Raj"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Date
            </label>
            <input
              type="date"
              value={newItem.projectDate}
              onChange={(e) => setNewItem({ ...newItem, projectDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Value (₹)
            </label>
            <input
              type="number"
              value={newItem.projectValue || ''}
              onChange={(e) => setNewItem({ ...newItem, projectValue: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="75000"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the project, challenges overcome, and results achieved..."
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image URL
            </label>
            <input
              type="url"
              value={newItem.imageUrl}
              onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/project-image.jpg"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 mt-6">
          {editingIndex !== null && (
            <button
              onClick={() => {
                setEditingIndex(null)
                setNewItem({
                  title: '',
                  description: '',
                  imageUrl: '',
                  projectValue: 0,
                  projectDate: '',
                  clientName: ''
                })
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          )}
          
          <button
            onClick={() => {
              if (editingIndex !== null) {
                updatePortfolioItem(editingIndex, newItem)
              } else {
                addPortfolioItem()
              }
            }}
            disabled={!newItem.title || !newItem.description}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {editingIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h5 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Tips for a Great Portfolio
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include your best and most recent work</li>
          <li>• Add detailed descriptions of challenges and solutions</li>
          <li>• Mention client satisfaction and results achieved</li>
          <li>• Use high-quality images to showcase your work</li>
          <li>• Include a variety of project types and sizes</li>
        </ul>
      </div>
    </div>
  )
}
