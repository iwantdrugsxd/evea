'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote,
  Heart,
  Calendar,
  Users,
  MapPin,
  Award
} from 'lucide-react'
import { siteContent } from '@/data/content'
import SectionHeader from '@/components/common/section-header'
import { Card, CardContent } from '@/components/ui/card'
import Badge from '@/components/ui/badge'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { testimonials } = siteContent

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.reviews.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.reviews.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.reviews.length) % testimonials.reviews.length)
  }

  const currentReview = testimonials.reviews[currentTestimonial]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: Heart,
            text: testimonials.badge.text
          }}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          description={testimonials.description}
        />

        {/* Main Testimonial Display */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white rounded-full shadow-elegant flex items-center justify-center hover:shadow-elegant-hover transition-all duration-200 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 bg-white rounded-full shadow-elegant flex items-center justify-center hover:shadow-elegant-hover transition-all duration-200 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="testimonial-card relative p-8 lg:p-12">
                  <CardContent className="p-0">
                    {/* Quote Icon */}
                    <Quote className="h-12 w-12 text-primary-200 mb-6" />

                    {/* Review Content */}
                    <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8 font-medium">
                      "{currentReview.content}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(currentReview.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                      <span className="ml-2 text-gray-600 font-semibold">
                        {currentReview.rating}.0/5
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-600 font-bold text-xl font-heading">
                            {currentReview.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{currentReview.name}</div>
                          <div className="text-gray-600 font-medium">{currentReview.role}</div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <MapPin className="h-4 w-4" />
                            <span>{currentReview.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Highlight */}
                      <div className="lg:text-right">
                        <Badge variant="primary" className="mb-2">
                          {currentReview.highlight}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {currentReview.eventType}
                        </div>
                      </div>
                    </div>

                    {/* Event Statistics */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-primary-600 font-heading">
                          {currentReview.eventDetails.guests}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Guests</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-primary-600 font-heading">
                          {currentReview.eventDetails.vendors}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Vendors</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-primary-600 font-heading">
                          {currentReview.eventDetails.duration}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Duration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <Card className="p-8 lg:p-12 bg-gradient-red border-primary-200">
            <CardContent className="p-0">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-heading">
                  Join Over 10,000+ Happy Customers
                </h3>
                
                <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">4.8/5</div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                  </div>
                  
                  <div className="hidden lg:block w-px h-20 bg-gray-300"></div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">2,500+</div>
                    <div className="text-sm text-gray-600 font-medium">Customer Reviews</div>
                  </div>
                  
                  <div className="hidden lg:block w-px h-20 bg-gray-300"></div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">98%</div>
                    <div className="text-sm text-gray-600 font-medium">Would Recommend</div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Experience the difference of working with India's most trusted and 
                  professionally managed event planning platform. Your perfect event awaits.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection