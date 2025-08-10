'use client'

import { useState } from 'react'
import { ServiceCardFormData, ServiceCardValidationErrors, PackageTier, AddOnService, PromotionalOffer } from '@/types/card'
import { DollarSign, Package, Plus, X, Star, Calendar } from 'lucide-react'

interface PricingPackagesStepProps {
  formData: ServiceCardFormData
  updateFormData: (updates: Partial<ServiceCardFormData>) => void
  errors: ServiceCardValidationErrors
}

export default function PricingPackagesStep({
  formData,
  updateFormData,
  errors
}: PricingPackagesStepProps) {
  const [showPackageForm, setShowPackageForm] = useState(false)
  const [showAddOnForm, setShowAddOnForm] = useState(false)
  const [showPromoForm, setShowPromoForm] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const addPackageTier = (packageTier: Omit<PackageTier, 'id'>) => {
    const newTier: PackageTier = {
      ...packageTier,
      id: Date.now().toString()
    }
    updateFormData({ packageTiers: [...formData.packageTiers, newTier] })
    setShowPackageForm(false)
  }

  const removePackageTier = (id: string) => {
    updateFormData({ packageTiers: formData.packageTiers.filter(tier => tier.id !== id) })
  }

  const addAddOnService = (addOn: Omit<AddOnService, 'id'>) => {
    const newAddOn: AddOnService = {
      ...addOn,
      id: Date.now().toString()
    }
    updateFormData({ addOnServices: [...formData.addOnServices, newAddOn] })
    setShowAddOnForm(false)
  }

  const removeAddOnService = (id: string) => {
    updateFormData({ addOnServices: formData.addOnServices.filter(addOn => addOn.id !== id) })
  }

  const addPromotionalOffer = (promo: Omit<PromotionalOffer, 'id'>) => {
    const newPromo: PromotionalOffer = {
      ...promo,
      id: Date.now().toString(),
      isActive: true
    }
    updateFormData({ promotionalOffers: [...formData.promotionalOffers, newPromo] })
    setShowPromoForm(false)
  }

  const removePromotionalOffer = (id: string) => {
    updateFormData({ promotionalOffers: formData.promotionalOffers.filter(promo => promo.id !== id) })
  }

  return (
    <div className="space-y-6">
      {/* Price Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Type *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { value: 'fixed', label: 'Fixed Price', icon: '💰' },
            { value: 'per_hour', label: 'Per Hour', icon: '⏰' },
            { value: 'per_day', label: 'Per Day', icon: '📅' },
            { value: 'per_person', label: 'Per Person', icon: '👥' },
            { value: 'package', label: 'Package', icon: '📦' }
          ].map((option) => (
            <label
              key={option.value}
              className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.priceType === option.value
                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="priceType"
                value={option.value}
                checked={formData.priceType === option.value}
                onChange={(e) => updateFormData({ priceType: e.target.value as any })}
                className="sr-only"
              />
              <span className="text-2xl mb-2">{option.icon}</span>
              <span className="text-sm font-medium text-center">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Base Price */}
      <div>
        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-2">
          Base Price (INR) *
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            id="basePrice"
            value={formData.basePrice}
            onChange={(e) => updateFormData({ basePrice: parseFloat(e.target.value) || 0 })}
            placeholder="0"
            min="0"
            className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.basePrice ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.basePrice && (
          <p className="mt-1 text-sm text-red-600">{errors.basePrice}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Set your base price for this service
        </p>
      </div>

      {/* Price Range (for variable pricing) */}
      {formData.priceType !== 'fixed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Price (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                id="priceMin"
                value={formData.priceRange?.min || 0}
                onChange={(e) => updateFormData({ 
                  priceRange: { 
                    ...formData.priceRange, 
                    min: parseFloat(e.target.value) || 0 
                  } 
                })}
                placeholder="0"
                min="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Price (INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                id="priceMax"
                value={formData.priceRange?.max || 0}
                onChange={(e) => updateFormData({ 
                  priceRange: { 
                    ...formData.priceRange, 
                    max: parseFloat(e.target.value) || 0 
                  } 
                })}
                placeholder="0"
                min="0"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Package Tiers */}
      {formData.priceType === 'package' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Package Tiers *
            </label>
            <button
              onClick={() => setShowPackageForm(true)}
              className="flex items-center px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </button>
          </div>

          {formData.packageTiers.length > 0 && (
            <div className="space-y-3">
              {formData.packageTiers.map((tier) => (
                <div key={tier.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">{tier.name}</h4>
                      {tier.isPopular && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{tier.description}</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">
                      {formatCurrency(tier.price)}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 font-medium">Inclusions:</p>
                      <ul className="text-sm text-gray-600 mt-1">
                        {tier.inclusions.map((inclusion, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {inclusion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => removePackageTier(tier.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.packageTiers && (
            <p className="mt-1 text-sm text-red-600">{errors.packageTiers}</p>
          )}
        </div>
      )}

      {/* Add-on Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Add-on Services
          </label>
          <button
            onClick={() => setShowAddOnForm(true)}
            className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </button>
        </div>

        {formData.addOnServices.length > 0 && (
          <div className="space-y-3">
            {formData.addOnServices.map((addOn) => (
              <div key={addOn.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{addOn.name}</h4>
                    {addOn.isRequired && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{addOn.description}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">
                    {formatCurrency(addOn.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeAddOnService(addOn.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Offers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Promotional Offers
          </label>
          <button
            onClick={() => setShowPromoForm(true)}
            className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Offer
          </button>
        </div>

        {formData.promotionalOffers.length > 0 && (
          <div className="space-y-3">
            {formData.promotionalOffers.map((promo) => (
              <div key={promo.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{promo.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{promo.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-lg font-bold text-green-600">
                      {promo.discountPercentage}% OFF
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Valid until {new Date(promo.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removePromotionalOffer(promo.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Package Tier Form Modal */}
      {showPackageForm && (
        <PackageTierForm
          onSubmit={addPackageTier}
          onCancel={() => setShowPackageForm(false)}
        />
      )}

      {/* Add-on Service Form Modal */}
      {showAddOnForm && (
        <AddOnServiceForm
          onSubmit={addAddOnService}
          onCancel={() => setShowAddOnForm(false)}
        />
      )}

      {/* Promotional Offer Form Modal */}
      {showPromoForm && (
        <PromotionalOfferForm
          onSubmit={addPromotionalOffer}
          onCancel={() => setShowPromoForm(false)}
        />
      )}

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <DollarSign className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Pricing Strategy Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Set competitive prices based on market research</li>
              <li>• Use package tiers to offer different value levels</li>
              <li>• Add-on services can increase your revenue per customer</li>
              <li>• Promotional offers can attract new customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Package Tier Form Component
function PackageTierForm({ onSubmit, onCancel }: { 
  onSubmit: (tier: Omit<PackageTier, 'id'>) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    inclusions: [''],
    isPopular: false
  })

  const addInclusion = () => {
    setFormData(prev => ({ ...prev, inclusions: [...prev.inclusions, ''] }))
  }

  const removeInclusion = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      inclusions: prev.inclusions.filter((_, i) => i !== index) 
    }))
  }

  const updateInclusion = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.map((item, i) => i === index ? value : item)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      inclusions: formData.inclusions.filter(inclusion => inclusion.trim() !== '')
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Add Package Tier</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inclusions</label>
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => updateInclusion(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 8 hours coverage, 100 edited photos"
                />
                {formData.inclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInclusion(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInclusion}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              + Add inclusion
            </button>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPopular"
              checked={formData.isPopular}
              onChange={(e) => setFormData(prev => ({ ...prev, isPopular: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="isPopular" className="text-sm text-gray-700">Mark as popular choice</label>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Add-on Service Form Component
function AddOnServiceForm({ onSubmit, onCancel }: { 
  onSubmit: (addOn: Omit<AddOnService, 'id'>) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    isRequired: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Add Service</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              min="0"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isRequired"
              checked={formData.isRequired}
              onChange={(e) => setFormData(prev => ({ ...prev, isRequired: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="isRequired" className="text-sm text-gray-700">Required add-on</label>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Promotional Offer Form Component
function PromotionalOfferForm({ onSubmit, onCancel }: { 
  onSubmit: (promo: Omit<PromotionalOffer, 'id' | 'isActive'>) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercentage: 0,
    validFrom: '',
    validUntil: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Add Promotional Offer</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
            <input
              type="number"
              value={formData.discountPercentage}
              onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              min="0"
              max="100"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
              <input
                type="date"
                value={formData.validFrom}
                onChange={(e) => setFormData(prev => ({ ...prev, validFrom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
