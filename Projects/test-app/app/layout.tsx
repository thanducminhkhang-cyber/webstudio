import type { Metadata } from "next";
import "@wsos/ui/globals.css";

export const metadata: Metadata = {
  title: "WSOS Studio Test App",
  description: "Verification app for @wsos/ui pipeline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
