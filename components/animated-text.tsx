'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, forwardRef, useRef, useEffect, useState, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/animations';

interface AnimatedTextProps extends HTMLAttributes<HTMLDivElement> {
  children: string | ReactNode;
  variant?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn' | 'typewriter' | 'reveal';
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const textVariants = {
  slideUp: {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  },
  slideDown: {
    initial: { y: -60, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  },
  slideLeft: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  },
  slideRight: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  },
  reveal: {
    initial: { y: "100%" },
    animate: { y: "0%" }
  },
  typewriter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  }
};

export const AnimatedText = forwardRef<HTMLElement, AnimatedTextProps>(
  ({ 
    children, 
    className,
    variant = 'slideUp',
    delay = 0,
    staggerChildren = false,
    staggerDelay = 0.1,
    once = true,
    as: Component = 'div',
    onClick,
    ...htmlProps
  }, ref) => {
    const elementRef = useRef(null);
    const isInView = useInView(elementRef, { once });

    // Handle stagger animation for text split into words/characters
    const shouldStagger = staggerChildren && typeof children === 'string';
    
    if (shouldStagger) {
      const words = children.split(' ');
      
      const containerVariants = {
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          }
        }
      };

      const wordVariants = textVariants[variant];

      return (
        <motion.div
          ref={elementRef}
          className={cn("overflow-hidden", className)}
          variants={containerVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          onClick={onClick}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-1"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    // Handle reveal animation with overflow hidden
    if (variant === 'reveal') {
      return (
        <div ref={elementRef} className={cn("overflow-hidden", className)}>
          <motion.div
            variants={textVariants[variant]}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ delay }}
            onClick={onClick}
          >
            {children}
          </motion.div>
        </div>
      );
    }

    const MotionComponent = motion[Component] as any;

    return (
      <MotionComponent
        ref={ref || elementRef}
        className={className}
        variants={textVariants[variant]}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        transition={{ delay }}
        onClick={onClick}
      >
        {children}
      </MotionComponent>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

// Typewriter Text Component
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
  cursorClassName?: string;
  onComplete?: () => void;
}

export const TypewriterText = forwardRef<HTMLSpanElement, TypewriterTextProps>(
  ({ 
    text, 
    delay = 0, 
    speed = 50, 
    className,
    cursor = true,
    cursorClassName,
    onComplete,
    ...props 
  }, ref) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index < text.length) {
            setDisplayText(text.slice(0, index + 1));
            index++;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            onComplete?.();
          }
        }, speed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }, [text, delay, speed, onComplete]);

    useEffect(() => {
      if (isComplete) {
        const cursorInterval = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
      }
    }, [isComplete]);

    return (
      <span ref={ref} className={className} {...props}>
        {displayText}
        {cursor && (
          <motion.span
            className={cn("inline-block w-0.5 h-1em bg-current ml-1", cursorClassName)}
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </span>
    );
  }
);

TypewriterText.displayName = "TypewriterText";

// Highlighted Text Component
interface HighlightedTextProps {
  children: string;
  highlight: string | string[];
  highlightClassName?: string;
  className?: string;
  variant?: 'underline' | 'background' | 'gradient' | 'glow';
}

export const HighlightedText = forwardRef<HTMLSpanElement, HighlightedTextProps>(
  ({ children, highlight, highlightClassName, className, variant = 'background' }, ref) => {
    const highlights = Array.isArray(highlight) ? highlight : [highlight];
    
    let processedText = children;
    highlights.forEach((term, index) => {
      const regex = new RegExp(`(${term})`, 'gi');
      processedText = processedText.replace(regex, `<mark data-index="${index}">$1</mark>`);
    });

    const variantClasses = {
      underline: "border-b-2 border-primary bg-transparent",
      background: "bg-primary/20 px-1 rounded",
      gradient: "bg-gradient-to-r from-purple-500 to-blue-500 text-white px-1 rounded",
      glow: "bg-primary/20 px-1 rounded shadow-lg shadow-primary/25"
    };

    return (
      <span 
        ref={ref}
        className={className}
        dangerouslySetInnerHTML={{
          __html: processedText.replace(
            /<mark data-index="(\d+)">(.*?)<\/mark>/g,
            `<span class="${cn(variantClasses[variant], highlightClassName)}">$2</span>`
          )
        }}
      />
    );
  }
);

HighlightedText.displayName = "HighlightedText";

// Gradient Text Component
interface GradientTextProps {
  children: ReactNode;
  gradient?: 'purple' | 'blue' | 'green' | 'red' | 'custom';
  customGradient?: string;
  className?: string;
  animate?: boolean;
}

const gradientClasses = {
  purple: "bg-gradient-to-r from-purple-600 to-blue-600",
  blue: "bg-gradient-to-r from-blue-600 to-cyan-600",
  green: "bg-gradient-to-r from-green-600 to-emerald-600",
  red: "bg-gradient-to-r from-red-600 to-pink-600",
  custom: ""
};

export const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ children, gradient = 'purple', customGradient, className, animate = false }, ref) => {
    const gradientClass = gradient === 'custom' && customGradient 
      ? customGradient 
      : gradientClasses[gradient];

    return (
      <motion.span
        ref={ref}
        className={cn(
          gradientClass,
          "bg-clip-text text-transparent font-bold",
          animate && "bg-size-200",
          className
        )}
        style={gradient === 'custom' && customGradient ? { background: customGradient } : {}}
        animate={animate ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : undefined}
        transition={animate ? { duration: 3, repeat: Infinity } : undefined}
      >
        {children}
      </motion.span>
    );
  }
);

GradientText.displayName = "GradientText";

// Count Up Animation Component
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const CountUp = forwardRef<HTMLSpanElement, CountUpProps>(
  ({ from = 0, to, duration = 2, delay = 0, className, prefix = '', suffix = '', decimals = 0 }, ref) => {
    const [count, setCount] = useState(from);
    const elementRef = useRef(null);
    const isInView = useInView(elementRef, { once: true });

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          const increment = (to - from) / (duration * 60); // 60 FPS
          let current = from;
          
          const counter = setInterval(() => {
            current += increment;
            if (current >= to) {
              setCount(to);
              clearInterval(counter);
            } else {
              setCount(current);
            }
          }, 1000 / 60);

          return () => clearInterval(counter);
        }, delay * 1000);

        return () => clearTimeout(timer);
      }
    }, [isInView, from, to, duration, delay]);

    return (
      <span ref={ref || elementRef} className={className}>
        {prefix}{count.toFixed(decimals)}{suffix}
      </span>
    );
  }
);

CountUp.displayName = "CountUp";