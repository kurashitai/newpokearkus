'use client'

import { MotionConfig } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { useEffect, useState } from 'react'

interface MotionProviderProps {
  children: React.ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)
  const animationsEnabled = useAppStore((state) => state.animationsEnabled)

  useEffect(() => {
    setMounted(true)
    
    // Check for user's motion preferences only on client side
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  // Determine if animations should be disabled
  const shouldReduceMotion = !mounted || reducedMotion || !animationsEnabled

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <MotionConfig
      reducedMotion={shouldReduceMotion ? 'always' : 'never'}
      transition={
        shouldReduceMotion
          ? { duration: 0.01 }
          : {
              type: 'spring',
              stiffness: 400,
              damping: 25,
            }
      }
    >
      {children}
    </MotionConfig>
  )
}

// Export motion variants for consistent animations
export const motionVariants = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },

  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },

  // Slide animations
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  slideLeft: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  slideRight: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Scale animations
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  // Stagger animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  staggerItem: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },

  // Hover animations
  hoverLift: {
    whileHover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },

  hoverGlow: {
    whileHover: {
      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)',
      transition: { duration: 0.3 },
    },
  },

  // Card animations
  cardHover: {
    whileHover: {
      y: -8,
      rotateY: 5,
      rotateX: 5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },

  // Glass card animations
  glassCard: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
    whileHover: {
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },

  // Stack scroller animations
  stackCard: {
    initial: { opacity: 0, scale: 0.8, y: 100 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: -100 },
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },

  // Navigation animations
  navItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    whileHover: {
      x: 4,
      transition: { duration: 0.2 },
    },
  },

  // Mobile menu animations
  mobileMenu: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },

  // Modal animations
  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
}

// Helper function to get motion variant based on user preferences
export const getMotionVariant = (
  variantName: keyof typeof motionVariants,
  reducedMotion?: boolean
) => {
  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    }
  }
  
  return motionVariants[variantName]
}

export default MotionProvider;