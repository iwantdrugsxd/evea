import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonProps } from '@/lib'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, children, className, onClick, ...props }, ref) => {
    const baseClasses = 'btn-base focus-ring interactive-press'
    
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary', 
      outline: 'btn-outline',
      ghost: 'btn-ghost'
    }
    
    const sizeClasses = {
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg'
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        // Suppress hydration warnings for browser extension attributes
        suppressHydrationWarning={true}
        {...props}
      >
        {loading && (
          <div className="spinner mr-2" />
        )}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
export default Button