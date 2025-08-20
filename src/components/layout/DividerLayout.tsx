'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface DividerLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export default function DividerLayout({ leftContent, rightContent, className = "" }: DividerLayoutProps) {
  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-black via-gray-900/50 to-black overflow-hidden ${className}`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.06),transparent_40%)]" />
      </div>

      {/* Minimal Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/15 rounded-full"
        animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {leftContent}
            </div>
          </motion.div>
        </div>
        
        {/* Mobile Divider */}
        <div className="relative h-px mx-8 my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
              {rightContent}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Left Section */}
        <div className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center p-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl hover:bg-white/8 transition-all duration-500">
              {leftContent}
            </div>
          </motion.div>
        </div>

        {/* Center Divider Line */}
        <div className="absolute left-1/2 top-0 w-px h-full transform -translate-x-1/2 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero/image.png"
              alt="Divider Line"
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
            />
            {/* Minimal glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 via-blue-500/50 to-blue-400/30 blur-sm" />
            <motion.div
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-blue-400/20 via-blue-500/30 to-blue-400/20 blur-md"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center p-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl hover:bg-white/8 transition-all duration-500">
              {rightContent}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
