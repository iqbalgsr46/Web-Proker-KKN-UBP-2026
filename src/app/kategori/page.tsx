"use client";

import Link from "next/link";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { Iphone } from "@/components/ui/iphone";
import { PillButton } from "@/components/ui/PillButton";
import { PopupOrganik } from "@/components/ui/PopupOrganik";
import { PopupAnorganik } from "@/components/ui/PopupAnorganik";
import { PopupB3 } from "@/components/ui/PopupB3";
import { TextReveal } from "@/registry/magicui/text-reveal";
import { ArrowRight } from "lucide-react";

export default function KategoriPage() {
  return (
    <main className="w-full max-w-[100vw] min-h-screen bg-transparent relative flex flex-col items-center overflow-x-hidden">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS (Mesh Gradient) */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        
        {/* 7 Abstract Blobs Scattered in Background */}
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-20 rotate-12 pointer-events-none" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-[25%] right-[2%] w-32 md:w-48 h-32 md:h-48 opacity-20 -rotate-12 pointer-events-none blur-[2px]" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[45%] left-[5%] w-40 md:w-56 h-40 md:h-56 opacity-20 rotate-[45deg] pointer-events-none" />
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[70%] right-[-10%] w-72 md:w-[500px] h-72 md:h-[500px] opacity-15 -rotate-[25deg] pointer-events-none blur-[4px]" />
        <AbstractBlob type="spark" color="red" className="absolute top-[5%] right-[20%] w-24 md:w-32 h-24 md:h-32 opacity-20 rotate-[15deg] pointer-events-none" />
        <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[30%] w-56 h-56 opacity-20 rotate-[60deg] pointer-events-none" />
        <AbstractBlob type="cross" color="red" className="absolute top-[18%] left-[25%] w-16 md:w-24 h-16 md:h-24 opacity-15 rotate-[30deg] pointer-events-none" />
        
        {/* Glow Biru (Atas Kiri) */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-google-blue/20 blur-[60px] md:blur-[80px] pointer-events-none" 
        />
        {/* Glow Merah (Atas Kanan) */}
        <div 
          className="absolute top-[5%] -right-[10%] w-[50%] h-[50%] rounded-full bg-google-red/10 blur-[60px] md:blur-[80px] pointer-events-none" 
        />
        {/* Glow Kuning (Bawah Kiri) */}
        <div 
          className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-google-yellow/20 blur-[60px] md:blur-[80px] pointer-events-none" 
        />
        {/* Glow Hijau (Bawah Kanan) */}
        <div 
          className="absolute bottom-[5%] right-[5%] w-[50%] h-[50%] rounded-full bg-google-green/10 blur-[60px] md:blur-[80px] pointer-events-none" 
        />
      </div>

      {/* HERO SECTION (Bagian 3 iPhone) */}
      <section className="w-full overflow-x-hidden flex flex-col items-center justify-start relative pt-12 sm:pt-16 md:pt-24 pb-8 md:pb-12 z-10">
        <div className="flex flex-col items-center justify-start w-full max-w-7xl mx-auto gap-6 md:gap-12 px-4 sm:px-8">
          
          <div className="text-center relative z-10 w-full flex flex-col items-center">
            
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 mb-4 sm:mb-6 w-full px-2">
              {/* Left Bracket (Kurung Kurawal Kuning) */}
              <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-7 h-14 sm:w-[45px] sm:h-[90px] md:translate-x-4">
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>

              {/* Center Content */}
              <div className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-6 w-auto shrink">
                <h1 className="pt-2 text-[1.4rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black text-gray-900 tracking-tight text-center mb-0.5 sm:mb-1 leading-none break-words">
                  Kategori
                  <br />
                  <span className="text-google-blue">Edukasi</span>
                </h1>
                
                {/* Location Pill Badge */}
                <div className="mt-1 relative z-10 px-3 sm:px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white shadow-sm max-w-full overflow-hidden">
                  <span className="text-[#202124] font-bold text-[10px] sm:text-sm truncate">UBP Karawang</span>
                </div>
              </div>

              {/* Right Bracket (Kurung Kurawal Kuning) */}
              <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-7 h-14 sm:w-[45px] sm:h-[90px] md:-translate-x-4">
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            
            <p className="text-gray-600 font-medium text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-4 sm:mb-8 text-balance px-4 -mt-2">
              Pilih lembar mewarnai di bawah ini untuk mulai belajar mengenal jenis-jenis sampah dengan cara yang interaktif dan menyenangkan!
            </p>

            {/* 3 iPhones Showcase */}
            <div className="flex flex-row items-center justify-center gap-1 sm:gap-4 md:gap-8 mt-6 sm:mt-12 md:mt-24 w-full max-w-[1000px] mx-auto z-20 relative">
              <div className="w-[31%] sm:w-[30%] max-w-[300px] transform-gpu hover:scale-105 transition-transform duration-500 origin-bottom">
                <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Buat_video_gambar_bergerak_202608022245.mp4" />
              </div>
              <div className="w-[31%] sm:w-[30%] max-w-[300px] transform-gpu hover:scale-105 -translate-y-4 md:-translate-y-8 transition-transform duration-500 origin-bottom z-10">
                <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Gambar_anak_sd_guru_sd_202608022253.mp4" />
              </div>
              <div className="w-[31%] sm:w-[30%] max-w-[300px] transform-gpu hover:scale-105 transition-transform duration-500 origin-bottom">
                <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Gambar_anak_SD_jadi_bergerak_202608022229.mp4" startTime={1.5} />
              </div>
            </div>

            {/* Tombol Menuju Kumpulan Gambar */}
            <div className="mt-8 sm:mt-10 md:mt-16 flex justify-center z-30 relative duration-700 delay-300">
              <PillButton href="/kumpulan-mewarnai" variant="blue" className="group text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
                Lihat Kumpulan Gambar
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-1 group-hover:translate-x-1 transition-transform" />
              </PillButton>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full overflow-x-hidden flex flex-col items-center justify-center relative pt-8 md:pt-16 pb-16 md:pb-24 z-10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center">
          
          {/* Features Header */}
          <div className="text-center mb-10 sm:mb-20 lg:mb-32 flex flex-col items-center">
            <span className="text-google-blue font-extrabold tracking-widest uppercase text-xs sm:text-sm mb-2">AYO MULAI MEMILAH!</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter break-words">
              Mengenal 3 Jenis Sampah
            </h2>
          </div>

          {/* Features Rows */}
          <div className="flex flex-col w-full gap-16 md:gap-32 lg:gap-40">
            
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
              {/* Left: iPhone */}
              <div className="w-[80%] max-w-[220px] sm:max-w-[320px] lg:max-w-[350px] shrink-0 mx-auto lg:mx-0 lg:translate-x-16 transform-gpu hover:scale-[1.02] transition-transform duration-500">
                 <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Gambar_anak_SD_jadi_bergerak_202608022229.mp4" startTime={1.5} />
              </div>
              {/* Right: Text & Button */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg mx-auto lg:mx-0 lg:-translate-x-16 w-full px-2 sm:px-0 mt-2 sm:mt-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-3 sm:mb-4">
                  Mengenal Sampah Organik
                </h3>
                <p className="text-gray-600 text-sm sm:text-lg md:text-xl mb-5 sm:mb-8 leading-relaxed text-balance">
                  Mari belajar tentang sampah organik! Sampah ini berasal dari alam, seperti sisa makanan, kulit buah, dan daun kering. Sampah organik sangat istimewa karena bisa membusuk dengan sendirinya dan diolah menjadi pupuk kompos yang menyuburkan tanaman.
                </p>
                <div className="scale-90 sm:scale-100 origin-center lg:origin-left"><PopupOrganik /></div>
              </div>
            </div>

            {/* Feature 2 (Reversed on Desktop) */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
              {/* Left: Text & Button */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg mx-auto lg:mx-0 lg:-translate-x-16 lg:ml-auto w-full px-2 sm:px-0 mt-2 sm:mt-0">
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-3 sm:mb-6 tracking-tighter">
                  Mengenal Sampah<br/>Anorganik
                </h3>
                <p className="text-gray-600 text-sm sm:text-lg md:text-xl mb-5 sm:mb-8 leading-relaxed text-balance">
                  Pernahkah kamu membuang botol plastik atau kaleng minuman? Itu adalah sampah anorganik! Sampah ini sangat sulit hancur di alam lho. Oleh karena itu, kita harus memilahnya agar bisa didaur ulang menjadi barang-barang baru yang bermanfaat.
                </p>
                <div className="scale-90 sm:scale-100 origin-center lg:origin-left"><PopupAnorganik /></div>
              </div>
              {/* Right: iPhone */}
              <div className="w-[80%] max-w-[220px] sm:max-w-[320px] lg:max-w-[350px] shrink-0 mx-auto lg:mx-0 lg:mr-auto lg:translate-x-16 transform-gpu hover:scale-[1.02] transition-transform duration-500">
                 <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Buat_video_gambar_bergerak_202608022245.mp4" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full">
              {/* Left: iPhone */}
              <div className="w-[80%] max-w-[220px] sm:max-w-[320px] lg:max-w-[350px] shrink-0 mx-auto lg:mx-0 lg:translate-x-16 transform-gpu hover:scale-[1.02] transition-transform duration-500">
                 <Iphone className="w-full shadow-2xl shadow-gray-900/20" videoSrc="/videos/Gambar_anak_sd_guru_sd_202608022253.mp4" />
              </div>
              {/* Right: Text & Button */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg mx-auto lg:mx-0 lg:-translate-x-16 w-full px-2 sm:px-0 mt-2 sm:mt-0">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-3 sm:mb-4">
                  Mengenal Sampah B3
                </h3>
                <p className="text-gray-600 text-sm sm:text-lg md:text-xl mb-5 sm:mb-8 leading-relaxed text-balance">
                  B3 adalah singkatan dari Bahan Berbahaya dan Beracun. Contohnya baterai bekas, lampu bohlam, atau botol semprotan nyamuk. Sampah jenis ini tidak boleh dibuang sembarangan lho, karena zat kimianya bisa merusak tanah dan berbahaya bagi kesehatan kita.
                </p>
                <div className="scale-90 sm:scale-100 origin-center lg:origin-left"><PopupB3 /></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="relative w-full py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-transparent to-orange-50/30">
        {/* Background Blobs for Aesthetics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-40">
          <div className="absolute w-[300px] h-[300px] bg-google-blue/30 rounded-full blur-3xl top-0 -translate-x-1/2" />
          <div className="absolute w-[400px] h-[400px] bg-google-green/20 rounded-full blur-3xl top-1/4 translate-x-1/4" />
          <div className="absolute w-[350px] h-[350px] bg-google-yellow/30 rounded-full blur-3xl bottom-0 -translate-x-1/3" />
        </div>
        
        <div className="relative z-10 w-full px-4">
          <TextReveal text="Hebat sekali! Kini kamu sudah mengenal perbedaan sampah Organik, Anorganik, dan B3. Mulai sekarang, yuk kita sama-sama membuang sampah pada tempat yang tepat sesuai jenisnya. Langkah kecilmu hari ini dalam memilah sampah akan membuat bumi kita tercinta menjadi tempat yang jauh lebih bersih, sehat, dan indah untuk masa depan. Ayo jadilah pahlawan lingkungan sejati!" />
        </div>
      </section>

    </main>
  );
}
