"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Html
} from "@react-three/drei";

const Ball = ({ iconUrl }: { iconUrl: string }) => {
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 0, 1]} intensity={2} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#f8f8f8"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Usamos HTML para alta compatibilidad y evitar errores de CORS/WebGL de texturas */}
        <Html position={[0, 0, 1.05]} transform center distanceFactor={1.7}>
           <img src={iconUrl} alt="Tech Icon" className="w-[90px] h-[90px] object-contain pointer-events-none drop-shadow-xl" />
        </Html>
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }: { icon: string }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, powerPreference: "low-power" }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <Ball iconUrl={icon} />
      </Suspense>
    </Canvas>
  );
};

// SVG Icons from DevIcons CDN
const technologies = [
  { name: "HTML 5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS 3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
];

export const TechBalls = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-10">
            {technologies.map((tech) => (
                <div className="w-28 h-28" key={tech.name} title={tech.name}>
                    <BallCanvas icon={tech.icon} />
                </div>
            ))}
        </div>
    )
}
