'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Star,
  MapPin,
  Users,
  Clock,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  Heart,
  Share2,
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  Play,
  Camera,
  Package,
  Award,
  Shield,
  Truck,
  Clock as ClockIcon
} from 'lucide-react'

interface ServiceCard {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  base_price: number
  price_type: string
  event_type_pricing: any
  service_area: string[]
  max_capacity: number
  min_booking_time: number
  max_booking_time: number
  advance_booking_days: number
  inclusions: string[]
  exclusions: string[]
  equipment_provided: string[]
  images: string[]
  videos: string[]
  tags: string[]
  cancellation_policy: string
  refund_policy: string
  working_days: string[]
  working_hours: any
  vendor: {
    id: string
    business_name: string
    business_email: string
    business_phone: string
    business_address: string
    business_description: string
    business_logo: string
    rating: number
    total_reviews: number
  }
}

interface Review {
  id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
  service_quality: number
  value_for_money: number
  communication: number
  punctuality: number
}

export default function ServiceCardDetailPage() {
  const params = useParams()
  const [card, setCard] = useState<ServiceCard | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchServiceCard()
      fetchReviews()
    }
  }, [params.id])

  const fetchServiceCard = async () => {
    try {
      const response = await fetch(`/api/vendor/cards/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCard(data.card)
      }
    } catch (error) {
      console.error('Error fetching service card:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      // Mock reviews for now - replace with actual API call
      const mockReviews: Review[] = [
        {
          id: '1',
          user_name: 'Priya Sharma',
          rating: 5,
          comment: 'Excellent service! The photographer captured all our special moments beautifully. Highly recommended!',
          created_at: '2024-03-15',
          service_quality: 5,
          value_for_money: 5,
          communication: 5,
          punctuality: 5
        },
        {
          id: '2',
          user_name: 'Rajesh Kumar',
          rating: 4,
          comment: 'Great work and very professional. The photos came out really well.',
          created_at: '2024-03-10',
          service_quality: 4,
          value_for_money: 4,
          communication: 4,
          punctuality: 5
        }
      ]
      setReviews(mockReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const nextImage = () => {
    if (card?.images) {
      setSelectedImageIndex((prev) => 
        prev === card.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (card?.images) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? card.images.length - 1 : prev - 1
      )
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
        <p className="text-gray-600">The service you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button className="hover:text-gray-700 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        <span>/</span>
        <span>{card.category}</span>
        <span>/</span>
        <span className="text-gray-900">{card.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden bg-gray-200">
                {card.images && card.images.length > 0 ? (
                  <img
                    src={card.images[selectedImageIndex]}
                    alt={card.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setShowImageModal(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Camera className="h-16 w-16" />
                  </div>
                )}
              </div>
              
              {/* Image Navigation */}
              {card.images && card.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  
                  {/* Image Thumbnails */}
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {card.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          index === selectedImageIndex ? 'border-purple-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${card.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {card.service_area.join(', ')}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Up to {card.max_capacity} people
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {card.min_booking_time} hours minimum
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-lg border ${
                    isFavorite 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {getRatingStars(card.vendor.rating)}
                <span className="ml-2 font-medium text-gray-900">{card.vendor.rating}</span>
                <span className="ml-1 text-gray-500">({card.vendor.total_reviews} reviews)</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{card.vendor.business_name}</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">{card.description}</p>

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'pricing', label: 'Pricing & Packages' },
                  { id: 'inclusions', label: 'What\'s Included' },
                  { id: 'reviews', label: 'Reviews' },
                  { id: 'vendor', label: 'About Vendor' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">Advance booking: {card.advance_booking_days} days</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ClockIcon className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">Duration: {card.min_booking_time}-{card.max_booking_time} hours</span>
                      </div>
                    </div>
                  </div>

                  {card.equipment_provided && card.equipment_provided.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Equipment Provided</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {card.equipment_provided.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing Information</h3>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600 mb-2">
                          {formatPrice(card.base_price)}
                        </p>
                        <p className="text-gray-600 capitalize">
                          {card.price_type.replace('_', ' ')} pricing
                        </p>
                      </div>
                    </div>
                  </div>

                  {card.event_type_pricing && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Event Type Pricing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(card.event_type_pricing).map(([eventType, pricing]: [string, any]) => (
                          <div key={eventType} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 capitalize mb-2">{eventType}</h4>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Min: {formatPrice(pricing.min)}</span>
                              <span className="text-gray-600">Max: {formatPrice(pricing.max)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'inclusions' && (
                <div className="space-y-6">
                  {card.inclusions && card.inclusions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-700">What's Included</h3>
                      <div className="space-y-2">
                        {card.inclusions.map((inclusion, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.exclusions && card.exclusions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-700">What's Not Included</h3>
                      <div className="space-y-2">
                        {card.exclusions.map((exclusion, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <X className="h-5 w-5 text-red-500" />
                            <span className="text-gray-700">{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Write a Review
                    </button>
                  </div>

                  {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this service!</p>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.user_name}</h4>
                              <div className="flex items-center space-x-1 mt-1">
                                {getRatingStars(review.rating)}
                                <span className="ml-2 text-sm text-gray-600">{review.rating}/5</span>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Service Quality:</span>
                              <div className="flex items-center mt-1">{getRatingStars(review.service_quality)}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Value for Money:</span>
                              <div className="flex items-center mt-1">{getRatingStars(review.value_for_money)}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Communication:</span>
                              <div className="flex items-center mt-1">{getRatingStars(review.communication)}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">Punctuality:</span>
                              <div className="flex items-center mt-1">{getRatingStars(review.punctuality)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'vendor' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    {card.vendor.business_logo ? (
                      <img
                        src={card.vendor.business_logo}
                        alt={card.vendor.business_name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">
                          {card.vendor.business_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{card.vendor.business_name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {card.vendor.rating} ({card.vendor.total_reviews} reviews)
                        </span>
                        <span>•</span>
                        <span>Verified Vendor</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700">{card.vendor.business_description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{card.vendor.business_address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">{card.vendor.business_phone}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Pricing Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 sticky top-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-purple-600 mb-2">
                {formatPrice(card.base_price)}
              </p>
              <p className="text-gray-600 capitalize">
                {card.price_type.replace('_', ' ')} pricing
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Service Type</span>
                <span className="font-medium">{card.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacity</span>
                <span className="font-medium">Up to {card.max_capacity} people</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Advance Booking</span>
                <span className="font-medium">{card.advance_booking_days} days</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all mb-4">
              Book Now
            </button>
            
            <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors">
              Request Quote
            </button>
          </div>

          {/* Vendor Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Vendor</h3>
            <div className="flex items-center space-x-3 mb-4">
              {card.vendor.business_logo ? (
                <img
                  src={card.vendor.business_logo}
                  alt={card.vendor.business_name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">
                    {card.vendor.business_name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-medium text-gray-900">{card.vendor.business_name}</h4>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{card.vendor.rating} ({card.vendor.total_reviews})</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">Verified Vendor</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-600">Professional Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600">On-site Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && card.images && card.images.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full mx-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <img
              src={card.images[selectedImageIndex]}
              alt={card.title}
              className="max-w-full max-h-full object-contain"
            />
            
            {card.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ArrowLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ArrowRight className="h-8 w-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
