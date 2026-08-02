"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PillButton } from "./PillButton";
import { GlassCard } from "./GlassCard";
import { X } from "lucide-react";

const anorganikItems = [
  { name: "Botol Plastik", src: "/images/anorganik/botol_plastik_v2.png" },
  { name: "Kaleng Minuman", src: "/images/anorganik/kaleng_minuman_v2.png" },
  { name: "Kantong Plastik", src: "/images/anorganik/kantong_plastik_v2.png" },
  { name: "Botol Kaca", src: "/images/anorganik/botol_kaca_v2.png" },
  { name: "Kardus Bekas", src: "/images/anorganik/kardus_bekas_v2.png" },
  { name: "Kertas Koran", src: "/images/anorganik/kertas_koran_v2.png" },
  { name: "Kemasan Snack", src: "/images/anorganik/kemasan_snack_v2.png" },
  { name: "Sedotan Plastik", src: "/images/anorganik/sedotan_plastik_v2.png" },
  { name: "Gelas Plastik", src: "/images/anorganik/gelas_plastik_v2.png" },
  { name: "Sendok Plastik", src: "/images/anorganik/sendok_plastik_v2.png" },
];

export function PopupAnorganik() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 touch-none overflow-hidden">
        {/* Dark Blurred Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Glossy Glass Popup */}
        <GlassCard 
          withShimmer={false}
          className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col p-6 sm:p-10 lg:p-12 animate-in zoom-in-95 duration-300"
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2 sm:p-3 bg-white/80 backdrop-blur-sm hover:bg-google-red hover:text-white rounded-full transition-all border-4 border-transparent hover:border-[#202124] hover:shadow-[4px_4px_0px_#202124] z-20"
          >
            <X size={28} strokeWidth={3} />
          </button>

          <div className="flex-none text-center mb-6 sm:mb-8 mt-4 sm:mt-0 relative z-10">
            <span className="inline-block py-1 px-5 rounded-full bg-yellow-50 text-yellow-600 font-extrabold text-xs sm:text-sm tracking-widest uppercase mb-3 border-2 border-yellow-400/50 shadow-sm">
              Galeri Edukasi
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Contoh <br className="sm:hidden" />
              <span className="text-yellow-500 drop-shadow-sm">Sampah Anorganik</span>
            </h2>
          </div>

          <div className="flex-1 min-h-0 w-full mx-auto flex items-center justify-center relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full h-full sm:h-auto content-center">
              {anorganikItems.map((item, index) => (
                <div key={index} className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-3xl bg-white/60 backdrop-blur-md border-2 border-white/50 hover:border-google-yellow hover:shadow-[4px_4px_0px_#fbbc04] transition-all hover:-translate-y-1 h-full max-h-[140px] sm:max-h-[180px] lg:max-h-[200px]">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={item.src} 
                      alt={item.name} 
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  <span className="font-bold text-gray-800 text-center text-xs sm:text-sm lg:text-base leading-tight px-1 text-balance">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
    </div>
  );

  return (
    <>
      <PillButton 
        variant="yellow"
        onClick={() => setIsOpen(true)}
      >
        Jenis Sampah Anorganik
      </PillButton>

      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
