"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer id="contact" className="py-16 px-4 sm:px-6 border-t border-[#334155] relative overflow-hidden bg-[#0F172A] text-white">
      {/* Section 8: CTA Cuối Màn Hình */}
      <div className="max-w-7xl mx-auto pb-16 border-b border-[#334155] text-center space-y-6">
        <span className="text-[11px] font-extrabold text-[#3B82F6] uppercase tracking-[0.25em] font-mono block">
          START YOUR MEGA INFRASTRUCTURE PROJECT
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase leading-tight text-white max-w-3xl mx-auto">
          Sẵn Sàng Kiến Tạo Công Trình Biểu Tượng Tỷ Đô?
        </h2>
        <div className="pt-2">
          <Button
            onClick={onOpenConsultation}
            className="bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-sm tracking-wider uppercase px-10 py-4 h-auto border-none transition-colors"
          >
            NHẬN BÁO GIÁ MIỄN PHÍ <ArrowRight className="ml-2 h-5 w-5 inline text-[#0F172A]" />
          </Button>
        </div>
      </div>

      {/* Footer Navigation & Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 my-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-[#D4A017] text-[#0F172A] flex items-center justify-center shrink-0 shadow-md border border-[#B8890F]">
              <svg className="h-5 w-5 text-[#0F172A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l8 16L20 4" />
                <path d="M8 4l4 8 4-8" strokeWidth="2" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-wider block leading-none text-white">
              VANGUARD <span className="text-[#D4A017]">CONSTRUCT</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed max-w-xs font-normal text-[#94A3B8]">
            Tập đoàn tổng thầu xây dựng EPC & hạ tầng công nghiệp quy mô toàn cầu. Đột phá kỷ nguyên thi công số.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-sm uppercase text-white">Lĩnh Vực Thi Công</h4>
          <p className="text-[#94A3B8] hover:text-white cursor-pointer transition-colors">General EPC Contracting</p>
          <p className="text-[#94A3B8] hover:text-white cursor-pointer transition-colors">High-Tech Semi-conductor Plant</p>
          <p className="text-[#94A3B8] hover:text-white cursor-pointer transition-colors">Skyscraper Financial Towers</p>
          <p className="text-[#94A3B8] hover:text-white cursor-pointer transition-colors">Offshore Wind & Infrastructure</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-sm uppercase text-white">Trụ Sở Chính</h4>
          <p className="text-[#94A3B8]">Headquarter HCM: Vanguard Tower, 102 Lê Duẩn, Quận 1, TP.HCM</p>
          <p className="text-[#94A3B8]">Hanoi Office: Keangnam Landmark 72, Nam Từ Liêm, Hà Nội</p>
          <p className="text-[#D4A017] font-mono font-bold">Tel: +84 (28) 3899 9999</p>
        </div>

        <div className="space-y-3 text-xs">
          <h4 className="font-heading font-bold text-sm uppercase text-white">Đăng Ký Bản Tin EPC</h4>
          <p className="text-[#94A3B8]">Nhận thông tin cập nhật các siêu dự án và báo cáo thị trường xây dựng hàng tháng.</p>
          <div className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="Email công ty..."
              className="bg-[#1E293B] border border-[#334155] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#3B82F6] flex-1 text-white placeholder:text-[#64748B]"
            />
            <button className="bg-[#D4A017] text-[#0F172A] font-extrabold text-xs px-4 py-2 rounded-xl hover:bg-[#B8890F] transition-colors">
              Đăng Ký
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto border-t border-[#334155] pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-4 relative z-10 text-[#64748B]">
        <p>© 2026 VANGUARD CONSTRUCT Engineering & Infrastructure. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/admin" className="hover:underline hover:text-[#94A3B8] font-mono text-[12px] text-[#64748B]">
            Quản trị
          </Link>
          <p className="text-[#D4A017] font-mono font-bold">WSOS Studio Showcase #005</p>
        </div>
      </div>
    </footer>
  );
}
