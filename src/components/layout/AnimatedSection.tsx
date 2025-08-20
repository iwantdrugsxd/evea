'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left-to-right' | 'right-to-left';
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = "",
  direction = 'left-to-right',
  delay = 0
}: AnimatedSectionProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);



  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Border-to-border flashlight effect with video */}
      {isAnimating && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Left border video (90 degrees rotation) */}
          <motion.div
            className="absolute left-0 top-0 w-8 h-full overflow-hidden"
            initial={{
              x: direction === 'left-to-right' ? '-100%' : '0%',
              opacity: 0
            }}
            animate={{
              x: direction === 'left-to-right' ? '100vw' : '-100%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <video
              className="w-full h-full object-cover transform rotate-90"
              muted
              playsInline
              autoPlay
            >
              <source src="/video/Remove background project-2.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Right border video (270 degrees rotation) */}
          <motion.div
            className="absolute right-0 top-0 w-8 h-full overflow-hidden"
            initial={{
              x: direction === 'right-to-left' ? '100%' : '0%',
              opacity: 0
            }}
            animate={{
              x: direction === 'right-to-left' ? '-100vw' : '100%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <video
              className="w-full h-full object-cover transform -rotate-90"
              muted
              playsInline
              autoPlay
            >
              <source src="/video/Remove background project-2.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Center sweep effect for text illumination */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent"
            initial={{
              x: direction === 'left-to-right' ? '-100%' : '100%',
              opacity: 0
            }}
            animate={{
              x: direction === 'left-to-right' ? '100%' : '-100%',
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
        </motion.div>
      )}

      {/* Content - Always visible */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
