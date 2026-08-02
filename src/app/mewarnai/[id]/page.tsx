"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { PillButton } from "@/components/ui/PillButton";

const categoryData: Record<string, {
  title: string;
  subtitle: string;
  color: "green" | "yellow" | "red";
  icon: string;
  heroGradient: string;
  description: string;
  facts: { icon: string; text: string }[];
  sheets: { id: string; title: string; image: string }[];
}> = {
  organik: {
    title: "Sampah Organik",
    subtitle: "Sisa makanan, dedaunan, dan bahan yang mudah terurai",
    color: "green",
    icon: "🌿",
    heroGradient: "from-google-green/20 via-google-green/5 to-transparent",
    description:
      "Sampah organik adalah sampah yang berasal dari sisa-sisa makhluk hidup yang mudah terurai secara alami. Contohnya: sisa makanan, kulit buah, daun kering, dan ranting pohon. Sampah organik bisa diolah menjadi kompos yang berguna untuk menyuburkan tanaman!",
    facts: [
      { icon: "🍌", text: "Kulit pisang terurai dalam 2–5 minggu" },
      { icon: "🍂", text: "Daun kering bisa jadi pupuk kompos" },
      { icon: "🌱", text: "Kompos membuat tanaman tumbuh subur" },
    ],
    sheets: [
      { id: "1", title: "Tempat Sampah Organik", image: "/images/lembar_mewarnai_1.webp" },
      { id: "2", title: "Daur Ulang Organik", image: "/images/lembar_mewarnai_2.webp" },
    ],
  },
  anorganik: {
    title: "Sampah Anorganik",
    subtitle: "Plastik, kardus, botol, kaca, dan material daur ulang",
    color: "yellow",
    icon: "♻️",
    heroGradient: "from-google-yellow/20 via-google-yellow/5 to-transparent",
    description:
      "Sampah anorganik adalah sampah yang sulit terurai secara alami dan membutuhkan waktu sangat lama untuk hancur. Contohnya: botol plastik, kaleng, kardus, dan kaca. Sampah jenis ini bisa didaur ulang menjadi barang baru yang bermanfaat!",
    facts: [
      { icon: "🥤", text: "Botol plastik butuh 450 tahun untuk terurai" },
      { icon: "📦", text: "Kardus bisa didaur ulang hingga 7 kali" },
      { icon: "🧴", text: "1 botol plastik bisa jadi serat kain" },
    ],
    sheets: [
      { id: "3", title: "Pilah Sampah Plastik", image: "/images/lembar_mewarnai_3.webp" },
      { id: "4", title: "Daur Ulang Botol", image: "/images/lembar_mewarnai_4.webp" },
    ],
  },
  b3: {
    title: "Sampah Berbahaya (B3)",
    subtitle: "Baterai, obat-obatan, dan barang elektronik rusak",
    color: "red",
    icon: "⚠️",
    heroGradient: "from-google-red/20 via-google-red/5 to-transparent",
    description:
      "Sampah B3 (Bahan Berbahaya dan Beracun) adalah sampah yang mengandung zat kimia berbahaya dan tidak boleh dibuang sembarangan. Contohnya: baterai bekas, lampu neon, obat kadaluarsa, dan cat. Sampah ini harus dikumpulkan dan diolah secara khusus agar tidak mencemari lingkungan!",
    facts: [
      { icon: "🔋", text: "1 baterai bisa mencemari 600 ribu liter air" },
      { icon: "💊", text: "Obat kadaluarsa harus dikembalikan ke apotek" },
      { icon: "💡", text: "Lampu neon mengandung merkuri beracun" },
    ],
    sheets: [
      { id: "5", title: "Kenali Sampah B3", image: "/images/lembar_mewarnai_5.webp" },
      { id: "6", title: "Cara Buang Sampah B3", image: "/images/lembar_mewarnai_6.webp" },
    ],
  },
};

const colorMap = {
  green: { bg: "bg-google-green", text: "text-google-green", border: "border-google-green/20", light: "bg-google-green/10" },
  yellow: { bg: "bg-google-yellow", text: "text-google-yellow", border: "border-google-yellow/20", light: "bg-google-yellow/10" },
  red: { bg: "bg-google-red", text: "text-google-red", border: "border-google-red/20", light: "bg-google-red/10" },
};

export default function KategoriMewarnaiPage() {
  const params = useParams();
  const id = params.id as string;
  const data = categoryData[id];

  if (!data) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Kategori Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Kategori &quot;{id}&quot; belum tersedia.</p>
          <Link href="/kategori">
            <PillButton variant="blue">Kembali ke Kategori</PillButton>
          </Link>
        </div>
      </main>
    );
  }

  const colors = colorMap[data.color];

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${data.heroGradient}`} />
        <AbstractBlob type="gemini-spark" color={data.color} className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-20 rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="circle-spark" color={data.color} className="absolute top-[40%] right-[-5%] w-48 md:w-72 h-48 md:h-72 opacity-15 -rotate-12 pointer-events-none transform-gpu" />
        <AbstractBlob type="hexagon" color="blue" className="absolute bottom-[10%] left-[20%] w-40 h-40 opacity-15 rotate-45 pointer-events-none transform-gpu" />
        <AbstractBlob type="spark" color="yellow" className="absolute top-[20%] right-[15%] w-24 h-24 opacity-25 rotate-12 pointer-events-none transform-gpu" />
      </div>

      <main className="flex-1 w-full flex flex-col items-center pt-8 pb-32 px-4 sm:px-8 z-10">
        {/* Back Button */}
        <div className="w-full max-w-4xl flex justify-start mb-6">
          <Link href="/kategori">
            <button className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white text-gray-800 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto mb-12 text-center">
          <span className="text-6xl mb-4 block">{data.icon}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">
            {data.title}
          </h1>
          <p className="text-lg text-gray-600 font-medium mb-6 max-w-xl mx-auto">{data.subtitle}</p>
          <div className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full ${colors.light} ${colors.border} border`}>
            <span className={`text-sm font-bold ${colors.text}`}>Karya KKN UBP Karawang</span>
          </div>
        </div>

        {/* Deskripsi Edukatif */}
        <GlassCard className="w-full max-w-3xl mx-auto mb-12 p-6 sm:p-8">
          <h2 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-2">
            <span>📖</span> Apa itu {data.title}?
          </h2>
          <p className="text-gray-700 leading-relaxed text-base mb-6">{data.description}</p>
          
          {/* Fakta Menarik */}
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Tahukah Kamu?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.facts.map((fact, i) => (
              <div key={i} className={`${colors.light} ${colors.border} border rounded-2xl p-4 text-center`}>
                <span className="text-2xl block mb-2">{fact.icon}</span>
                <p className="text-sm text-gray-700 font-medium leading-snug">{fact.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Grid Lembar Mewarnai */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight text-center mb-2">
            Lembar Mewarnai
          </h2>
          <p className="text-gray-500 font-medium text-center mb-8">Klik untuk melihat preview, lalu unduh atau cetak!</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.sheets.map((sheet) => (
              <div key={sheet.id} className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                  <img 
                    src={sheet.image} 
                    alt={sheet.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-black text-gray-900 text-base">{sheet.title}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Lembar Mewarnai Edukatif</p>
                  </div>
                  <div className={`${colors.bg} text-white p-2.5 rounded-xl shadow-md shrink-0`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full max-w-2xl mx-auto text-center">
          <GlassCard className="p-8 flex flex-col items-center">
            <span className="text-4xl mb-3">🖨️</span>
            <h3 className="text-xl font-black text-gray-900 mb-2">Unduh Semua Sekaligus</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-md">
              Dapatkan seluruh koleksi lembar mewarnai dalam satu file PDF — siap cetak dan bagikan ke seluruh kelas!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PillButton
                variant={data.color === "green" ? "green" : data.color === "yellow" ? "yellow" : "red"}
                href="/Lembar_Mewarnai_Pengelolaan_Sampah.pdf"
                download="Lembar_Mewarnai_Pengelolaan_Sampah.pdf"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Unduh PDF
              </PillButton>
              <Link href="/kumpulan-mewarnai">
                <PillButton variant="blue">Lihat Semua Koleksi</PillButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
