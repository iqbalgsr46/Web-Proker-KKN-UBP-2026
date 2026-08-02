"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import { Palette, Recycle, Download } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
};
const itemTop = { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const itemBottom = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const itemLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const itemRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

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
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Logo Utama ala "Build with AI" GDG */}
          <motion.div variants={itemTop} className="flex items-center justify-center gap-2 md:gap-4 mb-10 scale-95 md:scale-110 mt-4 md:mt-8">
            {/* Left Bracket (Kurung Kurawal Kuning) */}
            <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible h-[90px] md:h-[100px] w-auto">
              {/* Outer thin black border */}
              <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Inner yellow fill */}
              <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>

            {/* Center Content (Teks) */}
            <div className="flex flex-col items-center justify-center px-1 md:px-3 text-center">
              <span className="text-[1.75rem] md:text-[2.25rem] leading-none font-black text-[#202124] tracking-tight whitespace-nowrap">Kumpulan</span>
              <span className="text-[1.75rem] md:text-[2.25rem] leading-none font-black text-google-blue tracking-tight mt-1 whitespace-nowrap">Lembar Mewarnai</span>
              
              {/* Location Pill Badge */}
              <div className="mt-2.5 px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center">
                <span className="text-[#202124] font-bold text-sm md:text-base">UBP Karawang</span>
              </div>
            </div>

            {/* Right Bracket (Kurung Kurawal Kuning) */}
            <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible h-[90px] md:h-[100px] w-auto">
              {/* Outer thin black border */}
              <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Inner yellow fill */}
              <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        
        <motion.h1 variants={itemLeft} className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-8 leading-[1.1] text-balance mx-auto">
          Belajar Peduli Sampah <br className="hidden md:block" />
          <span className="md:hidden"> </span>
          Mulai dari <span className="text-google-green">Mewarnai!</span>
        </motion.h1>
        
        <motion.p variants={itemRight} className="text-lg md:text-xl text-gray-600 font-medium mb-10 max-w-3xl leading-relaxed text-center">
          Luaran program KKN mahasiswa <strong>Universitas Buana Perjuangan Karawang</strong> menyediakan lembar mewarnai bertema <strong>Pengelolaan Sampah</strong> sebagai sarana edukasi lingkungan yang menyenangkan untuk anak-anak TK &amp; SD.
        </motion.p>

          <motion.div variants={itemBottom} className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <Link href="/kategori">
              <PillButton variant="blue">Pilih Gambar Favoritmu!</PillButton>
            </Link>
            <Link href="/galeri">
              <PillButton variant="yellow">Lihat Galeri Karya Anak</PillButton>
            </Link>
          </motion.div>

          {/* Impact Stats Strip */}
          <motion.div variants={itemBottom} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm md:text-base text-gray-500 font-semibold">
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-google-blue/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-google-blue/20 transition-all">
                <Palette className="w-4 h-4 text-google-blue" strokeWidth={2.5} />
              </div>
              <span><strong className="text-gray-900">6</strong> Lembar Mewarnai</span>
            </div>
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-google-yellow/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-google-yellow/20 transition-all">
                <Recycle className="w-4 h-4 text-google-yellow" strokeWidth={2.5} />
              </div>
              <span><strong className="text-gray-900">3</strong> Kategori Sampah</span>
            </div>
            <div className="w-px h-6 bg-gray-200 hidden sm:block" />
            <div className="flex items-center gap-2.5 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-google-green/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-google-green/20 transition-all">
                <Download className="w-4 h-4 text-google-green" strokeWidth={2.5} />
              </div>
              <span>Gratis untuk <strong className="text-google-green">Semua</strong></span>
            </div>
          </motion.div>

        </motion.div>
      </GlassCard>
    </div>
  );
}
