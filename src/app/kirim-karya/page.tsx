"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Camera, User, UserCheck, Image as ImageIcon, Loader2, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { AbstractBlob } from "@/components/ui/AbstractBlob";
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
    <div className="h-[100dvh] w-full relative overflow-hidden bg-[#fafafa] flex flex-col">
      {/* Background with abstract blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-white overflow-hidden">
        <div className="absolute inset-0 blur-[120px]">
          <AbstractBlob type="gemini-spark" color="blue" className="absolute top-[5%] left-[-5%] w-64 md:w-96 h-64 md:h-96 opacity-50 rotate-12 pointer-events-none transform-gpu" />
          <AbstractBlob type="circle-spark" color="yellow" className="absolute top-[30%] right-[2%] w-48 h-48 opacity-60 -rotate-12 pointer-events-none transform-gpu" />
          <AbstractBlob type="gemini-spark" color="red" className="absolute top-[60%] left-[10%] w-56 h-56 opacity-40 rotate-45 pointer-events-none transform-gpu" />
          <AbstractBlob type="gemini-spark" color="green" className="absolute bottom-[5%] right-[15%] w-72 h-72 opacity-40 -rotate-25 pointer-events-none transform-gpu" />
        </div>
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <AbstractBlob type="spark" color="blue" className="absolute top-[15%] left-[8%] w-12 md:w-20 h-12 md:h-20 opacity-30 rotate-12" />
          <AbstractBlob type="spark" color="yellow" className="absolute top-[40%] right-[12%] w-16 h-16 opacity-25 -rotate-15" />
          <AbstractBlob type="cross" color="red" className="absolute bottom-[25%] left-[20%] w-10 h-10 opacity-40 rotate-30" />
          <AbstractBlob type="hexagon" color="green" className="absolute top-[10%] right-[30%] w-14 h-14 opacity-30 rotate-60" />
        </div>
      </div>

      <main className="flex-1 w-full flex flex-col items-center justify-center p-3 sm:p-6 z-10 overflow-y-auto">
        {/* Header */}
        <div className="w-full max-w-4xl flex items-center relative mb-4 sm:mb-6 shrink-0">
          <Link
            href="/galeri"
            className="absolute left-0 w-10 h-10 backdrop-blur-xl bg-white/70 border border-white/60 rounded-xl flex items-center justify-center text-gray-600 hover:bg-white/90 transition-colors shadow-sm z-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-full text-center">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              Kirim <span className="text-google-blue">Karya</span>
            </h1>
            <p className="text-gray-500 text-xs font-medium">
              Upload hasil mewarnai anak-anak
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl flex-1 md:flex-initial flex flex-col min-h-0">
          <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl sm:rounded-[2.5rem] shadow-xl overflow-hidden flex-1 flex flex-col">
            <div className="p-3 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8 flex-1">
              
              {/* Kolom Kiri: Upload Foto */}
              <div className="flex flex-col h-full">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800 mb-1.5 sm:mb-2">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  Foto Karya Mewarnai *
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-2 sm:p-6 flex flex-col items-center justify-center text-center hover:border-google-blue hover:bg-blue-50/30 transition-all cursor-pointer bg-white/50 min-h-[5rem] md:min-h-[16rem] flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="w-full max-w-[80px] md:max-w-[200px] aspect-[3/4] mb-1.5 sm:mb-3 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center mb-1 sm:mb-3">
                      <ImageIcon className="w-5 h-5 md:w-7 md:h-7 text-google-blue" />
                    </div>
                  )}
                  <p className="text-xs sm:text-sm font-bold text-gray-700 mt-1 sm:mt-4">
                    {imageFile ? imageFile.name : "Tap untuk pilih foto"}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1.5">JPG, PNG — Maks 10MB</p>
                </div>
              </div>

              {/* Kolom Kanan: Input & Submit */}
              <div className="flex flex-col justify-between space-y-3 sm:space-y-5">
                <div className="space-y-2.5 sm:space-y-6">
                  {/* Pilih Lembar Mewarnai */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-800 mb-1 sm:mb-2.5">
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      Lembar Mewarnai yang Diwarnai *
                    </label>
                    <div className="relative">
                      <select
                        value={coloringPageId}
                        onChange={(e) => setColoringPageId(e.target.value)}
                        className="w-full px-3 sm:px-5 py-2 sm:py-3.5 bg-gray-50/80 border-2 border-transparent rounded-xl sm:rounded-2xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm appearance-none text-gray-900 pr-10 cursor-pointer"
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
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-800 mb-1 sm:mb-2.5">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      Nama Anak *
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      required
                      className="w-full px-3 sm:px-5 py-2 sm:py-3.5 bg-gray-50/80 border-2 border-transparent rounded-xl sm:rounded-2xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm text-gray-900 placeholder:text-gray-400"
                      placeholder="Contoh: Aisyah"
                    />
                  </div>

                  {/* Nama Pengirim */}
                  <div>
                    <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-gray-800 mb-1 sm:mb-2.5">
                      <UserCheck className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      Nama Guru / Orang Tua *
                    </label>
                    <input
                      type="text"
                      value={submitterName}
                      onChange={(e) => setSubmitterName(e.target.value)}
                      required
                      className="w-full px-3 sm:px-5 py-2 sm:py-3.5 bg-gray-50/80 border-2 border-transparent rounded-xl sm:rounded-2xl hover:bg-gray-100/50 focus:bg-white focus:border-google-blue focus:ring-4 focus:ring-google-blue/10 transition-all outline-none font-medium text-xs sm:text-sm text-gray-900 placeholder:text-gray-400"
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
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-2.5 sm:py-4 bg-google-blue text-white font-bold text-xs sm:text-sm rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
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
          </div>
        </form>

        {/* Info text */}
        <p className="text-[10px] sm:text-xs text-gray-400 font-medium mt-3 sm:mt-6 text-center max-w-sm text-balance shrink-0">
          Karya yang dikirim akan ditinjau terlebih dahulu oleh Admin sebelum ditampilkan di Galeri Karya Anak.
        </p>
      </main>
    </div>
  );
}
