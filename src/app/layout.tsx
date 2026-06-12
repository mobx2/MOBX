import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "MOBX PORTFOLIO",
  description: "MOBX PORTFOLIO",
  icons: {
    icon: "/loading1.png",
  },
  openGraph: {
    title: "MOBX PORTFOLIO",
    description: "MOBX PORTFOLIO",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MOBX PORTFOLIO",
    description: "MOBX PORTFOLIO",
    images: ["/og.png"],
  }
};

import { Bangers } from "next/font/google";

const bangers = Bangers({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} antialiased bg-brand-black text-brand-white cursor-none`}>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
