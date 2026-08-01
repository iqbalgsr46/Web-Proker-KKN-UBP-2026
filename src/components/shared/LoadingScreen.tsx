"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { AbstractBlob } from "@/components/ui/AbstractBlob";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Hanya tampilkan jika belum pernah tampil di sesi ini (opsional, tapi bagus untuk UX)
    // Untuk demo, kita selalu tampilkan saat mount pertama kali.
    
    document.body.style.overflow = "hidden"; // Kunci scroll saat loading

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        document.body.style.overflow = ""; // Kembalikan scroll
      }
    });

    // Animasi masuk (jika diperlukan)
    tl.fromTo(contentRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    // Animasi titik-titik teks
    tl.to(textRef.current, {
      opacity: 0.5,
      duration: 0.4,
      yoyo: true,
      repeat: 3,
      ease: "power1.inOut"
    }, "-=0.2");

    // Animasi keluar (Slide up & shrink)
    tl.to(contentRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });

    tl.to(containerRef.current, {
      y: "-100%",
      duration: 0.7,
      ease: "power3.inOut"
    }, "-=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#FBBC04] flex items-center justify-center overflow-hidden"
    >
      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <AbstractBlob type="spark" color="red" className="absolute top-[10%] left-[10%] w-32 h-32 rotate-12" />
        <AbstractBlob type="circle-spark" color="blue" className="absolute bottom-[20%] right-[15%] w-48 h-48 -rotate-12" />
        <AbstractBlob type="hexagon" color="green" className="absolute top-[30%] right-[25%] w-24 h-24 rotate-[45deg]" />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center">
        {/* Ikon Palet (Bisa diganti dengan logo) */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[8px_8px_0px_#202124] border-4 border-[#202124] mb-8 relative">
          <span className="text-5xl">🎨</span>
          
          {/* Ornamen Spark kecil di sekitar ikon */}
          <div className="absolute -top-4 -right-4 text-google-red animate-spin-slow">✨</div>
          <div className="absolute -bottom-2 -left-4 text-google-blue animate-bounce">✨</div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[#202124] tracking-tighter mb-2">
          EduColoring
        </h1>
        <p ref={textRef} className="text-[#202124] font-bold text-lg md:text-xl tracking-wide">
          Menyiapkan Warna...
        </p>

        {/* Progress Bar palsu untuk estetika */}
        <div className="w-48 h-3 bg-white/50 rounded-full mt-6 border-2 border-[#202124] overflow-hidden">
          <div className="h-full bg-google-red w-full origin-left animate-progress-fill"></div>
        </div>
      </div>

      {/* Global Style untuk animasi progress */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress-fill {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
        .animate-progress-fill {
          animation: progress-fill 1.2s ease-in-out forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}} />
    </div>
  );
}
