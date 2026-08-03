"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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
    <section className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F4F1EC] space-y-24">
      <div className="max-w-7xl mx-auto space-y-4 text-center sm:text-left">
        <span className="text-[11px] font-bold text-[#9A7B4F] uppercase tracking-[0.25em]">
          SELECTED WORKS
        </span>
        <h2 className="font-heading text-4xl sm:text-6xl font-normal text-[#1C1A17]">
          Công Trình Kiến Trúc Tiêu Biểu
        </h2>
      </div>

      <div className="max-w-7xl mx-auto space-y-32">
        {/* Project 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#E2DDD5] shadow-2xl group"
          >
            <Image
              src={projects[0].image}
              alt={projects[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Giant Overlapping Number */}
            <span className="absolute top-4 right-8 font-heading font-normal text-[120px] sm:text-[180px] text-white/20 select-none pointer-events-none">
              {projects[0].number}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-4"
          >
            <span className="text-[11px] font-bold text-[#9A7B4F] uppercase tracking-[0.2em]">
              {projects[0].category} • {projects[0].location}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1A17]">
              {projects[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
              {projects[0].desc}
            </p>
            <p className="text-xs font-bold text-[#1C1A17] pt-2">
              Vật liệu chính: <span className="text-[#9A7B4F]">{projects[0].tileUsed}</span>
            </p>
          </motion.div>
        </div>

        {/* Project 2 (Flipped Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-4 lg:order-1 order-2"
          >
            <span className="text-[11px] font-bold text-[#9A7B4F] uppercase tracking-[0.2em]">
              {projects[1].category} • {projects[1].location}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1A17]">
              {projects[1].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
              {projects[1].desc}
            </p>
            <p className="text-xs font-bold text-[#1C1A17] pt-2">
              Vật liệu chính: <span className="text-[#9A7B4F]">{projects[1].tileUsed}</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#E2DDD5] shadow-2xl group lg:order-2 order-1"
          >
            <Image
              src={projects[1].image}
              alt={projects[1].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Giant Overlapping Number */}
            <span className="absolute top-4 left-8 font-heading font-normal text-[120px] sm:text-[180px] text-white/20 select-none pointer-events-none">
              {projects[1].number}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
