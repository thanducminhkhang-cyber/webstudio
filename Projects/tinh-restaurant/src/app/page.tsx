import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { TastingMenu } from "@/components/TastingMenu";
import { Atmosphere } from "@/components/Atmosphere";
import { ChefSection } from "@/components/ChefSection";
import { ReservationSection } from "@/components/ReservationSection";
import { Footer } from "@/components/Footer";
import { EggshellDivider } from "@/components/EggshellDivider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#14100D] text-[#EDE6D8]">
      {/* Navigation Header */}
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        <EggshellDivider />

        {/* Philosophy Section */}
        <Philosophy />

        <EggshellDivider />

        {/* Tasting Menu Section */}
        <TastingMenu />

        <EggshellDivider />

        {/* Atmosphere Section */}
        <Atmosphere />

        <EggshellDivider />

        {/* Chef Section */}
        <ChefSection />

        <EggshellDivider />

        {/* Reservation Section */}
        <ReservationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
