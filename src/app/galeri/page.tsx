import { AbstractBlob } from "@/components/ui/AbstractBlob";
import Masonry from "@/components/ui/Masonry";
import { MorphingText } from "@/components/ui/morphing-text";

export default function GaleriPage() {
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
        
        {/* Fill center area */}
        <AbstractBlob type="hexagon" color="red" className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] opacity-10 rotate-[20deg] pointer-events-none transform-gpu blur-[4px]" />
        <AbstractBlob type="spark" color="yellow" className="absolute top-[55%] left-[35%] w-32 md:w-40 h-32 md:h-40 opacity-30 rotate-[105deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="blue" className="absolute top-[35%] right-[45%] w-24 md:w-32 h-24 md:h-32 opacity-40 -rotate-[85deg] pointer-events-none transform-gpu" />
        
        {/* Overlay blur ekstrim untuk membuat efek Mesh Gradient yang sangat halus (warna blur) */}
        <div className="absolute inset-0 backdrop-blur-[120px] z-[5]"></div>
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-start p-4 sm:p-8 mt-16 md:mt-24 z-10 overflow-hidden">
        
        <div className="flex flex-row items-center justify-center gap-0 mb-10 mt-4 scale-90 md:scale-100">
          
          {/* Left Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 translate-x-6 md:translate-x-8">
            {/* Outer thin black border */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-0 w-[210px] md:w-[280px]">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight text-center mb-1">
              Galeri
            </h2>
            <MorphingText texts={["Karya Anak", "Kreativitas", "Edukasi", "Imajinasi"]} className="text-3xl sm:text-4xl md:text-5xl !h-16 md:!h-24 m-0" />
          </div>

          {/* Right Bracket (Kurung Kurawal Kuning) */}
          <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 -translate-x-6 md:-translate-x-8">
            {/* Outer thin black border */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            {/* Inner yellow fill */}
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

        </div>
        
        {/* Masonry Layout without GlassCard wrapper */}
        <div className="w-full max-w-7xl mx-auto mb-24 relative min-h-[700px]">
          <Masonry
            items={[
              { id: "1", img: "https://picsum.photos/id/1015/600/900?grayscale", url: "#", height: 400 },
              { id: "2", img: "https://picsum.photos/id/1011/600/750?grayscale", url: "#", height: 250 },
              { id: "3", img: "https://picsum.photos/id/1020/600/800?grayscale", url: "#", height: 600 },
              { id: "4", img: "https://picsum.photos/id/1024/600/600?grayscale", url: "#", height: 350 },
              { id: "5", img: "https://picsum.photos/id/1025/600/900?grayscale", url: "#", height: 450 },
              { id: "6", img: "https://picsum.photos/id/1035/600/800?grayscale", url: "#", height: 300 },
              { id: "7", img: "https://picsum.photos/id/1036/600/750?grayscale", url: "#", height: 500 },
              { id: "8", img: "https://picsum.photos/id/1040/600/900?grayscale", url: "#", height: 350 },
            ]}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

      </main>
      
    </div>
  );
}
