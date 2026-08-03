"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface HeaderGlassProps {
  activeTab: "home" | "collections" | "detail" | "projects" | "about";
  setActiveTab: (tab: "home" | "collections" | "detail" | "projects" | "about") => void;
  onBookShowroom: () => void;
}

export default function HeaderGlass({ activeTab, setActiveTab, onBookShowroom }: HeaderGlassProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (tab: "home" | "collections" | "detail" | "projects" | "about") => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { number: "01", label: "Trang Chủ", tab: "home" as const },
    { number: "02", label: "Bộ Sưu Tập Gạch", tab: "collections" as const },
    { number: "03", label: "Dự Án Đã Thực Hiện", tab: "projects" as const },
    { number: "04", label: "Về Chúng Tôi", tab: "about" as const },
  ];

  return (
    <>
      {/* LUXURY EDITORIAL HEADER BAR (~70px Height) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F4F1EC]/90 backdrop-blur-md border-b border-[#E2DDD5] py-3.5 shadow-xs"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          {/* Top Left: Large Elegant Logo */}
          <button
            onClick={() => setActiveTab("home")}
            data-cursor="hover"
            className="flex items-center gap-3 text-left group"
          >
            <motion.div
              animate={{ scale: isScrolled ? 0.92 : 1 }}
              transition={{ duration: 0.3 }}
              className="h-10 w-10 rounded-full border border-[#9A7B4F] flex items-center justify-center text-[#9A7B4F] font-heading font-normal text-xl group-hover:border-[#9A7B4F] group-hover:bg-[#9A7B4F]/10 transition-colors"
            >
              S
            </motion.div>
            <div>
              <span className="font-heading font-semibold text-2xl tracking-wider text-[#1C1A17] block leading-none">
                STONA <span className="text-[#9A7B4F] font-normal italic">SLAB</span>
              </span>
              <span className="text-[9px] text-[#8B8378] font-sans tracking-[0.25em] uppercase font-bold">
                Stone Gallery & Surfaces
              </span>
            </div>
          </button>

          {/* Top Right: Primary CTA + Minimal Menu Icon (NO HORIZONTAL NAV LINKS!) */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onBookShowroom}
              data-cursor="hover"
              className="bg-transparent hover:bg-[#9A7B4F] text-[#9A7B4F] hover:text-white border border-[#9A7B4F] font-bold rounded-full text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 transition-all shadow-none"
            >
              Đặt Lịch Showroom
            </Button>

            {/* Minimal Menu Icon Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-cursor="hover"
              data-cursor-text={isMenuOpen ? "CLOSE" : "MENU"}
              className="h-11 w-11 rounded-full border border-[#9A7B4F]/40 hover:border-[#9A7B4F] flex items-center justify-center text-[#1C1A17] hover:text-[#9A7B4F] transition-all hover:scale-105"
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-[#9A7B4F]" />
                ) : (
                  <div className="space-y-1.5 w-5">
                    <span className="block h-0.5 w-5 bg-[#1C1A17] hover:bg-[#9A7B4F] transition-colors" />
                    <span className="block h-0.5 w-3.5 ml-auto bg-[#9A7B4F] transition-colors" />
                  </div>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN EDITORIAL OVERLAY MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#111111] text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-radial-at-c from-[#2A2724] via-[#111111] to-[#111111] opacity-70 pointer-events-none" />

            {/* Overlay Header Bar */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
              <span className="font-heading font-normal text-2xl tracking-wider text-white">
                STONA <span className="text-[#9A7B4F] italic">SLAB</span>
              </span>

              <button
                onClick={() => setIsMenuOpen(false)}
                data-cursor="hover"
                className="h-12 w-12 rounded-full border border-[#9A7B4F]/40 flex items-center justify-center text-white hover:text-[#9A7B4F] hover:border-[#9A7B4F] transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Fullscreen Menu Main Links */}
            <div className="relative z-10 max-w-5xl mx-auto w-full py-12 flex flex-col items-start justify-center space-y-6 sm:space-y-8">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.tab}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group w-full"
                >
                  <button
                    onClick={() => handleNavClick(item.tab)}
                    data-cursor="hover"
                    data-cursor-text="OPEN"
                    className="flex items-baseline gap-4 sm:gap-8 text-left w-full"
                  >
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#9A7B4F] tracking-widest">
                      {item.number}
                    </span>
                    <span className="font-heading text-4xl sm:text-7xl lg:text-8xl font-normal text-slate-200 group-hover:text-white group-hover:translate-x-3 transition-all duration-500 relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#9A7B4F] group-hover:w-full transition-all duration-500" />
                    </span>
                  </button>
                </motion.div>
              ))}

              {/* 5th CTA Item in Fullscreen Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + menuItems.length * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-6 border-t border-slate-800 w-full"
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookShowroom();
                  }}
                  data-cursor="hover"
                  className="flex items-center gap-3 text-sm font-bold text-[#9A7B4F] hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Đặt lịch tham quan Showroom trực tiếp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>

            {/* Overlay Footer Info */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 border-t border-slate-900 pt-6 gap-4">
              <p>Showroom TP.HCM: 204 Nguyễn Văn Trỗi, Q. Phú Nhuận</p>
              <p className="font-mono text-[#9A7B4F]">Hotline: 1800 6868</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
