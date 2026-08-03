"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function CompanyIntro() {
  const { theme } = useTheme();

  return (
    <section id="about" className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      {/* Background Watermark */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[120px] sm:text-[220px] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap ${
        theme === "light" ? "text-[#0D1321]/5" : "text-white/5"
      }`}>
        ENGINEERING
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetrical Image Stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#C9A227]/30 group"
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
              alt="Engineering Design & Blueprint Planning"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1321]/80 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0D1321]/90 border border-[#C9A227]/30 backdrop-blur-md text-white space-y-1">
              <span className="text-[10px] text-[#E8C766] font-mono uppercase font-bold tracking-widest block">
                TẬP ĐOÀN TỔNG THẦU EPC CHUYÊN NGHIỆP
              </span>
              <p className="font-heading font-bold text-xl uppercase">Vanguard Engineering & Construction Empire</p>
            </div>
          </motion.div>

          {/* Right Column: Massive Typography Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
              ABOUT VANGUARD CONSTRUCT
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
              Đơn Vị Tiên Phong Trong Kỷ Nguyên Xây Dựng Số & Kỹ Thuật Siêu Trọng
            </h2>

            {/* Paragraph with normal case (no uppercase) and contrast ratio >= 4.5:1 */}
            <p className={`text-sm sm:text-base leading-[1.6] font-normal ${
              theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
            }`}>
              Được thành lập từ năm 1998, Vanguard Construct đã khẳng định vị thế tập đoàn xây dựng hạ tầng, khu công nghiệp và cao ốc biểu tượng hàng đầu Châu Á. Chúng tôi ứng dụng mô hình BIM 5D, trí tuệ nhân tạo AI quản trị tiến độ và quy chuẩn thi công an toàn tuyệt đối.
            </p>

            {/* 3 Core Highlights */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t ${
              theme === "light" ? "border-[#0D1321]/10" : "border-white/10"
            }`}>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Tổng Thầu EPC Trọn Gói</h4>
                  <p className={`text-[12px] leading-snug mt-0.5 ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                    Tối ưu chi phí & đảm bảo tiến độ chính xác từng ngày.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Tiêu Chuẩn Xanh LEED Gold</h4>
                  <p className={`text-[12px] leading-snug mt-0.5 ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                    Công nghệ vật liệu bền vững giảm 40% carbon.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
