'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getCategoryImage } from '@/lib/utils/vendor-images'
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Star,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  CreditCard,
  BarChart3,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react'
import Button from '@/components/ui/button'

interface ServiceCard {
  id: string
  title: string
  description: string
  category: string
  base_price?: number
  price_type: string
  service_area: string[]
  max_capacity?: number
  images: string[]
  status: string
  is_published: boolean
  created_at: string
  views?: number
  inquiries?: number
  rating?: number
  total_reviews?: number
}

export default function ServiceCardsPage() {
  const [cards, setCards] = useState<ServiceCard[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/vendor/cards')
      if (response.ok) {
        const data = await response.json()
        setCards(data.cards || [])
      } else {
        console.error('Failed to fetch cards:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (cardId: string) => {
    try {
      const response = await fetch(`/api/vendor/cards/${cardId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setCards(cards.filter(card => card.id !== cardId))
        setShowDeleteModal(null)
      }
    } catch (error) {
      console.error('Error deleting card:', error)
    }
  }

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || card.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'draft': return 'bg-gray-500/20 text-gray-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'pending': return Clock
      case 'draft': return AlertCircle
      case 'rejected': return XCircle
      default: return AlertCircle
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
          <div className="w-full max-w-none">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-white/10 rounded-2xl w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-white/10 rounded-3xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="w-full max-w-none">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.h1 
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.8)",
                      "0 0 40px rgba(59, 130, 246, 1)",
                      "0 0 60px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.8)"
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  Service Cards
                </motion.h1>
                <p className="text-white/60 mt-1">Manage your service offerings and track their performance</p>
              </div>
              <Button 
                onClick={() => router.push('/vendor/cards/create')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Card
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Cards', value: cards.length, icon: CreditCard, color: 'bg-blue-500' },
                { title: 'Active Cards', value: cards.filter(c => c.status === 'active').length, icon: CheckCircle, color: 'bg-green-500' },
                { title: 'Total Views', value: cards.reduce((sum, c) => sum + (c.views || 0), 0), icon: Eye, color: 'bg-purple-500' },
                { title: 'Total Inquiries', value: cards.reduce((sum, c) => sum + (c.inquiries || 0), 0), icon: Target, color: 'bg-orange-500' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search cards by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card, index) => {
              const StatusIcon = getStatusIcon(card.status)
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all duration-500">
                    {/* Card Header */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(card.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{card.status}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                        <p className="text-white/90 text-sm">{card.category}</p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{card.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl font-bold text-white">
                          {formatCurrency(card.base_price || 0)}
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium text-white/70">
                            {(card.rating || 0).toFixed(1)} ({card.total_reviews || 0})
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{card.views || 0}</p>
                          <p className="text-xs text-white/50">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{card.inquiries || 0}</p>
                          <p className="text-xs text-white/50">Inquiries</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{card.max_capacity || 0}</p>
                          <p className="text-xs text-white/50">Capacity</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/vendor/cards/${card.id}`)}
                          className="flex-1 text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/vendor/cards/${card.id}/edit`)}
                          className="flex-1 text-green-400 border-green-500/20 hover:bg-green-500/10"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDeleteModal(card.id)}
                          className="text-red-400 border-red-500/20 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredCards.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-12 w-12 text-white/40" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No service cards found</h3>
              <p className="text-white/60 mb-6">Create your first service card to start attracting customers</p>
              <Button 
                onClick={() => router.push('/vendor/cards/create')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Card
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Delete Service Card</h3>
            <p className="text-white/60 mb-6">Are you sure you want to delete this service card? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 text-white border-white/20 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}