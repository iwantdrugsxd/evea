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
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
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
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We're not just event planners; we're dream weavers, memory makers, and celebration architects. 
            Every service we offer is crafted with passion, precision, and purpose.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="relative max-w-6xl mx-auto">
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
                  className="relative"
                >
                  <div className="bg-white backdrop-blur-sm border border-red-200 rounded-2xl p-8 h-full hover:border-red-300 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 shadow-elegant">
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
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-red-600/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
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