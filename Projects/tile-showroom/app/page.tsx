"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  PhoneCall,
  Calendar,
  Building2,
  ShieldCheck,
  Award,
  Search,
  Menu as MenuIcon,
  X,
  FileText,
  Compass,
  ArrowRight,
  Sparkle,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

// Imports from @wsos/ui blocks (Magic UI)
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { Marquee } from "@wsos/ui/blocks/marquee";

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

const ROOM_INSPIRATIONS = [
  { id: "r1", title: "Phòng Khách Biệt Thự Thảo Điền", category: "LIVING ROOM", tileCode: "ST-901", tileName: "Calacatta Gold Big Slab 120x240", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
  { id: "r2", title: "Phòng Tắm Master Villa Heritage", category: "BATHROOM", tileCode: "ST-902", tileName: "Statuario Pure White 80x160", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
  { id: "r3", title: "Không Gian Bếp Penthouse Quận 1", category: "KITCHEN", tileCode: "ST-903", tileName: "Nero Marquina Black Slab", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop" },
  { id: "r4", title: "Mặt Tiền Showroom Porsche HCM", category: "EXTERIOR", tileCode: "ST-909", tileName: "Urban Ash Concrete Slab", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop" },
  { id: "r5", title: "Sảnh Khách Sạn 5 Sao Hyatt", category: "HOTEL LOBBY", tileCode: "ST-901", tileName: "Calacatta Gold Italian Slab", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" },
  { id: "r6", title: "Sân Vườn Villa Phú Mỹ Hưng", category: "EXTERIOR", tileCode: "ST-905", tileName: "Basalt Grey 20mm Outdoor", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=800&auto=format&fit=crop" },
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
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#2A2724] text-white px-6 py-4 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#9A7B4F]/40">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9A7B4F]" />
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

      {/* 1. HEADER & NAV — SILENT ELEGANT SERIF & THIN BRONZE CTA (NO ADMIN LINK) */}
      <header className="sticky top-0 z-40 bg-[#F4F1EC]/90 backdrop-blur-md border-b border-[#E2DDD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-3 text-left">
            <div className="h-10 w-10 rounded-full border border-[#9A7B4F] flex items-center justify-center text-[#9A7B4F] font-heading font-normal text-xl">
              S
            </div>
            <div>
              <span className="font-heading font-semibold text-2xl tracking-wider text-[#1C1A17] block leading-none">
                STONA <span className="text-[#9A7B4F] font-normal italic">SLAB</span>
              </span>
              <span className="text-[10px] text-[#8B8378] font-sans tracking-[0.2em] uppercase font-semibold">
                Stone Gallery & Surfaces
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#1C1A17]">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "home" ? "text-[#9A7B4F]" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "collections" ? "text-[#9A7B4F]" : ""}`}
            >
              Bộ Sưu Tập (12+)
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "projects" ? "text-[#9A7B4F]" : ""}`}
            >
              Dự Án Đã Thực Hiện
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-[#9A7B4F] transition-colors ${activeTab === "about" ? "text-[#9A7B4F]" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Header Action: THIN BRONZE BORDER BUTTON (NO ADMIN LINK) */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsShowroomModalOpen(true)}
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

      {/* VIEW 1: HOME */}
      {activeTab === "home" && (
        <main>
          {/* 2. HERO SECTION — FULL-BLEED MAGAZINE COVER VISUAL */}
          <section className="relative h-[85vh] sm:h-[90vh] w-full bg-[#2A2724] overflow-hidden flex items-end">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              alt="Stona Stone Gallery Architectural Surface"
              fill
              priority
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724] via-[#2A2724]/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 w-full space-y-6">
              <BlurFade delay={0.1}>
                <span className="text-[11px] font-bold text-[#E8D0AA] uppercase tracking-[0.2em]">
                  STONE GALLERY & ARCHITECTURAL SURFACES
                </span>
              </BlurFade>

              <BlurFade delay={0.2}>
                <h1 className="font-heading text-4xl sm:text-6xl font-normal leading-[1.12] text-white max-w-3xl">
                  Vẻ Đẹp Vượt Thời Gian <br />
                  <span className="italic text-[#E8D0AA]">Cho Không Gian Sống Thượng Hạng</span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                  Bộ sưu tập đá tự nhiên & gạch khổ lớn Big Slab 120x240cm nhập khẩu chính ngạch từ Ý & Tây Ban Nha. Tối giản, kiêu sa và đắt giá.
                </p>
              </BlurFade>

              <BlurFade delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Button
                    onClick={() => setActiveTab("collections")}
                    className="bg-[#9A7B4F] hover:bg-[#85683F] text-white font-bold rounded-full text-xs tracking-[0.15em] uppercase px-8 py-3.5 shadow-lg border-none"
                  >
                    KHÁM PHÁ BỘ SƯU TẬP
                  </Button>
                  <button
                    onClick={() => setIsShowroomModalOpen(true)}
                    className="text-xs font-bold text-white hover:text-[#E8D0AA] tracking-[0.15em] uppercase flex items-center gap-2 transition-colors py-2"
                  >
                    <span>Đặt lịch tư vấn trực tiếp</span>
                    <ArrowRight className="h-4 w-4 text-[#E8D0AA]" />
                  </button>
                </div>
              </BlurFade>
            </div>
          </section>

          {/* 3. TRUST BAR — SILENT WARM STONE BACKGROUND */}
          <section className="bg-[#F4F1EC] text-[#1C1A17] py-6 border-y border-[#E2DDD5] overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-2">
              <p className="text-center text-[10px] text-[#8B8378] font-sans uppercase tracking-[0.25em] font-bold">
                TẬP ĐOÀN ĐỐI TÁC GẠCH QUỐC TẾ NHẬP KHẨU CHÍNH NGẠCH
              </p>
              <Marquee pauseOnHover className="[--duration:30s]">
                <span className="mx-10 font-heading font-medium text-lg text-[#8B8378] tracking-[0.15em]">MARAZZI ITALY</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#9A7B4F] tracking-[0.15em]">PORCELANOSA SPAIN</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#8B8378] tracking-[0.15em]">FLORIM CERAMICHE</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#9A7B4F] tracking-[0.15em]">MIRAGE SURFACES</span>
                <span className="mx-10 font-heading font-medium text-lg text-[#8B8378] tracking-[0.15em]">LEA CERAMICHE</span>
              </Marquee>
            </div>
          </section>

          {/* 4. FEATURED COLLECTIONS — EDITORIAL MAGAZINE GRID */}
          <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DDD5] pb-6">
              <div className="space-y-1">
                <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">
                  CƠ BẢN VÀ TINH TẾ
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[#1C1A17]">
                  Bộ Sưu Tập Vật Liệu Nổi Bật
                </h2>
              </div>
              <button
                onClick={() => setActiveTab("collections")}
                className="text-xs font-bold text-[#9A7B4F] hover:underline tracking-[0.15em] uppercase flex items-center gap-1"
              >
                <span>Xem Tất Cả Mẫu Gạch</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {TILE_PRODUCTS.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  className="group cursor-pointer space-y-4"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBFAF8] border border-[#E2DDD5]">
                    <Image
                      src={product.textureImage}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-[#9A7B4F]/0 group-hover:bg-[#9A7B4F]/10 transition-colors duration-500" />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-[#2A2724] text-white text-[10px] uppercase font-bold tracking-[0.15em] px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase block">
                      {product.series} • {product.size}
                    </span>
                    <h3 className="font-heading font-normal text-2xl text-[#1C1A17] group-hover:text-[#9A7B4F] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#8B8378] font-medium">
                      Xuất xứ: <b>{product.origin}</b> • Bề mặt: <b>{product.finish}</b>
                    </p>
                    <span className="text-xs font-bold text-[#9A7B4F] group-hover:underline mt-2 inline-block">
                      Khám phá bộ sưu tập →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. INSPIRATION ROOM GALLERY — CHARCOAL STONE BACKGROUND */}
          <section className="py-24 px-4 sm:px-6 bg-[#2A2724] text-white">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-2">
                <span className="text-[11px] text-[#E8D0AA] uppercase tracking-[0.2em] font-bold">
                  ARCHITECTURAL SPACES
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-normal text-white">
                  Không Gian Kiến Trúc Ứng Dụng
                </h2>
                <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm font-normal">
                  Sự kết hợp hoàn hảo giữa vật liệu đá cao cấp và ánh sáng tự nhiên trong không gian sống thực tế.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROOM_INSPIRATIONS.map((room) => (
                  <div
                    key={room.id}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-[#9A7B4F]/20 shadow-xl"
                    onClick={() => setLightboxImage(room.image)}
                  >
                    <Image src={room.image} alt={room.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A2724]/90 via-[#2A2724]/20 to-transparent p-6 flex flex-col justify-end">
                      <span className="text-[10px] text-[#E8D0AA] font-bold tracking-[0.15em] uppercase mb-1">
                        {room.category}
                      </span>
                      <h4 className="font-heading font-normal text-xl text-white">{room.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">Gạch sử dụng: <span className="font-bold text-[#E8D0AA]">{room.tileName}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. STANDARDS & ADVANTAGES — EDITORIAL HORIZONTAL LIST WITH THIN LINES */}
          <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2">
              <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">
                CRAFTSMANSHIP
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[#1C1A17]">
                Tiêu Chuẩn Đẳng Cấp Cho Công Trình
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 border-b border-[#9A7B4F]/30 pb-8">
                <div className="flex items-center gap-3 text-[#9A7B4F]">
                  <Building2 className="h-6 w-6 stroke-[1.5]" />
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Nhập Khẩu Trực Tiếp Ý & Tây Ban Nha</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
                  100% Sản phẩm được nhập khẩu chính ngạch đầy đủ chứng chỉ CO/CQ chuẩn Châu Âu. Đảm bảo bề mặt chống xước, không rạn nứt và độ bền trên 30 năm.
                </p>
              </div>

              <div className="space-y-4 border-b border-[#9A7B4F]/30 pb-8">
                <div className="flex items-center gap-3 text-[#9A7B4F]">
                  <Layers className="h-6 w-6 stroke-[1.5]" />
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Cắt Laser Không Đường Ron</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
                  Công nghệ mài cạnh chuẩn vi sai 0.1mm cho phép thi công đường mạch siêu mảnh, tạo cảm giác như một tấm đá tự nhiên nguyên khối.
                </p>
              </div>

              <div className="space-y-4 border-b border-[#9A7B4F]/30 pb-8">
                <div className="flex items-center gap-3 text-[#9A7B4F]">
                  <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Bảo Hành Bề Mặt 20 Năm</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
                  Cam kết bảo hành chính hãng độ bóng, khả năng chống thấm nước và chống bay màu trong suốt 20 năm sử dụng.
                </p>
              </div>

              <div className="space-y-4 border-b border-[#9A7B4F]/30 pb-8">
                <div className="flex items-center gap-3 text-[#9A7B4F]">
                  <Compass className="h-6 w-6 stroke-[1.5]" />
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17]">Tư Vấn Phối Cảnh 3D Miễn Phí</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed font-normal">
                  Đội ngũ kiến trúc sư tại Showroom sẽ dựng phối cảnh 3D không gian thực tế của ngôi nhà bạn giúp lựa chọn mẫu gạch chuẩn màu và tỉ lệ hoàn hảo nhất.
                </p>
              </div>
            </div>
          </section>

          {/* 7. NUMBERS & CREDIBILITY — SERIF NUMBERS ON WARM STONE */}
          <section className="py-16 px-4 sm:px-6 bg-[#F4F1EC] border-y border-[#E2DDD5]">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[#E2DDD5]/60">
              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-normal text-[#9A7B4F]">
                  <NumberTicker value={512} />+
                </h3>
                <p className="text-[11px] text-[#8B8378] font-bold uppercase tracking-[0.15em]">Mẫu Gạch Nhập Khẩu</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-normal text-[#9A7B4F]">
                  <NumberTicker value={1000} />+
                </h3>
                <p className="text-[11px] text-[#8B8378] font-bold uppercase tracking-[0.15em]">Công Trình Đã Phủ</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-normal text-[#9A7B4F]">
                  <NumberTicker value={15} />+
                </h3>
                <p className="text-[11px] text-[#8B8378] font-bold uppercase tracking-[0.15em]">Năm Uy Tín Ngành Gạch</p>
              </div>

              <div className="space-y-1 px-4">
                <h3 className="font-heading text-4xl sm:text-5xl font-normal text-[#9A7B4F]">
                  <NumberTicker value={98} />%
                </h3>
                <p className="text-[11px] text-[#8B8378] font-bold uppercase tracking-[0.15em]">Hài Lòng Tuyệt Đối</p>
              </div>
            </div>
          </section>

          {/* 8. FEATURED PROJECTS — EDITORIAL MAGAZINE LAYOUT */}
          <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-2">
              <span className="text-[11px] text-[#9A7B4F] uppercase font-bold tracking-[0.2em]">
                PORTFOLIO
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[#1C1A17]">
                Dự Án Đã Cung Cấp Gạch
              </h2>
            </div>

            <div className="space-y-16">
              {/* Project 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FBFAF8] border border-[#E2DDD5]">
                  <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" alt="Villa Thao Dien" fill className="object-cover" />
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase">BIỆT THỰ CAO CẤP • TP.HCM</span>
                  <h3 className="font-heading text-3xl font-normal text-[#1C1A17]">Biệt Thự Thảo Điền Quận 2</h3>
                  <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
                    Công trình sử dụng 100% dòng gạch Big Slab Calacatta Gold 120x240cm cho toàn bộ đại sảnh và vách tivi tầng trệt.
                  </p>
                  <p className="text-xs font-bold text-[#1C1A17]">Mẫu gạch: <span className="text-[#9A7B4F]">ST-901 Calacatta Gold Slab</span></p>
                </div>
              </div>

              {/* Project 2 (Flipped) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4 lg:order-1 order-2">
                  <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase">SHOWROOM THƯƠNG MẠI</span>
                  <h3 className="font-heading text-3xl font-normal text-[#1C1A17]">Showroom Porsche HCM</h3>
                  <p className="text-xs sm:text-sm text-[#8B8378] leading-relaxed">
                    Mặt tiền công trình được ốp tấm gạch xi măng mờ Urban Ash Big Slab 120x240cm đem lại vẻ đẹp hiện đại và sắc sảo.
                  </p>
                  <p className="text-xs font-bold text-[#1C1A17]">Mẫu gạch: <span className="text-[#9A7B4F]">ST-909 Urban Ash Concrete Slab</span></p>
                </div>
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FBFAF8] border border-[#E2DDD5] lg:order-2 order-1">
                  <Image src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop" alt="Showroom Porsche" fill className="object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* 9. FINAL CTA SECTION — CHARCOAL STONE ELEGANT INVITATION */}
          <section className="py-24 px-4 sm:px-6 bg-[#2A2724] text-white text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <span className="text-[11px] text-[#E8D0AA] font-bold tracking-[0.2em] uppercase">
                EXCLUSIVITY & CONSULTATION
              </span>

              <h2 className="font-heading text-3xl sm:text-5xl font-normal leading-tight text-white">
                Trải Nghiệm Trực Tiếp Tại Showroom Stona
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-normal leading-relaxed">
                Đặt lịch hẹn riêng với chuyên viên tư vấn để trải nghiệm thực tế bề mặt đá và nhận tư vấn phối cảnh 3D cho công trình của bạn.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
                  className="bg-[#9A7B4F] hover:bg-[#85683F] text-white font-bold rounded-full h-12 px-8 text-xs tracking-[0.15em] uppercase border-none shadow-xl"
                >
                  ĐẶT LỊCH HẸN SHOWROOM
                </Button>

                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  variant="outline"
                  className="border border-[#E8D0AA] text-[#E8D0AA] hover:bg-[#E8D0AA] hover:text-[#2A2724] font-bold rounded-full h-12 px-8 text-xs tracking-[0.15em] uppercase transition-all"
                >
                  NHẬN BÁO GIÁ M²
                </Button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: COLLECTIONS CATALOG PAGE */}
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
              <div key={product.id} onClick={() => openProductDetail(product)} className="group cursor-pointer space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FBFAF8] border border-[#E2DDD5]">
                  <Image src={product.textureImage} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#2A2724] text-white text-[10px] uppercase font-bold tracking-[0.15em] px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase block">
                    {product.series} • {product.size}
                  </span>
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17] group-hover:text-[#9A7B4F] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-[#8B8378] font-medium">
                    Xuất xứ: <b>{product.origin}</b> • Bề mặt: <b>{product.finish}</b>
                  </p>
                  <span className="text-xs font-bold text-[#9A7B4F] group-hover:underline mt-2 inline-block">
                    Khám phá chi tiết →
                  </span>
                </div>
              </div>
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
                  className="flex-1 py-3.5 text-xs font-bold tracking-[0.15em] uppercase bg-[#9A7B4F] text-white rounded-full shadow-md hover:bg-[#85683F]"
                >
                  <FileText className="mr-2 h-4 w-4 inline" /> YÊU CẦU BÁO GIÁ M²
                </Button>
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOM_INSPIRATIONS.map((p) => (
              <div key={p.id} className="space-y-3 group cursor-pointer" onClick={() => setLightboxImage(p.image)}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-[#E2DDD5]">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#9A7B4F] font-bold tracking-[0.15em] uppercase">{p.category}</span>
                  <h3 className="font-heading font-normal text-2xl text-[#1C1A17] group-hover:text-[#9A7B4F] transition-colors">{p.title}</h3>
                  <p className="text-xs text-[#8B8378]">Mẫu gạch sử dụng: <b className="text-[#9A7B4F]">{p.tileName}</b></p>
                </div>
              </div>
            ))}
          </div>
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

      {/* 10. FOOTER — CHARCOAL STONE BACKGROUND WITH SMALL MUTED 12px ADMIN LINK */}
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
