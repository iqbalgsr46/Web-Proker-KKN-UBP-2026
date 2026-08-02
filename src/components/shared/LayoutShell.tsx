"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { SmoothScrolling } from "@/components/shared/SmoothScrolling";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

export function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  // Halaman admin tidak perlu Navbar, Footer, SmoothScrolling, atau LoadingScreen
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <SmoothScrolling>
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </SmoothScrolling>
    </>
  );
}
