import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CardProps } from '@/lib'

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, onClick, ...props }, ref) => {
    const baseClasses = 'card'
    
    const variantClasses = {
      default: '',
      elegant: 'card-elegant',
      interactive: 'card-interactive hover-lift'
    }

    const Component = onClick ? motion.div : 'div'
    const motionProps = onClick ? {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 }
    } : {}

    return (
      <Component
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pb-4', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-gray-900 font-heading', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-4 border-t border-gray-100', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardContent, CardFooter }