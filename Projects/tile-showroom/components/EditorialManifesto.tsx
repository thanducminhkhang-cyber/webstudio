"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export default function EditorialManifesto() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#F6F5F2] relative overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[120px] sm:text-[220px] text-[#C5A880]/5 select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        SURFACES
      </div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-3 text-[#C5A880]"
        >
          <span className="h-px w-12 bg-[#C5A880]" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] font-mono">
            ARCHITECTURAL PHILOSOPHY
          </span>
        </motion.div>

        {/* Floating Modern Manifesto Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#121110] leading-[1.15] max-w-4xl"
        >
          Chúng tôi không chỉ bán gạch. Chúng tôi <span className="text-[#C5A880]">định hình chuẩn mực bề mặt</span> cho những công trình biệt thự hiện đại bậc nhất.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#C5A880]/30"
        >
          <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed font-medium">
            Mỗi tấm đá Big Slab 120x240cm tại Stona Slab là sự kết tụ giữa công nghệ ép vi hạt cao cấp của Ý và cảm hứng thiên nhiên bất tận.
          </p>
          <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed font-medium">
            Không đường ron chói mắt, không sứt mẻ theo thời gian — chỉ còn lại sự liền mạch tĩnh lặng và vẻ đẹp kiêu sa nguyên bản.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
