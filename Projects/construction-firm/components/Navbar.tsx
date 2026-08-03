"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight, ShieldCheck, HardHat, PhoneCall } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const navLinks = [
    { href: "#about", label: "Giới Thiệu" },
    { href: "#why-us", label: "Năng Lực" },
    { href: "#projects", label: "Dự Án" },
    { href: "#services", label: "Dịch Vụ" },
    { href: "#timeline", label: "Quy Trình" },
    { href: "#clients", label: "Đối Tác" },
    { href: "#contact", label: "Liên Hệ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? theme === "light"
            ? "bg-[#F8F6F1]/90 backdrop-blur-xl border-b border-[#0D1321]/10 py-4 shadow-lg"
            : "bg-[#0D1321]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
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
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-[0.15em]">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className={`transition-colors hover:text-[#C9A227] ${
                theme === "light" ? "text-[#0D1321]/80" : "text-slate-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle Switch */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full border transition-all ${
              theme === "light"
                ? "bg-white border-[#0D1321]/15 text-[#0D1321] hover:bg-slate-100"
                : "bg-white/5 border-white/15 text-[#E8C766] hover:bg-white/10"
            }`}
            title={theme === "light" ? "Chuyển sang Giao diện Tối (Dark)" : "Chuyển sang Giao diện Sáng (Light)"}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Primary Consultation CTA Button */}
          <Button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex bg-gradient-to-r from-[#C9A227] via-[#E8C766] to-[#C9A227] hover:brightness-110 text-[#0D1321] font-extrabold rounded-full text-xs tracking-[0.15em] uppercase px-6 py-3 shadow-[0_0_20px_rgba(201,162,39,0.3)] border-none transition-all hover:-translate-y-0.5"
          >
            Liên Hệ Báo Giá Dự Án
          </Button>

          {/* Mobile Hamburger Morph Icon (3 lines -> X) */}
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
            className={`fixed inset-0 top-[76px] z-40 lg:hidden flex flex-col justify-between p-8 backdrop-blur-2xl ${
              theme === "light" ? "bg-[#F8F6F1]/95 text-[#0D1321]" : "bg-[#0D1321]/95 text-white"
            }`}
          >
            <nav className="flex flex-col gap-6 pt-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="font-heading font-extrabold text-2xl uppercase tracking-wider hover:text-[#C9A227] transition-colors border-b border-white/5 pb-3"
                >
                  {link.label}
                </motion.a>
              ))}
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
