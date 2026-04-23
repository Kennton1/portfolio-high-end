import React from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-[#915eff] animate-spin" />
      <p className="text-[#aaa6c3] font-medium animate-pulse">Cargando panel de administrador...</p>
    </div>
  );
}
