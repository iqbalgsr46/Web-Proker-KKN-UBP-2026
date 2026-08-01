"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-[#e0e7ff] to-[#f0f9ff] py-16 px-6 sm:px-12 md:px-24">
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 mb-20 relative z-20">
          
          {/* Column 1: Alamat */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-gray-500 font-semibold mb-6 text-sm">Alamat</h4>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Posko KKN Universitas Buana Perjuangan Karawang,<br/>
              Desa Sukamaju, Kec. Cikampek,<br/>
              Kab. Karawang, Jawa Barat 41373
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="md:col-span-4 flex flex-col md:pl-10">
            <h4 className="text-gray-500 font-semibold mb-6 text-sm">Navigasi</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><Link href="/" className="hover:text-google-blue transition-colors">Beranda</Link></li>
              <li><Link href="/kategori" className="hover:text-google-blue transition-colors">Kategori Mewarnai</Link></li>
              <li><Link href="/galeri" className="hover:text-google-blue transition-colors">Galeri Karya</Link></li>
              <li><Link href="/tentang" className="hover:text-google-blue transition-colors">Tentang Tim KKN</Link></li>
            </ul>
          </div>

          {/* Column 3: Bantuan */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-gray-500 font-semibold mb-6 text-sm">Bantuan</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><Link href="#" className="hover:text-google-blue transition-colors">Panduan Penggunaan</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center relative z-20 gap-6">
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl font-medium">
            © 2026 Tim KKN Desa Sukamaju | EduColoring adalah platform edukasi mewarnai ceria untuk mengenalkan pentingnya memilah sampah kepada anak-anak sejak dini.
          </p>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium">
            <Link href="#" className="hover:text-gray-800 transition-colors">Terms</Link>
            <span>|</span>
            <Link href="#" className="hover:text-gray-800 transition-colors">Privacy</Link>
          </div>
        </div>

        {/* Huge Watermark Text */}
        <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[120px] sm:text-[180px] md:text-[250px] lg:text-[320px] font-black text-white leading-none tracking-tighter opacity-80" style={{ transform: "translateY(25%)" }}>
            educoloring
          </span>
        </div>

      </div>
    </footer>
  );
}

