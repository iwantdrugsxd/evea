'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = false, className = "" }: LogoProps) {
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

  return (
    <motion.div 
      className={`flex items-center space-x-3 group ${className}`}
      whileHover={{ scale: 1.1, y: -2 }}
      animate={{
        y: [0, -3, 0]
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
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center transition-all duration-300 drop-shadow-2xl`}>
        <Image
          src="/logo/Remove background project-2 (1).png"
          alt="Evea Logo"
          width={size === 'sm' ? 48 : size === 'md' ? 80 : 96}
          height={size === 'sm' ? 48 : size === 'md' ? 80 : 96}
          className="object-contain relative z-10"
          style={{
            filter: 'brightness(0) invert(1)'
          }}
          onError={(e) => {
            console.error('Logo image failed to load');
            // Fallback to text logo
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {/* Fallback text logo */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
          E
        </div>
        {/* Floating glow effect */}
        <motion.div 
          className="absolute inset-0 bg-white/20 rounded-full blur-md"
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
        <motion.div 
          className="absolute inset-0 bg-blue-400/30 rounded-full blur-lg"
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
        {/* Floating shadow effect */}
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full blur-sm"
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
      
      {showText && (
        <div className="hidden sm:block">
          <span className={`font-bold transition-colors duration-300 text-white ${textSizes[size]}`}>
            Evea
          </span>
        </div>
      )}
    </motion.div>
  );
}
