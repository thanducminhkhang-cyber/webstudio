import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "@wsos/ui/globals.css";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LUMIÈRE LABS — K-Beauty Glass Skin Science",
  description: "Dược mỹ phẩm thuần chay dưỡng da căng bóng Glass Skin chuẩn Hàn Quốc. Chiết xuất sinh học thuần khiết.",
  openGraph: {
    title: "LUMIÈRE LABS — K-Beauty Glass Skin Science",
    description: "Dược mỹ phẩm thuần chay dưỡng da căng bóng Glass Skin chuẩn Hàn Quốc.",
    url: "https://skincare-shop.vercel.app",
    siteName: "LUMIÈRE LABS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1608248597359-99434863375c?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LUMIÈRE LABS Glass Skin Science",
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
    <html lang="vi" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased selection:bg-cyan-500/20 selection:text-cyan-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}
