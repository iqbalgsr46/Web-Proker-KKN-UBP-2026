"use client";

import { useState, useEffect, useCallback } from "react";
import { Palette, Check, X, Trash2, Eye, Archive } from "lucide-react";

interface Submission {
  id: string;
  childName: string;
  submitterName: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  coloringPage: { title: string };
}

export default function KaryaPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [galleryMax, setGalleryMax] = useState(30);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch submissions
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const json = await res.json();
        setSubmissions(json.data || []);
        setGalleryCount(json.galleryCount || 0);
        setGalleryMax(json.galleryMax || 30);
      }
    } catch (err) {
      console.error("Gagal memuat submissions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh setiap 3 detik
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Handle approve/reject
  const handleAction = async (id: string, status: "APPROVED" | "REJECTED") => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await fetchData(); // Refresh data immediately
      }
    } catch (error) {
      console.error("Failed to update submission:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus karya ini?")) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Failed to delete submission:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Filter logic
  const filteredSubmissions = activeFilter === "ALL"
    ? submissions
    : submissions.filter(s => s.status === activeFilter);

  const counts = {
    ALL: submissions.length,
    PENDING: submissions.filter(s => s.status === "PENDING").length,
    APPROVED: submissions.filter(s => s.status === "APPROVED").length,
    REJECTED: submissions.filter(s => s.status === "REJECTED").length,
    ARCHIVED: submissions.filter(s => s.status === "ARCHIVED").length,
  };

  const FILTERS = [
    { key: "ALL", label: "Semua", bg: "bg-gray-100", text: "text-gray-700", badge: "bg-gray-200 text-gray-600" },
    { key: "PENDING", label: "Menunggu", bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-600" },
    { key: "APPROVED", label: "Disetujui", bg: "bg-green-50", text: "text-green-700", badge: "bg-green-100 text-green-600" },
    { key: "REJECTED", label: "Ditolak", bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-600" },
    { key: "ARCHIVED", label: "Diarsipkan", bg: "bg-gray-50", text: "text-gray-500", badge: "bg-gray-200 text-gray-500" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED": return { label: "Disetujui", cls: "bg-green-500 text-white" };
      case "REJECTED": return { label: "Ditolak", cls: "bg-red-500 text-white" };
      case "ARCHIVED": return { label: "Diarsipkan", cls: "bg-gray-400 text-white" };
      default: return { label: "Menunggu", cls: "bg-yellow-400 text-yellow-900" };
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Karya Masuk
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Tinjau dan kelola karya mewarnai yang dikirimkan anak-anak.
          </p>
        </div>
        {/* Gallery Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
          <Eye className="w-4 h-4 text-google-blue" />
          <span className="text-sm font-bold text-google-blue">
            Galeri: {galleryCount}/{galleryMax}
          </span>
        </div>
      </div>

      {/* Filter Tabs (Interactive) */}
      <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeFilter === f.key
                ? `${f.bg} ${f.text} border border-current/20 shadow-sm`
                : "bg-white border border-transparent text-gray-500 hover:bg-gray-50"
            }`}
          >
            {f.label}
            <span className={`px-2 py-0.5 rounded-md text-xs ${
              activeFilter === f.key ? f.badge : "bg-gray-100 text-gray-400"
            }`}>
              {counts[f.key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-google-blue/30 border-t-google-blue rounded-full animate-spin" />
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Palette className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {activeFilter === "ALL" ? "Belum Ada Karya Masuk" : `Tidak Ada Karya ${FILTERS.find(f => f.key === activeFilter)?.label}`}
          </h3>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Karya mewarnai dari anak-anak akan muncul di sini setelah mereka mengirimkan hasil karya mereka.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {filteredSubmissions.map((sub) => {
            const badge = getStatusBadge(sub.status);
            const isProcessing = actionLoading === sub.id;

            return (
              <div key={sub.id} className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}>
                {/* Image Preview — Click for Lightbox */}
                <div
                  className="aspect-[4/3] bg-gray-100 relative overflow-hidden cursor-pointer"
                  onClick={() => setLightboxImage(sub.imageUrl)}
                >
                  <img
                    src={sub.imageUrl}
                    alt={`Karya ${sub.childName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">{sub.childName}</h3>
                  <p className="text-xs text-gray-500 mb-1">Oleh: {sub.submitterName}</p>
                  <p className="text-xs text-gray-400">
                    {sub.coloringPage.title} &bull; {new Date(sub.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>

                  {/* Action Buttons */}
                  {sub.status === "PENDING" && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleAction(sub.id, "APPROVED")}
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Setujui
                      </button>
                      <button
                        onClick={() => handleAction(sub.id, "REJECTED")}
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                      >
                        <X className="w-3.5 h-3.5" />
                        Tolak
                      </button>
                    </div>
                  )}

                  {/* Delete button for non-pending */}
                  {sub.status !== "PENDING" && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        disabled={isProcessing}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-500 transition-all disabled:opacity-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full">
            <img
              src={lightboxImage}
              alt="Preview Karya"
              className="w-full h-full object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
