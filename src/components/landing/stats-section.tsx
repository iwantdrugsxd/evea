'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Calendar, 
  MapPin, 
  Star,
  TrendingUp,
  Award,
  Clock,
  Shield
} from 'lucide-react'
import { siteContent } from '@/data/content'
import SectionHeader from '@/components/common/section-header'
import AnimatedCounter from '@/components/common/animated-counter'
import { Card, CardContent } from '@/components/ui/card'

const StatsSection = () => {
  const { stats } = siteContent

  const iconMap = {
    Users, Calendar, MapPin, Star
  }

  const achievements = [
    {
      icon: Award,
      title: "Best Event Platform 2024",
      description: "EventTech Awards Winner"
    },
    {
      icon: Shield,
      title: "ISO 27001 Certified",
      description: "Enterprise Security Standards"
    },
    {
      icon: TrendingUp,
      title: "300% Growth Rate",
      description: "Year-over-Year Expansion"
    },
    {
      icon: Clock,
      title: "99.9% Uptime",
      description: "Reliable Platform Performance"
    }
  ]

  return (
    <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge={{
            icon: TrendingUp,
            text: "Our Impact"
          }}
          title={stats.title}
          subtitle={stats.subtitle}
          description={stats.description}
          className="text-white [&_.text-gradient]:text-white [&_.text-gray-600]:text-gray-300 [&_.text-primary-700]:text-primary-300 [&_.bg-primary-100]:bg-primary-600/20 [&_.border-primary-200]:border-primary-600/30"
        />

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.data.map((stat, index) => {
            const IconComponent = iconMap[stat.label.includes('Vendor') ? 'Users' : stat.label.includes('Events') ? 'Calendar' : stat.label.includes('Cities') ? 'MapPin' : 'Star']
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="stats-card bg-gray-800/50 border-gray-700 hover:border-primary-600/50 text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-primary-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-4xl lg:text-5xl font-bold text-white font-heading">
                        <AnimatedCounter 
                          end={stat.number} 
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      </div>
                      <div className="text-lg font-semibold text-gray-300">{stat.label}</div>
                      <div className="text-sm text-gray-400">{stat.description}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
              Recognized Excellence
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our commitment to quality and innovation has earned recognition from industry leaders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gray-800/30 border-gray-700 hover:border-primary-600/50 hover:bg-gray-800/50 transition-all duration-300 text-center h-full">
                  <CardContent className="p-0">
                    <achievement.icon className="h-8 w-8 text-primary-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2 font-heading">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection