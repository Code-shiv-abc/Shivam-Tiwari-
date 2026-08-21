import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  id: string;
  label: string;
  title: React.ReactNode;
  titleAccent?: React.ReactNode;
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
          <h2 className="font-display font-extrabold text-[clamp(24px,3.5vw,40px)] tracking-[-0.02em] text-text flex flex-wrap gap-x-2">
            <span>{title}</span>
            {titleAccent && (
              typeof titleAccent === 'string' ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan inline-block">
                  {titleAccent}
                </span>
              ) : (
                React.isValidElement<{ className?: string }>(titleAccent) && titleAccent.type !== React.Fragment
                  ? React.cloneElement(titleAccent, {
                      className: cn(titleAccent.props.className, "text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan")
                    })
                  : titleAccent
              )
            )}
          </h2>
        </div>
        {children}
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";
