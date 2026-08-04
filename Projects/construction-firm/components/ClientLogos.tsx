"use client";

import React from "react";

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
    <section id="clients" className="py-12 border-y border-[#334155] bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-6">
        <p className="text-center text-[10px] text-[#94A3B8] font-mono uppercase tracking-[0.25em] font-bold">
          ĐỐI TÁC CHỦ ĐẦU TƯ TẬP ĐOÀN TOÀN CẦU FORTUNE 500
        </p>

        {/* Static Grid (No Marquee, No scrolling animation) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {clients.map((c, i) => (
            <div
              key={i}
              className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex items-center justify-center text-center hover:border-[#3B82F6] transition-colors"
            >
              <span className="font-heading font-extrabold text-xs tracking-wider text-[#94A3B8] hover:text-white transition-colors">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
