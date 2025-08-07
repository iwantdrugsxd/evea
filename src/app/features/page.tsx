'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  Smartphone,
  Globe,
  Award,
  Zap,
  Users,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import SectionHeader from '@/components/common/section-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import Link from 'next/link'

export default function FeaturesPage() {
  const featureCategories = [
    {
      title: 'For Event Organizers',
      description: 'Everything you need to plan perfect events',
      features: [
        {
          icon: Search,
          title: 'Smart Vendor Discovery',
          description: 'AI-powered recommendations based on your event type, budget, and location preferences.',
          benefits: ['Advanced filtering', 'AI recommendations', 'Location-based search']
        },
        {
          icon: Calendar,
          title: 'Seamless Booking',
          description: 'Book vendors instantly with real-time availability and automatic calendar synchronization.',
          benefits: ['Real-time availability', 'Instant booking', 'Calendar integration']
        },
        {
          icon: MessageSquare,
          title: 'Direct Communication',
          description: 'Built-in messaging system to communicate directly with vendors throughout the planning process.',
          benefits: ['In-app messaging', 'File sharing', 'Order tracking']
        },
        {
          icon: BarChart3,
          title: 'Event Analytics',
          description: 'Track your event planning progress with detailed analytics and comprehensive reports.',
          benefits: ['Progress tracking', 'Budget analytics', 'Performance insights']
        }
      ]
    },
    {
      title: 'For Vendors',
      description: 'Grow your business with powerful tools',
      features: [
        {
          icon: Users,
          title: 'Customer Management',
          description: 'Comprehensive CRM to manage customer relationships and track business growth.',
          benefits: ['Lead management', 'Customer profiles', 'Communication history']
        },
        {
          icon: Calendar,
          title: 'Booking Management',
          description: 'Advanced calendar system to manage bookings, availability, and scheduling conflicts.',
          benefits: ['Availability calendar', 'Conflict prevention', 'Automated scheduling']
        },
        {
          icon: BarChart3,
          title: 'Business Analytics',
          description: 'Detailed insights into your business performance, revenue trends, and customer feedback.',
          benefits: ['Revenue tracking', 'Performance metrics', 'Growth insights']
        },
        {
          icon: CreditCard,
          title: 'Payment Processing',
          description: 'Secure payment processing with multiple payment methods and automated payouts.',
          benefits: ['Multiple payment options', 'Secure transactions', 'Automated payouts']
        }
      ]
    }
  ]

  const platformFeatures = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with SSL encryption, secure payment processing, and data protection.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in multiple Indian languages to serve diverse customer base.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second load times and instant search results.',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-white hero-pattern">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center space-x-2 bg-primary-100 px-6 py-3 rounded-full border border-primary-200 mb-8">
                <Star className="h-5 w-5 text-primary-600" />
                <span className="text-primary-700 font-semibold">Platform Features</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-heading mb-6 leading-tight">
                Powerful Features
                <span className="block text-gradient">Built for Success</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Discover the comprehensive suite of features designed to make event planning 
                effortless for organizers and profitable for vendors.
              </p>
              
              <Link href="/marketplace">
                <Button variant="primary" size="lg" className="group">
                  Try Features Now
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <section key={category.title} className={`section-padding ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container-custom">
              <SectionHeader
                title={category.title}
                description={category.description}
                centered={false}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="p-8 h-full hover-lift group border-2 hover:border-primary-200">
                      <CardContent className="p-0 space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                            <feature.icon className="h-7 w-7 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 font-heading mb-3 group-hover:text-primary-600 transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                              {feature.description}
                            </p>
                            
                            <div className="space-y-2">
                              {feature.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center space-x-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Platform Features */}
        <section className="section-padding bg-gray-900 text-white">
          <div className="container-custom">
            <SectionHeader
              badge={{
                icon: Award,
                text: "Enterprise Grade"
              }}
              title="Built for Scale"
              subtitle="& Performance"
              description="Our platform is built with enterprise-grade technology to ensure reliability, security, and performance at scale."
              className="text-white [&_.text-gradient]:text-white [&_.text-gray-600]:text-gray-300 [&_.text-primary-700]:text-primary-300 [&_.bg-primary-100]:bg-primary-600/20 [&_.border-primary-200]:border-primary-600/30"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gray-800/50 border-gray-700 hover:border-primary-600/50 text-center h-full">
                    <CardContent className="p-0 space-y-4">
                      <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto`}>
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-heading">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-red">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-heading">
                Experience All Features Today
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Join thousands of satisfied customers and vendors who are already using 
                Evea to create amazing events and grow their businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button variant="primary" size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}