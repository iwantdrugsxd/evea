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
  Award,
  Play,
  ArrowRight
} from 'lucide-react'
import { siteContent } from '@/data/content'
import SectionHeader from '@/components/common/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
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

  const videoTestimonials = [
    {
      id: 1,
      name: "Priya & Rajesh",
      event: "Wedding",
      duration: "2:34",
      thumbnail: "/api/placeholder/300/200",
      videoUrl: "#"
    },
    {
      id: 2,
      name: "Arjun Patel",
      event: "Corporate Event",
      duration: "1:45",
      thumbnail: "/api/placeholder/300/200",
      videoUrl: "#"
    },
    {
      id: 3,
      name: "Meera Singh",
      event: "Birthday Party",
      duration: "3:12",
      thumbnail: "/api/placeholder/300/200",
      videoUrl: "#"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary-600/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-primary-600/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 dot-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: Heart,
            text: testimonials.badge.text
          }}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          description={testimonials.description}
          className="text-gray-900 [&_.text-gradient]:text-primary-600 [&_.text-gray-600]:text-gray-600 [&_.text-primary-700]:text-primary-700 [&_.bg-primary-100]:bg-primary-100 [&_.border-primary-200]:border-primary-200"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* Main Testimonial */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-elegant flex items-center justify-center hover:shadow-elegant-hover transition-all duration-200 z-10"
                aria-label="Previous testimonial"
                suppressHydrationWarning={true}
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 sm:translate-x-16 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-elegant flex items-center justify-center hover:shadow-elegant-hover transition-all duration-200 z-10"
                aria-label="Next testimonial"
                suppressHydrationWarning={true}
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
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
                  <Card className="testimonial-card relative p-6 sm:p-8 lg:p-12 bg-white border-gray-200 shadow-elegant">
                    <CardContent className="p-0">
                      {/* Quote Icon */}
                      <Quote className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary-200 mb-4 sm:mb-6" />

                      {/* Review Content */}
                      <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6 sm:mb-8 font-medium">
                        "{currentReview.content}"
                      </blockquote>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                        {[...Array(currentReview.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-2 text-gray-600 font-semibold text-sm sm:text-base">
                          {currentReview.rating}.0/5
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 sm:space-y-6 lg:space-y-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-600 font-bold text-lg sm:text-xl font-heading">
                              {currentReview.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-base sm:text-lg">{currentReview.name}</div>
                            <div className="text-gray-600 font-medium text-sm sm:text-base">{currentReview.role}</div>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{currentReview.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Event Highlight */}
                        <div className="lg:text-right">
                          <Badge variant="primary" className="mb-1 sm:mb-2 text-xs sm:text-sm">
                            {currentReview.highlight}
                          </Badge>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {currentReview.eventType}
                          </div>
                        </div>
                      </div>

                      {/* Event Statistics */}
                      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl sm:text-2xl font-bold text-primary-600 font-heading">
                            {currentReview.eventDetails.guests}
                          </div>
                          <div className="text-xs font-medium text-gray-600">Guests</div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl sm:text-2xl font-bold text-primary-600 font-heading">
                            {currentReview.eventDetails.vendors}
                          </div>
                          <div className="text-xs font-medium text-gray-600">Vendors</div>
                        </div>
                        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <div className="text-xl sm:text-2xl font-bold text-primary-600 font-heading">
                            {currentReview.eventDetails.duration}
                          </div>
                          <div className="text-xs font-medium text-gray-600">Duration</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 sm:mt-8">
              {testimonials.reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary-600 w-6 sm:w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  suppressHydrationWarning={true}
                />
              ))}
            </div>
          </div>

          {/* Video Testimonials Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Video Testimonials</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Hear directly from our happy customers</p>
            </div>

            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    {/* Video Thumbnail */}
                    <div className="relative h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-primary-50 to-primary-100">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary-600" />
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 bg-black/70 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-3 sm:p-4">
                      <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">{video.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{video.event}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* View All Videos Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="outline"
                className="w-full text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white text-sm sm:text-base"
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View All Videos
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Trust Summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <Card className="p-6 sm:p-8 lg:p-12 bg-gradient-red border-primary-200 shadow-elegant">
            <CardContent className="p-0">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-heading">
                  Join Over 10,000+ Happy Customers
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1 sm:mb-2 font-heading">4.8/5</div>
                    <div className="flex items-center justify-center space-x-1 mb-1 sm:mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Average Rating</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1 sm:mb-2 font-heading">2,500+</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Customer Reviews</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-1 sm:mb-2 font-heading">98%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Would Recommend</div>
                  </div>
                </div>
                
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8">
                  Experience the difference of working with India's most trusted and 
                  professionally managed event planning platform. Your perfect event awaits.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button variant="primary" size="lg" className="group text-sm sm:text-base">
                    <span>Start Planning Today</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white text-sm sm:text-base">
                    <span>Read More Reviews</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            key="video-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-4 lg:p-6 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-4 lg:mb-6 relative overflow-hidden">
              <div className="text-white text-center z-10">
                <Play className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto mb-4 text-primary-400" />
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2">Customer Testimonial Video</h3>
                <p className="text-sm lg:text-base text-gray-300">Hear directly from our satisfied customers</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="primary"
                onClick={() => setIsVideoPlaying(false)}
                className="px-4 sm:px-6 lg:px-8 text-sm sm:text-base"
              >
                Close Video
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default TestimonialsSection