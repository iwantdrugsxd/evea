'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Star, 
  Users, 
  Calendar, 
  Sparkles,
  CheckCircle,
  ChevronDown,
  Quote,
  Award,
  Zap
} from 'lucide-react';
import FloatingNavbar from '@/components/layout/FloatingNavbar';
import AnimatedBackground from '@/components/3d/AnimatedBackground';
import DividerLayout from '@/components/layout/DividerLayout';
import AnimatedSection from '@/components/layout/AnimatedSection';
import { FloatingObject, Balloon, Confetti, SpotlightBeam, AbstractShape } from '@/components/animations/FloatingObjects';
import GlassCard from '@/components/ui/GlassCard';
import AppleButton from '@/components/ui/AppleButton';
import Enhanced3DEventSection from '@/components/sections/Enhanced3DEventSection';
import Footer from '@/components/layout/Footer';

// Hero background component with local images
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-purple-900/60 z-10"></div>
      <Image
        src="/images/hero/landin page hero.png"
        alt="Event Planning Hero"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: {
  end: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, role, company, avatar, rating = 5 }: {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
    >
      <div className="flex items-center mb-6">
        <div className="flex text-yellow-400">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>
      <Quote className="w-8 h-8 text-blue-400 mb-4" />
      <p className="text-lg text-white/90 mb-6 leading-relaxed">{quote}</p>
      <div className="flex items-center">
        <Image
          src={avatar}
          alt={author}
          width={48}
          height={48}
          className="rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-white">{author}</p>
          <p className="text-white/70 text-sm">{role} at {company}</p>
        </div>
      </div>
    </motion.div>
  );
};



// Service package component
const ServicePackage = ({ title, price, features, popular = false, delay = 0 }: {
  title: string;
  price: number;
  features: string[];
  popular?: boolean;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-300 ${
        popular 
          ? 'border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <div className="text-4xl font-bold text-white mb-2">
          ₹{price.toLocaleString()}
        </div>
        <p className="text-white/70">per event</p>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/90">
            <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        href="/plan-event"
        className={`block w-full text-center py-4 rounded-xl font-semibold transition-all duration-300 ${
          popular
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default function LandingPage() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Hero content with storytelling
  const heroContent = [
    {
      title: "Revolutionize Your Events with AI Magic",
      subtitle: "Stop dreaming, start creating! Our cutting-edge platform turns your wildest event ideas into reality in record time",
      cta: "Start Creating Magic",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    },
    {
      title: "Unlock Your Event Empire",
      subtitle: "Join the elite circle of event professionals who've discovered the secret to flawless execution and skyrocketing profits",
      cta: "Claim Your Success",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    },
    {
      title: "Master the Art of Event Domination",
      subtitle: "From concept to celebration, we give you the superpowers to create events that leave everyone speechless",
      cta: "Become a Legend",
      stats: { events: 5000, vendors: 2000, satisfaction: 98 }
    }
  ];

  // Auto-rotate hero content
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <FloatingNavbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <HeroBackground />
        
        {/* Floating Objects */}
        <FloatingObject className="top-20 left-10" speed={0.5} delay={0.5}>
          <Balloon color="blue" size="large" />
        </FloatingObject>
        
        <FloatingObject className="top-32 right-20" speed={0.8} delay={1} direction="right">
          <Balloon color="purple" size="medium" />
        </FloatingObject>
        
        <FloatingObject className="bottom-40 left-20" speed={0.6} delay={1.5}>
          <AbstractShape type="circle" color="blue" />
        </FloatingObject>
        
        <FloatingObject className="top-1/2 right-10" speed={0.7} delay={2}>
          <SpotlightBeam color="purple" />
        </FloatingObject>
        
        <FloatingObject className="bottom-20 right-1/3" speed={0.4} delay={2.5}>
          <Confetti color="blue" />
        </FloatingObject>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          {/* Hero Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(59, 130, 246, 0.8)",
                        "0 0 40px rgba(59, 130, 246, 1)",
                        "0 0 60px rgba(59, 130, 246, 0.8)",
                        "0 0 20px rgba(59, 130, 246, 0.8)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  >
                    {heroContent[currentHeroIndex].title}
                  </motion.div>
                  {/* Glow effect behind text */}
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"
                  />
                </div>
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  {heroContent[currentHeroIndex].subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 mb-12"
              >
                <AppleButton
                  href="/plan-event"
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Plan Event
                </AppleButton>
                
                <AppleButton
                  href="/vendor/register"
                  variant="gradient"
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Start Selling
                </AppleButton>
              </motion.div>


            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[600px] flex items-center justify-center"
            >
              {/* Illuminated Visual Element */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
              </motion.div>
              
              {/* Floating Light Particles */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-32 right-32 w-1 h-1 bg-purple-400 rounded-full blur-sm"
              />
              <motion.div
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
                className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full blur-sm"
              />
            </motion.div>
          </div>

          {/* Enhanced Glass Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center hover:border-white/40 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-3">
                    <AnimatedCounter end={5000} suffix="+" />
                  </div>
                  <p className="text-white/80 text-lg font-medium">Events Planned</p>
                  <p className="text-white/60 text-sm mt-2">Successfully executed</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center hover:border-white/40 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-3">
                    <AnimatedCounter end={2000} suffix="+" />
                  </div>
                  <p className="text-white/80 text-lg font-medium">Verified Vendors</p>
                  <p className="text-white/60 text-sm mt-2">Background checked</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-center hover:border-white/40 transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-3">
                    <AnimatedCounter end={98} suffix="%" />
                  </div>
                  <p className="text-white/80 text-lg font-medium">Satisfaction Rate</p>
                  <p className="text-white/60 text-sm mt-2">Customer happiness</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* For Every Moment Section */}
      <AnimatedSection direction="left-to-right" delay={0}>
        <section className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
                             className="text-center mb-20"
             >
 
               <div className="relative">
                 <motion.div
                   animate={{ 
                     textShadow: [
                       "0 0 20px rgba(59, 130, 246, 0.8)",
                       "0 0 40px rgba(59, 130, 246, 1)",
                       "0 0 60px rgba(59, 130, 246, 0.8)",
                       "0 0 20px rgba(59, 130, 246, 0.8)"
                     ]
                   }}
                   transition={{ 
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="text-4xl md:text-6xl font-bold text-white mb-6"
                 >
                   For every moment
                 </motion.div>
                 <motion.div
                   animate={{ 
                     opacity: [0.3, 0.8, 0.3],
                     scale: [0.95, 1.05, 0.95]
                   }}
                   transition={{ 
                     duration: 4,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"
                 />
               </div>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Weddings, Birthdays, Corporate Events, Concerts
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Wedding Card */}
              <GlassCard delay={0.1} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-2xl mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Wedding"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Weddings</h3>
                <p className="text-white/70">Magical moments, perfectly planned.</p>
              </GlassCard>

              {/* Corporate Card */}
              <GlassCard delay={0.2} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-2xl mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Corporate Event"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Corporate</h3>
                <p className="text-white/70">Professional events that impress.</p>
              </GlassCard>

              {/* Birthday Card */}
              <GlassCard delay={0.3} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-2xl mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Birthday Celebration"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Birthdays</h3>
                <p className="text-white/70">Celebrations that create memories.</p>
              </GlassCard>

              {/* Concert Card */}
              <GlassCard delay={0.4} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden rounded-2xl mb-6">
                  <Image
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Concert"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Concerts</h3>
                <p className="text-white/70">Live experiences, amplified.</p>
              </GlassCard>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection direction="left-to-right" delay={0}>
        <section className="py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
                             <div className="relative">
                 <motion.div
                   animate={{ 
                     textShadow: [
                       "0 0 20px rgba(59, 130, 246, 0.8)",
                       "0 0 40px rgba(59, 130, 246, 1)",
                       "0 0 60px rgba(59, 130, 246, 0.8)",
                       "0 0 20px rgba(59, 130, 246, 0.8)"
                     ]
                   }}
                   transition={{ 
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="text-4xl md:text-6xl font-bold mb-6"
                 >
                   How It Works
                 </motion.div>
                 <motion.div
                   animate={{ 
                     opacity: [0.3, 0.8, 0.3],
                     scale: [0.95, 1.05, 0.95]
                   }}
                   transition={{ 
                     duration: 4,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"
                 />
               </div>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Our AI-powered platform streamlines every aspect of event planning, from initial concept to flawless execution
              </p>
            </motion.div>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <GlassCard delay={0.1} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Plan & Design</h3>
              <p className="text-white/70 leading-relaxed">
                Use our AI planner to create your perfect event. Get personalized recommendations for venues, vendors, and timelines.
              </p>
            </GlassCard>

            <GlassCard delay={0.2} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect & Coordinate</h3>
              <p className="text-white/70 leading-relaxed">
                Connect with verified vendors, manage communications, and coordinate all aspects through our integrated platform.
              </p>
            </GlassCard>

            <GlassCard delay={0.3} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Execute & Celebrate</h3>
              <p className="text-white/70 leading-relaxed">
                Monitor everything in real-time, manage guest experiences, and ensure your event is executed flawlessly.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
      </AnimatedSection>



      {/* Service Packages Section */}
      <AnimatedSection direction="left-to-right" delay={0}>
        <section className="py-32 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto px-4">
              <motion.div
            initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Flexible packages designed to meet every event planning need
            </p>
              </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ServicePackage
              title="Starter"
              price={15000}
              features={[
                "AI Event Planning",
                "Vendor Recommendations",
                "Basic Timeline Management",
                "Email Support",
                "Up to 50 Guests"
              ]}
              delay={0.1}
            />
            <ServicePackage
              title="Professional"
              price={35000}
              features={[
                "Everything in Starter",
                "Full Vendor Coordination",
                "Real-Time Analytics",
                "Priority Support",
                "Up to 200 Guests",
                "Custom Branding"
              ]}
              popular={true}
              delay={0.2}
            />
            <ServicePackage
              title="Enterprise"
              price={75000}
              features={[
                "Everything in Professional",
                "Dedicated Event Manager",
                "Advanced Analytics",
                "24/7 Support",
                "Unlimited Guests",
                "Custom Integrations"
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>
      </AnimatedSection>

              {/* Enhanced 3D Event Planning Section */}
        <AnimatedSection direction="right-to-left" delay={0}>
          <Enhanced3DEventSection />
        </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection direction="left-to-right" delay={0}>
        <section className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
                             <div className="relative">
                 <motion.div
                   animate={{ 
                     textShadow: [
                       "0 0 20px rgba(59, 130, 246, 0.8)",
                       "0 0 40px rgba(59, 130, 246, 1)",
                       "0 0 60px rgba(59, 130, 246, 0.8)",
                       "0 0 20px rgba(59, 130, 246, 0.8)"
                     ]
                   }}
                   transition={{ 
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="text-4xl md:text-6xl font-bold mb-6"
                 >
                   What Our Clients Say
                 </motion.div>
                 <motion.div
                   animate={{ 
                     opacity: [0.3, 0.8, 0.3],
                     scale: [0.95, 1.05, 0.95]
                   }}
                   transition={{ 
                     duration: 4,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                   className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-3xl -z-10"
                 />
               </div>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Join thousands of satisfied customers who've created unforgettable events
              </p>
            </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                         <Testimonial
               quote="Evea transformed our wedding planning experience. The AI recommendations were spot-on, and everything was executed flawlessly."
               author="Priya & Raj"
               role="Newlyweds"
               company="Personal"
               avatar="/images/hero/theme.jpeg"
               rating={5}
             />
             <Testimonial
               quote="As a corporate event planner, Evea has revolutionized how we manage large-scale events. The analytics and coordination tools are incredible."
               author="Sarah Johnson"
               role="Event Director"
               company="TechCorp"
               avatar="/images/hero/Fotos Plateia _ Freepik.jpeg"
               rating={5}
             />
             <Testimonial
               quote="The vendor marketplace is a game-changer. We found the perfect photographer and caterer within hours, and the quality was exceptional."
               author="Amit Patel"
               role="Business Owner"
               company="StartupXYZ"
               avatar="/images/hero/_ (3).jpeg"
               rating={5}
             />
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection direction="right-to-left" delay={0}>
        <section className="py-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
                              <div className="relative">
                  <motion.div
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(255, 255, 255, 0.8)",
                        "0 0 40px rgba(255, 255, 255, 1)",
                        "0 0 60px rgba(255, 255, 255, 0.8)",
                        "0 0 20px rgba(255, 255, 255, 0.8)"
                      ]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6"
                  >
                    Ready to Create Something Extraordinary?
                  </motion.div>
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.95, 1.05, 0.95]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-blue-500/20 to-white/20 blur-3xl -z-10"
                  />
                </div>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of event planners who trust Evea to make their events unforgettable
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                             <Link
                 href="/plan-event"
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
               >
                Start Planning Now
                <ArrowRight className="ml-2 w-5 h-5" />
               </Link>
              <Link
                href="/marketplace"
                className="bg-white/20 backdrop-blur-lg text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Explore Vendors
              </Link>
              <Link
                href="/vendor/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center"
              >
                Start Selling
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </AnimatedSection>
      <Footer />
    </div>
  );
}