"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Coffee,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Menu as MenuIcon,
  Star,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Sun,
  Moon,
  Flame,
  Award,
  Heart,
  Compass,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

// Imports from @wsos/ui blocks (Magic UI)
import { DotPattern } from "@wsos/ui/blocks/dot-pattern";
import { TypingAnimation } from "@wsos/ui/blocks/typing-animation";
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
import { BentoGrid, BentoCard } from "@wsos/ui/blocks/bento-grid";
import { Marquee } from "@wsos/ui/blocks/marquee";

// Types
interface MenuItem {
  id: string;
  name: string;
  jpName: string;
  description: string;
  price: string;
  badge?: string;
  image: string;
}

// Data
const MENU_DATA: Record<string, MenuItem[]> = {
  coffee: [
    {
      id: "c1",
      name: "Tokyo Midnight Pour-Over",
      jpName: "ミッドナイト ドリップ",
      description: "Hạt Arabica Cầu Đất tuyển chọn, lên men yếm khí 72h, ghi chú hương mâm xôi & sô-cô-la đen.",
      price: "115.000đ",
      badge: "Signature",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "c2",
      name: "Kyoto Matcha Cold Foam Espresso",
      jpName: "抹茶エスプレッソ",
      description: "Espresso đậm vị kết hợp cùng lớp kem bọt Matcha Uji nguyên chất thơm ngậy.",
      price: "125.000đ",
      badge: "Best-seller",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "c3",
      name: "Smoky Amber Charcoal Latte",
      jpName: "炭焼き ラテ",
      description: "Latte rang than củi độc bản với hương khói gỗ sồi nhẹ dịu và xirô caramel thủ công.",
      price: "118.000đ",
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "c4",
      name: "Ginza Vintage Cold Brew",
      jpName: "銀座 コールドブリュー",
      description: "Ủ lạnh 24h từ hạt Geisha Ethiopia, phục vụ cùng viên đá vĩnh cửu và vỏ cam nướng.",
      price: "145.000đ",
      badge: "Limited",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
    },
  ],
  tea: [
    {
      id: "t1",
      name: "Shinjuku Sakura Herbal Infusion",
      jpName: "桜 ハーブティー",
      description: "Trà hoa đào tuyết Nhật Bản ướp thảo mộc tươi, thanh lọc tâm trí.",
      price: "95.000đ",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "t2",
      name: "Hokkaido Roasted Houjicha",
      jpName: "焙じ茶 ラテ",
      description: "Trà xanh rang thơm lừng quyện cùng sữa tươi nguyên chất Hokkaido.",
      price: "105.000đ",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop",
    },
  ],
  pastry: [
    {
      id: "p1",
      name: "Midnight Sesame Croissant",
      jpName: "黒ごま クロワッサン",
      description: "Bánh sừng bò ngàn lớp nhân kem mè đen giòn rụm béo ngậy.",
      price: "85.000đ",
      badge: "Must-try",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "p2",
      name: "Matcha Lava Basque Cheesecake",
      jpName: "抹茶 バスクチーズ",
      description: "Bánh phô mai nướng cháy nhân xốt Matcha tươi tan chảy.",
      price: "110.000đ",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop",
    },
  ],
  specialty: [
    {
      id: "s1",
      name: "Tokyo Neon Signature Mocktail",
      jpName: "ネオン モクテル",
      description: "Sự kết hợp giữa Cold Brew, Yuzu tươi, nước tonic và khói quế thơm nồng.",
      price: "155.000đ",
      badge: "Chef Choice",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    },
  ],
};

const REVIEWS = [
  {
    name: "Kenji Sato",
    role: "Architect & Coffee Connoisseur",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "Không gian tuyệt vời nhất giữa lòng phố đêm. Tách Pour-over của Kissaten giữ đúng hương vị tinh tế của hạt Geisha.",
    rating: 5,
  },
  {
    name: "Minh Anh Nguyễn",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    content: "Thiết kế ánh sáng và âm nhạc ở đây tạo cảm hứng làm việc cực kỳ tốt. Món Kyoto Matcha Cold Foam ngon tuyệt đỉnh!",
    rating: 5,
  },
  {
    name: "Elena Rostova",
    role: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    content: "A hidden gem! The Japanese fusion pastries and midnight atmosphere are unmatched anywhere else in the city.",
    rating: 5,
  },
  {
    name: "Hoàng Long",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "Góc nào cũng cho ra những bức ảnh cinematic điện ảnh. Dịch vụ và cung cách phục vụ rất đúng tinh thần Omotenashi.",
    rating: 5,
  },
];

export default function CafeShowcase() {
  const [scrolled, setScrolled] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    note: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setToastMessage("Vui lòng nhập tên và số điện thoại của bạn!");
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }
    setToastMessage(`Đã gửi thành công! Cảm ơn ${formData.name}, Kissaten sẽ xác nhận bàn trước 5 phút qua SĐT ${formData.phone}.`);
    setFormData({ name: "", phone: "", date: "", time: "", guests: "2", note: "" });
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-amber-500 text-slate-950 px-5 py-4 font-semibold shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border shadow-2xl py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Coffee className="h-5 w-5" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-wider text-foreground">
              KISSATEN <span className="text-amber-400 font-light text-xs tracking-normal">喫茶店</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-amber-400 transition-colors">Câu Chuyện</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">Thực Đơn</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Không Gian</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Đánh Giá</a>
            <a href="#booking" className="hover:text-amber-400 transition-colors">Đặt Bàn</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Liên Hệ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#booking">
              <ShimmerButton className="text-xs font-bold px-5 py-2.5 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                Đặt Bàn Ngay
              </ShimmerButton>
            </a>
          </div>

          {/* Mobile Navigation Sheet */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-border">
                <SheetHeader>
                  <SheetTitle className="text-left font-heading text-xl text-amber-400 flex items-center gap-2">
                    <Coffee className="h-5 w-5" /> KISSATEN TOKYO
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8 font-medium text-lg text-foreground">
                  <a href="#about" className="hover:text-amber-400">Câu Chuyện</a>
                  <a href="#menu" className="hover:text-amber-400">Thực Đơn</a>
                  <a href="#gallery" className="hover:text-amber-400">Không Gian</a>
                  <a href="#reviews" className="hover:text-amber-400">Đánh Giá</a>
                  <a href="#booking" className="hover:text-amber-400">Đặt Bàn</a>
                  <a href="#contact" className="hover:text-amber-400">Liên Hệ</a>
                  <a href="#booking" className="mt-4">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                      Đặt Bàn Ngay
                    </Button>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-background">
        <DotPattern className="absolute inset-0 opacity-20" />
        
        {/* Neon Amber Glow Effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <BlurFade delay={0.1}>
            <Badge variant="outline" className="px-4 py-1.5 border-amber-500/40 text-amber-400 bg-amber-500/10 rounded-full text-xs uppercase tracking-widest font-mono">
              ✨ Midnight Specialty Coffee Experience
            </Badge>
          </BlurFade>

          <BlurFade delay={0.2}>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-foreground">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-amber-600 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                KISSATEN
              </span>
              <TypingAnimation className="mt-3 text-2xl sm:text-4xl text-slate-300 font-light tracking-wide">
                Tokyo Midnight Coffee
              </TypingAnimation>
            </h1>
          </BlurFade>

          <BlurFade delay={0.3}>
            <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed">
              Thưởng thức từng giọt Espresso nguyên bản giáp ranh giữa ánh đèn neon Shibuya rực rỡ và sự tĩnh lặng của đêm Tokyo. Không gian cà phê thủ công đương đại độc bản.
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a href="#booking">
                <ShimmerButton className="px-9 py-4 text-sm font-extrabold tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.4)] transform hover:scale-105 transition-transform">
                  💥 ĐẶT BÀN TRỰC TUYẾN
                </ShimmerButton>
              </a>
              <a href="#menu">
                <Button variant="outline" className="px-7 py-4 border-border hover:bg-accent text-foreground text-sm font-semibold rounded-xl">
                  Khám Phá Menu
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </BlurFade>

          {/* Hero Image Showcase */}
          <BlurFade delay={0.5}>
            <div className="relative mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <BorderBeam size={300} duration={12} delay={9} />
              <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
                  alt="Kissaten Tokyo Atmosphere"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-left">
                  <div>
                    <p className="text-xs text-amber-400 font-mono tracking-widest flex items-center gap-1.5">
                      <Flame className="h-3.5 w-3.5 fill-amber-400" /> SPECIALTY BREW BAR
                    </p>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">Ginza 108, Tokyo</h3>
                  </div>
                  <Badge variant="secondary" className="backdrop-blur-md bg-black/60 border border-amber-500/30 text-amber-300 px-3 py-1">
                    Open till 02:00 AM
                  </Badge>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* SECTION 2: ABOUT & RICH STATS */}
      <section id="about" className="py-24 px-6 border-y border-border/60 bg-card/40 relative">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Rich Image Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-border shadow-2xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop"
                    alt="Craft Roasting Process"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-border">
                    <p className="text-xs text-amber-400 font-mono">CÀ PHÊ NGHỆ THUẬT THỦ CÔNG</p>
                    <h4 className="font-heading font-bold text-sm text-foreground mt-1">Máy Rang Probat 1978 Nguyên Bản</h4>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative + Rich Stats Rows */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-amber-500/40 text-amber-400 font-mono text-xs">
                    CÂU CHUYỆN THƯƠNG HIỆU
                  </Badge>
                  <h2 className="font-heading text-3xl sm:text-4xl font-bold leading-tight text-foreground">
                    Tối Giản Trong Thiết Kế. <br />
                    <span className="text-amber-400">Cầu Kỳ Trong Từng Giọt Cà Phê.</span>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Kissaten ra đời từ niềm đam mê văn hoá Kissaten Nhật Bản kết hợp cùng kỹ thuật rang xay hiện đại. Chúng tôi tin rằng một tách cà phê hoàn hảo không chỉ đến từ hạt cà phê tuyển chọn mà còn từ không gian lắng đọng giúp bạn tái tạo nguồn năng lượng sống.
                  </p>
                </div>

                {/* 4 Rich Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Card className="bg-background/80 border-border p-5 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-extrabold text-amber-400 flex items-center">
                          <NumberTicker value={8} />+
                        </h3>
                        <p className="text-xs font-semibold text-foreground">Năm Rang Xay Thủ Công</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">Máy rang Probat từ Đức giữ trọn hương mầm trái cây.</p>
                  </Card>

                  <Card className="bg-background/80 border-border p-5 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Coffee className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-extrabold text-amber-400 flex items-center">
                          <NumberTicker value={45000} />+
                        </h3>
                        <p className="text-xs font-semibold text-foreground">Tách Cà Phê Phục Vụ</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">Hơn 45 ngàn trải nghiệm độc bản được trao gửi.</p>
                  </Card>

                  <Card className="bg-background/80 border-border p-5 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-extrabold text-amber-400 flex items-center">
                          <NumberTicker value={100} />%
                        </h3>
                        <p className="text-xs font-semibold text-foreground">Hạt Geisha & Arabica</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">Nhập nguyên mẻ trực tiếp từ Cầu Đất & Ethiopia.</p>
                  </Card>

                  <Card className="bg-background/80 border-border p-5 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Heart className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-extrabold text-amber-400 flex items-center">
                          <NumberTicker value={5} />★
                        </h3>
                        <p className="text-xs font-semibold text-foreground">Đánh Giá Hài Lòng</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">Hơn 3,000 đánh giá 5 sao từ thực khách thân thiết.</p>
                  </Card>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* SECTION 3: MENU */}
      <section id="menu" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <BlurFade delay={0.1}>
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 font-mono text-xs">
              SIGNATURE MENU
            </Badge>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground">Thực Đơn Độc Bản</h2>
          </BlurFade>
          <BlurFade delay={0.3}>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Sự kết hợp tinh tế giữa nghệ thuật pha chế thủ công Nhật Bản và hương vị nguyên bản hạt cà phê cao cấp.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.4}>
          <Tabs defaultValue="coffee" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-card border border-border p-1.5 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-1.5">
                <TabsTrigger value="coffee" className="rounded-xl font-semibold text-xs sm:text-sm px-4 py-2.5 transition-all">
                  ☕ Cà Phê Specialty
                </TabsTrigger>
                <TabsTrigger value="tea" className="rounded-xl font-semibold text-xs sm:text-sm px-4 py-2.5 transition-all">
                  🍵 Trà Nhật Bản
                </TabsTrigger>
                <TabsTrigger value="pastry" className="rounded-xl font-semibold text-xs sm:text-sm px-4 py-2.5 transition-all">
                  🥐 Bánh Ngọt
                </TabsTrigger>
                <TabsTrigger value="specialty" className="rounded-xl font-semibold text-xs sm:text-sm px-4 py-2.5 transition-all">
                  🍸 Signature Mocktail
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(MENU_DATA).map(([category, items]) => (
              <TabsContent key={category} value={category} className="space-y-6 animate-in fade-in-50 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <Card key={item.id} className="bg-card border-border hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row group">
                      <div className="relative h-48 sm:h-auto sm:w-44 shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-amber-400 transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-xs text-amber-400/90 font-mono">{item.jpName}</p>
                            </div>
                            <span className="font-heading font-extrabold text-amber-400 text-lg">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        {item.badge && (
                          <div>
                            <Badge variant="secondary" className="bg-amber-500/10 border border-amber-500/40 text-amber-400 text-[10px] font-mono">
                              {item.badge}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </BlurFade>
      </section>

      {/* SECTION 4: GALLERY */}
      <section id="gallery" className="py-24 px-6 border-t border-border/60 bg-card/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-amber-500/40 text-amber-400 font-mono text-xs">
                ATMOSPHERE GALLERY
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Không Gian Trải Nghiệm</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Góc phố riêng tư nơi thiết kế ánh sáng, mùi hương và âm nhạc hòa làm một.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <BentoGrid className="max-w-5xl mx-auto">
              <BentoCard
                name="Khu Vực Rang Xay Cà Phê"
                className="col-span-3 lg:col-span-2 group overflow-hidden"
                background={
                  <div className="relative h-full w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop"
                      alt="Roasting area"
                      fill
                      className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                }
                Icon={Coffee}
                description="Hệ thống máy rang Probat thủ công giữ nguyên vẹn tầng hương phức hợp của từng mẻ hạt."
                href="#booking"
                cta="Đặt Lịch Tham Quan"
              />

              <BentoCard
                name="Quầy Bar Pour-Over"
                className="col-span-3 lg:col-span-1 group overflow-hidden"
                background={
                  <div className="relative h-full w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop"
                      alt="Pour over bar"
                      fill
                      className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                }
                Icon={Sparkles}
                description="Nơi các Barista trình diễn nghệ thuật chiết xuất thủ công."
                href="#booking"
                cta="Đặt Bàn Bar"
              />

              <BentoCard
                name="Góc Đọc Sách Đêm"
                className="col-span-3 lg:col-span-1 group overflow-hidden"
                background={
                  <div className="relative h-full w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop"
                      alt="Reading lounge"
                      fill
                      className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                }
                Icon={Clock}
                description="Góc tĩnh lặng tối sáng nhẹ dịu dành riêng cho sự tập trung và sáng tạo."
                href="#booking"
                cta="Khám Phá"
              />

              <BentoCard
                name="Sân Thượng Hoàng Hôn"
                className="col-span-3 lg:col-span-2 group overflow-hidden"
                background={
                  <div className="relative h-full w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
                      alt="Rooftop sunset"
                      fill
                      className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>
                }
                Icon={Users}
                description="Ngắm nhìn toàn cảnh thành phố rực rỡ ánh đèn đêm bên ly Specialty Mocktail mát lạnh."
                href="#booking"
                cta="Đặt Bàn Ngoại Cảnh"
              />
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* SECTION 5: BOOKING FORM */}
      <section id="booking" className="py-24 px-6 max-w-4xl mx-auto relative">
        <BlurFade delay={0.1}>
          <div className="text-center space-y-4 mb-10">
            <Badge variant="outline" className="border-amber-500/40 text-amber-400 font-mono text-xs">
              RESERVATION
            </Badge>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground">Đặt Bàn Trực Tuyến</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Đặt bàn trước để đảm bảo vị trí ưa thích của bạn tại Kissaten Tokyo.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <Card className="relative bg-card border-border p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <BorderBeam size={300} duration={15} delay={0} />
            <form onSubmit={handleBookSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground">Họ & Tên *</Label>
                  <Input
                    id="name"
                    placeholder="Ví dụ: Kenji Sato"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border text-foreground focus:border-amber-500 text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-semibold text-foreground">Số Điện Thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="090 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border text-foreground focus:border-amber-500 text-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs font-semibold text-foreground">Ngày Đặt</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-background border-border text-foreground focus:border-amber-500 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-xs font-semibold text-foreground">Giờ Đặt</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="bg-background border-border text-foreground focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-xs font-semibold text-foreground">Số Lượng Khách</Label>
                <select
                  id="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="1">1 Người (Góc cá nhân)</option>
                  <option value="2">2 Người (Hẹn hò)</option>
                  <option value="4">3 - 4 Người (Nhóm bạn)</option>
                  <option value="6">5+ Người (Tiệc nhỏ / Sự kiện)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-xs font-semibold text-foreground">Ghi Chú Đặc Biệt</Label>
                <Input
                  id="note"
                  placeholder="Yêu cầu chỗ ngồi gần cửa sổ, tiệc sinh nhật..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="bg-background border-border text-foreground focus:border-amber-500 text-sm"
                />
              </div>

              <ShimmerButton type="submit" className="w-full py-4 font-extrabold tracking-wider text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                💥 XÁC NHẬN ĐẶT BÀN NGAY
              </ShimmerButton>
            </form>
          </Card>
        </BlurFade>
      </section>

      {/* SECTION 6: REVIEWS */}
      <section id="reviews" className="py-24 px-6 border-t border-border/60 bg-card/20 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-12">
          <BlurFade delay={0.1}>
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-amber-500/40 text-amber-400 font-mono text-xs">
                TESTIMONIALS
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Cảm Nhận Khách Hàng</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Những đánh giá chân thực từ những người yêu mến không gian và hương vị tại Kissaten.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <Marquee pauseOnHover className="[--duration:30s]">
              {REVIEWS.map((rev, idx) => (
                <Card key={idx} className="w-80 sm:w-96 bg-card border-border p-6 mx-3 flex flex-col justify-between shrink-0 hover:border-amber-500/50 transition-colors shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                      "{rev.content}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border/60">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-amber-500/40">
                      <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-foreground">{rev.name}</h4>
                      <p className="text-[10px] text-amber-400/90 font-mono">{rev.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </Marquee>
          </BlurFade>
        </div>
      </section>

      {/* SECTION 7: CONTACT & FOOTER */}
      <footer id="contact" className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coffee className="h-6 w-6 text-amber-400" />
              <span className="font-heading font-extrabold text-2xl tracking-wider text-foreground">
                KISSATEN
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Trải nghiệm cà phê thủ công phong cách Tokyo đương đại. Hương vị nguyên bản, không gian tĩnh lặng giữa đêm đô thị.
            </p>
            <p className="text-xs text-amber-400/80 font-mono">
              Designed & Built with WSOS Studio Monorepo Framework.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-foreground">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <span>108 Ginza District, Chuo-ku, Tokyo / 98 Bùi Viện, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <span>+84 (0)90 123 4567 / +81 3 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span>contact@kissaten-tokyo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Mở cửa hàng ngày: 07:00 AM – 02:00 AM</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-bold text-base text-foreground">Đăng Ký Nhận Thẻ Thành Viên</h4>
            <p className="text-xs text-muted-foreground">
              Nhận ngay ưu đãi 20% cho lần ghé thăm đầu tiên và ưu tiên đặt bàn đêm.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Email của bạn..." className="bg-card border-border text-xs text-foreground" />
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0">
                Đăng Ký
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <p>© 2026 KISSATEN Tokyo Specialty Coffee. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition-colors">Chính Sách Bảo Mật</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Điều Khoản Sử Dụng</a>
            <a href="#" className="hover:text-amber-400 transition-colors">WSOS Studio Showcase</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
