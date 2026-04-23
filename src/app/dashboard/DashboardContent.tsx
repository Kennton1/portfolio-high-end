"use client";

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Inbox, Mail as MailIcon, Eye } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date | string;
};

export default function DashboardContent({ messages, views }: { messages: Message[], views: number }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="space-y-8 pb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Stats Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
         {/* Messages Stat Card */}
         <motion.div variants={itemVariants} className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg flex items-center justify-between group hover:border-white/10 transition-colors">
           <div>
             <p className="text-[#aaa6c3] text-sm font-medium mb-1 tracking-wide uppercase">Mensajes Recibidos</p>
             <h3 className="text-4xl font-black text-white">{messages.length}</h3>
           </div>
           <div className="w-14 h-14 bg-[#915eff]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <MailIcon className="w-7 h-7 text-[#915eff]" />
           </div>
         </motion.div>

         {/* Views Stat Card */}
         <motion.div variants={itemVariants} className="bg-[#0a0f1d] p-6 rounded-2xl border border-white/5 shadow-lg flex items-center justify-between group hover:border-white/10 transition-colors">
           <div>
             <p className="text-[#aaa6c3] text-sm font-medium mb-1 tracking-wide uppercase">Visitas del Portafolio</p>
             <h3 className="text-4xl font-black text-white">{views}</h3>
           </div>
           <div className="w-14 h-14 bg-[#38bdf8]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <Eye className="w-7 h-7 text-[#38bdf8]" />
           </div>
         </motion.div>
      </div>

      {/* Header Area */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-4">
            Bandeja de Mensajes
          </h1>
          <p className="text-[#aaa6c3] mt-3 text-[15px] max-w-2xl">
            Aquí puedes revisar y gestionar todos los mensajes y solicitudes de proyectos recibidos.
          </p>
        </div>
      </motion.div>

      {/* Table Area */}
      <motion.div variants={itemVariants} className="bg-[#0a0f1d] rounded-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-center">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5"
            >
               <Inbox className="w-12 h-12 text-[#915eff]/50" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Bandeja vacía</h3>
            <p className="text-[#aaa6c3] text-[15px] max-w-sm">No tienes mensajes nuevos todavía. ¡Pronto llegarán nuevas oportunidades!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[12px] uppercase tracking-widest text-[#64748b]">
                  <th className="py-5 px-6 font-bold pl-8">Remitente</th>
                  <th className="py-5 px-6 font-bold">Mensaje</th>
                  <th className="py-5 px-6 font-bold">Fecha</th>
                  <th className="py-5 px-6 font-bold text-right pr-8">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {messages.map((msg, idx) => (
                  <motion.tr 
                    key={msg.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* User Info Column */}
                    <td className="py-5 px-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#915eff]/20 to-[#38bdf8]/20 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                          <span className="text-white font-bold text-[15px] uppercase">{msg.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <p className="font-bold text-white text-[15px]">{msg.name}</p>
                          <a href={`mailto:${msg.email}`} className="text-[#aaa6c3] hover:text-[#915eff] text-[13px] transition-colors font-medium mt-0.5">
                            {msg.email}
                          </a>
                        </div>
                      </div>
                    </td>
                    
                    {/* Message Content Column */}
                    <td className="py-5 px-6">
                      <p className="text-[#dfd9ff] text-[15px] max-w-[400px] truncate leading-relaxed" title={msg.message}>
                        {msg.message}
                      </p>
                    </td>
                    
                    {/* Date Column */}
                    <td className="py-5 px-6">
                       <p className="text-[#64748b] font-medium text-[14px]">
                          {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true, locale: es })}
                       </p>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="py-5 px-6 pr-8 text-right">
                       <a 
                         href={`mailto:${msg.email}`}
                         className="inline-flex items-center justify-center p-2.5 text-[#aaa6c3] hover:text-white hover:bg-[#915eff] rounded-xl transition-all duration-300 shadow-sm border border-transparent hover:border-[#915eff]/50" 
                         title="Responder"
                       >
                         <MailIcon className="w-4 h-4" />
                       </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
