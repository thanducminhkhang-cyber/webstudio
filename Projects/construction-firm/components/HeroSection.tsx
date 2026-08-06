"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, HardHat, ShieldCheck, Globe, Award, Zap, Compass, UserCheck } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import CountUp from "./CountUp";

interface HeroSectionProps {
  onStartProject: () => void;
  onWatchPortfolio: () => void;
}

export default function HeroSection({ onStartProject, onWatchPortfolio }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Effect on Background Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const headlineWords = [
    { text: "WE", underline: false },
    { text: "BUILD", underline: false },
    { text: "TOMORROW", underline: true },
  ];

  const trustBadges = [
    { icon: Zap, color: "text-[#D4A017]", label: "Báo giá trong 24h" },
    { icon: Compass, color: "text-[#3B82F6]", label: "Khảo sát miễn phí" },
    { icon: UserCheck, color: "text-[#F97316]", label: "Tư vấn 1:1 Kỹ sư trưởng" },
  ];

  const heroStats = [
    {
      icon: Award,
      iconColor: "text-[#3B82F6]",
      val: "26+",
      label: "Năm Kinh Nghiệm",
    },
    {
      icon: HardHat,
      iconColor: "text-[#F97316]",
      val: "450+",
      label: "Dự Án Đã Bàn Giao",
    },
    {
      icon: ShieldCheck,
      iconColor: "text-[#3B82F6]",
      val: "3.200+",
      label: "Nhân Sự Kỹ Thuật",
    },
    {
      icon: Globe,
      iconColor: "text-[#D4A017]",
      val: "18",
      label: "Quốc Gia Hoạt Động",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-end pt-32 pb-16 text-white"
      style={{
        background: "linear-gradient(180deg, #0A0E1A 0%, #0F1729 60%, #0A0E1A 100%)",
      }}
    >
      {/* Industrial Construction Background Image with Parallax Scroll Effect */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform pointer-events-none"
      >
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1800&auto=format&fit=crop"
          alt="Vanguard Construct Mega Infrastructure Site"
          fill
          priority
          className="object-cover opacity-30 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/75 to-transparent" />
      </motion.div>

      {/* Radial Cyan Glow Overlay (Behind Headline) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 z-0"
        style={{
          background:
            "radial-gradient(circle at 40% 30%, rgba(0, 229, 255, 0.08) 0%, rgba(0, 229, 255, 0) 70%)",
        }}
      />

      {/* Blueprint Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Subtle Logo Mark Watermark in Corner (Opacity 0.04) */}
      <div className="absolute top-1/4 right-10 pointer-events-none opacity-[0.04] text-[#D4A017] z-0">
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

        {/* Main Headline with Staggered Word Reveal */}
        <div className="space-y-3">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-[80px] font-extrabold uppercase tracking-tight leading-[1.1] max-w-5xl text-white flex flex-wrap gap-x-4">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.05,
                  ease: "easeOut",
                }}
                className={word.underline ? "accent-underline text-white" : ""}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-[#94A3B8] max-w-3xl"
          >
            KIẾN TẠO HẠ TẦNG & CÔNG TRÌNH BIỂU TƯỢNG TOÀN CẦU
          </motion.h2>
        </div>

        {/* Subheadline Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm sm:text-base max-w-2xl font-normal leading-relaxed text-[#94A3B8]"
        >
          Tập đoàn tổng thầu xây dựng EPC & kỹ thuật hạ tầng quy mô lớn. Đột phá ứng dụng công nghệ BIM 5D, chuẩn an toàn quốc tế Zero-Accident và cam kết tuổi thọ công trình trên 100 năm.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
        >
          <Button
            onClick={onStartProject}
            className="btn-cta-gold bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-sm tracking-wider uppercase px-8 py-4 h-auto border-none"
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

        {/* Quick Commitment Ribbon / Trust Badges (Fade-in-up staggered) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl border-t border-[#334155]">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
                className="flex items-center gap-3 bg-[#1E293B]/80 border border-[#334155] p-3 rounded-xl backdrop-blur-md"
              >
                <Icon className={`h-5 w-5 ${badge.color} shrink-0`} />
                <span className="text-xs font-bold text-white">{badge.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Statistics Bar (Staggered Fade-in-up + CountUp) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-[#334155]">
          {heroStats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center shrink-0">
                  <Icon className={`h-5 w-5 ${st.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-[36px] leading-none text-[#D4A017]">
                    <CountUp value={st.val} glowOnComplete={true} glowColor="gold" />
                  </h3>
                  <p className="text-[10px] text-[#94A3B8] font-mono uppercase font-bold tracking-wider mt-1">
                    {st.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
