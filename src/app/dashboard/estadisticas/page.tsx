import React from 'react';
import { prisma } from '@/lib/prisma';
import { Eye, TrendingUp, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function StatsPage() {
  let views = 0;
  try {
    const analytics = await prisma.analytics.findUnique({
      where: { id: "global" }
    });
    views = analytics?.views || 0;
  } catch (error) {
    // Ignorar si la tabla no existe
  }

  const messagesCount = await prisma.message.count();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Estadísticas</h1>
        <p className="text-[#aaa6c3] mt-3 text-[15px] max-w-2xl">
          Analiza el rendimiento y el tráfico de tu portafolio en tiempo real.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-[#915eff]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Eye className="w-20 h-20" />
          </div>
          <p className="text-[#aaa6c3] text-sm font-medium mb-2 uppercase tracking-wide">Vistas Totales</p>
          <h3 className="text-4xl font-black text-white">{views}</h3>
          <p className="text-[#34d399] text-sm font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +100% histórico
          </p>
        </div>

        <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-[#38bdf8]/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Users className="w-20 h-20" />
          </div>
          <p className="text-[#aaa6c3] text-sm font-medium mb-2 uppercase tracking-wide">Interacciones</p>
          <h3 className="text-4xl font-black text-white">{messagesCount}</h3>
          <p className="text-[#38bdf8] text-sm font-medium mt-2">Mensajes recibidos</p>
        </div>

        <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg opacity-50 cursor-not-allowed">
          <p className="text-[#aaa6c3] text-sm font-medium mb-2 uppercase tracking-wide">Tiempo en sitio</p>
          <h3 className="text-2xl font-black text-white">Próximamente</h3>
          <p className="text-neutral-500 text-sm font-medium mt-2">Métrica en desarrollo</p>
        </div>

        <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg opacity-50 cursor-not-allowed">
          <p className="text-[#aaa6c3] text-sm font-medium mb-2 uppercase tracking-wide">Tasa de rebote</p>
          <h3 className="text-2xl font-black text-white">Próximamente</h3>
          <p className="text-neutral-500 text-sm font-medium mt-2">Métrica en desarrollo</p>
        </div>
      </div>
    </div>
  );
}
