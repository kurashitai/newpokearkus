'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { animations } from '@/lib/animations';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={animations.pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Enhanced page transition with loading state
interface EnhancedPageTransitionProps extends PageTransitionProps {
  isLoading?: boolean;
  loadingComponent?: ReactNode;
}

export function EnhancedPageTransition({ 
  children, 
  className = '',
  isLoading = false,
  loadingComponent
}: EnhancedPageTransitionProps) {
  const pathname = usePathname();

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isLoading && loadingComponent ? (
        <motion.div
          key="loading"
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={className}
        >
          {loadingComponent}
        </motion.div>
      ) : (
        <motion.div
          key={pathname}
          variants={animations.pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Slide transition variant
export function SlidePageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  const slideVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      }
    },
    exit: { 
      x: -300, 
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
      }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Scale transition variant
export function ScalePageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  const scaleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 25,
      }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}