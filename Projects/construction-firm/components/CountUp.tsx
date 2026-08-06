"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string; // e.g. "26+", "450+", "3.200+", "18", "48 tỷ USD", "96%", "99.9%"
  duration?: number;
  className?: string;
  glowOnComplete?: boolean;
}

export default function CountUp({
  value,
  duration = 1.8,
  className = "",
  glowOnComplete = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const parsed = parseValue(value);
  const [displayValue, setDisplayValue] = useState(
    shouldReduceMotion ? value : formatNumber(0, parsed)
  );
  const [hasCompleted, setHasCompleted] = useState(shouldReduceMotion ? true : false);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setHasCompleted(true);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic: 1 - (1 - t)^3
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = parsed.target * easedProgress;

      setDisplayValue(formatNumber(currentNum, parsed));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setHasCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, duration, value, shouldReduceMotion, parsed]);

  const glowStyle =
    glowOnComplete && (isInView || hasCompleted)
      ? {
          textShadow:
            "0 0 12px rgba(0, 229, 255, 0.5), 0 0 24px rgba(0, 229, 255, 0.25)",
        }
      : {};

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-500 ${className}`}
      style={glowStyle}
    >
      {shouldReduceMotion ? value : displayValue}
    </span>
  );
}

interface ParsedNumber {
  prefix: string;
  target: number;
  decimals: number;
  useDotSeparator: boolean;
  suffix: string;
}

function parseValue(val: string): ParsedNumber {
  const match = val.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!match) {
    return { prefix: "", target: 0, decimals: 0, useDotSeparator: false, suffix: val };
  }

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  let useDotSeparator = false;
  let decimals = 0;
  let target = 0;

  if (numStr.includes(".") && !numStr.includes(",")) {
    const parts = numStr.split(".");
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      useDotSeparator = true;
      target = parseFloat(numStr.replace(/\./g, ""));
    } else {
      decimals = parts[1] ? parts[1].length : 0;
      target = parseFloat(numStr);
    }
  } else if (numStr.includes(",")) {
    const clean = numStr.replace(/,/g, ".");
    target = parseFloat(clean);
  } else {
    target = parseFloat(numStr);
  }

  return { prefix, target, decimals, useDotSeparator, suffix };
}

function formatNumber(num: number, parsed: ParsedNumber): string {
  let numFormatted = "";
  if (parsed.useDotSeparator) {
    const intVal = Math.round(num);
    numFormatted = intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else if (parsed.decimals > 0) {
    numFormatted = num.toFixed(parsed.decimals);
  } else {
    numFormatted = Math.round(num).toString();
  }

  return `${parsed.prefix}${numFormatted}${parsed.suffix}`;
}
