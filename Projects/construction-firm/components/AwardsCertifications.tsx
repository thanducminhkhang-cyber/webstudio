"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function AwardsCertifications() {
  const { theme } = useTheme();

  const awards = [
    { title: "Top 10 Tổng Thầu EPC Uy Tín Việt Nam 2024", body: "Vinh danh bởi Vietnam Report & Bộ Xây Dựng cho năng lực thi công siêu dự án tỷ đô." },
    { title: "Chứng Chỉ Quốc Tế ISO 9001:2015 & ISO 14001", body: "Kiểm soát hệ thống quản lý chất lượng và cam kết bảo vệ môi trường toàn diện." },
    { title: "Giải Thưởng Kiến Trúc Biểu Tượng Châu Á 2023", body: "Trao tặng cho tòa tháp tài chính Apex Financial Tower 88 Story." },
    { title: "Chứng Nhận An Toàn OHSAS 18001 / ISO 45001", body: "Kỷ lục 15 triệu giờ làm việc an toàn không xảy ra bất kỳ sự cố lao động nghiêm trọng nào." },
  ];

  return (
    <section id="awards" className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
            RECOGNITION & CERTIFICATIONS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
            Giải Thưởng & Chứng Nhận Quốc Tế
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 sm:p-10 rounded-3xl space-y-3 border ${
                theme === "light"
                  ? "bg-white border-[#0D1321]/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                  : "bg-[#121A2D] border-[rgba(201,162,39,0.25)]"
              }`}
            >
              <Trophy className="h-8 w-8 text-[#C9A227]" />
              <h3 className="font-heading font-bold text-lg uppercase leading-[1.3]">{item.title}</h3>
              <p className={`text-xs sm:text-sm leading-[1.6] ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
