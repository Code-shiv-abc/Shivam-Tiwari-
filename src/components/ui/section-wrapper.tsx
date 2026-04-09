import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/animations";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  label: string;
  title: string;
  titleAccent?: string;
}

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, label, title, titleAccent, className, children, ...props }, ref) => {
    const [headerRef, isVisible] = useScrollReveal({ once: true, amount: 0.1 });

    // Split title into words for staggering
    const titleWords = title.split(" ");
    const accentWords = titleAccent ? titleAccent.split(" ") : [];

    // Merge refs
    const setRefs = React.useCallback(
      (node: HTMLElement) => {
        (headerRef as React.MutableRefObject<HTMLElement | null>).current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [headerRef, ref]
    );

    return (
      <section
        id={id}
        ref={setRefs}
        className={cn(
          "w-full py-20 lg:py-28 max-w-7xl mx-auto px-5 lg:px-20",
          className
        )}
        {...props}
      >
        <div className="mb-10 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-text-3 mb-2"
          >
            {label}
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-12 h-px bg-gradient-to-r from-brand-violet to-transparent opacity-30 mb-3 origin-left"
          />
          <h2 className="font-display font-extrabold text-[clamp(24px,3.5vw,40px)] tracking-[-0.02em] text-text flex flex-wrap gap-[0.2em]">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.05 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
            {accentWords.map((word, i) => (
              <motion.span
                key={`accent-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + (titleWords.length + i) * 0.05 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>
        {children}
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";
