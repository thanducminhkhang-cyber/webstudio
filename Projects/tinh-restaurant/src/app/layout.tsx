import type { Metadata } from "next";
import { Cormorant, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TỊNH — Thực đơn nếm theo mùa | Fine Dining Việt",
  description: "Nhà hàng fine-dining Việt hiện đại phục vụ thực đơn nếm theo mùa. Tĩnh lặng, tinh tế và trân quý nguyên liệu bản địa.",
  keywords: ["TỊNH", "Fine dining Việt", "Thực đơn nếm", "Tasting menu", "Nhà hàng sơn mài", "Ẩm thực Việt hiện đại"],
  openGraph: {
    title: "TỊNH — Thực đơn nếm theo mùa",
    description: "Tĩnh lặng, tinh tế và trân quý nguyên liệu bản địa.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${beVietnamPro.variable}`}>
      <body className="antialiased bg-[#14100D] text-[#EDE6D8] min-h-screen flex flex-col selection:bg-[#B98A45] selection:text-[#14100D]">
        {children}
      </body>
    </html>
  );
}
