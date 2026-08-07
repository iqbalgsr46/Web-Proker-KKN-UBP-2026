"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Halaman login tampil polos tanpa sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <Sidebar />
      {/* pt-14 di mobile untuk memberi ruang pada header bar fixed */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden pt-14 md:pt-0">
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
