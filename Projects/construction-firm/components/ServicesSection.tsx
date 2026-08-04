"use client";

import React from "react";
import { motion } from "framer-motion";
import { HardHat, Compass, Layers, Cpu, FileText, Building2, CheckCircle } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: HardHat,
      accentColor: "#3B82F6",
      title: "General Construction EPC",
      subtitle: "Tổng Thầu Thi Công Hạ Tầng & Cao ốc",
      description: "Quản lý trọn gói từ san lấp mặt bằng, móng cọc siêu sâu đến cất nóc công trình cao tầng. Đảm bảo tiến độ bàn giao chính xác từng ngày.",
      points: ["Hạ tầng khu công nghiệp", "Tháp cao ốc biểu tượng", "Hầm ngầm & Cầu vượt"],
    },
    {
      icon: Compass,
      accentColor: "#D4A017",
      title: "Architecture & BIM 5D",
      subtitle: "Thiết Kế Số Hóa & Mô Phỏng Kết Cấu",
      description: "Ứng dụng mô hình BIM 5D lập tiến độ và ngân sách thời gian thực. Phát hiện xung đột kết cấu trước khi thi công thực địa.",
      points: ["Mô phỏng 3D/4D/5D BIM", "Tính toán kết cấu chịu lực", "Thiết kế chuẩn LEED/LOTUS"],
    },
    {
      icon: Layers,
      accentColor: "#F97316",
      title: "Interior Architectural Finishing",
      subtitle: "Hoàn Thiện Nội Thất & Đô Thị",
      description: "Thi công hoàn thiện nội ngoại thất cao cấp cho các khách sạn 5 sao, trung tâm thương mại và trụ sở tập đoàn đa quốc gia.",
      points: ["Nội thất chuẩn 5 sao", "Mặt dựng kính Low-E", "Cảnh quan đô thị thông minh"],
    },
    {
      icon: Cpu,
      accentColor: "#3B82F6",
      title: "MEP & High-Tech Engineering",
      subtitle: "Hệ Thống Cơ Điện Lạnh & BMS Trung Tâm",
      description: "Thi công giải pháp MEP phức hợp: HVAC trung tâm, hệ thống PCCC tự động, điện nhẹ thông minh và quản lý tòa nhà BMS.",
      points: ["Phòng sạch Class 100", "Hệ thống HVAC trung tâm", "BMS & PCCC tự động"],
    },
    {
      icon: FileText,
      accentColor: "#F97316",
      title: "Engineering Consulting",
      subtitle: "Tư Vấn Thẩm Tra Kết Cấu Siêu Trọng",
      description: "Cung cấp dịch vụ kiểm định chất lượng công trình, thẩm tra thiết kế kỹ thuật móng sâu và tư vấn giải pháp gia cường kết cấu.",
      points: ["Thẩm tra móng sâu ngầm", "Kiểm định chịu tải trọng", "Gia cường kết cấu thép"],
    },
    {
      icon: Building2,
      accentColor: "#D4A017",
      title: "Project Management",
      subtitle: "Quản Lý Dự Án Theo Chuẩn PMI",
      description: "Đội ngũ Giám đốc Dự án đạt chứng chỉ PMI quốc tế, trực tiếp điều phối nguồn lực, quản trị rủi ro HSE và kiểm soát chi phí tối ưu.",
      points: ["Quản trị rủi ro HSE", "Kiểm soát chi phí chuỗi cung ứng", "Báo cáo tiến độ thời gian thực"],
    },
  ];

  return (
    <section id="services" className="py-24 px-4 sm:px-6 bg-[#1E293B] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
            CORE ENGINEERING SERVICES
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Lĩnh Vực Dịch Vụ & Năng Lực Kỹ Thuật
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Cung cấp giải pháp tổng thể trọn gói từ tư vấn thiết kế số hóa BIM đến trực tiếp thi công hạ tầng siêu trọng theo chuẩn an toàn quốc tế.
          </p>
        </div>

        {/* Services Grid (Unified dark navy cards on #1E293B bg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#0F172A] rounded-2xl p-8 border border-[#334155] shadow-lg hover:border-[#3B82F6] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon Box */}
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `${svc.accentColor}20`, color: svc.accentColor }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-heading font-extrabold text-xl uppercase tracking-tight text-white">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#94A3B8] mt-0.5">
                      {svc.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {svc.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-[#334155]">
                    {svc.points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-medium text-[#94A3B8]">
                        <CheckCircle className="h-3.5 w-3.5 text-[#3B82F6] shrink-0" />
                        <span className="text-white">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
