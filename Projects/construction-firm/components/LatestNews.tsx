"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function LatestNews() {
  const news = [
    {
      date: "15 THÁNG 8, 2026",
      category: "KỸ THUẬT SỐ HÓA",
      title: "Ứng Dụng Trí Tuệ Nhân Tạo AI Giám Sát Tiến Độ Thi Công Dự Án Đường Sắt Đô Thị Metro",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "02 THÁNG 8, 2026",
      category: "CÔNG TRÌNH BIỂU TƯỢNG",
      title: "Vanguard Construct Động Thổ Nhà Máy Sản Xuất Bán Dẫn Samsung Giai Đoạn 2 Trị Giá $650M",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    },
    {
      date: "20 THÁNG 7, 2026",
      category: "PHÁT TRIỂN BỀN VỮNG",
      title: "Đạt Chứng Nhận LEED Platinum Cho Tổ Hợp Văn Phòng Xanh Apex Financial Tower 88 Tầng",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#0B0F19] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
              ENGINEERING INSIGHTS & PRESS RELEASE
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              Tin Tức & Sự Kiện Nổi Bật
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#151C28] rounded-3xl overflow-hidden border border-white/10 hover:border-[#F4B942] transition-colors group cursor-pointer space-y-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] text-[#F4B942] font-mono font-bold uppercase tracking-widest">{item.category} • {item.date}</span>
                <h3 className="font-heading font-extrabold text-lg uppercase text-white group-hover:text-[#F4B942] transition-colors leading-snug">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
