"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function TeamSection() {
  const { theme } = useTheme();

  const team = [
    {
      name: "Dr. Trần Hoàng Vũ",
      role: "Chủ Tịch HĐQT & Tổng Giám Đốc",
      desc: "Tiến sĩ Kỹ thuật Xây dựng ĐH Stanford, 28 năm kinh nghiệm chỉ huy tổng thầu các siêu dự án hạ tầng.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "Eng. Michael Vance",
      role: "Giám Đốc Kỹ Thuật (CTO)",
      desc: "Chuyên gia BIM 5D & Kết cấu siêu trọng quốc tế, nguyên Giám đốc Kỹ thuật Turner Construction.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
      name: "ThS. Phạm Quốc Bảo",
      role: "Giám Đốc Quản Lý Khối An Toàn HSE",
      desc: "Chuyên gia cao cấp về quản trị rủi ro công trường, dẫn dắt Vanguard đạt kỷ lục 15M giờ an toàn lao động.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
            EXECUTIVE LEADERSHIP & CHIEF ENGINEERS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
            Hội Đồng Quản Trị & Ban Chỉ Huy Hàng Đầu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl overflow-hidden shadow-lg space-y-4 group border ${
                theme === "light"
                  ? "bg-white border-[#0D1321]/10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                  : "bg-[#121A2D] border-[rgba(201,162,39,0.25)]"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-2">
                <h3 className="font-heading font-extrabold text-xl uppercase leading-[1.3]">{member.name}</h3>
                <p className="text-xs font-extrabold text-[#C9A227]">{member.role}</p>
                <p className={`text-xs sm:text-sm leading-[1.6] pt-3 border-t ${
                  theme === 'light' ? 'border-[#0D1321]/10 text-[#4A5264]' : 'border-white/10 text-[#B8BCC8]'
                }`}>
                  {member.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
