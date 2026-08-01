import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import CardSwap, { Card } from "@/components/ui/CardSwap";

const categories = [
  {
    id: "organik",
    title: "Sampah Organik",
    description: "Sisa makanan, dedaunan, dan bahan yang mudah membusuk.",
    color: "green",
    image: "/images/sampah_organik_1785520585331.png",
    blobs: [
      { type: "hexagon", color: "green", position: "-top-10 -left-10 w-32 h-32 rotate-12" },
      { type: "spark", color: "yellow", position: "-bottom-6 -right-6 w-24 h-24 -rotate-12" },
      { type: "circle-spark", color: "blue", position: "-top-4 -right-2 w-14 h-14 rotate-45" },
      { type: "cross", color: "red", position: "-bottom-4 -left-4 w-10 h-10 -rotate-45" },
      { type: "cross-spark", color: "green", position: "top-[40%] -right-8 w-16 h-16 rotate-12" }
    ]
  },
  {
    id: "anorganik",
    title: "Sampah Anorganik",
    description: "Plastik, kardus, botol, kaca, dan material daur ulang lainnya.",
    color: "yellow",
    image: "/images/sampah_anorganik_1785520823589.png",
    blobs: [
      { type: "cross-spark", color: "blue", position: "-top-8 -right-12 w-32 h-32 rotate-45" },
      { type: "circle-spark", color: "yellow", position: "-bottom-10 -left-8 w-28 h-28" },
      { type: "hexagon", color: "red", position: "-top-6 -left-4 w-14 h-14 -rotate-12" },
      { type: "spark", color: "green", position: "-bottom-4 -right-4 w-10 h-10 rotate-90" },
      { type: "cross", color: "yellow", position: "top-[50%] -left-8 w-16 h-16 rotate-45" }
    ]
  },
  {
    id: "b3",
    title: "Sampah Berbahaya (B3)",
    description: "Baterai, obat-obatan, dan barang elektronik rusak.",
    color: "red",
    image: "/images/sampah_b3_1785520616565.png",
    blobs: [
      { type: "cross", color: "red", position: "-top-8 -left-8 w-32 h-32 -rotate-12" },
      { type: "hexagon", color: "blue", position: "-bottom-8 -right-8 w-28 h-28 rotate-12" },
      { type: "spark", color: "yellow", position: "-bottom-6 -left-4 w-14 h-14 rotate-45" },
      { type: "circle-spark", color: "green", position: "-top-4 -right-4 w-10 h-10 -rotate-12" },
      { type: "cross-spark", color: "red", position: "top-[60%] -left-6 w-16 h-16 rotate-90" }
    ]
  }
] as const;

export default function KategoriPage() {
  return (
    <main className="h-[100dvh] bg-transparent relative flex flex-col items-center justify-center overflow-hidden">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS (Mesh Gradient) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white">
        
        {/* 7 Abstract Blobs Scattered in Background */}
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-50 rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-[25%] right-[2%] w-32 md:w-48 h-32 md:h-48 opacity-60 -rotate-12 pointer-events-none transform-gpu blur-[2px]" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute top-[45%] left-[5%] w-40 md:w-56 h-40 md:h-56 opacity-50 rotate-[45deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[70%] right-[-10%] w-72 md:w-[500px] h-72 md:h-[500px] opacity-40 -rotate-[25deg] pointer-events-none transform-gpu blur-[4px]" />
        <AbstractBlob type="spark" color="red" className="absolute top-[5%] right-[20%] w-24 md:w-32 h-24 md:h-32 opacity-50 rotate-[15deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[30%] w-56 h-56 opacity-50 rotate-[60deg] pointer-events-none transform-gpu" />
        <AbstractBlob type="cross" color="red" className="absolute top-[18%] left-[25%] w-16 md:w-24 h-16 md:h-24 opacity-60 rotate-[30deg] pointer-events-none transform-gpu" />
        
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

      <div className="w-full flex-1 flex items-center justify-center pt-12 pb-32 md:pb-40">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 px-4 sm:px-8">
          
          <div className="text-center lg:text-left relative z-10 w-full lg:w-[45%] flex flex-col items-center lg:items-start">
            
            <div className="flex flex-row items-center justify-center gap-0 sm:gap-2 mb-6 scale-90 sm:scale-100 lg:origin-left lg:translate-x-[-20px]">
              {/* Left Bracket (Kurung Kurawal Kuning) */}
              <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 translate-x-2 sm:translate-x-0">
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>

              {/* Center Content */}
              <div className="flex flex-col items-center justify-center px-4 md:px-6 w-fit">
                <h1 className="text-3xl md:text-[2.75rem] font-black text-gray-900 tracking-tight text-center mb-1 leading-none">
                  Kategori
                  <br />
                  <span className="text-google-blue">Edukasi</span>
                </h1>
                
                {/* Location Pill Badge */}
                <div className="-mt-1 relative z-10 px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white">
                  <span className="text-[#202124] font-bold text-sm">UBP Karawang</span>
                </div>
              </div>

              {/* Right Bracket (Kurung Kurawal Kuning) */}
              <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 -translate-x-2 sm:translate-x-0">
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-12">
              Mari belajar memilah sampah dengan cara yang menyenangkan. Pilih salah satu kategori di samping untuk mulai mewarnai!
            </p>
            <Link href="/mewarnai/organik" className="inline-block">
              <PillButton variant="blue" className="px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-lg shadow-lg hover:shadow-xl">
                Mulai Mewarnai
              </PillButton>
            </Link>
          </div>

          <div className="h-[300px] sm:h-[450px] w-full max-w-[550px] relative lg:w-[55%] shrink-0 mx-auto">
            <CardSwap
              cardDistance={20}
              verticalDistance={15}
              delay={3000}
              pauseOnHover={false}
            >
              {categories.map((cat) => (
                <Card key={cat.id} customClass="w-full h-full cursor-pointer group">
                  <Link href={`/mewarnai/${cat.id}`} className="outline-none block w-full h-full">
                    <GlassCard className="h-full w-full flex flex-col items-center text-center p-4 sm:p-6 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] relative !bg-white/95">
                      
                      {/* Decorative Blobs (Melayang di sudut-sudut kartu) */}
                      {cat.blobs.map((blob, idx) => (
                        <AbstractBlob 
                          key={idx}
                          type={blob.type as any} 
                          color={blob.color as any} 
                          className={`absolute ${blob.position} opacity-70 transition-all duration-700 z-0 pointer-events-none transform-gpu`} 
                        />
                      ))}

                      {/* Inner Container */}
                      <div className="relative z-10 bg-white/70 border border-white/60 shadow-[inset_0_4px_30px_rgba(255,255,255,0.6),0_4px_15px_rgba(0,0,0,0.05)] rounded-[2rem] w-full flex-1 flex flex-col items-center p-6 mb-4 overflow-hidden transform-gpu">
                        
                        {/* Glare effect */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

                        <div className="min-h-[3rem] flex items-center justify-center w-full mb-2">
                          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight relative z-10">
                            {cat.title}
                          </h3>
                        </div>
                        
                        <div className="w-40 h-40 mb-4 flex items-center justify-center relative z-10 shrink-0">
                          <img src={cat.image} alt={cat.title} loading="lazy" decoding="async" className="w-full h-full object-contain drop-shadow-xl" />
                        </div>
                        
                        <div className="flex flex-col justify-start w-full">
                          <p className="text-[1.05rem] text-gray-700 font-medium leading-relaxed px-2 relative z-10">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      
                    </GlassCard>
                  </Link>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </main>
  );
}
