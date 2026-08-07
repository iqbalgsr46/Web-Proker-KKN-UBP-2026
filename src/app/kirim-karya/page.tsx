"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Camera, User, UserCheck, Image as ImageIcon, Loader2, Send, Sparkles, CheckCircle2, X } from "lucide-react";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
import { GlassCard } from "@/components/ui/GlassCard";
import { supabase } from "@/lib/supabase";
import confetti from "canvas-confetti";

export default function KirimKaryaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [coloringPageId, setColoringPageId] = useState("");
  const [coloringPages, setColoringPages] = useState<{ id: string; title: string }[]>([]);

  // Fetch daftar lembar mewarnai
  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/api/coloring-pages");
        if (res.ok) {
          const json = await res.json();
          setColoringPages(json.data || []);
        }
      } catch (err) {
        console.error("Gagal memuat lembar mewarnai:", err);
      }
    }
    fetchPages();
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Upload gambar ke Supabase Storage
  const uploadToSupabase = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `submissions/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("educoloring-files")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("educoloring-files")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!imageFile) {
      setError("Foto karya wajib diunggah.");
      setLoading(false);
      return;
    }

    if (!coloringPageId) {
      setError("Silakan pilih lembar mewarnai yang diwarnai.");
      setLoading(false);
      return;
    }

    try {
      // 1. Upload gambar ke Supabase
      const imageUrl = await uploadToSupabase(imageFile);

      // 2. Kirim data ke API
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submitterName,
          childName,
          coloringPageId,
          imageUrl,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gagal mengirim karya.");
      }

      // 3. Sukses! Confetti!
      setSuccess(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#4285F4", "#EA4335", "#FBBC04", "#34A853"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#4285F4", "#EA4335", "#FBBC04", "#34A853"],
        });
      }, 300);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengirim karya.");
    } finally {
      setLoading(false);
    }
  };

  // Tampilan sukses
  if (success) {
    return (
      <div className="relative w-full min-h-[100dvh] flex flex-col bg-transparent">
        {/* Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
          <div className="absolute inset-0 blur-[120px]">
            <AbstractBlob type="gemini-spark" color="green" className="absolute top-[20%] left-[10%] w-96 h-96 opacity-50 rotate-12 pointer-events-none transform-gpu" />
            <AbstractBlob type="circle-spark" color="blue" className="absolute top-[50%] right-[5%] w-72 h-72 opacity-40 -rotate-12 pointer-events-none transform-gpu" />
            <AbstractBlob type="gemini-spark" color="yellow" className="absolute bottom-[10%] left-[30%] w-80 h-80 opacity-50 rotate-45 pointer-events-none transform-gpu" />
          </div>
        </div>

        <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
          <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-[2.5rem] shadow-xl p-8 md:p-12 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3">
              Karya Terkirim!
            </h2>
            <p className="text-gray-600 font-medium mb-8 text-balance">
              Terima kasih! Karya mewarnai sudah berhasil dikirim dan sedang menunggu persetujuan Admin untuk ditampilkan di galeri.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setSuccess(false);
                  setImageFile(null);
                  setImagePreview(null);
                  setChildName("");
                  setSubmitterName("");
                  setColoringPageId("");
                }}
                className="w-full px-6 py-3.5 bg-google-blue text-white font-bold text-sm rounded-full hover:opacity-90 transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Kirim Karya Lagi
              </button>
              <Link
                href="/galeri"
                className="w-full px-6 py-3.5 bg-white text-gray-700 font-bold text-sm rounded-full border border-gray-200 hover:bg-gray-50 transition-all text-center"
              >
                Lihat Galeri
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full relative overflow-x-hidden flex flex-col bg-[#fafafa]">
      {/* Background Ornaments (Same as Home Page for consistency) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <AbstractBlob type="hexagon" color="green" className="w-32 md:w-44 h-32 md:h-44 absolute top-[5%] left-[5%] md:top-[18%] md:left-[10%] -rotate-12 transform-gpu" />
        <AbstractBlob type="circle-spark" color="red" className="w-20 md:w-28 h-20 md:h-28 absolute top-[10%] right-[8%] md:top-[12%] md:right-[15%] blur-[2px] rotate-45 transform-gpu" />
        <AbstractBlob type="cross-spark" color="blue" className="w-48 md:w-72 h-48 md:h-72 absolute bottom-[5%] -left-[15%] md:bottom-[10%] md:-left-[2%] rotate-12 transform-gpu" />
        <AbstractBlob type="cross" color="yellow" className="w-36 md:w-56 h-36 md:h-56 absolute bottom-[15%] right-[5%] md:bottom-[18%] md:right-[10%] -rotate-[25deg] transform-gpu" />
        <AbstractBlob type="hexagon" color="blue" className="w-40 md:w-64 h-40 md:h-64 absolute top-[50%] left-[48%] -translate-x-1/2 -translate-y-1/2 rotate-[15deg] transform-gpu" />
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-center p-3 sm:p-6 z-10 overflow-y-auto">
        {/* Header */}
        <div className="w-full max-w-3xl flex items-center relative mb-4 sm:mb-6 shrink-0">
          <Link
            href="/galeri"
            className="absolute left-0 w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-google-blue hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-90 z-10 border border-gray-200/60"
          >
            <ArrowLeft className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </Link>
          <div className="w-full text-center">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">
              Kirim <span className="text-google-blue">Karya</span>
            </h1>
            <p className="text-gray-500 text-xs font-medium mt-1">
              Upload hasil mewarnai anak-anak
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex-1 md:flex-initial flex flex-col min-h-0">
          <GlassCard className="!p-4 sm:!p-8 w-full !rounded-3xl sm:!rounded-[2.5rem]">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-8">
              
              {/* Kolom Kiri: Upload Foto */}
              <div className="flex flex-col h-full md:col-span-2">
                <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">
                  Foto Karya Mewarnai <span className="text-red-500">*</span>
                </label>
                <div className="relative flex flex-col items-center justify-center w-full flex-1 min-h-[7rem] md:min-h-[16rem]">
                  {imagePreview ? (
                    <>
                      <div className="w-full max-w-[100px] md:max-w-[200px] aspect-[3/4] mb-2 relative rounded-2xl overflow-hidden border border-gray-200 shadow-md group">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setImageFile(null);
                            setImagePreview(null);
                            const camInput = document.getElementById('photo-upload-camera') as HTMLInputElement;
                            const galInput = document.getElementById('photo-upload-gallery') as HTMLInputElement;
                            if (camInput) camInput.value = '';
                            if (galInput) galInput.value = '';
                          }}
                          className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 bg-black/40 backdrop-blur-md hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 pointer-events-auto"
                          title="Hapus foto"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium text-gray-600 truncate max-w-[150px]">
                        {imageFile ? imageFile.name : ""}
                      </p>
                    </>
                  ) : (
                    <div className="flex w-full gap-3 h-full">
                      {/* Camera Button */}
                      <label className="flex-1 flex flex-col items-center justify-center bg-blue-50/40 border border-blue-100 rounded-2xl cursor-pointer hover:bg-blue-100/50 hover:border-blue-200 transition-all group shadow-sm active:scale-[0.98]">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-google-blue" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-google-blue">Ambil Foto</span>
                        <input
                          id="photo-upload-camera"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      {/* Gallery Button */}
                      <label className="flex-1 flex flex-col items-center justify-center bg-yellow-50/40 border border-yellow-100 rounded-2xl cursor-pointer hover:bg-yellow-100/50 hover:border-yellow-200 transition-all group shadow-sm active:scale-[0.98]">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-google-yellow" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-yellow-600">Pilih Galeri</span>
                        <input
                          id="photo-upload-gallery"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Kolom Kanan: Input & Submit */}
              <div className="flex flex-col justify-between space-y-3 sm:space-y-5 md:col-span-3">
                <div className="space-y-2.5 sm:space-y-6">
                  {/* Pilih Lembar Mewarnai */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                      Lembar Mewarnai yang Diwarnai <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={coloringPageId}
                        onChange={(e) => setColoringPageId(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm appearance-none text-gray-900 pr-10 cursor-pointer shadow-sm"
                      >
                        <option value="">— Pilih lembar mewarnai —</option>
                        {coloringPages.map((page) => (
                          <option key={page.id} value={page.id}>{page.title}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Nama Anak */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                      Nama Anak <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 shadow-sm"
                      placeholder="Contoh: Aisyah"
                    />
                  </div>

                  {/* Nama Pengirim */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                      Nama Guru / Orang Tua <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 shadow-sm"
                      placeholder="Contoh: Bu Guru Ani"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium">
                      {error}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-gradient-to-r from-google-blue to-blue-500 text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mengunggah Karya...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Karya
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </form>

        {/* Info text */}
        <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-3 sm:mt-6 text-center max-w-sm text-balance shrink-0">
          Karya yang dikirim akan ditinjau terlebih dahulu oleh Admin sebelum ditampilkan di Galeri Karya Anak.
        </p>
      </main>
    </div>
  );
}
