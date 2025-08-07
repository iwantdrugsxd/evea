'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  Heart,
  Calendar,
  MapPin,
  CheckCircle
} from 'lucide-react'

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Priya & Arjun Sharma',
      role: 'Wedding Couple',
      location: 'Mumbai, Maharashtra',
      eventType: 'Wedding',
      rating: 5,
      image: '/images/testimonial-1.jpg',
      content: 'Evea made our dream wedding a reality! From finding the perfect photographers to coordinating with caterers, everything was seamless. The vendor quality was exceptional, and the booking process was so simple.',
      eventDetails: {
        guests: 350,
        vendors: 8,
        duration: '3 days'
      },
      highlight: 'Perfect Wedding Planning'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Corporate Event Manager',
      location: 'Delhi, NCR',
      eventType: 'Corporate Conference',
      rating: 5,
      image: '/images/testimonial-2.jpg',
      content: 'Our annual conference was flawless thanks to Evea. The platform helped us find reliable vendors within budget, and their support team was available 24/7. Highly recommend for corporate events.',
      eventDetails: {
        guests: 500,
        vendors: 12,
        duration: '2 days'
      },
      highlight: 'Outstanding Corporate Support'
    },
    {
      id: 3,
      name: 'Meera Patel',
      role: 'Mother',
      location: 'Bangalore, Karnataka',
      eventType: 'Birthday Party',
      rating: 5,
      image: '/images/testimonial-3.jpg',
      content: 'My daughter\'s 5th birthday was magical! Evea connected us with amazing decorators and entertainers. The kids had a blast, and the parents were impressed. Worth every penny!',
      eventDetails: {
        guests: 50,
        vendors: 4,
        duration: '6 hours'
      },
      highlight: 'Memorable Birthday Celebration'
    },
    {
      id: 4,
      name: 'Amit & Sneha Gupta',
      role: 'Anniversary Celebration',
      location: 'Pune, Maharashtra',
      eventType: '25th Anniversary',
      rating: 5,
      image: '/images/testimonial-4.jpg',
      content: 'Celebrating our silver anniversary was special with Evea\'s help. They found vendors who understood our vision perfectly. The surprise element they helped plan was unforgettable!',
      eventDetails: {
        guests: 100,
        vendors: 6,
        duration: '1 day'
      },
      highlight: 'Unforgettable Anniversary'
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentReview = testimonials[currentTestimonial]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-medium">Happy Customers</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Stories of Success
            <span className="block text-gradient">& Celebration</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from customers who trusted us with their special moments. 
            See how we helped make their events unforgettable.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Content Side */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-8">
                    <Quote className="h-8 w-8 text-primary-600" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                    "{currentReview.content}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-red rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-bold">
                        {currentReview.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{currentReview.name}</div>
                      <div className="text-sm text-gray-600">{currentReview.role}</div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{currentReview.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl font-bold text-primary-600">
                        {currentReview.eventDetails.guests}
                      </div>
                      <div className="text-xs text-gray-600">Guests</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl font-bold text-primary-600">
                        {currentReview.eventDetails.vendors}
                      </div>
                      <div className="text-xs text-gray-600">Vendors</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-xl font-bold text-primary-600">
                        {currentReview.eventDetails.duration}
                      </div>
                      <div className="text-xs text-gray-600">Duration</div>
                    </div>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="relative bg-gradient-red p-8 lg:p-12 flex items-center justify-center">
                  {/* Mock Event Visual */}
                  <div className="relative w-full max-w-sm">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Calendar className="h-8 w-8 text-primary-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{currentReview.eventType}</h4>
                        <p className="text-sm text-gray-600">{currentReview.highlight}</p>
                      </div>
                      
                      <div className="space-y-3">
                        {['Event Planning', 'Vendor Coordination', 'Day Management', 'Quality Assurance'].map((item, index) => (
                          <div key={item} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Floating Success Badge */}
                    <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-primary-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-primary-600" />
            </button>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-primary-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Reviews Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-red rounded-2xl p-8 lg:p-12"
        >
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Join Over 10,000+ Happy Customers
            </h3>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">4.8/5</div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">2,500+</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="w-px h-16 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Would Recommend</div>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Experience the difference of working with India's most trusted event management platform.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection