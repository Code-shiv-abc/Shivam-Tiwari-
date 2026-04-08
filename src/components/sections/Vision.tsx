"use client";

import React from "react";
import { motion } from "framer-motion";
import { VISION_QUOTE } from "@/lib/constants";
import { useScrollReveal } from "@/lib/animations";

export function Vision() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({
    margin: "-100px 0px 0px 0px",
    once: true,
  });

  // Split quote into words for staggered animation
  const words = VISION_QUOTE.quote.split(" ");

  // Create highlight strings (could be exact phrase matching, simpler to just check if word is in highlight array, but let's do phrase matching safely)
  // For exact phrase matching, we can map the words and check if they belong to a highlight phrase.
  // A simpler robust way: replace highlight strings with a token, or just do simple word matching if they are unique.
  // Given: "empowering people" and "elegant, scalable solutions."
  const isHighlighted = (word: string) => {
    // Basic check: see if the word (ignoring punctuation) is part of any highlight phrase.
    const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
    return VISION_QUOTE.highlights.some((h) => h.includes(cleanWord) && cleanWord.length > 3);
  };

  // Improved phrase matching based on exact highlight strings:
  // Instead of splitting the whole quote naively, we'll split by words but maintain the space.

  return (
    <section id="vision" className="relative w-full py-32 bg-surface overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          animate={{
            x: ["0%", "20%", "-10%", "0%"],
            y: ["0%", "-20%", "10%", "0%"],
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-violet/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: ["0%", "-30%", "20%", "0%"],
            y: ["0%", "20%", "-20%", "0%"],
          }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "mirror", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-brand-cyan/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 0.9, 1],
            x: ["0%", "10%", "-10%", "0%"],
          }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "mirror", delay: 5 }}
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-surface-3/40 blur-[80px]"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-20 text-center" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] text-text-3 uppercase tracking-[0.2em] mb-8"
        >
          {VISION_QUOTE.label}
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-[60px] h-[2px] mx-auto bg-gradient-to-r from-brand-violet to-brand-cyan mb-8 origin-left"
        />

        {/* Quote */}
        <div className="font-display font-bold text-[clamp(28px,5vw,52px)] leading-[1.2] text-text mb-8">
          {words.map((word, index) => {
            // Very naive check for gradient highlight based on the provided string.
            // Works for "empowering people" and "elegant, scalable solutions."
            const shouldHighlight =
              word.includes("empowering") ||
              word.includes("people") ||
              word.includes("elegant,") ||
              word.includes("scalable") ||
              word.includes("solutions.");

            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={isVisible ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(4px)" }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.05,
                  ease: "easeOut",
                }}
                className={`inline-block mr-2 ${
                  shouldHighlight
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan"
                    : ""
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </div>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 + words.length * 0.05 + 0.2 }}
          className="font-sans italic text-text-3 text-lg"
        >
          {VISION_QUOTE.attribution}
        </motion.div>
      </div>
    </section>
  );
}
