"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Calendar,
  Building2,
  ShieldCheck,
  Award,
  X,
  FileText,
  Compass,
  ArrowRight,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

// Imports from @wsos/ui blocks & Custom Components
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { Marquee } from "@wsos/ui/blocks/marquee";

import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import HeaderGlass from "../components/HeaderGlass";
import HeroCinematic from "../components/HeroCinematic";
import LuxuryProductCard from "../components/LuxuryProductCard";

// New Architectural Editorial Magazine Components (CTO Redesign)
import EditorialManifesto from "../components/EditorialManifesto";
import FlagshipSlabSpotlight from "../components/FlagshipSlabSpotlight";
import ArchitecturalHotspots from "../components/ArchitecturalHotspots";
import MagazineProjectStories from "../components/MagazineProjectStories";

export interface TileProduct {
  id: string;
  code: string;
  title: string;
  series: "Marble Series" | "Stone Series" | "Wood-look" | "Concrete" | "Terrazzo" | "Mosaic";
  size: string;
  finish: string;
  thickness: string;
  origin: string;
  antiSlip?: string;
  absorption?: string;
  application: string;
  textureImage: string;
  roomImage: string;
  gallery: string[];
  badge?: string;
  isBigSlab?: boolean;
}

export const TILE_PRODUCTS: TileProduct[] = [
  {
    id: "t1",
    code: "ST-901",
    title: "Calacatta Gold Italian Slab",
    series: "Marble Series",
    size: "120x240 cm",
    finish: "Bóng kính (Polished)",
    thickness: "9 mm",
    origin: "Ý (Italy)",
    antiSlip: "R9",
    absorption: "< 0.05% (Chống thấm tuyệt đối)",
    application: "Lát sàn phòng khách biệt thự, ốp tường đại sảnh, vách tivi penthouse",
    textureImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Big Slab 120x240",
    isBigSlab: true,
  },
  {
    id: "t2",
    code: "ST-902",
    title: "Statuario Pure White Marble",
    series: "Marble Series",
    size: "80x160 cm",
    finish: "Bóng kính (Polished)",
    thickness: "9 mm",
    origin: "Tây Ban Nha",
    antiSlip: "R9",
    absorption: "< 0.1%",
    application: "Ốp tường phòng tắm sang trọng, lát sàn căn hộ cao cấp",
    textureImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Nhập Khẩu Ý",
  },
  {
    id: "t3",
    code: "ST-903",
    title: "Nero Marquina Black Slab",
    series: "Marble Series",
    size: "120x240 cm",
    finish: "Bóng kính (Polished)",
    thickness: "12 mm",
    origin: "Ý (Italy)",
    antiSlip: "R9",
    absorption: "< 0.05%",
    application: "Mặt bàn đảo bếp, vách trang trí quầy bar, phòng tắm master",
    textureImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Big Slab 120x240",
    isBigSlab: true,
  },
  {
    id: "t4",
    code: "ST-904",
    title: "Travertine Beige Stone",
    series: "Stone Series",
    size: "60x120 cm",
    finish: "Mờ nhám (Honed)",
    thickness: "10 mm",
    origin: "Tây Ban Nha",
    antiSlip: "R10",
    absorption: "< 0.2%",
    application: "Lát sàn biệt thự sân vườn, ốp tường phòng khách phong cách Wabi-sabi",
    textureImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t5",
    code: "ST-905",
    title: "Basalt Grey Outdoor",
    series: "Stone Series",
    size: "80x80 cm",
    finish: "Nhám R11 (Structured Anti-slip)",
    thickness: "20 mm",
    origin: "Ý (Italy)",
    antiSlip: "R11 (Chống trượt cao)",
    absorption: "< 0.1%",
    application: "Lát lối đi sân vườn, hồ bơi, mặt tiền toà nhà thương mại",
    textureImage: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1615971677499-5467cbab01c0?q=80&w=800&auto=format&fit=crop"],
    badge: "Độ Dày 20mm Extra",
  },
  {
    id: "t6",
    code: "ST-906",
    title: "Oak Natural Wood Plank",
    series: "Wood-look",
    size: "20x120 cm",
    finish: "Vân gỗ tự nhiên (Matt Wood)",
    thickness: "9 mm",
    origin: "Tây Ban Nha",
    antiSlip: "R10",
    absorption: "< 0.3%",
    application: "Lát sàn phòng ngủ, phòng làm việc, quán cafe phong cách Nordic",
    textureImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t7",
    code: "ST-907",
    title: "Walnut Dark Brown Wood",
    series: "Wood-look",
    size: "15x90 cm",
    finish: "Vân gỗ nổi (Satin Wood)",
    thickness: "9.5 mm",
    origin: "Việt Nam Premium",
    antiSlip: "R9",
    application: "Ốp trần gỗ, lát sàn căn hộ chung cư cao cấp",
    textureImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t8",
    code: "ST-908",
    title: "Cement Industrial Grey",
    series: "Concrete",
    size: "60x120 cm",
    finish: "Mờ mịn (Soft Matt)",
    thickness: "9 mm",
    origin: "Ý (Italy)",
    antiSlip: "R10",
    application: "Sàn văn phòng hiện đại, showroom thời trang, căn hộ phong cách Loft",
    textureImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t9",
    code: "ST-909",
    title: "Urban Ash Concrete Slab",
    series: "Concrete",
    size: "120x240 cm",
    finish: "Mờ nhám (Rough Concrete)",
    thickness: "12 mm",
    origin: "Tây Ban Nha",
    antiSlip: "R10",
    application: "Ốp mặt tiền toà nhà, vách thang máy, sảnh chờ khách sạn 5 sao",
    textureImage: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop"],
    badge: "Big Slab 120x240",
    isBigSlab: true,
  },
  {
    id: "t10",
    code: "ST-910",
    title: "Venetian Mix Terrazzo",
    series: "Terrazzo",
    size: "60x60 cm",
    finish: "Bóng mờ (Lappato)",
    thickness: "10 mm",
    origin: "Ý (Italy)",
    antiSlip: "R9",
    application: "Quầy lễ tân, sàn nhà hàng, phòng tắm phong cách Retro Modern",
    textureImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t11",
    code: "ST-911",
    title: "Confetti White Terrazzo",
    series: "Terrazzo",
    size: "80x80 cm",
    finish: "Bóng kính (Polished)",
    thickness: "9.5 mm",
    origin: "Tây Ban Nha",
    antiSlip: "R9",
    application: "Lát sàn quán cafe, showroom mỹ phẩm, shop thời trang boutique",
    textureImage: "https://images.unsplash.com/photo-1578898835025-a13f272a5061?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1578898835025-a13f272a5061?q=80&w=800&auto=format&fit=crop"],
  },
  {
    id: "t12",
    code: "ST-912",
    title: "Hexagon White Mosaic",
    series: "Mosaic",
    size: "30x30 cm (Chip 5x5)",
    finish: "Bóng (Glossy)",
    thickness: "6 mm",
    origin: "Việt Nam Export",
    application: "Ốp trang trí bếp, tường điểm nhấn phòng tắm, quầy bar",
    textureImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    roomImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    gallery: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"],
  },
];

export default function StoneGalleryHome() {
  const [activeTab, setActiveTab] = useState<"home" | "collections" | "detail" | "projects" | "about">("home");
  const [selectedProduct, setSelectedProduct] = useState<TileProduct>(TILE_PRODUCTS[0]);
  const [seriesFilter, setSeriesFilter] = useState<string>("all");

  // Modals & Lightbox
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isShowroomModalOpen, setIsShowroomModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formQuote, setFormQuote] = useState({ name: "", phone: "", area: "", productCode: "" });
  const [formShowroom, setFormShowroom] = useState({ name: "", phone: "", date: "", time: "09:00" });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuote.name || !formQuote.phone) return;
    setIsQuoteModalOpen(false);
    showToast("🎉 Cảm ơn bạn! Đã nhận yêu cầu báo giá. Chuyên viên tư vấn sẽ liên hệ lại trong vòng 24h.");
    setFormQuote({ name: "", phone: "", area: "", productCode: "" });
  };

  const handleShowroomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formShowroom.name || !formShowroom.phone) return;
    setIsShowroomModalOpen(false);
    showToast("🎉 Đã đặt lịch hẹn tham quan Showroom thành công! Nhân viên sẽ đón tiếp bạn theo giờ đã hẹn.");
    setFormShowroom({ name: "", phone: "", date: "", time: "09:00" });
  };

  const openProductDetail = (p: TileProduct) => {
    setSelectedProduct(p);
    setActiveTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts =
    seriesFilter === "all"
      ? TILE_PRODUCTS
      : TILE_PRODUCTS.filter((p) => p.series === seriesFilter);

  return (
    <div className="relative min-h-screen bg-[#F4F1EC] text-[#1C1A17] font-sans selection:bg-[#9A7B4F]/20 selection:text-[#9A7B4F]">
      {/* Desktop Custom Circle Cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0D0D0C] text-white px-6 py-4 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#C5A880]/40">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#2A2724]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-[#9A7B4F]/30">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#2A2724]/80 text-white hover:bg-red-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <Image src={lightboxImage} alt="Enlarged View" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* LUXURY EDITORIAL FULLSCREEN OVERLAY HEADER */}
      <HeaderGlass
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onBookShowroom={() => setIsShowroomModalOpen(true)}
      />

      {/* VIEW 1: HOME (CTO REDESIGN ARCHITECTURAL MAGAZINE RHYTHM) */}
      {activeTab === "home" && (
        <main>
          {/* WOW 1: HERO CINEMATIC (KEN BURNS ZOOM & OVERLAPPING SERIF TYPOGRAPHY) */}
          <HeroCinematic
            onExplore={() => setActiveTab("collections")}
            onBookShowroom={() => setIsShowroomModalOpen(true)}
          />

          {/* TRUST MARQUEE — SILENT SATIN ALABASTER */}
          <section className="bg-[#F6F5F2] text-[#121110] py-6 border-y border-[#E2DED6] overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-2">
              <p className="text-center text-[10px] text-[#78736A] font-mono uppercase tracking-[0.25em] font-bold">
                TẬP ĐOÀN ĐỐI TÁC GẠCH QUỐC TẾ NHẬP KHẨU CHÍNH NGẠCH
              </p>
              <Marquee pauseOnHover className="[--duration:30s]">
                <span className="mx-10 font-heading font-bold text-lg text-[#78736A] tracking-[0.15em]">MARAZZI ITALY</span>
                <span className="mx-10 font-heading font-bold text-lg text-[#C5A880] tracking-[0.15em]">PORCELANOSA SPAIN</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#78736A] tracking-[0.15em]">FLORIM CERAMICHE</span>
                <span className="mx-10 font-heading font-bold text-lg text-[#C5A880] tracking-[0.15em]">MIRAGE SURFACES</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#78736A] tracking-[0.15em]">LEA CERAMICHE</span>
              </Marquee>
            </div>
          </section>

          {/* WOW 2: EDITORIAL MANIFESTO (FLOATING QUOTE & OVERSIZED WATERMARK) */}
          <EditorialManifesto />

          {/* WOW 3: FLAGSHIP SLAB SPOTLIGHT (ASYMMETRIC UNCOVER & IMAGE BREAKING OUT OF GRID) */}
          <FlagshipSlabSpotlight
            products={TILE_PRODUCTS}
            onSelectProduct={openProductDetail}
            onOpenLightbox={(img) => setLightboxImage(img)}
          />

          {/* WOW 4: ARCHITECTURAL PRECISION & BLUEPRINT HOTSPOTS */}
          <ArchitecturalHotspots />

          {/* WOW 5: MAGAZINE PROJECT STORIES (OVERSIZED NUMBERS OVERLAPPING VILLA PHOTOS) */}
          <MagazineProjectStories />

          {/* NUMBERS CREDIBILITY BAR */}
          <section className="py-20 px-4 sm:px-6 bg-[#F6F5F2] border-y border-[#E2DED6]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#E2DED6]/60">
              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-bold text-[#C5A880]">
                  <NumberTicker value={512} />+
                </h3>
                <p className="text-[11px] text-[#78736A] font-mono font-bold uppercase tracking-[0.15em]">Mẫu Gạch Nhập Khẩu</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-bold text-[#C5A880]">
                  <NumberTicker value={1000} />+
                </h3>
                <p className="text-[11px] text-[#78736A] font-mono font-bold uppercase tracking-[0.15em]">Công Trình Đã Phủ</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-bold text-[#C5A880]">
                  <NumberTicker value={15} />+
                </h3>
                <p className="text-[11px] text-[#78736A] font-mono font-bold uppercase tracking-[0.15em]">Năm Uy Tín Ngành Gạch</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-bold text-[#C5A880]">
                  <NumberTicker value={98} />%
                </h3>
                <p className="text-[11px] text-[#78736A] font-mono font-bold uppercase tracking-[0.15em]">Hài Lòng Tuyệt Đối</p>
              </div>
            </div>
          </section>

          {/* WOW 6: FINAL ELEGANT INVITATION (OBSIDIAN DARK BACKGROUND) */}
          <section className="py-28 px-4 sm:px-6 bg-[#0D0D0C] text-white text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="text-[11px] text-[#C5A880] font-mono font-bold tracking-[0.25em] uppercase">
                EXCLUSIVITY & CONSULTATION
              </span>

              <h2 className="font-heading text-3xl sm:text-6xl font-bold uppercase leading-tight text-white">
                Trải Nghiệm Trực Tiếp Tại Showroom Stona
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
                Đặt lịch hẹn riêng với chuyên viên tư vấn để trải nghiệm thực tế bề mặt đá và nhận tư vấn phối cảnh 3D cho công trình của bạn.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
                  data-cursor="hover"
                  className="bg-[#C5A880] hover:bg-[#b0926a] text-[#0D0D0C] font-extrabold rounded-full h-12 px-8 text-xs tracking-[0.15em] uppercase border-none shadow-[0_0_25px_rgba(197,168,128,0.4)] transition-transform hover:scale-105"
                >
                  ĐẶT LỊCH HẸN SHOWROOM
                </Button>

                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  data-cursor="hover"
                  variant="outline"
                  className="border border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#0D0D0C] font-extrabold rounded-full h-12 px-8 text-xs tracking-[0.15em] uppercase transition-all"
                >
                  NHẬN BÁO GIÁ M²
                </Button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: FULL CATALOG PAGE */}
      {activeTab === "collections" && (
        <main className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">
              FULL CATALOG
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#1C1A17]">
              Tất Cả Mẫu Gạch Men & Big Slab
            </h1>
            <p className="text-[#8B8378] max-w-xl mx-auto text-xs sm:text-sm">
              Danh mục 12+ bộ sưu tập gạch men cao cấp và đá khổ lớn nhập khẩu Châu Âu.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSeriesFilter("all")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "all" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Tất Cả (12)
            </button>
            <button
              onClick={() => setSeriesFilter("Marble Series")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "Marble Series" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Marble Series
            </button>
            <button
              onClick={() => setSeriesFilter("Stone Series")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "Stone Series" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Stone Series
            </button>
            <button
              onClick={() => setSeriesFilter("Wood-look")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "Wood-look" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Wood-look
            </button>
            <button
              onClick={() => setSeriesFilter("Concrete")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "Concrete" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Concrete
            </button>
            <button
              onClick={() => setSeriesFilter("Terrazzo")}
              className={`rounded-full text-xs font-bold px-5 py-2 transition-all ${seriesFilter === "Terrazzo" ? "bg-[#9A7B4F] text-white" : "border border-[#E2DDD5] text-[#1C1A17] bg-white"}`}
            >
              Terrazzo
            </button>
          </div>

          {/* Products Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-4">
            {filteredProducts.map((product) => (
              <LuxuryProductCard
                key={product.id}
                product={product}
                onClick={() => openProductDetail(product)}
              />
            ))}
          </div>
        </main>
      )}

      {/* VIEW 3: PRODUCT DETAIL PAGE */}
      {activeTab === "detail" && selectedProduct && (
        <main className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Gallery Left Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E2DDD5] bg-white group cursor-pointer" onClick={() => setLightboxImage(selectedProduct.textureImage)}>
                <Image src={selectedProduct.textureImage} alt={selectedProduct.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                <button className="absolute bottom-4 right-4 p-3 rounded-full bg-[#2A2724]/80 text-white backdrop-blur-md">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E2DDD5] cursor-pointer" onClick={() => setLightboxImage(selectedProduct.roomImage)}>
                  <Image src={selectedProduct.roomImage} alt="Room Application" fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-[#2A2724]/80 px-2 py-0.5 rounded">Ảnh phối cảnh</span>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E2DDD5] cursor-pointer" onClick={() => setLightboxImage(selectedProduct.textureImage)}>
                  <Image src={selectedProduct.textureImage} alt="Texture" fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-[#2A2724]/80 px-2 py-0.5 rounded">Texture 4K</span>
                </div>
              </div>
            </div>

            {/* Specification Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#9A7B4F] tracking-[0.15em] uppercase block">
                  {selectedProduct.series} • Mã: {selectedProduct.code}
                </span>
                <h1 className="font-heading text-4xl font-normal text-[#1C1A17] mt-1">
                  {selectedProduct.title}
                </h1>
                <p className="text-xs text-[#9A7B4F] font-bold mt-2 uppercase tracking-[0.15em]">
                  Mức Giá: Liên Hệ Báo Giá Theo M² Dự Án
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-[0.15em] text-[#8B8378]">Thông Số Kỹ Thuật Chi Tiết</h4>
                <div className="divide-y divide-[#E2DDD5] border border-[#E2DDD5] rounded-xl overflow-hidden bg-white text-xs">
                  <div className="p-3.5 flex justify-between">
                    <span className="text-[#8B8378]">Mã sản phẩm:</span>
                    <span className="font-bold font-mono text-[#1C1A17]">{selectedProduct.code}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-[#8B8378]">Kích thước:</span>
                    <span className="font-bold text-[#1C1A17]">{selectedProduct.size}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-[#8B8378]">Bề mặt hoàn thiện:</span>
                    <span className="font-bold text-[#1C1A17]">{selectedProduct.finish}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-[#8B8378]">Độ dày:</span>
                    <span className="font-bold text-[#1C1A17]">{selectedProduct.thickness}</span>
                  </div>
                  <div className="p-3.5 flex justify-between">
                    <span className="text-[#8B8378]">Xuất xứ:</span>
                    <span className="font-bold text-[#9A7B4F]">{selectedProduct.origin}</span>
                  </div>
                  {selectedProduct.antiSlip && (
                    <div className="p-3.5 flex justify-between">
                      <span className="text-[#8B8378]">Cấp độ chống trượt:</span>
                      <span className="font-bold text-[#1C1A17]">{selectedProduct.antiSlip}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Application note */}
              <div className="p-4 bg-[#FBFAF8] rounded-xl border border-[#E2DDD5] text-xs text-[#1C1A17] space-y-1">
                <p className="font-bold text-[#1C1A17]">Khu Vực Khuyên Dùng:</p>
                <p className="text-[#8B8378]">{selectedProduct.application}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  data-cursor="hover"
                  className="flex-1 py-3.5 text-xs font-bold tracking-[0.15em] uppercase bg-[#9A7B4F] text-white rounded-full shadow-md hover:bg-[#85683F]"
                >
                  <FileText className="mr-2 h-4 w-4 inline" /> YÊU CẦU BÁO GIÁ M²
                </Button>
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
                  data-cursor="hover"
                  variant="outline"
                  className="px-6 py-3.5 border border-[#1C1A17] text-[#1C1A17] font-bold text-xs tracking-[0.15em] uppercase rounded-full hover:bg-[#1C1A17] hover:text-white"
                >
                  <Calendar className="mr-2 h-4 w-4 inline text-[#9A7B4F]" /> ĐẶT LỊCH XEM MẪU
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: PROJECTS PAGE */}
      {activeTab === "projects" && (
        <main className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">
              PORTFOLIO
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#1C1A17]">
              Dự Án Đã Cung Cấp Gạch
            </h1>
            <p className="text-[#8B8378] max-w-xl mx-auto text-xs sm:text-sm">
              Hình ảnh công trình biệt thự, penthouse và khách sạn sử dụng gạch men Stona Slab.
            </p>
          </div>

          <MagazineProjectStories />
        </main>
      )}

      {/* VIEW 5: ABOUT PAGE */}
      {activeTab === "about" && (
        <main className="py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">ABOUT STONA</span>
            <h1 className="font-heading text-4xl sm:text-5xl font-normal text-[#1C1A17]">
              Thương Hiệu Gạch Men & Đô Thị Thượng Hạng
            </h1>
            <p className="text-[#8B8378] max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
              Stona Slab tự hào là đơn vị phân phối chính ngạch các dòng gạch khổ lớn Big Slab và vật liệu kiến trúc cao cấp từ Châu Âu tại Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-[#FBFAF8] border border-[#E2DDD5] rounded-2xl text-center space-y-3">
              <Building2 className="h-8 w-8 text-[#9A7B4F] mx-auto stroke-[1.5]" />
              <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Showroom 1000m²</h3>
              <p className="text-xs text-[#8B8378] leading-relaxed">Không gian trưng bày thực tế chuẩn Châu Âu tại TP.HCM và Hà Nội.</p>
            </div>

            <div className="p-8 bg-[#FBFAF8] border border-[#E2DDD5] rounded-2xl text-center space-y-3">
              <Award className="h-8 w-8 text-[#9A7B4F] mx-auto stroke-[1.5]" />
              <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Chứng Chỉ Quốc Tế</h3>
              <p className="text-xs text-[#8B8378] leading-relaxed">Đầy đủ CO/CQ nhập khẩu chính ngạch từ Ý & Tây Ban Nha.</p>
            </div>

            <div className="p-8 bg-[#FBFAF8] border border-[#E2DDD5] rounded-2xl text-center space-y-3">
              <ShieldCheck className="h-8 w-8 text-[#9A7B4F] mx-auto stroke-[1.5]" />
              <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Bảo Hành 20 Năm</h3>
              <p className="text-xs text-[#8B8378] leading-relaxed">Cam kết độ bền bề mặt và chống thấm hoàn hảo theo thời gian.</p>
            </div>
          </div>
        </main>
      )}

      {/* MODAL 1: REQUEST QUOTE FORM */}
      {isQuoteModalOpen && (
        <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
          <DialogContent className="max-w-md bg-[#FBFAF8] rounded-3xl p-6 border border-[#E2DDD5]">
            <DialogHeader>
              <DialogTitle className="font-heading font-normal text-2xl text-[#1C1A17]">
                Yêu Cầu Báo Giá M² Dự Án
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Họ và Tên *</Label>
                <Input
                  required
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                  value={formQuote.name}
                  onChange={(e) => setFormQuote({ ...formQuote, name: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Số Điện Thoại Zalo *</Label>
                <Input
                  required
                  placeholder="Ví dụ: 0901234567"
                  value={formQuote.phone}
                  onChange={(e) => setFormQuote({ ...formQuote, phone: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Sản Phẩm Quan Tâm</Label>
                <Input
                  placeholder="Ví dụ: Calacatta Gold Slab ST-901"
                  value={formQuote.productCode || selectedProduct.title}
                  onChange={(e) => setFormQuote({ ...formQuote, productCode: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Diện Tích Ước Tính (m²)</Label>
                <Input
                  placeholder="Ví dụ: 150m²"
                  value={formQuote.area}
                  onChange={(e) => setFormQuote({ ...formQuote, area: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl"
                />
              </div>

              <DialogFooter className="pt-4 border-t border-[#E2DDD5] flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsQuoteModalOpen(false)} className="rounded-xl text-xs font-bold border-[#E2DDD5]">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#9A7B4F] text-white hover:bg-[#85683F] font-bold text-xs">
                  Gửi Yêu Cầu Báo Giá
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL 2: BOOK SHOWROOM VISIT FORM */}
      {isShowroomModalOpen && (
        <Dialog open={isShowroomModalOpen} onOpenChange={setIsShowroomModalOpen}>
          <DialogContent className="max-w-md bg-[#FBFAF8] rounded-3xl p-6 border border-[#E2DDD5]">
            <DialogHeader>
              <DialogTitle className="font-heading font-normal text-2xl text-[#1C1A17]">
                Đặt Lịch Hẹn Xem Mẫu Tại Showroom
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleShowroomSubmit} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Họ và Tên *</Label>
                <Input
                  required
                  placeholder="Ví dụ: Trần Thị Mai"
                  value={formShowroom.name}
                  onChange={(e) => setFormShowroom({ ...formShowroom, name: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-[#1C1A17]">Số Điện Thoại *</Label>
                <Input
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={formShowroom.phone}
                  onChange={(e) => setFormShowroom({ ...formShowroom, phone: e.target.value })}
                  className="text-xs bg-white border-[#E2DDD5] rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#1C1A17]">Ngày Hẹn</Label>
                  <Input
                    type="date"
                    value={formShowroom.date}
                    onChange={(e) => setFormShowroom({ ...formShowroom, date: e.target.value })}
                    className="text-xs bg-white border-[#E2DDD5] rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-[#1C1A17]">Giờ Hẹn</Label>
                  <Input
                    type="time"
                    value={formShowroom.time}
                    onChange={(e) => setFormShowroom({ ...formShowroom, time: e.target.value })}
                    className="text-xs bg-white border-[#E2DDD5] rounded-xl"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-[#E2DDD5] flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsShowroomModalOpen(false)} className="rounded-xl text-xs font-bold border-[#E2DDD5]">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#2A2724] text-white font-bold text-xs">
                  Xác Nhận Đặt Lịch
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* FOOTER */}
      <footer className="bg-[#2A2724] text-[#8B8378] py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <span className="font-heading font-medium text-2xl text-white block">
              STONA <span className="text-[#9A7B4F] italic">SLAB</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Showroom trưng bày & phân phối chính ngạch gạch men cao cấp và đá tấm khổ lớn Châu Âu.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-normal text-white text-base">Danh Mục Sản Phẩm</h4>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#9A7B4F] cursor-pointer">Marble Series Big Slab</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#9A7B4F] cursor-pointer">Stone Series Kiến Trúc</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#9A7B4F] cursor-pointer">Wood-look Vân Gỗ Tự Nhiên</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#9A7B4F] cursor-pointer">Concrete bê tông mờ</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-normal text-white text-base">Hệ Thống Showroom</h4>
            <p className="text-slate-400">Showroom TP.HCM: 204 Nguyễn Văn Trỗi, Q. Phú Nhuận</p>
            <p className="text-slate-400">Showroom Hà Nội: 88 Khuất Duy Tiến, Q. Thanh Xuân</p>
            <p className="text-slate-400">Hotline: 1800 6868 (Miễn phí)</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-normal text-white text-base">Giờ Mở Cửa Showroom</h4>
            <p className="text-slate-400">Thứ 2 - Thứ 7: 08:00 - 20:00</p>
            <p className="text-slate-400">Chủ Nhật: 09:00 - 18:00</p>
            <p className="text-[#9A7B4F] font-bold">Có chỗ đậu xe hơi rộng rãi</p>
          </div>
        </div>

        {/* FOOTER BOTTOM: VERY SMALL MUTED 12px LINK "Quản trị" */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 STONA SLAB Stone Gallery & Surfaces. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:underline hover:text-slate-300 font-mono text-[12px] text-slate-500">
              Quản trị
            </Link>
            <p className="text-[#9A7B4F] font-mono">WSOS Studio Showcase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
