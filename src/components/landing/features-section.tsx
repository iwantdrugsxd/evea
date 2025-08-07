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
  Star,
  ArrowRight,
  Award,
  Globe,
  Smartphone
} from 'lucide-react'
import { siteContent } from '@/data/content'
import SectionHeader from '@/components/common/section-header'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const FeaturesSection = () => {
  const { features } = siteContent

  const iconMap = {
    Shield, Search, Calendar, CreditCard, MessageSquare, BarChart3,
    CheckCircle, Clock, Users, Star, Award, Globe, Smartphone
  }

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="container-custom">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: Star,
            text: features.badge.text
          }}
          title={features.title}
          subtitle={features.subtitle}
          description={features.description}
        />

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.main.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card variant="interactive" className="h-full p-8 text-center group-hover:border-primary-200">
                  <CardContent className="space-y-6 p-0">
                    {/* Feature Icon */}
                    <div className="feature-icon group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                    </div>

                    {/* Feature Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 font-heading group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Feature Highlights */}
                      <div className="space-y-2">
                        {feature.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-center space-x-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              Complete Event Management Suite
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for successful events, all in one professional platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.additional.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="p-6 h-full hover-lift border-2 hover:border-primary-100 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                          <IconComponent className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Features CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Card className="p-8 lg:p-12 bg-gradient-red border-primary-200">
            <CardContent className="p-0 max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Experience the Future of Event Planning
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Join thousands of satisfied customers who have transformed their event 
                planning experience with our comprehensive platform and verified vendor network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="primary" size="lg" className="group">
                    Explore Features
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Demo
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

export default FeaturesSection