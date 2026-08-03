"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ShieldCheck, HardHat, PhoneCall } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#0B0F19]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-xl bg-[#F4B942] text-[#0B0F19] flex items-center justify-center font-heading font-extrabold text-2xl shadow-[0_0_20px_rgba(244,185,66,0.5)] group-hover:scale-105 transition-transform">
            V
          </div>
          <div>
            <span className="font-heading font-extrabold text-2xl text-white tracking-wider block leading-none">
              VANGUARD <span className="text-[#F4B942]">CONSTRUCT</span>
            </span>
            <span className="text-[9px] text-[#F4B942] font-mono tracking-[0.25em] uppercase font-bold">
              Engineering & Mega Infrastructure
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">
          <a href="#about" className="hover:text-[#F4B942] transition-colors">Về Chúng Tôi</a>
          <a href="#projects" className="hover:text-[#F4B942] transition-colors">Dự Án Biểu Tượng</a>
          <a href="#services" className="hover:text-[#F4B942] transition-colors">Lĩnh Vực Hoạt Động</a>
          <a href="#timeline" className="hover:text-[#F4B942] transition-colors">Quy Trình EPC</a>
          <a href="#awards" className="hover:text-[#F4B942] transition-colors">Chứng Nhận</a>
        </nav>

        {/* Header Action Button */}
        <div className="flex items-center gap-4">
          <Button
            onClick={onOpenConsultation}
            className="bg-[#F4B942] hover:bg-[#e0a430] text-[#0B0F19] font-extrabold rounded-full text-xs tracking-[0.15em] uppercase px-6 py-3 shadow-[0_0_20px_rgba(244,185,66,0.4)] border-none transition-all hover:scale-105"
          >
            Liên Hệ Báo Giá Dự Án
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-white hover:text-[#F4B942]"
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0F19] border-b border-white/10 px-6 py-6 space-y-4 font-bold text-xs uppercase tracking-widest text-slate-200"
          >
            <a href="#about" onClick={() => setIsMobileOpen(false)} className="block py-2 hover:text-[#F4B942]">Về Chúng Tôi</a>
            <a href="#projects" onClick={() => setIsMobileOpen(false)} className="block py-2 hover:text-[#F4B942]">Dự Án Biểu Tượng</a>
            <a href="#services" onClick={() => setIsMobileOpen(false)} className="block py-2 hover:text-[#F4B942]">Lĩnh Vực Hoạt Động</a>
            <a href="#timeline" onClick={() => setIsMobileOpen(false)} className="block py-2 hover:text-[#F4B942]">Quy Trình EPC</a>
            <a href="#awards" onClick={() => setIsMobileOpen(false)} className="block py-2 hover:text-[#F4B942]">Chứng Nhận</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
