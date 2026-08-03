"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface HeroCinematicProps {
  onExplore: () => void;
  onBookShowroom: () => void;
}

export default function HeroCinematic({ onExplore, onBookShowroom }: HeroCinematicProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const titleWordsLine1 = ["Vẻ", "Đẹp", "Vượt", "Thời", "Gian"];
  const titleWordsLine2 = ["Cho", "Không", "Gian", "Sống", "Thượng", "Hạng"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] sm:h-[90vh] w-full bg-[#2A2724] overflow-hidden flex items-end selection:bg-[#9A7B4F]/30"
    >
      {/* Background Image with Slow Ken Burns Zoom Effect */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
          alt="Stona Slab Architectural Surface Showcase"
          fill
          priority
          className="object-cover opacity-85"
        />
      </motion.div>

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724] via-[#2A2724]/40 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#2A2724]/20 to-[#2A2724]/80 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="text-[11px] font-bold text-[#E8D0AA] uppercase tracking-[0.25em] block">
            STONE GALLERY & ARCHITECTURAL SURFACES
          </span>
        </motion.div>

        {/* Word-by-Word Staggered Title Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-6xl font-normal leading-[1.12] text-white max-w-3xl"
        >
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {titleWordsLine1.map((word, idx) => (
              <motion.span key={idx} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
            {titleWordsLine2.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="inline-block italic text-[#E8D0AA]"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Subheading Fade In */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal"
        >
          Bộ sưu tập đá tự nhiên & gạch khổ lớn Big Slab 120x240cm nhập khẩu chính ngạch từ Ý & Tây Ban Nha. Tối giản, kiêu sa và đắt giá.
        </motion.p>

        {/* CTA Buttons Slide Upward */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <Button
            onClick={onExplore}
            data-cursor="hover"
            data-cursor-text="XEM"
            className="bg-[#9A7B4F] hover:bg-[#85683F] text-white font-bold rounded-full text-xs tracking-[0.15em] uppercase px-8 py-3.5 shadow-xl border-none transition-all hover:scale-105"
          >
            KHÁM PHÁ BỘ SƯU TẬP
          </Button>

          <button
            onClick={onBookShowroom}
            data-cursor="hover"
            className="text-xs font-bold text-white hover:text-[#E8D0AA] tracking-[0.15em] uppercase flex items-center gap-2 transition-colors py-2 group"
          >
            <span>Đặt lịch tư vấn trực tiếp</span>
            <ArrowRight className="h-4 w-4 text-[#E8D0AA] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 right-6 sm:right-12 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.25em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-[#E8D0AA]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
