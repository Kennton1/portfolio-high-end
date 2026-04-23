import React from 'react';
import { Lock, User, Shield } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Ajustes</h1>
        <p className="text-[#aaa6c3] mt-3 text-[15px] max-w-2xl">
          Configura las preferencias de tu cuenta y opciones de seguridad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda (Opciones) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <User className="w-5 h-5 text-[#915eff]" />
              <h2 className="text-xl font-bold text-white">Perfil de Administrador</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#aaa6c3] mb-1.5">Nombre Público</label>
                <input type="text" disabled value="Ignacio Agüero" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white opacity-70 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#aaa6c3] mb-1.5">Email de Recepción de Mensajes</label>
                <input type="email" disabled value="ignacio.ipkz@gmail.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white opacity-70 cursor-not-allowed" />
                <p className="text-xs text-[#915eff] mt-2 font-medium">Estos datos son referenciales. Puedes cambiarlos modificando el código fuente.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <Lock className="w-5 h-5 text-[#38bdf8]" />
              <h2 className="text-xl font-bold text-white">Seguridad</h2>
            </div>
            
            <div className="space-y-4">
               <button disabled className="bg-white/5 text-white font-medium py-2.5 px-6 rounded-xl border border-white/10 opacity-50 cursor-not-allowed">
                 Cambiar Clave Maestra
               </button>
               <p className="text-xs text-neutral-500">La clave maestra actual está protegida y administrada mediante variables de entorno en tu servidor (ADMIN_PASSWORD).</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha (Acciones Rápidas) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-b from-[#915eff]/10 to-[#0a0f1d] p-6 rounded-2xl border border-[#915eff]/20 shadow-lg text-center">
            <Shield className="w-12 h-12 text-[#915eff] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Sesión Activa</h3>
            <p className="text-sm text-[#aaa6c3] mb-6">Tu sesión actual es segura y está verificada criptográficamente mediante JWT.</p>
            
            <LogoutButton />
          </div>
        </div>

      </div>
    </div>
  );
}
