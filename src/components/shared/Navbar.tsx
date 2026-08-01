import Link from 'next/link';
import { PillButton } from '@/components/ui/PillButton';

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pt-4 md:pt-6 px-4 pointer-events-none">
      <nav className="flex items-center justify-between w-full max-w-5xl px-4 md:px-6 py-3 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[2.5rem] pointer-events-auto transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group outline-none">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            <span className="text-xl md:text-2xl">🎨</span>
          </div>
          <div className="text-xl md:text-2xl font-black tracking-tighter">
            <span className="text-google-blue">Edu</span>
            <span className="text-google-green">Coloring</span>
          </div>
        </Link>
        
        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-2 font-bold text-gray-600 text-[15px]">
          <Link href="/kategori" className="px-5 py-2 rounded-full hover:bg-white hover:text-google-red hover:shadow-[0_4px_15px_rgba(234,67,53,0.15)] transition-all duration-300 outline-none">
            Kategori
          </Link>
          <Link href="/galeri" className="px-5 py-2 rounded-full hover:bg-white hover:text-google-yellow hover:shadow-[0_4px_15px_rgba(251,188,4,0.15)] transition-all duration-300 outline-none">
            Galeri
          </Link>
          <Link href="/tentang" className="px-5 py-2 rounded-full hover:bg-white hover:text-google-blue hover:shadow-[0_4px_15px_rgba(66,133,244,0.15)] transition-all duration-300 outline-none">
            Tentang
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/kategori" className="outline-none hidden sm:block">
          <button className="px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 bg-gradient-to-b from-[#5C97F5] to-[#3273DF] text-white shadow-[0_8px_20px_-6px_rgba(66,133,244,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border-none outline-none">
            Mulai Mewarnai
          </button>
        </Link>
        
      </nav>
    </div>
  );
}
