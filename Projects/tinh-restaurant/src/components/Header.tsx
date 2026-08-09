"use client";

import React, { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Triết lý", href: "#triet-ly" },
    { name: "Thực đơn", href: "#thuc-don" },
    { name: "Không gian", href: "#khong-gian" },
    { name: "Bếp trưởng", href: "#bep-truong" },
    { name: "Đặt bàn", href: "#dat-ban" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#14100D]/95 border-b border-[#B98A45]/20 py-4 shadow-2xl backdrop-blur-sm"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Wordmark logo */}
        <a
          href="#"
          className="group flex flex-col items-start focus-visible:ring-1 focus-visible:ring-[#B98A45]"
          aria-label="Trang chủ TỊNH - Fine Dining"
        >
          <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-[#EDE6D8] group-hover:text-[#B98A45] transition-colors duration-300">
            TỊNH
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#9A9186] -mt-1 font-sans">
            FINE DINING
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#EDE6D8]/80 hover:text-[#B98A45] transition-colors duration-300 font-sans"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <a
            href="#dat-ban"
            className="inline-block px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[#EDE6D8] border border-[#B98A45] hover:bg-[#8E2C24] hover:border-[#8E2C24] hover:text-[#EDE6D8] transition-all duration-300 rounded-none focus-visible:ring-1 focus-visible:ring-[#B98A45]"
          >
            Đặt bàn
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#EDE6D8] hover:text-[#B98A45] focus-visible:ring-1 focus-visible:ring-[#B98A45]"
          aria-expanded={mobileMenuOpen}
          aria-label="Mở danh mục điều hướng"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth="1.5"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#14100D] border-b border-[#B98A45]/30 px-6 py-8 animate-fade-in">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-[#EDE6D8] hover:text-[#B98A45] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-[#B98A45]/20">
              <a
                href="#dat-ban"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-3 text-xs uppercase tracking-[0.2em] text-[#EDE6D8] border border-[#B98A45] hover:bg-[#8E2C24] hover:border-[#8E2C24] transition-colors rounded-none"
              >
                Đặt bàn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
