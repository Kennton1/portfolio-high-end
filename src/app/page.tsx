"use client";
import React, { useState, useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TechBalls } from "@/components/animations/TechBalls";
import Tilt from "react-parallax-tilt";
import { Code2, Cpu, Database, Layout, Rocket, Send, Sparkles, MapPin, Mail, Monitor, Wrench, FileCode2, TerminalSquare, Award, Layers, ExternalLink, ArrowRight } from "lucide-react";

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
import { useRouter } from "next/navigation";

export default function Home() {
  const [formStatus, setFormStatus] = useState("idle");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("proyectos");
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track page view
  useEffect(() => {
    if (!sessionStorage.getItem('portfolio_visited')) {
      fetch('/api/analytics', { method: 'POST' }).catch(() => {});
      sessionStorage.setItem('portfolio_visited', 'true');
    }
  }, []);

  const triggerConfetti = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setFormStatus("sent");
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#915eff", "#b026ff", "#ffffff"],
        });
      } else {
        setFormStatus("idle");
        alert("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("idle");
      alert("Hubo un error de conexión.");
    }
  };

  const handleLogoClick = () => {
    window.scrollTo(0, 0);
    setSecretClicks(prev => {
      const newClicks = prev + 1;
      if (newClicks >= 5) {
        router.push('/login');
        return 0;
      }
      // Reset clicks after 2 seconds of inactivity
      setTimeout(() => setSecretClicks(0), 2000);
      return newClicks;
    });
  };

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap"],
    backend: ["PHP", "Laravel", "Node.js", "MySQL", "PostgreSQL", "Supabase", "Firebase"],
    tools: ["Git", "GitHub", "Figma", "Linux", "VS Code", "Vercel"]
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-[#915eff] selection:text-white overflow-hidden relative">
      
      {/* Navbar */}
      {/* Navbar Centrada Flotante */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-none">
        <nav className={`mx-auto pointer-events-auto flex items-center justify-between gap-4 md:gap-8 px-4 py-2.5 rounded-full transition-all duration-300 border shadow-2xl ${
          isScrolled 
            ? "bg-[#0a0f1d]/80 backdrop-blur-xl border-white/10" 
            : "bg-[#050816]/50 backdrop-blur-md border-white/5"
        }`}>
          {/* Logo con Easter Egg */}
          <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={handleLogoClick} title="Inicio">
            <div className={`w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-[#915eff] to-[#7d4dd6] text-white font-black text-lg rounded-xl transition-transform shadow-[0_0_15px_rgba(145,94,255,0.4)] ${secretClicks > 0 ? 'scale-110' : 'group-hover:scale-105'}`}>
              I
            </div>
            <p className="text-white text-[16px] font-bold hidden sm:block tracking-wide">
              Ignacio
            </p>
          </div>
          
          {/* Enlaces con Animación Suave */}
          <ul className="list-none hidden md:flex items-center gap-2">
            {['about', 'projects', 'contact'].map((tab) => (
              <li key={tab} className="relative">
                <a 
                  href={`#${tab}`}
                  className={`relative z-10 block px-5 py-2 rounded-full text-[14.5px] font-medium transition-colors duration-300 ${activeSection === tab ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  {tab === 'about' ? 'Acerca de' : tab === 'projects' ? 'Proyectos' : 'Contacto'}
                </a>
                {activeSection === tab && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-[#915eff]/20 border border-[#915eff]/30 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Estado 'Disponible' */}
          <div className="hidden md:flex items-center gap-2.5 bg-transparent border border-white/5 px-4 py-1.5 rounded-full shrink-0 cursor-default hover:bg-white/5 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
            </span>
            <span className="text-white/90 text-[13px] font-medium tracking-wide">Disponible</span>
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden flex shrink-0 relative">
            <div className="w-[36px] h-[36px] flex justify-center items-center cursor-pointer bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="text-white font-bold text-xl">☰</span>
            </div>
            {menuOpen && (
              <div className="absolute top-14 right-0 min-w-[160px] z-50 rounded-2xl bg-[#0a0f1d] border border-white/10 shadow-xl p-4 backdrop-blur-xl">
                <ul className="list-none flex flex-col gap-4">
                  <li className="font-medium cursor-pointer text-[15px] text-white/80 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}><a href="#about" className="block w-full">Acerca de</a></li>
                  <li className="font-medium cursor-pointer text-[15px] text-white/80 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}><a href="#projects" className="block w-full">Proyectos</a></li>
                  <li className="font-medium cursor-pointer text-[15px] text-white/80 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}><a href="#contact" className="block w-full">Contacto</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center w-full px-4 sm:px-8 overflow-hidden bg-[#050816]" id="home">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        <div className="z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-12 mt-10 lg:mt-0">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-start gap-6 w-full lg:max-w-xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-2 rounded-full mt-10 lg:mt-0 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34d399]"></span>
              </span>
              <span className="text-[#aaa6c3] text-[12px] font-bold tracking-widest uppercase">Disponible para proyectos</span>
            </div>

            {/* Title */}
            <div className="flex flex-col mt-2">
              <h1 className="text-white text-[50px] sm:text-[70px] lg:text-[80px] font-black leading-[1.1] tracking-tight">
                Ingeniero
              </h1>
              <h1 className="text-[#915eff] text-[40px] sm:text-[60px] lg:text-[70px] font-black leading-[1.1] tracking-tight drop-shadow-[0_0_15px_rgba(145,94,255,0.4)]">
                Informático
              </h1>
            </div>

            {/* Subtitle */}
            <TextGenerateEffect
              className="text-xl sm:text-2xl font-bold text-[#915eff] mt-2"
              words="Desarrollador Full Stack |"
              filter={false}
            />
            
            {/* Description */}
            <p className="text-[#aaa6c3] text-[15px] sm:text-[17px] leading-relaxed max-w-lg">
              Soy un dedicado <strong className="text-white">Desarrollador Full-Stack</strong> e <strong className="text-white">Ingeniero en Informática</strong> enfocado en construir experiencias web de alto rendimiento y visualmente impactantes. Con una mezcla de experiencia técnica y precisión creativa, transformo ideas complejas en soluciones digitales intuitivas.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
              <a 
                href="#projects"
                className="bg-gradient-to-r from-[#915eff] to-[#7d4dd6] hover:from-[#7d4dd6] hover:to-[#915eff] text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.5)] border border-[#915eff]/20"
              >
                Ver Proyectos <ExternalLink className="w-4 h-4 ml-1" />
              </a>
              <a 
                href="#contact"
                className="bg-transparent hover:bg-white/5 text-white font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/20 hover:border-white/40"
              >
                Hablemos <Mail className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-row items-center gap-4 mt-8 pt-6 border-t border-white/5 w-full">
              {/* Instagram */}
              <div 
                className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[145px] hover:text-white hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-[#bc1888] hover:shadow-[0_10px_20px_rgba(188,24,136,0.3)]"
                onClick={() => window.open('https://www.instagram.com/7kennton/', '_blank')}
                title="Instagram"
              >
                <InstagramIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">Instagram</span>
              </div>
              
              {/* GitHub */}
              <div 
                className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[125px] hover:text-white hover:-translate-y-1 hover:bg-[#333] hover:border-[#444] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                onClick={() => window.open('https://github.com/Kennton1', '_blank')}
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">GitHub</span>
              </div>

              {/* LinkedIn */}
              <div 
                className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[130px] hover:text-white hover:-translate-y-1 hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_10px_20px_rgba(0,119,181,0.4)]"
                onClick={() => window.open('https://www.linkedin.com/in/ignacio-aguero-5097823b9/', '_blank')}
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">LinkedIn</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column - Code Editor */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full lg:max-w-xl xl:max-w-2xl relative mt-10 lg:mt-0"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.02} transitionSpeed={2000}>
                {/* Editor Glow */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#915eff]/20 to-[#38bdf8]/20 blur-2xl opacity-50 z-0"></div>
                
                {/* Editor Window */}
                <div className="relative z-10 bg-[#0a0f1d] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Header */}
              <div className="bg-[#0f1629] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <p className="text-[#64748b] text-[12px] font-mono">portfolio.js</p>
                <div className="w-10"></div> {/* Spacer for centering */}
              </div>
              
              {/* Code Content */}
              <div className="p-6 sm:p-8 overflow-x-auto text-sm sm:text-[15px] font-mono leading-loose">
                <div className="flex">
                  <span className="text-[#38bdf8]">const</span>
                  <span className="text-[#f8fafc] ml-2">Developer</span>
                  <span className="text-[#38bdf8] mx-2">=</span>
                  <span className="text-[#f8fafc]">{'{'}</span>
                </div>
                
                <div className="pl-6">
                  <div className="flex">
                    <span className="text-[#915eff]">name:</span>
                    <span className="text-[#34d399] ml-2">"Ignacio Agüero"</span><span className="text-white">,</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#915eff]">role:</span>
                    <span className="text-[#34d399] ml-2">"Ingeniero Informático"</span><span className="text-white">,</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#915eff]">passion:</span>
                    <span className="text-[#34d399] ml-2">"Premium Web Experiences"</span><span className="text-white">,</span>
                  </div>
                  
                  <div className="flex mt-2">
                    <span className="text-[#915eff]">skills:</span>
                    <span className="text-white ml-2">[</span>
                  </div>
                  <div className="pl-6 flex flex-wrap gap-2 text-[#34d399]">
                    <span>"React",</span>
                    <span>"Next.js",</span>
                    <span>"TypeScript",</span>
                    <span>"Tailwind",</span>
                    <span>"Node.js",</span>
                    <span>"Supabase"</span>
                  </div>
                  <div className="flex">
                    <span className="text-white">],</span>
                  </div>
                  
                  <div className="flex mt-2">
                    <span className="text-[#915eff]">status:</span>
                    <span className="text-[#34d399] ml-2">"Building..."</span>
                  </div>
                </div>
                
                <div className="flex">
                  <span className="text-[#f8fafc]">{'}'}</span>
                </div>
              </div>
            </div>
              </Tilt>
            </motion.div>
          </motion.div>

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

        </div>
      </section>

      {/* 3. PortafolioVitrina (Projects, Certifications, Tech Stack) */}
      <section className="py-24 px-4 sm:px-8 relative z-20" id="projects">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-white font-black md:text-[50px] sm:text-[40px] text-[30px] text-center mt-2">
              Portafolio<span className="text-[#915eff]">Vitrina</span>
            </h2>
            <p className="text-center text-[#aaa6c3] max-w-3xl mx-auto mt-6 text-[14px] sm:text-[16px] leading-relaxed">
              Explora mi recorrido a través de proyectos, certificaciones y experiencia técnica. Cada sección representa un hito en mi camino de aprendizaje continuo.
            </p>
          </motion.div>
          
          {/* Tabs */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center bg-[#0a0f1d]/50 border border-white/5 rounded-full p-1.5 shadow-lg backdrop-blur-sm relative overflow-x-auto overflow-y-hidden max-w-full no-scrollbar flex-nowrap sm:justify-center gap-1">
              <button 
                onClick={() => setActiveTab("proyectos")}
                className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-[13px] font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeTab === 'proyectos' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                <Code2 className="w-4 h-4" /> PROYECTOS
                {activeTab === 'proyectos' && (
                  <motion.div layoutId="active-showcase-tab" className="absolute inset-0 bg-[#1a233a] border-t border-[#915eff]/30 rounded-full -z-10 shadow-[0_4px_15px_rgba(0,0,0,0.5)]" />
                )}
              </button>
              
              <button 
                onClick={() => setActiveTab("certificaciones")}
                className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-[13px] font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeTab === 'certificaciones' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                <Award className="w-4 h-4" /> CERTIFICACIÓN
                {activeTab === 'certificaciones' && (
                  <motion.div layoutId="active-showcase-tab" className="absolute inset-0 bg-[#1a233a] border-t border-[#915eff]/30 rounded-full -z-10 shadow-[0_4px_15px_rgba(0,0,0,0.5)]" />
                )}
              </button>

              <button 
                onClick={() => setActiveTab("tecnologia")}
                className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-[13px] font-bold tracking-wider transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeTab === 'tecnologia' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
              >
                <Layers className="w-4 h-4" /> PILA DE TECNOLOGÍA
                {activeTab === 'tecnologia' && (
                  <motion.div layoutId="active-showcase-tab" className="absolute inset-0 bg-[#1a233a] border-t border-[#915eff]/30 rounded-full -z-10 shadow-[0_4px_15px_rgba(0,0,0,0.5)]" />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-16 min-h-[500px]">
            
            {/* PROYECTOS TAB */}
            {activeTab === "proyectos" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-wrap justify-center gap-7">
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.02}
                  transitionSpeed={450}
                  className="bg-[#0f1629] rounded-3xl sm:w-[480px] w-full border border-[#1e293b] overflow-hidden hover:border-[#38bdf8]/30 transition-colors shadow-2xl"
                >
                  <div className="relative w-full h-[260px] overflow-hidden group">
                    <img 
                      src="/Agrohosting.png" 
                      alt="Agrotrack Futamaq" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    {/* Badge Arriba */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-[#34d399]/30 rounded-full px-3 py-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse"></span>
                      <span className="text-[#34d399] text-[10px] font-bold tracking-wider">DESPLEGADO</span>
                    </div>
                    {/* Badges Abajo */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-3 py-1.5 rounded-lg border border-white/10">Next.js</span>
                      <span className="bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium px-3 py-1.5 rounded-lg border border-white/10">Supabase</span>
                    </div>
                  </div>

                  <div className="p-7">
                    <h3 className="text-white font-bold text-[22px]">Agrotrack Futamaq</h3>
                    <p className="mt-3 text-[#94a3b8] text-[15px] leading-relaxed line-clamp-3">
                      Una plataforma agrícola impulsada por la nube que permite el seguimiento y gestión en tiempo real de maquinaria, mejorando la eficiencia operativa en el campo.
                    </p>
                    
                    <div className="mt-8 pt-5 border-t border-[#1e293b] flex justify-between items-center">
                      <a href="https://github.com/Kennton1/agrotrack-futamaq-web" target="_blank" className="flex items-center gap-2 text-[#38bdf8] text-[14px] font-bold hover:text-[#7dd3fc] transition-colors">
                        <ExternalLink className="w-4 h-4" /> VIVIR
                      </a>
                      <a href="https://github.com/Kennton1/agrotrack-futamaq-web" target="_blank" className="text-neutral-400 hover:text-white text-[14px] font-medium flex items-center gap-1 transition-colors group">
                        Detalles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )}

            {/* CERTIFICACIONES TAB */}
            {activeTab === "certificaciones" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center text-center h-[350px] border border-dashed border-[#1e293b] rounded-3xl bg-[#0f1629]/30">
                <Award className="w-16 h-16 text-[#915eff] mb-4 opacity-70" />
                <h3 className="text-white text-xl font-bold">Mis Certificaciones</h3>
                <p className="text-neutral-400 mt-2 max-w-sm">Aquí se mostrarán las certificaciones técnicas y logros académicos obtenidos a lo largo de mi carrera.</p>
              </motion.div>
            )}

            {/* PILA DE TECNOLOGÍA TAB */}
            {activeTab === "tecnologia" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full">
                <TechBalls />
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section className="py-24 px-4 sm:px-8 relative z-20 overflow-hidden" id="contact">
        
        {/* Title Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#915eff]/30 to-transparent -z-10" />
          <h2 className="text-white font-black text-[40px] sm:text-[50px] inline-block bg-[#050816] px-6">
            Contácta<span className="text-[#915eff] drop-shadow-[0_0_15px_rgba(145,94,255,0.4)]">me</span>
          </h2>
          <p className="text-[#aaa6c3] mt-4 max-w-xl mx-auto text-[15px] px-4">
            ¿Tienes un proyecto en mente o solo quieres saludar? Mi bandeja de entrada siempre está abierta.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          
          {/* Left Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col gap-10"
          >
            <div>
              <h3 className="text-white font-bold text-2xl mb-4">Trabajemos juntos</h3>
              <p className="text-[#aaa6c3] leading-relaxed text-[15px]">
                Siempre estoy buscando proyectos nuevos y emocionantes. Ya sea que necesites un sitio web, una aplicación web o solo quieras colaborar — ¡no dudes en contactarme!
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div 
                className="flex items-center gap-5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.location.href = 'mailto:ignacio.agr2003@gmail.com'}
              >
                <div className="w-14 h-14 bg-[#0f1629] rounded-2xl flex items-center justify-center border border-white/5 shadow-lg">
                  <Mail className="w-6 h-6 text-[#915eff]" />
                </div>
                <div>
                  <p className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase mb-1">Email</p>
                  <p className="text-white font-medium text-[15px]">ignacio.agr2003@gmail.com</p>
                </div>
              </div>
              <div 
                className="flex items-center gap-5 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => window.open('https://www.google.com/maps/place/Entre+Lagos,+Puyehue,+Los+Lagos/@-40.6896528,-72.6087271,15z/data=!3m1!4b1!4m6!3m5!1s0x9617041f1770c785:0xe97abc6f5fee1300!8m2!3d-40.6833386!4d-72.6015395!16s%2Fm%2F02rznbl?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D', '_blank')}
              >
                <div className="w-14 h-14 bg-[#0f1629] rounded-2xl flex items-center justify-center border border-white/5 shadow-lg">
                  <MapPin className="w-6 h-6 text-[#915eff]" />
                </div>
                <div>
                  <p className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase mb-1">Ubicación</p>
                  <p className="text-white font-medium text-[15px]">Entre Lagos, Puyehue, Los Lagos</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase mb-4">Encuéntrame en</p>
              <div className="flex flex-row items-center gap-4 w-full">
                {/* Instagram */}
                <div 
                  className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[145px] hover:text-white hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-[#bc1888] hover:shadow-[0_10px_20px_rgba(188,24,136,0.3)]"
                  onClick={() => window.open('https://www.instagram.com/7kennton/', '_blank')}
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                  <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">Instagram</span>
                </div>
                
                {/* GitHub */}
                <div 
                  className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[125px] hover:text-white hover:-translate-y-1 hover:bg-[#333] hover:border-[#444] hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                  onClick={() => window.open('https://github.com/Kennton1', '_blank')}
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                  <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">GitHub</span>
                </div>

                {/* LinkedIn */}
                <div 
                  className="group relative flex items-center justify-start h-[50px] w-[50px] p-[13px] rounded-[50px] text-[#9d8dbb] bg-[#0f1629] border border-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer hover:w-[130px] hover:text-white hover:-translate-y-1 hover:bg-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_10px_20px_rgba(0,119,181,0.4)]"
                  onClick={() => window.open('https://www.linkedin.com/in/ignacio-aguero-5097823b9/', '_blank')}
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5 z-10 transition-all duration-500 group-hover:rotate-[360deg] shrink-0" />
                  <span className="text-[14px] font-bold whitespace-nowrap ml-[12px] opacity-0 -translate-x-[15px] transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0">LinkedIn</span>
                </div>
              </div>
            </div>

            <div className="mt-auto bg-[#0f1629]/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#34d399]" />
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34d399] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34d399]"></span>
                </span>
                <span className="text-[#34d399] text-[13px] font-bold tracking-wider uppercase">Disponible para trabajar</span>
              </div>
              <p className="text-[#aaa6c3] text-sm leading-relaxed">Abierto a proyectos freelance, oportunidades a tiempo completo o colaboraciones emocionantes.</p>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-[1.2] mt-10 lg:mt-0"
          >
            <form onSubmit={triggerConfetti} className="flex flex-col gap-6">
              <label className="flex flex-col gap-2.5">
                <span className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase pl-1">Tu Nombre</span>
                <input 
                  name="name" 
                  required 
                  type="text" 
                  placeholder="tu nombre" 
                  className="bg-[#0f1629] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-[#915eff]/50 focus:bg-[#1a233a] transition-all text-white placeholder-neutral-600 shadow-inner" 
                />
              </label>
              
              <label className="flex flex-col gap-2.5">
                <span className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase pl-1">Correo Electrónico</span>
                <input 
                  name="email" 
                  required 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="bg-[#0f1629] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-[#915eff]/50 focus:bg-[#1a233a] transition-all text-white placeholder-neutral-600 shadow-inner" 
                />
              </label>
              
              <label className="flex flex-col gap-2.5">
                <span className="text-[#64748b] text-[11px] font-bold tracking-widest uppercase pl-1">Mensaje</span>
                <textarea 
                  name="message" 
                  required 
                  rows={5} 
                  placeholder="Cuéntame sobre tu proyecto..." 
                  className="bg-[#0f1629] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-[#915eff]/50 focus:bg-[#1a233a] transition-all text-white placeholder-neutral-600 resize-none shadow-inner" 
                />
              </label>
              
              <button 
                type="submit" 
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                className="w-full bg-gradient-to-r from-[#915eff] to-[#7d4dd6] hover:from-[#7d4dd6] hover:to-[#915eff] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all mt-4 shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed border border-[#915eff]/20 text-[15px]"
              >
                {formStatus === 'idle' && <><Send className="w-5 h-5"/> Enviar Mensaje</>}
                {formStatus === 'sending' && "Enviando..."}
                {formStatus === 'sent' && "¡Mensaje Enviado con éxito!"}
              </button>
            </form>
          </motion.div>
          
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="py-8 text-center text-[#dfd9ff] text-sm relative z-20">
        <p>© {new Date().getFullYear()} Ignacio Agüero. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
