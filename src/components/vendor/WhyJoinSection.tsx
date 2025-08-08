'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  LayoutDashboard, 
  Wallet, 
  ShieldCheck,
  TrendingUp,
  Globe,
  Clock,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Target
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const benefits = [
  {
    icon: Users,
    title: 'Reach 10x More Clients',
    description: 'Get discovered by thousands of planners for weddings, parties, corporates, and more across India.',
    stats: '50,000+ active customers',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-50 to-cyan-50',
    features: ['Nationwide reach', 'Premium listings', 'SEO optimized profiles']
  },
  {
    icon: LayoutDashboard,
    title: 'Smart Business Dashboard',
    description: 'Handle orders, showcase your portfolio, track analytics, and respond to inquiries all in one intelligent platform.',
    stats: '300% efficiency increase',
    color: 'from-purple-500 to-violet-500',
    gradient: 'from-purple-50 to-violet-50',
    features: ['Real-time analytics', 'Automated workflows', 'Mobile management']
  },
  {
    icon: Wallet,
    title: 'Transparent Earnings',
    description: 'Pay just 5% commission—one of the lowest in the industry. Keep more of what you earn.',
    stats: 'Only 5% commission',
    color: 'from-green-500 to-emerald-500',
    gradient: 'from-green-50 to-emerald-50',
    features: ['Instant payouts', 'No hidden fees', 'Growth bonuses']
  },
  {
    icon: ShieldCheck,
    title: 'Premium Verified Platform',
    description: 'We work with quality vendors and verified customers, so your services always stand out with trust.',
    stats: '99.9% payment security',
    color: 'from-orange-500 to-red-500',
    gradient: 'from-orange-50 to-red-50',
    features: ['Verified customers', 'Secure payments', 'Dispute protection']
  }
]

const additionalPerks = [
  { icon: Clock, text: '24/7 Customer Support' },
  { icon: Award, text: 'Premium Vendor Badge' },
  { icon: Globe, text: 'Multi-city Operations' },
  { icon: Star, text: 'Review Management Tools' }
]

export default function WhyJoinSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [selectedBenefit, setSelectedBenefit] = useState(0)

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
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
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-100 to-pink-100 backdrop-blur-sm px-8 py-4 rounded-full border border-red-200 shadow-lg mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="h-6 w-6 text-red-600" />
            </motion.div>
            <span className="text-red-700 font-bold text-lg">Why Choose Evea</span>
            <Zap className="h-5 w-5 text-red-500" />
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Why Join{' '}
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Evea?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join India's leading event marketplace and take your business to the next level with cutting-edge technology and unmatched opportunities.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <motion.div
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative h-full"
                >
                  {/* Gradient Border Animation */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r opacity-75 rounded-3xl blur"
                    style={{
                      background: `linear-gradient(45deg, ${benefit.color.split(' ')[1]}, ${benefit.color.split(' ')[3]})`
                    }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0.75,
                      scale: hoveredCard === index ? 1.02 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <Card className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl h-full overflow-hidden">
                    <CardContent className="p-8">
                      {/* Icon and Badge */}
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 5
                          }}
                          className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className={`bg-gradient-to-r ${benefit.gradient} px-4 py-2 rounded-full border border-gray-200`}
                        >
                          <span className="text-gray-700 font-semibold text-sm">{benefit.stats}</span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors">
                        {benefit.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3">
                        {benefit.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0"
                            >
                              <CheckCircle className="h-3 w-3 text-white" />
                            </motion.div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {hoveredCard === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-4 right-4"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center shadow-lg`}
                            >
                              <ArrowRight className="h-5 w-5 text-white" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Card Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <div className={`w-full h-full bg-gradient-to-br ${benefit.color} rounded-full blur-2xl`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Perks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Plus Additional Perks</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalPerks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/80">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                  >
                    <perk.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <p className="text-gray-700 font-semibold text-sm group-hover:text-gray-900 transition-colors">
                    {perk.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of successful vendors who've already grown their business with Evea
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}