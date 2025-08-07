import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  badge?: {
    icon?: React.ComponentType<{ className?: string }>
    text: string
  }
  title: string
  subtitle?: string
  description?: string
  centered?: boolean
  className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  description,
  centered = true,
  className
}) => {
  const containerClasses = centered ? 'text-center' : 'text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(containerClasses, 'mb-16', className)}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center space-x-2 bg-primary-100 px-4 py-2 rounded-full mb-6 border border-primary-200"
        >
          {badge.icon && <badge.icon className="h-4 w-4 text-primary-600" />}
          <span className="text-primary-700 font-medium text-sm">{badge.text}</span>
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-heading text-balance"
      >
        {title}
        {subtitle && (
          <span className="block text-gradient mt-2">{subtitle}</span>
        )}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={cn(
            'text-lg text-gray-600 leading-relaxed',
            centered ? 'max-w-3xl mx-auto' : 'max-w-2xl'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeader