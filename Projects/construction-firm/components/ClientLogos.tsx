"use client";

import React from "react";
import { Marquee } from "@wsos/ui/blocks/marquee";
import { useTheme } from "./ThemeProvider";

export default function ClientLogos() {
  const { theme } = useTheme();

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
    <section id="clients" className={`py-12 border-y overflow-hidden transition-colors duration-300 ${
      theme === "light"
        ? "bg-white border-slate-200 text-[#0D1321]"
        : "bg-[#121A2D] border-white/10 text-white"
    }`}>
      <div className="max-w-7xl mx-auto space-y-4">
        <p className="text-center text-[10px] text-[#C9A227] font-mono uppercase tracking-[0.25em] font-bold">
          ĐỐI TÁC CHỦ ĐẦU TƯ TẬP ĐOÀN TOÀN CẦU FORTUNE 500
        </p>
        <Marquee pauseOnHover className="[--duration:25s]">
          {clients.map((c, i) => (
            <span key={i} className={`mx-10 font-heading font-extrabold text-xl tracking-[0.15em] hover:text-[#C9A227] transition-colors cursor-pointer ${
              theme === "light" ? "text-[#0D1321]/80" : "text-slate-300"
            }`}>
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
