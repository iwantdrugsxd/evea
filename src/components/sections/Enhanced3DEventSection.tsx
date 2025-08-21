import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';



const FloatingPartyConfetti = ({ x, y, color, shape = "square", delay = 0 }) => {
  const shapes = {
    square: "w-3 h-3 rotate-45",
    circle: "w-3 h-3 rounded-full",
    star: "w-3 h-3 star-shape"
  };

  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -5, 0],
        rotate: [0, 360],
        scale: [1, 1.3, 0.8, 1],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className={`${shapes[shape]} drop-shadow-lg`}
        style={{ 
          background: `linear-gradient(45deg, ${color}, ${color}cc)`,
          boxShadow: `2px 2px 8px rgba(0,0,0,0.3)`
        }}
      />
    </motion.div>
  );
};

const FloatingCelebrationStar = ({ x, y, delay = 0 }) => (
  <motion.div
    className="absolute pointer-events-none z-10"
    style={{ left: x, top: y }}
    animate={{
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Star className="w-6 h-6 text-blue-400 drop-shadow-xl" fill="currentColor" />
  </motion.div>
);

const FloatingGlowOrb = ({ x, y, color, size = "medium", delay = 0 }) => {
  const sizes = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-14 h-14"
  };

  return (
    <motion.div
      className="absolute pointer-events-none z-5"
      style={{ left: x, top: y }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.8, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div 
        className={`${sizes[size]} rounded-full blur-lg`}
        style={{ 
          background: `radial-gradient(circle, ${color}aa, ${color}44, transparent)`,
          boxShadow: `0 0 30px ${color}66`
        }}
      />
    </motion.div>
  );
};

const Enhanced3DEventSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-32 px-6"
    >
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <Image
          src="/logo/Remove background project-2 (1).png"
          alt="Background Pattern"
          fill
          className="object-cover blur-3xl opacity-20"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* 3D Floating Elements Layer 1 - Background */}
      <motion.div style={{ y: y3 }}>
        <FloatingGlowOrb x="5%" y="10%" color="#3b82f6" size="large" delay={0} />
        <FloatingGlowOrb x="90%" y="20%" color="#1d4ed8" size="medium" delay={2} />
        <FloatingGlowOrb x="10%" y="80%" color="#2563eb" size="small" delay={4} />
      </motion.div>

      {/* 3D Floating Elements Layer 3 - Foreground */}
      <motion.div style={{ y: y1 }}>
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
        <motion.div
          animate={{ 
            y: [0, -18, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-300 rounded-full blur-sm"
        />
        <motion.div
          animate={{ 
            y: [0, -22, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full blur-sm"
        />
      </motion.div>

      {/* Main Content Container with 3D Effects */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        whileHover={{ 
          scale: 1.02, 
          y: -10,
          rotateX: 2,
          rotateY: 2,
        }}
        className="relative w-full max-w-6xl z-20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Content */}
        <div className="relative z-10 p-16 md:p-24 text-center">
          {/* Floating micro-elements around headline */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-8 w-3 h-3 bg-blue-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-12 w-2 h-2 bg-blue-300 rounded-full"
            />
            
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
                  className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
                >
                  Plan Your Perfect Event
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
          </div>

          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto mb-12">
            From intimate gatherings to grand celebrations, our AI-powered platform helps you create unforgettable moments
          </p>

          {/* 3D Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                z: 50 
              }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Smart Planning</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  AI-powered event planning that adapts to your preferences and budget
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotateY: -5,
                z: 50 
              }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-blue-700/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Vendor Matching</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Connect with the best vendors in your area for every aspect of your event
                </p>
              </div>
            </motion.div>
          </div>

          {/* 3D CTA Button */}
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotateX: 5,
              y: -5
            }}
            whileTap={{ scale: 0.98 }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link
              href="/plan-event"
              className="relative inline-flex items-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl border border-white/20"
            >
              Start Planning
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="ml-3 w-6 h-6" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced3DEventSection;
