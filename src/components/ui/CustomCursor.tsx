"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "link" | "button">("default");
  const [isClicked, setIsClicked] = useState(false);

  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only on desktop
    if (typeof window !== "undefined" && window.innerWidth <= 1024) return;

    // Check if device has touch capability, don't show cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isLink = target.closest("a");
      const isButton = target.closest("button");

      if (isButton) {
        setCursorState("button");
      } else if (isLink) {
        setCursorState("link");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Restore cursor on unmount or mouseleave window
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "transparent",
      borderColor: "rgba(167, 139, 250, 0.6)",
      borderWidth: 1.5,
    },
    link: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(167, 139, 250, 0.15)", // violet 15%
      borderColor: "rgba(167, 139, 250, 1)", // violet
      borderWidth: 1.5,
    },
    button: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(167, 139, 250, 0.15)",
      borderColor: "rgba(167, 139, 250, 1)",
      borderWidth: 1.5,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center overflow-hidden mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={cursorState}
      initial="default"
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
    >
      <motion.div
        animate={{
          scale: isClicked ? 0.85 : 1,
          opacity: cursorState === "button" ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="text-[8px] font-mono font-bold text-brand-violet whitespace-nowrap tracking-wider"
      >
        {cursorState === "button" && "→ Click"}
      </motion.div>
    </motion.div>
  );
}
