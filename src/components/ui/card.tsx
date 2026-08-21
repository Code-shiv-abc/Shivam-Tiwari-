"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: "violet" | "cyan" | "emerald" | "amber" | "red" | "none";
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      accentColor = "none",
      hoverable = true,
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
      none: "",
    };

    const accentGradients = {
      violet: "from-brand-violet to-transparent",
      cyan: "from-brand-cyan to-transparent",
      emerald: "from-brand-emerald to-transparent",
      amber: "from-brand-amber to-transparent",
      red: "from-brand-red to-transparent",
      none: "",
    };

    const MotionDiv = motion.div as any;

    return (
      <MotionDiv
        ref={ref}
        whileHover={hoverable ? { scale: 1.02, y: -6 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "relative group overflow-hidden rounded-2xl sm:rounded-[2rem]",
          "bg-background/80 backdrop-blur-md",
          "border border-border/50",
          "shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
          "dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          "transition-colors duration-300",
          paddings[padding],
          className
        )}
        {...props}
      >
        {/* Soft glowing background layer - only visible on hover */}
        {hoverable && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_50%,var(--color-accent)_0%,transparent_50%)] opacity-20 blur-3xl" />
          </div>
        )}

        {accentColor !== "none" && (
          <div
            className={cn(
              "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r opacity-60 transition-opacity duration-300 ease-out group-hover:opacity-100",
              accentGradients[accentColor]
            )}
          />
        )}

        {/* Card content */}
        <div className="relative z-10">{children}</div>
      </MotionDiv>
    );
  }
);
Card.displayName = "Card";
