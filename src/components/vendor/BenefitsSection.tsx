'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Zap,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Clock,
  Globe,
  Heart
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const BenefitCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  stats, 
  color = "primary",
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  features: string[], 
  stats: { value: string, label: string },
  color?: string,
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative"
  >
    <Card className="h-full bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-8">
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

        {/* Stats Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full border border-primary-200 mb-6">
          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
          <span className="text-primary-700 font-semibold text-sm">
            {stats.value} {stats.label}
          </span>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
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

const FeatureHighlight = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start space-x-4 group"
  >
    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-6 w-6 text-primary-600" />
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
)

const TestimonialCard = ({ 
  name, 
  business, 
  quote, 
  rating, 
  revenue, 
  delay = 0 
}: { 
  name: string, 
  business: string, 
  quote: string, 
  rating: number, 
  revenue: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group"
  >
    <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-elegant hover:shadow-elegant-hover transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{name}</h4>
                <p className="text-sm text-gray-600">{business}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">{revenue}</div>
                <div className="flex items-center space-x-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic">"{quote}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Build credibility with verified customers and secure payments',
      features: [
        'Verified customer base',
        'Secure payment processing',
        'Dispute protection',
        'Insurance coverage'
      ],
      stats: { value: '99.9%', label: 'Payment Security' }
    },
    {
      icon: TrendingUp,
      title: 'Scale Your Revenue',
      description: 'Access larger markets and increase your earnings',
      features: [
        'Nationwide customer reach',
        'Premium listing options',
        'Marketing tools included',
        'Growth analytics'
      ],
      stats: { value: '300%', label: 'Average Growth' }
    },
    {
      icon: Users,
      title: 'Quality Leads',
      description: 'Get pre-qualified customers actively looking for services',
      features: [
        'AI-powered matching',
        'Pre-screened customers',
        'Real-time notifications',
        'Lead quality scoring'
      ],
      stats: { value: '50K+', label: 'Active Customers' }
    },
    {
      icon: Zap,
      title: 'Streamlined Operations',
      description: 'Manage everything efficiently in one platform',
      features: [
        'All-in-one dashboard',
        'Automated workflows',
        'Mobile app access',
        '24/7 support'
      ],
      stats: { value: '24/7', label: 'Support Available' }
    }
  ]

  const features = [
    {
      icon: DollarSign,
      title: 'Low Commission',
      description: 'Keep more of your earnings with our competitive 5% commission rate'
    },
    {
      icon: Clock,
      title: 'Quick Setup',
      description: 'Get started in under 5 minutes with our streamlined onboarding'
    },
    {
      icon: Globe,
      title: 'Multi-City Operations',
      description: 'Expand your business across multiple cities and regions'
    },
    {
      icon: Heart,
      title: 'Customer Reviews',
      description: 'Build your reputation with authentic customer feedback'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      business: 'Priya Events',
      quote: 'Evea transformed my small photography business into a full-service event company. The platform\'s reach is incredible!',
      rating: 5,
      revenue: '₹4.2L/month'
    },
    {
      name: 'Rajesh Kumar',
      business: 'Royal Catering',
      quote: 'Increased my bookings by 300% in just 3 months. The quality of customers is outstanding.',
      rating: 5,
      revenue: '₹6.8L/month'
    },
    {
      name: 'Anita Patel',
      business: 'Anita Decorations',
      quote: 'The platform is so easy to use and the support team is always helpful. Highly recommended!',
      rating: 5,
      revenue: '₹3.5L/month'
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-primary-100 px-4 py-2 rounded-full border border-primary-200 mb-6"
          >
            <Award className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm">Exclusive Benefits</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Why Vendors{' '}
            <span className="text-primary-600">Choose Evea</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of successful vendors who have transformed their business with our 
            comprehensive platform and exclusive benefits.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              features={benefit.features}
              stats={benefit.stats}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Features & Testimonials Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Features */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to{' '}
                <span className="text-primary-600">Succeed</span>
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our platform provides all the tools and features you need to grow your 
                event services business efficiently and profitably.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureHighlight
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.4 + index * 0.1}
                />
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
          </motion.div>

          {/* Right: Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What Our Vendors{' '}
              <span className="text-primary-600">Say</span>
            </h3>

            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                business={testimonial.business}
                quote={testimonial.quote}
                rating={testimonial.rating}
                revenue={testimonial.revenue}
                delay={0.6 + index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}