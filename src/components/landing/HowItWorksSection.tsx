'use client'

import { motion } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  CreditCard, 
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Users
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SectionHeader from '@/components/common/SectionHeader'

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Discover Vendors",
      description: "Browse our curated list of verified vendors across all categories. Use advanced filters to find the perfect match for your event.",
      features: ["AI-powered recommendations", "Advanced search filters", "Verified vendor profiles"]
    },
    {
      icon: Calendar,
      title: "Book & Schedule",
      description: "Check real-time availability and book vendors instantly. Our smart scheduling system ensures no conflicts.",
      features: ["Real-time availability", "Instant booking", "Calendar integration"]
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay securely with multiple payment options. Your money is protected until the service is completed.",
      features: ["Escrow protection", "Multiple payment methods", "Transparent pricing"]
    },
    {
      icon: CheckCircle,
      title: "Enjoy Your Event",
      description: "Relax and enjoy your special day. Our team ensures everything runs smoothly from start to finish.",
      features: ["24/7 support", "Quality assurance", "Post-event reviews"]
    }
  ]

  const benefits = [
    {
      icon: Star,
      title: "Verified Quality",
      description: "All vendors undergo rigorous background checks and quality assessments"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security with SSL encryption and fraud protection"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated customer support team available 24/7 to help you"
    }
  ]

  return (
    <section className="section-padding bg-white text-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: CheckCircle,
            text: "Simple Process"
          }}
          title="How It Works"
          subtitle="4 Simple Steps"
          description="Planning your perfect event has never been easier. Our streamlined process ensures you get the best vendors with minimal effort."
          className="text-gray-900 [&_.text-gradient]:text-primary-600 [&_.text-gray-600]:text-gray-600 [&_.text-primary-700]:text-primary-700 [&_.bg-primary-100]:bg-primary-100 [&_.border-primary-200]:border-primary-200"
        />

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                {index + 1}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 z-10">
                  <ArrowRight className="h-6 w-6 text-primary-400" />
                </div>
              )}

              <Card className="h-full bg-white border-gray-200 hover:border-primary-600/50 shadow-elegant hover:shadow-elegant-hover transition-all duration-300">
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 text-left">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              Why Choose Our Platform?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've built our platform with your success in mind, ensuring every event is a memorable experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gray-50 border-gray-200 hover:border-primary-600/50 hover:bg-gray-100 transition-all duration-300 text-center h-full shadow-elegant">
                  <CardContent className="p-0">
                    <benefit.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 font-heading">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
            <CardContent className="p-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-heading">
                Ready to Start Planning?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have created unforgettable events with our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary btn-lg">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Vendors
                </button>
                <button className="btn-outline btn-lg text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Demo
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksSection
