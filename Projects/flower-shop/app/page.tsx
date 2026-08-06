"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Star,
  CheckCircle2,
  ChevronRight,
  Menu as MenuIcon,
  X,
  Flower2,
  Truck,
  Clock,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Heart,
  Leaf,
  Gift,
  Sparkles,
  MapPin,
  Phone,
  Camera,
  Send,
} from "lucide-react";

// Imports from @wsos/ui workspace package
import { Button } from "@wsos/ui/components/button";
import { Card, CardContent } from "@wsos/ui/components/card";
import { Badge } from "@wsos/ui/components/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@wsos/ui/components/tabs";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@wsos/ui/components/sheet";

// Imports from @wsos/ui blocks (Magic UI)
import { BlurFade } from "@wsos/ui/blocks/blur-fade";
import { NumberTicker } from "@wsos/ui/blocks/number-ticker";
import { BorderBeam } from "@wsos/ui/blocks/border-beam";
import { ShimmerButton } from "@wsos/ui/blocks/shimmer-button";
import { Marquee } from "@wsos/ui/blocks/marquee";

// Types
export type Category = "bouquet" | "basket" | "event" | "plant";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  badgeType?: "rose" | "blush" | "leaf";
  image: string;
  galleryImages: string[];
  description: string;
  flowers: string;
  care: string;
  sizeOptions: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  quantity: number;
}

const CATEGORY_LABELS: Record<Category, string> = {
  bouquet: "Bó Hoa",
  basket: "Giỏ & Hộp Hoa",
  event: "Hoa Sự Kiện",
  plant: "Cây & Hoa Chậu",
};

// ============================================================================
//  🌸 CẤU HÌNH ẢNH — SỬA TẤT CẢ ĐƯỜNG DẪN ẢNH TẠI ĐÂY (một chỗ duy nhất)
//  • IMG.products[id][0] = ảnh CHÍNH của card; các phần tử sau = ảnh trong gallery.
//  • Ghi chú mỗi dòng = loại hoa ĐÚNG cần khớp với tên sản phẩm khi bạn thay ảnh.
//  • Đổi "mood" ảnh (filter / lớp phủ hồng) trong app/globals.css:
//    biến --img-filter và --img-tint (không cần sửa file này).
// ============================================================================
const IMG = {
  // Hero trang chủ — bó hồng phấn signature, tông hồng/pastel
  hero: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
  // Ảnh "Về chúng tôi" — nghệ nhân / không gian studio đang cắm hoa
  about: "https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=800&auto=format&fit=crop",

  // Ảnh sản phẩm (khớp theo id). [0] = ảnh chính hiển thị trên card.
  products: {
    // f1 · Bó Hồng Unicorn Blush → CẦN: hồng Ohara phấn/kem (KHÔNG phải hồng nhuộm cầu vồng)
    f1: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=600&auto=format&fit=crop",
    ],
    // f2 · Tulip Amsterdam Vàng Nắng → CẦN: tulip vàng & cam
    f2: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=600&auto=format&fit=crop",
    ],
    // f3 · Giỏ Hoa Mẫu Đơn Peony Dream → CẦN: mẫu đơn (peony) hồng, đựng giỏ mây
    f3: [
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=600&auto=format&fit=crop",
    ],
    // f4 · Hộp Hoa Hồng Đỏ Ruby Love → CẦN: hộp tròn hồng đỏ Ecuador
    f4: [
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop",
    ],
    // f5 · Bó Hướng Dương Sunny Field → CẦN: hướng dương (sunflower)
    f5: [
      "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=600&auto=format&fit=crop",
    ],
    // f6 · Cẩm Tú Cầu Xanh Provence → CẦN: cẩm tú cầu (hydrangea) xanh
    f6: [
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop",
    ],
    // f7 · Kệ Hoa Khai Trương Thịnh Vượng → CẦN: kệ/lẵng hoa khai trương lớn nhiều tầng
    f7: [
      "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?q=80&w=600&auto=format&fit=crop",
    ],
    // f8 · Hoa Cưới Cầm Tay Bride White → CẦN: bó hoa cưới cầm tay tông trắng
    f8: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    ],
    // f9 · Lan Hồ Điệp Chậu Sứ Ngọc → CẦN: chậu lan hồ điệp hồng
    f9: [
      "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=600&auto=format&fit=crop",
    ],
    // f10 · Baby Trắng Mộng Mơ Cloud → CẦN: hoa baby (baby's breath) trắng
    f10: [
      "https://images.unsplash.com/photo-1464982326199-86f32f81b211?q=80&w=600&auto=format&fit=crop",
    ],
    // f11 · Giỏ Hoa Trái Cây Chúc Sức Khỏe → CẦN: giỏ phối hoa tươi + trái cây
    f11: [
      "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?q=80&w=600&auto=format&fit=crop",
    ],
    // f12 · Chậu Sen Đá Mini Terrarium → CẦN: sen đá / terrarium trong bình thuỷ tinh
    f12: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&auto=format&fit=crop",
    ],
  } as Record<string, string[]>,

  // Avatar khách hàng (mục đánh giá) — khớp thứ tự với REVIEWS bên dưới
  reviews: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop", // Nguyễn Lan Anh
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", // Trần Quốc Bảo
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop", // Phạm Thu Hà
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop", // Lê Minh Tuấn
  ],

  // Grid Instagram (6 ảnh vuông) — nên chọn ảnh hoa / không gian tiệm cùng tông hồng-pastel
  instagram: [
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464982326199-86f32f81b211?q=80&w=400&auto=format&fit=crop",
  ],
};

// Flower products — dữ liệu sản phẩm; ảnh tham chiếu từ IMG.products (đồng bộ theo id)
const PRODUCTS_DATA: Product[] = [
  {
    id: "f1",
    name: "Bó Hồng Unicorn Blush",
    category: "bouquet",
    price: 650000,
    originalPrice: 820000,
    rating: 4.9,
    reviewsCount: 168,
    badge: "Bán Chạy",
    badgeType: "rose",
    image: IMG.products.f1[0],
    galleryImages: IMG.products.f1,
    description:
      "Bó hồng phấn Ohara nhập khẩu kết hợp cẩm chướng và lá bạc hà, gói giấy kraft tông pastel — món quà lãng mạn cho một nửa yêu thương.",
    flowers: "20 hồng Ohara phấn, cẩm chướng kem, lá bạch đàn, baby trắng.",
    care: "Cắt gốc chéo, thay nước mỗi 2 ngày, tránh nắng gắt. Tươi 5–7 ngày.",
    sizeOptions: ["Size S · 20 bông", "Size M · 30 bông", "Size L · 50 bông"],
  },
  {
    id: "f2",
    name: "Tulip Amsterdam Vàng Nắng",
    category: "bouquet",
    price: 540000,
    originalPrice: 680000,
    rating: 4.8,
    reviewsCount: 121,
    badge: "Mới Về",
    badgeType: "blush",
    image: IMG.products.f2[0],
    galleryImages: IMG.products.f2,
    description:
      "Tulip Hà Lan tươi rói tông vàng nắng và cam san hô, bó tròn thanh lịch mang năng lượng rạng rỡ cho ngày mới.",
    flowers: "25 tulip Hà Lan vàng & cam, lá dương xỉ, ruban lụa.",
    care: "Tulip vẫn 'lớn' sau khi cắm — để nơi mát, nước ngập 1/3 thân. Tươi 4–6 ngày.",
    sizeOptions: ["Size S · 15 bông", "Size M · 25 bông"],
  },
  {
    id: "f3",
    name: "Giỏ Hoa Mẫu Đơn Peony Dream",
    category: "basket",
    price: 1150000,
    originalPrice: 1450000,
    rating: 5.0,
    reviewsCount: 204,
    badge: "Giảm 20%",
    badgeType: "leaf",
    image: IMG.products.f3[0],
    galleryImages: IMG.products.f3,
    description:
      "Giỏ mây đan thủ công đầy ắp mẫu đơn hồng ngậm sương — tuyệt phẩm dành tặng mẹ, sếp hay dịp khai trương sang trọng.",
    flowers: "15 mẫu đơn hồng, hồng kem, cẩm tú cầu xanh, lá phong.",
    care: "Giữ giỏ nơi mát, xịt ẩm cánh hoa buổi sáng. Tươi 4–5 ngày.",
    sizeOptions: ["Giỏ M", "Giỏ L", "Giỏ Deluxe"],
  },
  {
    id: "f4",
    name: "Hộp Hoa Hồng Đỏ Ruby Love",
    category: "basket",
    price: 890000,
    rating: 4.9,
    reviewsCount: 143,
    badge: "Tình Yêu",
    badgeType: "rose",
    image: IMG.products.f4[0],
    galleryImages: IMG.products.f4,
    description:
      "Hộp tròn nhung đỏ xếp hồng Ecuador cao cấp theo dạng vòm — biểu tượng của tình yêu nồng cháy và lời tỏ tình khó quên.",
    flowers: "25 hồng đỏ Ecuador, lá bạc, nơ satin đỏ.",
    care: "Hoa trong hộp có mút giữ nước — nhỏ 20ml nước mỗi ngày. Tươi 5–7 ngày.",
    sizeOptions: ["Hộp 19 bông", "Hộp 25 bông", "Hộp 50 bông"],
  },
  {
    id: "f5",
    name: "Bó Hướng Dương Sunny Field",
    category: "bouquet",
    price: 420000,
    originalPrice: 520000,
    rating: 4.7,
    reviewsCount: 96,
    badge: "Giảm 19%",
    badgeType: "leaf",
    image: IMG.products.f5[0],
    galleryImages: IMG.products.f5,
    description:
      "Hướng dương rực rỡ phối cúc mẫu đơn xanh — lời chúc thành công, may mắn ý nghĩa cho ngày tốt nghiệp hoặc thăng chức.",
    flowers: "7 hướng dương, cúc mẫu đơn, lá monstera.",
    care: "Thân hướng dương hút nhiều nước — thay nước mỗi ngày. Tươi 5–6 ngày.",
    sizeOptions: ["Bó 5 bông", "Bó 7 bông", "Bó 10 bông"],
  },
  {
    id: "f6",
    name: "Cẩm Tú Cầu Xanh Provence",
    category: "bouquet",
    price: 620000,
    rating: 4.8,
    reviewsCount: 88,
    image: IMG.products.f6[0],
    galleryImages: IMG.products.f6,
    description:
      "Bó cẩm tú cầu xanh dịu như bầu trời Provence, gói vintage nhẹ nhàng — hoàn hảo cho không gian sống và quà tân gia.",
    flowers: "5 cẩm tú cầu xanh, hồng kem, lá oliu.",
    care: "Cẩm tú cầu 'khát' nước — ngâm nguyên bông vào nước lạnh khi héo. Tươi 4–5 ngày.",
    sizeOptions: ["Bó S", "Bó M"],
  },
  {
    id: "f7",
    name: "Kệ Hoa Khai Trương Thịnh Vượng",
    category: "event",
    price: 1650000,
    originalPrice: 1990000,
    rating: 4.9,
    reviewsCount: 62,
    badge: "Sự Kiện",
    badgeType: "rose",
    image: IMG.products.f7[0],
    galleryImages: IMG.products.f7,
    description:
      "Kệ hoa 2 tầng lay-ơn, hồng môn và lan hồ điệp rực rỡ — gửi lời chúc phát tài phát lộc cho lễ khai trương, khánh thành.",
    flowers: "Lan hồ điệp, hồng môn đỏ, lay-ơn, cúc mẫu đơn.",
    care: "Kệ hoa dùng cho sự kiện, bền đẹp 3–4 ngày ngoài trời có mái che.",
    sizeOptions: ["Kệ 1 tầng", "Kệ 2 tầng", "Kệ 3 tầng"],
  },
  {
    id: "f8",
    name: "Hoa Cưới Cầm Tay Bride White",
    category: "event",
    price: 980000,
    rating: 5.0,
    reviewsCount: 74,
    badge: "Cô Dâu",
    badgeType: "blush",
    image: IMG.products.f8[0],
    galleryImages: IMG.products.f8,
    description:
      "Bó hoa cưới cầm tay tông trắng tinh khôi từ hồng David Austin và lan ly — tôn vẻ đẹp thanh khiết của cô dâu trong ngày trọng đại.",
    flowers: "Hồng David Austin trắng, lan ly, baby, lá dương xỉ mềm.",
    care: "Bảo quản lạnh trước giờ cưới, giữ tay cầm ẩm. Đẹp trọn ngày dài.",
    sizeOptions: ["Cầm tay cô dâu", "Set cô dâu + phù dâu"],
  },
  {
    id: "f9",
    name: "Lan Hồ Điệp Chậu Sứ Ngọc",
    category: "plant",
    price: 1250000,
    originalPrice: 1500000,
    rating: 4.9,
    reviewsCount: 110,
    badge: "Sang Trọng",
    badgeType: "leaf",
    image: IMG.products.f9[0],
    galleryImages: IMG.products.f9,
    description:
      "Chậu lan hồ điệp 5 cành hồng phấn trồng trong bình sứ men ngọc — quà biếu sang trọng, giữ vẻ đẹp bền bỉ suốt 2 tháng.",
    flowers: "5 cành lan hồ điệp hồng, rêu trang trí, chậu sứ men ngọc.",
    care: "Tưới 2 lần/tuần bằng đá lạnh, để nơi sáng nhẹ. Bền 6–8 tuần.",
    sizeOptions: ["3 cành", "5 cành", "7 cành"],
  },
  {
    id: "f10",
    name: "Baby Trắng Mộng Mơ Cloud",
    category: "bouquet",
    price: 350000,
    rating: 4.6,
    reviewsCount: 133,
    image: IMG.products.f10[0],
    galleryImages: IMG.products.f10,
    description:
      "Bó baby trắng bồng bềnh như mây, nhẹ nhàng và tinh tế — món quà dễ thương cho lời chúc bình yên và sự trong sáng.",
    flowers: "Baby trắng nguyên bó, giấy gói pastel, ruban lụa.",
    care: "Baby rất bền, có thể phơi khô làm hoa treo trang trí. Tươi 7–10 ngày.",
    sizeOptions: ["Bó nhỏ", "Bó vừa", "Bó lớn"],
  },
  {
    id: "f11",
    name: "Giỏ Hoa Trái Cây Chúc Sức Khỏe",
    category: "basket",
    price: 780000,
    rating: 4.7,
    reviewsCount: 57,
    badge: "Thăm Hỏi",
    badgeType: "leaf",
    image: IMG.products.f11[0],
    galleryImages: IMG.products.f11,
    description:
      "Giỏ kết hợp hoa tươi và trái cây nhập khẩu theo mùa — lời thăm hỏi ân cần, chu đáo gửi tới người thân đang dưỡng bệnh.",
    flowers: "Hồng kem, cúc, trái cây theo mùa, giỏ mây.",
    care: "Bảo quản mát, dùng trái cây trong 3 ngày. Hoa tươi 4 ngày.",
    sizeOptions: ["Giỏ M", "Giỏ L"],
  },
  {
    id: "f12",
    name: "Chậu Sen Đá Mini Terrarium",
    category: "plant",
    price: 280000,
    originalPrice: 350000,
    rating: 4.8,
    reviewsCount: 95,
    badge: "Để Bàn",
    badgeType: "blush",
    image: IMG.products.f12[0],
    galleryImages: IMG.products.f12,
    description:
      "Terrarium sen đá mini trong bình thủy tinh — món quà xanh nhỏ xinh cho góc làm việc, dễ chăm và trường tồn.",
    flowers: "Sen đá phối màu, sỏi trắng, bình thủy tinh geometric.",
    care: "Nắng nhẹ, tưới 1 lần/tuần vài giọt. Sống rất lâu.",
    sizeOptions: ["Bình tròn", "Bình trụ", "Set 3 bình"],
  },
];

const REVIEWS = [
  {
    name: "Nguyễn Lan Anh",
    role: "Khách hàng thân thiết",
    avatar: IMG.reviews[0],
    content:
      "Bó hồng phấn đẹp hơn cả hình, giao đúng giờ hẹn cho sinh nhật bạn gái. Người yêu mình thích mê, sẽ ủng hộ dài dài!",
    rating: 5,
  },
  {
    name: "Trần Quốc Bảo",
    role: "Chủ doanh nghiệp",
    avatar: IMG.reviews[1],
    content:
      "Đặt kệ hoa khai trương cho cửa hàng mới, hoa tươi sang trọng, chữ thiệp gọn gàng. Rất chuyên nghiệp.",
    rating: 5,
  },
  {
    name: "Phạm Thu Hà",
    role: "Cô dâu tháng 6",
    avatar: IMG.reviews[2],
    content:
      "Hoa cưới cầm tay tông trắng đúng ý mình 100%. Ekip tư vấn nhiệt tình, giữ hoa tươi suốt buổi tiệc dài.",
    rating: 5,
  },
  {
    name: "Lê Minh Tuấn",
    role: "Nhân viên văn phòng",
    avatar: IMG.reviews[3],
    content:
      "Giao hoa tận nơi trong 2 tiếng thật sự cứu mình vào phút chót ngày 8/3. Cảm ơn MAISON FLEUR nhiều!",
    rating: 5,
  },
];

const INSTAGRAM_PHOTOS = IMG.instagram;

const OCCASIONS = [
  { key: "love", label: "💕 Tình Yêu", title: "Ngày Tình Nhân & Kỷ Niệm", desc: "Hồng đỏ, hộp hoa nhung và những lời tỏ tình ngọt ngào nhất." },
  { key: "birthday", label: "🎂 Sinh Nhật", title: "Chúc Mừng Sinh Nhật", desc: "Bó hoa rực rỡ cá tính, gói quà kèm bánh và bóng bay tuỳ chọn." },
  { key: "opening", label: "🎊 Khai Trương", title: "Khai Trương · Sự Kiện", desc: "Kệ hoa hoành tráng gửi lời chúc phát tài, phát lộc, thịnh vượng." },
  { key: "grief", label: "🕊️ Chia Buồn", title: "Hoa Chia Buồn", desc: "Vòng hoa và lẵng hoa trang nghiêm, gửi gắm sự tiếc thương chân thành." },
];

export default function FlowerShop() {
  const [activeTab, setActiveTab] = useState<"home" | "products" | "detail" | "about">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS_DATA[0].sizeOptions[0]);
  const [detailQuantity, setDetailQuantity] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<"all" | Category>("all");

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [cart, setCart] = useState<CartItem[]>([
    { id: "c1", product: PRODUCTS_DATA[0], selectedSize: PRODUCTS_DATA[0].sizeOptions[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 24, seconds: 42 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addToCart = (product: Product, size?: string, qty: number = 1) => {
    const targetSize = size || product.sizeOptions[0];
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
    showToast(`Đã thêm "${product.name}" vào giỏ! 🌸`);
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
    setGalleryIndex(0);
    setSelectedSize(product.sizeOptions[0]);
    setDetailQuantity(1);
    setActiveTab("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Giỏ hàng của bạn đang trống!");
      return;
    }
    showToast("🎉 Đặt hoa thành công! MAISON FLEUR sẽ gọi xác nhận trong 5 phút.");
    setCart([]);
    setIsCartOpen(false);
  };

  const normalize = (s: string) => s.toLowerCase();
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    const matchSearch = searchQuery.trim() === "" || normalize(p.name).includes(normalize(searchQuery));
    return matchCat && matchSearch;
  });

  const badgeClass = (type?: Product["badgeType"]) =>
    type === "blush"
      ? "bg-[#F4C9D7] text-[#2a1a1f]"
      : type === "leaf"
      ? "bg-[#6B8E5A] text-white"
      : "bg-[#C1436D] text-white";

  const formatVnd = (n: number) => n.toLocaleString("vi-VN") + "đ";

  return (
    <div className="relative min-h-screen bg-[#FFF8F6] text-[#2a1a1f] font-sans">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-full bg-[#C1436D] text-white px-6 py-3.5 font-medium shadow-2xl text-sm max-w-[90vw]">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4C9D7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#2a1a1f]/80 backdrop-blur-lg flex flex-col justify-start pt-20 px-6">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            <div className="flex justify-between items-center text-white">
              <span className="text-xs uppercase font-mono tracking-widest text-[#F4C9D7]">MAISON FLEUR · TÌM KIẾM</span>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:text-[#F4C9D7]">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-[#8a6b73]" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm bó hồng, tulip, lan hồ điệp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-white/50 text-lg focus:outline-none focus:border-[#F4C9D7]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
              <span className="font-bold text-[#F4C9D7]">Gợi ý:</span>
              {["Hồng", "Tulip", "Mẫu đơn", "Lan hồ điệp", "Hướng dương"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setActiveTab("products");
                    setIsSearchOpen(false);
                    window.scrollTo({ top: 0 });
                  }}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white/90 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Announcement bar */}
      <div className="bg-[#C1436D] text-white text-xs font-medium py-2.5 px-4 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:22s]">
          <span className="mx-6 tracking-wide">🚚 GIAO HOA TẬN NƠI TRONG 2 GIỜ TẠI NỘI THÀNH</span>
          <span className="mx-6 tracking-wide">🌸 HOA TƯƠI NHẬP KHẨU MỖI SÁNG · CAM KẾT ĐỔI NẾU HÉO</span>
          <span className="mx-6 tracking-wide">🎁 FREESHIP CHO ĐƠN TỪ 500K · TẶNG THIỆP VIẾT TAY</span>
        </Marquee>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#FFF8F6]/90 backdrop-blur-md border-b border-[#F0DCD8] shadow-sm py-3.5" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button onClick={() => setActiveTab("home")} className="group text-left flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-[#C1436D] flex items-center justify-center text-white shrink-0">
              <Flower2 className="h-5 w-5" />
            </span>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-[#2a1a1f]">
              MAISON <span className="text-[#C1436D] font-serif-italic font-normal">fleur</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#2a1a1f]">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-[#C1436D] transition-colors ${activeTab === "home" ? "text-[#C1436D]" : ""}`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => {
                setCategoryFilter("all");
                setActiveTab("products");
              }}
              className={`hover:text-[#C1436D] transition-colors ${activeTab === "products" ? "text-[#C1436D]" : ""}`}
            >
              Cửa Hàng Hoa
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`hover:text-[#C1436D] transition-colors ${activeTab === "about" ? "text-[#C1436D]" : ""}`}
            >
              Về Chúng Tôi
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-[#F8EBE8] text-[#2a1a1f] transition-colors"
              title="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#F8EBE8] text-[#2a1a1f] transition-colors"
              title="Giỏ hàng"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-[#C1436D] text-white font-extrabold text-[10px] flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#2a1a1f]">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#FFF8F6] border-[#F0DCD8]">
                  <SheetHeader>
                    <SheetTitle className="text-left font-heading text-xl text-[#C1436D]">MAISON fleur</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8 px-4 font-semibold text-lg text-[#2a1a1f]">
                    <button onClick={() => setActiveTab("home")} className="text-left hover:text-[#C1436D]">
                      Trang Chủ
                    </button>
                    <button
                      onClick={() => {
                        setCategoryFilter("all");
                        setActiveTab("products");
                      }}
                      className="text-left hover:text-[#C1436D]"
                    >
                      Cửa Hàng Hoa
                    </button>
                    <button onClick={() => setActiveTab("about")} className="text-left hover:text-[#C1436D]">
                      Về Chúng Tôi
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* ============ HOME ============ */}
      {activeTab === "home" && (
        <main>
          {/* HERO */}
          <section className="relative pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <BlurFade delay={0.1}>
                  <Badge
                    variant="outline"
                    className="border-[#C1436D]/30 text-[#C1436D] bg-[#C1436D]/5 rounded-full px-4 py-1.5 text-xs font-semibold"
                  >
                    🌸 Bộ Sưu Tập Mùa Này · Fresh Everyday
                  </Badge>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2a1a1f] leading-[1.12]">
                    Gửi Yêu Thương <br />
                    <span className="font-serif-italic font-normal text-[#C1436D] block my-1">Qua Từng Cánh Hoa</span>
                    Tươi Mỗi Ngày
                  </h1>
                </BlurFade>

                <BlurFade delay={0.3}>
                  <p className="text-[#8a6b73] text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
                    MAISON FLEUR thiết kế thủ công từng bó hoa với hoa tươi nhập khẩu mỗi sáng. Đặt online, giao tận nơi
                    trong 2 giờ kèm thiệp viết tay theo yêu cầu.
                  </p>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <ShimmerButton
                      onClick={() => {
                        setCategoryFilter("all");
                        setActiveTab("products");
                      }}
                      className="px-8 py-4 text-sm font-bold bg-[#C1436D] text-white rounded-full shadow-lg shadow-[#C1436D]/20"
                    >
                      ĐẶT HOA NGAY 🌷
                    </ShimmerButton>
                    <Button
                      variant="outline"
                      onClick={() => openProductDetail(PRODUCTS_DATA[0])}
                      className="px-7 py-4 border-[#C1436D] text-[#C1436D] hover:bg-[#C1436D] hover:text-white rounded-full text-sm font-bold transition-all"
                    >
                      Xem Bó Hoa Bán Chạy
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </BlurFade>

                <BlurFade delay={0.5}>
                  <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-sm">
                    <div>
                      <p className="font-heading font-extrabold text-2xl text-[#C1436D]">
                        <NumberTicker value={12000} />+
                      </p>
                      <p className="text-xs text-[#8a6b73]">Đơn hoa đã giao</p>
                    </div>
                    <div className="h-8 w-px bg-[#F0DCD8]" />
                    <div>
                      <p className="font-heading font-extrabold text-2xl text-[#C1436D]">
                        <NumberTicker value={2} /> giờ
                      </p>
                      <p className="text-xs text-[#8a6b73]">Giao nội thành</p>
                    </div>
                    <div className="h-8 w-px bg-[#F0DCD8]" />
                    <div>
                      <p className="font-heading font-extrabold text-2xl text-[#C1436D]">4.9★</p>
                      <p className="text-xs text-[#8a6b73]">Đánh giá</p>
                    </div>
                  </div>
                </BlurFade>
              </div>

              <div className="lg:col-span-5 relative">
                <BlurFade delay={0.3}>
                  <div className="relative mx-auto max-w-md">
                    <div className="fleur-frame relative h-[380px] sm:h-[460px] w-full rounded-[45%_55%_60%_40%/50%_45%_55%_50%] overflow-hidden bg-[#F8EBE8] border border-[#F4C9D7]/60 shadow-2xl group">
                      <BorderBeam size={220} duration={12} delay={0} />
                      <Image
                        src={IMG.hero}
                        alt="Bó hoa MAISON FLEUR"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md border border-[#F0DCD8] p-3 rounded-2xl shadow-xl flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#6B8E5A]/15 flex items-center justify-center text-[#6B8E5A]">
                        <Leaf className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8a6b73] font-mono">FRESH DAILY</p>
                        <p className="text-xs font-bold text-[#2a1a1f]">Hoa Nhập Mỗi Sáng</p>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md border border-[#F0DCD8] p-3 rounded-2xl shadow-xl flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[#C1436D]/10 flex items-center justify-center text-[#C1436D]">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#8a6b73] font-mono">EXPRESS</p>
                        <p className="text-xs font-bold text-[#2a1a1f]">Giao Trong 2h</p>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          {/* TRUST STRIP */}
          <section className="bg-[#C1436D] text-white py-5 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto hidden sm:grid grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Leaf className="h-4 w-4 text-[#F4C9D7] shrink-0" />
                <span>Hoa Tươi Nhập Mỗi Sáng</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Truck className="h-4 w-4 text-[#F4C9D7] shrink-0" />
                <span>Giao Nhanh Trong 2 Giờ</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Gift className="h-4 w-4 text-[#F4C9D7] shrink-0" />
                <span>Tặng Thiệp Viết Tay</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-wide">
                <Sparkles className="h-4 w-4 text-[#F4C9D7] shrink-0" />
                <span>Cam Kết Đổi Nếu Héo</span>
              </div>
            </div>
            <div className="sm:hidden">
              <Marquee pauseOnHover className="[--duration:15s]">
                <span className="mx-6 text-xs flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-[#F4C9D7]" /> Hoa Tươi Mỗi Sáng
                </span>
                <span className="mx-6 text-xs flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#F4C9D7]" /> Giao Trong 2 Giờ
                </span>
                <span className="mx-6 text-xs flex items-center gap-2">
                  <Gift className="h-4 w-4 text-[#F4C9D7]" /> Tặng Thiệp Viết Tay
                </span>
              </Marquee>
            </div>
          </section>

          {/* FLASH SALE */}
          <section className="py-12 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#F4C9D7] to-[#C1436D] p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-2 text-center md:text-left text-white">
                  <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-[#C1436D]">
                    <Clock className="h-3.5 w-3.5 animate-pulse" /> FLASH SALE HÔM NAY
                  </div>
                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold">Giảm 25% Bó Hoa Chọn Lọc</h2>
                  <p className="text-xs sm:text-sm font-medium text-white/90">Số lượng có hạn mỗi ngày — nhanh tay đặt hoa!</p>
                </div>

                <div className="flex items-center gap-3">
                  {[
                    { v: timeLeft.hours, l: "Giờ" },
                    { v: timeLeft.minutes, l: "Phút" },
                    { v: timeLeft.seconds, l: "Giây" },
                  ].map((t, i) => (
                    <React.Fragment key={t.l}>
                      {i > 0 && <span className="text-xl font-bold text-white">:</span>}
                      <div className="bg-white/95 rounded-2xl px-4 py-3 text-center min-w-16 shadow-sm">
                        <span className="font-heading font-extrabold text-2xl text-[#C1436D] block">
                          {String(t.v).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] text-[#8a6b73] font-semibold uppercase">{t.l}</span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setCategoryFilter("all");
                    setActiveTab("products");
                  }}
                  className="bg-white hover:bg-white/90 text-[#C1436D] font-bold rounded-full px-7 py-3 text-sm shadow-lg"
                >
                  Săn Sale Ngay <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* BEST SELLERS */}
          <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
                  BÁN CHẠY NHẤT
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2a1a1f] mt-2">
                  Những Bó Hoa Được Yêu Thích
                </h2>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setCategoryFilter("all");
                  setActiveTab("products");
                }}
                className="text-[#C1436D] hover:text-[#C1436D]/80 font-bold text-sm"
              >
                Xem Tất Cả 12+ Mẫu <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS_DATA.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={openProductDetail}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  wished={wishlist.includes(product.id)}
                  badgeClass={badgeClass}
                  formatVnd={formatVnd}
                />
              ))}
            </div>
          </section>

          {/* OCCASIONS */}
          <section className="py-20 px-4 sm:px-6 bg-[#C1436D]/5 border-y border-[#F0DCD8]">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
                  HOA THEO DỊP
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2a1a1f]">
                  Mỗi Khoảnh Khắc Một Loài Hoa
                </h2>
              </div>

              <Tabs defaultValue="love" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="bg-white border border-[#F0DCD8] p-1.5 rounded-full grid grid-cols-2 md:grid-cols-4 gap-1 h-auto">
                    {OCCASIONS.map((o) => (
                      <TabsTrigger key={o.key} value={o.key} className="rounded-full font-bold text-xs sm:text-sm px-4 py-2">
                        {o.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {OCCASIONS.map((o, idx) => (
                  <TabsContent key={o.key} value={o.key}>
                    <Card className="bg-white border-[#F0DCD8] p-8 rounded-3xl shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="fleur-frame md:col-span-5 relative h-64 rounded-2xl overflow-hidden">
                          <Image src={PRODUCTS_DATA[idx * 3].image} alt={o.title} fill className="object-cover" />
                        </div>
                        <div className="md:col-span-7 space-y-4">
                          <Badge className={badgeClass(idx % 2 === 0 ? "rose" : "leaf") + " font-bold"}>{o.label}</Badge>
                          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#C1436D]">{o.title}</h3>
                          <p className="text-[#8a6b73] text-sm leading-relaxed">{o.desc}</p>
                          <Button
                            onClick={() => {
                              setCategoryFilter("all");
                              setActiveTab("products");
                            }}
                            className="bg-[#C1436D] hover:bg-[#C1436D]/90 text-white font-bold rounded-full px-6"
                          >
                            Khám Phá Ngay <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* REVIEWS */}
          <section className="py-20 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="text-center space-y-3">
                <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
                  KHÁCH HÀNG NÓI GÌ
                </Badge>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2a1a1f]">Được Tin Yêu Mỗi Ngày</h2>
              </div>

              <Marquee pauseOnHover className="[--duration:28s]">
                {REVIEWS.map((rev, idx) => (
                  <Card
                    key={idx}
                    className="w-80 sm:w-96 bg-white border-[#F0DCD8] p-6 mx-3 flex flex-col justify-between shrink-0 shadow-sm rounded-2xl relative"
                  >
                    <span className="font-serif-italic text-5xl text-[#F4C9D7] absolute top-4 right-4 pointer-events-none">
                      &ldquo;
                    </span>
                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#F59E0B]" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#8a6b73] italic leading-relaxed">{rev.content}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[#F0DCD8]">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0 border border-[#C1436D]/30">
                        <Image src={rev.avatar} alt={rev.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-[#2a1a1f]">{rev.name}</h4>
                        <p className="text-[10px] text-[#C1436D] font-semibold">{rev.role}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </Marquee>
            </div>
          </section>

          {/* INSTAGRAM */}
          <section className="py-16 px-4 sm:px-6 bg-white border-t border-[#F0DCD8]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
                  @MAISONFLEUR
                </Badge>
                <h2 className="font-heading text-3xl font-extrabold text-[#2a1a1f]">Theo Dõi Chúng Tôi Trên Instagram</h2>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {INSTAGRAM_PHOTOS.map((src, i) => (
                  <div key={i} className="fleur-frame relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                    <Image src={src} alt={`Instagram ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 z-10 bg-[#C1436D]/0 group-hover:bg-[#C1436D]/40 transition-colors flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ============ PRODUCTS ============ */}
      {activeTab === "products" && (
        <main className="py-12 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen">
          <div className="text-center space-y-3 mb-10">
            <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
              CỬA HÀNG HOA
            </Badge>
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#2a1a1f]">Bộ Sưu Tập Hoa Tươi</h1>
            <p className="text-[#8a6b73] max-w-xl mx-auto">
              Chọn loài hoa gửi trao yêu thương — mỗi bó được cắm thủ công và giao tươi mới đến tay người nhận.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {(["all", "bouquet", "basket", "event", "plant"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  categoryFilter === cat
                    ? "bg-[#C1436D] text-white border-[#C1436D] shadow-md"
                    : "bg-white text-[#2a1a1f] border-[#F0DCD8] hover:border-[#C1436D]/50"
                }`}
              >
                {cat === "all" ? "Tất Cả" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-center text-sm text-[#8a6b73] mb-6">
              Kết quả cho &ldquo;<span className="font-bold text-[#C1436D]">{searchQuery}</span>&rdquo; ·{" "}
              <button onClick={() => setSearchQuery("")} className="underline hover:text-[#C1436D]">
                Xóa lọc
              </button>
            </p>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-[#8a6b73]">
              <Flower2 className="h-12 w-12 mx-auto mb-4 text-[#F4C9D7]" />
              <p className="font-heading text-xl font-bold text-[#2a1a1f]">Không tìm thấy hoa phù hợp</p>
              <p className="text-sm mt-1">Thử chọn danh mục khác hoặc từ khóa khác nhé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={openProductDetail}
                  onAdd={addToCart}
                  onWishlist={toggleWishlist}
                  wished={wishlist.includes(product.id)}
                  badgeClass={badgeClass}
                  formatVnd={formatVnd}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* ============ DETAIL ============ */}
      {activeTab === "detail" && (
        <main className="py-12 px-4 sm:px-6 max-w-6xl mx-auto min-h-screen">
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-1 text-sm font-semibold text-[#8a6b73] hover:text-[#C1436D] mb-8"
          >
            <ChevronRight className="h-4 w-4 rotate-180" /> Quay lại cửa hàng
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="fleur-frame relative aspect-square rounded-3xl overflow-hidden border border-[#F0DCD8] shadow-sm">
                <Image
                  src={selectedProduct.galleryImages[galleryIndex]}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                {selectedProduct.badge && (
                  <Badge className={`absolute top-4 left-4 z-10 border-none font-bold text-xs px-3 py-1 rounded-full ${badgeClass(selectedProduct.badgeType)}`}>
                    {selectedProduct.badge}
                  </Badge>
                )}
              </div>
              {selectedProduct.galleryImages.length > 1 && (
                <div className="flex gap-3">
                  {selectedProduct.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryIndex(i)}
                      className={`fleur-frame relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                        galleryIndex === i ? "border-[#C1436D]" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`${selectedProduct.name} ${i}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase mb-3">
                  {CATEGORY_LABELS[selectedProduct.category]}
                </Badge>
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2a1a1f] leading-tight">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <Star className="h-4 w-4 fill-[#F59E0B]" />
                    <span className="font-bold text-[#2a1a1f]">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-[#8a6b73]">({selectedProduct.reviewsCount} đánh giá)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-heading font-extrabold text-3xl text-[#C1436D]">{formatVnd(selectedProduct.price)}</span>
                {selectedProduct.originalPrice && (
                  <span className="text-lg text-[#8a6b73] line-through">{formatVnd(selectedProduct.originalPrice)}</span>
                )}
              </div>

              <p className="text-[#8a6b73] leading-relaxed">{selectedProduct.description}</p>

              {/* Size */}
              <div className="space-y-2">
                <p className="text-sm font-bold text-[#2a1a1f]">Chọn kích thước / phiên bản:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.sizeOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                        selectedSize === size
                          ? "bg-[#C1436D] text-white border-[#C1436D]"
                          : "bg-white text-[#2a1a1f] border-[#F0DCD8] hover:border-[#C1436D]/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + add */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#F0DCD8] rounded-full overflow-hidden">
                  <button onClick={() => setDetailQuantity((q) => Math.max(1, q - 1))} className="p-3 hover:bg-[#F8EBE8]">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-bold">{detailQuantity}</span>
                  <button onClick={() => setDetailQuantity((q) => q + 1)} className="p-3 hover:bg-[#F8EBE8]">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct, selectedSize, detailQuantity);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 bg-[#C1436D] hover:bg-[#C1436D]/90 text-white font-bold rounded-full py-6 text-sm shadow-lg"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" /> Thêm Vào Giỏ
                </Button>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="p-3.5 rounded-full border border-[#F0DCD8] hover:border-[#C1436D] transition-colors"
                >
                  <Heart className={`h-5 w-5 ${wishlist.includes(selectedProduct.id) ? "fill-[#C1436D] text-[#C1436D]" : "text-[#8a6b73]"}`} />
                </button>
              </div>

              {/* Extra info */}
              <div className="space-y-3 pt-4 border-t border-[#F0DCD8]">
                <div className="flex gap-3 text-sm">
                  <Flower2 className="h-5 w-5 text-[#6B8E5A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#2a1a1f]">Thành phần hoa</p>
                    <p className="text-[#8a6b73]">{selectedProduct.flowers}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Leaf className="h-5 w-5 text-[#6B8E5A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#2a1a1f]">Cách chăm sóc</p>
                    <p className="text-[#8a6b73]">{selectedProduct.care}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Truck className="h-5 w-5 text-[#6B8E5A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#2a1a1f]">Giao hàng</p>
                    <p className="text-[#8a6b73]">Giao trong 2 giờ nội thành · Freeship đơn từ 500K.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="mt-20">
            <h2 className="font-heading text-2xl font-extrabold text-[#2a1a1f] mb-8">Có Thể Bạn Cũng Thích</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS_DATA.filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={openProductDetail}
                    onAdd={addToCart}
                    onWishlist={toggleWishlist}
                    wished={wishlist.includes(product.id)}
                    badgeClass={badgeClass}
                    formatVnd={formatVnd}
                  />
                ))}
            </div>
          </div>
        </main>
      )}

      {/* ============ ABOUT ============ */}
      {activeTab === "about" && (
        <main className="min-h-screen">
          <section className="relative py-20 px-4 sm:px-6 bg-[#C1436D]/5">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <Badge variant="outline" className="border-[#C1436D]/30 text-[#C1436D] font-bold text-xs uppercase">
                CÂU CHUYỆN CỦA CHÚNG TÔI
              </Badge>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#2a1a1f]">
                Nghệ Thuật Cắm Hoa Từ <span className="font-serif-italic text-[#C1436D]">Trái Tim</span>
              </h1>
              <p className="text-[#8a6b73] leading-relaxed max-w-2xl mx-auto">
                MAISON FLEUR ra đời năm 2018 từ tình yêu với những cánh hoa. Chúng tôi tin mỗi bó hoa là một thông điệp —
                và sứ mệnh của chúng tôi là giúp bạn nói lời yêu thương thật đẹp, thật đúng lúc.
              </p>
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fleur-frame relative h-80 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={IMG.about}
                alt="Studio MAISON FLEUR"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-5">
              <h2 className="font-heading text-3xl font-extrabold text-[#2a1a1f]">Vì Sao Chọn MAISON FLEUR?</h2>
              {[
                { icon: Leaf, t: "Hoa tươi tuyển chọn", d: "Nhập mỗi sáng từ Đà Lạt và các nhà vườn nhập khẩu uy tín." },
                { icon: Sparkles, t: "Thiết kế thủ công", d: "Đội ngũ florist giàu kinh nghiệm cắm từng bó theo phong cách riêng." },
                { icon: Truck, t: "Giao nhanh tận tâm", d: "Giao trong 2 giờ nội thành, chụp ảnh xác nhận trước khi trao hoa." },
              ].map((item) => (
                <div key={item.t} className="flex gap-4">
                  <div className="h-11 w-11 rounded-full bg-[#C1436D]/10 flex items-center justify-center text-[#C1436D] shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2a1a1f]">{item.t}</p>
                    <p className="text-sm text-[#8a6b73]">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-14 px-4 sm:px-6 bg-[#C1436D] text-white">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: 12000, s: "+", l: "Đơn hoa đã giao" },
                { n: 7, s: " năm", l: "Kinh nghiệm" },
                { n: 500, s: "+", l: "Mẫu thiết kế" },
                { n: 98, s: "%", l: "Khách hài lòng" },
              ].map((st) => (
                <div key={st.l}>
                  <p className="font-heading text-3xl sm:text-4xl font-extrabold">
                    <NumberTicker value={st.n} className="text-white" />
                    {st.s}
                  </p>
                  <p className="text-xs text-white/80 mt-1">{st.l}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-3xl font-extrabold text-[#2a1a1f]">Sẵn Sàng Gửi Yêu Thương?</h2>
            <p className="text-[#8a6b73]">Đặt hoa online chỉ vài phút — chúng tôi lo phần còn lại.</p>
            <ShimmerButton
              onClick={() => {
                setCategoryFilter("all");
                setActiveTab("products");
                window.scrollTo({ top: 0 });
              }}
              className="px-8 py-4 text-sm font-bold bg-[#C1436D] text-white rounded-full mx-auto"
            >
              ĐẶT HOA NGAY 🌷
            </ShimmerButton>
          </section>
        </main>
      )}

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#2a1a1f] text-white/80 pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-[#C1436D] flex items-center justify-center text-white">
                <Flower2 className="h-5 w-5" />
              </span>
              <span className="font-heading font-extrabold text-xl text-white">
                MAISON <span className="font-serif-italic font-normal text-[#F4C9D7]">fleur</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Cửa hàng hoa tươi thiết kế thủ công. Gửi yêu thương qua từng cánh hoa, mỗi ngày.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#C1436D] flex items-center justify-center transition-colors">
                <Camera className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#C1436D] flex items-center justify-center transition-colors">
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Danh Mục</h4>
            <ul className="space-y-2 text-sm">
              {(["bouquet", "basket", "event", "plant"] as Category[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setCategoryFilter(cat);
                      setActiveTab("products");
                      window.scrollTo({ top: 0 });
                    }}
                    className="hover:text-[#F4C9D7] transition-colors"
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F4C9D7] shrink-0" /> 128 Nguyễn Huệ, Q.1, TP.HCM
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#F4C9D7] shrink-0" /> 1900 6789
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F4C9D7] shrink-0" /> Mở cửa 7:00 – 21:00 mỗi ngày
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-white mb-4">Đăng Ký Nhận Ưu Đãi</h4>
            <p className="text-sm text-white/60 mb-3">Nhận mã giảm giá và cảm hứng hoa mỗi tuần.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#F4C9D7]"
              />
              <Button
                onClick={() => showToast("Cảm ơn bạn đã đăng ký nhận ưu đãi! 💌")}
                className="bg-[#C1436D] hover:bg-[#C1436D]/90 text-white rounded-full px-4 shrink-0"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          © 2026 MAISON FLEUR. Thiết kế bởi WSOS Studio. Mọi khoảnh khắc, một loài hoa.
        </div>
      </footer>

      {/* ============ CART SHEET ============ */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="bg-[#FFF8F6] border-[#F0DCD8] w-full sm:max-w-md flex flex-col p-0">
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#F0DCD8]">
            <SheetTitle className="text-left font-heading text-xl text-[#2a1a1f] flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#C1436D]" /> Giỏ Hoa ({totalCartCount})
            </SheetTitle>
          </SheetHeader>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 text-[#8a6b73]">
              <Flower2 className="h-14 w-14 mb-4 text-[#F4C9D7]" />
              <p className="font-heading text-lg font-bold text-[#2a1a1f]">Giỏ hoa đang trống</p>
              <p className="text-sm mt-1 mb-6">Hãy chọn một bó hoa xinh gửi tặng nhé!</p>
              <Button
                onClick={() => {
                  setIsCartOpen(false);
                  setCategoryFilter("all");
                  setActiveTab("products");
                }}
                className="bg-[#C1436D] hover:bg-[#C1436D]/90 text-white rounded-full font-bold"
              >
                Chọn Hoa Ngay
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-2xl p-3 border border-[#F0DCD8]">
                    <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#2a1a1f] line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-[#8a6b73] mb-2">{item.selectedSize}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#F0DCD8] rounded-full">
                          <button onClick={() => updateCartQty(item.id, -1)} className="p-1.5 hover:bg-[#F8EBE8]">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="p-1.5 hover:bg-[#F8EBE8]">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold text-sm text-[#C1436D]">{formatVnd(item.product.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeCartItem(item.id)} className="text-[#8a6b73] hover:text-[#d90429] self-start">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#F0DCD8] px-6 py-5 space-y-4 bg-white">
                <div className="flex items-center justify-between text-sm text-[#8a6b73]">
                  <span>Phí giao hàng</span>
                  <span className={cartTotal >= 500000 ? "text-[#6B8E5A] font-bold" : ""}>
                    {cartTotal >= 500000 ? "Miễn phí" : "30.000đ"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2a1a1f]">Tổng cộng</span>
                  <span className="font-heading font-extrabold text-2xl text-[#C1436D]">
                    {formatVnd(cartTotal + (cartTotal >= 500000 ? 0 : 30000))}
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#C1436D] hover:bg-[#C1436D]/90 text-white font-bold rounded-full py-6 text-sm shadow-lg"
                >
                  Đặt Hoa & Thanh Toán <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-[10px] text-[#8a6b73]">🔒 Thanh toán an toàn · Giao hoa trong 2 giờ</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ============ PRODUCT CARD ============
function ProductCard({
  product,
  onOpen,
  onAdd,
  onWishlist,
  wished,
  badgeClass,
  formatVnd,
}: {
  product: Product;
  onOpen: (p: Product) => void;
  onAdd: (p: Product) => void;
  onWishlist: (id: string) => void;
  wished: boolean;
  badgeClass: (t?: Product["badgeType"]) => string;
  formatVnd: (n: number) => string;
}) {
  return (
    <Card className="bg-white border-[#F0DCD8] hover:border-[#C1436D]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group rounded-2xl p-0">
      <div
        className="fleur-frame relative aspect-square overflow-hidden bg-gradient-to-br from-[#FFF8F6] to-[#F4C9D7]/20 cursor-pointer"
        onClick={() => onOpen(product)}
      >
        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <Badge className={`absolute top-3 left-3 z-10 border-none font-bold text-[10px] px-2.5 py-1 rounded-full ${badgeClass(product.badgeType)}`}>
            {product.badge}
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-[#C1436D] text-[#C1436D]" : "text-[#8a6b73]"}`} />
        </button>
      </div>

      <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1 text-[#F59E0B] text-xs mb-1">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B]" />
            <span className="font-bold text-[#2a1a1f]">{product.rating}</span>
            <span className="text-[#8a6b73]">({product.reviewsCount})</span>
          </div>
          <h3
            onClick={() => onOpen(product)}
            className="font-heading font-bold text-base text-[#2a1a1f] group-hover:text-[#C1436D] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#8a6b73] line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
        </div>

        <div className="pt-3 border-t border-[#F0DCD8] flex items-center justify-between">
          <div>
            <span className="font-heading font-extrabold text-base text-[#C1436D]">{formatVnd(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#8a6b73] line-through block">{formatVnd(product.originalPrice)}</span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => onAdd(product)}
            className="bg-[#C1436D] hover:bg-[#C1436D]/90 text-white font-bold rounded-full text-xs px-3.5 py-1.5 shadow-sm"
          >
            + Thêm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
