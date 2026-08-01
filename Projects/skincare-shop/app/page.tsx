"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShoppingBag,
  Search,
  Star,
  CheckCircle2,
  ChevronRight,
  Menu as MenuIcon,
  X,
  Leaf,
  ShieldCheck,
  Droplets,
  Award,
  Clock,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Heart,
  Camera,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Input } from "@wsos/ui/components/input";
import { Label } from "@wsos/ui/components/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

// Imports from @wsos/ui blocks (Magic UI)
import { TextAnimate } from "@wsos/ui/blocks/text-animate";
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
import { Marquee } from "@wsos/ui/blocks/marquee";

// Types
export interface Product {
  id: string;
  name: string;
  category: "skincare" | "makeup" | "bodycare" | "sets";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: "green" | "peach" | "rose";
  image: string;
  galleryImages: string[];
  description: string;
  ingredients: string;
  howToUse: string;
  volumeOptions: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  quantity: number;
}

// 12+ Skincare Products Data
const PRODUCTS_DATA: Product[] = [
  {
    id: "p1",
    name: "Aqua Dewy Glass Serum",
    category: "skincare",
    price: 495000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Best Seller",
    badgeType: "green",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Serum cấp ẩm đa tầng chứa 2% Hyaluronic Acid phức hợp 8 kích thước phân tử và Niacinamide 5%, giúp làn da căng bóng ngậm nước tức thì như sương mai.",
    ingredients: "Hyaluronic Acid 8D, Niacinamide 5%, B5 Panthenol, Chiết xuất hoa cúc La Mã, Rau má Centella.",
    howToUse: "Thoa 3-4 giọt serum lên da mặt ẩm sau bước toner, vỗ nhẹ cho dưỡng chất thẩm thấu hoàn toàn.",
    volumeOptions: ["30ml", "50ml", "100ml"],
  },
  {
    id: "p2",
    name: "Peony Glow Radiance Cream",
    category: "skincare",
    price: 580000,
    originalPrice: 720000,
    rating: 4.8,
    reviewsCount: 98,
    badge: "New Season",
    badgeType: "peach",
    image: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Kem dưỡng khóa ẩm phục hồi chứa Ceramide NP và chiết xuất Mẫu Đơn hồng, nuôi dưỡng làn da mịn màng hồng hào tươi trẻ.",
    ingredients: "Ceramide NP, Peony Extract, Squalane thực vật, Peptide Collagen, Vitamin E.",
    howToUse: "Lấy lượng kem vừa đủ thoa đều khắp mặt và cổ ở bước cuối cùng của chu trình skincare sáng và tối.",
    volumeOptions: ["50ml", "100ml"],
  },
  {
    id: "p3",
    name: "Botanical Centella Soothing Toner",
    category: "skincare",
    price: 380000,
    originalPrice: 450000,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Giảm 15%",
    badgeType: "rose",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Nước hoa hồng cân bằng pH chứa 85% nước rau má đảo Jeju giúp làm dịu tức thì làn da nhạy cảm, giảm đỏ và se khít lỗ chân lông.",
    ingredients: "85% Jeju Centella Asiatica, Madecassoside, PHA dịu nhẹ, BHA tự nhiên từ vỏ cây liễu.",
    howToUse: "Thấm dung dịch ra bông tẩy trang hoặc đổ trực tiếp ra lòng bàn tay vỗ nhẹ lên mặt sau khi rửa mặt.",
    volumeOptions: ["150ml", "250ml"],
  },
  {
    id: "p4",
    name: "Pure Vita C Brightening Shot",
    category: "skincare",
    price: 620000,
    originalPrice: 850000,
    rating: 4.7,
    reviewsCount: 86,
    badge: "Giảm 27%",
    badgeType: "rose",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Tinh chất Vitamin C tinh khiết 15% kết hợp Niacinamide giúp làm mờ thâm mụn, dưỡng da sáng mịn đều màu chỉ sau 14 ngày.",
    ingredients: "L-Ascorbic Acid 15%, Ferulic Acid, Niacinamide, Vitamin E, Chiết xuất mận Kakadu.",
    howToUse: "Sử dụng 3 giọt mỗi buổi sáng trước bước kem chống nắng để bảo vệ da tối ưu.",
    volumeOptions: ["30ml"],
  },
  {
    id: "p5",
    name: "Rose Quartz Velvet Cushion",
    category: "makeup",
    price: 520000,
    rating: 4.8,
    reviewsCount: 164,
    badge: "New",
    badgeType: "peach",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Phấn nước mỏng nhẹ tệp da tạo hiệu ứng căng bóng Glass Skin, che phủ khuyết điểm hoàn hảo mượt mà suốt 12 giờ.",
    ingredients: "Bột ngọc trai thiên nhiên, Chiết xuất hoa hồng Damascus, Titanium Dioxide, Niacinamide.",
    howToUse: "Dùng bông mút dặm nhẹ phấn nước từ trung tâm khuôn mặt tán đều ra xung quanh.",
    volumeOptions: ["15g + Refill 15g"],
  },
  {
    id: "p6",
    name: "Peach Dew Tinted Lip Oil",
    category: "makeup",
    price: 290000,
    originalPrice: 350000,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Must Have",
    badgeType: "green",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Son dưỡng bóng chiết xuất dầu nụ tầm xuân dưỡng môi căng mọng tràn đầy sức sống, màu hồng đào tự nhiên xinh xắn.",
    ingredients: "Rosehip Seed Oil, Jojoba Oil, Dầu dừa hữu cơ, Hyaluronic Spheres, Vitamin E.",
    howToUse: "Thoa trực tiếp lên môi bất cứ khi nào cảm thấy khô hoặc dùng làm lớp phủ bóng trên son màu.",
    volumeOptions: ["6ml"],
  },
  {
    id: "p7",
    name: "Botanical Green Body Cleanser",
    category: "bodycare",
    price: 340000,
    rating: 4.7,
    reviewsCount: 74,
    image: "https://images.unsplash.com/photo-1556228722-d1191e469c43?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1556228722-d1191e469c43?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Sữa tắm thảo mộc dưỡng ẩm mịn da hương nước hoa tinh tế từ tinh dầu hoa nhài và trà xanh êm dịu.",
    ingredients: "Chiết xuất Trà Xanh, Tinh dầu Hoa Nhài, Sữa yến mạch, Glycerin thực vật.",
    howToUse: "Lấy lượng vừa đủ ra bông tắm tạo bọt, massage nhẹ nhàng khắp cơ thể rồi xả sạch với nước.",
    volumeOptions: ["300ml", "500ml"],
  },
  {
    id: "p8",
    name: "Dewy Glass Garden Ritual Set",
    category: "sets",
    price: 1290000,
    originalPrice: 1850000,
    rating: 5.0,
    reviewsCount: 420,
    badge: "Super Saver -30%",
    badgeType: "rose",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Bộ sản phẩm skincare chuẩn nhà kính đọng sương 4 bước hoàn chỉnh: Toner -> Serum -> Kem dưỡng -> Cushion.",
    ingredients: "Trọn bộ giải pháp dưỡng da Dewy Glass Garden từ LUMIÈRE LABS.",
    howToUse: "Sử dụng chu trình đầy đủ sáng và tối theo thứ tự trong hướng dẫn kèm theo.",
    volumeOptions: ["Fullsize Set"],
  },
  {
    id: "p9",
    name: "Watery Sunscreen Fluid SPF50+",
    category: "skincare",
    price: 420000,
    rating: 4.9,
    reviewsCount: 188,
    badge: "Bestseller",
    badgeType: "green",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Kem chống nắng quang phổ rộng mỏng nhẹ như nước, không nâng tông trắng bệch, kiềm dầu dịu nhẹ.",
    ingredients: "Màng lọc thế hệ mới Tinosorb S, Uvinul A Plus, Niacinamide, Chiết xuất rau sam.",
    howToUse: "Thoa kem chống nắng trước khi ra ngoài 15-20 phút, thoa lại sau 3-4 giờ ngoài trời.",
    volumeOptions: ["50ml"],
  },
  {
    id: "p10",
    name: "Green Tea Cleansing Balm",
    category: "skincare",
    price: 360000,
    originalPrice: 420000,
    rating: 4.8,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1567928257827-4a03213a058c?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1567928257827-4a03213a058c?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Sáp tẩy trang chiết xuất trà xanh giúp cuốn sạch bã nhờn, bụi mịn và lớp trang điểm chống nước dịu nhẹ.",
    ingredients: "Dầu hạt Trà Xanh, Bơ Hạt Mỡ, Dầu Macadamia, Chiết xuất Lá Ổi.",
    howToUse: "Lấy lượng sáp nhỏ massage trực tiếp lên da khô 1 phút, nhũ hóa với nước ấm rồi rửa sạch.",
    volumeOptions: ["100g"],
  },
  {
    id: "p11",
    name: "Rose Petal Hydrating Lotion",
    category: "bodycare",
    price: 390000,
    rating: 4.6,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Sữa dưỡng thể hương hoa hồng ướp lạnh cung cấp độ ẩm suốt 24h cho làn da mịn màng săn chắc.",
    ingredients: "Sữa dừa, Dầu Nụ Tầm Xuân, Hyaluronic Acid, Chiết xuất Cánh Hoa Hồng tươi.",
    howToUse: "Thoa đều khắp cơ thể ngay sau khi tắm khi da còn ẩm.",
    volumeOptions: ["250ml"],
  },
  {
    id: "p12",
    name: "Dewy Garden Renewal Night Mask",
    category: "skincare",
    price: 540000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 130,
    badge: "Night Care",
    badgeType: "peach",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Mặt nạ ngủ tái tạo làn da qua đêm, giúp da ngập nước bừng sáng khỏe mạnh ngay khi thức dậy.",
    ingredients: "Squalane, Trehalose, Chiết xuất Tảo Biển đỏ, Niacinamide 3%.",
    howToUse: "Thoa lớp mỏng đều khắp mặt trước khi đi ngủ 2-3 lần/tuần, rửa sạch với nước ấm buổi sáng.",
    volumeOptions: ["80ml"],
  },
];

const REVIEWS = [
  {
    name: "Trần Minh Thư",
    role: "Beauty Editor • Elle Magazine",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "LUMIÈRE Aqua Dewy Serum thực sự thay đổi làn da mình! Cảm giác như mỗi buổi sáng thức dậy da mọng nước bóng mịn tự nhiên.",
    rating: 5,
  },
  {
    name: "Phạm Hà My",
    role: "Skincare Creator",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    content: "Vibe thương hiệu siêu thơ và sang xịn! Bảng thành phần cực kỳ thuần chay dịu nhẹ cho da nhạy cảm.",
    rating: 5,
  },
  {
    name: "Nguyễn Bảo Châu",
    role: "Fashion Model",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    content: "Kem chống nắng mỏng nhẹ tệp da không nhờn dính. Mình mua đi mua lại lọ thứ 3 rồi!",
    rating: 5,
  },
  {
    name: "Lê Hoàng Yến",
    role: "Makeup Artist",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    content: "Bộ Dewy Garden Set cực hợp làm lớp lót trước khi makeup cho cô dâu. Lớp nền mọng trong suốt chuẩn Hàn.",
    rating: 5,
  },
];

const INSTAGRAM_PHOTOS = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop",
];

export default function SkincareShop() {
  const [activeTab, setActiveTab] = useState<"home" | "products" | "detail" | "about">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS_DATA[0].volumeOptions[0]);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    { id: "c1", product: PRODUCTS_DATA[0], selectedSize: "30ml", quantity: 1 },
    { id: "c2", product: PRODUCTS_DATA[1], selectedSize: "50ml", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 18 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => fontCleaup(timer);
  }, []);

  const fontCleaup = (timer: NodeJS.Timeout) => clearInterval(timer);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const addToCart = (product: Product, size?: string, qty: number = 1) => {
    const targetSize = size || product.volumeOptions[0];
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === targetSize
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      setCart(updatedCart);
    } else {
      setCart([...cart, { id: `${product.id}-${Date.now()}`, product, selectedSize: targetSize, quantity: qty }]);
    }

    showToast(`Đã thêm ${product.name} (${targetSize}) vào giỏ! 🌿`);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast("Đã xóa sản phẩm khỏi giỏ.");
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.volumeOptions[0]);
    setDetailQuantity(1);
    setActiveTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Giỏ hàng của bạn đang trống!");
      return;
    }
    showToast("🎉 Đặt hàng thành công! LUMIÈRE LABS sẽ liên hệ xác nhận đơn hàng trong 5 phút.");
    setCart([]);
    setIsCartOpen(false);
  };

  const filteredProducts =
    categoryFilter === "all"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === categoryFilter);

  return (
    <div className="relative min-h-screen bg-[#FDF8F3] text-[#1B1B1B] font-sans selection:bg-[#2D6A4F]/20 selection:text-[#2D6A4F]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#2D6A4F] text-white px-6 py-3.5 font-medium shadow-2xl animate-in slide-in-from-bottom-5 text-sm">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FFBE98]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fullscreen Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B1B1B]/80 backdrop-blur-lg flex flex-col justify-start pt-20 px-6 animate-in fade-in duration-200">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="flex justify-between items-center text-white">
              <span className="text-xs uppercase font-mono tracking-widest text-[#FFBE98]">LUMIÈRE SEARCH</span>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:text-[#FFBE98]">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#6B705C]" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm kiếm serum, toner, kem dưỡng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-slate-400 text-lg focus:outline-none focus:border-[#FFBE98]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-bold text-[#FFBE98]">Gợi ý:</span>
              {["Serum Hyaluronic", "Toner Centella", "Cushion", "Vitamin C"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveTab("products");
                    setIsSearchOpen(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-slate-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#2D6A4F] text-white text-xs font-medium py-2.5 px-4 overflow-hidden border-b border-[#2D6A4F]/20">
        <Marquee pauseOnHover className="[--duration:20s]">
          <span className="mx-6 tracking-wide">✨ FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 399K</span>
          <span className="mx-6 tracking-wide">🌿 CHIẾT XUẤT THỰC VẬT HỮU CƠ TƯƠI MỚI</span>
          <span className="mx-6 tracking-wide">💧 TẶNG MẪU THỬ SERUM GLASS SKIN TRONG MỖI ĐƠN HÀNG</span>
        </Marquee>
      </div>

      {/* HEADER */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#FDF8F3]/90 backdrop-blur-md border-b border-[#EAE3D9] shadow-sm py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab("home")} className="group text-left">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-[#1B1B1B]">
              LUMIÈRE <span className="text-[#2D6A4F] font-serif-italic font-normal">labs</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1B1B1B]">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-[#2D6A4F] transition-colors ${activeTab === "home" ? "text-[#2D6A4F]" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`hover:text-[#2D6A4F] transition-colors ${activeTab === "products" ? "text-[#2D6A4F]" : ""}`}
            >
              Sản Phẩm (12+)
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-[#2D6A4F] transition-colors ${activeTab === "about" ? "text-[#2D6A4F]" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#EAE3D9]/50 text-[#1B1B1B] transition-colors"
              title="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#EAE3D9]/50 text-[#1B1B1B] transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-[#FFBE98] text-[#1B1B1B] font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#1B1B1B]">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#FDF8F3] border-[#EAE3D9]">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-xl text-[#2D6A4F]">
                      LUMIÈRE labs
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 font-semibold text-lg text-[#1B1B1B]">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#2D6A4F]">
                      Trang Chủ
                    </button>
                    <button onClick={() => setActiveTab("products")} className="text-left hover:text-[#2D6A4F]">
                      Sản Phẩm
                    </button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#2D6A4F]">
                      Về Chúng Tôi
                    </button>
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
          {/* SECTION 2: HERO — ASYMMETRIC SPLIT + BLOB SHAPE */}
          <section className="relative pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column (55%) */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] bg-[#2D6A4F]/5 rounded-full px-4 py-1.5 text-xs font-semibold">
                    🌿 Dewy Glass Garden Collection
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1B1B1B] leading-[1.15]">
                    Làn Da Căng Bóng <br />
                    <span className="font-serif-italic font-normal text-[#2D6A4F] block my-1">
                      𝘗𝘶𝘳𝘦 𝘎𝘭𝘢𝘴𝘴 𝘚𝘬𝘪𝘯
                    </span>
                    Từ Thiên Nhiên
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-[#6B705C] text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0 font-normal">
                    Trải nghiệm dòng dược mỹ phẩm thuần chay sinh học chiết xuất từ mầm rau má Jeju và Hyaluronic Acid đa tầng, mang lại vẻ đẹp trong trẻo như sương mai đọng trên lá.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => setActiveTab("products")}
                      className="px-8 py-4 text-sm font-bold bg-[#2D6A4F] text-white rounded-full shadow-lg shadow-[#2D6A4F]/20"
                    >
                      KHÁM PHÁ BỘ SẢN PHẨM 🌿
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => openProductDetail(PRODUCTS_DATA[0])}
                      className="px-7 py-4 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white rounded-full text-sm font-bold transition-all"
                    >
                      Xem Serum Best Seller
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>
              </div>

              {/* Right Column (45%) — Organic Blob Shape */}
              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative mx-auto max-w-md">
                    {/* Organic Blob Container */}
                    <div className="relative h-[380px] sm:h-[460px] w-full rounded-[45%_55%_60%_40%/50%_45%_55%_50%] overflow-hidden bg-[#EAE3D9]/60 border border-[#FFBE98]/40 shadow-2xl group">
                      <BorderBeam size={220} duration={12} delay={0} />
                      <Image
                        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
                        alt="Lumiere Aqua Dewy Serum"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-[#EAE3D9] p-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce duration-[3000ms]">
                      <div className="h-8 w-8 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
                        <Leaf className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6B705C] font-mono">100% ORGANIC</p>
                        <p className="text-xs font-bold text-[#1B1B1B]">Thuần Chay</p>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-[#EAE3D9] p-3 rounded-2xl shadow-xl flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#FFBE98]/30 flex items-center justify-center text-[#2D6A4F]">
                        <Droplets className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#6B705C] font-mono">HYDRATION</p>
                        <p className="text-xs font-bold text-[#1B1B1B]">Cấp Ẩm 24h</p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* SECTION 3: TRUST BADGES STRIP */}
          <section className="bg-[#2D6A4F] text-white py-5 px-4 overflow-hidden shadow-sm">
            <div className="max-w-7xl mx-auto hidden sm:grid grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Leaf className="h-4 w-4 text-[#FFBE98] shrink-0" />
                <span>100% Thuần Chay Hữu Cơ</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <ShieldCheck className="h-4 w-4 text-[#FFBE98] shrink-0" />
                <span>Dược Mỹ Phẩm Kiểm Nghiệm</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Droplets className="h-4 w-4 text-[#FFBE98] shrink-0" />
                <span>Cấp Ẩm Đa Tầng 24h</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Award className="h-4 w-4 text-[#FFBE98] shrink-0" />
                <span>An Toàn Cho Da Nhạy Cảm</span>
              </div>
            </div>

            {/* Mobile Marquee Strip */}
            <div className="sm:hidden">
              <Marquee pauseOnHover className="[--duration:15s]">
                <span className="mx-6 text-xs flex items-center gap-2"><Leaf className="h-4 w-4 text-[#FFBE98]" /> 100% Thuần Chay</span>
                <span className="mx-6 text-xs flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#FFBE98]" /> Dược Mỹ Phẩm Da Liễu</span>
                <span className="mx-6 text-xs flex items-center gap-2"><Droplets className="h-4 w-4 text-[#FFBE98]" /> Cấp Ẩm 24h</span>
              </Marquee>
            </div>
          </section>

          {/* SECTION 4: FLASH SALE BANNER */}
          <section className="py-12 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#FFBE98] to-[#E8A0BF] p-8 sm:p-10 shadow-xl text-[#1B1B1B] relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#2D6A4F]">
                    <Clock className="h-3.5 w-3.5 animate-pulse" /> FLASH SALE ƯU ĐÃI NỔI BẬT
                  </div>
                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold">Giảm 30% Bộ Sưu Tập Glass Skin</h2>
                  <p className="text-xs sm:text-sm font-medium text-[#1B1B1B]/80">Chỉ còn 14 sản phẩm ưu đãi trong kho!</p>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 text-center min-w-16 shadow-sm">
                    <span className="font-heading font-extrabold text-2xl text-[#2D6A4F] block">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[10px] text-[#6B705C] font-semibold uppercase">Giờ</span>
                  </div>
                  <span className="text-xl font-bold text-[#2D6A4F]">:</span>
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 text-center min-w-16 shadow-sm">
                    <span className="font-heading font-extrabold text-2xl text-[#2D6A4F] block">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[10px] text-[#6B705C] font-semibold uppercase">Phút</span>
                  </div>
                  <span className="text-xl font-bold text-[#2D6A4F]">:</span>
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 text-center min-w-16 shadow-sm">
                    <span className="font-heading font-extrabold text-2xl text-[#2D6A4F] block">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[10px] text-[#6B705C] font-semibold uppercase">Giây</span>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveTab("products")}
                  className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white font-bold rounded-full px-7 py-3 text-sm shadow-lg"
                >
                  Săn Sale Ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 5: BEST SELLERS PRODUCT CARDS */}
          <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] font-bold text-xs uppercase">
                  BEST SELLERS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B1B1B] mt-2">
                  Sản Phẩm Được Yêu Thích
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("products")}
                className="text-[#2D6A4F] hover:text-[#2D6A4F]/80 font-bold text-sm"
              >
                Xem Tất Cả 12+ Sản Phẩm <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS_DATA.slice(0, 4).map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-[#EAE3D9] hover:border-[#2D6A4F]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-2xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FDF8F3] to-[#FFBE98]/10 cursor-pointer" onClick={() => openProductDetail(product)}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge
                        className={`absolute top-3 left-3 border-none font-bold text-[10px] px-2.5 py-1 rounded-full ${
                          product.badgeType === "peach"
                            ? "bg-[#FFBE98] text-[#1B1B1B]"
                            : product.badgeType === "rose"
                            ? "bg-[#E8A0BF] text-[#1B1B1B]"
                            : "bg-[#2D6A4F] text-white"
                        }`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#F59E0B] text-xs mb-1">
                        <Star className="h-3.5 w-3.5 fill-[#F59E0B]" />
                        <span className="font-bold text-[#1B1B1B]">{product.rating}</span>
                        <span className="text-[#6B705C]">({product.reviewsCount})</span>
                      </div>
                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-heading font-bold text-base text-[#1B1B1B] group-hover:text-[#2D6A4F] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B705C] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE3D9]/60 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-base text-[#2D6A4F]">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#6B705C] line-through block">
                            {product.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white font-bold rounded-full text-xs px-3.5 py-1.5 shadow-sm"
                      >
                        + Thêm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* SECTION 6: INGREDIENTS SECTION — SIGNATURE MOMENT */}
          <section className="py-20 px-4 sm:px-6 bg-[#2D6A4F]/5 border-y border-[#EAE3D9]">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] font-bold text-xs uppercase">
                  BOTANICAL INGREDIENTS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B1B1B]">
                  Thành Phần Khoa Học Tự Nhiên
                </h2>
              </div>

              <Tabs defaultValue="hyaluronic" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-white border border-[#EAE3D9] p-1.5 rounded-full grid grid-cols-2 md:grid-cols-4 gap-1">
                    <TabsTrigger value="hyaluronic" className="rounded-full font-bold text-xs sm:text-sm px-4 py-2">
                      💧 Hyaluronic 8D
                    </TabsTrigger>
                    <TabsTrigger value="niacinamide" className="rounded-full font-bold text-xs sm:text-sm px-4 py-2">
                      ✨ Niacinamide 10%
                    </TabsTrigger>
                    <TabsTrigger value="centella" className="rounded-full font-bold text-xs sm:text-sm px-4 py-2">
                      🌿 Jeju Centella
                    </TabsTrigger>
                    <TabsTrigger value="vitaminc" className="rounded-full font-bold text-xs sm:text-sm px-4 py-2">
                      🍊 Pure Vit C 15%
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="hyaluronic">
                  <Card className="bg-white border-[#EAE3D9] p-8 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 relative h-64 rounded-2xl overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" alt="Hyaluronic Acid" fill className="object-cover" />
                      </div>
                      <div className="md:col-span-7 space-y-4">
                        <Badge className="bg-[#FFBE98] text-[#1B1B1B] font-bold">STAT HIGHLIGHT</Badge>
                        <h3 className="font-heading text-3xl font-extrabold text-[#2D6A4F] flex items-center">
                          Cấp Ẩm Gấp <NumberTicker value={8} /> Lần
                        </h3>
                        <p className="text-[#6B705C] text-sm leading-relaxed">
                          Phức hợp Hyaluronic Acid 8D kích thước phân tử đa tầng giúp giữ nước bề mặt và thẩm thấu sâu xuống tầng hạ bì.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="niacinamide">
                  <Card className="bg-white border-[#EAE3D9] p-8 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 relative h-64 rounded-2xl overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop" alt="Niacinamide" fill className="object-cover" />
                      </div>
                      <div className="md:col-span-7 space-y-4">
                        <Badge className="bg-[#E8A0BF] text-[#1B1B1B] font-bold">SE KHÍT LỖ CHÂN LÔNG</Badge>
                        <h3 className="font-heading text-3xl font-extrabold text-[#2D6A4F] flex items-center">
                          <NumberTicker value={95} />% Khách Hàng Thấy Mịn Da
                        </h3>
                        <p className="text-[#6B705C] text-sm leading-relaxed">
                          Niacinamide 10% kiểm soát bã nhờn, làm mờ vết thâm đỏ mụn và tăng sinh collagen phục hồi màng bảo vệ da.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="centella">
                  <Card className="bg-white border-[#EAE3D9] p-8 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 relative h-64 rounded-2xl overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop" alt="Jeju Centella" fill className="object-cover" />
                      </div>
                      <div className="md:col-span-7 space-y-4">
                        <Badge className="bg-[#2D6A4F] text-white font-bold">PHỤC HỒI DỊU NHẸ</Badge>
                        <h3 className="font-heading text-3xl font-extrabold text-[#2D6A4F] flex items-center">
                          85% Nước Rau Má Jeju
                        </h3>
                        <p className="text-[#6B705C] text-sm leading-relaxed">
                          Rau má tươi hữu cơ đảo Jeju giàu Madecassoside giúp làm dịu mẩn đỏ tức thì và tái tạo da nhạy cảm.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="vitaminc">
                  <Card className="bg-white border-[#EAE3D9] p-8 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-5 relative h-64 rounded-2xl overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop" alt="Pure Vitamin C" fill className="object-cover" />
                      </div>
                      <div className="md:col-span-7 space-y-4">
                        <Badge className="bg-[#FFBE98] text-[#1B1B1B] font-bold">MỜ THÂM SÁNG DA</Badge>
                        <h3 className="font-heading text-3xl font-extrabold text-[#2D6A4F] flex items-center">
                          Hiệu Quả Sau <NumberTicker value={14} /> Ngày
                        </h3>
                        <p className="text-[#6B705C] text-sm leading-relaxed">
                          Vitamin C tinh khiết 15% kết hợp Ferulic Acid chống oxy hóa mạnh mẽ cho làn da sáng rạng rỡ.
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* SECTION 7: REVIEWS MARQUEE */}
          <section className="py-20 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] font-bold text-xs uppercase">
                  COMMUNITY LOVE
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#1B1B1B]">Cảm Nhận Từ Phái Đẹp</h2>
              </div>

              <Marquee pauseOnHover className="[--duration:25s]">
                {REVIEWS.map((rev, idx) => (
                  <Card key={idx} className="w-80 sm:w-96 bg-white border-[#EAE3D9] p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-2xl relative">
                    <span className="font-serif-italic text-5xl text-[#FFBE98] absolute top-4 right-4 pointer-events-none">“</span>
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#F59E0B]" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#6B705C] italic leading-relaxed">
                        "{rev.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#EAE3D9]/60">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-[#2D6A4F]/30">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#1B1B1B]">{rev.name}</h4>
                        <p className="text-[10px] text-[#2D6A4F] font-semibold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>

          {/* SECTION 8: INSTAGRAM FEED */}
          <section className="py-16 px-4 sm:px-6 bg-white border-t border-[#EAE3D9]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <p className="text-xs font-bold text-[#2D6A4F] uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Camera className="h-4 w-4" /> Theo dõi @lumierelabs trên Instagram
                </p>
                <h3 className="font-heading text-2xl font-bold text-[#1B1B1B]">Khoảnh Khắc Dewy Glass Garden</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {INSTAGRAM_PHOTOS.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-[#EAE3D9]">
                    <Image src={img} alt="Instagram Post" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-[#2D6A4F]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera className="h-6 w-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: PRODUCTS CATALOG PAGE */}
      {activeTab === "products" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] font-bold text-xs uppercase">
                FULL COLLECTION
              </Badge>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#1B1B1B]">
                Tất Cả Sản Phẩm LUMIÈRE LABS
              </h1>
              <p className="text-[#6B705C] max-w-xl mx-auto text-sm">
                Danh mục 12+ dược mỹ phẩm thuần chay sinh học dưỡng da căng bóng mọng nước.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "all" ? "bg-[#2D6A4F] text-white" : ""}`}
              >
                Tất Cả (12)
              </Button>
              <Button
                variant={categoryFilter === "skincare" ? "default" : "outline"}
                onClick={() => setCategoryFilter("skincare")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "skincare" ? "bg-[#2D6A4F] text-white" : ""}`}
              >
                Chăm Sóc Da (7)
              </Button>
              <Button
                variant={categoryFilter === "makeup" ? "default" : "outline"}
                onClick={() => setCategoryFilter("makeup")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "makeup" ? "bg-[#2D6A4F] text-white" : ""}`}
              >
                Trang Điểm (2)
              </Button>
              <Button
                variant={categoryFilter === "bodycare" ? "default" : "outline"}
                onClick={() => setCategoryFilter("bodycare")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "bodycare" ? "bg-[#2D6A4F] text-white" : ""}`}
              >
                Dưỡng Thể (2)
              </Button>
              <Button
                variant={categoryFilter === "sets" ? "default" : "outline"}
                onClick={() => setCategoryFilter("sets")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "sets" ? "bg-[#2D6A4F] text-white" : ""}`}
              >
                Bộ Sản Phẩm (1)
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-[#EAE3D9] hover:border-[#2D6A4F]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-2xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FDF8F3] to-[#FFBE98]/10 cursor-pointer" onClick={() => openProductDetail(product)}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge
                        className={`absolute top-3 left-3 border-none font-bold text-[10px] px-2.5 py-1 rounded-full ${
                          product.badgeType === "peach"
                            ? "bg-[#FFBE98] text-[#1B1B1B]"
                            : product.badgeType === "rose"
                            ? "bg-[#E8A0BF] text-[#1B1B1B]"
                            : "bg-[#2D6A4F] text-white"
                        }`}
                      >
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[#F59E0B] text-xs mb-1">
                        <Star className="h-3.5 w-3.5 fill-[#F59E0B]" />
                        <span className="font-bold text-[#1B1B1B]">{product.rating}</span>
                        <span className="text-[#6B705C]">({product.reviewsCount})</span>
                      </div>
                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-heading font-bold text-base text-[#1B1B1B] group-hover:text-[#2D6A4F] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B705C] line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EAE3D9]/60 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-base text-[#2D6A4F]">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#6B705C] line-through block">
                            {product.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white font-bold rounded-full text-xs px-3.5 py-1.5"
                      >
                        + Thêm Giỏ Hàng
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: PRODUCT DETAIL PAGE */}
      {activeTab === "detail" && selectedProduct && (
        <main className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Gallery Images */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-[#EAE3D9] bg-white shadow-md">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {selectedProduct.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedProduct({ ...selectedProduct, image: img })}
                    className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-[#EAE3D9] hover:border-[#2D6A4F] shrink-0"
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <Badge variant="secondary" className="bg-[#2D6A4F]/10 text-[#2D6A4F] font-bold mb-2">
                  {selectedProduct.category.toUpperCase()}
                </Badge>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1B1B1B]">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1B1B1B]">{selectedProduct.rating}</span>
                  <span className="text-[#6B705C]">({selectedProduct.reviewsCount} Đánh giá)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-heading font-extrabold text-3xl text-[#2D6A4F]">
                  {selectedProduct.price.toLocaleString("vi-VN")}đ
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-[#6B705C] line-through text-lg">
                    {selectedProduct.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              <p className="text-[#6B705C] text-sm leading-relaxed border-y border-[#EAE3D9] py-4">
                {selectedProduct.description}
              </p>

              {/* Volume Options */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-[#1B1B1B]">Dung Tích / Kích Thước:</Label>
                <div className="flex gap-2">
                  {selectedProduct.volumeOptions.map((vol) => (
                    <Button
                      key={vol}
                      type="button"
                      variant={selectedSize === vol ? "default" : "outline"}
                      onClick={() => setSelectedSize(vol)}
                      className={`rounded-full text-xs font-bold px-4 py-2 ${selectedSize === vol ? "bg-[#2D6A4F] text-white" : ""}`}
                    >
                      {vol}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity Controls & Add Button */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-[#EAE3D9] rounded-full bg-white">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="h-10 w-10 text-[#1B1B1B]"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-sm text-[#1B1B1B]">{detailQuantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="h-10 w-10 text-[#1B1B1B]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <ShimmerButton
                  onClick={() => addToCart(selectedProduct, selectedSize, detailQuantity)}
                  className="flex-1 bg-[#2D6A4F] text-white font-bold rounded-full h-12 text-sm shadow-lg shadow-[#2D6A4F]/20"
                >
                  <ShoppingBag className="mr-2 h-4 w-4 inline" /> Thêm Vào Giỏ Hàng
                </ShimmerButton>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="ingredients" className="pt-6">
                <TabsList className="grid grid-cols-3 bg-white border border-[#EAE3D9] rounded-full p-1">
                  <TabsTrigger value="ingredients" className="text-xs font-bold rounded-full">Thành Phần</TabsTrigger>
                  <TabsTrigger value="howtouse" className="text-xs font-bold rounded-full">Cách Dùng</TabsTrigger>
                  <TabsTrigger value="shipping" className="text-xs font-bold rounded-full">Giao Hàng</TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="text-xs text-[#6B705C] leading-relaxed pt-3">
                  {selectedProduct.ingredients}
                </TabsContent>
                <TabsContent value="howtouse" className="text-xs text-[#6B705C] leading-relaxed pt-3">
                  {selectedProduct.howToUse}
                </TabsContent>
                <TabsContent value="shipping" className="text-xs text-[#6B705C] leading-relaxed pt-3">
                  Freeship toàn quốc cho đơn hàng từ 399.000đ. Giao nhanh 1-2 ngày làm việc.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 4: ABOUT PAGE */}
      {activeTab === "about" && (
        <main className="py-16 px-4 sm:px-6 max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="border-[#2D6A4F]/30 text-[#2D6A4F] font-bold text-xs uppercase">
              ABOUT US
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#1B1B1B]">
              LUMIÈRE LABS — Dewy Glass Garden Science
            </h1>
            <p className="text-[#6B705C] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Chúng tôi nghiên cứu và tạo ra dòng dược mỹ phẩm thuần chay chiết xuất thực vật sinh học mang trải nghiệm căng bóng ngậm nước như sương mai đọng trên lá.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-[#EAE3D9] p-6 text-center space-y-3 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center mx-auto">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1B1B1B]">100% Thuần Chay</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed">Không thành phần từ động vật, hoàn toàn không thử nghiệm trên động vật.</p>
            </Card>

            <Card className="bg-white border-[#EAE3D9] p-6 text-center space-y-3 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-[#FFBE98]/30 text-[#2D6A4F] flex items-center justify-center mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1B1B1B]">Kiểm Nghiệm Da Liễu</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed">An toàn lành tính đã được kiểm định cho làn da nhạy cảm nhất.</p>
            </Card>

            <Card className="bg-white border-[#EAE3D9] p-6 text-center space-y-3 rounded-2xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-[#E8A0BF]/30 text-[#2D6A4F] flex items-center justify-center mx-auto">
                <Droplets className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1B1B1B]">Cấp Ẩm Đa Tầng 24h</h3>
              <p className="text-xs text-[#6B705C] leading-relaxed">Dưỡng da căng bóng ngậm sương tràn đầy sức sống tự nhiên.</p>
            </Card>
          </div>
        </main>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1B1B1B]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#FDF8F3] h-full flex flex-col justify-between shadow-2xl p-6 overflow-hidden border-l border-[#EAE3D9]">
            <div>
              <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                <h3 className="font-heading font-extrabold text-lg text-[#1B1B1B] flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#2D6A4F]" /> Giỏ Hàng ({totalCartCount})
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="mt-4 bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 rounded-2xl p-3.5 text-xs text-[#2D6A4F]">
                {cartTotal >= 399000 ? (
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#2D6A4F]" /> Bạn đã đủ điều kiện FREESHIP TOÀN QUỐC!
                  </p>
                ) : (
                  <p className="font-medium">
                    Mua thêm <span className="font-bold text-[#1B1B1B]">{(399000 - cartTotal).toLocaleString("vi-VN")}đ</span> để nhận FREESHIP!
                  </p>
                )}
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-center py-12 text-[#6B705C] text-sm font-medium">Giỏ hàng của bạn đang trống.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border-b border-[#EAE3D9] pb-3">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-white shrink-0 border border-[#EAE3D9]">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-xs text-[#1B1B1B] truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-[#6B705C]">{item.selectedSize}</p>
                        <p className="font-bold text-xs text-[#2D6A4F] mt-1">{item.product.price.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <div className="flex items-center border border-[#EAE3D9] rounded-full bg-white">
                        <button onClick={() => updateCartQty(item.id, -1)} className="px-2 text-[#1B1B1B] font-bold text-xs">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="px-2 text-[#1B1B1B] font-bold text-xs">+</button>
                      </div>
                      <button onClick={() => removeCartItem(item.id)} className="text-[#6B705C] hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer & Checkout */}
            <div className="border-t border-[#EAE3D9] pt-4 space-y-4">
              <div className="space-y-1.5 text-xs text-[#6B705C]">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-bold text-[#1B1B1B]">{cartTotal.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold text-[#1B1B1B]">{cartTotal >= 399000 || cartTotal === 0 ? "0đ (Freeship)" : "30.000đ"}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#1B1B1B] border-t border-[#EAE3D9] pt-2">
                  <span>Tổng tiền:</span>
                  <span className="text-[#2D6A4F]">{(cartTotal + (cartTotal >= 399000 || cartTotal === 0 ? 0 : 30000)).toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <ShimmerButton onClick={handleCheckout} className="w-full py-3.5 font-bold text-sm bg-[#2D6A4F] text-white rounded-full shadow-lg">
                THANH TOÁN ĐƠN HÀNG 🌿
              </ShimmerButton>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: FOOTER */}
      <footer className="bg-[#2D6A4F] text-white py-16 px-4 sm:px-6 border-t border-[#2D6A4F]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white block">
              LUMIÈRE <span className="font-serif-italic font-normal text-[#FFBE98]">labs</span>
            </span>
            <p className="text-xs text-white/80 leading-relaxed max-w-xs font-normal">
              Dược mỹ phẩm thuần chay sinh học mang đến trải nghiệm làn da căng bóng Dewy Glass Garden chuẩn Hàn Quốc.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Danh Mục Sản Phẩm</h4>
            <p onClick={() => setActiveTab("products")} className="hover:text-[#FFBE98] cursor-pointer text-white/80">Serum Dưỡng Ẩm</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-[#FFBE98] cursor-pointer text-white/80">Kem Dưỡng Phục Hồi</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-[#FFBE98] cursor-pointer text-white/80">Phấn Nước Cushion</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-[#FFBE98] cursor-pointer text-white/80">Bộ Sản Phẩm Glass Garden</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Hỗ Trợ Khách Hàng</h4>
            <p className="hover:text-[#FFBE98] cursor-pointer text-white/80">Hướng Dẫn Chọn Routine</p>
            <p className="hover:text-[#FFBE98] cursor-pointer text-white/80">Chính Sách Đổi Trả</p>
            <p className="hover:text-[#FFBE98] cursor-pointer text-white/80">Kiểm Tra Đơn Hàng</p>
            <p className="hover:text-[#FFBE98] cursor-pointer text-white/80">Chính Sách Bảo Mật</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Đăng Ký Nhận Ưu Đãi</h4>
            <p className="text-white/80">Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên.</p>
            <div className="flex gap-2">
              <Input placeholder="Email..." className="bg-white/10 border-white/20 text-xs text-white placeholder:text-white/60 rounded-full" />
              <Button className="bg-[#FFBE98] hover:bg-[#FFBE98]/90 text-[#1B1B1B] font-bold text-xs shrink-0 rounded-full">Gửi</Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/70 gap-4">
          <p>© 2026 LUMIÈRE LABS Dewy Glass Garden. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/admin" className="hover:text-[#FFBE98] font-mono transition-colors">🔒 Đăng nhập quản trị</a>
            <p className="text-[#FFBE98] font-mono">WSOS Studio Showcase</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
