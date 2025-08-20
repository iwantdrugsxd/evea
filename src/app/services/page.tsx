'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Building2, 
  Cake, 
  Sparkles, 
  Camera, 
  Utensils,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Shield,
  Clock,
  Calendar,
  Zap
} from 'lucide-react'
import FloatingNavbar from '@/components/layout/FloatingNavbar'
import Footer from '@/components/layout/Footer'
import SectionHeader from '@/components/common/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Button from '@/components/ui/button'
import Badge from '@/components/ui/badge'
import Link from 'next/link'

export default function ServicesPage() {
  const serviceCategories = [
    {
      icon: Heart,
      name: 'Wedding Services',
      description: 'Complete wedding planning solutions from intimate ceremonies to grand celebrations',
      price: 'Starting from ₹50,000',
      popular: true,
      features: ['Venue Selection', 'Catering Services', 'Photography & Videography', 'Decoration & Themes', 'Music & Entertainment', 'Makeup & Beauty'],
      vendors: 150,
      events: 2500,
      rating: 4.9,
      image: '/images/wedding-service.jpg'
    },
    {
      icon: Building2,
      name: 'Corporate Events',
      description: 'Professional corporate event solutions for conferences, seminars, and company celebrations',
      price: 'Starting from ₹25,000',
      popular: false,
      features: ['Conference Planning', 'Venue Management', 'AV Equipment', 'Catering Solutions', 'Logistics Support', 'Team Building'],
      vendors: 120,
      events: 1800,
      rating: 4.8,
      image: '/images/corporate-event.jpg'
    },
    {
      icon: Cake,
      name: 'Birthday Parties',
      description: 'Magical birthday celebrations with themed decorations and entertainment',
      price: 'Starting from ₹15,000',
      popular: false,
      features: ['Theme Planning', 'Entertainment', 'Custom Cakes', 'Photography', 'Decoration', 'Party Games'],
      vendors: 80,
      events: 3200,
      rating: 4.7,
      image: '/images/birthday-party.jpg'
    },
    {
      icon: Sparkles,
      name: 'Special Occasions',
      description: 'Festivals, anniversaries, graduations, and milestone celebrations',
      price: 'Starting from ₹20,000',
      popular: false,
      features: ['Custom Planning', 'Cultural Events', 'Anniversary Celebrations', 'Graduation Parties', 'Religious Ceremonies', 'Festival Events'],
      vendors: 90,
      events: 1500,
      rating: 4.8,
      image: '/images/special-occasion.jpg'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Tell Us Your Vision',
      description: 'Share your event details, preferences, and budget with our planning experts'
    },
    {
      step: '02', 
      title: 'Get Matched with Vendors',
      description: 'Our AI algorithm matches you with verified vendors that fit your requirements'
    },
    {
      step: '03',
      title: 'Compare & Book',
      description: 'Review proposals, compare options, and book your preferred vendors instantly'
    },
    {
      step: '04',
      title: 'Enjoy Your Event',
      description: 'Relax while our vendors deliver exceptional service for your special day'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <FloatingNavbar />
      
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
                <span className="text-primary-700 font-semibold">Our Services</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 font-heading mb-6 leading-tight">
                Professional Event Services
                <span className="block text-gradient">For Every Occasion</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                From intimate celebrations to grand corporate events, we provide comprehensive 
                solutions with verified vendors, transparent pricing, and seamless coordination.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="primary" size="lg" className="group">
                    Browse Vendors
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {serviceCategories.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="service-card group h-full overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <service.icon className="h-8 w-8 text-primary-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl group-hover:text-primary-600 transition-colors">
                              {service.name}
                            </CardTitle>
                            {service.popular && (
                              <Badge variant="primary" className="mt-1">
                                Most Popular
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary-600">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Service Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{service.vendors} vendors</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{service.events} events</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">{service.rating}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link href="/marketplace" className="block">
                        <Button variant="outline" className="w-full group">
                          Explore {service.name}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeader
              badge={{
                icon: Zap,
                text: "How It Works"
              }}
              title="Simple 4-Step Process"
              description="Get your event planned and executed with our streamlined process that saves you time and ensures quality."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-primary-200 z-0">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary-400 rounded-full"></div>
                    </div>
                  )}

                  <Card className="text-center p-6 hover-lift relative z-10">
                    <CardContent className="p-0 space-y-4">
                      {/* Step Number */}
                      <div className="w-16 h-16 bg-primary-600 text-white rounded-2xl flex items-center justify-center mx-auto text-xl font-bold font-heading">
                        {step.step}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 font-heading">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}