"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AbstractBlob } from "../ui/AbstractBlob";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/game") {
    return null;
  }

  return (
    <footer className="relative w-full overflow-visible bg-white py-20 px-6 sm:px-12 md:px-24 border-t border-gray-100">
      
      {/* Decorative Background Blobs for Footer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 overflow-hidden">
        <AbstractBlob type="hexagon" color="blue" className="absolute -bottom-32 -left-10 w-[30rem] h-[30rem] rotate-12" />
        <AbstractBlob type="circle-spark" color="yellow" className="absolute top-0 right-0 w-[20rem] h-[20rem] -rotate-45" />
        <AbstractBlob type="gemini-spark" color="green" className="absolute -bottom-10 right-1/4 w-[25rem] h-[25rem] rotate-90" />
        <AbstractBlob type="cross" color="red" className="absolute top-10 left-1/3 w-[15rem] h-[15rem] rotate-45" />
      </div>

      {/* Glass Overlay for Mesh Gradient Effect */}
      <div className="absolute inset-0 z-0 bg-white/60 backdrop-blur-[80px]" />

      {/* Seamless Gradient Transition from Page to Footer */}
      <div className="absolute top-0 left-0 w-full h-32 -translate-y-full bg-gradient-to-b from-transparent to-white pointer-events-none z-0" />
      
      <div className="max-w-[90rem] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 relative z-20">
          
          {/* Column 1: Alamat */}
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Alamat</h4>
            <p className="text-gray-600 text-sm leading-loose max-w-sm font-medium">
              Posko KKN Universitas Buana Perjuangan Karawang,<br/>
              Desa [Nama Desa], Kec. [Nama Kecamatan],<br/>
              Kab. [Nama Kabupaten], [Nama Provinsi] [Kode Pos]
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><Link href="/" className="hover:text-google-blue transition-colors">Beranda</Link></li>
              <li><Link href="/kategori" className="hover:text-google-blue transition-colors">Kategori Mewarnai</Link></li>
              <li><Link href="/galeri" className="hover:text-google-blue transition-colors">Galeri Karya</Link></li>
              <li><Link href="/tentang" className="hover:text-google-blue transition-colors">Tentang Tim KKN</Link></li>
            </ul>
          </div>

          {/* Column 3: Bantuan */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Bantuan</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><Link href="#" className="hover:text-google-blue transition-colors">Panduan Penggunaan</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-google-blue transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-20 gap-6 border-t border-gray-900/10 pt-8">
          <p className="text-gray-500 text-xs sm:text-sm max-w-2xl font-bold leading-relaxed">
            © 2026 Tim KKN Desa [Nama Desa] | EduColoring adalah platform edukasi mewarnai ceria untuk mengenalkan pentingnya memilah sampah kepada anak-anak sejak dini.
          </p>
          <div className="flex items-center gap-6 text-xs sm:text-sm text-gray-500 font-bold">
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
          </div>
        </div>

        {/* Huge Watermark Text */}
        <div className="absolute bottom-0 left-0 right-0 z-0 flex justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[70px] sm:text-[110px] md:text-[160px] lg:text-[200px] font-black text-black/5 leading-tight tracking-tighter">
            educoloring
          </span>
        </div>

      </div>
    </footer>
  );
}

