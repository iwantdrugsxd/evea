'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashlightAnimationProps {
  onAnimationComplete?: () => void;
  direction?: 'left-to-right' | 'right-to-left';
  className?: string;
}

export default function FlashlightAnimation({ 
  onAnimationComplete, 
  direction = 'left-to-right',
  className = "" 
}: FlashlightAnimationProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        onAnimationComplete?.();
      });
      
      // Auto-start the animation
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [onAnimationComplete]);

  const startAnimation = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 pointer-events-none ${className}`}
        >
          {/* Video overlay */}
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${
                direction === 'right-to-left' ? 'scale-x-[-1]' : ''
              }`}
              muted
              playsInline
            >
              <source src="/video/Remove background project-2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Light sweep effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{
              x: direction === 'left-to-right' ? '-100%' : '100%',
              opacity: 0
            }}
            animate={{
              x: direction === 'left-to-right' ? '100%' : '-100%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
          />

          {/* Text illumination effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
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
              delay: 0.5
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to trigger flashlight animation
export const useFlashlightAnimation = () => {
  const [animationKey, setAnimationKey] = useState(0);

  const triggerAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  return { animationKey, triggerAnimation };
};
