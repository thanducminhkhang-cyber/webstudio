"use client";

import React from "react";
import { Marquee } from "@wsos/ui/blocks/marquee";

export default function ClientLogos() {
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
    <section className="py-12 bg-[#151C28] text-white border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-4">
        <p className="text-center text-[10px] text-[#F4B942] font-mono uppercase tracking-[0.25em] font-bold">
          ĐỐI TÁC CHỦ ĐẦU TƯ TẬP ĐOÀN TOÀN CẦU FORTUNE 500
        </p>
        <Marquee pauseOnHover className="[--duration:25s]">
          {clients.map((c, i) => (
            <span key={i} className="mx-10 font-heading font-extrabold text-xl text-slate-300 tracking-[0.15em] hover:text-[#F4B942] transition-colors cursor-pointer">
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
