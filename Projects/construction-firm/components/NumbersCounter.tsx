"use client";

import React from "react";
import { motion } from "framer-motion";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";

export default function NumbersCounter() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-[#0B0F19] text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F4B942]">
            $<NumberTicker value={48} />B+
          </h3>
          <p className="text-xs text-slate-300 font-mono font-bold uppercase tracking-[0.15em]">Tổng Giá Trị Dự Án</p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F4B942]">
            <NumberTicker value={450} />+
          </h3>
          <p className="text-xs text-slate-300 font-mono font-bold uppercase tracking-[0.15em]">Siêu Dự Án Đã Bàn Giao</p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F4B942]">
            <NumberTicker value={3200} />+
          </h3>
          <p className="text-xs text-slate-300 font-mono font-bold uppercase tracking-[0.15em]">Kỹ Sư & Nhân Sự Toàn Cầu</p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F4B942]">
            <NumberTicker value={100} />%
          </h3>
          <p className="text-xs text-slate-300 font-mono font-bold uppercase tracking-[0.15em]">An Toàn Kỷ Luật HSE</p>
        </div>
      </div>
    </section>
  );
}
