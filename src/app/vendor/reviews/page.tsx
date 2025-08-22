'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Clock,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  Heart,
  Smile,
  Meh,
  Frown
} from 'lucide-react'
import Button from '@/components/ui/button'

interface Review {
  id: string
  customerName: string
  customerEmail: string
  serviceTitle: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  notHelpful: number
  status: 'published' | 'pending' | 'reported'
  orderId: string
  eventDate: string
  eventType: string
  response?: string
  responseDate?: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [ratingFilter, setRatingFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews([
        {
          id: '1',
          customerName: 'Priya Sharma',
          customerEmail: 'priya.sharma@email.com',
          serviceTitle: 'Wedding Photography Package',
          rating: 5,
          title: 'Exceptional Wedding Photography!',
          comment: 'Amazing work! The photographer captured every special moment of our wedding beautifully. The photos are stunning and we couldn\'t be happier. Highly recommended for any special occasion.',
          date: '2024-12-15',
          helpful: 12,
          notHelpful: 0,
          status: 'published',
          orderId: 'ORD-2024-001',
          eventDate: '2024-12-10',
          eventType: 'Wedding',
          response: 'Thank you Priya for your wonderful review! We\'re so glad we could capture your special day perfectly. Wishing you a lifetime of happiness!',
          responseDate: '2024-12-16'
        },
        {
          id: '2',
          customerName: 'Rajesh Kumar',
          customerEmail: 'rajesh.kumar@email.com',
          serviceTitle: 'Corporate Event Catering',
          rating: 4,
          title: 'Great catering service',
          comment: 'The food was delicious and the service was professional. Everything was delivered on time and the staff was very courteous. Would definitely recommend for corporate events.',
          date: '2024-12-12',
          helpful: 8,
          notHelpful: 1,
          status: 'published',
          orderId: 'ORD-2024-002',
          eventDate: '2024-12-08',
          eventType: 'Corporate'
        },
        {
          id: '3',
          customerName: 'Anita Patel',
          customerEmail: 'anita.patel@email.com',
          serviceTitle: 'Birthday Party Decoration',
          rating: 5,
          title: 'Perfect birthday decoration!',
          comment: 'The decoration was absolutely perfect for my daughter\'s 10th birthday! The pink and gold theme was executed beautifully. All the guests were impressed. Thank you!',
          date: '2024-12-10',
          helpful: 15,
          notHelpful: 0,
          status: 'published',
          orderId: 'ORD-2024-003',
          eventDate: '2024-12-05',
          eventType: 'Birthday',
          response: 'Thank you Anita! We\'re thrilled that your daughter had a wonderful birthday celebration. It was our pleasure to make her day special!',
          responseDate: '2024-12-11'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-400'
    if (rating >= 4) return 'text-yellow-400'
    if (rating >= 3) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRatingIcon = (rating: number) => {
    if (rating >= 4.5) return Smile
    if (rating >= 4) return Smile
    if (rating >= 3) return Meh
    return Frown
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'reported': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter)
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter
    return matchesSearch && matchesRating && matchesStatus
  })

  const stats = [
    { 
      title: 'Total Reviews', 
      value: reviews.length, 
      icon: MessageSquare, 
      color: 'bg-blue-500', 
      change: 12.5, 
      trend: 'up'
    },
    { 
      title: 'Average Rating', 
      value: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length, 
      icon: Star, 
      color: 'bg-yellow-500', 
      change: 2.1, 
      trend: 'up',
      format: 'rating'
    },
    { 
      title: '5-Star Reviews', 
      value: reviews.filter(r => r.rating === 5).length, 
      icon: Award, 
      color: 'bg-green-500', 
      change: 8.7, 
      trend: 'up'
    },
    { 
      title: 'Response Rate', 
      value: (reviews.filter(r => r.response).length / reviews.length * 100), 
      icon: Reply, 
      color: 'bg-purple-500', 
      change: 5.3, 
      trend: 'up',
      format: 'percentage'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="p-6">
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
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
                  Customer Reviews
                </motion.h1>
                <p className="text-white/60 mt-1">Manage and respond to customer feedback</p>
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
                          ? `${stat.value.toFixed(1)} ★`
                          : stat.format === 'percentage'
                          ? `${stat.value.toFixed(1)}%`
                          : stat.value.toLocaleString()
                        }
                      </p>
                      <p className="text-sm text-white/60">{stat.title}</p>
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
                  placeholder="Search reviews by customer name, service, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
                <option value="reported">Reported</option>
              </select>
            </div>
          </motion.div>

          {/* Reviews List */}
          <div className="space-y-6">
            {filteredReviews.map((review, index) => {
              const RatingIcon = getRatingIcon(review.rating)
              return (
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
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{review.customerName}</h3>
                          <p className="text-white/60 text-sm">{review.customerEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-current text-yellow-400' : 'text-white/20'}`}
                            />
                          ))}
                        </div>
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
                        <RatingIcon className="h-4 w-4 text-white/60" />
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
              )
            })}
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
      </div>
    </div>
  )
}