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
  Star
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
    ],
    services: [
      { name: 'Wedding Planning', href: '/services/wedding' },
      { name: 'Corporate Events', href: '/services/corporate' },
      { name: 'Birthday Parties', href: '/services/birthday' },
      { name: 'Festivals', href: '/services/festivals' },
      { name: 'Custom Events', href: '/services/custom' },
    ],
    marketplace: [
      { name: 'Browse Vendors', href: '/marketplace' },
      { name: 'Top Rated', href: '/marketplace?sort=rating' },
      { name: 'Featured', href: '/marketplace?featured=true' },
      { name: 'Near Me', href: '/marketplace?location=nearby' },
      { name: 'Categories', href: '/categories' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faq' },
      { name: 'Vendor Support', href: '/vendor-support' },
      { name: 'Book a Demo', href: '/demo' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refund' },
      { name: 'Vendor Agreement', href: '/vendor-terms' },
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: process.env.NEXT_PUBLIC_FACEBOOK_URL },
    { name: 'Twitter', icon: Twitter, href: process.env.NEXT_PUBLIC_TWITTER_URL },
    { name: 'Instagram', icon: Instagram, href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { name: 'LinkedIn', icon: Linkedin, href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-red rounded-lg flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-2xl">E</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading">Evea</h3>
                <p className="text-sm text-gray-400 -mt-1">Event Management</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming your special moments into unforgettable experiences. 
              Connect with trusted vendors and manage your events seamlessly with our 
              professional platform.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-gray-300">+91 9999-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-gray-300">hello@evea.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary-400" />
                </div>
                <span className="text-gray-300">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Marketplace</h4>
            <ul className="space-y-2">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300">
                Get the latest updates on new vendors, exclusive offers, and event planning tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Stats */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href || '#'}
                      className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-300">4.8/5 Rating</span>
              </div>
              <div className="text-gray-300">500+ Vendors</div>
              <div className="text-gray-300">10K+ Events</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <p className="flex items-center">
                © {new Date().getFullYear()} Evea. Made with 
                <Heart className="h-4 w-4 mx-1 text-primary-500 fill-current" /> 
                in India.
              </p>
              <div className="flex space-x-6">
                {footerLinks.legal.slice(0, 3).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-white group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer