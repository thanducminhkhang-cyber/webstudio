import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  weight: ["500", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STONA SLAB — Large Format Architectural Surfaces",
  description: "Showroom trưng bày và phân phối gạch men cao cấp, đá tấm khổ lớn Big Slab 120x240cm nhập khẩu Ý & Tây Ban Nha.",
  openGraph: {
    title: "STONA SLAB — Large Format Architectural Surfaces",
    description: "Showroom gạch men cao cấp & đá khổ lớn Big Slab cho biệt thự và công trình kiến trúc.",
    url: "https://tile-showroom.vercel.app",
    siteName: "STONA SLAB",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "STONA SLAB Architectural Tile Showroom",
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
    <html lang="vi" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB] min-h-screen">
        {children}
      </body>
    </html>
  );
}
