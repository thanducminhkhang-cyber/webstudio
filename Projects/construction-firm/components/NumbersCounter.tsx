"use client";

import React from "react";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { useTheme } from "./ThemeProvider";

export default function NumbersCounter() {
  const { theme } = useTheme();

  return (
    <section className={`py-24 sm:py-32 px-4 sm:px-6 border-y transition-colors duration-300 ${
      theme === "light"
        ? "bg-[#F8F6F1] border-[#0D1321]/10 text-[#0D1321]"
        : "bg-[#0D1321] border-white/10 text-white"
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#C9A227] flex items-center justify-center">
            $<NumberTicker value={48} className="text-[#C9A227] font-extrabold inline-block" />B+
          </h3>
          <p className={`text-xs font-mono font-bold uppercase tracking-[0.15em] ${
            theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
          }`}>
            Tổng Giá Trị Dự Án
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#C9A227] flex items-center justify-center">
            <NumberTicker value={450} className="text-[#C9A227] font-extrabold inline-block" />+
          </h3>
          <p className={`text-xs font-mono font-bold uppercase tracking-[0.15em] ${
            theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
          }`}>
            Siêu Dự Án Đã Bàn Giao
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#C9A227] flex items-center justify-center">
            <NumberTicker value={3200} className="text-[#C9A227] font-extrabold inline-block" />+
          </h3>
          <p className={`text-xs font-mono font-bold uppercase tracking-[0.15em] ${
            theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
          }`}>
            Kỹ Sư & Nhân Sự Toàn Cầu
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#C9A227] flex items-center justify-center">
            <NumberTicker value={100} className="text-[#C9A227] font-extrabold inline-block" />%
          </h3>
          <p className={`text-xs font-mono font-bold uppercase tracking-[0.15em] ${
            theme === "light" ? "text-[#4A5264]" : "text-[#B8BCC8]"
          }`}>
            An Toàn Kỷ Luật HSE
          </p>
        </div>
      </div>
    </section>
  );
}
