import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: "violet" | "cyan" | "emerald" | "amber" | "red" | "none";
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      accentColor = "none",
      hoverable = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const paddings = {
      sm: "p-4",
      md: "p-7",
      lg: "p-10",
    };

    const accentGradients = {
      violet: "from-brand-violet to-transparent",
      cyan: "from-brand-cyan to-transparent",
      emerald: "from-brand-emerald to-transparent",
      amber: "from-brand-amber to-transparent",
      red: "from-brand-red to-transparent",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-surface border border-border rounded-[14px] overflow-hidden",
          hoverable &&
            "transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]",
          paddings[padding],
          className
        )}
        {...props}
      >
        {accentColor !== "none" && (
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r opacity-80",
              accentGradients[accentColor]
            )}
          />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";
