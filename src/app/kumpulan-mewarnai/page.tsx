"use client";

import Link from "next/link";
import Masonry from "@/components/ui/Masonry";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";

export default function KumpulanMewarnaiPage() {
  const handlePrintPDF = () => {
    const pdfUrl = "/Lembar_Mewarnai_Pengelolaan_Sampah.pdf";
    
    // Perangkat seluler (HP/Tablet) seringkali memblokir print dari hidden iframe
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Buka PDF di tab baru, browser HP otomatis memberikan opsi Print
      window.open(pdfUrl, "_blank");
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    
    // Desktop: Gunakan iframe agar tidak berpindah halaman
    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (error) {
          console.error("Gagal print via iframe, fallback ke tab baru:", error);
          window.open(pdfUrl, "_blank");
        }
      }, 500);
    };
  };
  return (
    <main className="min-h-[100dvh] bg-transparent relative flex flex-col items-center justify-start overflow-x-hidden w-full pb-24">

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
        
        {/* Fill center area */}
        <AbstractBlob type="hexagon" color="red" className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] opacity-10 rotate-[20deg] pointer-events-none transform-gpu blur-[4px]" />
        <AbstractBlob type="spark" color="yellow" className="absolute top-[55%] left-[35%] w-32 md:w-40 h-32 md:h-40 opacity-30 rotate-[105deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="blue" className="absolute top-[35%] right-[45%] w-24 md:w-32 h-24 md:h-32 opacity-40 -rotate-[85deg] pointer-events-none transform-gpu" />
        
        {/* Overlay blur ekstrim untuk membuat efek Mesh Gradient yang sangat halus (warna blur) */}
        <div className="absolute inset-0 backdrop-blur-[120px] z-[5]"></div>
        
        {/* Spark & Abstract Logos Floating Above the Blur */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Original Sparks */}
          <AbstractBlob type="spark" color="blue" className="absolute top-[15%] left-[8%] w-12 md:w-20 h-12 md:h-20 opacity-30 rotate-12" />
          <AbstractBlob type="spark" color="yellow" className="absolute top-[35%] right-[12%] w-16 md:w-24 h-16 md:h-24 opacity-25 -rotate-[15deg]" />
          <AbstractBlob type="spark" color="red" className="absolute bottom-[20%] left-[15%] w-10 md:w-16 h-10 md:h-16 opacity-40 rotate-[30deg]" />
          <AbstractBlob type="spark" color="green" className="absolute bottom-[25%] right-[20%] w-14 md:w-28 h-14 md:h-28 opacity-20 -rotate-[10deg]" />
          <AbstractBlob type="spark" color="blue" className="absolute top-[10%] left-[55%] w-8 md:w-12 h-8 md:h-12 opacity-40 -rotate-[25deg]" />
          <AbstractBlob type="spark" color="red" className="absolute top-[50%] left-[30%] w-20 md:w-32 h-20 md:h-32 opacity-15 rotate-[45deg]" />
          
          {/* Tambahan Bentuk Berbeda (Cross, Hexagon, Circle-Spark) */}
          <AbstractBlob type="cross" color="yellow" className="absolute top-[25%] left-[25%] w-14 md:w-24 h-14 md:h-24 opacity-25 rotate-[15deg]" />
          <AbstractBlob type="circle-spark" color="blue" className="absolute top-[65%] right-[15%] w-20 md:w-32 h-20 md:h-32 opacity-20 -rotate-12" />
          <AbstractBlob type="hexagon" color="green" className="absolute top-[8%] right-[30%] w-12 md:w-16 h-12 md:h-16 opacity-35 rotate-[60deg]" />
          <AbstractBlob type="cross-spark" color="red" className="absolute top-[45%] right-[2%] w-10 md:w-14 h-10 md:h-14 opacity-30 -rotate-[30deg]" />
          <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[45%] w-16 md:w-24 h-16 md:h-24 opacity-25 rotate-[45deg]" />
          <AbstractBlob type="circle-spark" color="green" className="absolute top-[55%] left-[5%] w-24 md:w-36 h-24 md:h-36 opacity-15 rotate-[80deg]" />
          <AbstractBlob type="cross" color="red" className="absolute top-[75%] left-[25%] w-8 md:w-12 h-8 md:h-12 opacity-45 -rotate-[15deg]" />
          <AbstractBlob type="gemini-spark" color="yellow" className="absolute bottom-[15%] right-[45%] w-20 md:w-28 h-20 md:h-28 opacity-20 rotate-12" />
        </div>
      </div>

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-8 pt-6 md:pt-12 relative z-10 flex flex-col items-center">
        
        {/* Navigation Back Button */}
        <div className="w-full flex justify-start mb-4">
          <Link href="/kategori">
            <button className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center gap-0 mb-8 mt-4 scale-90 md:scale-100 print:hidden">
          
          {/* Left Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 translate-x-6 md:translate-x-8">
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-0 w-[240px] md:w-[380px] z-10">
            <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-1">
              Kumpulan
            </h2>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-google-blue tracking-tight text-center mb-4 leading-none">
              Lembar Mewarnai
            </h1>
            
            {/* Location Pill Badge */}
            <div className="-mt-2 relative z-10 px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white shadow-sm">
              <span className="text-[#202124] font-bold text-sm">UBP Karawang</span>
            </div>
          </div>

          {/* Right Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 -translate-x-6 md:-translate-x-8">
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

        </div>

        <p className="text-gray-600 mt-2 mb-12 sm:mb-16 font-medium text-lg text-center px-4 max-w-2xl text-balance print:hidden">
          Pilih salah satu karya inspiratif di bawah ini!
        </p>
        
        <div className="w-full">
          <Masonry 
            items={[
              { id: "1", img: "/images/lembar_mewarnai_1.png", url: "#", height: 400 },
              { id: "2", img: "/images/lembar_mewarnai_2.png", url: "#", height: 300 },
              { id: "3", img: "/images/lembar_mewarnai_3.png", url: "#", height: 400 },
              { id: "4", img: "/images/lembar_mewarnai_4.png", url: "#", height: 350 },
              { id: "5", img: "/images/lembar_mewarnai_5.png", url: "#", height: 450 },
              { id: "6", img: "/images/lembar_mewarnai_6.png", url: "#", height: 350 },
            ]}
            colorShiftOnHover={true}
          />
        </div>
        
        <div className="mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full">
          <a 
            href="/Lembar_Mewarnai_Pengelolaan_Sampah.pdf"
            download="Lembar_Mewarnai_Pengelolaan_Sampah.pdf"
            className="flex items-center justify-center gap-2 bg-google-red text-white font-bold py-4 px-8 rounded-[2rem] shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all w-full sm:w-auto text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Unduh PDF
          </a>

          <button 
            onClick={handlePrintPDF}
            className="flex items-center justify-center gap-2 bg-google-blue text-white font-bold py-4 px-8 rounded-[2rem] shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all w-full sm:w-auto text-lg"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Langsung
          </button>
        </div>
      </div>
    </main>
  );
}
