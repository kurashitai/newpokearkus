import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Glass Card Component
export const GlassCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
GlassCard.displayName = "GlassCard";

// Glass Button Component
interface GlassButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const GlassButton = forwardRef<
  HTMLButtonElement,
  GlassButtonProps
>(({ className, variant = 'primary', children, ...props }, ref) => {
  const variantStyles = {
    primary: "bg-primary/20 hover:bg-primary/30 text-primary border-primary/30",
    secondary: "bg-white/10 hover:bg-white/20 text-foreground border-white/20",
    outline: "bg-transparent hover:bg-white/10 text-foreground border-white/30"
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      className={cn(
        "backdrop-blur-sm border transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});
GlassButton.displayName = "GlassButton";

// Glass Input Component
export const GlassInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      "bg-white/10 backdrop-blur-sm border-white/20 text-foreground placeholder:text-muted-foreground",
      "focus:bg-white/20 focus:border-white/40",
      className
    )}
    {...props}
  />
));
GlassInput.displayName = "GlassInput";
