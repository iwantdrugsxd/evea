// src/app/(vendor)/cards/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Copy,
  BarChart3,
  Star,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Camera,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react'

interface VendorCard {
  id: string
  title: string
  description: string
  category: string
  basePrice: number
  priceType: string
  serviceArea: string[]
  maxCapacity: number
  images: string[]
  averageRating: number
  totalReviews: number
  totalViews: number
  totalBookings: number
  isActive: boolean
  featured: boolean
  createdAt: string
  lastUpdated: string
  status: 'active' | 'draft' | 'inactive' | 'pending'
}

const mockCards: VendorCard[] = [
  {
    id: '1',
    title: 'Professional Wedding Photography',
    description: 'Capturing your special moments with artistic flair and professional expertise...',
    category: 'Photography',
    basePrice: 45000,
    priceType: 'fixed',
    serviceArea: ['Mumbai', 'Pune', 'Nashik'],
    maxCapacity: 500,
    images: ['/api/placeholder/400/300'],
    averageRating: 4.8,
    totalReviews: 124,
    totalViews: 2340,
    totalBookings: 48,
    isActive: true,
    featured: true,
    createdAt: '2024-01-15',
    lastUpdated: '2024-03-10',
    status: 'active'
  },
  {
    id: '2',
    title: 'Birthday Party Decoration',
    description: 'Creative and colorful decorations for memorable birthday celebrations...',
    category: 'Decoration',
    basePrice: 12000,
    priceType: 'fixed',
    serviceArea: ['Mumbai', 'Thane'],
    maxCapacity: 100,
    images: ['/api/placeholder/400/300'],
    averageRating: 4.6,
    totalReviews: 87,
    totalViews: 1820,
    totalBookings: 32,
    isActive: true,
    featured: false,
    createdAt: '2024-02-20',
    lastUpdated: '2024-03-08',
    status: 'active'
  },
  {
    id: '3',
    title: 'Corporate Event Catering',
    description: 'Premium catering services for corporate events and business gatherings...',
    category: 'Catering',
    basePrice: 25000,
    priceType: 'per_person',
    serviceArea: ['Mumbai', 'Navi Mumbai'],
    maxCapacity: 200,
    images: ['/api/placeholder/400/300'],
    averageRating: 4.9,
    totalReviews: 56,
    totalViews: 1240,
    totalBookings: 18,
    isActive: false,
    featured: false,
    createdAt: '2024-03-01',
    lastUpdated: '2024-03-01',
    status: 'draft'
  }
]

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-blue-100 text-blue-800'
}

export default function VendorCardsPage() {
  const [cards, setCards] = useState<VendorCard[]>(mockCards)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCards, setSelectedCards] = useState<string[]>([])

  const categories = ['Photography', 'Decoration', 'Catering', 'Music', 'Venue', 'Planning']
  const statuses = ['active', 'draft', 'inactive', 'pending']

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || card.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleCardAction = (action: string, cardId: string) => {
    switch (action) {
      case 'edit':
        // Navigate to edit page
        break
      case 'duplicate':
        // Duplicate card logic
        break
      case 'delete':
        setCards(cards.filter(card => card.id !== cardId))
        break
      case 'toggle-status':
        setCards(cards.map(card => 
          card.id === cardId 
            ? { ...card, isActive: !card.isActive, status: card.isActive ? 'inactive' : 'active' }
            : card
        ))
        break
    }
  }

  const CardActionDropdown = ({ card }: { card: VendorCard }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <Link
                href={`/vendor/cards/${card.id}`}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
              <Link
                href={`/vendor/cards/${card.id}/edit`}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Card
              </Link>
              <button
                onClick={() => handleCardAction('duplicate', card.id)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </button>
              <Link
                href={`/vendor/analytics?card=${card.id}`}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
              <hr className="my-2" />
              <button
                onClick={() => handleCardAction('toggle-status', card.id)}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                {card.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleCardAction('delete', card.id)}
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Card
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const StatsOverview = () => {
    const totalCards = cards.length
    const activeCards = cards.filter(card => card.isActive).length
    const totalViews = cards.reduce((sum, card) => sum + card.totalViews, 0)
    const totalBookings = cards.reduce((sum, card) => sum + card.totalBookings, 0)
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Cards</p>
              <p className="text-2xl font-bold text-gray-900">{totalCards}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Cards</p>
              <p className="text-2xl font-bold text-gray-900">{activeCards}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Cards</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings and portfolio</p>
        </div>
        <Link
          href="/vendor/cards/create"
          className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Card
        </Link>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            
            {showFilters && (
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Image */}
            <div className="relative h-48 bg-gray-200">
              {card.images.length > 0 ? (
                <img
                  src={card.images[0]}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[card.status]}`}>
                  {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                </span>
              </div>
              
              {/* Featured Badge */}
              {card.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
              
              {/* Actions */}
              <div className="absolute bottom-4 right-4">
                <CardActionDropdown card={card} />
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600">{card.category}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {card.description}
              </p>
              
              {/* Card Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(card.basePrice)}</p>
                  <p className="text-xs text-gray-500">Base Price</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{card.averageRating}</span>
                    <span className="text-gray-500">({card.totalReviews})</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{card.serviceArea.length} areas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Up to {card.maxCapacity}</span>
                </div>
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <p className="font-semibold text-gray-900">{card.totalViews}</p>
                  <p className="text-gray-500">Views</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{card.totalBookings}</p>
                  <p className="text-gray-500">Bookings</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <Link
                  href={`/vendor/cards/${card.id}/edit`}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  Edit
                </Link>
                <Link
                  href={`/vendor/analytics?card=${card.id}`}
                  className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors text-center"
                >
                  Analytics
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No service cards found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first service card'}
          </p>
          {!searchTerm && (
            <Link
              href="/vendor/cards/create"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Card
            </Link>
          )}
        </div>
      )}
    </div>
  )
}