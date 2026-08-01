import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import CircularGallery from "@/components/ui/CircularGallery";
import ScrollStack from "@/components/ui/ScrollStack";
import { ScrollStackItem } from "@/components/ui/ScrollStack";
import { TextReveal } from "@/registry/magicui/text-reveal";



export default function TentangPage() {
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

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-12 pt-24 pb-12 relative z-10 flex flex-col items-center">
        {/* ========================================= */}
        {/* KKN BANNER SECTION (GDG Poster Style) */}
        {/* ========================================= */}
        <div className="w-full max-w-4xl mx-auto mb-20 sm:mb-24 mt-4 relative">
          
          <GlassCard className="w-full flex flex-col items-center p-6 sm:p-10 pb-10 relative overflow-visible">
            
            {/* Top Badge (Identik dengan Halaman Utama) */}
            <div className="absolute -top-20 sm:-top-20 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-5 sm:gap-6 scale-[0.55] sm:scale-[0.7] whitespace-nowrap bg-[#f8f9fa]/95 backdrop-blur-xl px-10 sm:px-12 py-5 sm:py-6 rounded-[3.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/50 origin-bottom transform-gpu">
              
              {/* Left Bracket (Kurung Kurawal Kuning) */}
              <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0">
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>

              {/* Center Content (Teks & Hexagon) */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-3xl md:text-[2.25rem] leading-none font-black text-[#202124] tracking-tight">Program</span>
                  {/* Blue Hexagon with Spark */}
                  <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="md:w-[36px] md:h-[36px] shrink-0">
                    <polygon points="28,8 72,8 92,50 72,92 28,92 8,50" fill="#4285F4" stroke="#202124" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M 50 22 C 50 36 36 50 22 50 C 36 50 50 64 50 78 C 50 64 64 50 78 50 C 64 50 50 36 50 22 Z" fill="white" stroke="#202124" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-3xl md:text-[2.25rem] leading-none font-black text-[#202124] tracking-tight mt-1">Kerja KKN 2026</span>
                
                {/* Location Pill Badge */}
                <div className="mt-3 px-5 py-0.5 border-[2px] border-[#202124] bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#202124] font-bold text-sm tracking-wide">UBP Karawang</span>
                </div>
              </div>

              {/* Right Bracket (Kurung Kurawal Kuning) */}
              <svg width="45" height="90" viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0">
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            {/* Photo Container */}
            <div className="w-full relative rounded-3xl mb-16 sm:mb-20 mt-6">
              
              {/* Main Image */}
              <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] relative rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-white bg-gray-200">
                <img src="/images/kkn_students_placeholder.png" alt="Tim KKN" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
              </div>

              {/* Blue Ribbon (BWAI Registration equivalent) */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 w-[95%] sm:w-[85%] max-w-xl bg-google-blue text-white shadow-[0_15px_30px_-10px_rgba(66,133,244,0.6)] rounded-2xl px-4 py-4 sm:py-6 flex flex-col items-center text-center">
                <p className="font-bold tracking-widest text-[0.65rem] sm:text-xs mb-1 text-blue-100 uppercase">Persembahan Spesial</p>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight uppercase">Tim Mahasiswa KKN 2026</h2>
              </div>
            </div>

            {/* Info Grid (4 Columns) */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 sm:mb-12 px-2 sm:px-4">
              {/* Card 1 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white transform-gpu">
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Universitas</p>
                <p className="font-black text-gray-900 text-sm sm:text-base leading-tight">Kampus<br/>Nusantara</p>
              </div>
              {/* Card 2 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white transform-gpu">
                <div className="bg-google-green text-white text-[0.6rem] sm:text-[0.65rem] font-black px-3 py-0.5 rounded-full mb-1 uppercase tracking-wider">Periode</div>
                <p className="font-black text-gray-900 text-sm sm:text-base leading-tight">Jul - Ags<br/>2026</p>
              </div>
              {/* Card 3 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white transform-gpu">
                <div className="bg-google-blue text-white text-[0.6rem] sm:text-[0.65rem] font-black px-3 py-0.5 rounded-full mb-1 uppercase tracking-wider">Desa</div>
                <p className="font-black text-gray-900 text-sm sm:text-base leading-tight">Sukamaju<br/>Jawa Barat</p>
              </div>
              {/* Card 4 */}
              <div className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white transform-gpu">
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">Pembimbing</p>
                <p className="font-black text-gray-900 text-sm sm:text-base leading-tight">Dr. Budi<br/>Santoso</p>
              </div>
            </div>

            {/* Call to Action Container */}
            <div className="flex flex-col items-center relative z-10 text-center bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl w-full border border-white shadow-sm transform-gpu">
              <h3 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight uppercase mb-1">
                Mari Belajar & Bermain Bersama
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium italic mb-6">Mewujudkan desa cerdas bebas sampah</p>
              
              <PillButton variant="green" className="px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg shadow-lg">
                Kenali Kami Lebih Dekat
              </PillButton>
            </div>
            
            {/* Background giant C logo equivalent (Yellow shape) */}
            <div className="absolute bottom-0 -right-10 w-48 h-48 border-[30px] border-google-yellow rounded-[4rem] opacity-20 -z-10 blur-xl pointer-events-none"></div>

          </GlassCard>
        </div>



        <div className="w-full max-w-5xl mx-auto mt-16 sm:mt-32 relative mb-12 sm:mb-20 px-4 sm:px-8">
          <div className="text-center mt-12 sm:mt-8 mb-0 sm:mb-2 relative z-10 pointer-events-none">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Kenali Tim Kami!</h2>
          </div>
          <div className="h-[400px] sm:h-[600px] w-full -mt-6 sm:-mt-16 bg-transparent [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] relative">
            <CircularGallery
              bend={0.5}
              textColor="#202124"
              borderRadius={0.05}
              scrollEase={0.08}
              font="bold 30px 'Inter', sans-serif"
              scrollSpeed={1.35}
            />
          </div>
        </div>
        {/* ========================================= */}
        {/* SCROLL STACK SECTION (FOTO KKN) */}
        {/* ========================================= */}
        <GlassCard className="w-full relative z-10 max-w-5xl mx-auto mt-10 mb-0 px-4 sm:px-8 py-10 sm:py-16 rounded-[3rem]">
          
          {/* Invisible wrapper to limit sticky duration to the top 75% of the container */}
          <div className="absolute inset-x-0 top-0 h-[75%] pointer-events-none z-50 pt-10 sm:pt-16">
            <div className="text-center sticky top-[80px] sm:top-[100px] bg-white/60 backdrop-blur-xl py-4 px-6 rounded-[2rem] border border-white/60 shadow-sm mx-auto w-fit">
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">Dokumentasi Kegiatan</h2>
              <p className="text-gray-600 font-medium mt-2">Momen kebersamaan kami selama di desa Sukamaju</p>
            </div>
          </div>
          
          <div className="pt-48 sm:pt-56">
            <ScrollStack 
              useWindowScroll={true} 
              itemDistance={20}
              stackPosition="260px"
              scaleEndPosition="60px"
            >
            <ScrollStackItem itemClassName="rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Pendidikan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Pendidikan</h2>
                <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Mengajar dan mewarnai bersama anak-anak PAUD & SD.</p>
              </div>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Lingkungan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Lingkungan</h2>
                <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Edukasi pengelolaan sampah dan daur ulang botol plastik.</p>
              </div>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Kesehatan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Kesehatan</h2>
                <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Penyuluhan gizi seimbang dan posyandu ceria.</p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Divisi Ekonomi Kreatif" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Divisi Ekonomi Kreatif</h2>
                <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Membantu UMKM lokal memasarkan produk keripik singkong.</p>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="rounded-[2.5rem] shadow-2xl overflow-hidden !h-auto aspect-[16/9] relative group !p-0">
              <img src="/images/kkn_students_placeholder.png" alt="Malam Perpisahan" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-12 pt-24 sm:pt-32 flex flex-col items-start text-left">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2 leading-none drop-shadow-md">Malam Perpisahan</h2>
                <p className="text-sm sm:text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">Pentas seni bersama warga desa yang tak terlupakan.</p>
              </div>
            </ScrollStackItem>
          </ScrollStack>
          </div>
        </GlassCard>

        {/* ========================================= */}
        {/* THANK YOU SECTION (TEXT REVEAL) */}
        {/* ========================================= */}
        <div className="w-full relative z-10 flex flex-col items-center max-w-[90rem] mx-auto pt-16 pb-32 px-4 sm:px-8">
          {/* Teks Ucapan (Tengah) */}
          <div className="w-full max-w-5xl relative text-center">
            <div className="leading-[1.9] text-gray-800 text-lg md:text-xl">
              <TextReveal>Terima kasih dari kami tim mahasiswa KKN Universitas Buana Perjuangan Karawang atas semua momen, tawa, dan pengalaman berharga di Desa Sukamaju ini. Kami berharap karya EduColoring ini dapat terus menjadi jembatan ilmu yang menyenangkan bagi anak-anak untuk mengenal dan menjaga lingkungan sejak dini. Pengabdian ini mungkin telah usai, namun kenangan indah bersama kalian akan selalu membekas. Sampai jumpa di lain kesempatan yang lebih gemilang!</TextReveal>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
