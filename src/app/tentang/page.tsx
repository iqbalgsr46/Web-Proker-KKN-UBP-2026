"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import CircularGallery from "@/components/ui/CircularGallery";
import ScrollStack from "@/components/ui/ScrollStack";
import { ScrollStackItem } from "@/components/ui/ScrollStack";
import { TextReveal } from "@/registry/magicui/text-reveal";

export default function TentangPage() {
  const [showGallery, setShowGallery] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Tunda pemuatan WebGL yang sangat berat selama 1.5 detik
    // agar animasi masuk (entrance animation) berjalan mulus tanpa lag.
    const timer = setTimeout(() => {
      setShowGallery(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col bg-transparent">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS (Mesh Gradient) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        
        {/* Abstract Blobs Scattered in Background */}
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-50 rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-[25%] right-[2%] w-32 md:w-48 h-32 md:h-48 opacity-60 -rotate-12 pointer-events-none transform-gpu blur-[2px]" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[45%] left-[5%] w-40 md:w-56 h-40 md:h-56 opacity-50 rotate-[45deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[70%] right-[-10%] w-72 md:w-[500px] h-72 md:h-[500px] opacity-40 -rotate-[25deg] pointer-events-none transform-gpu blur-[4px]" />
        <AbstractBlob type="spark" color="red" className="absolute top-[5%] right-[20%] w-24 md:w-32 h-24 md:h-32 opacity-50 rotate-[15deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[30%] w-56 h-56 opacity-50 rotate-[60deg] pointer-events-none transform-gpu" />
        
        {/* Tambahan Blobs Ekstra */}
        <AbstractBlob type="cross" color="red" className="absolute top-[18%] left-[25%] w-16 md:w-24 h-16 md:h-24 opacity-60 rotate-[30deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="yellow" className="absolute top-[55%] right-[25%] w-48 md:w-64 h-48 md:h-64 opacity-50 rotate-[75deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="blue" className="absolute top-[85%] left-[15%] w-32 md:w-40 h-32 md:h-40 opacity-50 -rotate-[15deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="green" className="absolute top-[35%] left-[35%] w-20 md:w-28 h-20 md:h-28 opacity-40 rotate-[45deg] pointer-events-none transform-gpu blur-[1px]" />
        <AbstractBlob type="gemini-spark" color="red" className="absolute top-[15%] right-[40%] w-36 md:w-48 h-36 md:h-48 opacity-40 -rotate-[30deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="cross-spark" color="blue" className="absolute bottom-[5%] right-[15%] w-24 md:w-32 h-24 md:h-32 opacity-60 rotate-[10deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[75%] left-[45%] w-56 md:w-72 h-56 md:h-72 opacity-30 rotate-[90deg] pointer-events-none transform-gpu blur-[3px]" />

        {/* 6+ Tambahan Baru (Fokus di Tengah & Celah Kosong) */}
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] opacity-20 -rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="red" className="absolute top-[25%] left-[60%] w-32 md:w-40 h-32 md:h-40 opacity-40 rotate-45 pointer-events-none transform-gpu blur-[2px]" />
        <AbstractBlob type="cross-spark" color="yellow" className="absolute top-[60%] left-[55%] w-24 md:w-32 h-24 md:h-32 opacity-50 -rotate-45 pointer-events-none transform-gpu" />
        <AbstractBlob type="spark" color="green" className="absolute top-[85%] right-[40%] w-48 md:w-64 h-48 md:h-64 opacity-30 rotate-[25deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="red" className="absolute top-[10%] left-[48%] w-20 md:w-24 h-20 md:h-24 opacity-50 rotate-[15deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="yellow" className="absolute top-[45%] right-[8%] w-16 md:w-20 h-16 md:h-20 opacity-60 -rotate-[15deg] pointer-events-none transform-gpu blur-[1px]" />
        <AbstractBlob type="cross" color="blue" className="absolute bottom-[20%] left-[20%] w-16 md:w-20 h-16 md:h-20 opacity-50 rotate-[45deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[30%] right-[30%] w-32 h-32 opacity-40 -rotate-[60deg] pointer-events-none transform-gpu" />
        
        {/* Glow Biru (Atas Kiri) */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-google-blue/20 blur-[60px] md:blur-[80px] transform-gpu will-change-transform pointer-events-none" 
        />
        {/* Glow Merah (Atas Kanan) */}
        <div 
          className="absolute top-[5%] -right-[10%] w-[50%] h-[50%] rounded-full bg-google-red/10 blur-[60px] md:blur-[80px] transform-gpu will-change-transform pointer-events-none" 
        />
        {/* Glow Kuning (Bawah Kiri) */}
        <div 
          className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-google-yellow/20 blur-[60px] md:blur-[80px] transform-gpu will-change-transform pointer-events-none" 
        />
        {/* Glow Hijau (Bawah Kanan) */}
        <div 
          className="absolute bottom-[5%] right-[5%] w-[50%] h-[50%] rounded-full bg-google-green/10 blur-[60px] md:blur-[80px] transform-gpu will-change-transform pointer-events-none" 
        />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          opacity: { duration: 0.3 }, 
          y: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
        }}
        className="flex-1 w-full px-4 sm:px-6 lg:px-12 pt-0 sm:pt-24 pb-12 relative z-10 flex flex-col items-center"
      >
        {/* ========================================= */}
        {/* KKN BANNER SECTION (GDG Poster Style) */}
        {/* ========================================= */}
        <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-24 mt-2 sm:mt-4 relative">
          
          <GlassCard className="w-full flex flex-col items-center p-5 sm:p-10 pb-8 sm:pb-10 relative overflow-visible mt-8 sm:mt-12">
            
            {/* Top Badge */}
            <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 z-30 flex flex-row items-center justify-center gap-1.5 sm:gap-4 w-[95%] max-w-[max-content] bg-[#f8f9fa]/95 backdrop-blur-xl px-4 sm:px-8 py-3 sm:py-5 rounded-3xl sm:rounded-[2.5rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-white/60">
              
              {/* Left Bracket */}
              <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-4 h-8 sm:w-6 sm:h-12">
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>

              {/* Center Content (Teks & Hexagon) */}
              <div className="flex flex-col items-center justify-center w-auto shrink">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-[0.9rem] sm:text-[1.25rem] md:text-[1.5rem] leading-none font-black text-[#202124] tracking-tight">Program</span>
                  {/* Blue Hexagon with Spark */}
                  <svg viewBox="0 0 100 100" fill="none" className="w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] shrink-0">
                    <polygon points="28,8 72,8 92,50 72,92 28,92 8,50" fill="#4285F4" stroke="#202124" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M 50 22 C 50 36 36 50 22 50 C 36 50 50 64 50 78 C 50 64 64 50 78 50 C 64 50 50 36 50 22 Z" fill="white" stroke="#202124" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[0.9rem] sm:text-[1.25rem] md:text-[1.5rem] leading-none font-black text-[#202124] tracking-tight mt-0.5 sm:mt-1">Kerja KKN 2026</span>
                
                {/* Location Pill Badge */}
                <div className="mt-1.5 sm:mt-2 px-2.5 sm:px-4 py-0.5 border-[1.5px] border-[#202124] bg-white rounded-full flex items-center justify-center max-w-full overflow-hidden">
                  <span className="text-[#202124] font-bold text-[9px] sm:text-[11px] tracking-wide truncate">UBP Karawang</span>
                </div>
              </div>

              {/* Right Bracket */}
              <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-4 h-8 sm:w-6 sm:h-12">
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            {/* Photo Container */}
            <div className="w-full relative rounded-3xl mb-12 sm:mb-20 mt-6">
              
              {/* Main Image */}
              <div className="w-full h-[200px] sm:h-[350px] md:h-[400px] relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-lg border-[4px] sm:border-[6px] border-white bg-gray-200">
                <img src="/images/kkn_students_placeholder.png" alt="Tim KKN" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
              </div>

              {/* Blue Ribbon (BWAI Registration equivalent) */}
              <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[85%] max-w-xl bg-google-blue text-white shadow-[0_15px_30px_-10px_rgba(66,133,244,0.6)] rounded-2xl px-3 py-3 sm:py-6 flex flex-col items-center text-center">
                <p className="font-bold tracking-widest text-[0.6rem] sm:text-xs mb-0.5 sm:mb-1 text-blue-100 uppercase">Persembahan Spesial</p>
                <h2 className="text-base sm:text-xl md:text-3xl font-black tracking-tight uppercase leading-snug">Tim Mahasiswa KKN 2026</h2>
              </div>
            </div>

            {/* Info Grid (4 Columns) */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 px-1 sm:px-4">
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-white transform-gpu">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-0.5 sm:mb-1">Universitas</p>
                <p className="font-black text-gray-900 text-xs sm:text-base leading-tight">UBP<br/>Karawang</p>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-white transform-gpu">
                <div className="bg-google-green text-white text-[0.55rem] sm:text-[0.65rem] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">Periode</div>
                <p className="font-black text-gray-900 text-xs sm:text-base leading-tight">Jul - Ags<br/>2026</p>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-white transform-gpu">
                <div className="bg-google-blue text-white text-[0.55rem] sm:text-[0.65rem] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">Desa</div>
                <p className="font-black text-gray-900 text-xs sm:text-base leading-tight">Desa<br/>[Nama Desa]</p>
              </div>
              {/* Card 4 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-white transform-gpu">
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-0.5 sm:mb-1">Pembimbing</p>
                <p className="font-black text-gray-900 text-xs sm:text-base leading-tight">Dr. [Nama<br/>Dosen]</p>
              </div>
            </div>

            {/* Call to Action Container */}
            <div className="flex flex-col items-center relative z-10 text-center bg-white/50 backdrop-blur-md p-5 sm:p-8 rounded-3xl w-full border border-white shadow-sm transform-gpu">
              <h3 className="text-base sm:text-2xl font-black text-gray-900 tracking-tight uppercase mb-1">
                Mari Belajar & Bermain Bersama
              </h3>
              <p className="text-xs sm:text-base text-gray-600 font-medium italic mb-5 sm:mb-6">Mewujudkan desa cerdas bebas sampah</p>
              
              <PillButton onClick={() => setIsModalOpen(true)} variant="green" className="px-6 sm:px-12 py-2.5 sm:py-4 text-sm sm:text-lg shadow-lg cursor-pointer">
                Kenali Kami Lebih Dekat
              </PillButton>
            </div>
            
            {/* Background giant C logo equivalent (Yellow shape) */}
            <div className="absolute bottom-0 -right-10 w-48 h-48 border-[30px] border-google-yellow rounded-[4rem] opacity-20 -z-10 blur-xl pointer-events-none"></div>

          </GlassCard>
        </div>



        <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-32 relative mb-12 sm:mb-20 px-2 sm:px-8">
          <div className="text-center mt-8 sm:mt-8 mb-0 sm:mb-2 relative z-10 pointer-events-none bg-transparent backdrop-blur-xl py-3 sm:py-4 px-6 sm:px-8 rounded-full border border-white/60 shadow-sm mx-auto w-fit">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Kenali Tim Kami!</h2>
          </div>
          <div className="h-[300px] sm:h-[600px] w-full -mt-4 sm:-mt-16 bg-transparent [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative">
            {showGallery && (
              <CircularGallery
                items={[
                  { image: "/images/kkn_students_placeholder.png", text: "Dosen: [Nama Dosen]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Ketua: [Nama Anggota]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Anggota: [Nama Anggota]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Anggota: [Nama Anggota]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Anggota: [Nama Anggota]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Anggota: [Nama Anggota]" },
                  { image: "/images/kkn_students_placeholder.png", text: "Anggota: [Nama Anggota]" },
                ]}
                bend={0.5}
                textColor="#202124"
                borderRadius={0.05}
                scrollEase={0.08}
                font="bold 30px 'Inter', sans-serif"
                scrollSpeed={1.35}
              />
            )}
          </div>
        </div>
        {/* ========================================= */}
        {/* SCROLL STACK SECTION (FOTO KKN) */}
        {/* ========================================= */}
        <div className="w-full relative z-10 max-w-5xl mx-auto mt-6 sm:mt-10 mb-0 px-2 sm:px-8 py-4 sm:py-8">
          
          {/* Invisible wrapper to limit sticky duration to the top 75% of the container */}
          <div className="absolute inset-x-0 top-0 h-[75%] pointer-events-none z-50 pt-8 sm:pt-16">
            <div className="text-center sticky top-[80px] sm:top-[100px] bg-white/60 backdrop-blur-xl py-3 sm:py-4 px-5 sm:px-6 rounded-[2rem] border border-white/60 shadow-sm mx-auto w-fit">
              <h2 className="text-xl sm:text-4xl font-black text-gray-900 tracking-tight">Dokumentasi Kegiatan</h2>
              <p className="text-xs sm:text-base text-gray-600 font-medium mt-1 sm:mt-2">Momen kebersamaan kami selama di Desa [Nama Desa]</p>
            </div>
          </div>
          
          <div className="pt-32 sm:pt-56">
            <ScrollStack 
              useWindowScroll={true} 
              itemDistance={20}
              stackPosition="260px"
              scaleEndPosition="60px"
            >
            <ScrollStackItem itemClassName="rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Pendidikan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-12 pt-16 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Pendidikan</h2>
                <p className="text-[10px] sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Mengajar dan mewarnai bersama anak-anak PAUD & SD.</p>
              </div>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Lingkungan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-12 pt-16 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Lingkungan</h2>
                <p className="text-[10px] sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Edukasi pengelolaan sampah dan daur ulang botol plastik.</p>
              </div>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Kesehatan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-12 pt-16 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Kesehatan</h2>
                <p className="text-[10px] sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Penyuluhan gizi seimbang dan posyandu ceria.</p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Ekonomi Kreatif" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-12 pt-16 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Ekonomi Kreatif</h2>
                <p className="text-[10px] sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Membantu UMKM lokal memasarkan produk keripik singkong.</p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Malam Perpisahan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-12 pt-16 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Malam Perpisahan</h2>
                <p className="text-[10px] sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Pentas seni bersama warga desa yang tak terlupakan.</p>
              </div>
            </ScrollStackItem>
          </ScrollStack>
          </div>
        </div>

        {/* ========================================= */}
        {/* THANK YOU SECTION (TEXT REVEAL) */}
        {/* ========================================= */}
        <div className="w-full relative z-10 flex flex-col items-center max-w-[90rem] mx-auto pt-10 sm:pt-16 pb-20 sm:pb-32 px-4 sm:px-8">
          {/* Teks Ucapan (Tengah) */}
          <div className="w-full max-w-5xl relative text-center">
            <div className="leading-[1.7] sm:leading-[1.9] text-gray-800 text-base sm:text-lg md:text-xl">
              <TextReveal>Terima kasih dari kami tim mahasiswa KKN Universitas Buana Perjuangan Karawang atas semua momen, tawa, dan pengalaman berharga di Desa [Nama Desa] ini. Kami berharap karya EduColoring ini dapat terus menjadi jembatan ilmu yang menyenangkan bagi anak-anak untuk mengenal dan menjaga lingkungan sejak dini. Pengabdian ini mungkin telah usai, namun kenangan indah bersama kalian akan selalu membekas. Sampai jumpa di lain kesempatan yang lebih gemilang!</TextReveal>
            </div>
          </div>
        </div>

      </motion.main>

      {/* TWEET MODAL POPUP */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-md md:max-w-2xl bg-white rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl flex flex-col items-center border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 font-bold"
                >
                  ✕
                </button>
                
                <div className="w-full flex flex-col gap-2.5 sm:gap-4 md:gap-5 text-gray-700 mt-4 sm:mt-6 md:mt-2 px-1">
                    
                    {/* Tweet Profile Header Recreated */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-0 sm:mb-2">
                      <img 
                        src="https://pbs.twimg.com/profile_images/1628172918809223170/XzB3N7qZ_400x400.jpg" 
                        alt="Dillion Profile" 
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Dillion&background=random' }}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[12px] sm:text-[15px] text-gray-900 leading-none sm:leading-5">EduColoring</span>
                          <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-[0.9rem] h-[0.9rem] sm:w-[1.1rem] sm:h-[1.1rem] text-[#1d9bf0] fill-current"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.918-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.337 2.25c-.416-.165-.866-.25-1.336-.25-2.21 0-3.918 1.792-3.918 4 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.46.827 2.728 2.034 3.393-.035.195-.053.395-.053.607 0 2.21 1.71 3.998 3.918 3.998.47 0 .92-.084 1.336-.25C9.182 21.585 10.49 22.5 12 22.5s2.816-.917 3.337-2.25c.416.165.866.25 1.336.25 2.21 0 3.918-1.792 3.918-4 0-.212-.018-.412-.053-.607 1.207-.665 2.034-1.933 2.034-3.393zm-13.064 2.81l-3.32-3.313 1.413-1.415 1.865 1.867 5.76-6.577 1.5 1.315-7.218 8.123z"></path></g></svg>
                        </div>
                        <span className="text-[10px] sm:text-[15px] text-gray-500 leading-none sm:leading-5">@educoloring</span>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-base md:text-lg leading-snug sm:leading-relaxed text-justify">
                      Kami adalah kelompok mahasiswa Kuliah Kerja Nyata (KKN) Universitas Buana Perjuangan Karawang tahun 2026. Website ini merupakan luaran dari program utama kami yang berjudul <strong>"Perancangan Media Mewarnai Manual Bertema Pengelolaan Sampah sebagai Sarana Edukasi Lingkungan"</strong>. Melalui <i>platform</i> penyedia lembar mewarnai ini, kami berinovasi untuk membawa perubahan positif bagi masyarakat desa.
                    </p>
                    <div className="bg-google-blue/10 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-google-blue/20">
                      <h4 className="font-bold text-google-blue mb-1 sm:mb-2 text-[11px] sm:text-base">Visi Kami</h4>
                      <p className="text-[10px] sm:text-sm md:text-base">Mewujudkan desa cerdas yang adaptif terhadap teknologi edukasi masa kini, sekaligus menanamkan kesadaran sejak dini tentang pentingnya lingkungan yang bebas sampah.</p>
                    </div>
                    <div className="bg-google-green/10 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-google-green/20">
                      <h4 className="font-bold text-google-green mb-1 sm:mb-2 text-[11px] sm:text-base">Misi Utama</h4>
                      <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 text-[10px] sm:text-sm md:text-base">
                        <li>Memberikan edukasi interaktif berbasis mewarnai untuk anak-anak.</li>
                        <li>Mengintegrasikan nilai-nilai kebersihan lingkungan dalam media belajar.</li>
                        <li>Meningkatkan kreativitas dan motorik anak desa.</li>
                      </ul>
                    </div>
                    <p className="text-center font-medium mt-1 sm:mt-2 text-gray-900 text-[10px] sm:text-base">
                      Mari bersama-sama membangun generasi cerdas dan lingkungan sehat!
                    </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
