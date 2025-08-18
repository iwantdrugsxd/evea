'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Heart, 
  Building2, 
  Cake, 
  Sparkles,
  Camera,
  Utensils,
  ArrowRight,
  Star,
  Users,
  Calendar
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const EventCategoriesSection = () => {
  const categories = [
    {
      id: 'wedding',
      name: 'Wedding Services',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center',
      count: '150+ vendors',
      description: 'Complete wedding planning solutions',
      features: ['Venue Selection', 'Catering', 'Photography', 'Decoration'],
      avgPrice: '₹2.5L - ₹10L',
      rating: 4.9,
      reviews: 1200,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      id: 'corporate',
      name: 'Corporate Events',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center',
      count: '120+ vendors',
      description: 'Professional corporate solutions',
      features: ['Conference Setup', 'Team Building', 'Product Launch', 'Awards Ceremony'],
      avgPrice: '₹50K - ₹5L',
      rating: 4.8,
      reviews: 800,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'birthday',
      name: 'Birthday Parties',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400&h=300&fit=crop&crop=center',
      count: '80+ vendors',
      description: 'Memorable birthday celebrations',
      features: ['Theme Decoration', 'Entertainment', 'Catering', 'Photography'],
      avgPrice: '₹10K - ₹1L',
      rating: 4.7,
      reviews: 600,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'festival',
      name: 'Festivals & Celebrations',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&crop=center',
      count: '60+ vendors',
      description: 'Cultural and religious festivities',
      features: ['Traditional Setup', 'Cultural Programs', 'Food Stalls', 'Decoration'],
      avgPrice: '₹25K - ₹2L',
      rating: 4.6,
      reviews: 400,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop&crop=center',
      count: '200+ vendors',
      description: 'Professional event photography',
      features: ['Event Coverage', 'Portrait Sessions', 'Video Production', 'Album Design'],
      avgPrice: '₹5K - ₹50K',
      rating: 4.9,
      reviews: 1500,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600'
    },
    {
      id: 'catering',
      name: 'Catering Services',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
      count: '180+ vendors',
      description: 'Delicious food experiences',
      features: ['Multi-Cuisine', 'Custom Menus', 'Service Staff', 'Equipment'],
      avgPrice: '₹200 - ₹500 per plate',
      rating: 4.8,
      reviews: 2000,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary-600/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary-600/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-primary-100 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-full border border-primary-200 shadow-red-soft mb-4 sm:mb-6"
          >
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm sm:text-base lg:text-lg">Event Categories</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Perfect Events for{' '}
            <span className="text-gradient">Every Occasion</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we have the right vendors and services 
            for every type of event you can imagine.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Image Section */}
                  <div className="relative h-36 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Category Icon Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg`}>
                        <category.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${category.textColor}`} />
                      </div>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 shadow-elegant z-10">
                      <div className="flex items-center space-x-1">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-semibold text-gray-700">{category.rating}</span>
                      </div>
                    </div>

                    {/* Category Title Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg drop-shadow-lg">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{category.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{category.description}</p>
                        <div className="flex items-center space-x-3 sm:space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{category.count}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{category.reviews} reviews</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-3 sm:mb-4">
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        {category.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-1.5 sm:space-x-2 text-xs text-gray-600">
                            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${category.bgColor}`}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 mb-0.5 sm:mb-1">Average Price Range</div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">{category.avgPrice}</div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/marketplace?category=${category.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full bg-gradient-to-r ${category.color} text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg text-sm sm:text-base`}
                      >
                        <span>Explore {category.name}</span>
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <Card className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-0">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
                We offer custom event planning services for unique occasions. 
                Our expert team will help you create the perfect event experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="primary" size="lg" className="group text-sm sm:text-base">
                    <span>Browse All Categories</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white text-sm sm:text-base">
                    <span>Get Custom Quote</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default EventCategoriesSection
