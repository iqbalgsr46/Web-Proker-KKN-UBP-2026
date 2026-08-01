import Link from "next/link";
import Masonry from "@/components/ui/Masonry";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";

export default function KumpulanMewarnaiPage() {
  return (
    <main className="min-h-[100dvh] bg-transparent relative flex flex-col items-center justify-start overflow-x-hidden w-full pb-24">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-50 rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-[25%] right-[2%] w-32 md:w-48 h-32 md:h-48 opacity-60 -rotate-12 pointer-events-none transform-gpu blur-[2px]" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[45%] left-[5%] w-40 md:w-56 h-40 md:h-56 opacity-50 rotate-[45deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="spark" color="red" className="absolute top-[15%] right-[20%] w-24 md:w-32 h-24 md:h-32 opacity-50 rotate-[15deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[30%] w-56 h-56 opacity-50 rotate-[60deg] pointer-events-none transform-gpu" />
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
