import { Variants } from 'framer-motion';

// Advanced Animation Presets
export const animations = {
  // Page Transitions
  pageTransition: {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      scale: 1.02,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  },

  // Slide Transitions
  slideUp: {
    initial: { y: 60, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      }
    }
  },

  slideDown: {
    initial: { y: -60, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      }
    }
  },

  slideLeft: {
    initial: { x: 60, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      }
    }
  },

  slideRight: {
    initial: { x: -60, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      }
    }
  },

  // Scale Animations
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      }
    }
  },

  scaleOut: {
    initial: { scale: 1.1, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      }
    }
  },

  // Rotation Animations
  rotateIn: {
    initial: { rotate: -10, scale: 0.8, opacity: 0 },
    animate: { 
      rotate: 0, 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    }
  },

  // Stagger Container
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  },

  staggerFast: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      }
    }
  },

  staggerSlow: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  },

  // Micro-interactions
  button: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }
    }
  },

  card: {
    rest: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
    hover: { 
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  },

  iconButton: {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    tap: { 
      scale: 0.9,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      }
    }
  },

  // Glass Morphism Animations
  glassMorphism: {
    initial: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
      scale: 0.9,
    },
    animate: { 
      opacity: 1,
      backdropFilter: "blur(16px)",
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      }
    },
    hover: {
      backdropFilter: "blur(20px)",
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    }
  },

  // Navigation Animations
  navItem: {
    initial: { y: -20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      }
    },
    hover: {
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  },

  mobileMenu: {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      }
    }
  },

  // Loading Animations
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }
    }
  },

  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Text Animations
  textReveal: {
    initial: { y: 100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      }
    }
  },

  typewriter: {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  },

  // Modal Animations
  modal: {
    initial: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      }
    }
  },

  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      }
    }
  },

  // Special Effects
  floating: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  glow: {
    animate: {
      boxShadow: [
        "0 0 5px rgba(99, 102, 241, 0.3)",
        "0 0 20px rgba(99, 102, 241, 0.6)",
        "0 0 5px rgba(99, 102, 241, 0.3)",
      ],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  // Pokemon-themed animations
  pokeball: {
    rest: { rotate: 0 },
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  },

  catch: {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  },
} as const;

// Animation Utilities
export const getStaggerDelay = (index: number, baseDelay = 0.1) => ({
  delay: index * baseDelay,
});

export const createStaggerVariants = (
  childVariant: Variants, 
  staggerDelay = 0.1, 
  delayChildren = 0
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    }
  }
});

// Responsive Animation Hook Data
export const responsiveAnimations = {
  mobile: {
    scale: { hover: 1.02, tap: 0.98 },
    slide: { distance: 30 },
  },
  desktop: {
    scale: { hover: 1.05, tap: 0.95 },
    slide: { distance: 60 },
  },
};

// Accessibility-aware animations
export const accessibleAnimations = {
  reduced: {
    transition: { duration: 0.01 },
    initial: { opacity: 1 },
    animate: { opacity: 1 },
  },
  full: animations,
};