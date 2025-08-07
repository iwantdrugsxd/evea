'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Calendar, 
  Star, 
  Award, 
  TrendingUp,
  MapPin,
  Clock,
  Shield
} from 'lucide-react'

const StatsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: '+',
      title: 'Verified Vendors',
      description: 'Trusted professionals across all categories',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Calendar,
      number: 10000,
      suffix: '+',
      title: 'Events Completed',
      description: 'Successfully managed celebrations',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Star,
      number: 4.8,
      suffix: '/5',
      title: 'Average Rating',
      description: 'Customer satisfaction score',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Award,
      number: 95,
      suffix: '%',
      title: 'Success Rate',
      description: 'Events completed without issues',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    }
  ]

  const achievements = [
    {
      icon: TrendingUp,
      title: 'Fastest Growing',
      description: 'Event platform in India',
      highlight: '#1'
    },
    {
      icon: MapPin,
      title: 'Cities Covered',
      description: 'Across major Indian cities',
      highlight: '25+'
    },
    {
      icon: Clock,
      title: 'Average Response',
      description: 'Vendor response time',
      highlight: '<2hrs'
    },
    {
      icon: Shield,
      title: 'Money-back Guarantee',
      description: 'If service doesn\'t meet standards',
      highlight: '100%'
    }
  ]

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!inView) return

      let start = 0
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [inView, end, duration])

    return count
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
            <TrendingUp className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-medium">Our Impact</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Trusted by Thousands
            <span className="block text-gradient">Across India</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Numbers that speak for our commitment to excellence and 
            the trust our customers place in us.
          </p>
        </div>

        {/* Main Stats */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const count = useCounter(stat.number, 2000 + index * 200)
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-8 group hover:shadow-red-soft"
              >
                <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                
                <div className="mb-2">
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.number === 4.8 ? count.toFixed(1) : count.toLocaleString()}
                  </span>
                  <span className="text-2xl font-bold text-gray-600">{stat.suffix}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Achievements Grid */}
        <div className="animate-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Recognition & Achievements
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry recognition and milestones that validate our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="card p-6 hover:shadow-red-soft group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-primary-600">
                          {achievement.highlight}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              Trusted By Leading Brands
            </h3>
            <p className="text-gray-600">
              Companies that have chosen Evea for their corporate events
            </p>
          </div>

          {/* Mock Brand Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              'TechCorp', 'InnovateLab', 'StartupHub', 'DesignStudio', 'MediaGroup', 'FinanceInc'
            ].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-xs font-bold text-gray-400 transform rotate-12">
                    LOGO
                  </span>
                </div>
                <div className="text-sm text-gray-500 font-medium">{brand}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center bg-gradient-red rounded-2xl p-8 lg:p-12"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              Ready to Join Thousands of Satisfied Customers?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Start planning your perfect event today with our trusted network of vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Start Planning Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
              >
                View Success Stories
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection