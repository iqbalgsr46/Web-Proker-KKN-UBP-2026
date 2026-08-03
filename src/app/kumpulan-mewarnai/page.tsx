"use client";

import React from "react";
import Link from "next/link";
import Masonry from "@/components/ui/Masonry";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { PillButton } from "@/components/ui/PillButton";
import { AnimatedBeamDemo } from "@/components/ui/AnimatedBeamDemo";
import { TextReveal } from "@/registry/magicui/text-reveal";

export default function KumpulanMewarnaiPage() {
  const [masonryItems, setMasonryItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [activeFilter, setActiveFilter] = React.useState<string>("Semua");

  React.useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/api/coloring-pages");
        if (res.ok) {
          const json = await res.json();
          const pages = json.data;
          
          // Format into masonry items
          const heights = [250, 350, 380, 280, 300, 320];
            const formatted = pages.map((page: any, idx: number) => ({
              id: page.id,
              img: page.thumbnailUrl || "/images/lembar_mewarnai_1.webp",
              printUrl: page.pdfUrl || page.thumbnailUrl, // Fallback to thumbnail if pdfUrl is missing
              url: `/mewarnai/${page.slug}`,
              height: heights[idx % heights.length],
              categoryName: page.category?.name
            }));
          
          setMasonryItems(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch coloring pages:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPages();

    // Auto-refresh interval for realtime connection feel
    const interval = setInterval(() => {
      fetchPages();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bersihkan pilihan jika pengguna pindah kategori filter, agar gambar yang tersembunyi tidak tetap terpilih
  React.useEffect(() => {
    setSelectedIds([]);
  }, [activeFilter]);

  // Bersihkan pilihan "zombie" (jika gambar dihapus dari database tapi masih tersimpan di state)
  React.useEffect(() => {
    setSelectedIds(prev => prev.filter(id => masonryItems.some(item => item.id === id)));
  }, [masonryItems]);



  const downloadSelected = async () => {
    const selectedItems = masonryItems.filter(item => selectedIds.includes(item.id) && item.printUrl);
    
    // Download sequentially
    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      try {
        // Increment download count in background
        fetch(`/api/coloring-pages/${item.id}/increment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'download' })
        }).catch(e => console.error(e));

        const a = document.createElement('a');
        a.style.display = 'none';
        
        // Use Supabase ?download query to force download, or fallback to target _blank
        const isSupabase = item.printUrl.includes('supabase');
        a.href = isSupabase ? `${item.printUrl}?download=` : item.printUrl;
        a.download = `EduColoring_${i+1}.jpg`;
        a.target = '_blank'; // Fallback if download attribute is ignored due to cross-origin
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Small delay to prevent browser popup block
        if (i < selectedItems.length - 1) {
          await new Promise(res => setTimeout(res, 500));
        }
      } catch (err) {
        console.error("Gagal mengunduh gambar", err);
      }
    }
  };

  const printSelected = () => {
    const selectedItems = masonryItems.filter(item => selectedIds.includes(item.id) && item.printUrl);
    if (selectedItems.length === 0) return;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Create a temporary print window or iframe
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Mohon izinkan pop-up browser untuk mencetak.");
      return;
    }

    let imagesHtml = '';
    selectedItems.forEach(item => {
      // Increment download count (treat print as download)
      fetch(`/api/coloring-pages/${item.id}/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'download' })
      }).catch(e => console.error(e));

      imagesHtml += `
        <div class="page">
          <img src="${item.printUrl}" />
        </div>
      `;
    });

    const htmlContent = `
      <html>
        <head>
          <title>Print Lembar Mewarnai</title>
          <style>
            body { margin: 0; padding: 0; background: #fff; }
            .page { 
              width: 100vw; 
              height: 100vh; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              page-break-after: always;
            }
            img { 
              max-width: 100%; 
              max-height: 100%; 
              object-fit: contain; 
            }
            @media print {
              @page { margin: 0; size: A4 portrait; }
              body { -webkit-print-color-adjust: exact; }
              .page { page-break-after: always; height: 100vh; }
              .page:last-child { page-break-after: avoid; }
            }
          </style>
        </head>
        <body>
          ${imagesHtml}
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                ${isMobile ? '' : 'window.onafterprint = () => window.close();'}
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <main className="min-h-[100dvh] bg-transparent relative flex flex-col items-center justify-start overflow-x-hidden w-full pb-24">

      {/* Latar Belakang Warna-Warni ala Tailwind CSS (Mesh Gradient) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        
        {/* Wrapper dengan filter blur langsung (sangat ringan untuk GPU HP dibandingkan backdrop-blur) */}
        <div className="absolute inset-0 blur-[120px]">
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
        </div> {/* End of blur-[120px] wrapper */}
        
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
          <AbstractBlob type="circle-spark" color="blue" className="hidden md:block absolute top-[65%] right-[15%] w-20 md:w-32 h-20 md:h-32 opacity-20 -rotate-12" />
          <AbstractBlob type="hexagon" color="green" className="absolute top-[8%] right-[30%] w-12 md:w-16 h-12 md:h-16 opacity-35 rotate-[60deg]" />
          <AbstractBlob type="cross-spark" color="red" className="absolute top-[45%] right-[2%] w-10 md:w-14 h-10 md:h-14 opacity-30 -rotate-[30deg]" />
          <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[45%] w-16 md:w-24 h-16 md:h-24 opacity-25 rotate-[45deg]" />
          <AbstractBlob type="circle-spark" color="green" className="absolute top-[55%] left-[5%] w-24 md:w-36 h-24 md:h-36 opacity-15 rotate-[80deg]" />
          <AbstractBlob type="cross" color="red" className="absolute top-[75%] left-[25%] w-8 md:w-12 h-8 md:h-12 opacity-45 -rotate-[15deg]" />
          <AbstractBlob type="gemini-spark" color="yellow" className="absolute bottom-[15%] right-[45%] w-20 md:w-28 h-20 md:h-28 opacity-20 rotate-12" />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-6 md:pt-12 relative z-10 flex flex-col items-center">
        
        {/* Navigation Back Button */}
        <div className="w-full flex justify-start mb-4">
          <Link href="/kategori">
            <button className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-4 mb-6 sm:mb-8 mt-2 sm:mt-4 w-full px-2 print:hidden">
          
          {/* Left Bracket (Kurung Kurawal Kuning) */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px] md:translate-x-4">
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 40 10 L 33 10 A 13 13 0 0 0 20 23 L 20 35 L 10 45 L 20 55 L 20 67 A 13 13 0 0 0 33 80 L 40 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-1 sm:px-0 w-auto z-10 shrink">
            <h2 className="text-[1.1rem] sm:text-xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-0.5 sm:mb-1">
              Kumpulan
            </h2>
            <h1 className="text-xl sm:text-2xl md:text-5xl font-black text-google-blue tracking-tight text-center mb-2 sm:mb-4 leading-none">
              Lembar Mewarnai
            </h1>
            
                {/* Location Pill Badge */}
                <div className="relative z-10 px-3 sm:px-5 py-0.5 border-[2px] border-[#202124] rounded-full flex items-center justify-center bg-white shadow-sm max-w-full overflow-hidden">
              <span className="text-[#202124] font-bold text-[10px] sm:text-sm truncate">UBP Karawang</span>
            </div>
          </div>

          {/* Right Bracket (Kurung Kurawal Kuning) */}
          <svg viewBox="0 0 45 90" fill="none" className="drop-shadow-sm overflow-visible shrink-0 w-8 h-16 sm:w-[45px] sm:h-[90px] md:-translate-x-4">
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#202124" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M 5 10 L 12 10 A 13 13 0 0 1 25 23 L 25 35 L 35 45 L 25 55 L 25 67 A 13 13 0 0 1 12 80 L 5 80" stroke="#FBBC04" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

        </div>

        <p className="text-gray-600 mt-2 mb-8 sm:mb-10 font-medium text-base sm:text-lg text-center px-4 max-w-2xl text-balance print:hidden">
          Unduh, cetak, dan warnai bersama si kecil!
        </p>

        {/* Edukasi Banner */}
        <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-12 print:hidden">
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl shrink-0 mt-0 sm:mt-0.5">📚</span>
            <div>
              <h4 className="font-black text-gray-900 text-sm sm:text-base mb-1">Untuk Guru & Orang Tua</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Setiap gambar dirancang khusus oleh tim KKN <strong>Universitas Buana Perjuangan Karawang</strong> untuk mengajarkan anak-anak tentang pentingnya memilah dan mengelola sampah sejak dini. Cocok digunakan sebagai media belajar di kelas maupun di rumah.
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full min-h-[400px]">
          {loading ? (
            <div className="w-full h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-google-blue"></div>
            </div>
          ) : masonryItems.length > 0 ? (
            <>
              {/* Category Filter Tabs (Sticky & Separated) */}
              <div className="sticky top-2 sm:top-4 z-40 flex flex-col items-center justify-center mb-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-none">
                <div className="mb-3 pointer-events-auto">
                  <span className="text-xs sm:text-sm font-black text-gray-800 uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] bg-white/50 px-2 py-0.5 rounded backdrop-blur-[2px]">
                    Kategori Filter
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-center items-center gap-2 py-1 px-1 pointer-events-auto w-full sm:w-auto max-w-[400px] sm:max-w-full mx-auto">
                  {['Semua', 'Organik', 'Anorganik', 'B3'].map((filter) => {
                    const isActive = activeFilter === filter;
                    let activeBg = 'bg-gray-900';
                    let activeText = 'text-white';
                    
                    if (filter === 'Semua') activeBg = 'bg-google-blue';
                    if (filter === 'Organik') activeBg = 'bg-google-green';
                    if (filter === 'Anorganik') { activeBg = 'bg-google-yellow'; activeText = 'text-[#202124]'; }
                    if (filter === 'B3') activeBg = 'bg-google-red';

                    return (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 sm:px-5 py-2 w-full sm:w-auto rounded-full font-black text-xs sm:text-sm transition-all border-2 border-[#202124] shrink-0 text-center flex items-center justify-center ${
                          isActive 
                            ? `${activeBg} ${activeText} shadow-[4px_4px_0px_#202124] -translate-y-0.5` 
                            : 'bg-white text-gray-600 shadow-[2px_2px_0px_#202124] hover:text-[#202124] hover:shadow-[4px_4px_0px_#202124] hover:-translate-y-0.5 active:shadow-[1px_1px_0px_#202124] active:translate-y-0.5'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-center mb-6 text-gray-500 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                Klik gambar untuk memilih lembar mewarnai yang ingin diunduh.
              </div>
              <Masonry 
                items={masonryItems.filter(item => activeFilter === 'Semua' || (item.categoryName && item.categoryName.toLowerCase() === activeFilter.toLowerCase()))}
                colorShiftOnHover={true}
                selectable={true}
                selectedIds={selectedIds}
                onItemClick={handleItemClick}
              />
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Belum ada lembar mewarnai. Admin dapat menambahkannya via halaman admin.
            </div>
          )}
        </div>
            {/* Action Bar (Static Position below Grid, Always Visible) */}
        <div className="w-full flex justify-center mt-8 mb-12 print:hidden z-20">
          <div className="bg-white border-2 border-[#202124] shadow-[6px_6px_0px_#202124] rounded-full px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-6 mx-4">
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#202124] flex items-center justify-center text-xs sm:text-sm font-black transition-colors ${selectedIds.length > 0 ? 'bg-google-blue text-white shadow-[2px_2px_0px_#202124]' : 'bg-gray-100 text-gray-400'}`}>
                {selectedIds.length}
              </div>
              <span className="font-black text-gray-900 hidden sm:block text-sm tracking-tight">Gambar Terpilih</span>
            </div>
            
            <div className="h-8 w-1 border-l-2 border-dashed border-gray-300 hidden sm:block shrink-0" />
            
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button 
                onClick={() => setSelectedIds([])}
                disabled={selectedIds.length === 0}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-black transition-all rounded-full ${selectedIds.length > 0 ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
              >
                Batal
              </button>
              
              <button 
                onClick={printSelected}
                disabled={selectedIds.length === 0}
                className={`flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:px-5 sm:py-2.5 rounded-full font-black text-xs sm:text-sm transition-all border-2 ${selectedIds.length > 0 ? 'bg-google-yellow border-[#202124] text-[#202124] shadow-[3px_3px_0px_#202124] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#202124] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_#202124]' : 'bg-gray-100 border-transparent text-gray-400 cursor-not-allowed'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span className="hidden sm:inline ml-2">Print</span>
              </button>

              <button 
                onClick={downloadSelected}
                disabled={selectedIds.length === 0}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-black text-xs sm:text-sm transition-all border-2 whitespace-nowrap ${selectedIds.length > 0 ? 'bg-google-red border-[#202124] text-white shadow-[3px_3px_0px_#202124] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#202124] active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_#202124]' : 'bg-gray-100 border-transparent text-gray-400 cursor-not-allowed'}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Unduh <span className="hidden sm:inline">({selectedIds.length})</span></span>
              </button>
            </div>
          </div>
        </div>

        {/* Ekosistem Animasi */}
        <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-24 mb-10 print:hidden text-center relative z-10 py-4 sm:py-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-2">Jejaring Edukasi Kita</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 font-medium text-sm sm:text-base px-2">Menghubungkan anak-anak, kreativitas, dan lingkungan melalui EduColoring.</p>
          <AnimatedBeamDemo />
        </div>

        {/* Keterangan Halaman Animasi Text Reveal */}
        <div className="w-full print:hidden z-10 mt-8 sm:mt-12 mb-20 sm:mb-24 min-h-[30vh] sm:min-h-[50vh] flex items-center justify-center">
          <TextReveal 
            text="Kumpulan lembar mewarnai ini dirancang khusus untuk melatih motorik dan kreativitas anak-anak Sekolah Dasar (SD). Melalui aktivitas mewarnai yang interaktif dan menyenangkan, mereka dapat mengasah daya imajinasi, meningkatkan konsentrasi, sekaligus belajar mengenal lingkungan agar kelak tumbuh menjadi generasi yang cerdas, kreatif, dan peduli pada alam." 
          />
        </div>
      </div>
    </main>
  );
}
