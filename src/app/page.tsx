"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-x-hidden flex items-center justify-center px-4 md:px-8 py-12 md:py-0">
      {/* Background Ornaments (4 Logo Random Placements) */}
      
      {/* 1. Top Left: Green Hexagon (Mid Size) */}
      <AbstractBlob type="hexagon" color="green" className="w-32 md:w-44 h-32 md:h-44 absolute top-[5%] left-[5%] md:top-[18%] md:left-[10%] -rotate-12 transform-gpu" />
      
      {/* 2. Top Right: Red Circle-Spark (Small Size, sedikit blur untuk efek kedalaman) */}
      <AbstractBlob type="circle-spark" color="red" className="w-20 md:w-28 h-20 md:h-28 absolute top-[10%] right-[8%] md:top-[12%] md:right-[15%] blur-[2px] rotate-45 transform-gpu" />
      
      {/* 3. Bottom Left: Blue Cross-Spark (Large Size, sedikit terpotong di kiri) */}
      <AbstractBlob type="cross-spark" color="blue" className="w-48 md:w-72 h-48 md:h-72 absolute bottom-[5%] -left-[15%] md:bottom-[10%] md:-left-[2%] rotate-12 transform-gpu" />
      
      {/* 4. Bottom Right: Yellow Cross (Mid-Large Size) */}
      <AbstractBlob type="cross" color="yellow" className="w-36 md:w-56 h-36 md:h-56 absolute bottom-[15%] right-[5%] md:bottom-[18%] md:right-[10%] -rotate-[25deg] transform-gpu" />
      
      {/* 5. Center (Behind GlassCard): Blue Hexagon (Tertutup efek blur kaca) */}
      <AbstractBlob type="hexagon" color="blue" className="w-40 md:w-64 h-40 md:h-64 absolute top-[50%] left-[48%] -translate-x-1/2 -translate-y-1/2 rotate-[15deg] transform-gpu" />
      <GlassCard withShimmer className="w-full max-w-5xl text-center flex flex-col items-center shadow-2xl relative z-10 mx-auto py-12 sm:py-16 mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            opacity: { duration: 0.3 }, 
            y: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Logo Utama ala "Build with AI" GDG */}
          <div className="flex items-center justify-center gap-2 md:gap-5 mb-10 scale-90 md:scale-100">
          {/* Left Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible">
            {/* Outer thin black border */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content (Teks & Hexagon) */}
          <div className="flex flex-col items-center justify-center px-2">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-[2.25rem] leading-none font-black text-[#202124] tracking-tight">Program</span>
              {/* Blue Hexagon with Spark */}
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="md:w-[36px] md:h-[36px]">
                <polygon points="28,8 72,8 92,50 72,92 28,92 8,50" fill="#4285F4" stroke="#202124" strokeWidth="4" strokeLinejoin="round" />
                <path d="M 50 22 C 50 36 36 50 22 50 C 36 50 50 64 50 78 C 50 64 64 50 78 50 C 64 50 50 36 50 22 Z" fill="white" stroke="#202124" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-3xl md:text-[2.25rem] leading-none font-black text-[#202124] tracking-tight mt-1">Kerja KKN 2026</span>
            
            {/* Location Pill Badge */}
            <div className="mt-2 px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center">
              <span className="text-[#202124] font-bold text-sm">UBP Karawang</span>
            </div>
          </div>

          {/* Right Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible">
            {/* Outer thin black border */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-[1.1] text-balance mx-auto">
          Belajar Peduli Sampah <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          Mulai dari <span className="text-google-green">Mewarnai!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 font-medium mb-12 max-w-3xl leading-relaxed text-center">
          Website penyedia lembar mewarnai khusus untuk program <strong>Perancangan Media Mewarnai Manual Bertema Pengelolaan Sampah sebagai Sarana Edukasi Lingkungan</strong>. Unduh gratis, cetak di rumah, dan biarkan anak belajar sambil berkreasi!
        </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/kumpulan-mewarnai">
              <PillButton variant="blue">Pilih Gambar Favoritmu!</PillButton>
            </Link>
            <Link href="/galeri">
              <PillButton variant="yellow">Lihat Galeri Karya Anak</PillButton>
            </Link>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
}
