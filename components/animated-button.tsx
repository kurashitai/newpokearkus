'use client';

import { motion } from 'framer-motion';
import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/animations';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  glowEffect?: boolean;
  pulseOnHover?: boolean;
}

const buttonVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  premium: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
};

const sizeVariants = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 py-2",
  lg: "h-11 px-8 text-lg"
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText = "Loading...",
    icon,
    iconPosition = 'left',
    glowEffect = false,
    pulseOnHover = false,
    disabled,
    onClick,
    type,
    form,
    value,
    name,
    ...htmlProps
  }, forwardedRef) => {
    const buttonClass = cn(
      "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      buttonVariants[variant],
      sizeVariants[size],
      {
        "shadow-lg shadow-purple-500/25": glowEffect && variant === 'premium',
        "cursor-not-allowed": disabled || isLoading,
      },
      className
    );

    const buttonAnimations = {
      rest: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    };

    const iconAnimation = {
      initial: { x: 0 },
      hover: { x: iconPosition === 'right' ? 4 : -4 }
    };

    const loadingSpinner = (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
      </motion.div>
    );

    const contentAnimation = {
      initial: { opacity: 1 },
      loading: { opacity: 0.7 },
      loaded: { opacity: 1 }
    };

    return (
      <motion.button
        ref={forwardedRef}
        className={buttonClass}
        variants={buttonAnimations}
        initial="rest"
        whileHover={!disabled && !isLoading ? "hover" : "rest"}
        whileTap={!disabled && !isLoading ? "tap" : "rest"}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        <motion.div
          className="flex items-center gap-2"
          variants={contentAnimation}
          animate={isLoading ? "loading" : "loaded"}
        >
          {isLoading && loadingSpinner}
          
          {!isLoading && icon && iconPosition === 'left' && (
            <motion.div variants={iconAnimation}>
              {icon}
            </motion.div>
          )}
          
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoading ? 0.7 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? loadingText : children}
          </motion.span>
          
          {!isLoading && icon && iconPosition === 'right' && (
            <motion.div variants={iconAnimation}>
              {icon}
            </motion.div>
          )}
        </motion.div>
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Specialized button variants
export const GlowButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      variant="premium"
      glowEffect
      {...props}
    />
  )
);

GlowButton.displayName = "GlowButton";

export const PulseButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (props, ref) => (
    <AnimatedButton
      ref={ref}
      pulseOnHover
      {...props}
    />
  )
);

PulseButton.displayName = "PulseButton";

// Floating Action Button
interface FloatingButtonProps extends AnimatedButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const positionClasses = {
  'bottom-right': 'fixed bottom-6 right-6',
  'bottom-left': 'fixed bottom-6 left-6',
  'top-right': 'fixed top-6 right-6',
  'top-left': 'fixed top-6 left-6',
};

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ position = 'bottom-right', className, onClick, ...props }, ref) => {
    const floatingAnimation = {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      hover: { scale: 1.1, y: -2 },
      tap: { scale: 0.95 }
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          positionClasses[position],
          "z-50 w-14 h-14 rounded-full shadow-lg",
          buttonVariants.premium,
          className
        )}
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
      />
    );
  }
);

FloatingButton.displayName = "FloatingButton";