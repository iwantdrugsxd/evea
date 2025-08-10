'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Award,
  Verified,
  Heart,
  Share2,
  Calendar,
  Users,
  Camera,
  Video,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Shield,
  CheckCircle,
  X,
  Play,
  Clock3,
  PhoneCall,
  Mail as MailIcon,
  Globe as GlobeIcon,
  CalendarDays,
  UserCheck,
  BadgeCheck,
  Star as StarIcon,
  ThumbsUp,
  MessageSquare,
  Eye,
  TrendingUp,
  DollarSign,
  Package,
  Zap,
  Shield as ShieldIcon,
  Clock as ClockIcon,
  Navigation,
  Phone as PhoneIcon
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

export default function VendorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [vendorData, setVendorData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [reviewsPage, setReviewsPage] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const vendorId = params.id as string

  useEffect(() => {
    fetchVendorData()
  }, [vendorId])

  const fetchVendorData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/vendor/${vendorId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch vendor data')
      }
      const data = await response.json()
      setVendorData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
    setShowImageModal(true)
  }

  const nextImage = () => {
    if (vendorData?.portfolio && vendorData.portfolio.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === vendorData.portfolio.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (vendorData?.portfolio && vendorData.portfolio.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? vendorData.portfolio.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !vendorData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container-custom text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendor Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The vendor you are looking for does not exist.'}</p>
            <Button onClick={() => router.push('/marketplace')} variant="primary">
              Back to Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const { vendor, services, cards, portfolio, business_hours, verification_documents, reviews, similar_vendors } = vendorData

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 pt-20 lg:pt-24">
        <div className="container-custom">
          <div className="flex items-center space-x-2 text-sm text-gray-600 py-4">
            <button 
              onClick={() => router.push('/marketplace')}
              className="hover:text-primary-600 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Marketplace</span>
            </button>
            <span>/</span>
            <span className="text-gray-900 font-medium">{vendor.business_name}</span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container-custom py-8">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Photo Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-lg">
                {portfolio && portfolio.length > 0 ? (
                  <img
                    src={portfolio[selectedImageIndex]?.image_url || '/placeholder-image.jpg'}
                    alt={portfolio[selectedImageIndex]?.title || 'Vendor Image'}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(selectedImageIndex)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <Camera className="h-16 w-16 text-primary-400" />
                  </div>
                )}
                
                {/* Image Navigation */}
                {portfolio && portfolio.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {portfolio && portfolio.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {portfolio.slice(0, 5).map((item: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImageIndex 
                          ? 'border-primary-500 ring-2 ring-primary-200' 
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  {portfolio.length > 5 && (
                    <div className="aspect-square rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-sm text-gray-600 font-medium">
                      +{portfolio.length - 5}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading">
                      {vendor.business_name}
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                      {vendor.business_type} • {vendor.industry}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full transition-all ${
                      isLiked 
                        ? 'bg-red-100 text-red-500' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(vendor.average_rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {vendor.average_rating?.toFixed(1) || '0.0'}
                    </span>
                    <span className="text-gray-600">
                      ({vendor.total_reviews || 0} reviews)
                    </span>
                  </div>
                  <Badge variant="success" className="flex items-center space-x-1">
                    <Verified className="h-4 w-4" />
                    <span>Verified</span>
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-primary-600">
                    {vendor.total_orders || 0}
                  </div>
                  <div className="text-sm text-gray-600">Orders</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-primary-600">
                    {vendor.total_revenue ? `₹${(vendor.total_revenue / 100000).toFixed(1)}L` : '0'}
                  </div>
                  <div className="text-sm text-gray-600">Revenue</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-2xl font-bold text-primary-600">
                    {vendor.portfolio_quality_score || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Quality Score</div>
                </div>
              </div>

              {/* Location & Service Area */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{vendor.city}, {vendor.state}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Navigation className="h-5 w-5" />
                  <span>Serves within {vendor.service_area_radius || 50}km radius</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" size="lg" className="flex-1">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Book Service
                </Button>
                <Button variant="secondary" size="lg" className="flex-1">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Contact Vendor
                </Button>
              </div>

              {/* Share Button */}
              <div className="flex items-center justify-center">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Vendor
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                    <span>About {vendor.business_name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    {vendor.business_description || 'No description available.'}
                  </p>
                  
                  {/* Business Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {vendor.founded_year && (
                      <div className="flex items-center space-x-3">
                        <CalendarDays className="h-5 w-5 text-primary-600" />
                        <div>
                          <div className="font-medium text-gray-900">Founded</div>
                          <div className="text-gray-600">{vendor.founded_year}</div>
                        </div>
                      </div>
                    )}
                    {vendor.employee_count && (
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-primary-600" />
                        <div>
                          <div className="font-medium text-gray-900">Team Size</div>
                          <div className="text-gray-600">{vendor.employee_count} people</div>
                        </div>
                      </div>
                    )}
                    {vendor.website_url && (
                      <div className="flex items-center space-x-3">
                        <GlobeIcon className="h-5 w-5 text-primary-600" />
                        <div>
                          <div className="font-medium text-gray-900">Website</div>
                          <a 
                            href={vendor.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Services Section */}
              {services && services.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5 text-primary-600" />
                      <span>Services Offered</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {service.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="primary">
                              {service.categories?.name || 'General'}
                            </Badge>
                            {service.base_price && (
                              <span className="font-semibold text-primary-600">
                                {formatCurrency(service.base_price)}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Portfolio Section */}
              {portfolio && portfolio.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5 text-primary-600" />
                      <span>Portfolio & Work</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {portfolio.map((item: any, index: number) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => handleImageClick(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <StarIcon className="h-5 w-5 text-primary-600" />
                    <span>Customer Reviews</span>
                    <span className="text-lg font-normal text-gray-600">
                      ({vendor.total_reviews || 0})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.data && reviews.data.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.data.map((review: any, index: number) => (
                        <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-semibold">
                                {review.users?.first_name?.[0] || 'U'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold text-gray-900">
                                  {review.users?.first_name} {review.users?.last_name}
                                </span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{review.comment}</p>
                              <div className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <StarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p>No reviews yet. Be the first to review this vendor!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Business Hours */}
              {business_hours && business_hours.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary-600" />
                      <span>Business Hours</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {business_hours.map((hour: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-700 font-medium">
                            {hour.day_of_week}
                          </span>
                          <span className="text-gray-600">
                            {hour.open_time} - {hour.close_time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Certifications & Awards */}
              {verification_documents && verification_documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary-600" />
                      <span>Certifications</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {verification_documents.map((doc: any, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <BadgeCheck className="h-5 w-5 text-green-600" />
                          <span className="text-sm text-gray-700">{doc.document_type}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Response Time Guarantee */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary-600" />
                    <span>Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      &lt; 2 hours
                    </div>
                    <p className="text-sm text-gray-600">
                      Average response time for inquiries
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-primary-600" />
                    <span>Contact Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vendor.contact_person_name && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <UserCheck className="h-4 w-4 text-primary-600" />
                      <span>{vendor.contact_person_name}</span>
                    </div>
                  )}
                  {vendor.contact_person_phone && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="h-4 w-4 text-primary-600" />
                      <span>{vendor.contact_person_phone}</span>
                    </div>
                  )}
                  {vendor.contact_person_email && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MailIcon className="h-4 w-4 text-primary-600" />
                      <span>{vendor.contact_person_email}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Vendors Section */}
          {similar_vendors && similar_vendors.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 font-heading">
                  Similar Vendors
                </h2>
                <Button variant="ghost" onClick={() => router.push('/marketplace')}>
                  View All
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar_vendors.slice(0, 3).map((similarVendor: any, index: number) => (
                  <motion.div
                    key={similarVendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all cursor-pointer"
                          onClick={() => router.push(`/vendor/${similarVendor.id}`)}>
                      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                        {similarVendor.business_logo_url ? (
                          <img
                            src={similarVendor.business_logo_url}
                            alt={similarVendor.business_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                            <Camera className="h-12 w-12 text-primary-400" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {similarVendor.business_name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{similarVendor.average_rating?.toFixed(1) || '0.0'}</span>
                            <span className="text-gray-600">({similarVendor.total_reviews || 0})</span>
                          </div>
                          <span className="text-gray-600">{similarVendor.city}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <X className="h-6 w-6 text-white" />
              </button>
              
              {portfolio && portfolio[selectedImageIndex] && (
                <>
                  <img
                    src={portfolio[selectedImageIndex].image_url}
                    alt={portfolio[selectedImageIndex].title}
                    className="w-full h-full object-contain max-h-[90vh]"
                  />
                  
                  {portfolio.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        <ChevronLeft className="h-6 w-6 text-white" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                      >
                        <ChevronRight className="h-6 w-6 text-white" />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                    <p className="text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                      {selectedImageIndex + 1} of {portfolio.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
