import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  label: string;
  title: string;
  titleAccent?: string;
}

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, label, title, titleAccent, className, children, ...props }, ref) => {
    return (
      <section
        id={id}
        ref={ref}
        className={cn(
          "w-full py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-20",
          className
        )}
        {...props}
      >
        <div className="mb-10">
          <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-text-3 mb-2">
            {label}
          </span>
          <div className="w-12 h-px bg-gradient-to-r from-brand-violet to-transparent opacity-30 mb-3" />
          <h2 className="font-display font-extrabold text-[clamp(24px,3.5vw,40px)] tracking-[-0.02em] text-text">
            {title}{" "}
            {titleAccent && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">
                {titleAccent}
              </span>
            )}
          </h2>
        </div>
        {children}
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";
