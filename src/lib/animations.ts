import { useEffect, useState, useRef } from "react";
import type { UseInViewOptions } from "framer-motion";
import { useInView } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// NOTE: stagger has been intentionally removed.
// It was propagating opacity:0 to all children in Hero
// and freezing the entire left column invisible.
// Each element now manages its own entrance animation.

export function useScrollReveal<T extends HTMLElement>(
  options: UseInViewOptions = { once: true, margin: "-100px 0px 0px 0px" }
) {
  const ref = useRef<T>(null);
  const isInView = useInView(ref, options);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    } else if (!options.once) {
      setIsVisible(false);
    }
  }, [isInView, options.once]);

  return [ref, isVisible] as const;
}
