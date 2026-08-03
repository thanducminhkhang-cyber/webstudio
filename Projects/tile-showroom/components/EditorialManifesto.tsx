"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export default function EditorialManifesto() {
  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F4F1EC] relative overflow-hidden">
      {/* Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-normal text-[120px] sm:text-[220px] text-[#9A7B4F]/5 select-none pointer-events-none whitespace-nowrap">
        ARCHITECTURAL
      </div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 text-[#9A7B4F]"
        >
          <span className="h-px w-12 bg-[#9A7B4F]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]">
            TRIẾT LÝ VẬT LIỆU
          </span>
        </motion.div>

        {/* Floating Manifesto Quote */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1C1A17] leading-[1.2] max-w-4xl"
        >
          “Chúng tôi không chỉ bán gạch. Chúng tôi <span className="italic text-[#9A7B4F]">kiến tạo bề mặt</span> cho những kiệt tác kiến trúc trường tồn cùng thời gian.”
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-[#9A7B4F]/30"
        >
          <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
            Mỗi tấm đá Big Slab 120x240cm tại Stona Slab là sự kết tụ giữa công nghệ ép vi hạt cao cấp của Ý và cảm hứng thiên nhiên bất tận.
          </p>
          <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
            Không đường ron chói mắt, không sứt mẻ theo thời gian — chỉ còn lại sự liền mạch tĩnh lặng và vẻ đẹp kiêu sa nguyên bản.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
