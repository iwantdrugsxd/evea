'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import Tilt from 'react-parallax-tilt'

const testimonials = [
  {
    id: 1,
    name: "Priya & Rajesh Sharma",
    role: "Wedding Couple",
    location: "Mumbai, Maharashtra",
    eventType: "Traditional Indian Wedding",
    rating: 5,
    content: "Evea made our dream wedding come true! From finding the perfect venue to coordinating with vendors, everything was seamless. The platform's verified vendor network gave us confidence, and the 24/7 support was incredible.",
    eventDetails: {
      guests: 300,
      vendors: 8,
      duration: "3 days"
    },
    highlight: "Dream Wedding Realized",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Corporate Event Manager",
    location: "Bangalore, Karnataka", 
    eventType: "Annual Conference",
    rating: 5,
    content: "As a corporate event manager, I need reliable vendors who deliver on time. Evea's vendor verification process is thorough, and the booking system is incredibly efficient. Saved us both time and money!",
    eventDetails: {
      guests: 500,
      vendors: 12,
      duration: "2 days"
    },
    highlight: "Professional Excellence",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Meera Singh",
    role: "Mother",
    location: "Delhi, NCR",
    eventType: "16th Birthday Party",
    rating: 5,
    content: "My daughter's sweet sixteen was absolutely perfect! The theme party vendors were creative, professional, and within our budget. The seamless coordination made the day stress-free for our family.",
    eventDetails: {
      guests: 50,
      vendors: 4,
      duration: "6 hours"
    },
    highlight: "Memorable Birthday Celebration",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    color: "from-purple-500 to-violet-500"
  }
]

const TestimonialCard = ({ testimonial, isActive, onClick }: {
  testimonial: typeof testimonials[0],
  isActive: boolean,
  onClick: () => void
}) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1000}
    >
      <motion.div
        layout
        onClick={onClick}
        className={`cursor-pointer transition-all duration-500 ${
          isActive ? 'scale-105' : 'scale-95 opacity-70'
        }`}
        whileHover={{ scale: isActive ? 1.05 : 1 }}
      >
        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${testimonial.color} rounded-3xl blur opacity-75`}
          animate={{
            opacity: isActive ? 1 : 0.3,
            scale: isActive ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${testimonial.color} rounded-full blur-2xl`} />
          </div>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              </motion.div>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                <p className="text-purple-600 font-semibold">{testimonial.role}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`bg-gradient-to-r ${testimonial.color} px-3 py-1 rounded-full`}
            >
              <span className="text-white font-bold text-xs">{testimonial.highlight}</span>
            </motion.div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>
          
          {/* Quote */}
          <div className="relative mb-6">
            <Quote className="h-8 w-8 text-purple-200 absolute -top-2 -left-2" />
            <blockquote className="text-gray-700 leading-relaxed pl-6 italic">
              "{testimonial.content}"
            </blockquote>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="font-bold text-blue-600 text-lg">{testimonial.eventDetails.guests}</div>
              <div className="text-xs text-gray-500">Guests</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 text-lg">{testimonial.eventDetails.vendors}</div>
              <div className="text-xs text-gray-500">Vendors</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-purple-600 text-lg">{testimonial.eventDetails.duration}</div>
              <div className="text-xs text-gray-500">Duration</div>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

const VideoTestimonial = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative bg-gradient-to-br from-gray-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl"
    >
      <div className="aspect-video relative">
        {!isPlaying ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=450&fit=crop"
              alt="Video testimonial"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </motion.button>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <p className="text-white">Video player would be embedded here</p>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-white font-bold text-xl mb-2">
          Watch Success Stories
        </h3>
        <p className="text-gray-300">
          Hear directly from our top-performing vendors about their journey with Evea
        </p>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])
  
  // Auto-rotate testimonials
  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoplay])
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setAutoplay(false)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200 shadow-lg mb-8"
          >
            <Quote className="h-6 w-6 text-purple-600" />
            <span className="text-purple-700 font-bold text-lg">Success Stories</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            What Our{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Vendors Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of successful vendors who have transformed their businesses with Evea's powerful platform
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Testimonial Carousel */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevTestimonial}
                    className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/50 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextTestimonial}
                    className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/50 shadow-lg hover:shadow-xl transition-all"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </motion.button>
                </div>
                
                {/* Progress Indicators */}
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        setActiveIndex(index)
                        setAutoplay(false)
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex 
                          ? 'bg-purple-500 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Active Testimonial */}
              <AnimatePresence mode="wait">
                <TestimonialCard
                  key={activeIndex}
                  testimonial={testimonials[activeIndex]}
                  isActive={true}
                  onClick={() => {}}
                />
              </AnimatePresence>
            </div>
          </div>
          
          {/* Side Content */}
          <div className="space-y-8">
            {/* Video Testimonial */}
            <VideoTestimonial />
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl"
            >
              <h3 className="font-bold text-gray-900 mb-4">Platform Success</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold">4.9/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vendor Satisfaction</span>
                  <span className="font-bold text-green-600">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Repeat Bookings</span>
                  <span className="font-bold text-blue-600">85%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}