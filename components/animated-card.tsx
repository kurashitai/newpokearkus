'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode, forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/animations';
import { useMouseTracking } from '@/lib/hooks/use-animations';

interface AnimatedCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'premium' | 'pokemon';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'tilt' | 'none';
  gradientBorder?: boolean;
  glowColor?: string;
  tilted?: boolean;
  interactive?: boolean;
}

const cardVariants = {
  default: "bg-card text-card-foreground border border-border",
  glass: "bg-white/10 backdrop-blur-md border border-white/20",
  premium: "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700",
  pokemon: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800"
};

const hoverEffects = {
  lift: {
    hover: {
      y: -8,
      scale: 1.02
    }
  },
  scale: {
    hover: {
      scale: 1.05
    }
  },
  glow: {
    hover: {
      scale: 1.02
    }
  },
  tilt: {
    hover: {
      scale: 1.02
    }
  },
  none: {}
};

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    children, 
    className,
    variant = 'default',
    hoverEffect = 'lift',
    gradientBorder = false,
    glowColor,
    tilted = false,
    interactive = true,
    onClick,
    ...props 
  }, ref) => {
    const { 
      mousePosition, 
      isHovering, 
      handleMouseMove, 
      handleMouseEnter, 
      handleMouseLeave 
    } = useMouseTracking();

    const cardClass = cn(
      "rounded-lg p-6 transition-all duration-300",
      cardVariants[variant],
      {
        "border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-border": gradientBorder,
        "transform-gpu": interactive,
        "cursor-pointer": interactive,
      },
      className
    );

    const cardAnimations = {
      rest: { 
        scale: 1, 
        y: 0,
        rotateX: tilted ? 5 : 0,
        rotateY: tilted ? 5 : 0,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      ...(hoverEffect !== 'none' && hoverEffects[hoverEffect])
    };

    // Mouse tracking effect for premium interactivity
    const mouseTrackingStyle = interactive && isHovering ? {
      transform: `
        perspective(1000px) 
        rotateX(${(mousePosition.y - 150) / 30}deg) 
        rotateY(${(mousePosition.x - 150) / 30}deg)
        scale3d(1.02, 1.02, 1.02)
      `,
    } : {};

    const glowStyle = glowColor && isHovering ? {
      boxShadow: `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20`,
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cardClass}
        variants={cardAnimations}
        initial="rest"
        whileHover={interactive ? "hover" : "rest"}
        style={{ 
          transformStyle: "preserve-3d",
          ...mouseTrackingStyle,
          ...glowStyle,
        }}
        onMouseMove={interactive ? handleMouseMove : undefined}
        onMouseEnter={interactive ? handleMouseEnter : undefined}
        onMouseLeave={interactive ? handleMouseLeave : undefined}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

// Specialized card variants
export const GlassCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="glass"
      hoverEffect="glow"
      {...props}
    />
  )
);

GlassCard.displayName = "GlassCard";

export const PremiumCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="premium"
      hoverEffect="lift"
      gradientBorder
      {...props}
    />
  )
);

PremiumCard.displayName = "PremiumCard";

export const PokemonCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (props, ref) => (
    <AnimatedCard
      ref={ref}
      variant="pokemon"
      hoverEffect="tilt"
      glowColor="#6366f1"
      {...props}
    />
  )
);

PokemonCard.displayName = "PokemonCard";

// Flip Card Component
interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  flipOnHover?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  ({ 
    front, 
    back, 
    className,
    flipOnHover = true,
    isFlipped: controlledFlipped,
    onFlip,
    ...props 
  }, ref) => {
    const [internalFlipped, setInternalFlipped] = React.useState(false);
    const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

    const handleFlip = () => {
      if (onFlip) {
        onFlip();
      } else {
        setInternalFlipped(!internalFlipped);
      }
    };

    const cardVariants = {
      front: { rotateY: 0 },
      back: { rotateY: 180 }
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full h-full perspective-1000", className)}
        onMouseEnter={flipOnHover ? handleFlip : undefined}
        onMouseLeave={flipOnHover ? handleFlip : undefined}
        onClick={!flipOnHover ? handleFlip : undefined}
        {...props}
      >
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
          variants={cardVariants}
          animate="front"
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatedCard className="w-full h-full">
            {front}
          </AnimatedCard>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden cursor-pointer"
          variants={cardVariants}
          animate="back"
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatedCard className="w-full h-full">
            {back}
          </AnimatedCard>
        </motion.div>
      </div>
    );
  }
);

FlipCard.displayName = "FlipCard";

// Stacked Cards Component
interface StackedCardsProps {
  cards: ReactNode[];
  className?: string;
  stackOffset?: number;
  hoverExpand?: boolean;
}

export const StackedCards = forwardRef<HTMLDivElement, StackedCardsProps>(
  ({ cards, className, stackOffset = 8, hoverExpand = true }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{
              y: index * stackOffset,
              scale: 1 - index * 0.02,
              zIndex: cards.length - index,
            }}
            whileHover={hoverExpand ? {
              y: index * (stackOffset * 2),
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              }
            } : undefined}
          >
            {card}
          </motion.div>
        ))}
      </div>
    );
  }
);

StackedCards.displayName = "StackedCards";