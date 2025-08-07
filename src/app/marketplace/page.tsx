'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal,
  Users,
  Calendar,
  ArrowRight,
  Award,
  Verified,
  Camera
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Badge from '@/components/ui/badge'
import Link from 'next/link'

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock vendor data
  const vendors = [
    {
      id: 1,
      name: 'Elegant Weddings Mumbai',
      category: 'Wedding Planning',
      rating: 4.9,
      reviews: 250,
      price: '₹75,000',
      location: 'Mumbai, Maharashtra',
      image: '/images/vendor-1.jpg',
      verified: true,
      featured: true,
      specialties: ['Traditional Weddings', 'Destination Weddings', 'Reception Planning']
    },
    {
      id: 2,
      name: 'Corporate Events Pro',
      category: 'Corporate Events',
      rating: 4.8,
      reviews: 180,
      price: '₹45,000',
      location: 'Bangalore, Karnataka',
      image: '/images/vendor-2.jpg',
      verified: true,
      featured: false,
      specialties: ['Conferences', 'Product Launches', 'Team Building']
    },
    // Add more vendors...
  ]

  const categories = [
    { value: 'all', label: 'All Categories', count: 500 },
    { value: 'wedding', label: 'Wedding', count: 150 },
    { value: 'corporate', label: 'Corporate', count: 120 },
    { value: 'birthday', label: 'Birthday', count: 80 },
    { value: 'photography', label: 'Photography', count: 200 },
    { value: 'catering', label: 'Catering', count: 180 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding-sm bg-gradient-to-br from-primary-50 to-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-heading mb-6">
                Discover Perfect Vendors
                <span className="block text-gradient">For Your Event</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Browse through 500+ verified vendors across all categories. 
                Find the perfect match for your budget, style, and requirements.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors, services, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-0 text-lg"
                  />
                  <Button variant="primary" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8 bg-white border-b">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>

              {/* View Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
                
                <Button variant="ghost" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Vendors Grid */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {vendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover-lift overflow-hidden h-full">
                    <div className="relative">
                      {/* Vendor Image */}
                      <div className="aspect-video bg-gradient-red relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/40"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Camera className="h-12 w-12 text-white/60" />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          {vendor.verified && (
                            <Badge variant="success" className="flex items-center space-x-1">
                              <Verified className="h-3 w-3" />
                              <span>Verified</span>
                            </Badge>
                          )}
                          {vendor.featured && (
                            <Badge variant="warning" className="flex items-center space-x-1">
                              <Award className="h-3 w-3" />
                              <span>Featured</span>
                            </Badge>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Vendor Header */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-primary-600 transition-colors">
                            {vendor.name}
                          </h3>
                          <p className="text-gray-600">{vendor.category}</p>
                        </div>

                        {/* Rating & Reviews */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-bold text-gray-900">{vendor.rating}</span>
                            </div>
                            <span className="text-gray-600 text-sm">({vendor.reviews} reviews)</span>
                          </div>
                          
                          <div className="text-lg font-bold text-primary-600">
                            {vendor.price}
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{vendor.location}</span>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2">
                          {vendor.specialties.slice(0, 2).map((specialty, idx) => (
                            <Badge key={idx} variant="gray" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                          {vendor.specialties.length > 2 && (
                            <Badge variant="gray" className="text-xs">
                              +{vendor.specialties.length - 2} more
                            </Badge>
                          )}
                        </div>

                        {/* CTA */}
                        <Link href={`/vendor/${vendor.id}`} className="block">
                          <Button variant="primary" className="w-full group">
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button variant="secondary" size="lg">
                Load More Vendors
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}