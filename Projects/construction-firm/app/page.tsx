"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { ThemeProvider } from "../components/ThemeProvider";
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
    <ThemeProvider>
      <div className="relative min-h-screen font-sans selection:bg-[#C9A227]/30 selection:text-[#0D1321]">
        {/* Toast Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0D1321] text-white px-6 py-4 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#C9A227]">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#C9A227]" />
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

          {/* 2. COMPANY INTRO (#about) */}
          <CompanyIntro />

          {/* 3. WHY CHOOSE US (#why-us + CTA 1) */}
          <WhyChooseUs onOpenConsultation={() => setIsContactOpen(true)} />

          {/* 4. FEATURED ICONIC MEGA PROJECTS (#projects + CTA 2) */}
          <ProjectShowcase onOpenConsultation={() => setIsContactOpen(true)} />

          {/* 5. SERVICES (#services) */}
          <ServicesSection />

          {/* 6. PROCESS TIMELINE (#timeline) */}
          <ProcessTimeline />

          {/* 7. NUMBERS COUNTER */}
          <NumbersCounter />

          {/* 8. CLIENT LOGOS (#clients) */}
          <ClientLogos />

          {/* 9. TESTIMONIALS */}
          <Testimonials />

          {/* 10. AWARDS & CERTIFICATIONS (#awards) */}
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

        {/* 14. FOOTER (#contact + CTA 3) */}
        <Footer onOpenConsultation={() => setIsContactOpen(true)} />
      </div>
    </ThemeProvider>
  );
}
