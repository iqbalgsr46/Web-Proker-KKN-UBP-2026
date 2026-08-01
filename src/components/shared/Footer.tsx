"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative w-full overflow-visible bg-black py-20 px-6 sm:px-12 md:px-24">
      {/* Seamless Gradient Transition */}
      <div className="absolute top-0 left-0 w-full h-32 -translate-y-full bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
      
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 relative z-20">
          
          {/* Column 1: Alamat */}
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-gray-400 font-semibold mb-6 text-sm uppercase tracking-wider">Alamat</h4>
            <p className="text-gray-300 text-sm leading-loose max-w-sm">
              Posko KKN Universitas Buana Perjuangan Karawang,<br/>
              Desa Sukamaju, Kec. Cikampek,<br/>
              Kab. Karawang, Jawa Barat 41373
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-gray-400 font-semibold mb-6 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-300 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/kategori" className="hover:text-white transition-colors">Kategori Mewarnai</Link></li>
              <li><Link href="/galeri" className="hover:text-white transition-colors">Galeri Karya</Link></li>
              <li><Link href="/tentang" className="hover:text-white transition-colors">Tentang Tim KKN</Link></li>
            </ul>
          </div>

          {/* Column 3: Bantuan */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-gray-400 font-semibold mb-6 text-sm uppercase tracking-wider">Bantuan</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-300 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Panduan Penggunaan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-20 gap-6 border-t border-white/10 pt-8">
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
            © 2026 Tim KKN Desa Sukamaju | EduColoring adalah platform edukasi mewarnai ceria untuk mengenalkan pentingnya memilah sampah kepada anak-anak sejak dini.
          </p>
          <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>

        {/* Huge Watermark Text */}
        <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[70px] sm:text-[110px] md:text-[160px] lg:text-[200px] font-black text-white/5 leading-tight tracking-tighter">
            educoloring
          </span>
        </div>

      </div>
    </footer>
  );
}

