"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Search, Layers, ShoppingBag, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const progressLineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      step: "01",
      title: "Khảo Sát & Khả Thi",
      subtitle: "Feasibility Study",
      desc: "Khảo sát địa chất hầm sâu, đánh giá tác động môi trường và quy hoạch mặt bằng thi công.",
      icon: Search,
    },
    {
      step: "02",
      title: "Số Hóa BIM 5D",
      subtitle: "Engineering Design",
      desc: "Lập mô hình 3D kết cấu, mô phỏng xung đột MEP và lập tiến độ thi công thời gian thực.",
      icon: Layers,
    },
    {
      step: "03",
      title: "Mua Sắm Vật Tư",
      subtitle: "Procurement EPC",
      desc: "Cung ứng vật tư kết cấu thép, bê tông mác cao và thiết bị siêu trọng từ các tập đoàn hàng đầu.",
      icon: ShoppingBag,
    },
    {
      step: "04",
      title: "Thi Công & HSE",
      subtitle: "Construction Execution",
      desc: "Triển khai thi công thực địa với kỷ luật an toàn lao động tuyệt đối và kiểm soát chất lượng.",
      icon: ShieldCheck,
    },
    {
      step: "05",
      title: "Nghiệm Thu & Bàn Giao",
      subtitle: "Commissioning",
      desc: "Chạy thử tải toàn hệ thống, nghiệm thu PCCC và bàn giao công trình đưa vào vận hành.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-24 px-4 sm:px-6 bg-[#0F172A] text-white border-t border-[#334155]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#00E5FF] uppercase tracking-[0.25em] font-mono">
            WORKFLOW STANDARDS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Quy Trình Thi Công Chuẩn EPC Quốc Tế
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            5 Bước quản trị dự án nghiêm ngặt đảm bảo tiến độ và chất lượng cho các công trình cấp đặc biệt.
          </p>
        </div>

        {/* Timeline Graphic Container */}
        <div className="relative pt-8 pb-4">
          {/* DESKTOP TIMELINE (≥1024px): Connected horizontal progress line */}
          <div className="hidden lg:block relative min-h-[380px]">
            {/* Background Line (Upcoming portion, 25% opacity cyan-dim) */}
            <div className="absolute top-1/2 left-[8%] right-[8%] h-[2px] bg-[#0891B2]/25 -translate-y-1/2 z-0" />

            {/* Filled Progress Line (Full opacity cyan #00E5FF) */}
            <motion.div
              style={{ width: progressLineWidth }}
              className="absolute top-1/2 left-[8%] max-w-[84%] h-[2px] bg-[#00E5FF] -translate-y-1/2 z-0 origin-left shadow-[0_0_12px_rgba(0,229,255,0.6)]"
            />

            {/* 5 Step Items */}
            <div className="relative z-10 flex items-center justify-between px-4 h-full">
              {steps.map((st, idx) => {
                const isAbove = idx % 2 === 0;
                const Icon = st.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: isAbove ? -20 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + idx * 0.12 }}
                    className={`flex ${isAbove ? "flex-col" : "flex-col-reverse"} items-center text-center max-w-[190px] group cursor-pointer`}
                  >
                    {/* Text Content */}
                    <div className={isAbove ? "mb-6 space-y-1.5" : "mt-6 space-y-1.5"}>
                      <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-wider block">
                        {st.subtitle}
                      </span>
                      <h3 className="font-heading font-extrabold text-base uppercase text-white group-hover:text-[#00E5FF] transition-colors leading-tight">
                        {st.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                        {st.desc}
                      </p>
                    </div>

                    {/* Step Circle with Scale & Cyan Glow */}
                    <div
                      className="h-[60px] w-[60px] rounded-full flex items-center justify-center font-heading font-extrabold text-lg shadow-xl shrink-0 border-4 border-[#0F172A] transition-all duration-400 group-hover:scale-110"
                      style={{
                        backgroundColor: isInView ? "#00E5FF" : "#1E293B",
                        color: isInView ? "#0F172A" : "#FFFFFF",
                        boxShadow: isInView ? "0 0 16px rgba(0, 229, 255, 0.4)" : "none",
                      }}
                    >
                      <div className="flex flex-col items-center justify-center leading-none">
                        <Icon className="h-4 w-4 mb-0.5" />
                        <span className="text-xs font-extrabold">{st.step}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE TIMELINE (<1024px): Horizontal Scrollable Snap Container */}
          <div className="lg:hidden relative">
            <div className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none px-2">
              {steps.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="snap-center shrink-0 w-[280px] bg-[#1E293B] border border-[#334155] p-6 rounded-2xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="h-[52px] w-[52px] rounded-full flex items-center justify-center font-heading font-extrabold text-sm border-2 border-[#00E5FF] transition-all duration-400"
                        style={{
                          backgroundColor: "#00E5FF",
                          color: "#0F172A",
                          boxShadow: "0 0 16px rgba(0, 229, 255, 0.4)",
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-extrabold text-[#00E5FF] bg-[#0F172A] px-3 py-1 rounded-full border border-[#334155]">
                        BƯỚC {st.step}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-wider block">
                        {st.subtitle}
                      </span>
                      <h3 className="font-heading font-extrabold text-lg uppercase text-white leading-snug">
                        {st.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-center text-[11px] font-mono text-[#94A3B8] pt-2">
              ← Vuốt ngang để xem 5 bước quy trình →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
