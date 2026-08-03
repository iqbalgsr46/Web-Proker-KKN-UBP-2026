"use client";

import { AbstractBlob } from "@/components/ui/AbstractBlob";
import Image from "next/image";
import Masonry from "@/components/ui/Masonry";
import { TextReveal } from "@/registry/magicui/text-reveal";
import { MorphingText } from "@/components/ui/morphing-text";
import { Iphone } from "@/components/ui/iphone";
import { Marquee } from "@/components/ui/marquee";

export default function GaleriPage() {
  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col bg-transparent">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS (Mesh Gradient) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        
        {/* Wrapper dengan filter blur langsung (sangat ringan untuk GPU HP dibandingkan backdrop-blur) */}
        <div className="absolute inset-0 blur-[120px]">
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
        </div> {/* End of blur-[120px] wrapper */}
        
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

      <main className="flex-1 w-full flex flex-col items-center justify-start p-4 sm:p-8 mt-8 sm:mt-16 md:mt-24 z-10 overflow-hidden">
        
        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 mb-6 sm:mb-8 mt-2 sm:mt-4 w-full px-2">
          
          {/* Left Bracket (Kurung Kurawal Kuning) */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px] md:translate-x-4">
            {/* Outer thin black border */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-1 sm:px-0 w-auto z-10 shrink">
            <h2 className="mt-3 sm:mt-4 text-[1.1rem] sm:text-xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-1 sm:mb-2">
              Galeri
            </h2>
            <MorphingText texts={["Karya Anak", "Kreativitas", "Edukasi", "Imajinasi"]} className="whitespace-nowrap mt-1 sm:mt-0 text-xl sm:text-3xl md:!text-5xl lg:!text-5xl !h-12 sm:!h-16 md:!h-24 m-0 md:mb-2 w-full" />
            
            {/* Location Pill Badge */}
            <div className="relative z-10 -mt-1.5 sm:-mt-2 px-3 sm:px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white shadow-sm max-w-full overflow-hidden">
              <span className="text-[#202124] font-bold text-[10px] sm:text-sm truncate">UBP Karawang</span>
            </div>
          </div>

          {/* Right Bracket (Kurung Kurawal Kuning) */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px] md:-translate-x-4">
            {/* Outer thin black border */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

        </div>
        
        {/* Deskripsi Galeri */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-8 sm:mb-12 max-w-3xl leading-relaxed text-center text-balance mx-auto px-4">
          Kumpulan hasil karya mewarnai yang dipenuhi dengan keceriaan dan kreativitas tanpa batas. Lihat bagaimana anak-anak mengekspresikan kepedulian mereka terhadap lingkungan melalui warna!
        </p>
        
        {/* Proses Kreatif Section */}
        <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-16 px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-2">Proses di Balik Karya</h3>
          <p className="text-gray-500 font-medium text-sm sm:text-base text-center mb-8 sm:mb-10">Setiap lembar mewarnai melewati tahapan perancangan yang matang</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { step: "01", color: "bg-google-green/10", icon: "✏️", title: "Riset & Sketsa", desc: "Tim KKN meriset tema pengelolaan sampah dan merancang sketsa awal yang sesuai untuk anak usia dini." },
              { step: "02", color: "bg-google-yellow/10", icon: "🖍️", title: "Desain & Ilustrasi", desc: "Sketsa dikembangkan menjadi ilustrasi detail dengan garis tebal yang mudah diwarnai oleh anak-anak TK & SD." },
              { step: "03", color: "bg-google-red/10", icon: "🌟", title: "Uji Coba & Cetak", desc: "Lembar mewarnai diuji langsung bersama anak-anak di desa, lalu disempurnakan dan dicetak." },
            ].map((item) => (
              <div key={item.step} className={`backdrop-blur-md border border-white/60 rounded-3xl p-5 sm:p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300 transform-gpu ${item.color}`}>
                <span className="text-3xl sm:text-4xl mb-2 sm:mb-3 block">{item.icon}</span>
                <div className="text-xs font-black text-gray-800 opacity-60 tracking-widest uppercase mb-1">Langkah {item.step}</div>
                <h4 className="text-base sm:text-lg font-black text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Masonry Layout without GlassCard wrapper */}
        <div className="w-full max-w-5xl mx-auto mb-12 sm:mb-20 relative px-2 sm:px-4">
          <Masonry
            items={[
              { id: "1", img: "/images/coloring_recycle_bin.webp", url: "#", height: 250 },
              { id: "2", img: "/images/coloring_plant_tree.webp", url: "#", height: 350 },
              { id: "3", img: "/images/coloring_clean_river.webp", url: "#", height: 380 },
              { id: "4", img: "/images/coloring_happy_earth.webp", url: "#", height: 280 },
              { id: "5", img: "/images/coloring_sorting_trash.webp", url: "#", height: 380 },
              { id: "6", img: "/images/coloring_bicycle_park.webp", url: "#", height: 280 },
            ]}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
        </div>

        {/* iPhone Mockup Preview Section */}
        <div className="w-full max-w-7xl mx-auto mb-16 sm:mb-24 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center mb-8 sm:mb-10 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4">
              Kreativitas di Genggaman
            </h3>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl font-medium text-balance">
              Jelajahi dan unduh koleksi lembar mewarnai edukatif kami dengan mudah langsung dari perangkat pintar Anda.
            </p>
          </div>
          <div className="w-[85%] max-w-[260px] sm:max-w-[300px] md:max-w-[350px]">
            <Iphone 
              src="/iphone_screen_coloring.png" 
              className="w-full h-auto drop-shadow-2xl" 
            />
          </div>
        </div>
        
        {/* Marquee Section */}
        <div className="w-full relative py-8 sm:py-12 md:py-24 overflow-hidden flex flex-col items-center">
          <div className="mb-8 sm:mb-10 text-center px-4">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-2 drop-shadow-md">
              Karya Lainnya
            </h3>
            <p className="text-sm sm:text-base text-gray-700 font-medium drop-shadow-md">
              Kumpulan hasil karya luar biasa dari teman-teman kita
            </p>
          </div>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <Marquee pauseOnHover style={{ "--duration": "80s" } as any}>
              {[
                '/images/coloring_recycle_bin.webp', 
                '/images/coloring_plant_tree.webp', 
                '/images/coloring_clean_river.webp',
                '/images/coloring_happy_earth.webp',
                '/images/coloring_sorting_trash.webp',
                '/images/coloring_bicycle_park.webp',
              ].map((src, i) => (
                <div key={`row1-${i}`} className="relative h-44 w-32 md:h-52 md:w-40 overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm bg-white mx-2">
                  <Image src={src} alt="Karya Mewarnai" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
                </div>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="mt-4" style={{ "--duration": "80s" } as any}>
              {[
                '/images/coloring_bicycle_park.webp',
                '/images/coloring_sorting_trash.webp',
                '/images/coloring_happy_earth.webp',
                '/images/coloring_clean_river.webp', 
                '/images/coloring_plant_tree.webp', 
                '/images/coloring_recycle_bin.webp',
              ].map((src, i) => (
                <div key={`row2-${i}`} className="relative h-44 w-32 md:h-52 md:w-40 overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm bg-white mx-2">
                  <Image src={src} alt="Karya Mewarnai" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
                </div>
              ))}
            </Marquee>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-24 w-full flex justify-center px-6 mb-20 sm:mb-32">
            <TextReveal>
              Setiap coretan warna di atas adalah cerminan dari imajinasi cemerlang anak-anak dalam memahami betapa pentingnya menjaga kelestarian lingkungan kita bersama. Melalui karya sederhana ini, mereka belajar membuang sampah pada tempatnya, merawat pepohonan, serta menjaga sungai tetap bersih demi masa depan bumi yang lebih hijau dan bahagia.
            </TextReveal>
          </div>
        </div>
        
      </main>
      
    </div>
  );
}
