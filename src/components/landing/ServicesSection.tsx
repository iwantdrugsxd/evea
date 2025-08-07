'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Building2, 
  Cake, 
  Sparkles, 
  Camera, 
  Music, 
  Utensils, 
  Palette,
  ArrowRight,
  Users,
  MapPin,
  Clock
} from 'lucide-react'

const ServicesSection = () => {
  const eventTypes = [
    {
      icon: Heart,
      title: 'Wedding Services',
      description: 'Make your dream wedding come true with our curated vendors specializing in matrimonial celebrations.',
      image: '/images/wedding-service.jpg',
      price: 'Starting from ₹50,000',
      popular: true,
      services: ['Photography', 'Catering', 'Decoration', 'Music'],
      stats: { vendors: '150+', events: '2.5K+' }
    },
    {
      icon: Building2,
      title: 'Corporate Events',
      description: 'Professional corporate event solutions for conferences, seminars, team building, and company celebrations.',
      image: '/images/corporate-event.jpg',
      price: 'Starting from ₹25,000',
      popular: false,
      services: ['Venue', 'AV Equipment', 'Catering', 'Logistics'],
      stats: { vendors: '120+', events: '1.8K+' }
    },
    {
      icon: Cake,
      title: 'Birthday Parties',
      description: 'Create magical birthday memories with themed decorations, entertainment, and personalized experiences.',
      image: '/images/birthday-party.jpg',
      price: 'Starting from ₹15,000',
      popular: false,
      services: ['Themes', 'Entertainment', 'Cake', 'Photography'],
      stats: { vendors: '80+', events: '3.2K+' }
    },
    {
      icon: Sparkles,
      title: 'Special Occasions',
      description: 'Festivals, anniversaries, graduations, and other milestone celebrations made memorable.',
      image: '/images/special-occasion.jpg',
      price: 'Starting from ₹20,000',
      popular: false,
      services: ['Custom Planning', 'Decoration', 'Catering', 'Entertainment'],
      stats: { vendors: '100+', events: '1.5K+' }
    }
  ]

  const vendorCategories = [
    { icon: Camera, name: 'Photography', count: '85+ vendors' },
    { icon: Music, name: 'Entertainment', count: '65+ vendors' },
    { icon: Utensils, name: 'Catering', count: '120+ vendors' },
    { icon: Palette, name: 'Decoration', count: '95+ vendors' }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-medium">Our Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Every Event Type,
            <span className="block text-gradient">Perfectly Managed</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we have specialized 
            vendors for every type of event you can imagine.
          </p>
        </div>

        {/* Event Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {eventTypes.map((event, index) => {
            const Icon = event.icon
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group overflow-hidden hover:shadow-red-medium"
              >
                {/* Image Header */}
                <div className="relative h-48 bg-gradient-red overflow-hidden">
                  {event.popular && (
                    <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Mock Image Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                    <Icon className="h-16 w-16 text-primary-600 opacity-60" />
                  </div>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <span className="text-sm font-semibold text-gray-900">{event.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading group-hover:text-primary-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.stats.vendors}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.stats.events}</span>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/services/${event.title.toLowerCase().replace(' ', '-')}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group/link"
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Vendor Categories */}
        <div className="animate-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Popular Vendor Categories
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse by service type to find the perfect vendors for your event
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {vendorCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={`/marketplace?category=${category.name.toLowerCase()}`}
                    className="card p-6 text-center group hover:shadow-red-soft block"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-red rounded-2xl p-8 lg:p-12 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Don't See Your Event Type?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We work with vendors across all event categories. Get in touch with our 
              event specialists for custom requirements and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Get Custom Quote
              </Link>
              <Link href="/marketplace" className="btn-secondary">
                Browse All Vendors
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection