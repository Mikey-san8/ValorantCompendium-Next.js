import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/semantics/Header";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/semantics/Footer";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Valorant Compendium",
  description:
    "Your ultimate Valorant compendium, featuring agents, maps, weapons, and more.",
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={`${oxanium.className} antialiased`}>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}