"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Building, Users, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CountryPartner {
  id: string;
  flagClass: string;
  country: string;
  role: string;
  partners: string;
  details: string;
}

export default function StatsAndPartners() {
  const [activeCountry, setActiveCountry] = useState<CountryPartner | null>(null);

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

  const countryPartners: CountryPartner[] = [
    {
      id: "vn",
      flagClass: "fi fi-vn",
      country: "Việt Nam",
      role: "Trụ sở chính Vanguard",
      partners: "Vanguard Headquarter & 180+ Siêu dự án EPC",
      details: "Tập đoàn tổng thầu thi công hạ tầng & cao ốc biểu tượng",
    },
    {
      id: "kr",
      flagClass: "fi fi-kr",
      country: "Hàn Quốc",
      role: "Đối tác Tập đoàn",
      partners: "Samsung Electronics, Hyundai E&C",
      details: "Thi công 24 dự án nhà máy bán dẫn & hạ tầng cao cấp",
    },
    {
      id: "us",
      flagClass: "fi fi-us",
      country: "Mỹ (USA)",
      role: "Đối tác Tập đoàn",
      partners: "General Electric, Boeing, Bechtel Global",
      details: "Tư vấn & thi công 15 dự án năng lượng & kỹ thuật siêu trọng",
    },
    {
      id: "jp",
      flagClass: "fi fi-jp",
      country: "Nhật Bản",
      role: "Đối tác Tập đoàn",
      partners: "Mitsubishi Heavy Industries",
      details: "Chuyển giao công nghệ 12 dự án hầm ngầm & đô thị thông minh",
    },
    {
      id: "se",
      flagClass: "fi fi-se",
      country: "Thụy Điển",
      role: "Đối tác Tập đoàn",
      partners: "Skanska Group",
      details: "Hợp tác thi công 8 dự án xanh chuẩn LEED Gold quốc tế",
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
    <section id="stats-partners" className="py-24 px-4 sm:px-6 bg-[#1E293B] text-white border-t border-[#334155]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
            TRACK RECORD & PERFORMANCE BARS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Số Liệu Năng Lực & Thanh Chỉ Số Dự Án
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Minh chứng năng lực thực tế qua chỉ số tiến độ bàn giao chuẩn xác và cam kết an toàn lao động tuyệt đối.
          </p>
        </div>

        {/* 1. Static Stats Grid (36px-40px, NO Animation) */}
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
                className="bg-[#0F172A] rounded-2xl p-6 border border-[#334155] space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-white">
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

        {/* 2. THANH SO SÁNH NĂNG LỰC (PART 3 PROGRESS BARS BLOCK) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#0F172A] border border-[#334155] rounded-2xl p-6 sm:p-8 space-y-6 max-w-4xl mx-auto shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#334155] pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#D4A017]" />
              <h3 className="font-heading font-extrabold text-lg uppercase text-white tracking-wider">
                Chỉ Số Thi Công & Cam Kết Kỹ Thuật
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#3B82F6] uppercase bg-[#1E293B] px-3 py-1 rounded-full border border-[#334155]">
              Audited 2026
            </span>
          </div>

          <div className="space-y-6">
            {/* Progress Bar 1: Tiến độ hoàn thành trung bình */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#D4A017]" />
                  Tiến độ hoàn thành trung bình dự án: 96% đúng hạn hoặc sớm hơn
                </span>
                <span className="font-mono text-sm text-[#D4A017] font-extrabold">96%</span>
              </div>
              <div className="w-full bg-[#334155] h-3 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "96%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-[#D4A017] h-full rounded-full shadow-md"
                />
              </div>
            </div>

            {/* Progress Bar 2: Tỷ lệ an toàn lao động */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#3B82F6]" />
                  Tỷ lệ an toàn lao động: 99.9% Zero-Accident
                </span>
                <span className="font-mono text-sm text-[#3B82F6] font-extrabold">99.9%</span>
              </div>
              <div className="w-full bg-[#334155] h-3 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "99.9%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-[#3B82F6] h-full rounded-full shadow-md"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. DẢI QUỐC KỲ ĐỐI TÁC CHIẾN LƯỢC (FLAG-ICONS LIBRARY) */}
        <div className="pt-4 space-y-8">
          <div className="text-center space-y-1">
            <h3 className="font-heading font-extrabold text-xl uppercase tracking-wider text-white">
              Quốc Gia & Đối Tác Chiến Lược Toàn Cầu
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Di chuột hoặc chạm vào từng quốc kỳ để xem chi tiết đối tác & dự án tiêu biểu
            </p>
          </div>

          {/* Flexbox Row of Country Flag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto relative">
            {countryPartners.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveCountry(item)}
                onMouseLeave={() => setActiveCountry(null)}
                onClick={() => setActiveCountry(activeCountry?.id === item.id ? null : item)}
                className={`relative cursor-pointer flex items-center gap-2.5 bg-[#0F172A] border ${
                  activeCountry?.id === item.id ? "border-[#D4A017] bg-[#0F172A]" : "border-[#334155]"
                } hover:border-[#D4A017] rounded-full px-5 py-2.5 transition-all duration-200 shadow-md group`}
              >
                {/* Flag Icon */}
                <span className={`${item.flagClass} fi-custom shadow-xs group-hover:scale-110 transition-transform`} />

                {/* Country Name */}
                <span className="font-heading font-semibold text-sm text-white group-hover:text-[#D4A017] transition-colors">
                  {item.country}
                </span>

                {/* Role badge */}
                <span className="text-[10px] font-mono text-[#94A3B8] bg-[#1E293B] px-2 py-0.5 rounded-full border border-[#334155]">
                  {item.role}
                </span>

                {/* Hover / Tap Tooltip Box */}
                <AnimatePresence>
                  {activeCountry?.id === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-3.5 rounded-xl bg-[#0F172A] border border-[#D4A017] shadow-2xl z-40 text-white space-y-1 text-left pointer-events-none"
                    >
                      <div className="flex items-center justify-between border-b border-[#334155] pb-1.5">
                        <span className="font-heading font-extrabold text-xs text-[#D4A017] uppercase tracking-wider flex items-center gap-2">
                          <span className={`${item.flagClass} fi-custom`} /> {item.country}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#3B82F6] uppercase">
                          Đối Tác Chính
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white pt-0.5">
                        {item.partners}
                      </p>
                      <p className="text-[11px] text-[#94A3B8] leading-snug">
                        {item.details}
                      </p>
                      {/* Tooltip Down Arrow */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#D4A017]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Strategic Partners Logos Grid */}
        <div className="pt-8 border-t border-[#334155] space-y-6">
          <p className="text-center text-[10px] text-[#94A3B8] font-mono uppercase tracking-[0.25em] font-bold">
            ĐỐI TÁC CHỦ ĐẦU TƯ TẬP ĐOÀN TOÀN CẦU FORTUNE 500
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clients.map((c, i) => (
              <div
                key={i}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-4 flex items-center justify-center text-center hover:border-[#3B82F6] transition-colors"
              >
                <span className="font-heading font-extrabold text-xs tracking-wider text-[#94A3B8] hover:text-white transition-colors">
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
