// Premium Design Tokens - Inspired by qoder.com sophistication
export const designTokens = {
  // Premium Color Palette
  colors: {
    primary: {
      50: '#f0f4ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    // Pokemon-Themed Accent Colors
    pokemon: {
      electric: '#f7d02c',
      fire: '#ff6b35',
      water: '#4f8cc9',
      grass: '#7bc142',
      psychic: '#f366b9',
      dragon: '#6f35fc',
      ice: '#74c0fc',
      fighting: '#c92112',
      poison: '#a040a0',
      ground: '#e0c068',
      flying: '#a890f0',
      bug: '#a8b820',
      rock: '#b8a038',
      ghost: '#705898',
      steel: '#b8b8d0',
      dark: '#705848',
      fairy: '#ee99ac',
    },
    // Sophisticated Gradients
    gradients: {
      heroPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      heroPokemon: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
      premium: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      electric: 'linear-gradient(135deg, #f7d02c 0%, #f39c12 100%)',
      water: 'linear-gradient(135deg, #4f8cc9 0%, #2980b9 100%)',
      fire: 'linear-gradient(135deg, #ff6b35 0%, #e74c3c 100%)',
      grass: 'linear-gradient(135deg, #7bc142 0%, #27ae60 100%)',
      psychic: 'linear-gradient(135deg, #f366b9 0%, #e91e63 100%)',
      dragon: 'linear-gradient(135deg, #6f35fc 0%, #9b59b6 100%)',
    },
    // Glass Morphism
    glass: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.15)',
      hoverBorder: 'rgba(255, 255, 255, 0.30)',
    },
    // Semantic Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Typography System
  typography: {
    fontFamily: {
      display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
      '8xl': '6rem',     // 96px
      '9xl': '8rem',     // 128px
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Spacing System
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
    // Premium shadows for glass morphism
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    premium: '0 20px 60px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  },

  // Animation Presets
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    easing: {
      ease: 'ease',
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      // Custom premium easing
      premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    // Framer Motion variants
    variants: {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      slideUp: {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -20, opacity: 0 },
      },
      slideDown: {
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 20, opacity: 0 },
      },
      scaleIn: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      },
      stagger: {
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      },
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

// Export specific design token categories for easier access
export const { colors, typography, spacing, borderRadius, boxShadow, animation, breakpoints, zIndex } = designTokens;

// Helper functions for design tokens
export const getPokemonTypeColor = (type: string): string => {
  return colors.pokemon[type as keyof typeof colors.pokemon] || colors.primary[500];
};

export const getPokemonTypeGradient = (type: string): string => {
  return colors.gradients[type as keyof typeof colors.gradients] || colors.gradients.premium;
};

// Motion presets for consistent animations
export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerChild: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
};