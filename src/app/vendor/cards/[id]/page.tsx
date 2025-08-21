'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Eye, Star, MapPin, Calendar, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

interface VendorCard {
  id: string;
  title: string;
  description: string;
  category_id: string;
  base_price: number;
  starting_price?: number;
  price_type: string;
  service_area: string[];
  max_capacity?: number;
  inclusions?: string[];
  exclusions?: string[];
  equipment_provided?: string[];
  cancellation_policy?: string;
  images?: string[];
  videos?: string[];
  portfolio_images?: string[];
  tags?: string[];
  experience_years?: number;
  insurance_coverage?: string;
  certifications?: string;
  emergency_contact?: string;
  is_active: boolean;
  featured: boolean;
  average_rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  simplified_price_type: string;
  seo_description?: string;
  subcategory_id?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function VendorCardDetails() {
  const params = useParams();
  const router = useRouter();
  const [card, setCard] = useState<VendorCard | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCardDetails();
    }
  }, [params.id]);

  const fetchCardDetails = async () => {
    try {
      const response = await fetch(`/api/vendor-cards/${params.id}?vendor=true`);
      if (response.ok) {
        const data = await response.json();
        setCard(data.service);
        
        // Set category from the service data
        if (data.service.categories) {
          setCategory(data.service.categories);
        }
      } else {
        toast.error('Failed to fetch card details');
        router.push('/vendor/cards');
      }
    } catch (error) {
      console.error('Error fetching card details:', error);
      toast.error('An error occurred while fetching card details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this service card? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/vendor-cards/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Service card deleted successfully');
        router.push('/vendor/cards');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete service card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('An error occurred while deleting the card');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/vendor/cards/${params.id}/edit`);
  };

  const handleViewPublic = () => {
    router.push(`/marketplace/service/${params.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading card details...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Card not found</p>
          <button
            onClick={() => router.push('/vendor/cards')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Back to Cards
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/vendor/cards')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cards
            </button>
            <div>
              <h1 className="text-3xl font-bold">{card.title}</h1>
              <p className="text-white/60">
                {category?.name} • Created {new Date(card.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleViewPublic}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              <Eye className="w-4 h-4" />
              View Public
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Card Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${card.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {card.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-white/60 text-sm">Status</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{card.average_rating.toFixed(1)}</span>
            </div>
            <p className="text-white/60 text-sm">{card.total_reviews} reviews</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-medium">₹{card.base_price.toLocaleString()}</span>
            </div>
            <p className="text-white/60 text-sm">Base Price</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{card.service_area.length}</span>
            </div>
            <p className="text-white/60 text-sm">Service Areas</p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-white/80 leading-relaxed">{card.description}</p>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Base Price:</span>
                  <span className="font-medium">₹{card.base_price.toLocaleString()}</span>
                </div>
                {card.starting_price && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Starting Price:</span>
                    <span className="font-medium">₹{card.starting_price.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/60">Price Type:</span>
                  <span className="font-medium capitalize">{card.price_type}</span>
                </div>
              </div>
            </motion.div>

            {/* Service Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {card.service_area.map((area, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {card.inclusions && card.inclusions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Inclusions</h2>
                  <ul className="space-y-2">
                    {card.inclusions.map((inclusion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {card.exclusions && card.exclusions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Exclusions</h2>
                  <ul className="space-y-2">
                    {card.exclusions.map((exclusion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">{exclusion}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Additional Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
              <div className="space-y-3">
                {card.experience_years && (
                  <div>
                    <span className="text-white/60 text-sm">Experience:</span>
                    <p className="font-medium">{card.experience_years} years</p>
                  </div>
                )}
                {card.max_capacity && (
                  <div>
                    <span className="text-white/60 text-sm">Max Capacity:</span>
                    <p className="font-medium">{card.max_capacity} people</p>
                  </div>
                )}
                {card.insurance_coverage && (
                  <div>
                    <span className="text-white/60 text-sm">Insurance:</span>
                    <p className="font-medium">{card.insurance_coverage}</p>
                  </div>
                )}
                {card.certifications && (
                  <div>
                    <span className="text-white/60 text-sm">Certifications:</span>
                    <p className="font-medium">{card.certifications}</p>
                  </div>
                )}
                {card.emergency_contact && (
                  <div>
                    <span className="text-white/60 text-sm">Emergency Contact:</span>
                    <p className="font-medium">{card.emergency_contact}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Cancellation Policy */}
            {card.cancellation_policy && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Cancellation Policy</h2>
                <p className="text-white/80 text-sm">{card.cancellation_policy}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
