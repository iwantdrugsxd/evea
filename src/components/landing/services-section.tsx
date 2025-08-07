// src/components/landing/services-section.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Building2, 
  Cake, 
  Sparkles, 
  Camera, 
  Utensils,
  ArrowRight,
  Users,
  MapPin,
  Star,
  Calendar
} from 'lucide-react'
import { siteContent } from '@/data/content'
import SectionHeader from '@/components/common/section-header'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const ServicesSection = () => {
  const { services } = siteContent

  const iconMap = {
    Heart, Building2, Cake, Sparkles, Camera, Utensils
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: Calendar,
            text: services.badge.text
          }}
          title={services.title}
          subtitle={services.subtitle}
          description={services.description}
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.categories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <Card variant="interactive" className="group h-full p-8 text-center hover:shadow-red-soft border-2 hover:border-primary-200">
                    <CardContent className="p-0 space-y-6">
                      {/* Service Icon */}
                      <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-10 w-10 text-primary-600 group-hover:text-primary-700" />
                      </div>

                      {/* Service Content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors font-heading">
                          {category.name}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Vendor Count */}
                        <div className="flex items-center justify-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-primary-500" />
                          <span className="font-semibold text-primary-600">{category.count}</span>
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <div className="flex justify-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-all duration-300">
                          <ArrowRight className="h-5 w-5 text-primary-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Custom Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 lg:p-12 bg-gradient-red border-primary-200">
            <CardContent className="p-0 text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
                  Don't See Your Event Type?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We work with vendors across all event categories and specialize in custom requirements. 
                  Get in touch with our event specialists for personalized recommendations and exclusive packages.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="group">
                    Get Custom Quote
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button variant="secondary" size="lg">
                    Browse All Vendors
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

export default ServicesSection