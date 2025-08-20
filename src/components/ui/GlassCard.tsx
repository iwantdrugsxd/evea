'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      className={`
        relative overflow-hidden
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        ${className}
      `}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent rounded-3xl" />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        {children}
      </div>
      
      {/* Hover glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-transparent rounded-3xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}
