"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, X } from "lucide-react";

export function SubmissionActions({ submissionId }: { submissionId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "APPROVED" | "REJECTED") => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: submissionId, status: action }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to update submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => handleAction("APPROVED")}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
      >
        <Check className="w-3.5 h-3.5" />
        Setujui
      </button>
      <button
        onClick={() => handleAction("REJECTED")}
        disabled={loading}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
      >
        <X className="w-3.5 h-3.5" />
        Tolak
      </button>
    </div>
  );
}
