import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STONA SLAB — Stone Gallery & Luxury Surfaces",
  description: "Trưng bày & phân phối đá tự nhiên, gạch men cao cấp và đá tấm khổ lớn Big Slab nhập khẩu Ý & Tây Ban Nha.",
  openGraph: {
    title: "STONA SLAB — Stone Gallery & Luxury Surfaces",
    description: "Bộ sưu tập đá tự nhiên & gạch khổ lớn thượng hạng cho biệt thự và công trình kiến trúc.",
    url: "https://tile-showroom.vercel.app",
    siteName: "STONA SLAB",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "STONA SLAB Luxury Tile Showroom",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-[#F4F1EC] text-[#1C1A17] antialiased selection:bg-[#9A7B4F]/20 selection:text-[#9A7B4F] min-h-screen">
        {children}
      </body>
    </html>
  );
}
