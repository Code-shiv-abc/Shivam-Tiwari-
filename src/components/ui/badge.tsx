import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "violet" | "cyan" | "emerald" | "amber" | "red" | "ghost";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "violet", size = "sm", dot, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center gap-2 rounded-full font-mono uppercase tracking-[0.1em] border backdrop-blur-sm";

    const sizes = {
      sm: "text-[10px] px-2.5 py-1",
      md: "text-xs px-3 py-1.5",
    };

    const variantStyles = {
      violet: "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
      cyan: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
      emerald: "bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20",
      amber: "bg-brand-amber/10 text-brand-amber border-brand-amber/20",
      red: "bg-brand-red/10 text-brand-red border-brand-red/20",
      ghost: "bg-surface-2/50 text-text-3 border-border-soft",
    };

    const dotColors = {
      violet: "bg-brand-violet",
      cyan: "bg-brand-cyan",
      emerald: "bg-brand-emerald",
      amber: "bg-brand-amber",
      red: "bg-brand-red",
      ghost: "bg-text-3",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, sizes[size], variantStyles[variant], className)}
        {...props}
      >
        {dot && (
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-50",
                dotColors[variant]
              )}
            ></span>
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                dotColors[variant]
              )}
            ></span>
          </span>
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
