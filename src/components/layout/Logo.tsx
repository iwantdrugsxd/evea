'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: '3d' | 'classic';
}

export default function Logo({ size = 'md', showText = false, className = "", variant = '3d' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  if (variant === '3d') {
    return (
      <motion.div 
        className={`flex items-center space-x-3 group ${className}`}
        whileHover={{ scale: 1.05, y: -2 }}
        animate={{
          y: [0, -2, 0]
        }}
        transition={{ 
          duration: 0.3,
          hover: { duration: 0.2 },
          animate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* 3D EVEA Logo */}
        <div className={`relative ${sizeClasses[size]} flex items-center justify-center transition-all duration-300`}>
          {/* Main Logo Container with Decorative Frame */}
          <div className="relative w-full h-full">
            {/* Decorative Frame Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl border-2 border-blue-500/50 overflow-hidden">
                              {/* Leaf Pattern Border */}
                <div className="absolute inset-0">
                  {/* Top Leaf Pattern */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2">
                    <div className="flex justify-between">
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                  
                  {/* Bottom Leaf Pattern */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-2">
                    <div className="flex justify-between">
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                  
                  {/* Left Leaf Pattern */}
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-2 h-3/4">
                    <div className="flex flex-col justify-between h-full">
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                  
                  {/* Right Leaf Pattern */}
                  <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-3/4">
                    <div className="flex flex-col justify-between h-full">
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-40"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>
              
              {/* Corner Vine Patterns */}
              <div className="absolute top-2 left-2 w-3 h-3">
                <div className="w-1 h-1 bg-blue-300 rounded-full opacity-80"></div>
                <div className="absolute top-1 left-1 w-1 h-1 bg-blue-300 rounded-full opacity-60"></div>
              </div>
              <div className="absolute top-2 right-2 w-3 h-3">
                <div className="w-1 h-1 bg-blue-300 rounded-full opacity-80"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-blue-300 rounded-full opacity-60"></div>
              </div>
              <div className="absolute bottom-2 left-2 w-3 h-3">
                <div className="w-1 h-1 bg-blue-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-blue-300 rounded-full opacity-60"></div>
              </div>
              <div className="absolute bottom-2 right-2 w-3 h-3">
                <div className="w-1 h-1 bg-blue-300 rounded-full opacity-80"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-blue-300 rounded-full opacity-60"></div>
              </div>
            </div>
            
            {/* Large Serif E Letter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-white font-black tracking-wider"
                style={{
                  fontSize: size === 'sm' ? '1.8rem' : size === 'md' ? '3rem' : '3.5rem',
                  fontFamily: 'var(--font-playfair-display), "Times New Roman", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.6)',
                  transform: 'perspective(100px) rotateX(5deg)'
                }}
                animate={{
                  textShadow: [
                    '2px 2px 4px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.6)',
                    '3px 3px 6px rgba(0,0,0,0.5), -2px -2px 4px rgba(255,255,255,0.7)',
                    '2px 2px 4px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.6)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                E
              </motion.div>
            </div>
          </div>
          
          {/* 3D Shadow Effect */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-2 bg-black/20 rounded-full blur-sm"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Inner Glow */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-transparent to-blue-700/30 rounded-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* 3D Text Logo */}
        {showText && (
          <div className="hidden sm:block">
            <motion.div
              className="flex flex-col"
              animate={{
                y: [0, -1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span 
                className={`font-black tracking-widest transition-colors duration-300 text-white ${textSizes[size]}`}
                style={{
                  fontFamily: 'var(--font-playfair-display), "Times New Roman", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.4), -1px -1px 2px rgba(255,255,255,0.6)',
                  transform: 'perspective(100px) rotateX(5deg)'
                }}
              >
                EVEA
              </span>
              <span 
                className="text-xs font-medium tracking-wider text-blue-300 opacity-80"
                style={{
                  fontFamily: 'var(--font-playfair-display), "Times New Roman", serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                ELEGANT EVENTS
              </span>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  }

  // Classic Blue Logo (existing implementation)
  return (
    <motion.div 
      className={`flex items-center space-x-3 group ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      animate={{
        y: [0, -2, 0]
      }}
      transition={{ 
        duration: 0.3,
        hover: { duration: 0.2 },
        animate: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      {/* Professional Blue Logo Icon */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center transition-all duration-300`}>
        {/* Main Logo Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl border border-blue-400/30 overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-900/20"></div>
          
          {/* Professional E Letter */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-white font-black tracking-wider"
              style={{
                fontSize: size === 'sm' ? '1.5rem' : size === 'md' ? '2.5rem' : '3rem',
                fontFamily: '"Orbitron", "Arial Black", sans-serif',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)'
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                  '0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              E
            </motion.div>
          </div>
          
          {/* Geometric Accent */}
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-300 rounded-full opacity-80"></div>
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-1 h-4 bg-gradient-to-b from-blue-400 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1 h-4 bg-gradient-to-b from-blue-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1 h-4 bg-gradient-to-t from-blue-400 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1 h-4 bg-gradient-to-t from-blue-400 to-transparent"></div>
        </div>
        
        {/* Floating Glow Effect */}
        <motion.div 
          className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Outer Glow */}
        <motion.div 
          className="absolute -inset-2 bg-blue-500/30 rounded-2xl blur-lg"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating Shadow */}
        <motion.div 
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-3 bg-black/30 rounded-full blur-md"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
      
      {/* Professional Text Logo */}
      {showText && (
        <div className="hidden sm:block">
          <motion.div
            className="flex flex-col"
            animate={{
              y: [0, -1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span 
              className={`font-black tracking-widest transition-colors duration-300 text-white ${textSizes[size]}`}
              style={{
                fontFamily: '"Orbitron", "Arial Black", sans-serif',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              EVEA
            </span>
            <span 
              className="text-xs font-medium tracking-wider text-blue-300 opacity-80"
              style={{
                fontFamily: '"Orbitron", "Arial", sans-serif'
              }}
            >
              EVENT MANAGEMENT
            </span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
