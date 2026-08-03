"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Trophy } from "lucide-react";

export default function AwardsCertifications() {
  const awards = [
    { title: "Top 10 Tổng Thầu EPC Uy Tín Việt Nam 2024", body: "Vinh danh bởi Vietnam Report & Bộ Xây Dựng cho năng lực thi công siêu dự án tỷ đô." },
    { title: "Chứng Chỉ Quốc Tế ISO 9001:2015 & ISO 14001", body: "Kiểm soát hệ thống quản lý chất lượng và cam kết bảo vệ môi trường toàn diện." },
    { title: "Giải Thưởng Kiến Trúc Biểu Tượng Châu Á 2023", body: "Trao tặng cho tòa tháp tài chính Apex Financial Tower 88 Story." },
    { title: "Chứng Nhận An Toàn OHSAS 18001 / ISO 45001", body: "Kỷ lục 15 triệu giờ làm việc an toàn không xảy ra bất kỳ sự cố lao động nghiêm trọng nào." },
  ];

  return (
    <section id="awards" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#0B0F19] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
            RECOGNITION & CERTIFICATIONS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Giải Thưởng & Chứng Nhận Quốc Tế
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#151C28] border border-white/10 p-6 rounded-3xl space-y-3 hover:border-[#F4B942] transition-colors"
            >
              <Trophy className="h-8 w-8 text-[#F4B942]" />
              <h3 className="font-heading font-bold text-lg uppercase text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
