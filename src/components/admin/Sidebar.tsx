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
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
        <Link href="/admin" className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-google-blue" />
          <span className="font-black text-gray-900 tracking-tight text-base">EduColoring<span className="text-google-blue">Admin</span></span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={clsx(
        "fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Palette className="w-6 h-6 text-google-blue" />
            <span className="font-black text-gray-900 tracking-tight text-xl">EduColoring<span className="text-google-blue">Admin</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <a 
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  isActive 
                    ? "bg-google-blue/10 text-google-blue font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={clsx("w-5 h-5", isActive ? "text-google-blue" : "text-gray-400")} />
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Bottom Area (Logout) */}
        <div className="p-4 border-t border-gray-100">
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-600 hover:bg-red-50"
            onClick={() => {
              document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.href = "/admin/login";
            }}
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
