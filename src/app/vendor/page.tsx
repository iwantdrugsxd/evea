'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import VendorHeroSection from '@/components/vendor/HeroSection'
import WhyJoinSection from '@/components/vendor/WhyJoinSection'
import HowItWorksSection from '@/components/vendor/HowItWorksSection'
import BenefitsSection from '@/components/vendor/BenefitsSection'
import TestimonialsSection from '@/components/vendor/TestimonialsSection'
import CTASection from '@/components/vendor/CTASection'

export default function VendorLandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>
      
      <Header />
      
      <main className="relative z-10">
        <VendorHeroSection />
        <WhyJoinSection />
        <HowItWorksSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </motion.div>
  )
}