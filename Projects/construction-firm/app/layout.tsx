import type { Metadata } from "next";
import { Syne, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="vi" className={`${syne.variable} ${spaceGrotesk.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-[#F7F8FA] text-[#111111] antialiased selection:bg-[#F4B942]/30 selection:text-[#0B0F19] min-h-screen">
        {children}
      </body>
    </html>
  );
}
