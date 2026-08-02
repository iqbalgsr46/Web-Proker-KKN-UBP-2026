"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { GlassCard } from "../ui/GlassCard";

type TrashType = 'organik' | 'anorganik' | 'b3';

interface TrashItem {
  id: string;
  name: string;
  emoji: string;
  type: TrashType;
  hint: string;
}

const ALL_TRASH_ITEMS: TrashItem[] = [
  { id: '1', name: 'Kulit Pisang', emoji: '🍌', type: 'organik', hint: 'Sisa buah yang manis. Bisa jadi pupuk kompos lho!' },
  { id: '2', name: 'Botol Plastik', emoji: '🍾', type: 'anorganik', hint: 'Bekas minuman kita. Susah hancur di tanah!' },
  { id: '3', name: 'Baterai Bekas', emoji: '🔋', type: 'b3', hint: 'Mengandung zat kimia berbahaya. Jangan sembarangan buang!' },
  { id: '4', name: 'Tulang Ikan', emoji: '🐟', type: 'organik', hint: 'Sisa lauk makan siang. Bakal hancur dan membusuk alami.' },
  { id: '5', name: 'Kardus Bekas', emoji: '📦', type: 'anorganik', hint: 'Bisa didaur ulang jadi kertas atau kardus baru!' },
  { id: '6', name: 'Lampu Bohlam', emoji: '💡', type: 'b3', hint: 'Bisa pecah dan beracun. Harus berhati-hati!' },
  { id: '7', name: 'Daun Kering', emoji: '🍂', type: 'organik', hint: 'Jatuh dari pohon, bagus untuk menyuburkan tanah.' },
  { id: '8', name: 'Kaleng Minuman', emoji: '🥫', type: 'anorganik', hint: 'Terbuat dari aluminium, bisa dilebur dan dipakai lagi.' },
  { id: '9', name: 'Semprotan Nyamuk', emoji: '💨', type: 'b3', hint: 'Awas! Beracun untuk serangga dan berbahaya buat manusia.' },
  { id: '10', name: 'Kantong Kresek', emoji: '🛍️', type: 'anorganik', hint: 'Butuh ratusan tahun supaya bisa hancur di alam.' },
];

export function GuessGame() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  // Shake animation state for wrong answers
  const [wrongType, setWrongType] = useState<TrashType | null>(null);

  // Initialize and shuffle game
  const startGame = () => {
    const shuffled = [...ALL_TRASH_ITEMS].sort(() => Math.random() - 0.5).slice(0, 10);
    setItems(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setWrongType(null);
  };

  useEffect(() => {
    startGame();
  }, []);

  const currentItem = items[currentIndex];

  const handleAnswer = (selectedType: TrashType) => {
    if (!currentItem) return;

    if (selectedType === currentItem.type) {
      // Benar
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'],
        zIndex: 100
      });
      
      setScore(prev => prev + 10);
      setWrongType(null);

      // Pindah ke soal berikutnya setelah delay sebentar
      setTimeout(() => {
        if (currentIndex < items.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setGameOver(true);
        }
      }, 1000);
      
    } else {
      // Salah
      setWrongType(selectedType);
      setTimeout(() => setWrongType(null), 500); // clear animation class
    }
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-4 animate-in fade-in zoom-in duration-700">
        <GlassCard className="max-w-2xl w-full text-center p-12">
          <div className="text-[120px] mb-4">🏆</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Kuis Selesai!</h2>
          <p className="text-xl md:text-2xl font-bold text-gray-600 mb-8">
            Skor Akhir Kamu: <span className="text-google-blue text-3xl md:text-4xl">{score}</span> / 100
          </p>
          <div className="bg-green-50 rounded-2xl p-6 mb-8 border border-green-100">
            <h3 className="text-2xl font-bold text-google-green mb-2">Hebat Sekali!</h3>
            <p className="text-gray-600 font-medium text-lg">Kamu resmi menjadi <b>Pahlawan Lingkungan!</b> Jangan lupa terapkan cara memilah sampah ini di rumah dan sekolah ya!</p>
          </div>
          <button 
            onClick={startGame}
            className="bg-google-blue hover:bg-blue-600 text-white font-bold text-xl px-10 py-5 rounded-full transition-transform active:scale-95 shadow-xl w-full sm:w-auto"
          >
            Main Lagi
          </button>
        </GlassCard>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto z-10 px-4 md:px-8 pt-4 pb-12 animate-in fade-in duration-500">
      
      {/* Header Panel */}
      <div className="w-full flex justify-between items-center mb-8 md:mb-12 bg-white/80 backdrop-blur-md rounded-full px-6 py-4 md:px-10 md:py-6 shadow-sm border border-gray-100">
        <div className="font-bold text-gray-500 text-xl md:text-2xl">
          Tebakan: <span className="text-gray-900">{currentIndex + 1}</span> / {items.length}
        </div>
        <div className="font-bold text-gray-500 text-xl md:text-2xl">
          Skor: <span className="text-google-blue text-3xl md:text-4xl">{score}</span>
        </div>
      </div>

      {/* Main Question Area (Besar untuk Layar Sentuh) */}
      <GlassCard className="w-full text-center flex flex-col items-center justify-center p-8 md:p-16 mb-12 shadow-2xl transition-all duration-300">
        <div className="text-[150px] md:text-[220px] leading-none mb-6 filter drop-shadow-2xl select-none transform-gpu hover:scale-110 transition-transform duration-500">
          {currentItem.emoji}
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 capitalize">
          {currentItem.name}
        </h2>
        <p className="text-xl md:text-3xl text-gray-600 font-medium max-w-3xl text-balance bg-gray-50 px-8 py-6 rounded-3xl border border-gray-100">
          {currentItem.hint}
        </p>
      </GlassCard>

      {/* Bins / Buttons - Massive Size */}
      <h3 className="text-2xl md:text-4xl font-black text-gray-800 mb-8 md:mb-12 text-center tracking-tight">
        Termasuk jenis sampah apakah ini?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full">
        
        {/* Organik */}
        <button
          onClick={() => handleAnswer('organik')}
          className={`flex flex-col items-center justify-center bg-google-green text-white rounded-[3rem] p-8 md:p-12 transition-all duration-200 shadow-2xl shadow-green-900/20 active:scale-95 group 
            ${wrongType === 'organik' ? 'animate-[shake_0.5s_ease-in-out] bg-red-500' : 'hover:-translate-y-2 hover:shadow-green-900/40'}`}
        >
          <div className="bg-white/20 rounded-full p-6 mb-6 group-hover:scale-110 transition-transform">
            <span className="text-6xl md:text-8xl leading-none block">🟢</span>
          </div>
          <span className="text-4xl md:text-5xl font-black tracking-wider uppercase mb-2">Organik</span>
          <span className="text-white/90 font-bold text-xl md:text-2xl text-balance">(Bisa Membusuk)</span>
        </button>

        {/* Anorganik */}
        <button
          onClick={() => handleAnswer('anorganik')}
          className={`flex flex-col items-center justify-center bg-google-yellow text-white rounded-[3rem] p-8 md:p-12 transition-all duration-200 shadow-2xl shadow-yellow-900/20 active:scale-95 group
            ${wrongType === 'anorganik' ? 'animate-[shake_0.5s_ease-in-out] bg-red-500' : 'hover:-translate-y-2 hover:shadow-yellow-900/40'}`}
        >
          <div className="bg-white/20 rounded-full p-6 mb-6 group-hover:scale-110 transition-transform">
            <span className="text-6xl md:text-8xl leading-none block">🟡</span>
          </div>
          <span className="text-4xl md:text-5xl font-black tracking-wider uppercase mb-2 text-balance">Anorganik</span>
          <span className="text-white/90 font-bold text-xl md:text-2xl text-balance">(Daur Ulang)</span>
        </button>

        {/* B3 */}
        <button
          onClick={() => handleAnswer('b3')}
          className={`flex flex-col items-center justify-center bg-google-red text-white rounded-[3rem] p-8 md:p-12 transition-all duration-200 shadow-2xl shadow-red-900/20 active:scale-95 group
            ${wrongType === 'b3' ? 'animate-[shake_0.5s_ease-in-out] bg-red-700' : 'hover:-translate-y-2 hover:shadow-red-900/40'}`}
        >
          <div className="bg-white/20 rounded-full p-6 mb-6 group-hover:scale-110 transition-transform">
            <span className="text-6xl md:text-8xl leading-none block">🔴</span>
          </div>
          <span className="text-4xl md:text-5xl font-black tracking-wider uppercase mb-2">B3</span>
          <span className="text-white/90 font-bold text-xl md:text-2xl text-balance">(Berbahaya / Beracun)</span>
        </button>

      </div>
      
    </div>
  );
}
