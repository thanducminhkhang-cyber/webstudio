"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  Play,
  CheckCircle2,
  ChevronRight,
  Star,
  Clock,
  Globe,
  Search,
  Menu as MenuIcon,
  X,
  Target,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

// Imports from @wsos/ui blocks (Magic UI)
import { TextAnimate } from "@wsos/ui/blocks/text-animate";
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
import { Marquee } from "@wsos/ui/blocks/marquee";

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "ielts" | "toeic" | "giaotiep" | "business" | "treem";
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  price: number;
  originalPrice?: number;
  sessions: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  videoUrl: string;
  shortDesc: string;
  fullDesc: string;
  modules: { title: string; lessons: string[] }[];
}

export const COURSES_DATA: Course[] = [
  {
    id: "c1",
    slug: "ielts-academic-70-intensive",
    title: "IELTS Academic 7.0+ Intensive",
    category: "ielts",
    level: "Advanced",
    instructor: "Sarah Johnson (Native)",
    instructorRole: "Senior IELTS Examiner",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    price: 3200000,
    originalPrice: 4500000,
    sessions: "40 buổi",
    rating: 4.9,
    reviewsCount: 184,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Lộ trình bứt phá IELTS 7.0+ chuyên sâu 4 kỹ năng Listening, Reading, Writing & Speaking với cựu giám khảo chấm thi.",
    fullDesc: "Khóa học IELTS Academic 7.0+ Intensive được thiết kế dành riêng cho học viên muốn đạt điểm số mục tiêu từ 7.0 trở lên trong thời gian ngắn nhất. Chương trình tập trung chiến thuật làm bài độc quyền, sửa bài Writing chi tiết 1-1 và thực hành Speaking trực tiếp với giảng viên bản ngữ.",
    modules: [
      { title: "Module 1: Writing Task 1 & Task 2 Mastery", lessons: ["Cách phân tích biểu đồ Task 1 chuyên sâu", "Cấu trúc bài essay Task 2 ăn điểm 7.5+", "Từ vựng Academic Band 8.0"] },
      { title: "Module 2: Speaking Fluency & Lexical Resource", lessons: ["Part 1 & Part 2 chiến thuật phản xạ", "Part 3 thảo luận chuyên sâu các chủ đề nóng", "Sửa ngọng và chuẩn hóa phát âm"] },
      { title: "Module 3: Reading & Listening Maximum Score", lessons: ["Skimming & Scanning nâng cao", "Chiến thuật bẫy trong Listening Part 3 & 4"] },
    ],
  },
  {
    id: "c2",
    slug: "toeic-800-thuc-chien",
    title: "TOEIC 800+ Luyện Đề Thực Chiến",
    category: "toeic",
    level: "Intermediate",
    instructor: "Nguyễn Minh Tuấn",
    instructorRole: "TOEIC 990 Full Score",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    price: 1990000,
    originalPrice: 2800000,
    sessions: "30 buổi",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Mới",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Luyện giải 20+ bộ đề TOEIC mới nhất, nắm vững bẫy đề thi và tăng 200+ điểm chỉ sau 1 khóa học.",
    fullDesc: "Khóa học TOEIC 800+ giúp học viên làm chủ 200 câu hỏi trong đề thi thật. Hướng dẫn mẹo làm bài nhanh, quản lý thời gian thi và bổ sung 1.500 từ vựng doanh nghiệp hay xuất hiện nhất.",
    modules: [
      { title: "Module 1: TOEIC Listening Part 1 - Part 4", lessons: ["Bẫy hình ảnh Part 1", "Mẹo nghe từ khóa Part 2", "Chiến thuật Part 3 & 4"] },
      { title: "Module 2: TOEIC Reading Part 5 - Part 7", lessons: ["Ngữ pháp ăn điểm Part 5", "Đọc hiểu nhanh Part 7 đoạn đơn & kép"] },
    ],
  },
  {
    id: "c3",
    slug: "giao-tiep-tieng-anh-tu-tin",
    title: "Giao Tiếp Tiếng Anh Tự Tin",
    category: "giaotiep",
    level: "Beginner",
    instructor: "Emily Chen (Native)",
    instructorRole: "TESOL Master Certified",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    price: 1290000,
    originalPrice: 1800000,
    sessions: "24 buổi",
    rating: 4.9,
    reviewsCount: 230,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Xóa tan nỗi sợ nói tiếng Anh, phản xạ tự nhiên trong 50+ tình huống giao tiếp đời sống và du lịch.",
    fullDesc: "Chương trình được xây dựng theo phương pháp phản xạ tương tác 100% bằng tiếng Anh. Giúp người mới bắt đầu hoặc mất gốc tự tin trò chuyện, phản xạ không cần dịch nhẩm trong đầu.",
    modules: [
      { title: "Module 1: Everyday Conversations", lessons: ["Chào hỏi & Giới thiệu bản thân", "Đặt đồ ăn & Mua sắm", "Hỏi đường & Du lịch"] },
      { title: "Module 2: Small Talk & Socializing", lessons: ["Trò chuyện tiệc tùng", "Chia sẻ sở thích & Quan điểm"] },
    ],
  },
  {
    id: "c4",
    slug: "business-english-dan-van-phong",
    title: "Business English cho Dân Văn Phòng",
    category: "business",
    level: "Intermediate",
    instructor: "David Miller (Native)",
    instructorRole: "Ex-Corporate Manager",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    price: 2490000,
    originalPrice: 3200000,
    sessions: "28 buổi",
    rating: 4.8,
    reviewsCount: 115,
    badge: "Phổ biến",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Làm chủ tiếng Anh công sở: Viết Email chuyên nghiệp, thuyết trình ấn tượng, đàm phán hợp đồng.",
    fullDesc: "Dành cho nhân viên văn phòng và quản lý muốn tự tin làm việc trong môi trường đa quốc gia. Rèn luyện kỹ năng viết Email chuẩn Corporate, dẫn dắt cuộc họp và đàm phán đối tác.",
    modules: [
      { title: "Module 1: Professional Email & Reports", lessons: ["Cấu trúc Email chuẩn Business", "Báo cáo tiến độ & Proposal"] },
      { title: "Module 2: Meeting & Presentation Skills", lessons: ["Dẫn dắt cuộc họp online/offline", "Thuyết trình tự tin trước đối tác"] },
    ],
  },
  {
    id: "c5",
    slug: "phat-am-chuan-giong-my",
    title: "Phát Âm Chuẩn Giọng Mỹ",
    category: "giaotiep",
    level: "Beginner",
    instructor: "Trần Hà Linh",
    instructorRole: "Pronunciation Specialist",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    price: 890000,
    originalPrice: 1200000,
    sessions: "16 buổi",
    rating: 4.9,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Chuẩn hóa 44 âm IPA, nắm vững quy tắc nối âm, nuốt âm và ngữ điệu tự nhiên chuẩn Mỹ.",
    fullDesc: "Khóa học chữa ngọng tiếng Anh triệt để. Giúp học viên nắm vững khẩu hình miệng, ngữ điệu nhấn nhá và cách nối âm tự nhiên như người bản xứ.",
    modules: [
      { title: "Module 1: 44 Sound IPA Master", lessons: ["Bảng phiên âm quốc tế IPA", "Phân biệt nguyên âm đơn & đôi", "Phụ âm khó"] },
      { title: "Module 2: Connected Speech & Intonation", lessons: ["Quy tắc nối âm Linking", "Ngữ điệu câu khẳng định & câu hỏi"] },
    ],
  },
  {
    id: "c6",
    slug: "tieng-anh-cho-tre-em",
    title: "Tiếng Anh Cho Trẻ Em (6-12 tuổi)",
    category: "treem",
    level: "Beginner",
    instructor: "Lisa Wang (Native)",
    instructorRole: "Kids Education Expert",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    price: 1690000,
    originalPrice: 2200000,
    sessions: "20 buổi",
    rating: 5.0,
    reviewsCount: 160,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    shortDesc: "Phương pháp học qua trò chơi và bài hát vui nhộn giúp trẻ phát triển phản xạ tự nhiên từ sớm.",
    fullDesc: "Khóa học kích thích tư duy tiếng Anh sớm cho trẻ em từ 6 đến 12 tuổi thông qua hình ảnh sinh động, bài hát tương tác và giáo trình quốc tế Cambridge Young Learners.",
    modules: [
      { title: "Module 1: Vocabulary & Phonics", lessons: ["Bảng chữ cái & Phonics âm đầu", "Chủ đề Gia đình & Động vật"] },
      { title: "Module 2: Fun Speaking Games", lessons: ["Trò chuyện tương tác với GV bản ngữ"] },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Lê Hoàng Nam",
    role: "Học viên IELTS 7.5",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    content: "Từ 5.5 lên 7.5 IELTS chỉ sau 1 khóa Intensive tại Vanguard! Cô Sarah sửa bài Writing siêu kỹ và chi tiết.",
    rating: 5,
  },
  {
    name: "Phạm Hà Phương",
    role: "Học viên TOEIC 885",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    content: "Thầy Tuấn dạy mẹo làm bài Part 7 đỉnh cực kỳ! Mình đã tăng 250 điểm TOEIC đúng mục tiêu ra trường.",
    rating: 5,
  },
  {
    name: "Trần Đức Anh",
    role: "Senior Developer • Shopee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "Khóa Business English giúp mình tự tin phỏng vấn và làm việc 100% bằng tiếng Anh với sếp Singapore.",
    rating: 5,
  },
];

export default function CoursePlatformHome() {
  const [activeTab, setActiveTab] = useState<"home" | "courses" | "detail" | "about">("home");
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES_DATA[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleEnroll = (courseName: string) => {
    showToast(`🎉 Đăng ký thành công khóa học ${courseName}! Chúng tôi sẽ liên hệ tư vấn trong 24h.`);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast("🎉 Cảm ơn bạn! Vanguard English sẽ liên hệ tư vấn lộ trình học miễn phí qua Email/SĐT.");
    setEmailInput("");
  };

  const openCourseDetail = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredCourses =
    categoryFilter === "all"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === categoryFilter);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-blue-500/20 selection:text-blue-700">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-blue-600 text-white px-6 py-4 font-semibold shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Video Modal Overlay */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-700">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={activeVideoModal}
              title="Course Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* HEADER & NAV */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-2.5 text-left group">
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md shadow-blue-500/20">
              V
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 block leading-none">
                VANGUARD <span className="text-blue-600">ENGLISH</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                Mastery Academy
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-blue-600 transition-colors ${activeTab === "home" ? "text-blue-600" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`hover:text-blue-600 transition-colors ${activeTab === "courses" ? "text-blue-600" : ""}`}
            >
              Khoá Học (6+)
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-blue-600 transition-colors ${activeTab === "about" ? "text-blue-600" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Actions & Admin Portal Link */}
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-xs font-bold text-blue-600 hover:bg-blue-600 hover:text-white">
                🔒 Đăng nhập quản trị
              </Button>
            </Link>

            <Button
              onClick={() => setActiveTab("courses")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs px-4 py-2 shadow-md shadow-blue-500/20"
            >
              Đăng Ký Ngay
            </Button>

            {/* Mobile Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-800">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-lg text-blue-600">
                      VANGUARD ENGLISH
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 font-bold text-slate-800 text-base">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-blue-600">Trang Chủ</button>
                    <button onClick={() => setActiveTab("courses")} className="text-left hover:text-blue-600">Khoá Học</button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-blue-600">Về Chúng Tôi</button>
                    <Link href="/admin" className="text-left text-blue-600 pt-4 border-t">🔒 Trang Quản Trị Admin</Link>
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
          {/* HERO SECTION */}
          <section className="relative pt-12 pb-20 px-4 sm:px-6 bg-gradient-to-b from-blue-50/60 via-slate-50 to-background overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge className="bg-blue-600/10 text-blue-700 border border-blue-600/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    ⚡ CAM KẾT ĐẦU RA IELTS 7.0+ & TOEIC 800+
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    MASTER ENGLISH. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500">
                      DOMINATE YOUR FUTURE.
                    </span>
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    Học tiếng Anh bứt phá cùng cựu giám khảo chấm thi và đội ngũ giảng viên bản ngữ. Phương pháp phản xạ thực chiến giúp bạn thay đổi sự nghiệp và cuộc sống.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => setActiveTab("courses")}
                      className="px-8 py-4 text-sm font-extrabold shadow-xl shadow-blue-500/25 tracking-wide rounded-2xl"
                    >
                      KHAM PHÁ KHOÁ HỌC ✨
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => handleConsultSubmit(new Event("submit") as any)}
                      className="px-7 py-4 border-slate-300 hover:border-blue-600 text-slate-800 text-sm font-bold rounded-2xl"
                    >
                      Học Thử Miễn Phí <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>

                {/* Number Ticker Stats */}
                <BlurFade delay={0.5}>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-blue-600 flex items-center">
                        <NumberTicker value={5420} />+
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Học Viên Đạt Mục Tiêu</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-500 flex items-center">
                        <NumberTicker value={98} />%
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Tỷ Lệ Hài Lòng</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center">
                        <NumberTicker value={50} />+
                      </h3>
                      <p className="text-xs text-slate-500 font-semibold mt-1">Giảng Viên Quốc Tế</p>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Right Column (45%) Hero Visual */}
              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-white shadow-2xl p-3 group">
                    <BorderBeam size={250} duration={10} delay={0} />
                    <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                        alt="Vanguard English Classroom"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      
                      {/* Play Video Button Overlay */}
                      <button
                        onClick={() => setActiveVideoModal("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                        className="absolute inset-0 flex items-center justify-center group/btn"
                      >
                        <div className="h-16 w-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform">
                          <Play className="h-7 w-7 fill-white ml-1" />
                        </div>
                      </button>

                      <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                        <div>
                          <p className="text-xs text-amber-400 font-mono font-bold uppercase">INTRO VIDEO</p>
                          <h3 className="font-heading font-extrabold text-lg">Xem Lộ Trình Bứt Phá</h3>
                        </div>
                        <Badge className="bg-amber-500 text-slate-950 font-bold px-3 py-1 text-xs">
                          2 Phút Trailer
                        </Badge>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* TRUST MARQUEE BAR */}
          <section className="bg-slate-900 text-white py-6 border-y border-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-2">
              <p className="text-center text-[11px] text-slate-400 font-mono uppercase tracking-widest">
                ĐỐI TÁC KHẢO THÍ & CHỨNG CHỈ QUỐC TẾ
              </p>
              <Marquee pauseOnHover className="[--duration:20s]">
                <span className="mx-8 font-heading font-extrabold text-xl text-slate-300 tracking-wider">IELTS BRITISH COUNCIL</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-blue-400 tracking-wider">IDP EDUCATION</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-amber-400 tracking-wider">TOEIC ETS</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-slate-300 tracking-wider">CAMBRIDGE ASSESSMENT</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-emerald-400 tracking-wider">TESOL GLOBAL</span>
              </Marquee>
            </div>
          </section>

          {/* FEATURED COURSES SECTION */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <Badge variant="outline" className="border-blue-600/30 text-blue-600 font-bold text-xs uppercase">
                  FEATURED PROGRAM
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                  Các Khoá Học Nổi Bật
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("courses")}
                className="text-blue-600 hover:text-blue-700 font-bold text-sm"
              >
                Xem Tất Cả 6+ Khoá Học <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COURSES_DATA.slice(0, 3).map((course) => (
                <Card key={course.id} className="bg-white border-slate-200/80 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl">
                  <div className="relative aspect-video overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openCourseDetail(course)}>
                    <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {course.badge && (
                      <Badge className="absolute top-3 left-3 bg-amber-500 text-slate-950 border-none font-bold text-xs px-3 py-1">
                        {course.badge}
                      </Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideoModal(course.videoUrl);
                      }}
                      className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                    >
                      <Play className="h-4 w-4 fill-white ml-0.5" />
                    </button>
                  </div>

                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold">
                          {course.level}
                        </Badge>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span>{course.rating}</span>
                          <span className="text-slate-400">({course.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => openCourseDetail(course)}
                        className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                        {course.shortDesc}
                      </p>

                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <div className="relative h-7 w-7 rounded-full overflow-hidden shrink-0 border">
                          <Image src={course.instructorAvatar} alt={course.instructor} fill className="object-cover" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{course.instructor}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-xl text-blue-600">
                          {course.price.toLocaleString("vi-VN")}đ
                        </span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-400 line-through block">
                            {course.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleEnroll(course.title)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs px-4 py-2"
                      >
                        Đăng Ký Ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* WHY CHOOSE US GRID */}
          <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-blue-400/40 text-blue-400 font-bold text-xs uppercase">
                  WHY CHOOSE VANGUARD
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Tại Sao 5.000+ Học Viên Chọn Chúng Tôi?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/5 border-white/10 text-white p-6 space-y-3 rounded-3xl">
                  <div className="h-12 w-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">Lộ Trình Cá Nhân Hóa</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Thiết kế lộ trình học riêng biệt bám sát trình độ và mục tiêu điểm số.</p>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white p-6 space-y-3 rounded-3xl">
                  <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">Giảng Viên Bản Ngữ</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">100% Giảng viên có chứng chỉ TESOL/CELTA và cựu giám khảo IELTS.</p>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white p-6 space-y-3 rounded-3xl">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">Học Mọi Lúc Mọi Nơi</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Hệ thống bài giảng Online kết hợp lớp học tương tác trực tiếp 24/7.</p>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white p-6 space-y-3 rounded-3xl">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">Cam Kết Đầu Ra</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Hợp đồng cam kết đầu ra bằng văn bản (IELTS 7.0+, TOEIC 800+).</p>
                </Card>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS MARQUEE */}
          <section className="py-20 px-4 sm:px-6 overflow-hidden bg-slate-50">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-blue-600/30 text-blue-600 font-bold text-xs uppercase">
                  SUCCESS STORIES
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">Học Viên Nói Gì Về Vanguard</h2>
              </div>

              <Marquee pauseOnHover className="[--duration:25s]">
                {TESTIMONIALS.map((rev, idx) => (
                  <Card key={idx} className="w-80 sm:w-96 bg-white border-slate-200 p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-3xl">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">"{rev.content}"</p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-blue-600">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900">{rev.name}</h4>
                        <p className="text-[10px] text-blue-600 font-bold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>

          {/* FULL-WIDTH CTA SECTION */}
          <section className="py-20 px-4 sm:px-6 bg-blue-600 text-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold">
                Bắt Đầu Hành Trình Chinh Phục Tiếng Anh Ngay Hôm Nay
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto">
                Nhận ngay tư vấn lộ trình học cá nhân hóa và kiểm tra trình độ miễn phí cùng chuyên gia.
              </p>
              <form onSubmit={handleConsultSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <Input
                  placeholder="Nhập Email hoặc SĐT của bạn..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white text-slate-900 placeholder:text-slate-400 rounded-2xl h-12 text-sm font-medium"
                />
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-2xl h-12 px-6 text-sm shrink-0 shadow-lg">
                  NHẬN TƯ VẤN MIỄN PHÍ
                </Button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: COURSES CATALOG PAGE */}
      {activeTab === "courses" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-blue-600/30 text-blue-600 font-bold text-xs uppercase">
              ALL COURSES
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
              Danh Sách Khoá Học Dành Cho Bạn
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              Lựa chọn khoá học phù hợp với mục tiêu bứt phá điểm số và sự nghiệp của bạn.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              onClick={() => setCategoryFilter("all")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "all" ? "bg-blue-600 text-white" : ""}`}
            >
              Tất Cả (6)
            </Button>
            <Button
              variant={categoryFilter === "ielts" ? "default" : "outline"}
              onClick={() => setCategoryFilter("ielts")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "ielts" ? "bg-blue-600 text-white" : ""}`}
            >
              IELTS Academic
            </Button>
            <Button
              variant={categoryFilter === "toeic" ? "default" : "outline"}
              onClick={() => setCategoryFilter("toeic")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "toeic" ? "bg-blue-600 text-white" : ""}`}
            >
              TOEIC Luyện Đề
            </Button>
            <Button
              variant={categoryFilter === "giaotiep" ? "default" : "outline"}
              onClick={() => setCategoryFilter("giaotiep")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "giaotiep" ? "bg-blue-600 text-white" : ""}`}
            >
              Giao Tiếp & Phát Âm
            </Button>
            <Button
              variant={categoryFilter === "business" ? "default" : "outline"}
              onClick={() => setCategoryFilter("business")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "business" ? "bg-blue-600 text-white" : ""}`}
            >
              Business English
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white border-slate-200/80 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl">
                <div className="relative aspect-video overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openCourseDetail(course)}>
                  <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {course.badge && (
                    <Badge className="absolute top-3 left-3 bg-amber-500 text-slate-950 border-none font-bold text-xs px-3 py-1">
                      {course.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold">
                        {course.level}
                      </Badge>
                      <span className="text-slate-500 font-medium">{course.sessions}</span>
                    </div>

                    <h3
                      onClick={() => openCourseDetail(course)}
                      className="font-heading font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {course.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="font-heading font-extrabold text-xl text-blue-600">
                        {course.price.toLocaleString("vi-VN")}đ
                      </span>
                      {course.originalPrice && (
                        <span className="text-xs text-slate-400 line-through block">
                          {course.originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleEnroll(course.title)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs px-4 py-2"
                    >
                      Đăng Ký Ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      )}

      {/* VIEW 3: COURSE DETAIL PAGE */}
      {activeTab === "detail" && selectedCourse && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-600 text-white font-bold px-3 py-1">
                  {selectedCourse.category.toUpperCase()} • {selectedCourse.level}
                </Badge>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
                  {selectedCourse.title}
                </h1>
                <p className="text-slate-600 text-base leading-relaxed">
                  {selectedCourse.shortDesc}
                </p>
              </div>

              {/* Course Intro Video Box */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
                <Image src={selectedCourse.image} alt={selectedCourse.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideoModal(selectedCourse.videoUrl)}
                    className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="h-7 w-7 fill-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Tabs Content */}
              <Tabs defaultValue="overview" className="w-full pt-4">
                <TabsList className="bg-slate-100 rounded-2xl p-1.5 grid grid-cols-3">
                  <TabsTrigger value="overview" className="font-bold text-xs sm:text-sm">Giới Thiệu</TabsTrigger>
                  <TabsTrigger value="curriculum" className="font-bold text-xs sm:text-sm">Chương Trình Học</TabsTrigger>
                  <TabsTrigger value="instructor" className="font-bold text-xs sm:text-sm">Giảng Viên</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6 text-sm text-slate-700 leading-relaxed space-y-4">
                  <p>{selectedCourse.fullDesc}</p>
                </TabsContent>

                <TabsContent value="curriculum" className="pt-6 space-y-4">
                  {selectedCourse.modules.map((mod, idx) => (
                    <Card key={idx} className="p-5 border border-slate-200 rounded-2xl bg-white space-y-3">
                      <h4 className="font-heading font-bold text-base text-slate-900">{mod.title}</h4>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="pt-6">
                  <Card className="p-6 border border-slate-200 rounded-3xl bg-white flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-blue-600 shrink-0">
                      <Image src={selectedCourse.instructorAvatar} alt={selectedCourse.instructor} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-slate-900">{selectedCourse.instructor}</h3>
                      <p className="text-xs font-bold text-blue-600">{selectedCourse.instructorRole}</p>
                      <p className="text-xs text-slate-500 mt-1">Nhiều năm kinh nghiệm đào tạo học viên đạt chứng chỉ quốc tế.</p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4">
              <Card className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xl space-y-6 sticky top-24">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-mono font-bold">HỌC PHÍ KHOÁ HỌC</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading font-extrabold text-3xl text-blue-600">
                      {selectedCourse.price.toLocaleString("vi-VN")}đ
                    </span>
                    {selectedCourse.originalPrice && (
                      <span className="text-slate-400 line-through text-base">
                        {selectedCourse.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>

                <ShimmerButton
                  onClick={() => handleEnroll(selectedCourse.title)}
                  className="w-full py-4 text-sm font-extrabold bg-blue-600 text-white rounded-2xl shadow-lg"
                >
                  ĐĂNG KÝ HỌC NGAY 🚀
                </ShimmerButton>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Thời lượng: <b>{selectedCourse.sessions}</b></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Tài liệu học tập PDF bản quyền</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Nhóm hỗ trợ chữa bài 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Chứng chỉ hoàn thành khoá học</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: ABOUT PAGE */}
      {activeTab === "about" && (
        <main className="py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <Badge className="bg-blue-600 text-white font-bold px-3 py-1">ABOUT VANGUARD</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900">
              Sứ Mệnh Nâng Tầm Tiếng Anh Người Việt
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Vanguard English Academy được thành lập với mục tiêu mang lại giải pháp đào tạo ngoại ngữ thực chiến chuẩn quốc tế, giúp người Việt tự tin chinh phục giấc mơ học tập và sự nghiệp toàn cầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-slate-200 rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mx-auto">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Tự Tin Giao Tiếp</h3>
              <p className="text-xs text-slate-500">Phản xạ tự nhiên 100% tiếng Anh không cần dịch nhẩm.</p>
            </Card>

            <Card className="p-6 bg-white border border-slate-200 rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Bứt Phá Điểm Số</h3>
              <p className="text-xs text-slate-500">Cam kết đầu ra bằng hợp đồng văn bản IELTS 7.0+ & TOEIC 800+.</p>
            </Card>

            <Card className="p-6 bg-white border border-slate-200 rounded-3xl text-center space-y-3 shadow-xs">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Hội Nhập Toàn Cầu</h3>
              <p className="text-xs text-slate-500">Tự tin phỏng vấn công ty tập đoàn lớn và du học quốc tế.</p>
            </Card>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-2xl text-white block">
              VANGUARD <span className="text-blue-500">ENGLISH</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC và giao tiếp công sở.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Khoá Học Hot</h4>
            <p onClick={() => setActiveTab("courses")} className="hover:text-blue-400 cursor-pointer">IELTS Academic 7.0+</p>
            <p onClick={() => setActiveTab("courses")} className="hover:text-blue-400 cursor-pointer">TOEIC 800+ Thực Chiến</p>
            <p onClick={() => setActiveTab("courses")} className="hover:text-blue-400 cursor-pointer">Business English Văn Phòng</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Liên Hệ & Hỗ Trợ</h4>
            <p className="hover:text-blue-400 cursor-pointer">Hotline: 1900 1234</p>
            <p className="hover:text-blue-400 cursor-pointer">Email: contact@vanguard-english.edu.vn</p>
            <p className="hover:text-blue-400 cursor-pointer">Địa chỉ: 108 Nguyễn Trãi, Q.5, TP.HCM</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Đăng Nhập Quản Trị</h4>
            <p className="text-slate-400">Dành cho Quản trị viên trung tâm demo hệ thống.</p>
            <Link href="/admin">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl w-full">
                🔒 Trang Quản Trị Admin
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 VANGUARD ENGLISH Mastery Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="hover:text-blue-400 font-mono">🔒 Đăng nhập quản trị</Link>
            <p className="text-blue-400 font-mono">WSOS Studio Showcase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
