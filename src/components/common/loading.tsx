import React from 'react'
import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'md', 
  text, 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('flex items-center justify-center space-x-3', className)}>
      <motion.div
        className={cn('spinner', sizeClasses[size])}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <span className="text-gray-600 font-medium">{text}</span>
      )}
    </div>
  )
}

export default Loading