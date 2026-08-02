"use client";

import React, { useState, useEffect } from "react";
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
  Zap,
  Flame,
  Check,
  ChevronDown,
  Calendar,
  HeartHandshake,
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
  studentCount: number;
  badge?: string;
  badgeType?: "orange" | "cyan" | "violet";
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
    studentCount: 1284,
    badge: "Best Seller",
    badgeType: "orange",
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
    studentCount: 890,
    badge: "Mới",
    badgeType: "cyan",
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
    studentCount: 1450,
    badge: "Hot",
    badgeType: "violet",
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
    studentCount: 620,
    badge: "Phổ biến",
    badgeType: "violet",
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
    studentCount: 540,
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
    studentCount: 780,
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

const TESTIMONIALS_ROW1 = [
  {
    name: "Lê Hoàng Nam",
    role: "Học viên IELTS 7.5",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    content: "Từ 5.5 lên 7.5 IELTS chỉ sau 1 khóa Intensive tại Vanguard! Cô Sarah sửa bài Writing siêu kỹ và chi tiết.",
    rating: 5,
    scoreBadge: "IELTS 7.5",
  },
  {
    name: "Phạm Hà Phương",
    role: "Học viên TOEIC 885",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    content: "Thầy Tuấn dạy mẹo làm bài Part 7 đỉnh cực kỳ! Mình đã tăng 250 điểm TOEIC đúng mục tiêu ra trường.",
    rating: 5,
    scoreBadge: "TOEIC 885",
  },
  {
    name: "Trần Đức Anh",
    role: "Senior Developer • Shopee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    content: "Khóa Business English giúp mình tự tin phỏng vấn và làm việc 100% bằng tiếng Anh với sếp Singapore.",
    rating: 5,
  },
];

const TESTIMONIALS_ROW2 = [
  {
    name: "Nguyễn Bảo Ngọc",
    role: "Học viên IELTS 8.0",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "Chiến thuật làm Speaking Part 3 của Vanguard giúp mình đạt 8.0 Speaking ngay trong lần thi đầu tiên!",
    rating: 5,
    scoreBadge: "IELTS 8.0 🔥",
  },
  {
    name: "Vũ Hải Đăng",
    role: "Product Manager • VNG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    content: "Môi trường học năng lượng bứt phá. Giảng viên luôn truyền cảm hứng tự tin phản xạ không ngại sai.",
    rating: 5,
  },
  {
    name: "Hoàng Khánh Linh",
    role: "Du học sinh Anh",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    content: "Lộ trình cá nhân hóa sát thực tế. Mình đã xin thành công học bổng 70% đại học Manchester!",
    rating: 5,
    scoreBadge: "Học Bổng UK 70%",
  },
];

const INSTRUCTORS_LIST = [
  {
    name: "Sarah Johnson",
    role: "Senior IELTS Examiner",
    flag: "🇬🇧",
    expertise: "IELTS Academic 8.5+, Speaking & Writing",
    quote: "Tôi tin mỗi học viên đều có thể chinh phục IELTS 7.0+ khi có phương pháp đúng.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    accentColor: "border-[#7C3AED]",
  },
  {
    name: "Nguyễn Minh Tuấn",
    role: "TOEIC 990 Full Score",
    flag: "🇻🇳",
    expertise: "TOEIC Luyện Đề, Bẫy Đề Thi Thực Chiến",
    quote: "Học thực chiến, làm bài thi thật — không học vẹt hay mẹo suông.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    accentColor: "border-[#F97316]",
  },
  {
    name: "Emily Chen",
    role: "TESOL Master Certified",
    flag: "🇺🇸",
    expertise: "Giao Tiếp Phản Xạ 100% Tiếng Anh",
    quote: "Hãy ngừng dịch nhẩm trong đầu. Hãy nói tiếng Anh bằng sự tự tin nhất của bạn.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    accentColor: "border-[#06B6D4]",
  },
];

const TIMELINE_MILESTONES = [
  { year: "2020", title: "Thành Lập Studio EdTech", desc: "Khởi đầu với 2 giảng viên bản ngữ tâm huyết tại TP.HCM." },
  { year: "2021", title: "Ra Mắt IELTS Intensive", desc: "Tiên phong lộ trình cá nhân hoá cam kết đầu ra 7.0+." },
  { year: "2022", title: "1.000 Học Viên Đầu Tiên", desc: "Mở rộng mảng TOEIC 800+ và Business English công sở." },
  { year: "2023", title: "Đối Tác British Council & IDP", desc: "Chính thức trở thành điểm đăng ký thi IELTS uy tín." },
  { year: "2024", title: "3.000 Học Viên & App Online", desc: "Số hoá bài giảng tương tác 24/7 trên đa nền tảng." },
  { year: "2025", title: "Top 1 Trung Tâm EdTech HCM", desc: "Đạt giải thưởng Đổi mới sáng tạo trong giáo dục ngoại ngữ." },
  { year: "2026", title: "5.000+ Học Viên & 50+ Giảng Viên", desc: "Khẳng định vị thế hàng đầu với tỷ lệ 98% hài lòng." },
];

export default function ElectricCampusHome() {
  const [activeTab, setActiveTab] = useState<"home" | "courses" | "detail" | "about">("home");
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES_DATA[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("popular");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Top Scroll Progress Bar Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  let filteredCourses =
    categoryFilter === "all"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === categoryFilter);

  if (sortOption === "price_asc") {
    filteredCourses = [...filteredCourses].sort((a, b) => a.price - b.price);
  } else if (sortOption === "newest") {
    filteredCourses = [...filteredCourses].sort((a, b) => (b.badge === "Mới" ? 1 : -1));
  }

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans selection:bg-[#7C3AED]/20 selection:text-[#7C3AED]">
      {/* 10. Top Scroll Progress Bar (3px gradient violet to orange) */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#F97316] z-50 transition-all duration-150 pointer-events-none"
      />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-[#7C3AED] text-white px-6 py-4 font-semibold shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F97316]" />
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

      {/* 1. HEADER & NAV — NO ADMIN LINK ON HEADER! */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-2.5 text-left group">
            <div className="h-11 w-11 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center font-heading font-extrabold text-2xl shadow-lg shadow-[#7C3AED]/25">
              V
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#0F172A] block leading-none">
                VANGUARD <span className="text-[#7C3AED]">ENGLISH</span>
              </span>
              <span className="text-[10px] text-[#F97316] font-mono tracking-widest uppercase font-bold">
                Electric Campus
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#0F172A]">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-[#7C3AED] transition-colors ${activeTab === "home" ? "text-[#7C3AED]" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`hover:text-[#7C3AED] transition-colors ${activeTab === "courses" ? "text-[#7C3AED]" : ""}`}
            >
              Khoá Học (6+)
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-[#7C3AED] transition-colors ${activeTab === "about" ? "text-[#7C3AED]" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Header Action: NO ADMIN LINK, ONLY LOGO | MENU | REGISTER */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setActiveTab("courses")}
              className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold rounded-2xl text-xs px-5 py-2.5 shadow-lg shadow-[#7C3AED]/25"
            >
              Đăng Ký Ngay
            </Button>

            {/* Mobile Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#0F172A]">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#FAFAFA]">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-lg text-[#7C3AED]">
                      VANGUARD ENGLISH
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 font-bold text-[#0F172A] text-base">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#7C3AED]">Trang Chủ</button>
                    <button onClick={() => setActiveTab("courses")} className="text-left hover:text-[#7C3AED]">Khoá Học</button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#7C3AED]">Về Chúng Tôi</button>
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
          {/* 2. HERO SECTION — GEOMETRIC SHAPES, AMBIENT GRADIENT BLOB & FLOATING BADGES */}
          <section className="relative pt-12 pb-24 px-4 sm:px-6 bg-[#FAFAFA] overflow-hidden">
            {/* Ambient Radial Gradient Blob behind hero */}
            <div
              style={{
                background: "radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
              }}
              className="absolute inset-0 pointer-events-none blur-3xl"
            />

            {/* 3-5 Rotating Geometric Accent Shapes */}
            <div className="absolute top-10 left-12 h-8 w-8 border-2 border-[#7C3AED]/30 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="absolute top-36 left-1/4 w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-[#F97316]/30 border-r-[12px] border-r-transparent animate-[spin_15s_linear_infinite] pointer-events-none" />
            <div className="absolute bottom-16 left-16 h-6 w-6 bg-[#06B6D4]/20 rounded-md animate-[spin_25s_linear_infinite] pointer-events-none" />
            <div className="absolute top-16 right-1/3 h-5 w-5 border-2 border-[#F97316]/30 rotate-45 animate-[spin_18s_linear_infinite] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge className="bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/30 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider">
                    🔥 CAM KẾT ĐẦU RA IELTS 7.0+ & TOEIC 800+
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08] uppercase">
                    CHINH PHỤC TIẾNG ANH. <br />
                    <span className="bg-gradient-to-r from-[#7C3AED] to-[#F97316] bg-clip-text text-transparent block mt-1">
                      THAY ĐỔI TƯƠNG LAI.
                    </span>
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-[#64748B] text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium">
                    Hệ sinh thái đào tạo ngôn ngữ thế hệ mới. Học trực tiếp với cựu giám khảo chấm thi và giảng viên bản ngữ trong môi trường tràn đầy năng lượng bứt phá.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => setActiveTab("courses")}
                      className="px-9 py-4 text-sm font-extrabold bg-[#7C3AED] text-white shadow-xl shadow-[#7C3AED]/25 tracking-wide rounded-full"
                    >
                      KHAM PHÁ KHOÁ HỌC ✨
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => handleConsultSubmit(new Event("submit") as any)}
                      className="px-8 py-4 border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white text-sm font-extrabold rounded-full transition-all"
                    >
                      Học Thử Miễn Phí <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>

                {/* 3 Inline Stat NumberTickers */}
                <BlurFade delay={0.5}>
                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E2E8F0]">
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7C3AED] flex items-center">
                        <NumberTicker value={5420} />+
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Học Viên Đạt Mục Tiêu</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F97316] flex items-center">
                        <NumberTicker value={98} />%
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Tỷ Lệ Hài Lòng</p>
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#06B6D4] flex items-center">
                        <NumberTicker value={50} />+
                      </h3>
                      <p className="text-xs text-[#64748B] font-semibold mt-1">Giảng Viên Quốc Tế</p>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Right Column (45%) Hero Visual + 3 Floating Badges */}
              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative mx-auto max-w-md">
                    <div className="relative h-[380px] sm:h-[450px] w-full rounded-[40px] overflow-hidden bg-white border-2 border-[#7C3AED]/30 shadow-2xl group">
                      <BorderBeam size={240} duration={10} delay={0} colorFrom="#7C3AED" colorTo="#F97316" />
                      <Image
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                        alt="Vanguard Electric Campus"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />

                      {/* Play Video Button Overlay */}
                      <button
                        onClick={() => setActiveVideoModal("https://www.youtube.com/embed/dQw4w9WgXcQ")}
                        className="absolute inset-0 flex items-center justify-center group/btn"
                      >
                        <div className="h-16 w-16 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-2xl group-hover/btn:scale-110 transition-transform">
                          <Play className="h-7 w-7 fill-white ml-1" />
                        </div>
                      </button>
                    </div>

                    {/* 3 Floating Badges (Float Up-Down Animation) */}
                    <div className="absolute -top-4 -left-4 bg-white border-2 border-[#7C3AED] p-3 rounded-2xl shadow-xl flex items-center gap-2 animate-[bounce_3.5s_infinite]">
                      <div className="h-8 w-8 rounded-xl bg-[#F97316]/20 flex items-center justify-center text-[#F97316] font-bold text-xs">
                        ⭐
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748B] font-mono font-bold">EXCELLENCE</p>
                        <p className="text-xs font-extrabold text-[#0F172A]">IELTS 8.5</p>
                      </div>
                    </div>

                    <div className="absolute top-1/2 -right-6 bg-[#F97316]/10 border border-[#F97316]/40 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-2 animate-[bounce_4s_infinite]">
                      <div className="h-8 w-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center">
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#F97316] font-mono font-bold">AWARD</p>
                        <p className="text-xs font-extrabold text-[#0F172A]">Top 1 HCM</p>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 left-6 bg-[#7C3AED]/10 border border-[#7C3AED]/40 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-2 animate-[bounce_3s_infinite]">
                      <div className="h-8 w-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#7C3AED] font-mono font-bold">ALUMNI</p>
                        <p className="text-xs font-extrabold text-[#0F172A]">5.420+ Học Viên</p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* TRUST BAR — MARQUEE ON COOL GRAY */}
          <section className="bg-[#F1F5F9] text-[#0F172A] py-6 border-y border-[#E2E8F0] overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-2">
              <p className="text-center text-[11px] text-[#64748B] font-mono uppercase tracking-widest font-bold">
                ĐỐI TÁC & CHỨNG CHỈ QUỐC TẾ
              </p>
              <Marquee pauseOnHover className="[--duration:25s]">
                <span className="mx-8 font-heading font-extrabold text-xl text-[#0F172A] tracking-wider">IELTS BRITISH COUNCIL</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#7C3AED] tracking-wider">IDP EDUCATION</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#F97316] tracking-wider">TOEIC ETS</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#06B6D4] tracking-wider">CAMBRIDGE ASSESSMENT</span>
                <span className="mx-8 font-heading font-extrabold text-xl text-[#0F172A] tracking-wider">TESOL GLOBAL</span>
              </Marquee>
            </div>
          </section>

          {/* 3. FEATURED COURSES — BORDER BEAM ON BEST SELLER + STARS & STUDENT COUNT */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 font-extrabold text-xs uppercase px-3 py-1">
                  FEATURED PROGRAM
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-2 uppercase">
                  Khoá Học Nổi Bật Dành Cho Bạn
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("courses")}
                className="text-[#7C3AED] hover:text-[#7C3AED]/80 font-bold text-sm"
              >
                Xem Tất Cả 6+ Khoá Học <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Card 1: Best Seller Double-Sized Focal Point + BorderBeam Effect */}
              <Card className="lg:col-span-8 bg-white border-2 border-[#7C3AED]/40 hover:border-[#7C3AED] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden shadow-xl rounded-3xl group flex flex-col md:flex-row relative">
                <BorderBeam size={220} duration={8} delay={0} colorFrom="#7C3AED" colorTo="#F97316" />

                <div className="relative md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-[#F1F5F9] cursor-pointer" onClick={() => openCourseDetail(COURSES_DATA[0])}>
                  <Image
                    src={COURSES_DATA[0].image}
                    alt={COURSES_DATA[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-[#F97316] text-white border-none font-extrabold text-xs px-3 py-1 rounded-full shadow-md">
                    🔥 BEST SELLER
                  </Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideoModal(COURSES_DATA[0].videoUrl);
                    }}
                    className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </button>
                </div>

                <CardContent className="md:w-1/2 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold">
                        {COURSES_DATA[0].level}
                      </Badge>
                      <div className="flex items-center gap-1 text-[#F97316] font-bold">
                        <Star className="h-3.5 w-3.5 fill-[#F97316]" />
                        <span>{COURSES_DATA[0].rating}</span>
                        <span className="text-[#64748B]">({COURSES_DATA[0].reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => openCourseDetail(COURSES_DATA[0])}
                      className="font-heading font-extrabold text-xl text-[#0F172A] group-hover:text-[#7C3AED] transition-colors cursor-pointer"
                    >
                      {COURSES_DATA[0].title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                      {COURSES_DATA[0].shortDesc}
                    </p>

                    <p className="text-[11px] text-[#7C3AED] font-bold">
                      👨‍🎓 1.284 học viên đã đăng ký
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-[#E2E8F0]">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden shrink-0 border border-[#7C3AED]">
                        <Image src={COURSES_DATA[0].instructorAvatar} alt={COURSES_DATA[0].instructor} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-bold text-[#0F172A]">{COURSES_DATA[0].instructor}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <div>
                      <span className="font-heading font-extrabold text-2xl text-[#7C3AED]">
                        {COURSES_DATA[0].price.toLocaleString("vi-VN")}đ
                      </span>
                      {COURSES_DATA[0].originalPrice && (
                        <span className="text-xs text-[#64748B] line-through block">
                          {COURSES_DATA[0].originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleEnroll(COURSES_DATA[0].title)}
                      className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold rounded-full text-xs px-5 py-2.5 shadow-md"
                    >
                      Đăng Ký Ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Cards 2 & 3 Stacked Right */}
              <div className="lg:col-span-4 space-y-6">
                {COURSES_DATA.slice(1, 3).map((course) => (
                  <Card key={course.id} className="bg-white border border-[#E2E8F0] hover:border-[#7C3AED]/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg rounded-3xl group">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <Badge className={`font-bold border-none ${course.badgeType === "cyan" ? "bg-[#06B6D4] text-white" : "bg-[#7C3AED] text-white"}`}>
                          {course.badge}
                        </Badge>
                        <div className="flex items-center gap-1 text-[#F97316] font-bold">
                          <Star className="h-3 w-3 fill-[#F97316]" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => openCourseDetail(course)}
                        className="font-heading font-extrabold text-base text-[#0F172A] group-hover:text-[#7C3AED] transition-colors cursor-pointer line-clamp-1"
                      >
                        {course.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {course.shortDesc}
                      </p>

                      <p className="text-[11px] text-[#64748B]">👨‍🎓 {course.studentCount} học viên</p>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                        <span className="font-heading font-extrabold text-base text-[#7C3AED]">{course.price.toLocaleString("vi-VN")}đ</span>
                        <Button
                          size="sm"
                          onClick={() => handleEnroll(course.title)}
                          className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold rounded-full text-[11px] px-3.5 py-1"
                        >
                          Đăng Ký
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 4. "WHY CHOOSE US" — BENTO GRID WITH WATERMARK STAMP & CORNER IMAGE */}
          <section className="py-20 px-4 sm:px-6 bg-[#F1F5F9] border-y border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 font-extrabold text-xs uppercase px-3 py-1">
                  ELECTRIC ADVANTAGE
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] uppercase">
                  Tại Sao 5.000+ Học Viên Chọn Vanguard?
                </h2>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bento Item 1 (Large 2 Col with Corner Image) */}
                <Card className="md:col-span-2 bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3 max-w-md">
                      <div className="h-12 w-12 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
                        <Target className="h-8 w-8 text-[#7C3AED]" />
                      </div>
                      <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">🎯 Lộ Trình Cá Nhân Hoá Chuẩn Đỉnh Cao</h3>
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        Thiết kế lộ trình học riêng biệt bám sát năng lực thực tế. Mỗi học viên có cố vấn học tập theo sát 1-1 để điều chỉnh chiến thuật làm bài hàng tuần.
                      </p>
                    </div>
                    <div className="hidden sm:block relative h-36 w-36 rounded-2xl overflow-hidden shrink-0 border border-[#E2E8F0] shadow-md">
                      <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=300&auto=format&fit=crop" alt="Student" fill className="object-cover" />
                    </div>
                  </div>
                </Card>

                {/* Bento Item 2 */}
                <Card className="bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-2xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
                    <Globe className="h-8 w-8 text-[#F97316]" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">👨‍🏫 50+ Giảng Viên Quốc Tế</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    100% Giảng viên bản ngữ đến từ 8 quốc gia có chứng chỉ TESOL/CELTA và cựu giám khảo chấm thi IELTS.
                  </p>
                </Card>

                {/* Bento Item 3 */}
                <Card className="bg-white border border-[#E2E8F0] p-8 space-y-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-2xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center">
                    <Clock className="h-8 w-8 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">📱 Học Mọi Lúc Mọi Nơi</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Lớp học trực tiếp tương tác 24/7 kết hợp kho bài giảng Online sinh động học trên máy tính và điện thoại.
                  </p>
                </Card>

                {/* Bento Item 4 (Focal Point Electric Violet Background + Watermark Stamp) */}
                <Card className="md:col-span-2 bg-[#7C3AED] text-white p-8 space-y-4 rounded-3xl shadow-xl relative overflow-hidden">
                  {/* Watermark Stamp Behind */}
                  <div className="absolute -right-10 -bottom-10 text-white/10 font-heading font-extrabold text-7xl select-none -rotate-12 pointer-events-none">
                    HOÀN TIỀN 100%
                  </div>

                  <div className="relative z-10 space-y-3">
                    <div className="h-12 w-12 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                      <ShieldCheck className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-white">🏆 Cam Kết Đầu Ra IELTS 7.0+ / TOEIC 800+</h3>
                    <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                      Ký hợp đồng cam kết bằng văn bản có giá trị pháp lý. Học viên không đạt điểm mục tiêu được học lại 100% hoàn toàn miễn phí cho tới khi đạt.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* 5. INSTRUCTORS WITH LARGER PHOTO & ACCENT BORDERS */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 font-extrabold text-xs uppercase px-3 py-1">
                EXPERT FACULTY
              </Badge>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] uppercase">
                Đội Ngũ Giảng Viên Tiêu Biểu
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INSTRUCTORS_LIST.map((ins, idx) => (
                <Card key={idx} className={`bg-white border-l-4 ${ins.accentColor} border-y border-r border-[#E2E8F0] p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4`}>
                  <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-[#F1F5F9]">
                    <Image src={ins.image} alt={ins.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-extrabold text-xl text-[#0F172A]">{ins.name}</h3>
                      <span className="text-2xl">{ins.flag}</span>
                    </div>
                    <p className="text-xs font-bold text-[#7C3AED]">{ins.role}</p>
                    <p className="text-xs text-[#64748B] font-medium">{ins.expertise}</p>
                  </div>

                  <p className="text-xs italic text-[#0F172A] bg-[#F1F5F9] p-3 rounded-xl border border-[#E2E8F0]">
                    "{ins.quote}"
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* 6. TESTIMONIALS — 2-ROW OPPOSITE MARQUEE WITH LARGE GRADIENT BADGES */}
          <section className="py-20 px-4 sm:px-6 overflow-hidden bg-[#F1F5F9] border-y border-[#E2E8F0]">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="text-center space-y-3">
                <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 font-extrabold text-xs uppercase px-3 py-1">
                  STUDENT REVIEWS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] uppercase">
                  Cảm Nhận Từ Học Viên Vanguard
                </h2>
              </div>

              {/* Row 1: Left to Right */}
              <Marquee pauseOnHover className="[--duration:25s]">
                {TESTIMONIALS_ROW1.map((rev, idx) => (
                  <Card key={idx} className="w-80 sm:w-96 bg-white border border-[#E2E8F0] p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-3xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#F97316]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#F97316]" />
                          ))}
                        </div>
                        {rev.scoreBadge && (
                          <Badge className="bg-gradient-to-r from-[#7C3AED] to-[#F97316] text-white font-extrabold text-xs px-3 py-1 shadow-md">
                            {rev.scoreBadge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#0F172A] italic leading-relaxed">"{rev.content}"</p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border-2 border-[#7C3AED]">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#0F172A]">{rev.name}</h4>
                        <p className="text-[10px] text-[#7C3AED] font-bold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>

              {/* Row 2: Right to Left (reverse) */}
              <Marquee reverse pauseOnHover className="[--duration:25s]">
                {TESTIMONIALS_ROW2.map((rev, idx) => (
                  <Card key={idx} className="w-80 sm:w-96 bg-white border border-[#E2E8F0] p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-3xl">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex text-[#F97316]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#F97316]" />
                          ))}
                        </div>
                        {rev.scoreBadge && (
                          <Badge className="bg-gradient-to-r from-[#7C3AED] to-[#F97316] text-white font-extrabold text-xs px-3 py-1 shadow-md">
                            {rev.scoreBadge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#0F172A] italic leading-relaxed">"{rev.content}"</p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#E2E8F0]">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border-2 border-[#F97316]">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#0F172A]">{rev.name}</h4>
                        <p className="text-[10px] text-[#F97316] font-bold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>

          {/* 7. FINAL CTA SECTION — LARGER WHITE BUTTON + SOCIAL PROOF NUMBERTICKER */}
          <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#F97316] text-white relative overflow-hidden shadow-2xl">
            <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
              <Badge className="bg-white/20 text-white border-none text-xs font-extrabold uppercase px-4 py-1.5 rounded-full">
                ⚡ CAM KẾT ĐẦU RA BẰNG HỢP ĐỒNG VĂN BẢN
              </Badge>

              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold uppercase leading-tight">
                BẮT ĐẦU HÀNH TRÌNH CHINH PHỤC TIẾNG ANH NGAY HÔM NAY
              </h2>
              <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto font-medium">
                Nhận ngay tư vấn lộ trình học cá nhân hoá và kiểm tra trình độ miễn phí cùng chuyên gia.
              </p>

              <form onSubmit={handleConsultSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
                <Input
                  placeholder="Nhập Email hoặc SĐT của bạn..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-white text-[#0F172A] placeholder:text-[#64748B] rounded-full h-12 text-sm font-medium border-none px-6"
                />
                <Button type="submit" className="bg-white text-[#7C3AED] hover:bg-slate-100 font-extrabold rounded-full h-12 px-8 text-sm shrink-0 shadow-xl transition-all">
                  NHẬN TƯ VẤN MIỄN PHÍ
                </Button>
              </form>

              <p className="text-xs font-bold text-white/80 pt-2 flex items-center justify-center gap-1">
                <span>🔥</span> <NumberTicker value={247} /> <span>người đã đăng ký trong tuần này</span>
              </p>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: COURSES CATALOG PAGE */}
      {activeTab === "courses" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold text-xs uppercase px-3 py-1">
                ALL COURSES
              </Badge>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A] uppercase">
                Danh Sách Khoá Học Dành Cho Bạn (6+ Khoá)
              </h1>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#64748B]">Sắp xếp:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-10 px-3 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#7C3AED]"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="newest">Mới nhất</option>
                <option value="price_asc">Giá thấp → cao</option>
              </select>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              onClick={() => setCategoryFilter("all")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "all" ? "bg-[#7C3AED] text-white" : ""}`}
            >
              Tất Cả (6)
            </Button>
            <Button
              variant={categoryFilter === "ielts" ? "default" : "outline"}
              onClick={() => setCategoryFilter("ielts")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "ielts" ? "bg-[#7C3AED] text-white" : ""}`}
            >
              IELTS Academic
            </Button>
            <Button
              variant={categoryFilter === "toeic" ? "default" : "outline"}
              onClick={() => setCategoryFilter("toeic")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "toeic" ? "bg-[#7C3AED] text-white" : ""}`}
            >
              TOEIC Luyện Đề
            </Button>
            <Button
              variant={categoryFilter === "giaotiep" ? "default" : "outline"}
              onClick={() => setCategoryFilter("giaotiep")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "giaotiep" ? "bg-[#7C3AED] text-white" : ""}`}
            >
              Giao Tiếp & Phát Âm
            </Button>
            <Button
              variant={categoryFilter === "business" ? "default" : "outline"}
              onClick={() => setCategoryFilter("business")}
              className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "business" ? "bg-[#7C3AED] text-white" : ""}`}
            >
              Business English
            </Button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-white border border-[#E2E8F0] hover:border-[#7C3AED]/50 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl shadow-sm">
                <div className="relative aspect-video overflow-hidden bg-[#F1F5F9] cursor-pointer" onClick={() => openCourseDetail(course)}>
                  <Image src={course.image} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {course.badge && (
                    <Badge className="absolute top-3 left-3 bg-[#F97316] text-white border-none font-bold text-xs px-3 py-1">
                      {course.badge}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold">
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-[#F97316] font-bold">
                        <Star className="h-3.5 w-3.5 fill-[#F97316]" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => openCourseDetail(course)}
                      className="font-heading font-extrabold text-lg text-[#0F172A] group-hover:text-[#7C3AED] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2 mt-2 leading-relaxed">
                      {course.shortDesc}
                    </p>
                    <p className="text-[11px] text-[#64748B] mt-2">👨‍🎓 {course.studentCount} học viên</p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                    <div>
                      <span className="font-heading font-extrabold text-xl text-[#7C3AED]">
                        {course.price.toLocaleString("vi-VN")}đ
                      </span>
                      {course.originalPrice && (
                        <span className="text-xs text-[#64748B] line-through block">
                          {course.originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleEnroll(course.title)}
                      className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold rounded-full text-xs px-4 py-2"
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
                <Badge className="bg-[#7C3AED] text-white font-bold px-3 py-1">
                  {selectedCourse.category.toUpperCase()} • {selectedCourse.level}
                </Badge>
                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0F172A]">
                  {selectedCourse.title}
                </h1>
                <p className="text-[#64748B] text-base leading-relaxed">
                  {selectedCourse.shortDesc}
                </p>
              </div>

              {/* Course Intro Video Box */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl group bg-black">
                <Image src={selectedCourse.image} alt={selectedCourse.title} fill className="object-cover opacity-90" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={() => setActiveVideoModal(selectedCourse.videoUrl)}
                    className="h-16 w-16 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="h-7 w-7 fill-white ml-1" />
                  </button>
                </div>
              </div>

              {/* Tabs Content */}
              <Tabs defaultValue="overview" className="w-full pt-4">
                <TabsList className="bg-[#F1F5F9] rounded-2xl p-1.5 grid grid-cols-3">
                  <TabsTrigger value="overview" className="font-bold text-xs sm:text-sm">Giới Thiệu</TabsTrigger>
                  <TabsTrigger value="curriculum" className="font-bold text-xs sm:text-sm">Chương Trình Học</TabsTrigger>
                  <TabsTrigger value="instructor" className="font-bold text-xs sm:text-sm">Giảng Viên</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="pt-6 text-sm text-[#0F172A] leading-relaxed space-y-4">
                  <p>{selectedCourse.fullDesc}</p>
                </TabsContent>

                <TabsContent value="curriculum" className="pt-6 space-y-4">
                  {selectedCourse.modules.map((mod, idx) => (
                    <Card key={idx} className="p-5 border border-[#E2E8F0] rounded-2xl bg-white space-y-3">
                      <h4 className="font-heading font-bold text-base text-[#0F172A]">{mod.title}</h4>
                      <ul className="space-y-2 text-xs text-[#64748B]">
                        {mod.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0" />
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="instructor" className="pt-6">
                  <Card className="p-6 border border-[#E2E8F0] rounded-3xl bg-white flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#7C3AED] shrink-0">
                      <Image src={selectedCourse.instructorAvatar} alt={selectedCourse.instructor} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#0F172A]">{selectedCourse.instructor}</h3>
                      <p className="text-xs font-bold text-[#7C3AED]">{selectedCourse.instructorRole}</p>
                      <p className="text-xs text-[#64748B] mt-1">Nhiều năm kinh nghiệm đào tạo học viên đạt chứng chỉ quốc tế.</p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4">
              <Card className="p-6 bg-white border border-[#E2E8F0] rounded-3xl shadow-xl space-y-6 sticky top-24">
                <div className="space-y-1">
                  <span className="text-xs text-[#64748B] uppercase font-mono font-bold">HỌC PHÍ KHOÁ HỌC</span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading font-extrabold text-3xl text-[#7C3AED]">
                      {selectedCourse.price.toLocaleString("vi-VN")}đ
                    </span>
                    {selectedCourse.originalPrice && (
                      <span className="text-[#64748B] line-through text-base">
                        {selectedCourse.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>

                <ShimmerButton
                  onClick={() => handleEnroll(selectedCourse.title)}
                  className="w-full py-4 text-sm font-extrabold bg-[#7C3AED] text-white rounded-full shadow-lg"
                >
                  ĐĂNG KÝ HỌC NGAY 🚀
                </ShimmerButton>

                <div className="space-y-3 pt-4 border-t border-[#E2E8F0] text-xs text-[#0F172A]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0" />
                    <span>Thời lượng: <b>{selectedCourse.sessions}</b></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0" />
                    <span>Tài liệu học tập PDF bản quyền</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0" />
                    <span>Nhóm hỗ trợ chữa bài 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#7C3AED] shrink-0" />
                    <span>Chứng chỉ hoàn thành khoá học</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      )}

      {/* 8. VIEW 4: ABOUT PAGE REDESIGNED FULLY */}
      {activeTab === "about" && (
        <main className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-20">
          {/* Section 1: Hero About + Full-Width Campus Photo */}
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <Badge className="bg-[#7C3AED] text-white font-extrabold px-4 py-1 text-xs">ABOUT VANGUARD</Badge>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0F172A] uppercase">
                Sứ Mệnh Nâng Tầm Tiếng Anh Người Việt
              </h1>
              <p className="text-[#64748B] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                Hệ sinh thái đào tạo ngôn ngữ thực chiến thế hệ mới — Nơi biến ước mơ du học và sự nghiệp toàn cầu thành hiện thực.
              </p>
            </div>

            <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0]">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Vanguard Campus Life"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Section 2: Brand Story (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 text-sm text-[#0F172A] leading-relaxed font-medium">
              <Badge className="bg-[#F97316]/10 text-[#F97316] font-bold text-xs">CÂU CHUYỆN THƯƠNG HIỆU</Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
                Từ Lớp Học Nhỏ Đến Hệ Thống Đào Tạo Đỉnh Cao
              </h2>
              <p>
                Được thành lập vào năm 2020 bởi đội ngũ giảng viên bản ngữ và cựu giám khảo IELTS, Vanguard English bắt đầu với sứ mệnh đơn giản: <b>Chữa dứt điểm sự rụt rè khi nói tiếng Anh của người Việt.</b>
              </p>
              <p>
                Qua 6 năm phát triển, chúng tôi tiên phong áp dụng phương pháp phản xạ tương tác 100% bằng tiếng Anh và hợp tác chiến lược cùng các tổ chức khảo thí quốc tế lớn như British Council & IDP.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-80 rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Founder Team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Section 3: Key Stats NumberTicker */}
          <div className="bg-[#F1F5F9] p-8 rounded-3xl border border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">
                <NumberTicker value={5420} />+
              </h3>
              <p className="text-xs text-[#64748B] font-bold mt-1">Học Viên Đạt Mục Tiêu</p>
            </div>
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F97316]">
                <NumberTicker value={50} />+
              </h3>
              <p className="text-xs text-[#64748B] font-bold mt-1">Giảng Viên Bản Ngữ</p>
            </div>
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#06B6D4]">
                <NumberTicker value={15} />+
              </h3>
              <p className="text-xs text-[#64748B] font-bold mt-1">Khoá Học Chuyên Sâu</p>
            </div>
            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                <NumberTicker value={98} />%
              </h3>
              <p className="text-xs text-[#64748B] font-bold mt-1">Hài Lòng Tuyệt Đối</p>
            </div>
          </div>

          {/* Section 4: Development Timeline */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold text-xs">HÀNH TRÌNH PHÁT TRIỂN</Badge>
              <h2 className="font-heading text-3xl font-extrabold text-[#0F172A]">Các Cột Mốc Đáng Tự Hào</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TIMELINE_MILESTONES.map((item, idx) => (
                <Card key={idx} className="p-6 bg-white border border-[#E2E8F0] rounded-3xl space-y-2 shadow-xs hover:border-[#7C3AED] transition-colors">
                  <span className="font-heading font-extrabold text-2xl text-[#7C3AED] block">{item.year}</span>
                  <h4 className="font-heading font-bold text-base text-[#0F172A]">{item.title}</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 5: Core Values */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Badge className="bg-[#7C3AED]/10 text-[#7C3AED] font-bold text-xs">CORE VALUES</Badge>
              <h2 className="font-heading text-3xl font-extrabold text-[#0F172A]">3 Giá Trị Cốt Lõi</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-8 bg-white border-l-4 border-l-[#7C3AED] border-y border-r border-[#E2E8F0] rounded-3xl space-y-3 shadow-sm">
                <Target className="h-10 w-10 text-[#7C3AED]" />
                <h3 className="font-heading font-extrabold text-lg text-[#0F172A]">100% Thực Chiến</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">Học để ứng dụng trong công việc và kỳ thi thật, không lý thuyết suông.</p>
              </Card>

              <Card className="p-8 bg-white border-l-4 border-l-[#F97316] border-y border-r border-[#E2E8F0] rounded-3xl space-y-3 shadow-sm">
                <Award className="h-10 w-10 text-[#F97316]" />
                <h3 className="font-heading font-extrabold text-lg text-[#0F172A]">Cam Kết Văn Bản</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">Đảm bảo điểm số mục tiêu hoặc học lại miễn phí 100%.</p>
              </Card>

              <Card className="p-8 bg-white border-l-4 border-l-[#06B6D4] border-y border-r border-[#E2E8F0] rounded-3xl space-y-3 shadow-sm">
                <HeartHandshake className="h-10 w-10 text-[#06B6D4]" />
                <h3 className="font-heading font-extrabold text-lg text-[#0F172A]">Đồng Hành 1-1</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">Cố vấn học tập theo sát giải đáp thắc mắc 24/7 trong suốt khoá học.</p>
              </Card>
            </div>
          </div>

          {/* Section 6: About CTA */}
          <div className="py-12 px-6 bg-gradient-to-br from-[#7C3AED] to-[#F97316] text-white rounded-3xl text-center space-y-4 shadow-xl">
            <h2 className="font-heading text-3xl font-extrabold uppercase">Sẵn Sàng Bắt Đầu Chinh Phục Tiếng Anh?</h2>
            <p className="text-xs sm:text-sm text-white/90">Đăng ký tư vấn lộ trình học miễn phí ngay hôm nay!</p>
            <Button
              onClick={() => setActiveTab("courses")}
              className="bg-white text-[#7C3AED] hover:bg-slate-100 font-extrabold rounded-full px-8 py-3 text-sm shadow-md"
            >
              KHAM PHÁ KHOÁ HỌC NGAY 🚀
            </Button>
          </div>
        </main>
      )}

      {/* FOOTER — CLEAN DARK CLOSURE WITH SMALL MUTED 12px ADMIN LINK */}
      <footer className="bg-[#0F172A] text-white py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-2xl text-white block">
              VANGUARD <span className="text-[#7C3AED]">ENGLISH</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC và giao tiếp công sở.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Khoá Học Hot</h4>
            <p onClick={() => setActiveTab("courses")} className="hover:text-[#7C3AED] cursor-pointer text-slate-300">IELTS Academic 7.0+</p>
            <p onClick={() => setActiveTab("courses")} className="hover:text-[#7C3AED] cursor-pointer text-slate-300">TOEIC 800+ Thực Chiến</p>
            <p onClick={() => setActiveTab("courses")} className="hover:text-[#7C3AED] cursor-pointer text-slate-300">Business English Văn Phòng</p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="font-heading font-bold text-white text-sm">Liên Hệ & Hỗ Trợ</h4>
            <p className="hover:text-[#7C3AED] cursor-pointer">Hotline: 1900 1234</p>
            <p className="hover:text-[#7C3AED] cursor-pointer">Email: contact@vanguard-english.edu.vn</p>
            <p className="hover:text-[#7C3AED] cursor-pointer">Địa chỉ: 108 Nguyễn Trãi, Q.5, TP.HCM</p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="font-heading font-bold text-white text-sm">Mạng Xã Hội</h4>
            <p className="hover:text-[#7C3AED] cursor-pointer">Facebook Fanpage</p>
            <p className="hover:text-[#7C3AED] cursor-pointer">YouTube Channel</p>
            <p className="hover:text-[#7C3AED] cursor-pointer">TikTok Community</p>
          </div>
        </div>

        {/* 1. FOOTER BOTTOM: VERY SMALL 12px MUTED SLATE LINK "Quản trị viên" */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 VANGUARD ENGLISH Electric Campus. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[12px] text-slate-500">
            <Link href="/admin" className="hover:underline hover:text-slate-300 transition-colors">
              Quản trị viên
            </Link>
            <span>•</span>
            <span className="text-slate-400 font-mono">WSOS Studio Showcase</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
