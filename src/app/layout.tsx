import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avant-Garde Portfolio",
  description: "A mind-blowing, god-tier personal portfolio driven by Scroll-driven Innovations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-black text-brand-white">
        {children}
      </body>
    </html>
  );
}
