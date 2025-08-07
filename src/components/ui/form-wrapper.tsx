'use client'

import React from 'react'
import { useClientOnly } from '@/hooks/use-hydration'

interface FormWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, fallback = null }) => {
  const mounted = useClientOnly()

  if (!mounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default FormWrapper
