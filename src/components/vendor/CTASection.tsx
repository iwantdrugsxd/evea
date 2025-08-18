'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Shield, 
  Zap,
  Users,
  TrendingUp,
  Award
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

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

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  delay = 0 
}: { 
  icon: any, 
  value: string, 
  label: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="text-center group"
  >
    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-6 w-6 text-primary-600" />
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-gray-600 text-sm">{label}</div>
  </motion.div>
)

export default function CTASection() {
  const features = [
    {
      icon: Shield,
      title: 'Verified & Secure',
      description: 'Join a platform trusted by thousands of customers'
    },
    {
      icon: Zap,
      title: 'Instant Setup',
      description: 'Get started in under 5 minutes'
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Average 300% growth for vendors'
    },
    {
      icon: Users,
      title: 'Quality Customers',
      description: 'Access 50K+ active customers'
    }
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Active Vendors' },
    { icon: Star, value: '4.8★', label: 'Platform Rating' },
    { icon: TrendingUp, value: '300%', label: 'Average Growth' },
    { icon: Award, value: '₹2.5L+', label: 'Avg Monthly Revenue' }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.05),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full opacity-10"></div>
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 mb-6"
              >
                <Star className="h-4 w-4 text-primary-600" />
                <span className="text-primary-700 font-semibold text-sm">Join India's Leading Platform</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Ready to{' '}
                <span className="text-primary-600">Transform</span>
                <br />
                Your Business?
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Join 500+ successful vendors who have already transformed their event services business. 
                Start your journey today and see the difference Evea can make.
              </p>
            </div>

            {/* Features List */}
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button variant="primary" size="lg" className="group text-lg px-8 py-4">
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-gray-300 text-gray-700 hover:bg-gray-50">
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-elegant">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Platform Success Metrics
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <StatCard
                      key={stat.label}
                      icon={stat.icon}
                      value={stat.value}
                      label={stat.label}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Story Card */}
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 border-primary-600 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Priya Sharma</h4>
                    <p className="text-primary-100 text-sm mb-3">
                      "Evea transformed my small photography business into a full-service event company. 
                      The platform's reach and tools are incredible!"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-300 fill-current" />
                        ))}
                        <span className="text-xs text-primary-100 ml-2">Verified Vendor</span>
                      </div>
                      <div className="text-sm font-semibold text-white">₹4.2L/month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center space-x-8 pt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-primary-200 rounded-full border-2 border-white" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">500+ Active Vendors</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 text-sm font-medium ml-2">4.8/5 Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-elegant">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Don't Wait to Start Growing
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Every day you wait is a day you could be earning more. Join Evea today and start 
                  transforming your event services business immediately.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" className="group text-lg px-8 py-4">
                    <span>Get Started Now</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                    <span>Schedule a Demo</span>
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