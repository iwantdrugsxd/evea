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
      {/* Content - Always visible */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
