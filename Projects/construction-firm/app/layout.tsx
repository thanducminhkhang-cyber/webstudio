import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "@wsos/ui/globals.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VANGUARD CONSTRUCT — Engineering Excellence & Billion-Dollar Infrastructure",
  description: "Tập đoàn xây dựng tổng thầu công nghiệp, hạ tầng giao thông & công trình kiến trúc biểu tượng hàng đầu Việt Nam và Quốc tế.",
  openGraph: {
    title: "VANGUARD CONSTRUCT — We Build Tomorrow",
    description: "Engineering Excellence Since 1998. General Contracting, Infrastructure & Industrial Mega Projects.",
    url: "https://vanguard-construct.vercel.app",
    siteName: "VANGUARD CONSTRUCT",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "VANGUARD CONSTRUCT Mega Infrastructure Showcase",
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
    <html lang="vi" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans bg-[#0F172A] text-white antialiased selection:bg-[#D4A017]/30 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
