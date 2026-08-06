"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
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

interface ProjectShowcaseProps {
  onOpenConsultation?: () => void;
}

export default function ProjectShowcase({ onOpenConsultation }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filteredProjects = MEGA_PROJECTS.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-[#0F172A] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#334155] pb-8">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
              FEATURED ICONIC MEGA PROJECTS
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
              Công Trình Biểu Tượng Tỷ Đô
            </h2>
          </div>

          {/* Search Input & Filter Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm dự án, địa điểm, chủ đầu tư..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {["All", "Infrastructure", "Industrial", "Skyscraper", "Clean Energy"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl text-xs font-bold px-3.5 py-2 transition-all ${
                    selectedCategory === cat
                      ? "bg-[#D4A017] text-[#0F172A] font-extrabold shadow-md"
                      : "bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards Grid with Enhanced Hover Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((prj, idx) => (
            <motion.div
              key={prj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl bg-[#1E293B] border border-[#334155] hover:border-[#3B82F6] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => setActiveProject(prj)}
            >
              {/* Photo Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                  src={prj.image}
                  alt={prj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-80" />

                {/* Dark Gradient Overlay on Hover revealing detail */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(6,8,16,0.85)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out space-y-1">
                    <span className="text-[10px] font-mono text-[#D4A017] uppercase font-bold tracking-wider block">
                      QUY MÔ: {prj.scale}
                    </span>
                    <p className="text-xs text-white/90 font-medium">
                      Thời gian: {prj.year} • Tiêu chuẩn: {prj.specs[2]?.value || "EPC International"}
                    </p>
                  </div>
                </div>

                <span className="absolute top-4 left-4 bg-[#0F172A]/90 text-[#3B82F6] border border-[#334155] text-[10px] uppercase font-mono font-bold tracking-widest px-3 py-1 rounded-lg backdrop-blur-md">
                  {prj.category} • {prj.code}
                </span>

                <div className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-[#0F172A]/80 text-white backdrop-blur-md group-hover:bg-[#D4A017] group-hover:text-[#0F172A] transition-colors z-10">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-[#94A3B8]">{prj.location}</span>
                  <span className="font-mono font-bold text-[#D4A017] bg-[#0F172A] px-2.5 py-1 rounded-md border border-[#334155]">
                    {prj.value}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-white group-hover:text-[#3B82F6] transition-colors leading-snug">
                  {prj.title}
                </h3>

                <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed text-[#94A3B8]">
                  {prj.description}
                </p>

                <div className="pt-4 border-t border-[#334155] flex items-center justify-between text-xs font-bold">
                  <span className="text-[#94A3B8]">Chủ đầu tư: <b className="text-white">{prj.client}</b></span>
                  <span className="text-[#D4A017] group-hover:underline">Chi Tiết Dự Án →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unified CTA Button */}
        <div className="text-center pt-4">
          <Button
            onClick={onOpenConsultation}
            className="btn-cta-gold bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-xs tracking-wider uppercase px-8 py-4 h-auto border-none"
          >
            NHẬN BÁO GIÁ MIỄN PHÍ <ArrowRight className="ml-2 h-4 w-4 inline text-[#0F172A]" />
          </Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <Dialog open={!!activeProject} onOpenChange={() => setActiveProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 bg-[#0F172A] text-white border border-[#334155]">
            <DialogHeader className="border-b border-[#334155] pb-4">
              <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest block">
                {activeProject.category} • MÃ: {activeProject.code}
              </span>
              <DialogTitle className="font-heading font-extrabold text-2xl uppercase mt-1 leading-snug text-white">
                {activeProject.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-[#334155] shadow-md">
                <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#1E293B] text-white p-4 rounded-xl border border-[#334155]">
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-mono block">GIÁ TRỊ DỰ ÁN</span>
                  <span className="font-heading font-bold text-base text-[#D4A017]">{activeProject.value}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-mono block">ĐỊA ĐIỂM</span>
                  <span className="font-bold text-sm text-white">{activeProject.location}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-mono block">THỜI GIAN THI CÔNG</span>
                  <span className="font-bold text-sm text-white">{activeProject.year}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-mono block">CHỦ ĐẦU TƯ</span>
                  <span className="font-bold text-sm text-white">{activeProject.client}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-heading font-bold text-lg uppercase text-white">Quy Mô & Kỹ Thuật Thi Công</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-[#94A3B8]">
                  {activeProject.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4A017]">Thông Số Kỹ Thuật Nổi Bật</h4>
                <div className="divide-y divide-[#334155] border border-[#334155] rounded-xl overflow-hidden text-xs bg-[#1E293B]">
                  {activeProject.specs.map((sp, i) => (
                    <div key={i} className="p-3 flex justify-between">
                      <span className="text-[#94A3B8]">{sp.label}:</span>
                      <span className="font-bold font-mono text-white">{sp.value}</span>
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
