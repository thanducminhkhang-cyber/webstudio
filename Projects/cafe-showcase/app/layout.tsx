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
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KISSATEN — Tokyo Midnight Specialty Coffee",
  description: "Nghệ thuật cà phê thủ công phong cách Kissaten Nhật Bản giữa lòng đêm thành phố.",
  openGraph: {
    title: "KISSATEN — Tokyo Midnight Specialty Coffee",
    description: "Nghệ thuật cà phê thủ công phong cách Kissaten Nhật Bản. Thưởng thức từng giọt Espresso nguyên bản.",
    url: "https://cafe-showcase.vercel.app",
    siteName: "KISSATEN Tokyo",
    images: [
      {
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "KISSATEN Tokyo Midnight Specialty Coffee",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KISSATEN — Tokyo Midnight Specialty Coffee",
    description: "Nghệ thuật cà phê thủ công phong cách Kissaten Nhật Bản.",
    images: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark ${syne.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
