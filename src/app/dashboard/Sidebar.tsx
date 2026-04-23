"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, LayoutDashboard, Settings, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Mensajes', href: '/dashboard', icon: Mail },
    { name: 'Estadísticas', href: '/dashboard/estadisticas', icon: LayoutDashboard },
    { name: 'Ajustes', href: '/dashboard/ajustes', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-white/5 flex-col justify-between hidden md:flex shrink-0">
      <div>
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#915eff] to-[#7d4dd6] flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(145,94,255,0.4)]">
            <span className="font-black text-sm text-white">IA</span>
          </div>
          <p className="text-white text-lg font-black tracking-wide">
            Panel
          </p>
        </div>
        
        <div className="p-5 space-y-2 relative">
          <p className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase mb-4 px-2">Principal</p>
          
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-[#915eff]/10 border border-[#915eff]/20 rounded-xl shadow-inner z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'text-[#915eff]' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}>
                  <Icon className="w-5 h-5" />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-5 space-y-2 border-t border-white/5 bg-gradient-to-t from-[#050816] to-transparent">
         <Link href="/" className="group flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <ArrowLeft className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            Volver al Portafolio
          </Link>
      </div>
    </aside>
  );
}
