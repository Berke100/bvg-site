import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppBanner } from "@/components/whatsapp-banner";

// Başlıklar için karakterli display font (Türkçe karakter desteği: latin-ext)
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Gövde metni için okunaklı sans font
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bvg.vercel.app"),
  title: {
    default: "BVG — Kampüsün En Güçlü Network'ü",
    template: "%s · BVG",
  },
  description:
    "BVG, Sakarya Uygulamalı Bilimler Üniversitesi'nde bölüm fark etmeksizin herkese açık öğrenci topluluğu. Etkinlikler, Teknofest başarıları, staj ve kariyer fırsatları.",
  keywords: [
    "BVG",
    "SUBÜ",
    "öğrenci topluluğu",
    "network",
    "Teknofest",
    "etkinlik",
    "kariyer",
  ],
  openGraph: {
    title: "BVG — Kampüsün En Güçlü Network'ü",
    description:
      "Bölüm fark etmez. Etkinlikler, Teknofest başarıları, staj ve kariyer fırsatları. Aramıza katıl.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WhatsAppBanner />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
