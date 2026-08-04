"use client";

import React from "react";

export default function NumbersCounter() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0F172A] border-y border-[#334155] text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#334155]">
        <div className="space-y-2 px-4">
          <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            48 tỷ USD
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Tổng Giá Trị Dự Án
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            450+
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Siêu Dự Án Đã Bàn Giao
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            3.200+
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Kỹ Sư & Nhân Sự Toàn Cầu
          </p>
        </div>

        <div className="space-y-2 px-4">
          <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            100%
          </h3>
          <p className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            An Toàn Kỷ Luật HSE
          </p>
        </div>
      </div>
    </section>
  );
}
