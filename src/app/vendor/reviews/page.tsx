// src/app/(vendor)/reviews/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  Filter,
  Search,
  Reply,
  ThumbsUp,
  MessageSquare,
  Calendar,
  User,
  TrendingUp,
  TrendingDown,
  Award,
  AlertTriangle,
  MoreVertical,
  Eye,
  Flag,
  Download
} from 'lucide-react'

interface Review {
  id: string
  customerId: string
  customerName: string
  customerAvatar?: string
  orderId: string
  orderNumber: string
  serviceName: string
  rating: number
  title: string
  comment: string
  images?: string[]
  date: string
  helpfulCount: number
  verified: boolean
  response?: {
    content: string
    date: string
  }
  tags: string[]
  status: 'published' | 'pending' | 'flagged'
}

const mockReviews: Review[] = [
  {
    id: '1',
    customerId: 'c1',
    customerName: 'Priya Sharma',
    orderId: 'o1',
    orderNumber: 'EVA-2024-001',
    serviceName: 'Professional Wedding Photography',
    rating: 5,
    title: 'Absolutely Amazing Wedding Photography!',
    comment: 'I cannot express how thrilled we are with the wedding photography service! The photographer was incredibly professional, creative, and captured every precious moment beautifully. The drone shots were stunning and the traditional ceremony coverage was perfect. Highly recommend!',
    images: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
    date: '2024-11-08T10:30:00Z',
    helpfulCount: 12,
    verified: true,
    response: {
      content: 'Thank you so much for the wonderful review, Priya! It was an absolute pleasure capturing your special day. We\'re thrilled that you loved the drone shots and traditional coverage. Wishing you both a lifetime of happiness!',
      date: '2024-11-08T15:20:00Z'
    },
    tags: ['professional', 'creative', 'drone-shots', 'traditional'],
    status: 'published'
  },
  {
    id: '2',
    customerId: 'c2',
    customerName: 'Raj Patel',
    orderId: 'o2',
    orderNumber: 'EVA-2024-002',
    serviceName: 'Birthday Party Decoration',
    rating: 4,
    title: 'Great Superhero Theme Decoration',
    comment: 'The decoration team did an excellent job with the superhero theme for my son\'s birthday. The setup was colorful and engaging, and all the kids loved it. Only minor issue was that setup took a bit longer than expected, but the end result was worth it.',
    date: '2024-11-05T16:45:00Z',
    helpfulCount: 7,
    verified: true,
    tags: ['superhero-theme', 'colorful', 'kids-party'],
    status: 'published'
  },
  {
    id: '3',
    customerId: 'c3',
    customerName: 'Anita Verma',
    orderId: 'o3',
    orderNumber: 'EVA-2024-003',
    serviceName: 'Corporate Event Catering',
    rating: 5,
    title: 'Outstanding Corporate Catering Service',
    comment: 'Exceptional catering service for our corporate event! The food quality was outstanding, presentation was elegant, and the team was very professional. Everything was set up perfectly on time. Our guests were highly impressed with the vegetarian menu options.',
    date: '2024-10-28T14:20:00Z',
    helpfulCount: 15,
    verified: true,
    response: {
      content: 'Thank you for the fantastic review, Anita! We\'re delighted that your guests enjoyed our vegetarian menu and that everything met your expectations. We look forward to serving your future corporate events!',
      date: '2024-10-28T18:30:00Z'
    },
    tags: ['corporate', 'vegetarian', 'professional', 'punctual'],
    status: 'published'
  },
  {
    id: '4',
    customerId: 'c4',
    customerName: 'Sanjay Kumar',
    orderId: 'o4',
    orderNumber: 'EVA-2024-004',
    serviceName: 'Anniversary Photography',
    rating: 2,
    title: 'Disappointing Experience',
    comment: 'The photographer arrived late and seemed unprepared. Some of the shots were blurry and the editing quality was not up to the mark. Expected much better service for the price paid.',
    date: '2024-10-15T11:30:00Z',
    helpfulCount: 3,
    verified: true,
    tags: ['late-arrival', 'poor-quality', 'expensive'],
    status: 'published'
  }
]

export default function VendorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [responseText, setResponseText] = useState('')
  const [respondingTo, setRespondingTo] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    }
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleResponse = (reviewId: string) => {
    if (!responseText.trim()) return

    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? {
              ...review,
              response: {
                content: responseText,
                date: new Date().toISOString()
              }
            }
          : review
      )
    )

    setResponseText('')
    setRespondingTo(null)
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = selectedRating === 'all' || review.rating === parseInt(selectedRating)
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus
    
    return matchesSearch && matchesRating && matchesStatus
  })

  const sortedReviews = filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'highest':
        return b.rating - a.rating
      case 'lowest':
        return a.rating - b.rating
      case 'helpful':
        return b.helpfulCount - a.helpfulCount
      default:
        return 0
    }
  })

  const ReviewsStats = () => {
    const totalReviews = reviews.length
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    const responseRate = reviews.filter(r => r.response).length / totalReviews * 100
    const recentReviews = reviews.filter(r => 
      new Date(r.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
    }))

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <div className="flex items-center mt-2">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-sm text-gray-600">({totalReviews} reviews)</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{responseRate.toFixed(0)}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{recentReviews}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.reduce((sum, r) => sum + r.helpfulCount, 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const RatingDistribution = () => {
    const totalReviews = reviews.length
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: totalReviews ? (reviews.filter(r => r.rating === rating).length / totalReviews) * 100 : 0
    }))

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 w-12">
                <span className="text-sm font-medium">{rating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer feedback</p>
        </div>
        <button className="mt-4 md:mt-0 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-all flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export Reviews
        </button>
      </div>

      {/* Stats */}
      <ReviewsStats />

      {/* Rating Distribution */}
      <RatingDistribution />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="mt-[100px] flex flex-col md:flex-row md:items-center md:justify-start md:gap-4 space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
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
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map(review => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900">{review.customerName}</h3>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{review.serviceName}</span>
                    <span>•</span>
                    <span>Order: {review.orderNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Rating and Title */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(review.rating)}
                <span className="text-sm font-medium text-gray-700">
                  {review.rating}/5
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-900">{review.title}</h4>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              
              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex space-x-2 mt-3">
                  {review.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              )}

              {/* Tags */}
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {review.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Review Response */}
            {review.response && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">V</span>
                  </div>
                  <span className="font-medium text-purple-900">Your Response</span>
                  <span className="text-sm text-purple-600">{formatDate(review.response.date)}</span>
                </div>
                <p className="text-purple-800">{review.response.content}</p>
              </div>
            )}

            {/* Response Form */}
            {respondingTo === review.id && (
              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Write your response..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex justify-end space-x-3 mt-3">
                  <button
                    onClick={() => setRespondingTo(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleResponse(review.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Post Response
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpfulCount} found this helpful</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {!review.response && (
                  <button
                    onClick={() => setRespondingTo(review.id)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Respond
                  </button>
                )}
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedReviews.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria' : 'Reviews from customers will appear here'}
          </p>
        </div>
      )}
    </div>
  )
}