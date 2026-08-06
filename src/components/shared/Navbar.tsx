"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dock, DockIcon } from "@/registry/magicui/dock";

// Inline SVG Icons
const HomeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const GridIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const ImageIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);
const UsersIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const GamepadIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);

const SendIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
);

const NAV_ITEMS = [
  { href: "/", icon: HomeIcon, label: "Beranda" },
  { href: "/kategori", icon: GridIcon, label: "Kategori" },
  { href: "/game", icon: GamepadIcon, label: "Main Game" },
  { href: "/galeri", icon: ImageIcon, label: "Galeri" },
  { href: "/kirim-karya", icon: SendIcon, label: "Kirim Karya" },
  { href: "/tentang", icon: UsersIcon, label: "Tentang Kami" },
];

export function Navbar() {
  const pathname = usePathname();

  // Hide the floating dock navbar on the homepage
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center w-full pointer-events-none px-4">
      <div className="pointer-events-auto">
        <Dock direction="middle">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <DockIcon 
                key={item.label} 
                className={isActive ? "bg-white/90 border-google-blue/40 shadow-sm" : ""}
              >
                <Link
                  href={item.href}
                  prefetch={true}
                  aria-label={item.label}
                  className="w-full h-full flex items-center justify-center relative group active:scale-90 transition-transform duration-200"
                >
                  <item.icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? "text-google-blue drop-shadow-sm" : "text-gray-700 lg:group-hover:text-google-blue"}`} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md pointer-events-none whitespace-nowrap shadow-md">
                    {item.label}
                  </span>
                </Link>
              </DockIcon>
            );
          })}
          <div className="w-px h-8 bg-gray-300 mx-1" />
          <DockIcon>
            <Link
              href="/kumpulan-mewarnai"
              prefetch={true}
              aria-label="Mulai Mewarnai"
              className="w-full h-full flex items-center justify-center relative group p-1.5 active:scale-90 transition-transform duration-200"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-google-blue via-google-green to-google-yellow flex items-center justify-center text-white shadow-md lg:group-hover:scale-110 transition-transform duration-200">
                <span className="text-[1.2rem] leading-none">🎨</span>
              </div>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md pointer-events-none whitespace-nowrap shadow-md">
                Mulai Mewarnai
              </span>
            </Link>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
