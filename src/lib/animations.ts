import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

import type { UseInViewOptions } from "framer-motion";

export function useScrollReveal(options: UseInViewOptions = { once: true, margin: "-100px 0px 0px 0px" }) {
  const ref = useRef<any>(null);
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
