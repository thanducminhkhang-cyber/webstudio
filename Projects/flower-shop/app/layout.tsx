import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MAISON FLEUR — Hoa Tươi Nghệ Thuật Mỗi Ngày",
  description:
    "Cửa hàng hoa tươi thiết kế thủ công: bó hoa, giỏ hoa, hoa sự kiện và cây cảnh. Giao hoa tận nơi trong 2 giờ tại nội thành.",
  openGraph: {
    title: "MAISON FLEUR — Hoa Tươi Nghệ Thuật Mỗi Ngày",
    description:
      "Cửa hàng hoa tươi thiết kế thủ công: bó hoa, giỏ hoa, hoa sự kiện và cây cảnh. Giao hoa tận nơi trong 2 giờ.",
    url: "https://flower-shop.vercel.app",
    siteName: "MAISON FLEUR",
    images: [
      {
        url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "MAISON FLEUR — Hoa tươi nghệ thuật",
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
    <html lang="vi" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-[#C1436D]/20 selection:text-[#C1436D] min-h-screen">
        {children}
      </body>
    </html>
  );
}
