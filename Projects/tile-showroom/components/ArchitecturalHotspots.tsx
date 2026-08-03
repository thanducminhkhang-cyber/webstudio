"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Compass } from "lucide-react";

export default function ArchitecturalHotspots() {
  const [activeHotspot, setActiveHotspot] = useState<number>(0);

  const hotspots = [
    {
      id: 1,
      x: "25%",
      y: "35%",
      title: "Cắt Mài Laser Vi Sai 0.1mm",
      desc: "Công nghệ mài cạnh laser chuẩn vi sai 0.1mm cho phép thi công đường mạch siêu mảnh, tạo hiệu ứng liên kết 100% nguyên khối.",
      icon: Layers,
    },
    {
      id: 2,
      x: "65%",
      y: "45%",
      title: "Kháng Thấm Tuyệt Đối < 0.05%",
      desc: "Độ hút nước gần như bằng 0 giúp bề mặt kháng mốc, rêu bám và chống nứt ố màu theo thời gian.",
      icon: ShieldCheck,
    },
    {
      id: 3,
      x: "40%",
      y: "70%",
      title: "Chống Trượt R11 & Độ Dày Extra 20mm",
      desc: "Bề mặt xử lý sương vi mô nhám R11 an toàn tuyệt đối cho lối đi ngoài trời, bể bơi và biệt thự sân vườn.",
      icon: Compass,
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#0D0D0C] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-2">
          <span className="text-[11px] text-[#C5A880] uppercase tracking-[0.25em] font-mono font-bold">
            HIGH-TECH ARCHITECTURAL PRECISION
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            Chuẩn Mực Kỹ Thuật Độc Quyền
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-xs sm:text-sm font-normal">
            Nhấp vào từng điểm tương tác trên bản vẽ để khám phá công nghệ chế tác gạch khổ lớn Stona Slab.
          </p>
        </div>

        {/* Interactive Architectural Blueprint Visual with Hotspots */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-2xl bg-black">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
              alt="Architectural Hotspot Showcase"
              fill
              className="object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-[#0D0D0C]/40" />

            {/* Hotspot Pins */}
            {hotspots.map((hs, idx) => {
              const Icon = hs.icon;
              const isActive = activeHotspot === idx;
              return (
                <div
                  key={hs.id}
                  style={{ top: hs.y, left: hs.x }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => setActiveHotspot(idx)}
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className={`h-11 w-11 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-colors ${
                      isActive
                        ? "bg-[#C5A880] border-white text-[#0D0D0C] shadow-[0_0_25px_rgba(197,168,128,0.9)]"
                        : "bg-black/70 border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D0D0C]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Active Hotspot Info Card */}
          <div className="lg:col-span-4 space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
            <span className="text-[11px] font-bold text-[#C5A880] uppercase tracking-[0.2em] font-mono">
              TECH SPECIFICATION #{activeHotspot + 1}
            </span>
            <h3 className="font-heading text-2xl font-bold uppercase text-white">
              {hotspots[activeHotspot].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {hotspots[activeHotspot].desc}
            </p>

            <div className="pt-4 border-t border-white/10 flex gap-2">
              {hotspots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHotspot(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeHotspot === idx ? "w-8 bg-[#C5A880]" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
