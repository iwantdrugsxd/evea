'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCategoryImage } from '@/lib/utils/vendor-images'
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Calendar,
  Clock,
  CheckCircle,
  Heart,
  Share2,
  MessageCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star as StarIcon
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface VendorDetail {
  id: string
  business_name: string
  business_type: string
  address: string
  city: string
  state: string
  postal_code: string
  description: string
  average_rating: number
  total_reviews: number
  verification_status: string
  business_logo_url?: string
  portfolio_images?: string[]
  services: any[]
  reviews: any[]
  business_hours: any[]
  similar_vendors: any[]
}

export default function VendorDetailPage() {
  const params = useParams()
  const [vendor, setVendor] = useState<VendorDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchVendorDetails()
  }, [params.id])

  const fetchVendorDetails = async () => {
    try {
      const response = await fetch(`/api/vendor/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setVendor(data)
      } else {
        console.error('Failed to fetch vendor details')
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vendor not found</h2>
          <p className="text-gray-600 mb-4">The vendor you're looking for doesn't exist.</p>
          <Link href="/marketplace" className="btn-primary">
            Browse Vendors
          </Link>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/marketplace" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Marketplace</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-lg transition-colors ${
                  isFavorite ? 'bg-red-50 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-elegant overflow-hidden mb-8">
              <div className="relative h-96">
                {vendor.portfolio_images && vendor.portfolio_images.length > 0 ? (
                  <>
                    <img
                      src={vendor.portfolio_images[selectedImage]}
                      alt={vendor.business_name}
                      className="w-full h-full object-cover"
                    />
                    {vendor.portfolio_images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImage(Math.min(vendor.portfolio_images!.length - 1, selectedImage + 1))}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  (() => {
                    const categoryImage = getCategoryImage('default')
                    return (
                      <img
                        src={categoryImage.url}
                        alt={categoryImage.alt}
                        className="w-full h-full object-cover"
                      />
                    )
                  })()
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {vendor.portfolio_images && vendor.portfolio_images.length > 1 && (
                <div className="p-4 border-t border-gray-100">
                  <div className="flex space-x-2 overflow-x-auto">
                    {vendor.portfolio_images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${vendor.business_name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{vendor.business_name}</h1>
                    {vendor.verification_status === 'verified' && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.city}, {vendor.state}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(vendor.average_rating)}
                      <span className="ml-1">({vendor.total_reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {vendor.average_rating.toFixed(1)}/5
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {vendor.description || 'No description available.'}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">contact@{vendor.business_name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">www.{vendor.business_name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{vendor.address}</span>
                </div>
              </div>
            </div>

            {/* Services */}
            {vendor.services && vendor.services.length > 0 && (
              <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Packages</h2>
                <div className="space-y-6">
                  {vendor.services.map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-elegant transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>Up to {service.max_capacity || 'N/A'} guests</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            ${service.price?.toLocaleString() || 'Contact'}
                          </div>
                          <div className="text-sm text-gray-600">Starting price</div>
                        </div>
                      </div>
                      <button className="btn-primary w-full">
                        Get Quote
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {vendor.reviews && vendor.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                  <button className="btn-outline">Write a Review</button>
                </div>
                <div className="space-y-6">
                  {vendor.reviews.slice(0, 5).map((review, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-700">
                              {review.customer?.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.customer?.name || 'Anonymous'}
                            </div>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-600 ml-1">{review.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                {vendor.reviews.length > 5 && (
                  <div className="text-center mt-6">
                    <button className="btn-outline">View All {vendor.total_reviews} Reviews</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-elegant p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="btn-primary w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Vendor
                  </button>
                  <button className="btn-outline w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Check Availability
                  </button>
                  <button className="btn-outline w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              {vendor.business_hours && vendor.business_hours.length > 0 && (
                <div className="bg-white rounded-2xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2">
                    {vendor.business_hours.map((hours, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{hours.day}</span>
                        <span className="text-gray-900">{hours.open_time} - {hours.close_time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Vendors */}
              {vendor.similar_vendors && vendor.similar_vendors.length > 0 && (
                <div className="bg-white rounded-2xl shadow-elegant p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Vendors</h3>
                  <div className="space-y-3">
                    {vendor.similar_vendors.slice(0, 3).map((similar, index) => (
                      <Link
                        key={index}
                        href={`/vendor/${similar.id}`}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🏢</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{similar.business_name}</div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            {renderStars(similar.average_rating)}
                            <span>({similar.total_reviews})</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
