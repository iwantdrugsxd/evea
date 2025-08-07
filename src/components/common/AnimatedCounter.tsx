import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className
}) => {
  const [count, setCount] = useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const increment = end / (duration * 60) // 60fps
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= end) {
            clearInterval(timer)
            return end
          }
          return Math.min(prev + increment, end)
        })
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}{Math.floor(count)}{suffix}
    </motion.span>
  )
}

export default AnimatedCounter