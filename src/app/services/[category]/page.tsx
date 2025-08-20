'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Users,
  Heart,
  Building2,
  Cake,
  Camera,
  Utensils,
  Sparkles
} from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'

const categoryData = {
  wedding: {
    title: 'Wedding Services',
    description: 'Make your special day unforgettable with our premium wedding vendors',
    icon: Heart,
    color: 'text-pink-600',
    vendors: [
      {
        id: 1,
        name: 'Elegant Weddings Co.',
        rating: 4.9,
        reviews: 156,
        location: 'Mumbai, Maharashtra',
        specialties: ['Wedding Planning', 'Decoration', 'Coordination'],
        price: '₹2,50,000 - ₹5,00,000',
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        name: 'Royal Wedding Planners',
        rating: 4.8,
        reviews: 134,
        location: 'Delhi, NCR',
        specialties: ['Luxury Weddings', 'Destination', 'Traditional'],
        price: '₹3,00,000 - ₹8,00,000',
        image: '/api/placeholder/300/200'
      }
    ]
  },
  corporate: {
    title: 'Corporate Events',
    description: 'Professional event management for corporate gatherings',
    icon: Building2,
    color: 'text-blue-600',
    vendors: [
      {
        id: 3,
        name: 'Corporate Events Pro',
        rating: 4.7,
        reviews: 89,
        location: 'Bangalore, Karnataka',
        specialties: ['Conferences', 'Team Building', 'Product Launches'],
        price: '₹1,00,000 - ₹3,00,000',
        image: '/api/placeholder/300/200'
      }
    ]
  },
  birthday: {
    title: 'Birthday Parties',
    description: 'Celebrate birthdays with joy and memorable experiences',
    icon: Cake,
    color: 'text-yellow-600',
    vendors: [
      {
        id: 4,
        name: 'Party Perfect',
        rating: 4.6,
        reviews: 67,
        location: 'Pune, Maharashtra',
        specialties: ['Kids Parties', 'Adult Celebrations', 'Themed Parties'],
        price: '₹25,000 - ₹1,00,000',
        image: '/api/placeholder/300/200'
      }
    ]
  }
}

export default function ServiceCategoryPage() {
  const params = useParams()
  const category = params.category as string
  const data = categoryData[category as keyof typeof categoryData]

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
        <FloatingNavbar />
        <main className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Category Not Found</h1>
            <p className="text-gray-600 mb-8">The requested service category doesn't exist.</p>
            <Link href="/services">
              <Button variant="primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const IconComponent = data.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/30">
      <FloatingNavbar />
      
      <main className="section-padding">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary-600">Services</Link>
            <span>/</span>
            <span className="text-gray-900 capitalize">{category}</span>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6`}>
              <IconComponent className={`h-8 w-8 ${data.color}`} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {data.description}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button variant="outline" size="sm">All Vendors</Button>
            <Button variant="ghost" size="sm">Top Rated</Button>
            <Button variant="ghost" size="sm">Most Popular</Button>
            <Button variant="ghost" size="sm">Price: Low to High</Button>
          </motion.div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.vendors.map((vendor, index) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-interactive h-full">
                  <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {vendor.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{vendor.rating}</span>
                        <span className="text-sm text-gray-600">({vendor.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {vendor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="gray">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-lg font-semibold text-primary-600 mb-4">
                      {vendor.price}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="primary" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Card className="card-elegant p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-6">
                Let us help you find the perfect vendor for your {category} event
              </p>
              <Button variant="primary" size="lg">
                Get Custom Recommendations
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
