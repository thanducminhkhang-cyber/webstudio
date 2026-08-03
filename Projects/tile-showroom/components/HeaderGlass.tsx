"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { Button } from "@wsos/ui/components/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

interface HeaderGlassProps {
  activeTab: "home" | "collections" | "detail" | "projects" | "about";
  setActiveTab: (tab: "home" | "collections" | "detail" | "projects" | "about") => void;
  onBookShowroom: () => void;
}

export default function HeaderGlass({ activeTab, setActiveTab, onBookShowroom }: HeaderGlassProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-[#F4F1EC]/90 backdrop-blur-md border-b border-[#E2DDD5] shadow-xs py-3"
          : "bg-transparent border-b border-[#E2DDD5]/40 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo with Subtle Scale Transition */}
        <button
          onClick={() => setActiveTab("home")}
          data-cursor="hover"
          className="flex items-center gap-3 text-left group"
        >
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
            className="h-10 w-10 rounded-full border border-[#9A7B4F] flex items-center justify-center text-[#9A7B4F] font-heading font-normal text-xl group-hover:border-[#9A7B4F] group-hover:bg-[#9A7B4F]/10 transition-colors"
          >
            S
          </motion.div>
          <div>
            <span className="font-heading font-semibold text-2xl tracking-wider text-[#1C1A17] block leading-none">
              STONA <span className="text-[#9A7B4F] font-normal italic">SLAB</span>
            </span>
            <span className="text-[10px] text-[#8B8378] font-sans tracking-[0.2em] uppercase font-semibold">
              Stone Gallery & Surfaces
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#1C1A17]">
          <button
            onClick={() => setActiveTab("home")}
            data-cursor="hover"
            className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "home" ? "text-[#9A7B4F]" : ""}`}
          >
            Trang Chủ
          </button>
          <button
            onClick={() => setActiveTab("collections")}
            data-cursor="hover"
            className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "collections" ? "text-[#9A7B4F]" : ""}`}
          >
            Bộ Sưu Tập (12+)
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            data-cursor="hover"
            className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "projects" ? "text-[#9A7B4F]" : ""}`}
          >
            Dự Án Đã Thực Hiện
          </button>
          <button
            onClick={() => setActiveTab("about")}
            data-cursor="hover"
            className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "about" ? "text-[#9A7B4F]" : ""}`}
          >
            Về Chúng Tôi
          </button>
        </nav>

        {/* Header Action CTA: Thin Bronze Border Button */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onBookShowroom}
            data-cursor="hover"
            className="bg-transparent hover:bg-[#9A7B4F] text-[#9A7B4F] hover:text-white border border-[#9A7B4F] font-bold rounded-full text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 transition-all shadow-none"
          >
            Đặt Lịch Showroom
          </Button>

          {/* Mobile Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#1C1A17]">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#F4F1EC]">
                <SheetHeader>
                  <SheetTitle className="text-left font-heading text-xl text-[#9A7B4F] italic">
                    STONA SLAB GALLERY
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8 font-bold text-[#1C1A17] text-xs tracking-[0.15em] uppercase">
                  <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#9A7B4F]">Trang Chủ</button>
                  <button onClick={() => setActiveTab("collections")} className="text-left hover:text-[#9A7B4F]">Bộ Sưu Tập</button>
                  <button onClick={() => setActiveTab("projects")} className="text-left hover:text-[#9A7B4F]">Dự Án</button>
                  <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#9A7B4F]">Về Chúng Tôi</button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
