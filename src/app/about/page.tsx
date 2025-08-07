'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  Globe, 
  Heart,
  Target,
  Lightbulb,
  Shield,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/common/SectionHeader'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'
import AnimatedCounter from '@/components/common/AnimatedCounter'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers and their special moments at the center.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We maintain the highest standards of vendor verification and transparent pricing.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology and user feedback.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering exceptional experiences that exceed expectations.'
    }
  ]

  const milestones = [
    { year: '2022', title: 'Company Founded', description: 'Started with a vision to transform event planning' },
    { year: '2023', title: '100 Vendors', description: 'Reached our first major vendor milestone' },
    { year: '2024', title: 'Award Winner', description: 'Recognized as Best Event Platform' },
    { year: '2025', title: '500+ Vendors', description: 'Expanded across 25+ cities in India' }
  ]

  const stats = [
    { number: 10000, label: 'Events Completed', suffix: '+' },
    { number: 500, label: 'Verified Vendors', suffix: '+' },
    { number: 25, label: 'Cities Covered', suffix: '+' },
    { number: 98, label: 'Satisfaction Rate', suffix: '%' }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-white hero-pattern">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center space-x-2 bg-primary-100 px-6 py-3 rounded-full border border-primary-200">
                  <Users className="h-5 w-5 text-primary-600" />
                  <span className="text-primary-700 font-semibold">About Evea</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-heading leading-tight">
                  Transforming Events
                  <span className="block text-gradient">Across India</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  We're on a mission to make event planning accessible, affordable, and stress-free 
                  for everyone. From intimate gatherings to grand celebrations, we connect you with 
                  India's most trusted vendors.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    To democratize event planning by creating India's most comprehensive, 
                    trusted, and user-friendly platform that connects event organizers 
                    with verified professional vendors.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We believe every celebration deserves to be perfect, regardless of budget 
                    or scale. Our platform eliminates the traditional barriers of event planning 
                    by providing transparency, quality assurance, and seamless coordination.
                  </p>
                </div>
                
                <Link href="/marketplace">
                  <Button variant="primary" size="lg" className="group">
                    See Our Platform
                    <TrendingUp className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="stats-card text-center">
                      <CardContent className="p-6">
                        <div className="text-3xl font-bold text-primary-600 mb-2 font-heading">
                          <AnimatedCounter 
                            end={stat.number} 
                            suffix={stat.suffix}
                            duration={2}
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <SectionHeader
              badge={{
                icon: Heart,
                text: "Our Values"
              }}
              title="What Drives Us"
              description="The core principles that guide everything we do and every decision we make."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 text-center hover-lift">
                    <CardContent className="p-0 space-y-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto">
                        <value.icon className="h-8 w-8 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 font-heading">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              badge={{
                icon: Clock,
                text: "Our Journey"
              }}
              title="Building the Future"
              subtitle="Step by Step"
              description="From a simple idea to India's leading event management platform."
            />

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 rounded-full"></div>

                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    } mb-16`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-md z-10"></div>

                    {/* Content Card */}
                    <Card className={`w-80 ${index % 2 === 0 ? 'mr-8' : 'ml-8'} hover-lift`}>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary-600 mb-2 font-heading">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary-600 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-heading">
                Ready to Join Our Journey?
              </h2>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Be part of India's fastest-growing event management community and 
                help us create unforgettable experiences for millions of people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="secondary" size="lg">
                    Start Planning
                  </Button>
                </Link>
                <Link href="/vendor">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                    Become a Vendor
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