"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Images, 
  Paintbrush, 
  LogOut,
  Menu,
  X,
  Palette
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Lembar Mewarnai", href: "/admin/lembar-mewarnai", icon: Paintbrush },
  { name: "Karya Masuk", href: "/admin/karya", icon: Images },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-5 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-google-blue/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-google-blue" />
          </div>
          <span className="font-black text-gray-900 tracking-tight text-lg">EduColoring<span className="text-google-blue">Admin</span></span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-900/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={clsx(
        "fixed md:sticky top-0 left-0 z-40 w-72 h-screen bg-white shadow-[10px_0_40px_-15px_rgba(0,0,0,0.05)] border-r border-gray-100 transition-transform duration-400 ease-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8">
          <Link href="/admin" className="flex items-center gap-3 transition-transform hover:scale-[1.02]" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-google-blue to-blue-600 shadow-lg shadow-google-blue/30 flex items-center justify-center transform -rotate-6">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-gray-900 tracking-tight text-xl">EduColoring<span className="text-google-blue">Admin</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <a 
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-4 px-5 py-3.5 rounded-full transition-all duration-300 font-bold text-sm group",
                  isActive 
                    ? "bg-google-blue text-white shadow-[0_10px_20px_-10px_rgba(66,133,244,0.7)]" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                )}
              >
                <Icon className={clsx(
                  "w-5 h-5 transition-transform duration-300", 
                  isActive ? "text-white scale-110" : "text-gray-400 group-hover:text-google-blue"
                )} />
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Bottom Area (Logout) */}
        <div className="p-5">
          <button 
            className="w-full flex items-center gap-4 px-5 py-3.5 rounded-full transition-all duration-300 font-bold text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 hover:translate-x-1 group"
            onClick={() => {
              document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.href = "/admin/login";
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
              <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-colors" />
            </div>
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
