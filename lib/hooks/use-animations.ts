import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { animations, accessibleAnimations, responsiveAnimations } from '../animations';

// Hook for accessibility-aware animations
export const useAccessibleAnimation = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return shouldReduceMotion ? accessibleAnimations.reduced : accessibleAnimations.full;
};

// Hook for responsive animations based on screen size
export const useResponsiveAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? responsiveAnimations.mobile : responsiveAnimations.desktop;
};

// Hook for scroll-based animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { isInView };
};

// Hook for stagger animations with dynamic children
export const useStaggerAnimation = (
  itemCount: number, 
  staggerDelay = 0.1, 
  delayChildren = 0
) => {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  };

  return { containerVariants, itemVariants };
};

// Hook for mouse tracking animations
export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return {
    mousePosition,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
};

// Hook for page transition management
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = () => setIsTransitioning(true);
  const endTransition = () => setIsTransitioning(false);

  return {
    isTransitioning,
    startTransition,
    endTransition,
    variants: animations.pageTransition,
  };
};

// Hook for loading states with animations
export const useLoadingAnimation = (isLoading: boolean) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => setShowLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return {
    showLoading,
    variants: animations.spinner,
  };
};

// Hook for form field animations
export const useFormAnimation = () => {
  const fieldVariants = {
    initial: { x: 0 },
    error: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      }
    },
    success: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    }
  };

  const labelVariants = {
    initial: { y: 0, scale: 1 },
    focus: {
      y: -20,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    }
  };

  return { fieldVariants, labelVariants };
};

// Hook for card flip animations
export const useCardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipVariants = {
    front: {
      rotateY: isFlipped ? 180 : 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    },
    back: {
      rotateY: isFlipped ? 0 : -180,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };

  const toggle = () => setIsFlipped(!isFlipped);

  return { isFlipped, flipVariants, toggle };
};

// Hook for notification animations
export const useNotificationAnimation = () => {
  const slideInVariants = {
    initial: { x: 300, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    }
  };

  const bounceVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.1, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    }
  };

  return { slideInVariants, bounceVariants };
};

// Hook for search animation
export const useSearchAnimation = () => {
  const [isSearching, setIsSearching] = useState(false);

  const searchVariants = {
    initial: { width: 0, opacity: 0 },
    animate: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    },
    exit: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    }
  };

  const toggleSearch = () => setIsSearching(!isSearching);

  return { isSearching, searchVariants, toggleSearch };
};

// Hook for Pokemon-specific animations
export const usePokemonAnimation = () => {
  const catchVariants = {
    initial: { scale: 1, rotate: 0 },
    catching: {
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    },
    caught: {
      scale: [1, 0.8, 1.1, 1],
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    }
  };

  const appearVariants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      }
    }
  };

  const evolutionVariants = {
    initial: { scale: 1, brightness: 1 },
    evolving: {
      scale: [1, 1.2, 1.5, 1],
      filter: [
        "brightness(1)",
        "brightness(2) saturate(2)",
        "brightness(3) saturate(3)",
        "brightness(1) saturate(1)"
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  };

  return { catchVariants, appearVariants, evolutionVariants };
};