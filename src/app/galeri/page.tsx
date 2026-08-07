"use client";

import { useState, useEffect } from "react";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import Image from "next/image";
import Link from "next/link";
import Masonry from "@/components/ui/Masonry";
import { TextReveal } from "@/registry/magicui/text-reveal";
import { MorphingText } from "@/components/ui/morphing-text";
import { Iphone } from "@/components/ui/iphone";
import { Marquee } from "@/components/ui/marquee";
import { Send, Palette } from "lucide-react";

interface Submission {
  id: string;
  childName: string;
  submitterName: string;
  imageUrl: string;
  createdAt: string;
  coloringPage: { title: string; slug: string };
}

export default function GaleriPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved submissions + auto-refresh setiap 5 detik
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch("/api/submissions?status=APPROVED&limit=30");
        if (res.ok) {
          const json = await res.json();
          setSubmissions(json.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, []);

  // Format submissions for masonry
  const heights = [250, 350, 380, 280, 300, 320];
  const masonryItems = submissions.map((sub, idx) => ({
    id: sub.id,
    img: sub.imageUrl,
    url: "#",
    height: heights[idx % heights.length],
  }));

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col bg-transparent">

      {/* 1. Blurred Glowing Mesh Gradient (Ambient Color - Penuh Warna 100%) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 blur-[100px] md:blur-[140px] opacity-85">
        {/* Sudut Kiri Atas - Biru Lembut */}
        <AbstractBlob type="circle-spark" color="blue" className="w-[60rem] h-[60rem] md:w-[80rem] md:h-[80rem] absolute -top-[20%] -left-[20%] transform-gpu" />
        {/* Kanan Atas - Kuning Merah Hangat */}
        <AbstractBlob type="gemini-spark" color="yellow" className="w-[60rem] h-[60rem] md:w-[80rem] md:h-[80rem] absolute -top-[10%] -right-[20%] transform-gpu" />
        {/* Kiri Bawah - Hijau Segar */}
        <AbstractBlob type="cross-spark" color="green" className="w-[70rem] h-[70rem] md:w-[90rem] md:h-[90rem] absolute -bottom-[20%] -left-[20%] transform-gpu" />
        {/* Kanan Bawah - Biru Dalam */}
        <AbstractBlob type="hexagon" color="blue" className="w-[60rem] h-[60rem] md:w-[80rem] md:h-[80rem] absolute -bottom-[10%] -right-[15%] transform-gpu" />
        {/* Tengah - Aksen Kuning Lembut (Lebih bersahabat dibanding Merah tebal) */}
        <AbstractBlob type="circle-spark" color="yellow" className="w-[50rem] h-[50rem] md:w-[70rem] md:h-[70rem] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-70" />
      </div>

      {/* 2. Sharp Vector Ornaments (Solid Shapes, Elegan & Minimalis) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-[0.35] md:opacity-40">
        {/* Pojok Kiri Atas */}
        <AbstractBlob type="hexagon" color="green" className="w-28 md:w-40 h-28 md:h-40 absolute top-[12%] left-[8%] -rotate-12 transform-gpu" />
        {/* Pojok Kanan Atas */}
        <AbstractBlob type="circle-spark" color="red" className="w-16 md:w-24 h-16 md:h-24 absolute top-[18%] right-[10%] blur-[1px] rotate-45 transform-gpu" />
        {/* Kiri Bawah Tengah */}
        <AbstractBlob type="cross-spark" color="blue" className="w-40 md:w-64 h-40 md:h-64 absolute bottom-[25%] left-[5%] rotate-12 transform-gpu" />
        {/* Pojok Kanan Bawah */}
        <AbstractBlob type="cross" color="yellow" className="w-32 md:w-48 h-32 md:h-48 absolute bottom-[15%] right-[8%] -rotate-[25deg] transform-gpu" />
        {/* Mengambang di Tengah Kanan */}
        <AbstractBlob type="hexagon" color="blue" className="w-24 md:w-36 h-24 md:h-36 absolute top-[60%] right-[15%] rotate-[15deg] transform-gpu blur-[1px]" />
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-start p-4 sm:p-8 mt-8 sm:mt-16 md:mt-24 z-10 overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 md:gap-3 mb-6 sm:mb-8 mt-2 sm:mt-4 w-full px-2">
          {/* Left Bracket */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px]">
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-1 sm:px-0 w-auto min-w-[150px] sm:min-w-[240px] md:min-w-[300px] z-10 shrink">
            <h2 className="mt-3 sm:mt-4 text-[1.1rem] sm:text-xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-1 sm:mb-2">
              Galeri
            </h2>
            <MorphingText texts={["Karya Anak", "Kreativitas", "Edukasi", "Imajinasi"]} className="whitespace-nowrap mt-1 sm:mt-0 text-xl sm:text-3xl md:!text-5xl lg:!text-5xl !h-12 sm:!h-16 md:!h-24 m-0 md:mb-2 w-full" />
            
            {/* Location Pill Badge */}
            <div className="relative z-10 -mt-1.5 sm:-mt-2 px-3 sm:px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white shadow-sm max-w-full overflow-hidden">
              <span className="text-[#202124] font-bold text-[10px] sm:text-sm truncate">UBP Karawang</span>
            </div>
          </div>

          {/* Right Bracket */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px]">
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>
        
        {/* Deskripsi Galeri */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium mb-6 sm:mb-8 max-w-3xl leading-relaxed text-center text-balance mx-auto px-4">
          Kumpulan hasil karya mewarnai yang dipenuhi dengan keceriaan dan kreativitas tanpa batas. Lihat bagaimana anak-anak mengekspresikan kepedulian mereka terhadap lingkungan melalui warna!
        </p>

        {/* CTA Kirim Karya */}
        <Link
          href="/kirim-karya"
          className="mb-8 sm:mb-12 inline-flex items-center gap-2 px-8 py-3.5 bg-google-blue text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
          Kirim Karya Anakmu!
        </Link>
        
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

        {/* Galeri Karya Dinamis */}
        <div className="w-full max-w-5xl mx-auto mb-12 sm:mb-20 relative px-2 sm:px-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-2">Karya Terbaik Anak-Anak</h3>
          <p className="text-gray-500 font-medium text-sm sm:text-base text-center mb-8 sm:mb-10">Karya-karya yang sudah disetujui dan tampil di galeri</p>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-google-blue/30 border-t-google-blue rounded-full animate-spin" />
            </div>
          ) : masonryItems.length > 0 ? (
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          ) : (
            <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-[2.5rem] shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Palette className="w-8 h-8 text-google-blue" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Belum Ada Karya</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                Jadilah yang pertama mengirimkan karya mewarnai anak-anak!
              </p>
              <Link
                href="/kirim-karya"
                className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                Kirim Karya Sekarang
              </Link>
            </div>
          )}
        </div>

        {/* Karya Info Cards - Below Masonry */}
        {submissions.length > 0 && (
          <div className="w-full max-w-5xl mx-auto mb-12 sm:mb-20 px-2 sm:px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {submissions.slice(0, 8).map((sub) => (
                <div key={sub.id} className="backdrop-blur-md bg-white/60 border border-white/60 rounded-2xl p-3 shadow-sm">
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-gray-100">
                    <img src={sub.imageUrl} alt={`Karya ${sub.childName}`} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{sub.childName}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate">oleh {sub.submitterName}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate">{sub.coloringPage.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

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
            {submissions.length > 0 ? (
              <>
                <Marquee pauseOnHover style={{ "--duration": "80s" } as any}>
                  {submissions.map((sub, i) => (
                    <div key={`row1-${sub.id}-${i}`} className="relative h-44 w-32 md:h-52 md:w-40 overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm bg-white mx-2">
                      <img src={sub.imageUrl} alt={`Karya ${sub.childName}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="mt-4" style={{ "--duration": "80s" } as any}>
                  {[...submissions].reverse().map((sub, i) => (
                    <div key={`row2-${sub.id}-${i}`} className="relative h-44 w-32 md:h-52 md:w-40 overflow-hidden rounded-2xl border border-gray-200/50 shadow-sm bg-white mx-2">
                      <img src={sub.imageUrl} alt={`Karya ${sub.childName}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </Marquee>
              </>
            ) : (
              <>
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
              </>
            )}
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
