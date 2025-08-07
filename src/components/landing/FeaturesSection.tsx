'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Star
} from 'lucide-react'

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: 'Verified Vendors',
      description: 'All vendors go through our rigorous verification process including background checks, document verification, and quality assessments.',
      highlights: ['Background verified', 'Licensed professionals', 'Insurance covered']
    },
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Advanced filters and AI-powered recommendations help you find the perfect vendors based on your event type, budget, and location.',
      highlights: ['AI recommendations', 'Advanced filters', 'Location-based search']
    },
    {
      icon: Calendar,
      title: 'Seamless Booking',
      description: 'Book vendors instantly with real-time availability, automatic calendar sync, and flexible scheduling options.',
      highlights: ['Real-time availability', 'Instant booking', 'Calendar integration']
    }
  ]

  const additionalFeatures = [
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with escrow protection and transparent pricing.',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Built-in messaging system to communicate directly with vendors.',
    },
    {
      icon: BarChart3,
      title: 'Event Analytics',
      description: 'Track your event progress with detailed analytics and reports.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Review system and quality monitoring for consistent service.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your event needs.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Invite team members and collaborate on event planning.',
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-medium">Why Choose Evea</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading">
            Everything You Need for
            <span className="block text-gradient">Perfect Events</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools and services you need 
            to plan, manage, and execute flawless events from start to finish.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card p-8 text-center group hover:shadow-red-soft"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-red rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 text-primary-600" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center justify-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-primary-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="animate-on-scroll">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
              And Much More...
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover all the powerful features that make event planning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
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
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Feature Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '<5min', label: 'Response Time' },
              { number: '500+', label: 'Verified Vendors' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection