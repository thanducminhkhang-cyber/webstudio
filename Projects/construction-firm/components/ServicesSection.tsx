"use client";

import React from "react";
import { motion } from "framer-motion";
import { HardHat, Compass, Layers, Cpu, FileText, Building2 } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ServicesSection() {
  const { theme } = useTheme();

  const services = [
    {
      icon: HardHat,
      code: "SVC-01",
      title: "General Construction (Tổng Thầu Thi Công)",
      desc: "Tổng thầu thi công hạ tầng giao thông, công trình công nghiệp quy mô lớn và cao ốc văn phòng hạng A với mô hình EPC trọn gói.",
    },
    {
      icon: Compass,
      code: "SVC-02",
      title: "Architecture & BIM 5D Design",
      desc: "Thiết kế kiến trúc biểu tượng tích hợp mô hình số BIM 5D, tính toán tải trọng động và tối ưu 40% năng lượng vận hành.",
    },
    {
      icon: Layers,
      code: "SVC-03",
      title: "Interior Architectural Finishing",
      desc: "Thi công hoàn thiện nội thất đại sảnh khách sạn 5 sao, penthouse và trụ sở tập đoàn với vật liệu cao cấp nhập khẩu Châu Âu.",
    },
    {
      icon: Cpu,
      code: "SVC-04",
      title: "MEP & High-Tech Engineering",
      desc: "Hệ thống cơ điện lạnh trung tâm HVAC, phòng sạch bán dẫn Class 100, hạ tầng tự động hóa tòa nhà BMS thông minh.",
    },
    {
      icon: FileText,
      code: "SVC-05",
      title: "Engineering & Technical Consulting",
      desc: "Tư vấn thẩm tra kết cấu siêu trọng, khảo sát địa chất hầm sâu, đánh giá tác động môi trường và tối ưu hóa chi phí đầu tư.",
    },
    {
      icon: Building2,
      code: "SVC-06",
      title: "Project Management & Commissioning",
      desc: "Quản lý dự án chuyên nghiệp theo tiêu chuẩn PMI, điều phối nhà thầu phụ và nghiệm thu bàn giao đưa vào vận hành thương mại.",
    },
  ];

  return (
    <section id="services" className={`py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] text-[#0D1321]" : "bg-[#0D1321] text-white"
    }`}>
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono">
            OUR CORE CAPABILITIES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.25]">
            Lĩnh Vực Hoạt Động & Dịch Vụ Chuyên NGHỆP
          </h2>
          <p className={`max-w-xl mx-auto text-sm font-normal ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
            Giải pháp xây dựng và kỹ thuật toàn diện cho các siêu dự án thương mại & hạ tầng quốc gia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 sm:p-10 rounded-3xl space-y-4 hover:-translate-y-2 transition-all duration-400 group border ${
                  theme === "light"
                    ? "bg-white border-[#0D1321]/10 hover:border-[#C9A227] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                    : "bg-[#121A2D] border-[rgba(201,162,39,0.25)] hover:border-[#C9A227]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#0D1321] transition-colors">
                    <Icon className="h-6 w-6 stroke-[1.75]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#C9A227]">{svc.code}</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl uppercase group-hover:text-[#C9A227] transition-colors leading-[1.35]">
                  {svc.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-[1.6] font-normal ${
                  theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
                }`}>
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
