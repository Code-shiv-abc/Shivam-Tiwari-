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
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium px-5 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background group";

    const variants = {
      primary:
        "bg-brand-violet text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
      secondary:
        "bg-transparent border border-border text-text hover:border-brand-violet hover:text-white",
      ghost: "text-text-2 hover:text-text hover:bg-surface-2",
      cta: "bg-gradient-to-r from-brand-violet to-brand-cyan text-white border-0 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
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
