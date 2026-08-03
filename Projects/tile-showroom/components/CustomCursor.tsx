"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute("data-cursor-text");
        if (text) setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          backgroundColor: isHovered ? "rgba(154, 123, 79, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(154, 123, 79, 0.8)" : "rgba(154, 123, 79, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#9A7B4F]/40 pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center"
      >
        {cursorText && (
          <span className="text-[8px] font-bold uppercase tracking-widest text-[#9A7B4F] select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#9A7B4F] pointer-events-none z-50 hidden md:block"
      />
    </>
  );
}
