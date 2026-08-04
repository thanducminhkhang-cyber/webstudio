"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HardHat, ShieldCheck, Globe, Award, Zap, Compass, UserCheck } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface HeroSectionProps {
  onStartProject: () => void;
  onWatchPortfolio: () => void;
}

export default function HeroSection({ onStartProject, onWatchPortfolio }: HeroSectionProps) {
  // Parallax Scroll Effect on Background Image (ratio ~0.35)
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 260]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-end pt-32 pb-16 bg-[#0F172A] text-white">
      {/* Industrial Construction Background Image with Parallax Scroll Effect */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1800&auto=format&fit=crop"
          alt="Vanguard Construct Mega Infrastructure Site"
          fill
          priority
          className="object-cover opacity-35 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent" />
      </motion.div>

      {/* Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Subtle Logo Mark Watermark in Corner (Opacity 0.04) */}
      <div className="absolute top-1/4 right-10 pointer-events-none opacity-[0.04] text-[#D4A017]">
        <svg className="w-[450px] h-[450px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4l8 16L20 4" />
          <path d="M8 4l4 8 4-8" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 border border-[#334155] bg-[#1E293B]/80 backdrop-blur-md px-4 py-2 rounded-full"
        >
          <span className="h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="text-[11px] font-bold text-[#94A3B8] font-mono tracking-[0.2em] uppercase">
            ENGINEERING EXCELLENCE SINCE 1998
          </span>
        </motion.div>

        {/* Main Headline Fade-in + Slide-up (Duration 0.6s, Ease-out, Delay 0.2s) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="space-y-3"
        >
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tight leading-[1.1] max-w-5xl text-white">
            WE BUILD <span className="accent-underline text-white">TOMORROW</span>
          </h1>
          <h2 className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#94A3B8] max-w-3xl">
            KIẾN TẠO HẠ TẦNG & CÔNG TRÌNH BIỂU TƯỢNG TOÀN CẦU
          </h2>
        </motion.div>

        {/* Subheadline Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm sm:text-base max-w-2xl font-normal leading-relaxed text-[#94A3B8]"
        >
          Tập đoàn tổng thầu xây dựng EPC & kỹ thuật hạ tầng quy mô lớn. Đột phá ứng dụng công nghệ BIM 5D, chuẩn an toàn quốc tế Zero-Accident và cam kết tuổi thọ công trình trên 100 năm.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
        >
          <Button
            onClick={onStartProject}
            className="bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-sm tracking-wider uppercase px-8 py-4 h-auto border-none transition-colors"
          >
            NHẬN BÁO GIÁ MIỄN PHÍ <ArrowRight className="ml-2 h-4 w-4 inline text-[#0F172A]" />
          </Button>

          <Button
            onClick={onWatchPortfolio}
            variant="outline"
            className="border border-[#334155] bg-[#1E293B]/60 hover:bg-[#1E293B] text-white rounded-xl text-xs font-bold tracking-wider uppercase px-6 py-4 h-auto backdrop-blur-md transition-colors"
          >
            XEM DỰ ÁN TIÊU BIỂU
          </Button>
        </motion.div>

        {/* Quick Commitment Ribbon (Lead-Gen Boost) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl border-t border-[#334155]"
        >
          <div className="flex items-center gap-3 bg-[#1E293B]/80 border border-[#334155] p-3 rounded-xl backdrop-blur-md">
            <Zap className="h-5 w-5 text-[#D4A017] shrink-0" />
            <span className="text-xs font-bold text-white">Báo giá trong 24h</span>
          </div>

          <div className="flex items-center gap-3 bg-[#1E293B]/80 border border-[#334155] p-3 rounded-xl backdrop-blur-md">
            <Compass className="h-5 w-5 text-[#3B82F6] shrink-0" />
            <span className="text-xs font-bold text-white">Khảo sát miễn phí</span>
          </div>

          <div className="flex items-center gap-3 bg-[#1E293B]/80 border border-[#334155] p-3 rounded-xl backdrop-blur-md">
            <UserCheck className="h-5 w-5 text-[#F97316] shrink-0" />
            <span className="text-xs font-bold text-white">Tư vấn 1:1 Kỹ sư trưởng</span>
          </div>
        </motion.div>

        {/* Statistics Bar (Static display, text-3xl / 36px) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#334155]"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#3B82F6] shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[36px] leading-none text-white">26+</p>
              <p className="text-[10px] text-[#94A3B8] font-mono uppercase font-bold tracking-wider mt-1">
                Năm Kinh Nghiệm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#F97316] shrink-0">
              <HardHat className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[36px] leading-none text-white">450+</p>
              <p className="text-[10px] text-[#94A3B8] font-mono uppercase font-bold tracking-wider mt-1">
                Dự Án Đã Bàn Giao
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#3B82F6] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[36px] leading-none text-white">3.200+</p>
              <p className="text-[10px] text-[#94A3B8] font-mono uppercase font-bold tracking-wider mt-1">
                Nhân Sự Kỹ Thuật
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#D4A017] shrink-0">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[36px] leading-none text-white">18</p>
              <p className="text-[10px] text-[#94A3B8] font-mono uppercase font-bold tracking-wider mt-1">
                Quốc Gia Hoạt Động
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
