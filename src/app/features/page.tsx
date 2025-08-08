'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/Footer'
import FeaturesHeroSection from '@/components/features/HeroSection'
import FeatureShowcaseSection from '@/components/features/FeatureShowcaseSection'
import InteractiveDemoSection from '@/components/features/InteractiveDemoSection'
import ComparisonSection from '@/components/features/ComparisonSection'
import IntegrationsSection from '@/components/features/IntegrationsSection'
import SocialProofSection from '@/components/features/SocialProofSection'
import FeaturesCTASection from '@/components/features/CTASection'

export default function FeaturesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 relative overflow-hidden"
    >
      {/* Professional Red Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.08),transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent_70%)]" />
      </div>
      
      {/* Professional Red Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <Header />
      
      <main className="relative z-10">
        <FeaturesHeroSection />
        <FeatureShowcaseSection />
        <InteractiveDemoSection />
        <ComparisonSection />
        <IntegrationsSection />
        <SocialProofSection />
        <FeaturesCTASection />
      </main>

      <Footer />
    </motion.div>
  )
}