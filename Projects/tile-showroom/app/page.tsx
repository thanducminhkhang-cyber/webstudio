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
  SlidersHorizontal,
  Compass,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@wsos/ui/components/dialog";

// Imports from @wsos/ui blocks (Magic UI)
import { TextAnimate } from "@wsos/ui/blocks/text-animate";
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
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
    title: "Calacatta Gold Big Slab",
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Big Slab 120x240",
    isBigSlab: true,
  },
  {
    id: "t2",
    code: "ST-902",
    title: "Statuario Pure White",
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
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop",
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
    title: "Basalt Grey Architectural",
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
    title: "Urban Ash Big Slab",
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
  { id: "r1", title: "Phòng Khách Biệt Thự Thảo Điền", category: "Living Room", tileCode: "ST-901", tileName: "Calacatta Gold Big Slab 120x240", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
  { id: "r2", title: "Phòng Tắm Master Villa Heritage", category: "Bathroom", tileCode: "ST-902", tileName: "Statuario Pure White 80x160", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
  { id: "r3", title: "Không Gian Bếp Penthouse Quận 1", category: "Kitchen", tileCode: "ST-903", tileName: "Nero Marquina Black Slab", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop" },
  { id: "r4", title: "Mặt Tiền Showroom Porsche HCM", category: "Exterior", tileCode: "ST-909", tileName: "Urban Ash Big Slab 120x240", image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop" },
  { id: "r5", title: "Sảnh Khách Sạn 5 Sao Hyatt", category: "Hotel Lobby", tileCode: "ST-901", tileName: "Calacatta Gold Big Slab", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" },
  { id: "r6", title: "Sân Vườn Villa Phú Mỹ Hưng", category: "Exterior", tileCode: "ST-905", tileName: "Basalt Grey 20mm Outdoor", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=800&auto=format&fit=crop" },
];

export default function StonaSlabHome() {
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
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#0F172A] text-white px-6 py-4 font-semibold shadow-2xl animate-in slide-in-from-bottom-5 text-sm border border-[#2563EB]">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2563EB]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <Image src={lightboxImage} alt="Enlarged View" fill className="object-contain" />
          </div>
        </div>
      )}

      {/* HEADER & NAV — NO ADMIN LINK ON HEADER! */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-3 text-left group">
            <div className="h-11 w-11 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md border border-[#2563EB]">
              S
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A] block leading-none">
                STONA <span className="text-[#2563EB]">SLAB</span>
              </span>
              <span className="text-[10px] text-[#78716C] font-mono tracking-widest uppercase font-bold">
                Large Format Surfaces
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#0F172A]">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-[#2563EB] transition-colors ${activeTab === "home" ? "text-[#2563EB]" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("collections")}
              className={`hover:text-[#2563EB] transition-colors ${activeTab === "collections" ? "text-[#2563EB]" : ""}`}
            >
              Bộ Sưu Tập (12+)
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`hover:text-[#2563EB] transition-colors ${activeTab === "projects" ? "text-[#2563EB]" : ""}`}
            >
              Dự Án Đã Thực Hiện
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-[#2563EB] transition-colors ${activeTab === "about" ? "text-[#2563EB]" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Header Action: NO ADMIN LINK, ONLY BOOK SHOWROOM BUTTON */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsShowroomModalOpen(true)}
              className="bg-[#2563EB] hover:bg-[#2563EB]/90 text-white font-bold rounded-2xl text-xs px-5 py-2.5 shadow-md shadow-[#2563EB]/25"
            >
              <Calendar className="mr-1.5 h-4 w-4" /> Đặt Lịch Showroom
            </Button>

            {/* Mobile Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#0F172A]">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-lg text-[#2563EB]">
                      STONA SLAB SURFACES
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 font-bold text-[#0F172A] text-base">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#2563EB]">Trang Chủ</button>
                    <button onClick={() => setActiveTab("collections")} className="text-left hover:text-[#2563EB]">Bộ Sưu Tập</button>
                    <button onClick={() => setActiveTab("projects")} className="text-left hover:text-[#2563EB]">Dự Án</button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#2563EB]">Về Chúng Tôi</button>
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
          {/* HERO SECTION — BIG SLAB ARCHITECTURAL VISUAL */}
          <section className="relative pt-10 pb-20 px-4 sm:px-6 overflow-hidden bg-white border-b border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge className="bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/30 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider">
                    🏛️ GẠCH MEN CAO CẤP & ĐÁ KHỔ LỚN BIG SLAB 120x240CM
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] uppercase">
                    BỨT PHÁ KHÔNG GIAN BẰNG <br />
                    <span className="text-[#2563EB] block mt-1">
                      GẠCH THƯỢNG HẠNG.
                    </span>
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-[#64748B] text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    Giải pháp bề mặt kiến trúc đột phá cho biệt thự, penthouse và công trình thương mại. Nhập khẩu trực tiếp từ các tập đoàn hàng đầu Ý & Tây Ban Nha.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => setActiveTab("collections")}
                      className="px-8 py-4 text-sm font-extrabold bg-[#2563EB] text-white shadow-xl shadow-[#2563EB]/25 tracking-wide rounded-2xl"
                    >
                      KHÁM PHÁ BỘ SƯU TẬP ✨
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-7 py-4 border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white text-sm font-extrabold rounded-2xl transition-all"
                    >
                      Nhận Báo Giá Dự Án <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>

                {/* Number Ticker Stats */}
                <BlurFade delay={0.5}>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E2E8F0]">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2563EB] flex items-center">
                        <NumberTicker value={512} />+
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Mẫu Gạch Nhập Khẩu</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0D9488] flex items-center">
                        <NumberTicker value={1000} />+
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Công Trình Đã Phủ</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A] flex items-center">
                        <NumberTicker value={15} />+
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Năm Uy Tín Ngành Gạch</p>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Right Column (45%) Big Slab Hero Visual */}
              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative mx-auto max-w-md">
                    <div className="relative h-[400px] sm:h-[480px] w-full rounded-3xl overflow-hidden bg-slate-900 border-2 border-[#2563EB]/40 shadow-2xl group">
                      <BorderBeam size={260} duration={10} delay={0} colorFrom="#2563EB" colorTo="#0D9488" />
                      <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                        alt="Stona Big Slab Showcase"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                        <div>
                          <Badge className="bg-[#2563EB] text-white font-bold text-[10px] uppercase mb-1">
                            BIG SLAB 120x240CM
                          </Badge>
                          <h3 className="font-heading font-extrabold text-lg">Calacatta Gold Italian Slab</h3>
                        </div>
                        <button
                          onClick={() => setLightboxImage("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop")}
                          className="p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 transition-colors backdrop-blur-md"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* PARTNERS MARQUEE BAR */}
          <section className="bg-[#0F172A] text-white py-6 border-y border-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-2">
              <p className="text-center text-[11px] text-slate-400 font-mono uppercase tracking-widest font-bold">
                TẬP ĐOÀN ĐỐI TÁC GẠCH QUỐC TẾ NHẬP KHẨU
              </p>
              <Marquee pauseOnHover className="[--duration:25s]">
                <span className="mx-8 font-heading font-extrabold text-xl text-slate-300 tracking-wider">MARAZZI ITALY</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#2563EB] tracking-wider">PORCELANOSA SPAIN</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#0D9488] tracking-wider">FLORIM CERAMICHE</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-slate-300 tracking-wider">MIRAGE SURFACES</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#2563EB] tracking-wider">LEA CERAMICHE</span>
              </Marquee>
            </div>
          </section>

          {/* FEATURED COLLECTIONS GRID */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge className="bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 font-extrabold text-xs uppercase px-3 py-1">
                  COLLECTION HIGHLIGHTS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-2 uppercase">
                  Bộ Sưu Tập Gạch Thượng Hạng
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("collections")}
                className="text-[#2563EB] hover:text-[#2563EB]/80 font-bold text-sm"
              >
                Xem Tất Cả Mẫu Gạch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {TILE_PRODUCTS.slice(0, 6).map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl rounded-3xl group flex flex-col justify-between"
                >
                  <div
                    className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
                    onClick={() => openProductDetail(product)}
                  >
                    <Image
                      src={product.textureImage}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-[#0F172A] text-white border-none font-bold text-xs px-3 py-1">
                        {product.badge}
                      </Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxImage(product.textureImage);
                      }}
                      className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-black/60 hover:bg-[#2563EB] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                      title="Xem phóng to vân gạch"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-800 font-bold">
                          {product.series}
                        </Badge>
                        <span className="font-mono text-slate-500 font-bold">{product.size}</span>
                      </div>

                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-heading font-extrabold text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        Bề mặt: <b>{product.finish}</b> • Xuất xứ: <b>{product.origin}</b>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="font-heading font-extrabold text-sm text-[#2563EB] uppercase">
                        Liên Hệ Báo Giá
                      </span>
                      <Button
                        onClick={() => openProductDetail(product)}
                        className="bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold rounded-xl text-xs px-4 py-2 transition-colors"
                      >
                        Xem Chi Tiết
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* INSPIRATION ROOM GALLERY MASONRY */}
          <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge className="bg-[#2563EB] text-white font-bold text-xs uppercase px-3 py-1">
                  ROOM INSPIRATIONS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Không Gian Gợi Ý Ốp Lát Thực Tế</h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  Hình dung vẻ đẹp của các mẫu gạch khi phối trong phòng khách, bếp, phòng tắm và biệt thự thực tế.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROOM_INSPIRATIONS.map((room) => (
                  <div
                    key={room.id}
                    className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer border border-slate-700 shadow-xl"
                    onClick={() => setLightboxImage(room.image)}
                  >
                    <Image src={room.image} alt={room.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                      <Badge className="bg-[#2563EB] text-white font-bold text-[10px] w-fit mb-2">
                        {room.category}
                      </Badge>
                      <h4 className="font-heading font-bold text-base text-white">{room.title}</h4>
                      <p className="text-xs text-slate-300 mt-1">Gạch sử dụng: <span className="font-bold text-amber-400">{room.tileName}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US BENTO GRID */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <Badge className="bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 font-extrabold text-xs uppercase px-3 py-1">
                STONA STANDARDS
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] uppercase">
                Tiêu Chuẩn Đẳng Cấp Cho Công Trình
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">Nhập Khẩu Trực Tiếp Ý & Tây Ban Nha</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  100% Sản phẩm được nhập khẩu chính ngạch đầy đủ chứng chỉ CO/CQ chuẩn Châu Âu. Đảm bảo bề mặt chống xước, không rạn nứt và độ bền trên 30 năm.
                </p>
              </Card>

              <Card className="bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">Cắt Laser Không Đường Ron</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Công nghệ mài cạnh chuẩn vi sai 0.1mm cho phép thi công đường mạch siêu mảnh, tạo cảm giác như một tấm đá tự nhiên nguyên khối.
                </p>
              </Card>

              <Card className="bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">Bảo Hành Bề Mặt 20 Năm</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cam kết bảo hành chính hãng độ bóng, khả năng chống thấm nước và chống bay màu trong suốt 20 năm sử dụng.
                </p>
              </Card>

              <Card className="md:col-span-2 bg-[#0F172A] text-white p-8 space-y-4 rounded-3xl shadow-xl">
                <div className="h-12 w-12 rounded-2xl bg-white/10 text-[#2563EB] flex items-center justify-center">
                  <Compass className="h-6 w-6 text-[#2563EB]" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">Tư Vấn Phối Cảnh 3D Miễn Phí</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Đội ngũ kiến trúc sư tại Showroom sẽ dựng phối cảnh 3D không gian thực tế của ngôi nhà bạn giúp lựa chọn mẫu gạch chuẩn màu và tỉ lệ hoàn hảo nhất.
                </p>
              </Card>
            </div>
          </section>

          {/* QUOTE & SHOWROOM BOOKING CTA */}
          <section className="py-20 px-4 sm:px-6 bg-[#2563EB] text-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase">
                Trải Nghiệm Trực Tiếp Mẫu Gạch Tại Showroom Stona
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
                Đặt lịch hẹn tham quan Showroom hoặc nhận báo giá m² chi tiết cho công trình của bạn.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
                  className="bg-white text-[#0F172A] hover:bg-slate-100 font-extrabold rounded-2xl h-12 px-8 text-sm shadow-xl"
                >
                  <Calendar className="mr-2 h-4 w-4 text-[#2563EB]" /> ĐẶT LỊCH THAM QUAN SHOWROOM
                </Button>

                <Button
                  onClick={() => setIsQuoteModalOpen(true)}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#0F172A] font-extrabold rounded-2xl h-12 px-8 text-sm transition-all"
                >
                  <FileText className="mr-2 h-4 w-4" /> NHẬN BÁO GIÁ M²
                </Button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: COLLECTIONS CATALOG PAGE */}
      {activeTab === "collections" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge className="bg-[#2563EB]/10 text-[#2563EB] font-bold text-xs uppercase px-3 py-1">
              FULL CATALOG
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#0F172A] uppercase">
              Tất Cả Mẫu Gạch Men & Big Slab
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              Danh mục 12+ bộ sưu tập gạch men cao cấp và đá khổ lớn nhập khẩu Châu Âu.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={seriesFilter === "all" ? "default" : "outline"}
              onClick={() => setSeriesFilter("all")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "all" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Tất Cả (12)
            </Button>
            <Button
              variant={seriesFilter === "Marble Series" ? "default" : "outline"}
              onClick={() => setSeriesFilter("Marble Series")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "Marble Series" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Marble Series
            </Button>
            <Button
              variant={seriesFilter === "Stone Series" ? "default" : "outline"}
              onClick={() => setSeriesFilter("Stone Series")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "Stone Series" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Stone Series
            </Button>
            <Button
              variant={seriesFilter === "Wood-look" ? "default" : "outline"}
              onClick={() => setSeriesFilter("Wood-look")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "Wood-look" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Wood-look
            </Button>
            <Button
              variant={seriesFilter === "Concrete" ? "default" : "outline"}
              onClick={() => setSeriesFilter("Concrete")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "Concrete" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Concrete
            </Button>
            <Button
              variant={seriesFilter === "Terrazzo" ? "default" : "outline"}
              onClick={() => setSeriesFilter("Terrazzo")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${seriesFilter === "Terrazzo" ? "bg-[#2563EB] text-white" : ""}`}
            >
              Terrazzo
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl shadow-sm">
                <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openProductDetail(product)}>
                  <Image src={product.textureImage} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-[#0F172A] text-white border-none font-bold text-xs px-3 py-1">
                      {product.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-800 font-bold">
                        {product.series}
                      </Badge>
                      <span className="font-mono font-bold text-slate-500">{product.size}</span>
                    </div>

                    <h3
                      onClick={() => openProductDetail(product)}
                      className="font-heading font-extrabold text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      Bề mặt: <b>{product.finish}</b> • Độ dày: <b>{product.thickness}</b>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-[#2563EB]">
                      Liên Hệ Báo Giá
                    </span>
                    <Button
                      onClick={() => openProductDetail(product)}
                      className="bg-[#0F172A] hover:bg-[#2563EB] text-white font-bold rounded-xl text-xs px-4 py-2"
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 3: PRODUCT DETAIL PAGE */}
      {activeTab === "detail" && selectedProduct && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Gallery Left Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl bg-white group cursor-pointer" onClick={() => setLightboxImage(selectedProduct.textureImage)}>
                <Image src={selectedProduct.textureImage} alt={selectedProduct.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                <button className="absolute bottom-4 right-4 p-3 rounded-full bg-black/60 text-white backdrop-blur-md">
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden border cursor-pointer" onClick={() => setLightboxImage(selectedProduct.roomImage)}>
                  <Image src={selectedProduct.roomImage} alt="Room Application" fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">Ảnh phối cảnh</span>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border cursor-pointer" onClick={() => setLightboxImage(selectedProduct.textureImage)}>
                  <Image src={selectedProduct.textureImage} alt="Texture" fill className="object-cover" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded">Ảnh texture 4K</span>
                </div>
              </div>
            </div>

            {/* Specification Right Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge className="bg-[#2563EB] text-white font-bold mb-2">
                  {selectedProduct.series.toUpperCase()} • {selectedProduct.code}
                </Badge>
                <h1 className="font-heading font-extrabold text-3xl text-[#0F172A]">
                  {selectedProduct.title}
                </h1>
                <p className="text-xs text-[#2563EB] font-bold mt-1 uppercase font-mono">
                  Mức Giá: Liên Hệ Báo Giá Theo M² Hoặc Dự Án
                </p>
              </div>

              {/* Technical Specifications Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-slate-500">Thông Số Kỹ Thuật Chi Tiết</h4>
                <div className="divide-y divide-slate-100 border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white text-xs">
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Mã sản phẩm:</span>
                    <span className="font-bold font-mono text-[#0F172A]">{selectedProduct.code}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Kích thước:</span>
                    <span className="font-bold text-[#0F172A]">{selectedProduct.size}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Bề mặt hoàn thiện:</span>
                    <span className="font-bold text-[#0F172A]">{selectedProduct.finish}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Độ dày:</span>
                    <span className="font-bold text-[#0F172A]">{selectedProduct.thickness}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="text-slate-500">Xuất xứ:</span>
                    <span className="font-bold text-[#2563EB]">{selectedProduct.origin}</span>
                  </div>
                  {selectedProduct.antiSlip && (
                    <div className="p-3 flex justify-between">
                      <span className="text-slate-500">Cấp độ chống trượt:</span>
                      <span className="font-bold text-[#0F172A]">{selectedProduct.antiSlip}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Application note */}
              <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-[#0F172A]">Khu Vực Khuyên Dùng:</p>
                <p>{selectedProduct.application}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <ShimmerButton
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 py-3.5 text-sm font-extrabold bg-[#2563EB] text-white rounded-2xl shadow-lg"
                >
                  <FileText className="mr-2 h-4 w-4 inline" /> YÊU CẦU BÁO GIÁ M²
                </ShimmerButton>
                <Button
                  onClick={() => setIsShowroomModalOpen(true)}
                  variant="outline"
                  className="px-6 py-3.5 border-2 border-[#0F172A] text-[#0F172A] font-extrabold text-sm rounded-2xl"
                >
                  <Calendar className="mr-2 h-4 w-4 inline text-[#2563EB]" /> ĐẶT LỊCH XEM MẪU
                </Button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: PROJECTS PAGE */}
      {activeTab === "projects" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Badge className="bg-[#2563EB] text-white font-bold text-xs uppercase px-3 py-1">
              PROJECT PORTFOLIO
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#0F172A] uppercase">
              Dự Án Đã Cung Cấp Gạch
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              Hình ảnh công trình biệt thự, penthouse và khách sạn sử dụng gạch men Stona Slab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROOM_INSPIRATIONS.map((p) => (
              <Card key={p.id} className="bg-white border border-[#E2E8F0] overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setLightboxImage(p.image)}>
                  <Image src={p.image} alt={p.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <CardContent className="p-6 space-y-2">
                  <Badge className="bg-[#2563EB] text-white font-bold text-[10px]">{p.category}</Badge>
                  <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">{p.title}</h3>
                  <p className="text-xs text-slate-500">Mẫu gạch sử dụng: <b className="text-[#2563EB]">{p.tileName}</b></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 5: ABOUT PAGE */}
      {activeTab === "about" && (
        <main className="py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <Badge className="bg-[#2563EB] text-white font-bold px-3 py-1">ABOUT STONA SLAB</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0F172A] uppercase">
              Thương Hiệu Gạch Men & Đô Thị Thượng Hạng
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Stona Slab tự hào là đơn vị phân phối chính ngạch các dòng gạch khổ lớn Big Slab và vật liệu kiến trúc cao cấp từ Châu Âu tại Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center mx-auto">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A]">Showroom 1000m²</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Không gian trưng bày thực tế chuẩn Châu Âu tại TP.HCM và Hà Nội.</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mx-auto">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A]">Chứng Chỉ Quốc Tế</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Đầy đủ CO/CQ nhập khẩu chính ngạch từ Ý & Tây Ban Nha.</p>
            </Card>

            <Card className="p-6 bg-white border border-[#E2E8F0] rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#0F172A]">Bảo Hành 20 Năm</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Cam kết độ bền bề mặt và chống thấm hoàn hảo theo thời gian.</p>
            </Card>
          </div>
        </main>
      )}

      {/* MODAL 1: REQUEST QUOTE FORM */}
      {isQuoteModalOpen && (
        <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
          <DialogContent className="max-w-md bg-white rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-xl text-[#0F172A]">
                Yêu Cầu Báo Giá M² Dự Án
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Họ và Tên *</Label>
                <Input
                  required
                  placeholder="Ví dụ: Nguyễn Văn Hùng"
                  value={formQuote.name}
                  onChange={(e) => setFormQuote({ ...formQuote, name: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Số Điện Thoại Zalo *</Label>
                <Input
                  required
                  placeholder="Ví dụ: 0901234567"
                  value={formQuote.phone}
                  onChange={(e) => setFormQuote({ ...formQuote, phone: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Sản Phẩm Quan Tâm</Label>
                <Input
                  placeholder="Ví dụ: Calacatta Gold Slab ST-901"
                  value={formQuote.productCode || selectedProduct.title}
                  onChange={(e) => setFormQuote({ ...formQuote, productCode: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Diện Tích Ước Tính (m²)</Label>
                <Input
                  placeholder="Ví dụ: 150m²"
                  value={formQuote.area}
                  onChange={(e) => setFormQuote({ ...formQuote, area: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsQuoteModalOpen(false)} className="rounded-xl text-xs font-bold">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#2563EB] text-white hover:bg-[#2563EB]/90 font-bold text-xs">
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
          <DialogContent className="max-w-md bg-white rounded-3xl p-6">
            <DialogHeader>
              <DialogTitle className="font-heading font-extrabold text-xl text-[#0F172A]">
                Đặt Lịch Hẹn Xem Mẫu Tại Showroom
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleShowroomSubmit} className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Họ và Tên *</Label>
                <Input
                  required
                  placeholder="Ví dụ: Trần Thị Mai"
                  value={formShowroom.name}
                  onChange={(e) => setFormShowroom({ ...formShowroom, name: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Số Điện Thoại *</Label>
                <Input
                  required
                  placeholder="Ví dụ: 0912345678"
                  value={formShowroom.phone}
                  onChange={(e) => setFormShowroom({ ...formShowroom, phone: e.target.value })}
                  className="text-xs bg-slate-50 border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Ngày Hẹn</Label>
                  <Input
                    type="date"
                    value={formShowroom.date}
                    onChange={(e) => setFormShowroom({ ...formShowroom, date: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">Giờ Hẹn</Label>
                  <Input
                    type="time"
                    value={formShowroom.time}
                    onChange={(e) => setFormShowroom({ ...formShowroom, time: e.target.value })}
                    className="text-xs bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsShowroomModalOpen(false)} className="rounded-xl text-xs font-bold">
                  Hủy
                </Button>
                <Button type="submit" className="rounded-xl bg-[#0F172A] text-white font-bold text-xs">
                  Xác Nhận Đặt Lịch
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-slate-300 py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-2xl text-white block">
              STONA <span className="text-[#2563EB]">SLAB</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Showroom trưng bày & phân phối chính ngạch gạch men cao cấp và đá tấm khổ lớn Châu Âu.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Danh Mục Sản Phẩm</h4>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#2563EB] cursor-pointer">Marble Series Big Slab</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#2563EB] cursor-pointer">Stone Series Kiến Trúc</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#2563EB] cursor-pointer">Wood-look Vân Gỗ Tự Nhiên</p>
            <p onClick={() => setActiveTab("collections")} className="hover:text-[#2563EB] cursor-pointer">Concrete bê tông mờ</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Hệ Thống Showroom</h4>
            <p className="text-slate-400">Showroom TP.HCM: 204 Nguyễn Văn Trỗi, Q. Phú Nhuận</p>
            <p className="text-slate-400">Showroom Hà Nội: 88 Khuất Duy Tiến, Q. Thanh Xuân</p>
            <p className="text-slate-400">Hotline: 1800 6868 (Miễn phí)</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Giờ Mở Cửa Showroom</h4>
            <p className="text-slate-400">Thứ 2 - Thứ 7: 08:00 - 20:00</p>
            <p className="text-slate-400">Chủ Nhật: 09:00 - 18:00</p>
            <p className="text-[#2563EB] font-bold">Có chỗ đậu xe hơi rộng rãi</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 STONA SLAB Large Format Surfaces. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-[#2563EB] font-mono text-[12px] text-slate-500">
              Quản trị
            </Link>
            <p className="text-[#2563EB] font-mono">WSOS Studio Showcase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
