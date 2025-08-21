'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Star, 
  MapPin, 
  Eye, 
  ShoppingCart,
  Award,
  Shield,
  Clock,
  Users
} from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  base_price: number;
  category_id: string;
  vendor_id: string;
  service_images: string[];
  average_rating: number;
  total_reviews: number;
  total_orders: number;
  created_at: string;
  updated_at: string;
  vendor: {
    business_name: string;
    location: string;
  };
  category: {
    name: string;
  };
}

interface EnhancedVendorCardProps {
  card: ServiceCard;
}

export default function EnhancedVendorCard({ card }: EnhancedVendorCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Link href={`/marketplace/service/${card.id}`}>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
      >
      {/* Card Image */}
      <div className="relative h-56 overflow-hidden">
        {card.service_images && card.service_images.length > 0 && !imageError ? (
          <Image
            src={card.service_images[0]}
            alt={card.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
            unoptimized={card.service_images[0].includes('picsum.photos')}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <div className="text-white text-6xl opacity-80">
              🎉
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {card.total_orders > 10 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Popular
            </div>
          )}
          {card.average_rating >= 4.5 && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Top Rated
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleFavorite}
            className={`p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl ${
              isFavorite ? 'text-red-500 scale-110' : 'text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-200 text-gray-600 hover:text-blue-500 shadow-lg hover:shadow-xl"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(card.base_price)}
          </div>
          <div className="text-xs text-gray-600">Starting price</div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Vendor Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {card.vendor?.business_name?.charAt(0).toUpperCase() || 'V'}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 line-clamp-1 text-lg group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                by {card.vendor?.business_name || 'Vendor'}
              </p>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(card.average_rating || 0)}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              ({card.total_reviews || 0} reviews)
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full border border-blue-100">
            <Clock className="h-3 w-3 mr-1 text-blue-500" />
            24h response
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {card.description}
        </p>

        {/* Location and Category */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-full border border-blue-100">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            {card.vendor?.location || 'Location'}
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-full border border-green-100">
            <Users className="h-4 w-4 mr-2 text-green-500" />
            {card.category?.name || 'Category'}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Link
            href={`/marketplace/service/${card.id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
          <button className="p-3 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-500 rounded-xl transition-all duration-200">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
