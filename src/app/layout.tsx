import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduColoring | Media Edukasi Lingkungan",
  description: "Platform media mewarnai edukatif bertema pengelolaan sampah untuk anak-anak.",
};

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

import { SmoothScrolling } from "@/components/shared/SmoothScrolling";

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
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden relative">
        <Navbar />
        <SmoothScrolling>
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
