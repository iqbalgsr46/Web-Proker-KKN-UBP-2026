"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id, type }: { id: string; type: "coloring-page" | "submission" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setLoading(true);
    try {
      const endpoint = type === "coloring-page" 
        ? "/api/admin/coloring-pages" 
        : "/api/admin/submissions";

      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-all text-xs font-bold disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" />
      {loading ? "..." : "Hapus"}
    </button>
  );
}
