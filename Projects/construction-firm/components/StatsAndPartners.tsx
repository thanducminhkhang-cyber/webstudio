"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Building, Users, Globe } from "lucide-react";

interface MapPin {
  id: string;
  name: string;
  partner: string;
  projects: string;
  cx: number;
  cy: number;
  r: number;
  delay: string;
}

export default function StatsAndPartners() {
  const [activePin, setActivePin] = useState<MapPin | null>(null);

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

  const mapPins: MapPin[] = [
    {
      id: "vn",
      name: "Việt Nam",
      partner: "Vanguard Headquarter",
      projects: "Trụ sở chính & 180+ Siêu dự án EPC",
      cx: 800,
      cy: 265,
      r: 8,
      delay: "0s",
    },
    {
      id: "kr",
      name: "Hàn Quốc",
      partner: "Samsung & Hyundai E&C",
      projects: "24 Dự án Nhà máy Bán dẫn & Hạ tầng",
      cx: 845,
      cy: 200,
      r: 5,
      delay: "0.3s",
    },
    {
      id: "us",
      name: "Hoa Kỳ (USA)",
      partner: "GE, Boeing & Bechtel",
      projects: "15 Dự án Năng lượng & Kỹ thuật siêu trọng",
      cx: 230,
      cy: 190,
      r: 5,
      delay: "0.6s",
    },
    {
      id: "jp",
      name: "Nhật Bản",
      partner: "Mitsubishi Heavy Industries",
      projects: "12 Dự án Hầm ngầm & Đô thị thông minh",
      cx: 875,
      cy: 195,
      r: 5,
      delay: "0.9s",
    },
    {
      id: "se",
      name: "Thụy Điển",
      partner: "Skanska Group",
      projects: "8 Dự án Xanh chuẩn LEED Gold",
      cx: 530,
      cy: 125,
      r: 5,
      delay: "1.2s",
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
      {/* CSS Pulse Animation Keyframes */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(2.8);
            opacity: 0;
          }
        }
        .animate-map-pulse {
          animation: pulse-ring 2.5s ease-out infinite;
          transform-origin: center;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono">
            TRACK RECORD & GLOBAL NETWORK
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight text-white">
            Số Liệu Năng Lực & Bản Đồ Dự Án Toàn Cầu
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Minh chứng năng lực thực tế qua mạng lưới dự án hạ tầng tỷ đô phủ sóng trên 18 quốc gia và vùng lãnh thổ.
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

        {/* 2. GLOBAL PROJECT MAP (PART 1 SVG MAP & PULSE DOTS) */}
        <div className="pt-6 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-heading font-extrabold text-xl uppercase tracking-wider text-white">
              Bản Đồ Phân Bố Dự Án Toàn Cầu
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Chạm hoặc di chuột vào các vị trí chấm vàng để xem chi tiết dự án & đối tác
            </p>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full max-w-[1000px] mx-auto h-[280px] sm:h-[420px] bg-[#0F172A] rounded-2xl border border-[#334155] p-4 overflow-hidden flex items-center justify-center shadow-2xl">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full object-contain"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* World Map Continent Outlines (SVG Paths) */}
              <g fill="#1E293B" stroke="#334155" strokeWidth="0.75" className="transition-colors duration-200">
                {/* North America */}
                <path d="M120,80 L280,60 L380,120 L300,220 L240,240 L180,180 L100,140 Z M220,240 L280,260 L240,320 L190,260 Z" />
                {/* South America */}
                <path d="M280,300 L360,280 L400,340 L340,460 L280,420 L260,340 Z" />
                {/* Europe */}
                <path d="M460,80 L580,70 L620,130 L550,170 L480,150 L450,110 Z" />
                {/* Africa */}
                <path d="M460,180 L580,170 L620,240 L580,360 L500,380 L440,260 Z" />
                {/* Asia / Eurasia */}
                <path d="M600,60 L920,50 L950,160 L880,260 L780,280 L680,220 L600,160 Z" />
                {/* Australia & Oceania */}
                <path d="M800,330 L920,320 L940,400 L840,420 L780,370 Z" />
              </g>

              {/* Pulse Dots & Pins */}
              {mapPins.map((pin) => {
                const isHovered = activePin?.id === pin.id;
                return (
                  <g
                    key={pin.id}
                    className="cursor-pointer group"
                    onMouseEnter={() => setActivePin(pin)}
                    onMouseLeave={() => setActivePin(null)}
                    onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
                  >
                    {/* Outer Animated Pulse Circle */}
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={pin.r * 2.2}
                      fill="none"
                      stroke="#D4A017"
                      strokeWidth="1.5"
                      className="animate-map-pulse opacity-60"
                      style={{ animationDelay: pin.delay }}
                    />

                    {/* Outer Glow Ring */}
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={pin.r + 3}
                      fill="rgba(212, 160, 23, 0.25)"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="1"
                    />

                    {/* Main Solid Gold Dot */}
                    <circle
                      cx={pin.cx}
                      cy={pin.cy}
                      r={pin.r}
                      fill="#D4A017"
                      className="transition-transform duration-200 group-hover:scale-125"
                    />

                    {/* Dot Label (Country code) */}
                    <text
                      x={pin.cx}
                      y={pin.cy + pin.r + 14}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="pointer-events-none drop-shadow-md uppercase tracking-wider"
                    >
                      {pin.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Interactive Tooltip Display (Desktop Hover / Mobile Tap) */}
            <AnimatePresence>
              {activePin && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-30 p-3.5 rounded-xl bg-[#1E293B] border border-[#D4A017] shadow-2xl text-white pointer-events-none max-w-xs space-y-1"
                  style={{
                    left: `${(activePin.cx / 1000) * 100}%`,
                    top: `${(activePin.cy / 500) * 100 - 18}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#334155] pb-1.5">
                    <span className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
                      📍 {activePin.name}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#D4A017] uppercase bg-[#0F172A] px-2 py-0.5 rounded border border-[#334155]">
                      Active
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {activePin.partner}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] leading-snug">
                    {activePin.projects}
                  </p>
                  {/* Tooltip Arrow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#D4A017]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Strategic Partners Logos Grid */}
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
