import Link from "next/link";
import Masonry from "@/components/ui/Masonry";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";

export default function KumpulanMewarnaiPage() {
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

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-8 pt-12 md:pt-24 relative z-10 flex flex-col items-center">
        
        {/* Navigation Back Button */}
        <div className="w-full flex justify-start mb-8">
          <Link href="/kategori">
            <button className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase">Kumpulan Lembar Mewarnai</h1>
          <p className="text-gray-600 mt-3 font-medium text-lg">Pilih salah satu karya inspiratif di bawah ini!</p>
        </div>
        
        <div className="w-full">
          <Masonry 
            items={[
              { id: "1", img: "/images/coloring_recycle_bin.png", url: "#", height: 400 },
              { id: "2", img: "/images/coloring_plant_tree.png", url: "#", height: 300 },
              { id: "3", img: "/images/coloring_clean_river.png", url: "#", height: 400 },
              { id: "4", img: "/images/coloring_sorting_trash.png", url: "#", height: 400 },
              { id: "5", img: "/images/coloring_bicycle_park.png", url: "#", height: 300 },
              { id: "6", img: "/images/coloring_happy_earth.png", url: "#", height: 400 },
              { id: "7", img: "/images/coloring_plant_tree.png", url: "#", height: 350 },
              { id: "8", img: "/images/coloring_clean_river.png", url: "#", height: 450 },
            ]}
            colorShiftOnHover={true}
          />
        </div>
        
        <div className="mt-16">
          <Link href="/mewarnai/organik">
            <PillButton variant="green" className="px-10 py-4 text-lg shadow-lg hover:shadow-xl">
              Mulai Mewarnai Sekarang
            </PillButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
