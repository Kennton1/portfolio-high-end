"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/dashboard/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 bg-[#ff5f56]/10 text-[#ff5f56] hover:bg-[#ff5f56]/20 font-bold py-3 px-4 rounded-xl border border-[#ff5f56]/20 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Cerrar Sesión
    </button>
  );
}
