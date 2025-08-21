'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  X, 
  ArrowLeft, 
  Heart,
  MessageCircle,
  Calendar,
  Award,
  Shield,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Package,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import FloatingNavbar from '@/components/layout/FloatingNavbar';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  category_id: string;
  base_price: number;
  starting_price: number;
  price_type: string;
  service_area: string[];
  max_capacity: number;
  inclusions: string[];
  exclusions: string[];
  equipment_provided: string[];
  cancellation_policy: string;
  images: string[];
  videos: string[];
  portfolio_images: string[];
  tags: string[];
  discount_percentage: number;
  years_of_experience: number;
  insurance_coverage: string;
  certifications: string;
  emergency_contact: string;
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  created_at: string;
  vendor: {
    id: string;
    business_name: string;
    city: string;
    state: string;
    description: string;
    average_rating: number;
    total_reviews: number;
    years_in_business: string;
    business_website: string;
    instagram_handle: string;
    facebook_page: string;
  };
  category: {
    name: string;
    slug: string;
  };
  reviews: Array<{
    id: string;
    rating: number;
    title: string;
    comment: string;
    customer_name: string;
    created_at: string;
  }>;
}

export default function ServiceDetailsPage() {
  const params = useParams();
  const [service, setService] = useState<ServiceCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ServiceCard[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchServiceDetails();
      fetchRecommendations();
    }
  }, [params.id]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/vendor-cards/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch service details');
      }
      
      const data = await response.json();
      setService(data.service);
    } catch (error) {
      console.error('Error fetching service details:', error);
      setError('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`/api/vendor-cards/recommendations?service_id=${params.id}&limit=4`);
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement add to favorites API call
  };

  const handleContactVendor = () => {
    // TODO: Implement contact vendor functionality
    console.log('Contact vendor clicked');
  };

  const handleBookNow = () => {
    // TODO: Implement booking functionality
    console.log('Book now clicked');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <FloatingNavbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-4"></div>
            <div className="h-96 bg-white/10 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-white/10 rounded"></div>
                <div className="h-20 bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-black text-white">
        <FloatingNavbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-white/60 mb-8">{error || 'The service you are looking for does not exist.'}</p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = service.discount_percentage > 0 
    ? service.base_price * (1 - service.discount_percentage / 100)
    : service.base_price;

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-white/60">
          <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
          <span>/</span>
          <Link href={`/marketplace/${service.category.slug}`} className="hover:text-white">
            {service.category.name}
          </Link>
          <span>/</span>
          <span className="text-white">{service.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              <div className="flex items-center gap-6 text-white/60 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{service.service_area[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{service.average_rating.toFixed(1)} ({service.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{service.total_orders} orders completed</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToFavorites}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorite 
                    ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleContactVendor}
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden">
                {service.images[0] && (
                  <Image
                    src={service.images[0]}
                    alt={service.title}
                    fill
                    className="object-cover cursor-pointer"
                    onClick={() => setSelectedImage(service.images[0])}
                  />
                )}
              </div>
              {service.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {service.images.slice(1, 5).map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video bg-white/5 rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`${service.title} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">About This Service</h2>
              <p className="text-white/80 leading-relaxed">{service.description}</p>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.inclusions.length > 0 && (
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {service.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.exclusions.length > 0 && (
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-400" />
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {service.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Portfolio Images */}
            {service.portfolio_images.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-6">Portfolio</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {service.portfolio_images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square bg-white/5 rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {service.reviews.length > 0 && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-semibold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {service.reviews.map((review) => (
                    <div key={review.id} className="border-b border-white/10 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.customer_name}</span>
                        </div>
                        <span className="text-white/60 text-sm">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && (
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                      )}
                      <p className="text-white/80">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sticky top-24">
              <div className="mb-6">
                {service.discount_percentage > 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">₹{discountedPrice.toLocaleString()}</span>
                    <span className="text-lg text-white/60 line-through">₹{service.base_price.toLocaleString()}</span>
                    <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm font-medium">
                      {service.discount_percentage}% OFF
                    </span>
                  </div>
                )}
                {service.discount_percentage === 0 && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">₹{service.base_price.toLocaleString()}</span>
                    {service.starting_price && service.starting_price !== service.base_price && (
                      <span className="text-lg text-white/60">starting from</span>
                    )}
                  </div>
                )}
                <p className="text-white/60 capitalize">{service.price_type.replace('_', ' ')}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Book Now
                </button>
                <button
                  onClick={handleContactVendor}
                  className="w-full bg-white/10 border border-white/20 text-white py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Contact Vendor
                </button>
              </div>

              {/* Service Details */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Experience</span>
                  <span className="font-medium">{service.years_of_experience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Max Capacity</span>
                  <span className="font-medium">{service.max_capacity} people</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Service Areas</span>
                  <span className="font-medium">{service.service_area.length} areas</span>
                </div>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold mb-4">About {service.vendor.business_name}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{service.vendor.average_rating.toFixed(1)} ({service.vendor.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>{service.vendor.years_in_business} years in business</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>{service.vendor.city}, {service.vendor.state}</span>
                </div>
                {service.vendor.business_website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <a href={service.vendor.business_website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-4">
                {service.vendor.instagram_handle && (
                  <a
                    href={`https://instagram.com/${service.vendor.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {service.vendor.facebook_page && (
                  <a
                    href={service.vendor.facebook_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Cancellation Policy */}
            {service.cancellation_policy && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-semibold mb-4">Cancellation Policy</h3>
                <p className="text-white/80 text-sm">{service.cancellation_policy}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Similar Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map((rec) => (
                <Link
                  key={rec.id}
                  href={`/marketplace/service/${rec.id}`}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="relative aspect-video">
                    {rec.images[0] && (
                      <Image
                        src={rec.images[0]}
                        alt={rec.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{rec.title}</h3>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>₹{rec.base_price.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{rec.average_rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={selectedImage}
              alt="Full size"
              width={800}
              height={600}
              className="object-contain max-h-[90vh]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
