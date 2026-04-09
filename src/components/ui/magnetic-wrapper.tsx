"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticWrapperProps {
  children: React.ReactElement;
  distance?: number;
  pull?: number;
}

export function MagneticWrapper({
  children,
  distance = 60,
  pull = 0.3
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 400, damping: 28 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Distance from mouse to center of the element
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (totalDistance < distance + Math.max(width, height) / 2) {
        setIsHovered(true);
        x.set(distanceX * pull);
        y.set(distanceY * pull);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [distance, pull, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
