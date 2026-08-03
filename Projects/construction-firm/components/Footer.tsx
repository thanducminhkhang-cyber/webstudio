"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { useTheme } from "./ThemeProvider";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const { theme } = useTheme();

  return (
    <footer id="contact" className={`py-16 px-4 sm:px-6 border-t relative overflow-hidden transition-colors duration-300 ${
      theme === "light" ? "bg-[#F8F6F1] border-[#0D1321]/10 text-[#0D1321]" : "bg-[#0D1321] border-white/10 text-slate-400"
    }`}>
      {/* REPEATED CTA 3: Final Pre-Footer Call to Action */}
      <div className="max-w-7xl mx-auto pb-16 border-b border-white/10 text-center space-y-6">
        <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.25em] font-mono block">
          START YOUR MEGA INFRASTRUCTURE PROJECT
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase leading-[1.2]">
          Sẵn Sàng Kiến Tạo Công Trình Biểu Tượng Tỷ Đô?
        </h2>
        <div className="pt-2">
          <Button
            onClick={onOpenConsultation}
            className="gold-gradient-bg text-[#0D1321] font-extrabold rounded-full text-sm tracking-[0.15em] uppercase px-10 py-5 h-auto shadow-[0_0_30px_rgba(201,162,39,0.4)] border-none transition-all hover:brightness-110 hover:-translate-y-0.5"
          >
            ĐĂNG KÝ TƯ VẤN DỰ ÁN EPC TRỰC TIẾP <ArrowRight className="ml-2 h-5 w-5 inline" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 my-12 relative z-10">
        <div className="space-y-4">
          <span className="font-heading font-extrabold text-2xl tracking-wider block leading-none">
            VANGUARD <span className="text-[#C9A227]">CONSTRUCT</span>
          </span>
          <p className={`text-xs leading-relaxed max-w-xs font-normal ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>
            Tập đoàn tổng thầu xây dựng EPC & hạ tầng công nghiệp quy mô toàn cầu. Đột phá kỷ nguyên thi công số.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-extrabold text-base uppercase">Lĩnh Vực Thi Công</h4>
          <p className="hover:text-[#C9A227] cursor-pointer">General EPC Contracting</p>
          <p className="hover:text-[#C9A227] cursor-pointer">High-Tech Semi-conductor Plant</p>
          <p className="hover:text-[#C9A227] cursor-pointer">Skyscraper Financial Towers</p>
          <p className="hover:text-[#C9A227] cursor-pointer">Offshore Wind & Infrastructure</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-extrabold text-base uppercase">Trụ Sở Chính</h4>
          <p className={theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}>Headquarter HCM: Vanguard Tower, 102 Lê Duẩn, Quận 1, TP.HCM</p>
          <p className={theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}>Hanoi Office: Keangnam Landmark 72, Nam Từ Liêm, Hà Nội</p>
          <p className="text-[#C9A227] font-mono font-bold">Tel: +84 (28) 3899 9999</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-extrabold text-base uppercase">Đăng Ký Bản Tin EPC</h4>
          <p className={theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}>Nhận thông tin cập nhật các siêu dự án và báo cáo thị trường xây dựng hàng tháng.</p>
          <div className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="Email công ty..."
              className={`border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#C9A227] flex-1 ${
                theme === "light" ? "bg-white border-slate-300 text-[#0D1321]" : "bg-white/5 border-white/10 text-white"
              }`}
            />
            <button className="gold-gradient-bg text-[#0D1321] font-bold text-xs px-4 py-2 rounded-xl hover:brightness-110">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM: VERY SMALL MUTED 12px LINK "Quản trị" */}
      <div className={`max-w-7xl mx-auto border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 relative z-10 ${
        theme === "light" ? "border-slate-200 text-slate-500" : "border-white/10 text-slate-500"
      }`}>
        <p>© 2026 VANGUARD CONSTRUCT Engineering & Mega Infrastructure Empire. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="hover:underline hover:text-slate-300 font-mono text-[12px] text-slate-500">
            Quản trị
          </Link>
          <p className="text-[#C9A227] font-mono font-bold">WSOS Studio Showcase #005</p>
        </div>
      </div>
    </footer>
  );
}
