import React from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#050816] text-white selection:bg-[#915eff] selection:text-white overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-[#0a0f1d]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sm:px-10 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-neutral-400 hover:text-white bg-white/5 rounded-lg border border-white/10">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white hidden sm:block">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Admin Profile Mock */}
             <div className="flex items-center gap-3 bg-white/5 border border-white/10 py-1.5 px-1.5 pr-4 rounded-full shadow-lg cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#915eff] to-[#7d4dd6] flex items-center justify-center font-bold text-sm shadow-inner">
                  IA
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-[13px] font-bold text-white/90 leading-tight">Ignacio Agüero</span>
                  <span className="text-[11px] font-medium text-[#915eff] leading-tight">Administrador</span>
                </div>
             </div>
          </div>
        </header>

        {/* Page Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 bg-[#050816] relative">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#915eff]/5 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}
