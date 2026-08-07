import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduColoring | Media Mewarnai Bertema Pengelolaan Sampah",
  description: "Platform penyedia lembar mewarnai manual bertema pengelolaan sampah sebagai sarana edukasi lingkungan untuk anak-anak persembahan mahasiswa KKN UBP Karawang.",
  openGraph: {
    title: "EduColoring | Media Mewarnai Pengelolaan Sampah",
    description: "Karya inovatif mahasiswa KKN UBP Karawang untuk mengedukasi anak usia dini tentang lingkungan.",
    url: "https://www.educoloring.my.id",
    siteName: "EduColoring",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Mencegah iOS auto-zoom saat tap input form
};

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { SmoothScrolling } from "@/components/shared/SmoothScrolling";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { LayoutShell } from "@/components/shared/LayoutShell";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans relative">
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
