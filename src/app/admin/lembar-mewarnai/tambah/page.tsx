"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, Image as ImageIcon, Video, Save, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";

export default function TambahLembarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);

  // State File
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Gagal memuat kategori", err);
      }
    };
    fetchCategories();
  }, []);

  // Helper untuk generate slug
  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Ganti spasi dengan -
      .replace(/[^\w\-]+/g, '')       // Hapus karakter non-word
      .replace(/\-\-+/g, '-')         // Ganti multiple - dengan single -
      .replace(/^-+/, '')             // Trim - dari awal teks
      .replace(/-+$/, '') +           // Trim - dari akhir teks
      '-' + Math.floor(Math.random() * 1000); // Tambah random number agar unik
  };

  const uploadToSupabase = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('educoloring-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('educoloring-files')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!thumbnailFile) {
      setError("Gambar utama lembar mewarnai wajib diunggah.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const objective = formData.get("objective") as string;
    const videoUrl = formData.get("videoUrl") as string;
    let categoryId = formData.get("categoryId") as string;

    try {
      // Jika tidak ada kategori, buat kategori default
      if (!categoryId) {
        if (categories.length > 0) {
          categoryId = categories[0].id;
        } else {
          // Buat kategori default via API jika kosong
          const catRes = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Umum", description: "Kategori umum" }),
          });
          const catData = await catRes.json();
          categoryId = catData.data.id;
        }
      }

      // 1. Upload Thumbnail Asli
      const thumbnailUrl = await uploadToSupabase(thumbnailFile, "thumbnails");

      // 2. Generate A4 Layout (Printable Image)
      let pdfUrl = "";
      const a4Canvas = document.createElement("canvas");
      const ctx = a4Canvas.getContext("2d");
      
      if (ctx) {
        // A4 aspect ratio at 150 DPI
        const width = 1240;
        const height = 1754;
        a4Canvas.width = width;
        a4Canvas.height = height;

        // Background Putih
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // Load Gambar
        const imgUrl = URL.createObjectURL(thumbnailFile);
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = imgUrl;
        });

        // Hitung Posisi Gambar
        const padding = 100;
        const qrGap = 100;
        const qrSize = 250;
        const maxImgWidth = width - (padding * 2);
        const maxImgHeight = height - (padding * 2) - qrSize - qrGap; // Sisa ruang untuk gambar agar tidak mepet QR

        const imgRatio = img.width / img.height;
        const boxRatio = maxImgWidth / maxImgHeight;
        
        let drawWidth, drawHeight;
        if (imgRatio > boxRatio) {
          drawWidth = maxImgWidth;
          drawHeight = drawWidth / imgRatio;
        } else {
          drawHeight = maxImgHeight;
          drawWidth = drawHeight * imgRatio;
        }

        const drawX = (width - drawWidth) / 2;
        const drawY = padding;

        // Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

        // Draw Image
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        // Reset Shadow & Draw Stroke
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 8;
        ctx.strokeStyle = "#202124";
        ctx.strokeRect(drawX, drawY, drawWidth, drawHeight);

        // Draw QR Code
        if (videoUrl) {
          try {
            const slug = generateSlug(title);
            const scanUrl = `${window.location.origin}/scan/${slug}`;
            const qrDataUrl = await QRCode.toDataURL(scanUrl, { width: qrSize, margin: 1 });
            const qrImg = new Image();
            await new Promise((resolve) => {
              qrImg.onload = resolve;
              qrImg.src = qrDataUrl;
            });

            // Sejajarkan QR dengan sisi kiri kotak gambar, dan letakkan di bawahnya
            const qrX = drawX;
            const qrY = drawY + drawHeight + qrGap;
            
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            ctx.fillStyle = "#202124";
            ctx.font = "bold 36px sans-serif";
            ctx.fillText("Scan QR untuk Video", qrX + qrSize + 30, qrY + (qrSize / 2) - 10);
            ctx.fillText("Edukasi Mahasiswa KKN", qrX + qrSize + 30, qrY + (qrSize / 2) + 35);
          } catch (qrErr) {
            console.error("Gagal generate QR Code", qrErr);
          }
        }

        // Convert canvas ke File
        const blob = await new Promise<Blob>((resolve) => a4Canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92));
        const printFile = new File([blob], `print-${thumbnailFile.name}.jpg`, { type: "image/jpeg" });

        // Upload gambar A4 ke storage
        pdfUrl = await uploadToSupabase(printFile, "prints");
      }

      // 3. Simpan ke Database Prisma
      const res = await fetch("/api/admin/coloring-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: generateSlug(title),
          description,
          objective,
          pdfUrl,
          thumbnailUrl,
          videoUrl,
          categoryId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal menyimpan data.");
      }

      // Berhasil
      router.push("/admin/lembar-mewarnai");
      router.refresh();
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat mengunggah file. Pastikan bucket 'educoloring-files' sudah ada dan berstatus Public.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <Link 
          href="/admin/lembar-mewarnai"
          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight">
            Tambah <span className="text-google-blue">Lembar</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium text-xs md:text-sm">
            Unggah lembar mewarnai baru ke dalam sistem.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            
            {/* Info Dasar */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-google-blue" />
                Informasi Dasar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Judul Karya *</label>
                  <input 
                    type="text" 
                    name="title" 
                    required 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue transition-all outline-none"
                    placeholder="Contoh: Mewarnai Tong Sampah Anorganik"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</label>
                  <select 
                    name="categoryId" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue transition-all outline-none"
                  >
                    {categories.length === 0 ? (
                      <option value="">Akan dibuat otomatis...</option>
                    ) : (
                      categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tujuan Edukasi (Opsional)</label>
                  <input 
                    type="text" 
                    name="objective" 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue transition-all outline-none"
                    placeholder="Contoh: Mengajarkan anak memilah sampah"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Singkat (Opsional)</label>
                  <textarea 
                    name="description" 
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue transition-all outline-none resize-none"
                    placeholder="Penjelasan singkat mengenai lembar mewarnai ini..."
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* File Uploads */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-google-blue" />
                Unggah File
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {/* Thumbnail Upload (Required now) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Utama Lembar Mewarnai *</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-google-blue hover:bg-blue-50/50 transition-all cursor-pointer bg-gray-50 min-h-[12rem] h-auto">
                    <input 
                      type="file" 
                      accept="image/*"
                      required
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {thumbnailFile ? (
                      <div className="w-full sm:w-auto sm:max-w-xs h-32 md:h-40 mb-3 relative rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                        <img src={URL.createObjectURL(thumbnailFile)} alt="Preview" className="w-full h-full object-contain bg-white" />
                      </div>
                    ) : (
                      <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                    )}
                    <div className="w-full flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-sm font-bold text-gray-700 truncate w-full px-2 max-w-full">
                        {thumbnailFile ? thumbnailFile.name : "Pilih gambar Lembar Mewarnai (JPG/PNG)"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 max-w-sm text-balance">Sistem akan otomatis mengatur layout A4, garis tepi, dan QR Code untuk cetak.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Media Tambahan */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-google-blue" />
                Media Tambahan
              </h2>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">URL Video Pembelajaran (Opsional)</label>
                <input 
                  type="url" 
                  name="videoUrl" 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue transition-all outline-none"
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-gray-500 mt-2 font-medium">Video ini akan tampil saat QR Code pada lembar mewarnai dipindai (di-scan).</p>
              </div>
            </div>

          </div>
          
          {/* Footer Submit */}
          <div className="bg-gray-50 p-4 md:p-6 border-t border-gray-100 flex justify-end gap-3">
            <Link 
              href="/admin/lembar-mewarnai"
              className="px-6 py-3 text-gray-600 font-bold text-sm rounded-xl hover:bg-gray-200 transition-colors"
            >
              Batal
            </Link>
            <button 
              type="submit" 
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue text-white font-bold text-sm rounded-xl hover:opacity-90 transition-all shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Lembar
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
