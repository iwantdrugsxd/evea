'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Zap,
  Star,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const BenefitCard = ({ 
  icon: Icon, 
  title, 
  description, 
  stats, 
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  stats?: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -4 }}
    className="group"
  >
    <Card className="h-full bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
            {stats && (
              <div className="text-2xl font-bold text-primary-600">{stats}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const FeatureItem = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any, 
  title: string, 
  description: string 
}) => (
  <div className="flex items-start space-x-3">
    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
      <CheckCircle className="h-4 w-4 text-primary-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
)

export default function WhyJoinSection() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Scale Your Revenue',
      description: 'Access a larger customer base and increase your bookings with our advanced marketplace platform.',
      stats: '300% Average Growth'
    },
    {
      icon: Users,
      title: 'Reach More Customers',
      description: 'Connect with thousands of potential clients actively looking for event services.',
      stats: '50K+ Active Users'
    },
    {
      icon: Shield,
      title: 'Trusted & Verified',
      description: 'Build credibility with our verification system and customer reviews.',
      stats: '4.8★ Rating'
    },
    {
      icon: Zap,
      title: 'Streamlined Operations',
      description: 'Manage bookings, payments, and client communications all in one place.',
      stats: '24/7 Support'
    }
  ]

  const features = [
    {
      icon: Award,
      title: 'Professional Profile',
      description: 'Showcase your services with high-quality photos and detailed descriptions'
    },
    {
      icon: Star,
      title: 'Customer Reviews',
      description: 'Build trust with authentic reviews from satisfied customers'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track your performance and optimize your business with detailed insights'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Get paid securely and quickly with our integrated payment system'
    }
  ]

  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full opacity-20"></div>
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-primary-100 px-4 py-2 rounded-full border border-primary-200 mb-6"
          >
            <TrendingUp className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm">Why Choose Evea</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Why Vendors Choose{' '}
            <span className="text-primary-600">Evea</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful vendors who have transformed their event services business 
            with our comprehensive platform.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              stats={benefit.stats}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Everything You Need to{' '}
              <span className="text-primary-600">Succeed</span>
            </h3>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <FeatureItem
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-6"
            >
              <Button variant="primary" size="lg" className="group">
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="bg-white border-primary-200 shadow-elegant">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <h4 className="text-2xl font-bold text-gray-900">Vendor Success Metrics</h4>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">₹2.5L+</div>
                      <div className="text-sm text-gray-600">Average Monthly Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">300%</div>
                      <div className="text-sm text-gray-600">Average Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">4.8★</div>
                      <div className="text-sm text-gray-600">Platform Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Verified Success</h4>
                    <p className="text-gray-700 text-sm">
                      "Evea helped me scale from a small photography business to a full-service event company. 
                      The platform's reach and tools are incredible."
                    </p>
                    <div className="flex items-center mt-3">
                      <span className="text-sm font-semibold text-primary-600">- Priya Events</span>
                      <span className="text-xs text-gray-500 ml-2">Verified Vendor</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}