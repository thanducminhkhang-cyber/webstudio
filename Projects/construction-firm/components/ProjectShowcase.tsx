"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Maximize2, Building2, Layers, HardHat, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@wsos/ui/components/dialog";
import { Button } from "@wsos/ui/components/button";

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  category: "Infrastructure" | "Industrial" | "Skyscraper" | "Clean Energy";
  location: string;
  value: string;
  year: string;
  scale: string;
  client: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
}

export const MEGA_PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    code: "PRJ-901",
    title: "Metro Line 3 Skyscraper Transit Hub",
    category: "Infrastructure",
    location: "TP. Hồ Chí Minh",
    value: "$420 Million USD",
    year: "2024 - 2026",
    scale: "Sức chứa 120,000 hành khách/ngày",
    client: "Ban Quản Lý Đường Sắt Đô Thị",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop",
    description: "Tổ hợp nhà ga đường sắt đô thị ngầm 4 tầng kết hợp trung tâm thương mại cao 68 tầng. Ứng dụng công nghệ đào hầm TBM đường kính 12.5m.",
    specs: [
      { label: "Tổng diện tích sàn", value: "240,000 m²" },
      { label: "Độ sâu hầm ngầm", value: "-38.5 mét" },
      { label: "Tiêu chuẩn xanh", value: "LEED Gold Certified" },
    ],
  },
  {
    id: "p2",
    code: "PRJ-902",
    title: "Samsung High-Tech Mega Plant Complex",
    category: "Industrial",
    location: "Khu Công Nghệ Cao Quận 9",
    value: "$650 Million USD",
    year: "2023 - 2025",
    scale: "Diện tích 120 Hecta",
    client: "Samsung Electronics Corp",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    description: "Tổ hợp nhà máy sản xuất linh kiện bán dẫn và phòng sạch Class 100 khép kín. Đạt tiêu chuẩn khắt khe về chống rung vi mô 0.01 micron.",
    specs: [
      { label: "Diện tích nhà xưởng", value: "350,000 m²" },
      { label: "Phòng sạch Class 100", value: "45,000 m²" },
      { label: "Thời gian thi công", value: "18 Tháng kỷ lục" },
    ],
  },
  {
    id: "p3",
    code: "PRJ-903",
    title: "Apex Financial Tower 88 Story",
    category: "Skyscraper",
    location: "Trung Tâm Tài Chính Thủ Thiêm",
    value: "$890 Million USD",
    year: "2022 - 2026",
    scale: "Chiều cao 388 Mét",
    client: "Apex Financial Group",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    description: "Tòa tháp tài chính biểu tượng cao nhất khu vực với hệ khung thép chịu lực siêu trọng, mặt dựng kính Double Glazing Low-E giảm 50% nhiệt tích tụ.",
    specs: [
      { label: "Số tầng cao", value: "88 Tầng nổi + 6 Tầng hầm" },
      { label: "Tải trọng móng nhồi", value: "Bê tông mác 1000" },
      { label: "Hệ thống thang máy", value: "Tốc độ 10 m/giây" },
    ],
  },
  {
    id: "p4",
    code: "PRJ-904",
    title: "Mũi Dinh Offshore Wind Power Farm",
    category: "Clean Energy",
    location: "Ninh Thuận",
    value: "$310 Million USD",
    year: "2023 - 2024",
    scale: "Công suất 350 MW",
    client: "Vanguard Renewable Energy",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
    description: "Trang trại điện gió ngoài khơi bao gồm 42 trụ tuabin đường kính cánh 165m. Thi công đóng cọc móng ống thép ngầm dưới lòng biển sâu 40m.",
    specs: [
      { label: "Số lượng Tuabin", value: "42 Trụ ngoài khơi" },
      { label: "Sản lượng điện/năm", value: "1.2 Tỷ kWh" },
      { label: "Cắt giảm CO2", value: "850,000 Tấn/năm" },
    ],
  },
];

export default function ProjectShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? MEGA_PROJECTS
      : MEGA_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#F7F8FA] space-y-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
              FEATURED ICONIC MEGA PROJECTS
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-[#0B0F19]">
              Công Trình Biểu Tượng Tỷ Đô
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Infrastructure", "Industrial", "Skyscraper", "Clean Energy"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full text-xs font-bold px-5 py-2.5 transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0B0F19] text-[#F4B942] shadow-lg"
                    : "bg-white border border-slate-200 text-[#555555] hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((prj, idx) => (
            <motion.div
              key={prj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#F4B942] shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              onClick={() => setActiveProject(prj)}
            >
              {/* Photo Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                  src={prj.image}
                  alt={prj.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-transparent to-transparent opacity-80" />

                <span className="absolute top-4 left-4 bg-[#0B0F19]/90 text-[#F4B942] border border-[#F4B942]/40 text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
                  {prj.category} • {prj.code}
                </span>

                <div className="absolute bottom-4 right-4 p-3 rounded-full bg-black/60 text-white backdrop-blur-md group-hover:bg-[#F4B942] group-hover:text-[#0B0F19] transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-baseline text-xs text-[#555555]">
                  <span className="font-bold text-[#0B0F19]">{prj.location}</span>
                  <span className="font-mono font-bold text-[#F4B942] bg-[#0B0F19] px-2.5 py-1 rounded-md">{prj.value}</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-[#0B0F19] group-hover:text-[#F4B942] transition-colors">
                  {prj.title}
                </h3>

                <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                  {prj.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B0F19]">
                  <span>Chủ đầu tư: <b className="text-[#555555]">{prj.client}</b></span>
                  <span className="text-[#F4B942] group-hover:underline">Chi Tiết Dự Án →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      {activeProject && (
        <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 border border-slate-200">
            <DialogHeader className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-[#F4B942] uppercase tracking-widest block">
                {activeProject.category} • MÃ: {activeProject.code}
              </span>
              <DialogTitle className="font-heading font-extrabold text-3xl uppercase text-[#0B0F19] mt-1">
                {activeProject.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#0B0F19] text-white p-5 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">GIÁ TRỊ DỰ ÁN</span>
                  <span className="font-heading font-bold text-lg text-[#F4B942]">{activeProject.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">ĐỊA ĐIỂM</span>
                  <span className="font-bold text-sm text-white">{activeProject.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">THỜI GIAN THI CÔNG</span>
                  <span className="font-bold text-sm text-white">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">CHỦ ĐẦU TƯ</span>
                  <span className="font-bold text-sm text-[#F4B942]">{activeProject.client}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-heading font-bold text-xl uppercase text-[#0B0F19]">Quy Mô & Kỹ Thuật Thi Công</h4>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#0B0F19]">Thông Số Kỹ Thuật Nổi Bật</h4>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                  {activeProject.specs.map((sp, i) => (
                    <div key={i} className="p-3.5 flex justify-between bg-slate-50">
                      <span className="text-[#555555]">{sp.label}:</span>
                      <span className="font-bold text-[#0B0F19] font-mono">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
