"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles, ShieldCheck, Layers } from "lucide-react";
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
      x: (clientX / innerWidth - 0.5) * 15,
      y: (clientY / innerHeight - 0.5) * 15,
    });
  };

  const titleWordsLine1 = ["KỶ", "NGUYÊN", "BỀ", "MẶT"];
  const titleWordsLine2 = ["ĐÁ", "TẤM", "KHỔ", "LỚN"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[88vh] sm:h-[92vh] w-full bg-[#0D0D0C] overflow-hidden flex items-end selection:bg-[#C5A880]/30"
    >
      {/* Background Image with Slow Ken Burns Zoom Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{
          transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"
          alt="Stona Slab Modern Architecture Showcase"
          fill
          priority
          className="object-cover opacity-80"
        />
      </motion.div>

      {/* Modern High-Tech Gradient & Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-[#0D0D0C]/40 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0D0D0C]/30 to-[#0D0D0C]/90 pointer-events-none" />

      {/* Floating Modern Tech Badge Top Right */}
      <div className="absolute top-8 right-6 sm:right-12 z-20 hidden md:flex items-center gap-3 bg-[#161514]/80 border border-[#C5A880]/30 backdrop-blur-xl px-4 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#C5A880]">
        <span className="h-2 w-2 rounded-full bg-[#C5A880] animate-ping" />
        <span>ITALIAN PORCELAIN BIG SLAB 120x240CM</span>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 w-full space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 bg-white/5 border border-[#C5A880]/40 backdrop-blur-md px-3.5 py-1.5 rounded-full"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
          <span className="text-[10px] font-bold text-[#E5D7C3] uppercase tracking-[0.2em]">
            FUTURE ARCHITECTURAL SURFACES
          </span>
        </motion.div>

        {/* Modern Bold Geometric Typography Reveal */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {titleWordsLine1.map((word, idx) => (
              <motion.span key={idx} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
            {titleWordsLine2.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="inline-block text-[#C5A880]"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Modern Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-slate-300 text-xs sm:text-base max-w-xl leading-relaxed font-normal"
        >
          Hệ sinh thái vật liệu đá khổ lớn 120x240cm nhập khẩu Ý & Tây Ban Nha. Tối giản, kiêu sa, siêu chống thấm với đường viền mài laser chuẩn 0.1mm.
        </motion.p>

        {/* CTA Buttons Slide Upward */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <Button
            onClick={onExplore}
            data-cursor="hover"
            data-cursor-text="EXPLORE"
            className="bg-[#C5A880] hover:bg-[#b0926a] text-[#0D0D0C] font-extrabold rounded-full text-xs tracking-[0.15em] uppercase px-8 py-4 shadow-[0_0_25px_rgba(197,168,128,0.4)] border-none transition-all hover:scale-105"
          >
            KHÁM PHÁ BỘ SƯU TẬP (12+)
          </Button>

          <button
            onClick={onBookShowroom}
            data-cursor="hover"
            className="text-xs font-bold text-white hover:text-[#C5A880] tracking-[0.15em] uppercase flex items-center gap-2 transition-colors py-2.5 px-4 rounded-full border border-white/20 hover:border-[#C5A880] backdrop-blur-md group"
          >
            <span>Đặt lịch tư vấn trực tiếp</span>
            <ArrowRight className="h-4 w-4 text-[#C5A880] group-hover:translate-x-1.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 right-6 sm:right-12 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-[#C5A880]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
