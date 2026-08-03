"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MagazineProjectStories() {
  const projects = [
    {
      number: "01",
      title: "Biệt Thự Thảo Điền Quận 2",
      location: "HO CHI MINH CITY",
      category: "PRIVATE RESIDENCE",
      tileUsed: "ST-901 Calacatta Gold Slab 120x240cm",
      desc: "Công trình rộng 850m² sử dụng 100% gạch Big Slab Calacatta Gold nhập khẩu Ý cho đại sảnh và vách thông tầng penthouse.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      number: "02",
      title: "Showroom Porsche Vietnam",
      location: "SAIGON CENTRE",
      category: "COMMERCIAL SHOWROOM",
      tileUsed: "ST-909 Urban Ash Concrete Slab 120x240cm",
      desc: "Mặt tiền và sàn đại sảnh trưng bày xe siêu xa xỉ với các tấm gạch xi măng mờ nguyên khối chịu lực cao.",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#F6F5F2] space-y-20">
      <div className="max-w-7xl mx-auto space-y-3 text-center sm:text-left">
        <span className="text-[11px] font-extrabold text-[#C5A880] uppercase tracking-[0.25em] font-mono">
          SELECTED ARCHITECTURAL WORKS
        </span>
        <h2 className="font-heading text-4xl sm:text-6xl font-bold uppercase tracking-tight text-[#121110]">
          Công Trình Kiến Trúc Tiêu Biểu
        </h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-28">
        {/* Project 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#E2DED6] shadow-xl group"
          >
            <Image
              src={projects[0].image}
              alt={projects[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Giant Overlapping Number */}
            <span className="absolute top-4 right-8 font-heading font-extrabold text-[120px] sm:text-[180px] text-white/20 select-none pointer-events-none">
              {projects[0].number}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-4"
          >
            <span className="text-[11px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] font-mono">
              {projects[0].category} • {projects[0].location}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#121110]">
              {projects[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed font-medium">
              {projects[0].desc}
            </p>
            <p className="text-xs font-bold text-[#121110] pt-2">
              Vật liệu chính: <span className="text-[#C5A880]">{projects[0].tileUsed}</span>
            </p>
          </motion.div>
        </div>

        {/* Project 2 (Flipped Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-4 lg:order-1 order-2"
          >
            <span className="text-[11px] font-extrabold text-[#C5A880] uppercase tracking-[0.2em] font-mono">
              {projects[1].category} • {projects[1].location}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase text-[#121110]">
              {projects[1].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed font-medium">
              {projects[1].desc}
            </p>
            <p className="text-xs font-bold text-[#121110] pt-2">
              Vật liệu chính: <span className="text-[#C5A880]">{projects[1].tileUsed}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#E2DED6] shadow-xl group lg:order-2 order-1"
          >
            <Image
              src={projects[1].image}
              alt={projects[1].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Giant Overlapping Number */}
            <span className="absolute top-4 left-8 font-heading font-extrabold text-[120px] sm:text-[180px] text-white/20 select-none pointer-events-none">
              {projects[1].number}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
