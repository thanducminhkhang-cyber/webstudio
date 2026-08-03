import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "STONA SLAB — Modern Architecture & Luxury Surfaces",
  description: "Showroom gạch men cao cấp & đá tấm khổ lớn Big Slab 120x240cm công nghệ Ý & Tây Ban Nha.",
  openGraph: {
    title: "STONA SLAB — Modern Architecture & Luxury Surfaces",
    description: "Bộ sưu tập đá tự nhiên & gạch khổ lớn thượng hạng cho biệt thự và công trình kiến trúc.",
    url: "https://tile-showroom.vercel.app",
    siteName: "STONA SLAB",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "STONA SLAB Modern Luxury Tile Showroom",
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
    <html lang="vi" className={`${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-[#F6F5F2] text-[#121110] antialiased selection:bg-[#C5A880]/20 selection:text-[#C5A880] min-h-screen">
        {children}
      </body>
    </html>
  );
}
