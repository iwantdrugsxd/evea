'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  ArrowUp,
  Star,
  Clock,
  Shield
} from 'lucide-react'
import { navigationData, contactInfo } from '@/data/content'
import Button from '@/components/ui/button'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons = {
    Facebook,
    Twitter, 
    Instagram,
    LinkedIn: Linkedin
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="w-full px-0 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold font-heading mb-4">
                Stay Updated with Event Trends
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get the latest event planning tips, vendor recommendations, and exclusive 
                offers delivered to your inbox every week.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                suppressHydrationWarning
              />
              <Button variant="primary" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-red rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-primary-600 font-bold text-2xl font-heading">E</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-600 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading">Evea</h3>
                  <p className="text-sm text-gray-400 -mt-1">Event Management</p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Transforming your special moments into unforgettable experiences. 
                Connect with trusted vendors and manage your events seamlessly with 
                India's most professional event management platform.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">{contactInfo.phone}</div>
                    <div className="text-sm text-gray-500">{contactInfo.businessHours}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">{contactInfo.email}</div>
                    <div className="text-sm text-gray-500">General Inquiries</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">{contactInfo.address}</div>
                    <div className="text-sm text-gray-500">Headquarters</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links Columns */}
          {Object.entries(navigationData.footer).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 font-heading capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 font-medium block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-primary-400" />
              <div>
                <div className="font-semibold text-white">Verified Vendors</div>
                <div className="text-sm text-gray-400">100% Background Checked</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-primary-400" />
              <div>
                <div className="font-semibold text-white">24/7 Support</div>
                <div className="text-sm text-gray-400">Always Here to Help</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-primary-400" />
              <div>
                <div className="font-semibold text-white">Top Rated Platform</div>
                <div className="text-sm text-gray-400">4.8/5 Customer Rating</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media & Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Follow us:</span>
              <div className="flex space-x-4">
                {navigationData.social.map((social) => {
                  const IconComponent = socialIcons[social.name as keyof typeof socialIcons]
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-12 h-12 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 group hover:scale-105"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-300 font-medium">4.8/5 Rating</span>
              </div>
              <div className="text-gray-300 font-medium">500+ Vendors</div>
              <div className="text-gray-300 font-medium">10K+ Events</div>
            </div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-all duration-200 group hover:scale-105"
              aria-label="Scroll to top"
              suppressHydrationWarning
            >
              <ArrowUp className="h-5 w-5 text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="w-full px-0 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p className="flex items-center font-medium">
                © {new Date().getFullYear()} Evea. Made with 
                <Heart className="h-4 w-4 mx-1 text-primary-500 fill-current" /> 
                in India.
              </p>
              <div className="flex space-x-6">
                {navigationData.footer.legal.slice(0, 3).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-primary-400 transition-colors duration-200 font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: August 2025</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer