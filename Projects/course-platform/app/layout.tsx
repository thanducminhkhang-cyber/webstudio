import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "VANGUARD ENGLISH — Master English. Change Your Life.",
  description: "Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC, Giao tiếp công sở với giảng viên chuẩn quốc tế.",
  openGraph: {
    title: "VANGUARD ENGLISH — Master English. Change Your Life.",
    description: "Nền tảng đào tạo tiếng Anh bứt phá mục tiêu IELTS, TOEIC, Giao tiếp công sở.",
    url: "https://course-platform.vercel.app",
    siteName: "VANGUARD ENGLISH",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "VANGUARD ENGLISH Mastery",
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
    <html lang="vi" className={`${syne.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-blue-500/20 selection:text-blue-700 min-h-screen">
        {children}
      </body>
    </html>
  );
}
