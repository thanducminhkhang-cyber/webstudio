"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Cpu, Building2 } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section id="about" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F7F8FA] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[120px] sm:text-[240px] text-[#151C28]/5 select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap">
        ENGINEERING
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Asymmetrical Image Stack */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group"
          >
            <Image
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop"
              alt="Engineering Design & Blueprint Planning"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0B0F19]/90 border border-white/10 backdrop-blur-md text-white space-y-1">
              <span className="text-[10px] text-[#F4B942] font-mono uppercase font-bold tracking-widest block">
                TẬP ĐOÀN TỔNG THẦU EPC CHUYÊN NGHIỆP
              </span>
              <p className="font-heading font-bold text-xl uppercase">Vanguard Engineering & Construction Empire</p>
            </div>
          </motion.div>

          {/* Right Column: Massive Typography Intro */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
              ABOUT VANGUARD CONSTRUCT
            </span>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#0B0F19] leading-[1.1]">
              Đơn Vị Tiên Phong Trong Kỷ Nguyên Xây Dựng Số & Kỹ Thuật Siêu Trọng
            </h2>

            <p className="text-xs sm:text-base text-[#555555] leading-relaxed font-medium">
              Được thành lập từ năm 1998, Vanguard Construct đã khẳng định vị thế tập đoàn xây dựng hạ tầng, khu công nghiệp và cao ốc biểu tượng hàng đầu Châu Á. Chúng tôi ứng dụng mô hình BIM 5D, trí tuệ nhân tạo AI quản trị tiến độ và quy chuẩn thi công an toàn tuyệt đối.
            </p>

            {/* 3 Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#F4B942] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B0F19]">Tổng Thầu EPC Trọn Gói</h4>
                  <p className="text-[11px] text-[#555555]">Tối ưu chi phí & đảm bảo tiến độ chính xác từng ngày.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#F4B942] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B0F19]">Tiêu Chuẩn Xanh LEED Gold</h4>
                  <p className="text-[11px] text-[#555555]">Công nghệ vật liệu bền vững giảm 40% carbon.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
