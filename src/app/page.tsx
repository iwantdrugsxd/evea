'use client'

import { useIntersectionObserver } from '@/hooks/use-intersection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/landing/HeroSection'
import ServicesSection from '@/components/landing/FeaturesSection'
import EventCategoriesSection from '@/components/landing/EventCategoriesSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import StatsSection from '@/components/landing/StatsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import CTASection from '@/components/landing/CTASection'

export default function HomePage() {
  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="space-y-0 overflow-hidden">
        {/* Hero Section - Light Background */}
        <HeroSection />
        
        {/* Services Section - Light Background */}
        <ServicesSection />
        
        {/* Event Categories Section - Light Background */}
        <EventCategoriesSection />
        
        {/* How It Works Section - Light Background */}
        <HowItWorksSection />
        
        {/* Stats Section - Light Background */}
        <StatsSection />
        
        {/* Testimonials Section - Light Background */}
        <TestimonialsSection />
        
        {/* CTA Section - Light Background */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}