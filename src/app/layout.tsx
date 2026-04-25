import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";

const exo2 = Exo_2({
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
      <body className={`${exo2.className} antialiased`}>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}