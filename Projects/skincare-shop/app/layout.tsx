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
  title: "LUMIÈRE LABS — Dewy Glass Garden Skincare",
  description: "Dược mỹ phẩm thuần chay sinh học dưỡng da căng bóng Glass Skin. Cảm hứng từ khu vườn kính đọng sương mai.",
  openGraph: {
    title: "LUMIÈRE LABS — Dewy Glass Garden Skincare",
    description: "Dược mỹ phẩm thuần chay sinh học dưỡng da căng bóng Glass Skin.",
    url: "https://skincare-shop.vercel.app",
    siteName: "LUMIÈRE LABS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LUMIÈRE LABS Dewy Glass Garden",
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
      <body className="font-sans bg-background text-foreground antialiased selection:bg-[#2D6A4F]/20 selection:text-[#2D6A4F] min-h-screen">
        {children}
      </body>
    </html>
  );
}
