"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-slate-400 py-16 px-4 sm:px-6 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 relative z-10">
        <div className="space-y-4">
          <span className="font-heading font-extrabold text-2xl text-white block">
            VANGUARD <span className="text-[#F4B942]">CONSTRUCT</span>
          </span>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
            Tập đoàn tổng thầu xây dựng EPC & hạ tầng công nghiệp quy mô toàn cầu. Đột phá kỷ nguyên thi công số.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white text-base uppercase">Lĩnh Vực Thi Công</h4>
          <p className="hover:text-[#F4B942] cursor-pointer">General EPC Contracting</p>
          <p className="hover:text-[#F4B942] cursor-pointer">High-Tech Semi-conductor Plant</p>
          <p className="hover:text-[#F4B942] cursor-pointer">Skyscraper Financial Towers</p>
          <p className="hover:text-[#F4B942] cursor-pointer">Offshore Wind & Infrastructure</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white text-base uppercase">Trụ Sở Chính</h4>
          <p className="text-slate-400">Headquarter HCM: Vanguard Tower, 102 Lê Duẩn, Quận 1, TP.HCM</p>
          <p className="text-slate-400">Hanoi Office: Keangnam Landmark 72, Nam Từ Liêm, Hà Nội</p>
          <p className="text-[#F4B942] font-mono font-bold">Tel: +84 (28) 3899 9999</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-white text-base uppercase">Bản Đăng Ký Bản Tin</h4>
          <p className="text-slate-400">Nhận thông tin cập nhật các siêu dự án và báo cáo thị trường xây dựng hàng tháng.</p>
          <div className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="Email công ty..."
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F4B942] flex-1"
            />
            <button className="bg-[#F4B942] text-[#0B0F19] font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#e0a430]">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM: VERY SMALL MUTED 12px LINK "Quản trị" */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4 relative z-10">
        <p>© 2026 VANGUARD CONSTRUCT Engineering & Mega Infrastructure Empire. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="hover:underline hover:text-slate-300 font-mono text-[12px] text-slate-500">
            Quản trị
          </Link>
          <p className="text-[#F4B942] font-mono">WSOS Studio Showcase #005</p>
        </div>
      </div>
    </footer>
  );
}
