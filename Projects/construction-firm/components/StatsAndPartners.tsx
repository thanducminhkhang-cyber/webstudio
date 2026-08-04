"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Building, Users, Globe } from "lucide-react";

export default function StatsAndPartners() {
  const stats = [
    {
      value: "48 tỷ USD",
      label: "Tổng giá trị hợp đồng đã thực hiện",
      subtext: "Bao gồm các gói thầu EPC & hạ tầng trọng điểm",
      icon: DollarSign,
      color: "#3B82F6",
    },
    {
      value: "450+ dự án",
      label: "Hạ tầng & công nghiệp hoàn thành",
      subtext: "100% đúng tiến độ và cam kết bàn giao",
      icon: Building,
      color: "#D4A017",
    },
    {
      value: "3.200+ nhân sự",
      label: "Kỹ sư & chuyên gia kỹ thuật",
      subtext: "Trình độ cao đáp ứng chuẩn quốc tế PMI",
      icon: Users,
      color: "#F97316",
    },
    {
      value: "18 quốc gia",
      label: "Thị trường hoạt động toàn cầu",
      subtext: "Mạng lưới chi nhánh & đối tác đa quốc gia",
      icon: Globe,
      color: "#3B82F6",
    },
  ];

  const clients = [
    "SAMSUNG ELECTRONICS",
    "GENERAL ELECTRIC",
    "BOEING AEROSPACE",
    "VINGROUP HOLDING",
    "HYUNDAI E&C",
    "BECHTEL GLOBAL",
    "MITSUBISHI HEAVY",
    "SKANSKA GROUP",
  ];

  return (
    <section id="stats-partners" className="py-24 px-4 sm:px-6 bg-[#0F172A] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
            TRACK RECORD & STRATEGIC PARTNERS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Số Liệu Năng Lực & Đối Tác Chiến Lược
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Minh chứng năng lực qua những con số thực tế và sự đồng hành của các tập đoàn chủ đầu tư hàng đầu thế giới.
          </p>
        </div>

        {/* Static Stats Grid (Font Size 36px-40px, NO Animation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center text-white">
                    <Icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-[36px] sm:text-[40px] leading-none tracking-tight text-white">
                    {item.value}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-white mt-2">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
                    {item.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Strategic Partners Logos Grid */}
        <div className="pt-8 border-t border-[#334155] space-y-6">
          <p className="text-center text-[10px] text-[#94A3B8] font-mono uppercase tracking-[0.25em] font-bold">
            ĐỐI TÁC CHỦ ĐẦU TƯ TẬP ĐOÀN TOÀN CẦU
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((c, i) => (
              <div
                key={i}
                className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex items-center justify-center text-center hover:border-[#3B82F6] transition-colors"
              >
                <span className="font-heading font-bold text-xs tracking-wider text-[#94A3B8] hover:text-white transition-colors">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
