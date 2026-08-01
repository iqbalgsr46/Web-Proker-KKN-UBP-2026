"use client";

import { useState, useEffect } from "react";

export function TypewriterText({ words = [] }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Safeguard: Mencegah error jika array kosong atau index melebihi batas karena Hot Reload
  const safeIndex = (index >= 0 && index < words.length) ? index : 0;
  const currentWord = words[safeIndex] || "";

  // Efek kursor berkedip
  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  // Efek mengetik dan menghapus
  useEffect(() => {
    if (!currentWord) return;

    if (subIndex >= currentWord.length && !reverse) {
      // Jeda setelah selesai mengetik satu kata penuh
      const timeout = setTimeout(() => setReverse(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (subIndex <= 0 && reverse) {
      // Setelah terhapus semua, lanjut ke kata berikutnya
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReverse(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // Kecepatan mengetik
    const timeout = setTimeout(() => {
      setSubIndex((prev) => {
        const next = prev + (reverse ? -1 : 1);
        return Math.max(0, Math.min(next, currentWord.length));
      });
    }, reverse ? 40 : 100 + Math.random() * 50);

    return () => clearTimeout(timeout);
  }, [subIndex, safeIndex, reverse, words, currentWord]);

  return (
    <span className="inline-flex items-center whitespace-nowrap">
      {currentWord.substring(0, subIndex)}
      <span 
        className={`inline-block w-[4px] h-[0.9em] ml-1 bg-current transition-opacity duration-100 ${blink ? "opacity-100" : "opacity-0"}`}
      ></span>
    </span>
  );
}
