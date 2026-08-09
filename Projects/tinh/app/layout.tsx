import type { Metadata } from "next";
import { Cormorant, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// Display: Cormorant — wordmark & heading. Bao gồm subset vietnamese để "TỊNH", "Ị" render đúng.
const cormorant = Cormorant({
  subsets: ["latin", "vietnamese"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body & utility: Be Vietnam Pro — bắt buộc, render dấu tiếng Việt chuẩn.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TỊNH — Thực đơn nếm theo mùa",
  description:
    "Nhà hàng fine-dining Việt. Mỗi tối một thực đơn nếm theo mùa. Đặt bàn trước.",
  openGraph: {
    title: "TỊNH — Thực đơn nếm theo mùa",
    description: "Mỗi tối một thực đơn nếm theo mùa của miền Bắc.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${beVietnam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
