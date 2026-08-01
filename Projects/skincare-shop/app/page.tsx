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
  Heart,
  Droplets,
  ShieldCheck,
  Leaf,
  Clock,
  ArrowRight,
  Filter,
  Plus,
  Minus,
  Trash2,
  Truck,
  RotateCcw,
  Award,
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
    name: "Aqua Glass Hyaluronic Serum",
    category: "skincare",
    price: 495000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Serum cấp ẩm đa tầng chứa 2% Hyaluronic Acid phức hợp 8 kích thước phân tử và Niacinamide 5%, giúp làn da căng bóng ngậm nước tức thì chuẩn Glass Skin.",
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
    badge: "Hot Trend",
    image: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Kem dưỡng khóa ẩm phục hồi chứa Ceramide NP và chiết xuất Mẫu Đơn hồng, nuôi dưỡng làn da mịn màng hồng hào như sương mai.",
    ingredients: "Ceramide NP, Peony Extract, Squalane thực vật, Peptide Collagen, Vitamin E.",
    howToUse: "Lấy lượng kem vừa đủ thoa đều khắp mặt và cổ ở bước cuối cùng của chu trình skincare sáng và tối.",
    volumeOptions: ["50ml", "100ml"],
  },
  {
    id: "p3",
    name: "Centella Soothing Barrier Toner",
    category: "skincare",
    price: 380000,
    originalPrice: 450000,
    rating: 4.9,
    reviewsCount: 215,
    badge: "-15%",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Nước hoa hồng cân bằng pH chứa 85% nước rau má đảo Jeju giúp làm dịu tức thì làn da nhạy cảm, giảm đỏ và se khít lỗ chân lông.",
    ingredients: "85% Jeju Centella Asiatica, Madecassoside, PHA dịu nhẹ, BHA tự nhiên từ vỏ cây liễu.",
    howToUse: "Thấm dung dịch ra bông tẩy trang hoặc đổ trực tiếp ra lòng bàn tay vỗ nhẹ lên mặt sau khi rửa mặt.",
    volumeOptions: ["150ml", "250ml"],
  },
  {
    id: "p4",
    name: "Vita C Pure Shot Brightening Essence",
    category: "skincare",
    price: 620000,
    originalPrice: 850000,
    rating: 4.7,
    reviewsCount: 86,
    badge: "-27%",
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
    name: "Rose Velvet Cushion Compact SPF50+",
    category: "makeup",
    price: 520000,
    rating: 4.8,
    reviewsCount: 164,
    badge: "New Arrival",
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
    name: "Dewy Tinted Lip Oil Gloss",
    category: "makeup",
    price: 290000,
    originalPrice: 350000,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Must Have",
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
    name: "Botanical Silk Body Wash",
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
    name: "Glass Skin Discovery 4-Step Set",
    category: "sets",
    price: 1290000,
    originalPrice: 1850000,
    rating: 5.0,
    reviewsCount: 420,
    badge: "Super Saver -30%",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Bộ sản phẩm skincare chuẩn K-Beauty 4 bước hoàn chỉnh: Toner -> Serum -> Kem dưỡng -> Cushion bảo vệ da.",
    ingredients: "Trọn bộ giải pháp dưỡng da Glass Skin thuần chay cao cấp từ LUMIÈRE LABS.",
    howToUse: "Sử dụng chu trình đầy đủ sáng và tối theo thứ tự trong hướng dẫn kèm theo.",
    volumeOptions: ["Fullsize Set"],
  },
  {
    id: "p9",
    name: "Ultra-Light Watery Sunscreen SPF50+",
    category: "skincare",
    price: 420000,
    rating: 4.9,
    reviewsCount: 188,
    badge: "Bestseller",
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
    name: "Hydrating Rose Body Lotion",
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
    name: "Glass Skin Renewal Night Mask",
    category: "skincare",
    price: 540000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 130,
    badge: "Night Care",
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
    role: "Beauty Editor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    content: "LUMIÈRE Aqua Glass Serum thực sự thay đổi làn da mình! Da mịn mọng căng bóng đúng chuẩn Glass Skin sau 1 tuần.",
    rating: 5,
  },
  {
    name: "Phạm Hà My",
    role: "Skincare Content Creator",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    content: "Bảng thành phần cực kỳ lành tính thuần chay. Mùi hương hoa mẫu đơn dĩ nhiên siêu sang nhẹ nhàng!",
    rating: 5,
  },
  {
    name: "Nguyễn Bảo Châu",
    role: "Model & Influencer",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    content: "Kem chống nắng mỏng nhẹ tệp da không bị nhờn dính chút nào. Mình mua đi mua lại lọ thứ 3 rồi!",
    rating: 5,
  },
  {
    name: "Lê Hoàng Yến",
    role: "Makeup Artist",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    content: "Bộ Discovery Set rất đáng tiền. Làm nền trước khi makeup lớp nền căng mọng trong suốt chuẩn Hàn.",
    rating: 5,
  },
];

export default function SkincareShop() {
  const [activeTab, setActiveTab] = useState<"home" | "products" | "detail" | "about">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS_DATA[0].volumeOptions[0]);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    { id: "c1", product: PRODUCTS_DATA[0], selectedSize: "30ml", quantity: 1 },
    { id: "c2", product: PRODUCTS_DATA[1], selectedSize: "50ml", quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Flash sale countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

    showToast(`Đã thêm ${product.name} (${targetSize}) vào giỏ hàng! ✨`);
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
    showToast("Đã xóa sản phẩm khỏi giỏ hàng.");
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
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-cyan-600 text-white px-6 py-4 font-semibold shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Promo Bar */}
      <div className="bg-gradient-to-r from-cyan-600 via-pink-500 to-purple-600 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide">
        ✨ FREESHIP TOÀN QUỐC CHO ĐƠN HÀNG TỪ 399K • TẶNG MẪU THỬ SERUM GLASS SKIN TRONG MỖI ĐƠN HÀNG ✨
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 group-hover:scale-105 transition-transform shadow-sm">
              <Sparkles className="h-5 w-5 fill-cyan-500/20" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 block leading-none">
                LUMIÈRE <span className="text-cyan-500">LABS</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                Glass Skin Science
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-cyan-600 transition-colors ${activeTab === "home" ? "text-cyan-600" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`hover:text-cyan-600 transition-colors ${activeTab === "products" ? "text-cyan-600" : ""}`}
            >
              Sản Phẩm (12+)
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-cyan-600 transition-colors ${activeTab === "about" ? "text-cyan-600" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          {/* Actions & Cart Icon */}
          <div className="flex items-center gap-3">
            {/* Search Bar UI */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs text-slate-500 w-48">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Tìm serum, toner...</span>
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full border-slate-200 hover:border-cyan-500 hover:text-cyan-600 px-4 py-2 flex items-center gap-2"
            >
              <ShoppingBag className="h-4 w-4 text-cyan-600" />
              <span className="hidden sm:inline font-semibold text-xs text-slate-800">Giỏ Hàng</span>
              {totalCartCount > 0 && (
                <span className="h-5 min-w-5 px-1.5 rounded-full bg-pink-500 text-white font-extrabold text-[11px] flex items-center justify-center animate-in zoom-in-50">
                  {totalCartCount}
                </span>
              )}
            </Button>

            {/* Mobile Sheet Trigger */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-800">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-lg text-cyan-600 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" /> LUMIÈRE LABS
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 font-semibold text-slate-800 text-base">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-cyan-600">
                      Trang Chủ
                    </button>
                    <button onClick={() => setActiveTab("products")} className="text-left hover:text-cyan-600">
                      Sản Phẩm
                    </button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-cyan-600">
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
          {/* HERO SECTION */}
          <section className="relative pt-12 pb-20 px-4 sm:px-6 bg-gradient-to-b from-cyan-50/50 via-pink-50/30 to-background overflow-hidden">
            <DotPattern className="absolute inset-0 opacity-15" />
            <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-400/20 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-400/20 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge variant="secondary" className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    🌸 Công Nghệ Dưỡng Da Glass Skin Hàn Quốc
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                    Làn Da Căng Bóng{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600">
                      Pure Glass Skin
                    </span>{" "}
                    Mọng Nước Tự Nhiên
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                    Khám phá công thức dược mỹ phẩm thuần chay chứa 2% Hyaluronic Acid 8D phức hợp và Niacinamide tinh khiết từ LUMIÈRE LABS. Phục hồi làn da căng mọng, rạng rỡ tức thì.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => setActiveTab("products")}
                      className="px-8 py-4 text-sm font-extrabold shadow-lg shadow-cyan-500/25 tracking-wide"
                    >
                      KHAM PHÁ CÁC SẢN PHẨM ✨
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => openProductDetail(PRODUCTS_DATA[0])}
                      className="px-6 py-4 rounded-2xl border-slate-300 hover:border-cyan-500 text-slate-800 text-sm font-bold"
                    >
                      Xem Serum Best Seller
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>

                {/* Benefits Badges */}
                <BlurFade delay={0.5}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Leaf className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>100% Thuần Chay</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <ShieldCheck className="h-4 w-4 text-cyan-500 shrink-0" />
                      <span>Dược Mỹ Phẩm Da Liễu</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Droplets className="h-4 w-4 text-pink-500 shrink-0" />
                      <span>Cấp Ẩm Đa Tầng 24h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Award className="h-4 w-4 text-purple-500 shrink-0" />
                      <span>An Toàn Lành Tính</span>
                    </div>
                  </div>
                </BlurFade>
              </div>

              {/* Right Column: Hero Visual Card */}
              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 bg-white/70 backdrop-blur-xl shadow-2xl p-4 group">
                    <BorderBeam size={250} duration={10} delay={0} />
                    <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
                        alt="Lumiere Aqua Glass Serum"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-pink-500 text-white border-none font-bold px-3 py-1 text-xs">
                          🔥 #1 BEST SELLER
                        </Badge>
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 text-white flex justify-between items-end">
                        <div>
                          <p className="text-xs text-cyan-300 font-bold tracking-widest uppercase">SUPER HYDRATION</p>
                          <h3 className="font-heading font-extrabold text-lg sm:text-xl">Aqua Glass Serum 50ml</h3>
                          <p className="text-xs text-slate-200 mt-1">495.000đ <span className="line-through text-slate-400">650.000đ</span></p>
                        </div>
                        <Button
                          onClick={() => addToCart(PRODUCTS_DATA[0])}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs px-4 py-2 shadow-lg"
                        >
                          Mua Ngay
                        </Button>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* FLASH SALE COUNTDOWN SECTION */}
          <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-purple-900 via-slate-900 to-cyan-950 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400 font-bold text-xs uppercase tracking-widest">
                  <Clock className="h-4 w-4 animate-pulse" /> FLASH SALE ƯU ĐÃI GIỜ VÀNG
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Giảm Đến 30% — Số Lượng Có Hạn!</h2>
                <p className="text-slate-300 text-xs sm:text-sm">Ưu đãi kết thúc sau khi đếm ngược trở về 0.</p>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center min-w-16">
                  <span className="font-heading font-extrabold text-2xl text-amber-400 block">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-[10px] text-slate-300 font-medium uppercase">Giờ</span>
                </div>
                <span className="text-2xl font-bold text-pink-400">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center min-w-16">
                  <span className="font-heading font-extrabold text-2xl text-amber-400 block">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-[10px] text-slate-300 font-medium uppercase">Phút</span>
                </div>
                <span className="text-2xl font-bold text-pink-400">:</span>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-center min-w-16">
                  <span className="font-heading font-extrabold text-2xl text-amber-400 block">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-[10px] text-slate-300 font-medium uppercase">Giây</span>
                </div>
              </div>

              <Button
                onClick={() => setActiveTab("products")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl px-6 py-3 text-sm shadow-xl"
              >
                Săn Sale Ngay <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* BEST SELLERS PRODUCTS GRID */}
          <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-600 font-bold text-xs uppercase">
                  MOST POPULAR
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                  Sản Phẩm Bán Chạy Nhất
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => setActiveTab("products")}
                className="text-cyan-600 hover:text-cyan-700 font-bold text-sm"
              >
                Xem Tất Cả 12+ Sản Phẩm <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS_DATA.slice(0, 4).map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-slate-200/80 hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openProductDetail(product)}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-pink-500 text-white border-none font-bold text-[11px] px-2.5 py-1">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-800">{product.rating}</span>
                        <span className="text-slate-400">({product.reviewsCount})</span>
                      </div>
                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-heading font-bold text-base text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-base text-cyan-600">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through block">
                            {product.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs px-3 py-1.5"
                      >
                        + Thêm
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* INGREDIENTS SHOWCASE TABS */}
          <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-cyan-400/40 text-cyan-300 font-bold text-xs uppercase">
                  INGREDIENT SCIENCE
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold">Thành Phần Tinh Khiết Chuẩn Da Liễu</h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  LUMIÈRE LABS kết hợp thảo mộc hữu cơ và hoạt chất sinh học tiên tiến mang lại hiệu quả vượt trội.
                </p>
              </div>

              <Tabs defaultValue="hyaluronic" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-white/10 border border-white/20 p-1.5 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-1.5">
                    <TabsTrigger value="hyaluronic" className="rounded-xl font-bold text-xs sm:text-sm px-4 py-2.5">
                      💧 Hyaluronic Acid 8D
                    </TabsTrigger>
                    <TabsTrigger value="niacinamide" className="rounded-xl font-bold text-xs sm:text-sm px-4 py-2.5">
                      ✨ Niacinamide 10%
                    </TabsTrigger>
                    <TabsTrigger value="centella" className="rounded-xl font-bold text-xs sm:text-sm px-4 py-2.5">
                      🌿 Jeju Centella
                    </TabsTrigger>
                    <TabsTrigger value="vitaminc" className="rounded-xl font-bold text-xs sm:text-sm px-4 py-2.5">
                      🍊 Pure Vitamin C 15%
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="hyaluronic">
                  <Card className="bg-white/5 border-white/10 text-white p-8 rounded-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <Badge className="bg-cyan-500 text-white font-bold">CẤP ẨM ĐA TẦNG</Badge>
                        <h3 className="font-heading text-2xl font-bold text-cyan-300">Hyaluronic Acid Phức Hợp 8D</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Chứa 8 kích thước phân tử HA từ siêu nhỏ thấm sâu tầng hạ bì đến phân tử lớn khóa ẩm bề mặt. Mang lại làn da căng bóng mọng nước ngậm sương suốt 24h.
                        </p>
                      </div>
                      <div className="relative h-60 rounded-2xl overflow-hidden border border-white/20">
                        <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" alt="Hyaluronic Acid" fill className="object-cover" />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="niacinamide">
                  <Card className="bg-white/5 border-white/10 text-white p-8 rounded-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <Badge className="bg-pink-500 text-white font-bold">SE KHÍT LỖ CHÂN LÔNG</Badge>
                        <h3 className="font-heading text-2xl font-bold text-pink-300">Niacinamide Tinh Khiết 10%</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Cải thiện kết cấu da, làm mờ thâm đỏ mụn, se khít lỗ chân lông và kiểm soát dầu thừa hiệu quả mà không gây châm chích.
                        </p>
                      </div>
                      <div className="relative h-60 rounded-2xl overflow-hidden border border-white/20">
                        <Image src="https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=600&auto=format&fit=crop" alt="Niacinamide" fill className="object-cover" />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="centella">
                  <Card className="bg-white/5 border-white/10 text-white p-8 rounded-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <Badge className="bg-emerald-500 text-white font-bold">PHỤC HỒI DỊU NHẸ</Badge>
                        <h3 className="font-heading text-2xl font-bold text-emerald-300">Rau Má Jeju Centella Asiatica</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Chiết xuất 85% rau má tươi từ đảo Jeju giúp phục hồi màng hàng rào bảo vệ da, làm dịu tức thì làn da kích ứng.
                        </p>
                      </div>
                      <div className="relative h-60 rounded-2xl overflow-hidden border border-white/20">
                        <Image src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop" alt="Jeju Centella" fill className="object-cover" />
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="vitaminc">
                  <Card className="bg-white/5 border-white/10 text-white p-8 rounded-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-4">
                        <Badge className="bg-amber-500 text-white font-bold">SÁNG DA MỜ THÂM</Badge>
                        <h3 className="font-heading text-2xl font-bold text-amber-300">Pure Vitamin C 15%</h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          L-Ascorbic Acid tinh khiết kết hợp Ferulic Acid chống oxy hóa mạnh mẽ, làm sáng vết thâm và thúc đẩy tăng sinh Collagen.
                        </p>
                      </div>
                      <div className="relative h-60 rounded-2xl overflow-hidden border border-white/20">
                        <Image src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop" alt="Pure Vitamin C" fill className="object-cover" />
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* REVIEWS MARQUEE */}
          <section className="py-20 px-4 sm:px-6 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="border-pink-500/30 text-pink-600 font-bold text-xs uppercase">
                  CUSTOMER REVIEWS
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">Phái Đẹp Nói Gì Về LUMIÈRE LABS</h2>
              </div>

              <Marquee pauseOnHover className="[--duration:25s]">
                {REVIEWS.map((rev, idx) => (
                  <Card key={idx} className="w-80 sm:w-96 bg-white border-slate-200 p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-3xl hover:border-cyan-500/40 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                        "{rev.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-cyan-400">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-slate-900">{rev.name}</h4>
                        <p className="text-[10px] text-cyan-600 font-semibold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>
        </main>
      )}

      {/* VIEW 2: PRODUCTS PAGE */}
      {activeTab === "products" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-600 font-bold text-xs uppercase">
                FULL COLLECTION
              </Badge>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900">
                Tất Cả Sản Phẩm LUMIÈRE LABS
              </h1>
              <p className="text-slate-600 max-w-xl mx-auto text-sm">
                Danh mục 12+ dược mỹ phẩm thuần chay dưỡng da căng bóng mọng nước.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "all" ? "bg-cyan-500 text-white" : ""}`}
              >
                Tất Cả (12)
              </Button>
              <Button
                variant={categoryFilter === "skincare" ? "default" : "outline"}
                onClick={() => setCategoryFilter("skincare")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "skincare" ? "bg-cyan-500 text-white" : ""}`}
              >
                Chăm Sóc Da (7)
              </Button>
              <Button
                variant={categoryFilter === "makeup" ? "default" : "outline"}
                onClick={() => setCategoryFilter("makeup")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "makeup" ? "bg-cyan-500 text-white" : ""}`}
              >
                Trang Điểm (2)
              </Button>
              <Button
                variant={categoryFilter === "bodycare" ? "default" : "outline"}
                onClick={() => setCategoryFilter("bodycare")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "bodycare" ? "bg-cyan-500 text-white" : ""}`}
              >
                Dưỡng Thể (2)
              </Button>
              <Button
                variant={categoryFilter === "sets" ? "default" : "outline"}
                onClick={() => setCategoryFilter("sets")}
                className={`rounded-full text-xs font-bold px-5 py-2 ${categoryFilter === "sets" ? "bg-cyan-500 text-white" : ""}`}
              >
                Bộ Sản Phẩm (1)
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-white border-slate-200/80 hover:border-cyan-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-3xl"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openProductDetail(product)}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-pink-500 text-white border-none font-bold text-[11px] px-2.5 py-1">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        <span className="font-bold text-slate-800">{product.rating}</span>
                        <span className="text-slate-400">({product.reviewsCount})</span>
                      </div>
                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-heading font-bold text-base text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-heading font-extrabold text-base text-cyan-600">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through block">
                            {product.originalPrice.toLocaleString("vi-VN")}đ
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs px-3.5 py-2"
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
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-md">
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
                    className="relative h-20 w-20 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-cyan-500 shrink-0"
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-700 font-bold mb-2">
                  {selectedProduct.category.toUpperCase()}
                </Badge>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800">{selectedProduct.rating}</span>
                  <span className="text-slate-400">({selectedProduct.reviewsCount} Đánh giá)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-heading font-extrabold text-3xl text-cyan-600">
                  {selectedProduct.price.toLocaleString("vi-VN")}đ
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-slate-400 line-through text-lg">
                    {selectedProduct.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed border-y border-slate-200/80 py-4">
                {selectedProduct.description}
              </p>

              {/* Volume Options */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-800">Dung Tích / Kích Thước:</Label>
                <div className="flex gap-2">
                  {selectedProduct.volumeOptions.map((vol) => (
                    <Button
                      key={vol}
                      type="button"
                      variant={selectedSize === vol ? "default" : "outline"}
                      onClick={() => setSelectedSize(vol)}
                      className={`rounded-xl text-xs font-bold px-4 py-2 ${selectedSize === vol ? "bg-cyan-500 text-white" : ""}`}
                    >
                      {vol}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity Controls & Add Button */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                    className="h-10 w-10 text-slate-600"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">{detailQuantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDetailQuantity(detailQuantity + 1)}
                    className="h-10 w-10 text-slate-600"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => addToCart(selectedProduct, selectedSize, detailQuantity)}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold rounded-2xl h-12 text-sm shadow-lg shadow-cyan-500/25"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Thêm Vào Giỏ Hàng
                </Button>
              </div>

              {/* Additional Tabs */}
              <Tabs defaultValue="ingredients" className="pt-6">
                <TabsList className="grid grid-cols-3 bg-slate-100 rounded-xl p-1">
                  <TabsTrigger value="ingredients" className="text-xs font-bold">Thành Phần</TabsTrigger>
                  <TabsTrigger value="howtouse" className="text-xs font-bold">Cách Dùng</TabsTrigger>
                  <TabsTrigger value="shipping" className="text-xs font-bold">Giao Hàng</TabsTrigger>
                </TabsList>
                <TabsContent value="ingredients" className="text-xs text-slate-600 leading-relaxed pt-3">
                  {selectedProduct.ingredients}
                </TabsContent>
                <TabsContent value="howtouse" className="text-xs text-slate-600 leading-relaxed pt-3">
                  {selectedProduct.howToUse}
                </TabsContent>
                <TabsContent value="shipping" className="text-xs text-slate-600 leading-relaxed pt-3">
                  Freeship toàn quốc đơn từ 399.000đ. Giao nhanh 1-2 ngày làm việc.
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
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-600 font-bold text-xs uppercase">
              ABOUT US
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900">
              LUMIÈRE LABS — K-Beauty Glass Skin Science
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Chúng tôi nghiên cứu và tiên phong các dòng dược mỹ phẩm thuần chay sinh học, đưa trải nghiệm làn da căng bóng Glass Skin ngậm nước chuẩn Hàn đến hàng triệu phái đẹp Việt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-slate-200 p-6 text-center space-y-3 rounded-3xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mx-auto">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">100% Thuần Chay</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Không chứa thành phần từ động vật, không thử nghiệm trên động vật.</p>
            </Card>

            <Card className="bg-white border-slate-200 p-6 text-center space-y-3 rounded-3xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Kiểm Nghiệm Da Liễu</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Được kiểm định độ an toàn an toàn lành tính cho làn da nhạy cảm nhất.</p>
            </Card>

            <Card className="bg-white border-slate-200 p-6 text-center space-y-3 rounded-3xl shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Công Thức Glass Skin</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Cấp ẩm đa tầng tức thì, tạo hiệu ứng làn da căng bóng mịn mượt.</p>
            </Card>
          </div>
        </main>
      )}

      {/* CART DRAWER / MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6 overflow-hidden">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="font-heading font-extrabold text-lg text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-cyan-600" /> Giỏ Hàng ({totalCartCount})
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-2xl p-3.5 text-xs text-cyan-900">
                {cartTotal >= 399000 ? (
                  <p className="font-bold flex items-center gap-1.5 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" /> Bạn đã đủ điều kiện FREESHIP TOÀN QUỐC!
                  </p>
                ) : (
                  <p className="font-medium">
                    Mua thêm <span className="font-bold text-pink-600">{(399000 - cartTotal).toLocaleString("vi-VN")}đ</span> để nhận FREESHIP!
                  </p>
                )}
              </div>

              {/* Cart Items List */}
              <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-center py-12 text-slate-400 text-sm font-medium">Giỏ hàng của bạn đang trống.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border-b border-slate-100 pb-3">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-xs text-slate-900 truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-slate-400">{item.selectedSize}</p>
                        <p className="font-bold text-xs text-cyan-600 mt-1">{item.product.price.toLocaleString("vi-VN")}đ</p>
                      </div>
                      <div className="flex items-center border rounded-lg bg-slate-50">
                        <button onClick={() => updateCartQty(item.id, -1)} className="px-2 text-slate-600 font-bold text-xs">-</button>
                        <span className="px-2 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.id, 1)} className="px-2 text-slate-600 font-bold text-xs">+</button>
                      </div>
                      <button onClick={() => removeCartItem(item.id)} className="text-slate-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer & Checkout */}
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-bold text-slate-900">{cartTotal.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="font-bold text-slate-900">{cartTotal >= 399000 || cartTotal === 0 ? "0đ (Freeship)" : "30.000đ"}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-slate-900 border-t pt-2">
                  <span>Tổng tiền:</span>
                  <span className="text-cyan-600">{(cartTotal + (cartTotal >= 399000 || cartTotal === 0 ? 0 : 30000)).toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <ShimmerButton onClick={handleCheckout} className="w-full py-3.5 font-extrabold text-sm shadow-xl">
                THANH TOÁN ĐƠN HÀNG ✨
              </ShimmerButton>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-16 px-4 sm:px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <span className="font-heading font-extrabold text-xl text-white">LUMIÈRE LABS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dược mỹ phẩm thuần chay sinh học mang đến vẻ đẹp căng bóng mọng nước Glass Skin chuẩn Hàn Quốc.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Danh Mục Sản Phẩm</h4>
            <p onClick={() => setActiveTab("products")} className="hover:text-cyan-400 cursor-pointer">Serum Dưỡng Ẩm</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-cyan-400 cursor-pointer">Kem Dưỡng Phục Hồi</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-cyan-400 cursor-pointer">Phấn Nước Cushion</p>
            <p onClick={() => setActiveTab("products")} className="hover:text-cyan-400 cursor-pointer">Bộ Sản Phẩm Discovery</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Hỗ Trợ Khách Hàng</h4>
            <p className="hover:text-cyan-400 cursor-pointer">Hướng Dẫn Chọn Routine</p>
            <p className="hover:text-cyan-400 cursor-pointer">Chính Sách Đổi Trả</p>
            <p className="hover:text-cyan-400 cursor-pointer">Kiểm Tra Đơn Hàng</p>
            <p className="hover:text-cyan-400 cursor-pointer">Chính Sách Bảo Mật</p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white text-sm">Đăng Ký Nhận Ưu Đãi</h4>
            <p className="text-slate-400">Nhận mã giảm giá 10% cho đơn hàng đầu tiên.</p>
            <div className="flex gap-2">
              <Input placeholder="Email..." className="bg-slate-900 border-slate-800 text-xs text-white" />
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs shrink-0">Gửi</Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 LUMIÈRE LABS Glass Skin Science. All rights reserved.</p>
          <p className="text-cyan-400 font-mono">WSOS Studio E-Commerce Showcase</p>
        </div>
      </footer>
    </div>
  );
}
