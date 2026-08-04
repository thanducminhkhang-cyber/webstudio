"use client";

import React, { useState } from "react";
import { CheckCircle2, MessageSquareText } from "lucide-react";
import { Button } from "@wsos/ui/components/button";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CompanyIntro from "../components/CompanyIntro";
import ProjectShowcase from "../components/ProjectShowcase";
import ServicesSection from "../components/ServicesSection";
import StatsAndPartners from "../components/StatsAndPartners";
import TestimonialsAndAwards from "../components/TestimonialsAndAwards";
import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";

export default function ConstructionHomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#0F172A] font-sans text-white selection:bg-[#D4A017]/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#1E293B] text-white px-6 py-4 font-medium shadow-2xl text-sm border border-[#3B82F6] animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#3B82F6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar onOpenConsultation={() => setIsContactOpen(true)} />

      {/* Main 7 Sections */}
      <main>
        {/* SECTION 1: HERO */}
        <HeroSection
          onStartProject={() => setIsContactOpen(true)}
          onWatchPortfolio={handleScrollToProjects}
        />

        {/* SECTION 2: GIỚI THIỆU NĂNG LỰC */}
        <CompanyIntro />

        {/* SECTION 3: DỰ ÁN TIÊU BIỂU */}
        <ProjectShowcase onOpenConsultation={() => setIsContactOpen(true)} />

        {/* SECTION 4: DỊCH VỤ CHÍNH (Nền navy nhạt #1E293B đồng bộ) */}
        <ServicesSection />

        {/* SECTION 5: SỐ LIỆU + ĐỐI TÁC (Nền #0F172A) */}
        <StatsAndPartners />

        {/* SECTION 6: ĐÁNH GIÁ ĐỐI TÁC + GIẢI THƯỞNG (Nền #1E293B) */}
        <TestimonialsAndAwards />
      </main>

      {/* Project Consultation Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      {/* Sticky Floating CTA Button (FB Ads Lead-Gen Optimization) */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsContactOpen(true)}
          className="bg-[#D4A017] hover:bg-[#B8890F] text-[#0F172A] font-extrabold rounded-full text-xs sm:text-sm tracking-wider uppercase px-5 py-3.5 shadow-[0_8px_30px_rgba(212,160,23,0.4)] border border-[#0F172A] flex items-center gap-2.5 transition-all hover:scale-105"
        >
          <MessageSquareText className="h-4 w-4 shrink-0 text-[#0F172A]" />
          <span>NHẬN BÁO GIÁ MIỄN PHÍ</span>
        </Button>
      </div>

      {/* SECTION 7: CTA CUỐI + FOOTER */}
      <Footer onOpenConsultation={() => setIsContactOpen(true)} />
    </div>
  );
}
