import React from "react";
import { PillButton } from "@/components/ui/PillButton";

export const metadata = {
  title: "Game - EduColoring",
  description: "Fitur game edukasi seru akan segera hadir.",
};

export default function GamePage() {
  return (
    <main className="min-h-[100dvh] w-full bg-white flex flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center px-2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-3 sm:mb-4">
          Fitur Game <br className="sm:hidden" />
          <span className="text-google-blue">Segera Hadir!</span>
        </h1>
        <p className="text-base sm:text-xl text-gray-500 font-medium mb-8 sm:mb-10 max-w-md text-balance">
          Kami sedang menyiapkan permainan edukasi yang seru. Nanti kita main sama-sama ya!
        </p>
        <PillButton href="/" variant="blue" className="w-full sm:w-auto">
          Kembali ke Beranda
        </PillButton>
      </div>
    </main>
  );
}
