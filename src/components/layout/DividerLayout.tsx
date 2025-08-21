'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface DividerLayoutProps {
  leftContent: React.ReactNode;
  rightContent?: React.ReactNode; // Made optional
  className?: string;
}

// Floating Objects Components
interface FloatingBalloonProps {
  delay?: number;
  x: string;
  y: string;
  color?: string;
  size?: "small" | "medium" | "large";
}

const FloatingBalloon = ({ delay = 0, x, y, color = "#FF6B6B", size = "small" }: FloatingBalloonProps) => {
  const sizeClasses = {
    small: "w-4 h-6",
    medium: "w-6 h-8", 
    large: "w-8 h-12"
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -15, 0],
        x: [0, 8, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        duration: 6 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-full"></div>
          <div className="absolute top-1 left-1 w-1/3 h-1/3 bg-white/60 rounded-full blur-sm"></div>
        </div>
        <div className="w-0.5 h-6 bg-gray-400/80 absolute left-1/2 top-full transform -translate-x-1/2"></div>
      </div>
    </motion.div>
  );
};

interface FloatingConfettiProps {
  delay?: number;
  x: string;
  y: string;
  color?: string;
}

const FloatingConfetti = ({ delay = 0, x, y, color = "#FFD93D" }: FloatingConfettiProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      x: [0, 12, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div 
      className="w-2 h-2 transform rotate-45"
      style={{ backgroundColor: color }}
    ></div>
  </motion.div>
);

interface FloatingOrbProps {
  delay?: number;
  x: string;
  y: string;
  color?: string;
}

const FloatingOrb = ({ delay = 0, x, y, color = "rgba(59, 130, 246, 0.3)" }: FloatingOrbProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 5 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div 
      className="w-6 h-6 rounded-full blur-sm"
      style={{ backgroundColor: color }}
    ></div>
  </motion.div>
);

interface SpotlightBeamProps {
  delay?: number;
  x: string;
  y: string;
  rotation?: number;
}

const SpotlightBeam = ({ delay = 0, x, y, rotation = 0 }: SpotlightBeamProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y, rotate: rotation }}
    animate={{
      opacity: [0.1, 0.4, 0.1],
      scaleX: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 8 + delay,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent"></div>
  </motion.div>
);

export default function DividerLayout({ leftContent, rightContent, className = "" }: DividerLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth * 20);
      mouseY.set((clientY - innerHeight / 2) / innerHeight * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen bg-gradient-to-br from-black via-gray-900/50 to-black overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/remove background project-3.png"
          alt="Event Planning Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_50%)]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.06),transparent_60%)]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div style={{ y: y1, x: smoothMouseX, rotate }}>
        <FloatingBalloon delay={0} x="10%" y="15%" color="#FF6B6B" size="medium" />
        <FloatingBalloon delay={2} x="85%" y="25%" color="#4ECDC4" size="small" />
        <FloatingBalloon delay={4} x="15%" y="70%" color="#45B7D1" size="large" />
      </motion.div>

      <motion.div style={{ y: y2, x: smoothMouseY }}>
        <FloatingConfetti delay={0.5} x="25%" y="20%" color="#FFD93D" />
        <FloatingConfetti delay={1.5} x="75%" y="60%" color="#FF6B6B" />
        <FloatingConfetti delay={2.5} x="45%" y="30%" color="#4ECDC4" />
        <FloatingConfetti delay={3.5} x="65%" y="80%" color="#A8E6CF" />
        <FloatingConfetti delay={4.5} x="30%" y="85%" color="#FFB347" />
      </motion.div>

      <motion.div style={{ y: y3 }}>
        <FloatingOrb delay={1} x="20%" y="40%" color="rgba(59, 130, 246, 0.25)" />
        <FloatingOrb delay={3} x="80%" y="50%" color="rgba(147, 51, 234, 0.2)" />
        <FloatingOrb delay={5} x="40%" y="75%" color="rgba(236, 72, 153, 0.15)" />
      </motion.div>

      <motion.div style={{ rotate }}>
        <SpotlightBeam delay={1} x="30%" y="35%" rotation={25} />
        <SpotlightBeam delay={3} x="70%" y="65%" rotation={-15} />
        <SpotlightBeam delay={5} x="50%" y="20%" rotation={45} />
      </motion.div>

      {/* Centered Layout - Single Section */}
      <div className="flex items-center justify-center min-h-screen py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ 
            scale: 1.02, 
            y: -8,
            boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.6)"
          }}
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="w-full max-w-5xl"
        >
          <div className="relative">
            {/* Floating glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-3xl"></div>
            
            {/* Main content container */}
            <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-20 shadow-2xl hover:bg-gradient-to-br hover:from-white/20 hover:via-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-700">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {leftContent}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced background overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"
        animate={{
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}