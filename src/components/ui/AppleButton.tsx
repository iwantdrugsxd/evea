'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AppleButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export default function AppleButton({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = "",
  icon
}: AppleButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg'
  };

  const variantClasses = {
    primary: 'bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20',
    secondary: 'bg-black/20 backdrop-blur-lg border border-white/10 text-white hover:bg-black/30',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
  };

  const buttonContent = (
    <motion.div
      className={`
        relative overflow-hidden
        rounded-2xl font-semibold
        transition-all duration-300
        flex items-center justify-center gap-3
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-transparent rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </div>
      
      {/* Subtle shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
