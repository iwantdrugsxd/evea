import React from 'react'
import { cn } from '@/lib/utils'
import { BadgeProps } from '@/types'

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', children, className, ...props }, ref) => {
    const baseClasses = 'badge'
    
    const variantClasses = {
      primary: 'badge-primary',
      success: 'badge-success',
      warning: 'badge-warning',
      gray: 'badge-gray'
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
export default Badge