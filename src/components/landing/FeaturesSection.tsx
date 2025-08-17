'use client'

import { motion } from 'framer-motion'
import { Star, Crown, Heart, Sparkles } from 'lucide-react'

const ServicesSection = () => {
  const services = [
    {
      title: "Expert Planning",
      description: "Our seasoned event planners bring years of experience and creativity to every celebration. We transform your vision into meticulously crafted experiences that exceed expectations.",
      icon: Star,
      position: "top-left"
    },
    {
      title: "Premium Services",
      description: "From luxury venues to top-tier vendors, we curate only the finest elements for your special day. Every detail reflects our commitment to excellence and sophistication.",
      icon: Crown,
      position: "bottom-left"
    },
    {
      title: "We Do It Because We Love It",
      description: "Passion drives everything we do. Your joy is our motivation, and we pour our hearts into creating moments that will be cherished for a lifetime.",
      icon: Heart,
      position: "top-right"
    },
    {
      title: "A Memorable Experience",
      description: "We don't just plan events; we create unforgettable memories. Every celebration becomes a story worth telling, filled with moments that last forever.",
      icon: Sparkles,
      position: "bottom-right"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header Area */}
        <div className="text-center mb-16">
          {/* Experience and Excellence Badges */}
          <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="h-px w-16 bg-red-500" />
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                Experience
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                Excellence
              </span>
              <div className="h-px w-16 bg-red-500" />
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </motion.div>
          </div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            What Services Do We{' '}
            <span className="text-red-500">Provide?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We're not just event planners; we're dream weavers, memory makers, and celebration architects. 
            Every service we offer is crafted with passion, precision, and purpose.
          </motion.p>
        </div>

        {/* Services Grid with Central Disco Ball */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Disco Ball - Main Attraction */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 100 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              {/* Main Disco Ball */}
              <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 relative">
                {/* Core Disco Ball */}
                <div className="w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-full animate-spin-slow shadow-2xl relative overflow-hidden">
                  {/* Metallic Facets */}
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9)_1px,transparent_1px),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.7)_1px,transparent_1px),radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.8)_2px,transparent_2px),radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[length:12px_12px,8px_8px,16px_16px,10px_10px]" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 rounded-full animate-disco-shimmer" />
                  
                  {/* Highlight */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/60 rounded-full blur-sm" />
                </div>
                
                {/* Intense Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/40 via-red-400/30 to-red-600/40 blur-2xl animate-pulse" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-400/20 via-red-300/15 to-red-500/20 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Rotating Light Rays */}
              <div className="absolute inset-0 rounded-full border-4 border-red-500/40 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border-2 border-red-400/30 animate-spin-reverse" />
              <div className="absolute inset-8 rounded-full border border-red-300/20 animate-spin-slow" style={{ animationDuration: '6s' }} />
              
              {/* Floating Particles */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-2 -left-2 w-4 h-4 bg-red-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-red-300 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [-5, 15, -5],
                  x: [10, -10, 10],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -top-4 right-4 w-2 h-2 bg-red-500 rounded-full blur-sm"
              />
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {services.map((service, index) => {
              const IconComponent = service.icon
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4 + (index * 0.1),
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative ${
                    service.position === 'top-left' ? 'md:justify-self-end md:pr-8' :
                    service.position === 'bottom-left' ? 'md:justify-self-end md:pr-8' :
                    service.position === 'top-right' ? 'md:justify-self-start md:pl-8' :
                    'md:justify-self-start md:pl-8'
                  }`}
                >
                  <div className="bg-gray-800/80 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 h-full hover:border-red-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
                    {/* Service Icon */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Service Content */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-4 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection