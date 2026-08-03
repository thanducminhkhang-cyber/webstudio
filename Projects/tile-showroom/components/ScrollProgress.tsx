"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ width: `${progress}%` }}
      className="fixed top-0 left-0 h-[2.5px] bg-[#9A7B4F] z-50 transition-all duration-150 ease-out pointer-events-none shadow-[0_0_8px_rgba(154,123,79,0.8)]"
    />
  );
}
