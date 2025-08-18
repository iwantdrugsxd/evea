'use client'

import { motion } from 'framer-motion'
import { 
  UserPlus, 
  Settings, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const StepCard = ({ 
  step, 
  icon: Icon, 
  title, 
  description, 
  features, 
  delay = 0 
}: { 
  step: number, 
  icon: any, 
  title: string, 
  description: string, 
  features: string[], 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative"
  >
    {/* Step Number Badge */}
    <div className="absolute -top-4 -left-4 z-10">
      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
        <span className="text-white font-bold text-lg">{step}</span>
      </div>
    </div>

    <Card className="h-full bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-8 pt-12">
        {/* Icon Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8 text-primary-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.1 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-primary-600" />
              </div>
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/30 group-hover:to-primary-100/20 transition-all duration-500 rounded-xl pointer-events-none" />
      </CardContent>
    </Card>
  </motion.div>
)

const ProcessFlow = () => (
  <div className="hidden lg:flex items-center justify-between absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0 px-8">
    <div className="w-16 h-1 bg-gradient-to-r from-primary-200 to-primary-400 rounded-full" />
    <div className="w-16 h-1 bg-gradient-to-r from-primary-200 to-primary-400 rounded-full" />
    <div className="w-16 h-1 bg-gradient-to-r from-primary-200 to-primary-400 rounded-full" />
  </div>
)

const StatsCard = ({ 
  icon: Icon, 
  value, 
  label, 
  color = "primary" 
}: { 
  icon: any, 
  value: string, 
  label: string, 
  color?: string 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center group"
  >
    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-8 w-8 text-primary-600" />
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </motion.div>
)

export default function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Set up your professional vendor profile in minutes',
      features: [
        'Upload high-quality photos of your work',
        'Add detailed service descriptions',
        'Set your pricing and availability',
        'Get verified for trust and credibility'
      ]
    },
    {
      step: 2,
      icon: Settings,
      title: 'Configure Services',
      description: 'Customize your offerings and business settings',
      features: [
        'Define your service categories',
        'Set up payment methods',
        'Configure booking preferences',
        'Add your business policies'
      ]
    },
    {
      step: 3,
      icon: Calendar,
      title: 'Start Receiving Bookings',
      description: 'Begin accepting orders from customers',
      features: [
        'Get notified of new bookings instantly',
        'Review and accept customer requests',
        'Manage your calendar efficiently',
        'Communicate with clients seamlessly'
      ]
    },
    {
      step: 4,
      icon: TrendingUp,
      title: 'Scale Your Business',
      description: 'Grow your revenue and expand your reach',
      features: [
        'Track your performance analytics',
        'Get customer reviews and ratings',
        'Access marketing tools and promotions',
        'Expand to new locations and services'
      ]
    }
  ]

  const stats = [
    { icon: UserPlus, value: '5 min', label: 'Setup Time' },
    { icon: Calendar, value: '24/7', label: 'Booking Availability' },
    { icon: Star, value: '4.8★', label: 'Average Rating' },
    { icon: Zap, value: 'Instant', label: 'Payment Processing' }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.03),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.03),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-50 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-50 rounded-full opacity-15"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-primary-100 px-4 py-2 rounded-full border border-primary-200 mb-6"
          >
            <Settings className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm">Simple Process</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            How It{' '}
            <span className="text-primary-600">Works</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get started in just 4 simple steps. Our streamlined process makes it easy to 
            join thousands of successful vendors on Evea.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative mb-20">
          <ProcessFlow />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <StepCard
                key={step.step}
                step={step.step}
                icon={step.icon}
                title={step.title}
                description={step.description}
                features={step.features}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Why Vendors Love Our{' '}
            <span className="text-primary-600">Process</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-elegant">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join 500+ successful vendors who have transformed their business with Evea. 
                  Get started today and see the difference.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" className="group text-lg px-8 py-4">
                    <span>Get Started Now</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                    <span>Watch Demo</span>
                    <Zap className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}