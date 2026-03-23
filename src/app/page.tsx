"use client";
import React, { useState } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TechBalls } from "@/components/animations/TechBalls";
import Tilt from "react-parallax-tilt";
import { Code2, Cpu, Database, Layout, Rocket, Send, Sparkles, MapPin, Mail, Monitor, Wrench, FileCode2, TerminalSquare } from "lucide-react";

/* Custom SVG for Github to prevent Lucide import error */
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function Home() {
  const [formStatus, setFormStatus] = useState("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  const triggerConfetti = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#915eff", "#b026ff", "#ffffff"],
      });
    }, 1000);
  };

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
    backend: ["PHP", "Laravel", "Node.js", "MySQL", "PostgreSQL", "Supabase", "Firebase"],
    tools: ["Git", "GitHub", "Figma", "Linux", "VS Code", "Vercel"]
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-[#915eff] selection:text-white overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="w-full flex items-center py-5 fixed top-0 z-50 bg-[#050816]/90 backdrop-blur-sm border-b border-white/5">
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 flex items-center justify-center bg-[#915eff] text-white font-bold rounded-full">I</div>
            <p className="text-white text-[18px] font-bold cursor-pointer flex">
              Ignacio &nbsp;<span className="sm:block hidden"> | Dominio de JavaScript </span>
            </p>
          </div>
          
          <ul className="list-none hidden sm:flex flex-row gap-10">
            <li className="text-neutral-400 hover:text-white text-[18px] font-medium cursor-pointer"><a href="#about">Acerca de</a></li>
            <li className="text-neutral-400 hover:text-white text-[18px] font-medium cursor-pointer"><a href="#projects">Trabajo</a></li>
            <li className="text-neutral-400 hover:text-white text-[18px] font-medium cursor-pointer"><a href="#contact">Contacto</a></li>
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center">
            <div className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="text-white font-bold text-xl">☰</span>
            </div>
            {menuOpen && (
              <div className="p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-[#151030] border border-white/10">
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                  <li className="font-medium cursor-pointer text-[16px] text-white" onClick={() => setMenuOpen(false)}><a href="#about">Acerca de</a></li>
                  <li className="font-medium cursor-pointer text-[16px] text-white" onClick={() => setMenuOpen(false)}><a href="#projects">Trabajo</a></li>
                  <li className="font-medium cursor-pointer text-[16px] text-white" onClick={() => setMenuOpen(false)}><a href="#contact">Contacto</a></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center w-full px-4 overflow-hidden hero-bg" id="home">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="z-10 flex flex-col md:flex-row items-start max-w-7xl mx-auto w-full gap-8 mt-[-100px]">
          {/* Timeline indicator style from the reference */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff]" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div className="space-y-4 max-w-2xl">
            <h1 className="text-white text-5xl md:text-7xl font-black mt-2">
              Hola, soy <span className="text-[#915eff]">Ignacio</span>
            </h1>
            <TextGenerateEffect
              className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#aaa6c3]"
              words="Desarrollador Full Stack & Ingeniero en Informática."
              filter={false}
            />
            
            <p className="text-[#dfd9ff] max-w-lg mt-4 text-sm md:text-lg leading-relaxed">
              Desarrollo de software de alto rendimiento, interfaces impecables y bases de datos robustas.
            </p>
          </div>
        </div>

        {/* Scroll indicator animation */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white/50 flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-white mb-1"
              />
            </div>
          </a>
        </div>
      </section>

      {/* 2. Acerca de (Introducción) */}
      <section className="py-24 px-8 relative z-20" id="about">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="sm:text-[18px] text-[14px] text-neutral-400 uppercase tracking-wider">Introducción.</p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Sobre Mí.</h2>
          </motion.div>

          <motion.p 
            className="text-[#aaa6c3] text-[17px] max-w-3xl leading-[30px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Soy Ignacio Agüero, Ingeniero en Informática enfocado en el desarrollo de software de alto rendimiento. Mi formación me ha permitido especializarme en la creación de soluciones digitales que equilibran una arquitectura robusta con una experiencia de usuario impecable. Me apasiona transformar requerimientos complejos en código limpio, escalable y eficiente, utilizando stacks modernos para resolver problemas reales mediante la ingeniería.
          </motion.p>
          
          {/* JS Mastery Cards */}
          <div className="mt-20 flex flex-wrap gap-10 justify-center">
            {[
              { title: "Desarrollador web", icon: <Layout className="w-16 h-16 text-white mb-4" /> },
              { title: "Desarrollador React", icon: <Code2 className="w-16 h-16 text-white mb-4" /> },
              { title: "Desarrollador Backend", icon: <Database className="w-16 h-16 text-white mb-4" /> },
            ].map((service, index) => (
              <div key={service.title} className="w-[100%] sm:w-[250px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="w-full"
                >
                  <Tilt
                    tiltMaxAngleX={25}
                    tiltMaxAngleY={25}
                    scale={1.05}
                    transitionSpeed={450}
                    className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
                  >
                    <div
                      className="bg-[#151030] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col cursor-pointer"
                    >
                      {service.icon}
                      <h3 className="text-white text-[20px] font-bold text-center">
                        {service.title}
                      </h3>
                    </div>
                  </Tilt>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Technical Skills Overview (3D Balls) */}
          <div className="mt-20">
             <h3 className="text-white font-bold text-[30px] mb-8 text-center pt-8">Mis Habilidades</h3>
             <TechBalls />
          </div>
        </div>
      </section>

      {/* 3. Trabajo (Project Showcase) */}
      <section className="py-24 px-8 relative z-20" id="projects">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="sm:text-[18px] text-[14px] text-neutral-400 uppercase tracking-wider">Mi Trabajo.</p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Proyectos.</h2>
          </motion.div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-7">
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1}
              transitionSpeed={450}
              className="bg-[#151030] p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 hover:border-white/10 transition-colors shadow-2xl"
            >
              <div className="relative w-full h-[230px]">
                {/* Imágen del Proyecto */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group">
                   <img 
                     src="/Agrohosting.png" 
                     alt="Agrotrack Futamaq" 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                </div>

                {/* Botón de Github Abosluto en Esquina */}
                <div className="absolute inset-0 flex justify-end m-3">
                  <div
                    onClick={() => window.open("https://github.com/Kennton1/agrotrack-futamaq-web", "_blank")}
                    className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex justify-center items-center cursor-pointer border border-white/10 hover:bg-black transition-colors"
                  >
                    <GithubIcon className="w-1/2 h-1/2 object-contain text-white" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-white font-bold text-[24px]">Agrotrack Futamaq</h3>
                <p className="mt-2 text-[#aaa6c3] text-[14px] leading-[22px]">
                  Plataforma web de alto rendimiento para el seguimiento y gestión de maquinaria agrícola. Arquitectura robusta, optimizada para UX fluida y sincronización de datos.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[14px]">
                <p className="text-[#38bdf8]">#react</p>
                <p className="text-[#34d399]">#supabase</p>
                <p className="text-[#f472b6]">#tailwind</p>
                <p className="text-[#fbbf24]">#nextjs</p>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-24 px-8 relative z-20 overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 bg-[#100d25] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          
          <div className="flex-1 flex flex-col justify-between">
            <p className="sm:text-[18px] text-[14px] text-neutral-400 uppercase tracking-wider">Ponte en contacto.</p>
            <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contacto.</h2>
            
            <div className="mt-8 space-y-6 text-[#aaa6c3]">
              <div 
                className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Entre+Lagos,+Puyehue,+Los+Lagos', '_blank')}
              >
                <div className="bg-[#151030] p-3 rounded-full"><MapPin className="text-[#915eff] w-6 h-6" /></div>
                <div>
                  <h4 className="text-white font-semibold">Ubicación</h4>
                  <p>Entre Lagos, Puyehue, Los Lagos</p>
                </div>
              </div>
              <div 
                className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.location.href = 'mailto:ignacio.agr2003@gmail.com'}
              >
                <div className="bg-[#151030] p-3 rounded-full"><Mail className="text-[#915eff] w-6 h-6" /></div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p>ignacio.agr2003@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Redes Sociales - Solo Logos */}
            <div className="mt-12 pt-8 flex justify-center items-center gap-6 w-full">
              <div 
                className="bg-[#151030] p-4 rounded-full cursor-pointer hover:bg-[#915eff] hover:-translate-y-1 transition-all border border-white/10 shadow-lg justify-center items-center" 
                onClick={() => window.open('https://www.instagram.com/7kennton/', '_blank')}
                title="Instagram"
              >
                <InstagramIcon className="text-white w-6 h-6" />
              </div>
              <div 
                className="bg-[#151030] p-4 rounded-full cursor-pointer hover:bg-[#915eff] hover:-translate-y-1 transition-all border border-white/10 shadow-lg justify-center items-center" 
                onClick={() => window.open('https://github.com/Kennton1', '_blank')}
                title="GitHub"
              >
                <GithubIcon className="text-white w-6 h-6" />
              </div>
              <div 
                className="bg-[#151030] p-4 rounded-full cursor-pointer hover:bg-[#915eff] hover:-translate-y-1 transition-all border border-white/10 shadow-lg justify-center items-center" 
                onClick={() => window.open('https://www.linkedin.com/in/ignacio-aguero-5097823b9/', '_blank')}
                title="LinkedIn"
              >
                <LinkedinIcon className="text-white w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#151030] p-8 rounded-2xl mt-8 md:mt-0">
            <form 
              onSubmit={triggerConfetti}
              className="flex flex-col gap-6"
            >
               <label className="flex flex-col gap-2">
                 <span className="text-white font-medium">Nombre</span>
                 <input 
                  required 
                  type="text" 
                  placeholder="Tu nombre completo" 
                  className="bg-[#100d25] border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#915eff] transition-all text-white placeholder-neutral-500" 
                />
               </label>
               <label className="flex flex-col gap-2">
                 <span className="text-white font-medium">Email</span>
                 <input 
                  required 
                  type="email" 
                  placeholder="tu.correo@ejemplo.com" 
                  className="bg-[#100d25] border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#915eff] transition-all text-white placeholder-neutral-500" 
                />
               </label>
               <label className="flex flex-col gap-2">
                 <span className="text-white font-medium">Mensaje</span>
                 <textarea 
                  required 
                  rows={5} 
                  placeholder="¿Qué tienes en mente?" 
                  className="bg-[#100d25] border-none rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#915eff] transition-all text-white placeholder-neutral-500 resize-none" 
                />
               </label>
              
              <button 
                type="submit" 
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                className="bg-[#100d25] hover:bg-[#915eff] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 mt-4 border border-[#915eff]/30"
              >
                {formStatus === 'idle' && <><Send className="w-5 h-5"/> Enviar Mensaje</>}
                {formStatus === 'sending' && "Enviando..."}
                {formStatus === 'sent' && "¡Mensaje Enviado!"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="py-8 text-center text-[#dfd9ff] text-sm relative z-20">
        <p>© {new Date().getFullYear()} Ignacio Agüero. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
