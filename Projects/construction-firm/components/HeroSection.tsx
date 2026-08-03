"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, HardHat, ShieldCheck, Globe, Award, ChevronDown } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface HeroSectionProps {
  onStartProject: () => void;
  onWatchPortfolio: () => void;
}

export default function HeroSection({ onStartProject, onWatchPortfolio }: HeroSectionProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 15,
      y: (clientY / innerHeight - 0.5) * 15,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#0B0F19] text-white overflow-hidden flex items-end pt-32 pb-16 selection:bg-[#F4B942]/30"
    >
      {/* Cinematic Industrial Construction Background Image */}
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
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1800&auto=format&fit=crop"
          alt="Vanguard Construct Mega Infrastructure"
          fill
          priority
          className="object-cover opacity-60"
        />
      </motion.div>

      {/* Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0B0F19]/40 to-[#0B0F19]/90 pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-3 bg-white/5 border border-[#F4B942]/40 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <span className="h-2 w-2 rounded-full bg-[#F4B942] animate-ping" />
          <span className="text-[11px] font-bold text-[#F4B942] font-mono tracking-[0.2em] uppercase">
            ENGINEERING EXCELLENCE SINCE 1998
          </span>
        </motion.div>

        {/* Massive Headline 72~110px */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-2"
        >
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[100px] font-extrabold uppercase tracking-tight text-white leading-[0.95] max-w-5xl">
            We Build <span className="text-[#F4B942] underline decoration-[#F4B942]/40 decoration-4">Tomorrow</span>
          </h1>
          <p className="font-heading text-2xl sm:text-4xl text-slate-300 font-bold uppercase tracking-wider">
            KIẾN TẠO HẠ TẦNG & CÔNG TRÌNH BIỂU TƯỢNG TOÀN CẦU
          </p>
        </motion.div>

        {/* Subheadline & Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-slate-300 text-sm sm:text-lg max-w-2xl font-normal leading-relaxed"
        >
          Tập đoàn tổng thầu xây dựng EPC & kỹ thuật hạ tầng quy mô tỷ đô. Đột phá công nghệ BIM 5D, chuẩn an toàn quốc tế Zero-Accident và cam kết độ bền trên 100 năm.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
        >
          <Button
            onClick={onStartProject}
            className="bg-[#F4B942] hover:bg-[#e0a430] text-[#0B0F19] font-extrabold rounded-full text-xs tracking-[0.2em] uppercase px-9 py-4 shadow-[0_0_30px_rgba(244,185,66,0.5)] border-none transition-all hover:scale-105"
          >
            START YOUR PROJECT <ArrowRight className="ml-2 h-4 w-4 inline" />
          </Button>

          <Button
            onClick={onWatchPortfolio}
            variant="outline"
            className="border border-white/20 text-white hover:bg-white/10 font-extrabold rounded-full text-xs tracking-[0.2em] uppercase px-8 py-4 backdrop-blur-md transition-all"
          >
            <Play className="mr-2 h-4 w-4 text-[#F4B942] inline fill-[#F4B942]" /> WATCH PORTFOLIO
          </Button>
        </motion.div>

        {/* Floating Statistics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl text-white">26+ Years</p>
              <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">Kinh Nghiệm Kỹ Thuật</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] shrink-0">
              <HardHat className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl text-white">450+ Mega</p>
              <p className="text-[10px] text-[#F4B942] font-mono uppercase font-bold tracking-widest">Dự Án Đã Bàn Giao</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl text-white">3,200+</p>
              <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">Kỹ Sư & Chuyên Gia</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-[#F4B942]/30 flex items-center justify-center text-[#F4B942] shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-2xl text-white">18+ Nations</p>
              <p className="text-[10px] text-slate-400 font-mono uppercase font-bold tracking-widest">Thị Trường Quốc Tế</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
