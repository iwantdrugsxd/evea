import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

export interface InputProps {
  label?: string
  error?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    help, 
    placeholder, 
    value, 
    onChange, 
    type = 'text', 
    required, 
    disabled, 
    className,
    ...props 
  }, ref) => {
    const inputId = React.useId()

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            className={cn(
              'input-base',
              error && 'input-error',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            suppressHydrationWarning
            {...props}
          />
          
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
          )}
        </div>
        
        {error && (
          <div className="form-error">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}
        
        {help && !error && (
          <div className="form-help">
            {help}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
