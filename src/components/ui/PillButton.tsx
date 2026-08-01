import React from 'react';

export function PillButton({ 
  children, 
  className = "", 
  variant = "blue", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "blue" | "red" | "yellow" | "green" }) {
  const variants = {
    blue: "bg-gradient-to-b from-[#5C97F5] to-[#3273DF] text-white shadow-[0_8px_20px_-6px_rgba(66,133,244,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border-none outline-none",
    red: "bg-gradient-to-b from-[#ED6155] to-[#D53123] text-white shadow-[0_8px_20px_-6px_rgba(234,67,53,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border-none outline-none",
    yellow: "bg-gradient-to-b from-[#FCD142] to-[#E5A800] text-[#202124] shadow-[0_8px_20px_-6px_rgba(251,188,4,0.6),inset_0_2px_4px_rgba(255,255,255,0.7)] border-none outline-none",
    green: "bg-gradient-to-b from-[#52B86D] to-[#259542] text-white shadow-[0_8px_20px_-6px_rgba(52,168,83,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border-none outline-none",
  };
  
  return (
    <button 
      className={`px-10 py-4 rounded-full font-bold text-lg tracking-wide transition-all hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
