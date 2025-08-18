'use client'

import { motion } from 'framer-motion'
import { 
  Star, 
  Quote, 
  ArrowLeft, 
  ArrowRight,
  Play,
  Award,
  TrendingUp,
  Users
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Button from '@/components/ui/button'

const TestimonialCard = ({ 
  name, 
  business, 
  role, 
  quote, 
  rating, 
  stats, 
  image, 
  delay = 0 
}: { 
  name: string, 
  business: string, 
  role: string, 
  quote: string, 
  rating: number, 
  stats: { value: string, label: string },
  image: string,
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group"
  >
    <Card className="h-full bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-500 group-hover:scale-[1.02] overflow-hidden">
      <CardContent className="p-8">
        {/* Quote Icon */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Quote className="h-6 w-6 text-primary-600" />
          </div>
          <div className="flex items-center space-x-1">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Quote Text */}
        <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
          "{quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-600 font-bold text-lg">{name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{business}</p>
            <p className="text-xs text-gray-500">{role}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary-600">{stats.value}</div>
            <div className="text-xs text-gray-500">{stats.label}</div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/30 group-hover:to-primary-100/20 transition-all duration-500 rounded-xl pointer-events-none" />
      </CardContent>
    </Card>
  </motion.div>
)

const VideoTestimonial = ({ 
  title, 
  description, 
  thumbnail, 
  duration, 
  delay = 0 
}: { 
  title: string, 
  description: string, 
  thumbnail: string, 
  duration: string, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group cursor-pointer"
  >
    <Card className="bg-white border-gray-200 hover:border-primary-300 shadow-elegant hover:shadow-elegant-hover transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
            <Play className="h-12 w-12 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const StatsCard = ({ 
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
    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-8 w-8 text-primary-600" />
    </div>
    <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-gray-600 font-medium">{label}</div>
  </motion.div>
)

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      business: 'Priya Events',
      role: 'Event Planner & Photographer',
      quote: 'Evea transformed my small photography business into a full-service event company. The platform\'s reach and professional tools have been incredible for growth.',
      rating: 5,
      stats: { value: '₹4.2L', label: 'Monthly Revenue' },
      image: '/testimonials/priya.jpg'
    },
    {
      name: 'Rajesh Kumar',
      business: 'Royal Catering',
      role: 'Catering Services',
      quote: 'Increased my bookings by 300% in just 3 months. The quality of customers and the platform\'s support system is outstanding.',
      rating: 5,
      stats: { value: '₹6.8L', label: 'Monthly Revenue' },
      image: '/testimonials/rajesh.jpg'
    },
    {
      name: 'Anita Patel',
      business: 'Anita Decorations',
      role: 'Event Decorator',
      quote: 'The platform is so easy to use and the support team is always helpful. I\'ve expanded to 3 cities thanks to Evea.',
      rating: 5,
      stats: { value: '₹3.5L', label: 'Monthly Revenue' },
      image: '/testimonials/anita.jpg'
    },
    {
      name: 'Suresh Reddy',
      business: 'Suresh Entertainment',
      role: 'DJ & Entertainment',
      quote: 'Best decision I made for my business. The customer quality and payment system are top-notch. Highly recommended!',
      rating: 5,
      stats: { value: '₹5.1L', label: 'Monthly Revenue' },
      image: '/testimonials/suresh.jpg'
    }
  ]

  const videoTestimonials = [
    {
      title: 'Success Story: Priya Events',
      description: 'How Priya transformed her photography business',
      thumbnail: '/videos/priya-thumb.jpg',
      duration: '3:45'
    },
    {
      title: 'Growth Journey: Royal Catering',
      description: 'Rajesh\'s 300% growth in 3 months',
      thumbnail: '/videos/rajesh-thumb.jpg',
      duration: '4:12'
    },
    {
      title: 'Platform Overview',
      description: 'See how vendors use Evea effectively',
      thumbnail: '/videos/platform-thumb.jpg',
      duration: '5:30'
    }
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Active Vendors' },
    { icon: TrendingUp, value: '300%', label: 'Average Growth' },
    { icon: Star, value: '4.8★', label: 'Platform Rating' },
    { icon: Award, value: '₹2.5L+', label: 'Avg Monthly Revenue' }
  ]

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.03),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.03),transparent_50%)]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-50 rounded-full opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-50 rounded-full opacity-15"></div>
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
            <Star className="h-4 w-4 text-primary-600" />
            <span className="text-primary-700 font-semibold text-sm">Success Stories</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Vendors{' '}
            <span className="text-primary-600">Say</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hear from successful vendors who have transformed their business with Evea. 
            Real stories, real results, real success.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              business={testimonial.business}
              role={testimonial.role}
              quote={testimonial.quote}
              rating={testimonial.rating}
              stats={testimonial.stats}
              image={testimonial.image}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Video Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Watch Success{' '}
              <span className="text-primary-600">Stories</span>
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See how our vendors are growing their businesses and hear their stories firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <VideoTestimonial
                key={video.title}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
                duration={video.duration}
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 shadow-elegant">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Ready to Join Our Success Stories?
                </h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join 500+ successful vendors who have transformed their business with Evea. 
                  Start your journey today and become the next success story.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg" className="group text-lg px-8 py-4">
                    <span>Start Your Journey</span>
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white">
                    <span>Watch More Stories</span>
                    <Play className="h-5 w-5 ml-2" />
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