import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "@wsos/ui/globals.css";

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
  description: "Không gian cà phê thủ công đương đại giữa lòng đêm thành phố. Hương vị rang xay nguyên bản, trải nghiệm độc bản.",
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
