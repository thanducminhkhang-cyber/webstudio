"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CompanyIntro from "../components/CompanyIntro";
import WhyChooseUs from "../components/WhyChooseUs";
import ProjectShowcase from "../components/ProjectShowcase";
import ServicesSection from "../components/ServicesSection";
import ProcessTimeline from "../components/ProcessTimeline";
import NumbersCounter from "../components/NumbersCounter";
import ClientLogos from "../components/ClientLogos";
import Testimonials from "../components/Testimonials";
import AwardsCertifications from "../components/AwardsCertifications";
import TeamSection from "../components/TeamSection";
import LatestNews from "../components/LatestNews";
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
    <div className="relative min-h-screen bg-[#F7F8FA] text-[#111111] font-sans selection:bg-[#F4B942]/30 selection:text-[#0B0F19]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0B0F19] text-white px-6 py-4 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#F4B942]">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F4B942]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sticky Header Navbar */}
      <Navbar onOpenConsultation={() => setIsContactOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* 1. HERO SECTION */}
        <HeroSection
          onStartProject={() => setIsContactOpen(true)}
          onWatchPortfolio={handleScrollToProjects}
        />

        {/* 2. COMPANY INTRO */}
        <CompanyIntro />

        {/* 3. WHY CHOOSE US */}
        <WhyChooseUs />

        {/* 4. FEATURED ICONIC MEGA PROJECTS */}
        <ProjectShowcase />

        {/* 5. SERVICES */}
        <ServicesSection />

        {/* 6. PROCESS TIMELINE */}
        <ProcessTimeline />

        {/* 7. NUMBERS COUNTER */}
        <NumbersCounter />

        {/* 8. CLIENT LOGOS */}
        <ClientLogos />

        {/* 9. TESTIMONIALS */}
        <Testimonials />

        {/* 10. AWARDS & CERTIFICATIONS */}
        <AwardsCertifications />

        {/* 11. EXECUTIVE TEAM */}
        <TeamSection />

        {/* 12. LATEST NEWS */}
        <LatestNews />
      </main>

      {/* 13. PROJECT CONSULTATION MODAL */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onSubmitSuccess={(msg) => showToast(msg)}
      />

      {/* 14. FOOTER */}
      <Footer />
    </div>
  );
}
