// src/components/common/vendor-card.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Star, 
  Heart, 
  MapPin, 
  Users, 
  Calendar,
  ArrowRight,
  Award,
  Shield,
  Clock,
  Camera,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import { VendorCard as VendorCardType } from '@/lib'
import { formatPrice, cn } from '@/lib/utils'

interface VendorCardProps {
  vendor: VendorCardType & {
    vendor?: {
      businessName: string
      city: string
      state: string
      rating: number
      totalReviews: number
    }
  }
  className?: string
  featured?: boolean
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, className, featured = false }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn('group', className)}
    >
      <Card className="overflow-hidden h-full hover:shadow-red-soft border-2 hover:border-primary-200 transition-all duration-300">
        {/* Vendor Image */}
        <div className="relative aspect-video bg-gradient-red overflow-hidden">
          {vendor.images && vendor.images.length > 0 ? (
            <>
              <img
                src={vendor.images[0]}
                alt={vendor.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-red flex items-center justify-center">
                  <Camera className="h-12 w-12 text-primary-600/60" />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-red flex items-center justify-center">
              <Camera className="h-12 w-12 text-primary-600/60" />
            </div>
          )}

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {vendor.featured && (
              <Badge variant="warning" className="flex items-center space-x-1 shadow-sm">
                <Award className="h-3 w-3" />
                <span>Featured</span>
              </Badge>
            )}
            {featured && (
              <Badge variant="primary" className="flex items-center space-x-1 shadow-sm">
                <Shield className="h-3 w-3" />
                <span>Verified</span>
              </Badge>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-sm"
          >
            <Heart className={`h-5 w-5 transition-colors ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} />
          </button>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900">{vendor.averageRating}</span>
                  <span className="text-gray-600">({vendor.totalReviews})</span>
                </div>
                <div className="text-primary-600 font-bold">
                  {formatPrice(vendor.basePrice)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Vendor Header */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-primary-600 transition-colors line-clamp-1">
                {vendor.title}
              </h3>
              <p className="text-gray-600 font-medium">{vendor.vendor?.businessName}</p>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {vendor.description}
            </p>

            {/* Location & Capacity */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{vendor.vendor?.city}, {vendor.vendor?.state}</span>
              </div>
              {vendor.maxCapacity && (
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Up to {vendor.maxCapacity}</span>
                </div>
              )}
            </div>

            {/* Service Inclusions */}
            {vendor.inclusions && vendor.inclusions.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Includes:</div>
                <div className="flex flex-wrap gap-1">
                  {vendor.inclusions.slice(0, 3).map((inclusion: string, idx: number) => (
                    <Badge key={idx} variant="gray" className="text-xs">
                      {inclusion}
                    </Badge>
                  ))}
                  {vendor.inclusions.length > 3 && (
                    <Badge variant="gray" className="text-xs">
                      +{vendor.inclusions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Service Area */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Serves: {vendor.serviceArea.join(', ')}</span>
            </div>

            {/* CTA Button */}
            <Link href={`/vendor/${vendor.id}`} className="block">
              <Button variant="primary" className="w-full group">
                View Details & Book
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default VendorCard