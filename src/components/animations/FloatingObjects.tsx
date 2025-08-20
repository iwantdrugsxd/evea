'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingObjectProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FloatingObject({ 
  children, 
  className = "", 
  speed = 1, 
  delay = 0,
  direction = 'up'
}: FloatingObjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [0, direction === 'left' ? -50 : direction === 'right' ? 50 : 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={ref}
      className={`absolute ${className}`}
      style={{ y, x, rotate }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// Balloon component
export function Balloon({ color = "blue", size = "medium" }: { color?: string; size?: "small" | "medium" | "large" }) {
  const sizeClasses = {
    small: "w-8 h-10",
    medium: "w-12 h-16",
    large: "w-16 h-20"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-b from-${color}-400 to-${color}-600 shadow-lg`} />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-300" />
    </motion.div>
  );
}

// Confetti component
export function Confetti({ color = "blue" }: { color?: string }) {
  return (
    <motion.div
      className={`w-2 h-2 bg-${color}-400 rounded-full`}
      animate={{
        y: [0, -50, -100],
        x: [0, 10, -10],
        rotate: [0, 180, 360],
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
}

// Spotlight beam component
export function SpotlightBeam({ color = "blue" }: { color?: string }) {
  return (
    <motion.div
      className={`w-1 h-32 bg-gradient-to-b from-${color}-400/80 via-${color}-200/40 to-transparent rounded-full`}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scaleY: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Abstract shape component
export function AbstractShape({ type = "circle", color = "blue" }: { type?: string; color?: string }) {
  const shapes = {
    circle: "rounded-full",
    square: "rounded-lg",
    triangle: "w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-blue-400"
  };

  return (
    <motion.div
      className={`${shapes[type]} bg-gradient-to-br from-${color}-400/60 to-${color}-600/60 backdrop-blur-sm`}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}
