'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Star,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Calendar,
  Award,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  CheckCircle,
  Users
} from 'lucide-react'
import Button from '@/components/ui/button'

interface Review {
  id: string
  customerName: string
  customerEmail: string
  title: string
  comment: string
  rating: number
  date: string
  serviceTitle: string
  orderId: string
  helpful: number
  notHelpful: number
  response?: string
  responseDate?: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews([
        {
          id: '1',
          customerName: 'Priya Sharma',
          customerEmail: 'priya.sharma@email.com',
          title: 'Excellent Wedding Photography Service',
          comment: 'Amazing photography service for our wedding! The photographer was professional, creative, and captured all the special moments perfectly. The photos turned out beautiful and we couldn\'t be happier.',
          rating: 5,
          date: '2024-12-15',
          serviceTitle: 'Wedding Photography Package',
          orderId: 'ORD-2024-001',
          helpful: 12,
          notHelpful: 0,
          response: 'Thank you Priya! We\'re so glad we could capture your special day perfectly. It was a pleasure working with you and your family.',
          responseDate: '2024-12-16'
        },
        {
          id: '2',
          customerName: 'Rajesh Kumar',
          customerEmail: 'rajesh.kumar@email.com',
          title: 'Great Corporate Catering',
          comment: 'Professional catering service for our corporate event. The food was delicious, presentation was excellent, and the team was very punctual and courteous.',
          rating: 4,
          date: '2024-12-14',
          serviceTitle: 'Corporate Event Catering',
          orderId: 'ORD-2024-002',
          helpful: 8,
          notHelpful: 1
        },
        {
          id: '3',
          customerName: 'Anita Patel',
          customerEmail: 'anita.patel@email.com',
          title: 'Beautiful Birthday Decoration',
          comment: 'The decoration for my daughter\'s birthday was absolutely perfect! The pink and gold theme was executed beautifully. All guests were impressed.',
          rating: 5,
          date: '2024-12-13',
          serviceTitle: 'Birthday Party Decoration',
          orderId: 'ORD-2024-003',
          helpful: 15,
          notHelpful: 0,
          response: 'Thank you Anita! We\'re thrilled that your daughter had a wonderful birthday celebration. It was our pleasure to make her day special!',
          responseDate: '2024-12-14'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter)
    return matchesSearch && matchesRating
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'rating':
        return b.rating - a.rating
      case 'helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400'
    if (rating >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-current text-yellow-400' : 'text-white/20'}`}
      />
    ))
  }

  const stats = [
    { 
      title: 'Total Reviews', 
      value: reviews.length, 
      icon: MessageSquare, 
      color: 'bg-blue-500', 
      change: 12.5, 
      trend: 'up' as const
    },
    { 
      title: 'Average Rating', 
      value: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1), 
      icon: Star, 
      color: 'bg-yellow-500', 
      change: 8.7, 
      trend: 'up' as const,
      format: 'rating'
    },
    { 
      title: '5-Star Reviews', 
      value: reviews.filter(r => r.rating === 5).length, 
      icon: TrendingUp, 
      color: 'bg-green-500', 
      change: 15.3, 
      trend: 'up' as const
    },
    { 
      title: 'Response Rate', 
      value: Math.round((reviews.filter(r => r.response).length / reviews.length) * 100), 
      icon: Users, 
      color: 'bg-purple-500', 
      change: 22.1, 
      trend: 'up' as const,
      format: 'percentage'
    }
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-white/10 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
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
              Reviews
            </motion.h1>
            <p className="text-white/60 mt-1">Manage customer feedback and ratings</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {stat.format === 'rating' 
                      ? `${stat.value} ⭐`
                      : stat.format === 'percentage'
                      ? `${stat.value}%`
                      : stat.value.toLocaleString()
                    }
                  </p>
                  <p className="text-sm text-white/60 mb-2">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
              />
            </div>
            
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="helpful">Sort by Helpful</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>{filteredReviews.length} reviews found</span>
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 hover:border-white/40 transition-all duration-500">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {review.customerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{review.customerName}</h3>
                    <p className="text-white/60 text-sm">{review.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className={`text-sm font-semibold ${getRatingColor(review.rating)}`}>
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-white mb-2">{review.title}</h4>
                <p className="text-white/80 leading-relaxed">{review.comment}</p>
              </div>

              {/* Review Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">Review Date</p>
                    <p className="text-xs text-white/50">{formatDate(review.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">Service</p>
                    <p className="text-xs text-white/50">{review.serviceTitle}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-white/60" />
                  <div>
                    <p className="text-sm font-medium text-white">Rating</p>
                    <p className={`text-xs font-semibold ${getRatingColor(review.rating)}`}>
                      {review.rating}/5 stars
                    </p>
                  </div>
                </div>
              </div>

              {/* Helpful Votes */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful} helpful</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ThumbsDown className="h-4 w-4" />
                    <span>{review.notHelpful} not helpful</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-500/20 hover:bg-blue-500/10"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-500/20 hover:bg-red-500/10"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>

              {/* Vendor Response */}
              {review.response && (
                <div className="bg-white/5 rounded-xl p-4 border-l-4 border-blue-500">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Your Response</span>
                    <span className="text-xs text-white/50">({formatDate(review.responseDate!)})</span>
                  </div>
                  <p className="text-white/80 text-sm">{review.response}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-12 w-12 text-white/40" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No reviews found</h3>
          <p className="text-white/60 mb-6">Reviews will appear here once customers leave feedback</p>
        </motion.div>
      )}
    </div>
  )
}