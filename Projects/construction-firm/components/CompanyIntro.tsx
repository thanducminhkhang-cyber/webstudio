"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export default function CompanyIntro() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#0F172A] text-white border-t border-[#334155]">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[120px] sm:text-[200px] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap text-[#334155]/20">
        ENGINEERING
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Construction Site & Steel Structure Imagery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[#334155] group"
          >
            <Image
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
              alt="Engineers Inspecting High-Tech Steel Construction Site"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#1E293B]/90 border border-[#334155] backdrop-blur-md text-white space-y-1">
              <span className="text-[10px] text-[#D4A017] font-mono uppercase font-bold tracking-widest block">
                TẬP ĐOÀN TỔNG THẦU EPC CHUYÊN NGHIỆP
              </span>
              <p className="font-heading font-bold text-lg uppercase">Vanguard Engineering & Infrastructure</p>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
              NĂNG LỰC CỐT LÕI
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-snug text-white">
              Đơn Vị Tiên Phong Trong Kỷ Nguyên Xây Dựng Số & Kỹ Thuật Siêu Trọng
            </h2>

            <p className="text-sm sm:text-base leading-relaxed font-normal text-[#94A3B8]">
              Thành lập từ năm 1998, Vanguard Construct khẳng định vị thế tập đoàn xây dựng hạ tầng, công nghiệp và cao ốc biểu tượng hàng đầu Châu Á. Chúng tôi ứng dụng mô hình BIM 5D, kiểm soát tiến độ thời gian thực và thực thi tiêu chuẩn an toàn lao động nghiêm ngặt trên mọi công trường.
            </p>

            {/* Core Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#334155]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#D4A017]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">Tổng Thầu EPC</h4>
                </div>
                <p className="text-[12px] text-[#94A3B8] leading-snug">
                  Tối ưu chi phí & kiểm soát tiến độ chuẩn xác.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#3B82F6]">
                  <Cpu className="h-4 w-4 shrink-0" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">BIM 5D & AI</h4>
                </div>
                <p className="text-[12px] text-[#94A3B8] leading-snug">
                  Mô phỏng 3D kết cấu và dự báo rủi ro tự động.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#F97316]">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white">Zero Accident</h4>
                </div>
                <p className="text-[12px] text-[#94A3B8] leading-snug">
                  Quy trình HSE chuẩn hóa quốc tế 100%.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
