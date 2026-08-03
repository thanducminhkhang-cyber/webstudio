"use client";

import React from "react";
import { motion } from "framer-motion";
import { HardHat, Compass, Layers, Cpu, FileText, Building2 } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: HardHat,
      code: "SVC-01",
      title: "General Construction (Tổng Thầu Thi Công)",
      desc: "Tổng thầu thi công hạ tầng giao thông, công trình công nghiệp quy mô lớn và cao ốc văn phòng hạng A với mô hình EPC trọn gói.",
    },
    {
      icon: Compass,
      title: "Architecture & BIM 5D Design",
      code: "SVC-02",
      desc: "Thiết kế kiến trúc biểu tượng tích hợp mô hình số BIM 5D, tính toán tải trọng động và tối ưu 40% năng lượng vận hành.",
    },
    {
      icon: Layers,
      title: "Interior Architectural Finishing",
      code: "SVC-03",
      desc: "Thi công hoàn thiện nội thất đại sảnh khách sạn 5 sao, penthouse và trụ sở tập đoàn với vật liệu cao cấp nhập khẩu Châu Âu.",
    },
    {
      icon: Cpu,
      title: "MEP & High-Tech Engineering",
      code: "SVC-04",
      desc: "Hệ thống cơ điện lạnh trung tâm HVAC, phòng sạch bán dẫn Class 100, hạ tầng tự động hóa tòa nhà BMS thông minh.",
    },
    {
      icon: FileText,
      title: "Engineering & Technical Consulting",
      code: "SVC-05",
      desc: "Tư vấn thẩm tra kết cấu siêu trọng, khảo sát địa chất hầm sâu, đánh giá tác động môi trường và tối ưu hóa chi phí đầu tư.",
    },
    {
      icon: Building2,
      title: "Project Management & Commissioning",
      code: "SVC-06",
      desc: "Quản lý dự án chuyên nghiệp theo tiêu chuẩn PMI, điều phối nhà thầu phụ và nghiệm thu bàn giao đưa vào vận hành thương mại.",
    },
  ];

  return (
    <section id="services" className="py-28 sm:py-36 px-4 sm:px-6 bg-[#0B0F19] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#F4B942] uppercase tracking-[0.25em] font-mono">
            OUR CORE CAPABILITIES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            Lĩnh Vực Hoạt Động & Dịch Vụ Chuyên NGHỆP
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-normal">
            Giải pháp xây dựng và kỹ thuật toàn diện cho các siêu dự án thương mại & hạ tầng quốc gia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-[#151C28]/90 border border-white/10 hover:border-[#F4B942] p-8 rounded-3xl backdrop-blur-md space-y-4 hover:-translate-y-2 transition-all duration-400 group"
              >
                <div className="flex justify-between items-center">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-[#F4B942]/40 flex items-center justify-center text-[#F4B942] group-hover:bg-[#F4B942] group-hover:text-[#0B0F19] transition-colors">
                    <Icon className="h-6 w-6 stroke-[1.75]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#F4B942]">{svc.code}</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl uppercase text-white group-hover:text-[#F4B942] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {svc.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
