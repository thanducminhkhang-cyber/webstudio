import type { Metadata } from "next";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "./parts";

// Display: Fraunces — serif ấm có cá tính, dùng cho hero & heading. Kèm vietnamese.
const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body/UI: Be Vietnam Pro — dấu tiếng Việt chuẩn tuyệt đối.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thanh An — Thực đơn nếm theo mùa",
  description:
    "Nhà hàng fine-dining Việt. Mỗi tối một thực đơn nếm theo mùa của miền Bắc, tại Hà Nội.",
  openGraph: {
    title: "Thanh An — Thực đơn nếm theo mùa",
    description: "Mỗi tối một thực đơn nếm theo mùa của miền Bắc.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${beVietnam.variable}`}>
      <body>
        {/* Không JS: hiện lại toàn bộ phần tử vốn bị ẩn để chờ animate. */}
        <noscript>
          <style>{`[data-reveal],[data-anim],[data-hero-line],[data-hero-seal],[data-hero-img-inner]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        {/* Film grain phủ toàn trang */}
        <div className="grain" aria-hidden="true" />
        <MotionProvider />
      </body>
    </html>
  );
}
