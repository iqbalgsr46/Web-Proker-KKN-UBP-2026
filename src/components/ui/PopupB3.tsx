"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { PillButton } from "./PillButton";
import { GlassCard } from "./GlassCard";
import { X } from "lucide-react";

const b3Items = [
  { name: "Baterai Bekas", src: "/images/b3/baterai_bekas_v2.png" },
  { name: "Lampu Bohlam", src: "/images/b3/lampu_bohlam_v2.png" },
  { name: "Semprotan Nyamuk", src: "/images/b3/semprotan_nyamuk_v2.png" },
  { name: "Kaleng Cat", src: "/images/b3/kaleng_cat_v2.png" },
  { name: "Aki Bekas", src: "/images/b3/aki_bekas_v2.png" },
];

export function PopupB3() {
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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Dark Blurred Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Glossy Glass Popup */}
        <GlassCard 
          withShimmer={false}
          className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col p-4 sm:p-10 lg:p-12 animate-in zoom-in-95 duration-300"
        >
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 sm:top-8 sm:right-8 p-1.5 sm:p-3 bg-white/80 backdrop-blur-sm hover:bg-google-red hover:text-white rounded-full transition-all border-4 border-transparent hover:border-[#202124] hover:shadow-[4px_4px_0px_#202124] z-20"
          >
            <X className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={3} />
          </button>

          <div className="flex-none text-center mb-4 sm:mb-8 mt-6 sm:mt-0 relative z-10 px-6 sm:px-0">
            <span className="inline-block py-0.5 sm:py-1 px-4 sm:px-5 rounded-full bg-red-50 text-red-600 font-extrabold text-[10px] sm:text-sm tracking-widest uppercase mb-2 sm:mb-3 border-2 border-red-500/30 shadow-sm">
              Galeri Edukasi
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
              Contoh <br className="sm:hidden" />
              <span className="text-red-500 drop-shadow-sm">Sampah B3</span>
            </h2>
          </div>

          <div className="flex-1 min-h-0 w-full mx-auto overflow-y-auto overflow-x-hidden relative z-10 pr-1 sm:pr-0 pb-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6 w-full h-fit sm:h-full content-start sm:content-center pb-4 sm:pb-0">
              {b3Items.map((item, index) => (
                <div key={index} className="group flex flex-col items-center justify-center p-2 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/60 backdrop-blur-md border-2 border-white/50 hover:border-google-red hover:shadow-[4px_4px_0px_#ea4335] transition-all hover:-translate-y-1 h-full max-h-[120px] sm:max-h-[180px] lg:max-h-[200px]">
                  <div className="w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 relative mb-1 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image 
                      src={item.src} 
                      alt={item.name} 
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                  <span className="font-bold text-gray-800 text-center text-[11px] sm:text-sm lg:text-base leading-tight px-1 text-balance">
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
        variant="red"
        onClick={() => setIsOpen(true)}
      >
        Jenis Sampah B3
      </PillButton>

      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
}
