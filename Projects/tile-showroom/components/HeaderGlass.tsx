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
    { number: "01", label: "TRANG CHỦ", tab: "home" as const },
    { number: "02", label: "BỘ SƯU TẬP GẠCH", tab: "collections" as const },
    { number: "03", label: "DỰ ÁN ĐÃ THỰC HIỆN", tab: "projects" as const },
    { number: "04", label: "VỀ CHÚNG TÔI", tab: "about" as const },
  ];

  return (
    <>
      {/* LUXURY MODERN ARCHITECTURAL HEADER BAR (~70px Height) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-[#F6F5F2]/90 backdrop-blur-md border-b border-[#E2DED6] py-3.5 shadow-xs"
            : "bg-transparent border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          {/* Top Left: Modern Sleek Logo */}
          <button
            onClick={() => setActiveTab("home")}
            data-cursor="hover"
            className="flex items-center gap-3 text-left group"
          >
            <motion.div
              animate={{ scale: isScrolled ? 0.92 : 1 }}
              transition={{ duration: 0.3 }}
              className="h-10 w-10 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880] font-heading font-extrabold text-xl group-hover:border-[#C5A880] group-hover:bg-[#C5A880]/10 transition-colors"
            >
              S
            </motion.div>
            <div>
              <span className="font-heading font-extrabold text-2xl tracking-wider text-[#121110] block leading-none uppercase">
                STONA <span className="text-[#C5A880] font-normal">SLAB</span>
              </span>
              <span className="text-[9px] text-[#78736A] font-mono tracking-[0.25em] uppercase font-bold">
                SURFACES & ARCHITECTURE
              </span>
            </div>
          </button>

          {/* Top Right: Primary CTA + Minimal Menu Icon */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onBookShowroom}
              data-cursor="hover"
              className="bg-transparent hover:bg-[#C5A880] text-[#C5A880] hover:text-[#121110] border border-[#C5A880] font-extrabold rounded-full text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 transition-all shadow-none"
            >
              Đặt Lịch Showroom
            </Button>

            {/* Minimal Menu Icon Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-cursor="hover"
              data-cursor-text={isMenuOpen ? "CLOSE" : "MENU"}
              className="h-11 w-11 rounded-full border border-[#C5A880]/40 hover:border-[#C5A880] flex items-center justify-center text-[#121110] hover:text-[#C5A880] transition-all hover:scale-105"
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-[#C5A880]" />
                ) : (
                  <div className="space-y-1.5 w-5">
                    <span className="block h-0.5 w-5 bg-[#121110] hover:bg-[#C5A880] transition-colors" />
                    <span className="block h-0.5 w-3.5 ml-auto bg-[#C5A880] transition-colors" />
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
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-[#0D0D0C] text-white flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Background Texture & Gradient */}
            <div className="absolute inset-0 bg-radial-at-c from-[#1D1B18] via-[#0D0D0C] to-[#0D0D0C] opacity-80 pointer-events-none" />

            {/* Overlay Header Bar */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white uppercase">
                STONA <span className="text-[#C5A880]">SLAB</span>
              </span>

              <button
                onClick={() => setIsMenuOpen(false)}
                data-cursor="hover"
                className="h-12 w-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center text-white hover:text-[#C5A880] hover:border-[#C5A880] transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Fullscreen Menu Main Links (Modern High-Tech Sans) */}
            <div className="relative z-10 max-w-5xl mx-auto w-full py-12 flex flex-col items-start justify-center space-y-6 sm:space-y-8">
              {menuItems.map((item, idx) => (
                <motion.div
                  key={item.tab}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 + idx * 0.05,
                    ease: "easeOut",
                  }}
                  className="group w-full"
                >
                  <button
                    onClick={() => handleNavClick(item.tab)}
                    data-cursor="hover"
                    data-cursor-text="OPEN"
                    className="flex items-baseline gap-4 sm:gap-8 text-left w-full"
                  >
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#C5A880] tracking-widest">
                      {item.number}
                    </span>
                    <span className="font-heading text-4xl sm:text-7xl lg:text-8xl font-bold uppercase text-slate-200 group-hover:text-[#C5A880] group-hover:translate-x-4 transition-all duration-400 relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#C5A880] group-hover:w-full transition-all duration-400" />
                    </span>
                  </button>
                </motion.div>
              ))}

              {/* 5th CTA Item in Fullscreen Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + menuItems.length * 0.05,
                  ease: "easeOut",
                }}
                className="pt-6 border-t border-slate-800 w-full"
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onBookShowroom();
                  }}
                  data-cursor="hover"
                  className="flex items-center gap-3 text-xs sm:text-sm font-extrabold text-[#C5A880] hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>ĐẶT LỊCH THAM QUAN SHOWROOM TRỰC TIẾP</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            </div>

            {/* Overlay Footer Info */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 border-t border-slate-900 pt-6 gap-4">
              <p>Showroom TP.HCM: 204 Nguyễn Văn Trỗi, Q. Phú Nhuận</p>
              <p className="font-mono text-[#C5A880] font-bold">Hotline: 1800 6868</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
