"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProcessTimeline() {
  const steps = [
    {
      step: "01",
      title: "Khảo Sát & Khả Thi",
      subtitle: "Feasibility Study",
      desc: "Khảo sát địa chất hầm sâu, đánh giá tác động môi trường và quy hoạch mặt bằng thi công.",
    },
    {
      step: "02",
      title: "Số Hóa BIM 5D",
      subtitle: "Engineering Design",
      desc: "Lập mô hình 3D kết cấu, mô phỏng xung đột MEP và lập tiến độ thi công thời gian thực.",
    },
    {
      step: "03",
      title: "Mua Sắm Vật Tư",
      subtitle: "Procurement EPC",
      desc: "Cung ứng vật tư kết cấu thép, bê tông mác cao và thiết bị siêu trọng từ các tập đoàn hàng đầu.",
    },
    {
      step: "04",
      title: "Thi Công & HSE",
      subtitle: "Construction Execution",
      desc: "Triển khai thi công thực địa với kỷ luật an toàn lao động tuyệt đối và kiểm soát chất lượng.",
    },
    {
      step: "05",
      title: "Nghiệm Thu & Bàn Giao",
      subtitle: "Commissioning",
      desc: "Chạy thử tải toàn hệ thống, nghiệm thu PCCC và bàn giao công trình đưa vào vận hành.",
    },
  ];

  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 bg-[#0F172A] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
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
          {/* DESKTOP TIMELINE (≥1024px): Horizontal layout */}
          <div className="hidden lg:block relative min-h-[380px]">
            {/* Horizontal Line across center */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-[#334155] -translate-y-1/2 origin-left z-0"
            />

            {/* 5 Step Circles & Text Items Dàn Đều */}
            <div className="relative z-10 flex items-center justify-between px-4 h-full">
              {steps.map((st, idx) => {
                const isAbove = idx % 2 === 0; // Steps 0, 2, 4 (01, 03, 05) text ABOVE; Steps 1, 3 (02, 04) text BELOW
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.2 }}
                    className={`flex ${isAbove ? "flex-col" : "flex-col-reverse"} items-center text-center max-w-[170px] group`}
                  >
                    {/* Text Container (Above or Below) */}
                    <div className={isAbove ? "mb-6 space-y-1.5" : "mt-6 space-y-1.5"}>
                      <h3 className="font-heading font-extrabold text-base uppercase text-white group-hover:text-[#D4A017] transition-colors leading-tight">
                        {st.title}
                      </h3>
                      <p className="text-[10px] font-mono font-semibold text-[#D4A017] uppercase tracking-wider">
                        {st.subtitle}
                      </p>
                      <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                        {st.desc}
                      </p>
                    </div>

                    {/* Circle 56px x 56px with Number 01-05 */}
                    <div className="h-[56px] w-[56px] rounded-full bg-[#D4A017] text-[#0F172A] flex items-center justify-center font-heading font-extrabold text-xl shadow-xl shrink-0 group-hover:scale-110 group-hover:bg-[#B8890F] transition-all border-4 border-[#0F172A]">
                      {st.step}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE TIMELINE (<1024px): Vertical layout */}
          <div className="lg:hidden relative pl-6 space-y-10">
            {/* Vertical Line on left side */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-[#334155] origin-top z-0"
            />

            {/* 5 Vertical Items */}
            {steps.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.15 }}
                className="relative z-10 flex items-start gap-5 group"
              >
                {/* Circle 56px x 56px */}
                <div className="h-[56px] w-[56px] rounded-full bg-[#D4A017] text-[#0F172A] flex items-center justify-center font-heading font-extrabold text-xl shadow-xl shrink-0 border-4 border-[#0F172A]">
                  {st.step}
                </div>

                {/* Text Content to the right */}
                <div className="space-y-1 pt-1.5 flex-1">
                  <span className="text-[10px] font-mono font-semibold text-[#D4A017] uppercase tracking-wider block">
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
