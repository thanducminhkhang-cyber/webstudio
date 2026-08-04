"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HardHat,
  Compass,
  Layers,
  Cpu,
  FileText,
  Building2,
  PhoneCall,
} from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { MEGA_PROJECTS } from "./ProjectShowcase";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<"projects" | "services" | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
        setActiveDropdown(null);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const handleMouseEnterDropdown = (type: "projects" | "services") => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(type);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const servicesList = [
    { icon: HardHat, name: "General Construction EPC", desc: "Tổng thầu thi công hạ tầng & cao ốc" },
    { icon: Compass, name: "Architecture & BIM 5D", desc: "Thiết kế số hóa & tính toán kết cấu" },
    { icon: Layers, name: "Interior Architectural Finishing", desc: "Hoàn thiện nội thất 5 sao" },
    { icon: Cpu, name: "MEP & High-Tech Engineering", desc: "Hệ thống cơ điện lạnh BMS trung tâm" },
    { icon: FileText, name: "Engineering Consulting", desc: "Tư vấn thẩm tra kết cấu siêu trọng" },
    { icon: Building2, name: "Project Management", desc: "Quản lý dự án theo chuẩn PMI" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#334155] py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group mr-4 lg:mr-8 shrink-0">
          <div className="h-10 w-10 rounded-xl bg-[#D4A017] text-[#0F172A] flex items-center justify-center font-heading font-extrabold text-2xl shadow-md group-hover:bg-[#B8890F] transition-colors">
            V
          </div>
          <div>
            <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-wider block leading-none text-white">
              VANGUARD <span className="text-[#D4A017]">CONSTRUCT</span>
            </span>
            <span className="text-[9px] text-[#94A3B8] font-mono tracking-[0.2em] uppercase font-semibold">
              Engineering & Mega Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-[0.1em] relative">
          <a href="#about" className="py-1.5 text-[#94A3B8] hover:text-white transition-colors">
            Giới Thiệu
          </a>

          {/* DROPDOWN: PROJECTS */}
          <div
            className="relative py-1.5"
            onMouseEnter={() => handleMouseEnterDropdown("projects")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a href="#projects" className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white transition-colors">
              <span>Dự Án</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "projects" ? "rotate-180" : ""}`} />
            </a>

            <AnimatePresence>
              {activeDropdown === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-80 p-4 rounded-2xl shadow-2xl border border-[#334155] bg-[#1E293B] text-white z-50 space-y-3"
                >
                  <p className="text-[10px] font-mono font-bold text-[#D4A017] uppercase tracking-widest border-b border-[#334155] pb-2">
                    CÔNG TRÌNH BIỂU TƯỢNG NỔI BẬT
                  </p>
                  <div className="space-y-2.5">
                    {MEGA_PROJECTS.slice(0, 3).map((prj) => (
                      <a
                        key={prj.id}
                        href="#projects"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#0F172A] transition-colors group"
                      >
                        <div className="relative h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-[#334155]">
                          <Image src={prj.image} alt={prj.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate text-white group-hover:text-[#D4A017] transition-colors">{prj.title}</p>
                          <p className="text-[10px] text-[#94A3B8] font-mono font-semibold">{prj.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <a
                    href="#projects"
                    onClick={() => setActiveDropdown(null)}
                    className="block text-center pt-2 text-[11px] font-bold text-[#D4A017] hover:underline border-t border-[#334155]"
                  >
                    Xem tất cả 450+ dự án →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DROPDOWN: SERVICES */}
          <div
            className="relative py-1.5"
            onMouseEnter={() => handleMouseEnterDropdown("services")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a href="#services" className="flex items-center gap-1.5 text-[#94A3B8] hover:text-white transition-colors">
              <span>Dịch Vụ</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
            </a>

            <AnimatePresence>
              {activeDropdown === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-80 p-4 rounded-2xl shadow-2xl border border-[#334155] bg-[#1E293B] text-white z-50 space-y-3"
                >
                  <p className="text-[10px] font-mono font-bold text-[#D4A017] uppercase tracking-widest border-b border-[#334155] pb-2">
                    LĨNH VỰC THI CÔNG & KỸ THUẬT
                  </p>
                  <div className="space-y-2">
                    {servicesList.map((svc, i) => {
                      const Icon = svc.icon;
                      return (
                        <a
                          key={i}
                          href="#services"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#0F172A] transition-colors group"
                        >
                          <div className="h-8 w-8 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold truncate text-white group-hover:text-[#D4A017] transition-colors">{svc.name}</p>
                            <p className="text-[10px] truncate text-[#94A3B8]">{svc.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#timeline" className="py-1.5 text-[#94A3B8] hover:text-white transition-colors">
            Quy Trình
          </a>

          <a href="#stats-partners" className="py-1.5 text-[#94A3B8] hover:text-white transition-colors">
            Số Liệu & Bản Đồ
          </a>

          <a href="#testimonials-awards" className="py-1.5 text-[#94A3B8] hover:text-white transition-colors">
            Đánh Giá & Giải Thưởng
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0988999888"
            className="flex items-center gap-2 border border-[#334155] bg-[#1E293B] hover:border-[#3B82F6] px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-colors"
          >
            <PhoneCall className="h-4 w-4 text-[#3B82F6] shrink-0" />
            <span className="hidden sm:inline font-mono">0988.999.888</span>
          </a>

          <Button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-xs tracking-wider uppercase px-5 py-2.5 shadow-md border-none transition-colors"
          >
            NHẬN BÁO GIÁ MIỄN PHÍ
          </Button>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-[#334155] text-white hover:bg-[#1E293B] transition-colors"
            aria-label="Toggle Mobile Navigation"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 origin-left ${isMobileOpen ? "rotate-45 translate-x-1 -translate-y-0.5" : ""}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-opacity duration-300 ${isMobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-transform duration-300 origin-left ${isMobileOpen ? "-rotate-45 translate-x-1 translate-y-0.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-[74px] z-40 lg:hidden flex flex-col justify-between p-8 bg-[#0F172A] text-white border-t border-[#334155]"
          >
            <nav className="flex flex-col gap-5 pt-2">
              <a href="#about" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Giới Thiệu</a>
              <a href="#projects" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Dự Án Biểu Tượng</a>
              <a href="#services" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Dịch Vụ Thi Công</a>
              <a href="#timeline" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Quy Trình Thi Công</a>
              <a href="#stats-partners" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Số Liệu & Bản Đồ</a>
              <a href="#testimonials-awards" onClick={() => setIsMobileOpen(false)} className="font-heading font-bold text-lg uppercase tracking-wider text-white">Đánh Giá & Giải Thưởng</a>
            </nav>

            <div className="space-y-3 pt-6 border-t border-[#334155]">
              <a
                href="tel:0988999888"
                className="w-full flex items-center justify-center gap-2 bg-[#1E293B] border border-[#334155] text-white font-bold rounded-xl py-3 text-sm font-mono"
              >
                <PhoneCall className="h-4 w-4 text-[#3B82F6]" /> Hotline: 0988.999.888
              </a>
              <Button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-xl text-xs tracking-wider uppercase py-4 border-none"
              >
                NHẬN BÁO GIÁ MIỄN PHÍ
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
