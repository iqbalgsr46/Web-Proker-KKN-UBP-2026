"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AbstractBlob } from "../ui/AbstractBlob";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative w-full overflow-hidden mt-10">
      {/* Decorative Background Blobs for Footer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <AbstractBlob type="hexagon" color="blue" className="absolute -bottom-20 -left-10 w-64 h-64 rotate-12 blur-[2px]" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-10 right-10 w-32 h-32 -rotate-45" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute -bottom-10 right-1/4 w-48 h-48 rotate-90 blur-[1px]" />
      </div>

      <div className="relative z-10 w-full bg-white/70 backdrop-blur-2xl border-t-2 border-white/80 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.05)] rounded-t-[3rem] sm:rounded-t-[4rem] pt-16 pb-8 px-6 sm:px-12 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md border border-gray-100 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🎨</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 group-hover:text-google-blue transition-colors">
              Edu<span className="text-google-green">Coloring</span>
            </span>
          </Link>

          <p className="text-gray-600 font-medium max-w-lg mb-10 text-sm sm:text-base leading-relaxed">
            Platform edukasi mewarnai ceria untuk mengenalkan pentingnya memilah sampah kepada anak-anak sejak dini.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12">
            <Link href="/" className="text-gray-700 font-bold hover:text-google-blue transition-colors px-4 py-2 bg-white/50 rounded-full border border-white hover:shadow-sm">
              Beranda
            </Link>
            <Link href="/kategori" className="text-gray-700 font-bold hover:text-google-yellow transition-colors px-4 py-2 bg-white/50 rounded-full border border-white hover:shadow-sm">
              Kategori
            </Link>
            <Link href="/galeri" className="text-gray-700 font-bold hover:text-google-green transition-colors px-4 py-2 bg-white/50 rounded-full border border-white hover:shadow-sm">
              Galeri
            </Link>
            <Link href="/tentang" className="text-gray-700 font-bold hover:text-google-red transition-colors px-4 py-2 bg-white/50 rounded-full border border-white hover:shadow-sm">
              Tentang Kami
            </Link>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-8"></div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 text-xs sm:text-sm text-gray-500 font-medium">
            <p>© 2026 Tim KKN Desa Sukamaju. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Dibuat dengan <span className="text-google-red">❤️</span> untuk Indonesia.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
