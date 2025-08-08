'use client'

import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Play,
  Building,
  Globe,
  Zap,
  Shield,
  Heart,
  Target,
  Sparkles
} from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import CountUp from 'react-countup'

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Operations",
    company: "TechFlow Inc.",
    industry: "Technology",
    rating: 5,
    content: "Evea transformed our entire workflow. The AI-powered insights helped us increase productivity by 40% and reduce operational costs significantly. The integration process was seamless.",
    metrics: { improvement: "40%", timeframe: "3 months", category: "Productivity" },
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    companyLogo: "🚀",
    featured: true
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    company: "DataVault Solutions",
    industry: "FinTech",
    rating: 5,
    content: "Security and compliance were our top concerns. Evea's enterprise-grade security features and SOC 2 certification gave us the confidence to migrate our entire infrastructure.",
    metrics: { improvement: "99.9%", timeframe: "6 months", category: "Uptime" },
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    companyLogo: "🏦",
    featured: false
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Marketing Director",
    company: "GrowthLab Agency",
    industry: "Marketing",
    rating: 5,
    content: "The real-time analytics and customizable dashboards have revolutionized how we track campaign performance. Our clients love the transparency and detailed reporting.",
    metrics: { improvement: "65%", timeframe: "4 months", category: "ROI" },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    companyLogo: "📈",
    featured: false
  },
  {
    id: 4,
    name: "David Park",
    role: "Founder & CEO",
    company: "InnovateCorp",
    industry: "Startup",
    rating: 5,
    content: "As a fast-growing startup, we needed a platform that could scale with us. Evea's flexible architecture and comprehensive API ecosystem made integration effortless.",
    metrics: { improvement: "300%", timeframe: "8 months", category: "Growth" },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    companyLogo: "💡",
    featured: true
  },
  {
    id: 5,
    name: "Lisa Zhang",
    role: "Operations Manager",
    company: "RetailMax",
    industry: "E-commerce",
    rating: 5,
    content: "The automation features saved us countless hours of manual work. Our team can now focus on strategic initiatives instead of repetitive tasks. Game changer!",
    metrics: { improvement: "50%", timeframe: "5 months", category: "Efficiency" },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    companyLogo: "🛒",
    featured: false
  }
]

const companyLogos = [
  { name: "TechFlow", logo: "🚀", industry: "Technology" },
  { name: "DataVault", logo: "🏦", industry: "FinTech" },
  { name: "GrowthLab", logo: "📈", industry: "Marketing" },
  { name: "InnovateCorp", logo: "💡", industry: "Startup" },
  { name: "RetailMax", logo: "🛒", industry: "E-commerce" },
  { name: "HealthTech", logo: "⚕️", industry: "Healthcare" },
  { name: "EduSoft", logo: "📚", industry: "Education" },
  { name: "CloudNine", logo: "☁️", industry: "Cloud Services" }
]

const achievements = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Happy Customers',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '/5',
    decimals: 1,
    label: 'Average Rating',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Award,
    value: 15,
    suffix: '+',
    label: 'Industry Awards',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'Uptime SLA',
    color: 'from-green-500 to-emerald-500'
  }
]

const TestimonialCard = ({ testimonial, isActive, onClick }: {
  testimonial: typeof testimonials[0],
  isActive: boolean,
  onClick: () => void
}) => {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      transitionSpeed={1000}
    >
      <motion.div
        onClick={onClick}
        className={`cursor-pointer transition-all duration-500 ${
          isActive ? 'scale-100' : 'scale-95 opacity-80'
        }`}
        whileHover={{ scale: isActive ? 1 : 0.98 }}
      >
        {testimonial.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-3 -right-3 z-10"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Featured</span>
            </div>
          </motion.div>
        )}
        
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-20"
          animate={{
            opacity: isActive ? 0.4 : 0.2,
            scale: isActive ? 1.02 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-2xl overflow-hidden h-full">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
          </div>
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </motion.div>
              
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                <p className="text-purple-600 font-semibold">{testimonial.role}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl">{testimonial.companyLogo}</span>
                  <span className="text-gray-600 text-sm">{testimonial.company}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {testimonial.industry}
              </span>
            </div>
          </div>
          
          {/* Quote */}
          <div className="relative mb-6">
            <Quote className="h-8 w-8 text-purple-200 absolute -top-2 -left-2" />
            <blockquote className="text-gray-700 leading-relaxed pl-6 italic text-lg">
              "{testimonial.content}"
            </blockquote>
          </div>
          
          {/* Metrics */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-purple-600 text-xl">{testimonial.metrics.improvement}</div>
                <div className="text-xs text-gray-600">{testimonial.metrics.category}</div>
              </div>
              <div>
                <div className="font-bold text-green-600 text-xl">{testimonial.metrics.timeframe}</div>
                <div className="text-xs text-gray-600">Implementation</div>
              </div>
              <div>
                <div className="font-bold text-blue-600 text-xl">A+</div>
                <div className="text-xs text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}

const AchievementCard = ({ achievement, index }: {
  achievement: typeof achievements[0],
  index: number
}) => {
  const Icon = achievement.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>
        
        <div className="text-3xl font-bold text-gray-900 mb-2">
          <CountUp
            end={achievement.value}
            decimals={achievement.decimals || 0}
            duration={2.5}
            suffix={achievement.suffix}
          />
        </div>
        <p className="text-gray-600 font-medium">{achievement.label}</p>
      </div>
    </motion.div>
  )
}

export default function SocialProofSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section 
      ref={containerRef}
      className="section-padding bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full blur-3xl" />
      </motion.div>

      <div className="container-custom relative z-10">
        {/* Header */}
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
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 backdrop-blur-sm px-8 py-4 rounded-full border border-purple-200 shadow-lg mb-8"
          >
            <Heart className="h-6 w-6 text-purple-600" />
            <span className="text-purple-700 font-bold text-lg">Customer Success</span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of successful businesses that have transformed their operations 
            and achieved remarkable results with Evea's powerful platform.
          </p>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <p className="text-center text-gray-500 mb-8 font-medium">
            Trusted by 50,000+ companies worldwide
          </p>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {company.logo}
                </div>
                <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                  {company.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.label}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h3>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/50 shadow-lg hover:shadow-xl transition-all"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/50 shadow-lg hover:shadow-xl transition-all"
              >
                <ArrowRight className="h-5 w-5 text-gray-600" />
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === activeTestimonial}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Video Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 cursor-pointer shadow-2xl"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4">
                Watch Customer Success Stories
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Hear directly from our customers about how Evea transformed their businesses 
                and helped them achieve extraordinary results.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Play Video</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
