"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, HardHat, ShieldCheck, Globe, Award } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { useTheme } from "./ThemeProvider";

interface HeroSectionProps {
  onStartProject: () => void;
  onWatchPortfolio: () => void;
}

export default function HeroSection({ onStartProject, onWatchPortfolio }: HeroSectionProps) {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 15, // Max 15px subtle movement
      y: (clientY / innerHeight - 0.5) * 15,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen w-full overflow-hidden flex items-end pt-32 pb-16 transition-colors duration-300 ${
        theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
      }`}
    >
      {/* Cinematic Industrial Construction Background Image */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1800&auto=format&fit=crop"
          alt="Vanguard Construct Mega Infrastructure"
          fill
          priority
          className={`object-cover transition-opacity duration-300 ${
            theme === "light" ? "opacity-20" : "opacity-50"
          }`}
        />
      </motion.div>

      {/* Subtle Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div
        className={`absolute inset-0 pointer-events-none ${
          theme === "light"
            ? "bg-gradient-to-t from-[#F8F6F1] via-[#F8F6F1]/70 to-transparent"
            : "bg-gradient-to-t from-[#0D1321] via-[#0D1321]/60 to-transparent"
        }`}
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-3 border backdrop-blur-md px-4 py-2 rounded-full ${
            theme === "light"
              ? "bg-white/80 border-[#B8901F]/40"
              : "bg-white/5 border-[#C9A227]/40"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-[#C9A227] animate-ping" />
          <span className="text-[11px] font-bold text-[#C9A227] font-mono tracking-[0.2em] uppercase">
            ENGINEERING EXCELLENCE SINCE 1998
          </span>
        </motion.div>

        {/* Massive Headline (Archivo Expanded font, real display font) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[96px] font-extrabold uppercase tracking-tight leading-[1.12] max-w-5xl">
            We Build <span className="gold-gradient-text underline decoration-[#C9A227]/40 decoration-4">Tomorrow</span>
          </h1>
          <h2 className={`font-heading text-xl sm:text-3xl font-extrabold uppercase tracking-wider leading-[1.25] ${
            theme === 'light' ? 'text-[#0D1321]/90' : 'text-slate-200'
          }`}>
            KIẾN TẠO HẠ TẦNG & CÔNG TRÌNH BIỂU TƯỢNG TOÀN CẦU
          </h2>
        </motion.div>

        {/* Subheadline & Paragraph (Text contrast >= 4.5:1, normal case) */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`text-sm sm:text-base max-w-2xl font-normal leading-[1.6] ${
            theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
          }`}
        >
          Tập đoàn tổng thầu xây dựng EPC & kỹ thuật hạ tầng quy mô tỷ đô. Đột phá công nghệ BIM 5D, chuẩn an toàn quốc tế Zero-Accident và cam kết độ bền trên 100 năm.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
        >
          {/* Main Hero CTA Button with gradient background */}
          <Button
            onClick={onStartProject}
            className="gold-gradient-bg text-[#0D1321] font-extrabold rounded-full text-base tracking-[0.15em] uppercase px-[40px] py-[18px] h-auto shadow-[0_0_30px_rgba(201,162,39,0.4)] border-none transition-all hover:brightness-110 hover:-translate-y-0.5"
          >
            START YOUR PROJECT <ArrowRight className="ml-2 h-5 w-5 inline" />
          </Button>

          <Button
            onClick={onWatchPortfolio}
            variant="outline"
            className={`border rounded-full text-xs font-extrabold tracking-[0.15em] uppercase px-8 py-[18px] h-auto backdrop-blur-md transition-all hover:-translate-y-0.5 ${
              theme === "light"
                ? "border-[#0D1321]/30 text-[#0D1321] hover:bg-[#0D1321]/5"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            <Play className="mr-2 h-4 w-4 text-[#C9A227] inline fill-[#C9A227]" /> WATCH PORTFOLIO
          </Button>
        </motion.div>

        {/* Floating Statistics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t ${
            theme === "light" ? "border-[#0D1321]/10" : "border-white/10"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl">26+ Years</p>
              <p className={`text-[10px] font-mono uppercase font-bold tracking-widest ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                Kinh Nghiệm Kỹ Thuật
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
              <HardHat className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl">450+ Mega</p>
              <p className="text-[10px] text-[#C9A227] font-mono uppercase font-bold tracking-widest">
                Dự Án Đã Bàn Giao
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl">3,200+</p>
              <p className={`text-[10px] font-mono uppercase font-bold tracking-widest ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                Kỹ Sư & Chuyên Gia
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl">18+ Nations</p>
              <p className={`text-[10px] font-mono uppercase font-bold tracking-widest ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                Thị Trường Quốc Tế
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
