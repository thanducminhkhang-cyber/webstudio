import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VANGUARD ENGLISH — Electric Campus. Change Your Life.",
  description: "Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC, Giao tiếp công sở với giảng viên chuẩn quốc tế.",
  openGraph: {
    title: "VANGUARD ENGLISH — Electric Campus. Change Your Life.",
    description: "Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC, Giao tiếp công sở.",
    url: "https://course-platform.vercel.app",
    siteName: "VANGUARD ENGLISH",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "VANGUARD ENGLISH Electric Campus",
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
      <body className="font-sans bg-[#FAFAFA] text-[#0F172A] antialiased selection:bg-[#7C3AED]/20 selection:text-[#7C3AED] min-h-screen">
        {children}
      </body>
    </html>
  );
}
