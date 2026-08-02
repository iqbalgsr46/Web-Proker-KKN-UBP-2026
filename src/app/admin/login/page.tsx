"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal.");
        setLoading(false);
        return;
      }

      // Login berhasil, redirect ke dashboard
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Blobs (Admin version - subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-[10%] -left-[10%] w-96 h-96 bg-google-blue rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-96 h-96 bg-google-yellow rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-google-blue" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-black text-gray-900 tracking-tight">
          Masuk ke <span className="text-google-blue">Admin</span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Kelola lembar mewarnai dan karya anak-anak
        </p>
      </div>

      <div className="mt-8 mx-auto w-full max-w-md relative z-10">
        <div className="bg-white py-8 px-5 shadow-xl shadow-gray-200/50 rounded-2xl sm:rounded-3xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                Alamat Email
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required

                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue sm:text-sm transition-all"
                  placeholder="admin@educoloring.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900">
                Password
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-google-blue focus:border-google-blue sm:text-sm transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#202124] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? "Memproses..." : "Masuk"}
                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
