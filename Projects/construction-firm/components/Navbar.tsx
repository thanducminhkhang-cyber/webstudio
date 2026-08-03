"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  HardHat,
  Compass,
  Layers,
  Cpu,
  FileText,
  Building2,
} from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { useTheme } from "./ThemeProvider";
import { MEGA_PROJECTS } from "./ProjectShowcase";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
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
        setIsVisible(false); // Hide on scroll down
        setActiveDropdown(null);
      } else {
        setIsVisible(true); // Show on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
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
          ? theme === "light"
            ? "bg-[#F8F6F1]/95 backdrop-blur-xl border-b border-[#0D1321]/10 py-3.5 shadow-lg"
            : "bg-[#0D1321]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo with larger margin-right (mr-8 lg:mr-12) to separate branding from navigation */}
        <Link href="/" className="flex items-center gap-3 group mr-6 lg:mr-12 shrink-0">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-[#C9A227] via-[#E8C766] to-[#C9A227] text-[#0D1321] flex items-center justify-center font-heading font-extrabold text-2xl shadow-[0_0_20px_rgba(201,162,39,0.4)] group-hover:scale-105 transition-transform">
            V
          </div>
          <div>
            <span className={`font-heading font-extrabold text-2xl tracking-wider block leading-none ${theme === 'light' ? 'text-[#0D1321]' : 'text-white'}`}>
              VANGUARD <span className="text-[#C9A227]">CONSTRUCT</span>
            </span>
            <span className="text-[9px] text-[#C9A227] font-mono tracking-[0.25em] uppercase font-bold">
              Engineering & Mega Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold uppercase tracking-[0.12em] relative">
          <a
            href="#about"
            className={`py-1.5 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300 ${
              theme === "light" ? "text-[#0D1321]/80 hover:text-[#0D1321]" : "text-slate-300 hover:text-white"
            }`}
          >
            Giới Thiệu
          </a>

          <a
            href="#why-us"
            className={`py-1.5 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300 ${
              theme === "light" ? "text-[#0D1321]/80 hover:text-[#0D1321]" : "text-slate-300 hover:text-white"
            }`}
          >
            Năng Lực
          </a>

          {/* HIGHLIGHTED NAV ITEM: "Dự Án" WITH DROPDOWN MINI */}
          <div
            className="relative py-1.5"
            onMouseEnter={() => handleMouseEnterDropdown("projects")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a
              href="#projects"
              className={`flex items-center gap-1.5 font-extrabold text-[#C9A227] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300`}
            >
              <span>Dự Án</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "projects" ? "rotate-180" : ""}`} />
            </a>

            {/* DROPDOWN MINI: PROJECTS */}
            <AnimatePresence>
              {activeDropdown === "projects" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 w-80 p-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border z-50 space-y-3 ${
                    theme === "light"
                      ? "bg-white border-slate-200 text-[#0D1321]"
                      : "bg-[#0D1321] border-[rgba(201,162,39,0.3)] text-white"
                  }`}
                >
                  <p className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-widest border-b border-white/10 pb-2">
                    CÔNG TRÌNH BIỂU TƯỢNG NỔI BẬT
                  </p>
                  <div className="space-y-2.5">
                    {MEGA_PROJECTS.slice(0, 3).map((prj) => (
                      <a
                        key={prj.id}
                        href="#projects"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#C9A227]/10 transition-colors group"
                      >
                        <div className="relative h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          <Image src={prj.image} alt={prj.title} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold truncate group-hover:text-[#C9A227] transition-colors">{prj.title}</p>
                          <p className="text-[10px] text-[#C9A227] font-mono font-bold">{prj.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <a
                    href="#projects"
                    onClick={() => setActiveDropdown(null)}
                    className="block text-center pt-2 text-[11px] font-bold text-[#C9A227] hover:underline border-t border-white/10"
                  >
                    Xem tất cả 450+ dự án →
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* HIGHLIGHTED NAV ITEM: "Dịch Vụ" WITH DROPDOWN MINI */}
          <div
            className="relative py-1.5"
            onMouseEnter={() => handleMouseEnterDropdown("services")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <a
              href="#services"
              className={`flex items-center gap-1.5 font-extrabold text-[#C9A227] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300`}
            >
              <span>Dịch Vụ</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227] animate-pulse" />
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`} />
            </a>

            {/* DROPDOWN MINI: SERVICES */}
            <AnimatePresence>
              {activeDropdown === "services" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute top-full left-0 w-80 p-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border z-50 space-y-3 ${
                    theme === "light"
                      ? "bg-white border-slate-200 text-[#0D1321]"
                      : "bg-[#0D1321] border-[rgba(201,162,39,0.3)] text-white"
                  }`}
                >
                  <p className="text-[10px] font-mono font-bold text-[#C9A227] uppercase tracking-widest border-b border-white/10 pb-2">
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
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#C9A227]/10 transition-colors group"
                        >
                          <div className="h-8 w-8 rounded-lg bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold truncate group-hover:text-[#C9A227] transition-colors">{svc.name}</p>
                            <p className={`text-[10px] truncate ${theme === 'light' ? 'text-[#4A5264]' : 'text-[#B8BCC8]'}`}>{svc.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#timeline"
            className={`py-1.5 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300 ${
              theme === "light" ? "text-[#0D1321]/80 hover:text-[#0D1321]" : "text-slate-300 hover:text-white"
            }`}
          >
            Quy Trình
          </a>

          <a
            href="#clients"
            className={`py-1.5 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300 ${
              theme === "light" ? "text-[#0D1321]/80 hover:text-[#0D1321]" : "text-slate-300 hover:text-white"
            }`}
          >
            Đối Tác
          </a>

          <a
            href="#contact"
            className={`py-1.5 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#C9A227] after:to-[#E8C766] hover:after:w-full after:transition-all after:duration-300 ${
              theme === "light" ? "text-[#0D1321]/80 hover:text-[#0D1321]" : "text-slate-300 hover:text-white"
            }`}
          >
            Liên Hệ
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Vertical Divider separating "Liên Hệ" / Navigation from CTA button */}
          <div className="h-5 w-[1px] bg-white/20 dark:bg-white/20 hidden lg:block mx-1" />

          {/* Dark / Light Mode Toggle Switch (36x36px with circular border) */}
          <button
            onClick={toggleTheme}
            className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all shrink-0 ${
              theme === "light"
                ? "bg-white border-[#0D1321]/20 text-[#0D1321] hover:bg-slate-100 shadow-xs"
                : "bg-white/5 border-white/20 text-[#E8C766] hover:bg-white/10"
            }`}
            title={theme === "light" ? "Chuyển sang Giao diện Tối (Dark)" : "Chuyển sang Giao diện Sáng (Light)"}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Primary Consultation CTA Button with Box Shadow & Hover Brightness */}
          <Button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex bg-gradient-to-r from-[#C9A227] via-[#E8C766] to-[#C9A227] hover:brightness-110 text-[#0D1321] font-extrabold rounded-full text-xs tracking-[0.15em] uppercase px-6 py-3 shadow-[0_4px_16px_rgba(201,162,39,0.35)] border-none transition-all hover:-translate-y-0.5"
          >
            Liên Hệ Báo Giá Dự Án
          </Button>

          {/* Mobile Hamburger Morph Icon */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-amber-500/30 text-[#C9A227] hover:bg-amber-500/10 transition-transform active:scale-95"
            aria-label="Toggle Mobile Navigation"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-[#C9A227] rounded-full transition-transform duration-300 origin-left ${
                  isMobileOpen ? "rotate-45 translate-x-1 -translate-y-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#C9A227] rounded-full transition-opacity duration-300 ${
                  isMobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#C9A227] rounded-full transition-transform duration-300 origin-left ${
                  isMobileOpen ? "-rotate-45 translate-x-1 translate-y-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Slide-in Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-0 top-[74px] z-40 lg:hidden flex flex-col justify-between p-8 backdrop-blur-2xl ${
              theme === "light" ? "bg-[#F8F6F1]/95 text-[#0D1321]" : "bg-[#0D1321]/95 text-white"
            }`}
          >
            <nav className="flex flex-col gap-5 pt-2">
              <a href="#about" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider">Giới Thiệu</a>
              <a href="#why-us" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider">Năng Lực</a>
              <a href="#projects" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider text-[#C9A227] flex items-center justify-between">
                <span>Dự Án Biểu Tượng</span>
                <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
              </a>
              <a href="#services" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider text-[#C9A227] flex items-center justify-between">
                <span>Dịch Vụ Thi Công</span>
                <span className="h-2 w-2 rounded-full bg-[#C9A227]" />
              </a>
              <a href="#timeline" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider">Quy Trình</a>
              <a href="#clients" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider">Đối Tác</a>
              <a href="#contact" onClick={() => setIsMobileOpen(false)} className="font-heading font-extrabold text-xl uppercase tracking-wider">Liên Hệ</a>
            </nav>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <Button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenConsultation();
                }}
                className="w-full bg-gradient-to-r from-[#C9A227] via-[#E8C766] to-[#C9A227] text-[#0D1321] font-extrabold rounded-full text-sm tracking-widest uppercase py-4 shadow-xl border-none"
              >
                Yêu Cầu Tư Vấn Dự Án (Full-Width)
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
