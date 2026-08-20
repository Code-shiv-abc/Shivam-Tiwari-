import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "cta";
  rightIcon?: boolean | React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", rightIcon, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium px-5 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background group cursor-pointer";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent/90 hover:shadow-[0_0_20px_var(--color-accent)]",
      secondary:
        "bg-transparent border border-border text-foreground hover:border-accent hover:text-accent",
      ghost: "text-muted-foreground hover:text-foreground hover:bg-surface",
      cta: "bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] hover:shadow-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
        {rightIcon && rightIcon === true ? (
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        ) : (
          rightIcon
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
