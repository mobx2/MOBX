"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SKILLS = ["REACT", "NEXT.JS", "GSAP", "WEBGL", "THREE.JS", "TAILWIND", "TYPESCRIPT", "MOTION"];

const PROJECTS = [
  { id: 1, title: "PROJECT ZERO", category: "WEBGL / CREATIVE", color: "#ff3300" },
  { id: 2, title: "NEON VOID", category: "NEXT.JS / GSAP", color: "#0033ff" },
  { id: 3, title: "ACID DREAMS", category: "THREE.JS / SHADERS", color: "#ccff00" },
  { id: 4, title: "BRUTAL WEB", category: "UI / UX", color: "#ffffff" }
];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Pin the Section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=300%", // Extra scroll distance for the drop sequence
        pin: true,
        scrub: 1,
      }
    });

    // Left Column (Skills) scrolls down slightly while pinned
    tl.to(leftCol.current, { yPercent: -30, ease: "none" }, 0);

    // 2. Projects Drop in on the Right
    projectsRef.current.forEach((project, i) => {
      if (!project) return;
      tl.fromTo(project, 
        { 
          y: -window.innerHeight * 1.5, 
          opacity: 0, 
          rotationX: -45,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          ease: "back.out(1.5)",
          duration: 1
        },
        i * 0.4 // Staggered drop timing based on scroll scrub
      );
    });

    // 3. Velocity based SVG Rotation
    let rotation = 0;
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        rotation += velocity * 0.05;
        
        gsap.to(iconsRef.current, {
          rotation: rotation,
          ease: "expo.out",
          duration: 0.5,
          overwrite: "auto"
        });
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="w-full h-screen bg-brand-black flex overflow-hidden relative z-20">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />

      {/* Left Column - Skills */}
      <div className="w-1/2 h-full border-r border-brand-white/10 relative overflow-hidden flex justify-center z-10">
        <div 
          ref={leftCol}
          className="absolute top-0 w-full flex flex-col items-center justify-center gap-24 py-20 will-change-transform"
        >
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <div 
                ref={el => { iconsRef.current[i] = el }}
                className="w-40 h-40 rounded-full border-[2px] border-dashed border-brand-white/40 flex items-center justify-center will-change-transform"
              >
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-brand-white/80">
                  <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                </svg>
              </div>
              <h3 className="text-brand-white text-5xl brutalist-text tracking-widest mix-blend-difference">{skill}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Projects Drop */}
      <div className="w-1/2 h-full relative flex flex-col items-center justify-center px-12 z-10">
        <div className="w-full max-w-2xl flex flex-col gap-8 perspective-[1000px]">
          <h2 className="text-brand-accent text-3xl brutalist-text mb-8 tracking-widest uppercase">
            SELECTED WORKS
          </h2>
          {PROJECTS.map((project, i) => (
            <div 
              key={project.id}
              ref={el => { projectsRef.current[i] = el }}
              className="w-full bg-[#0a0a0a] border border-brand-white/10 p-10 rounded-3xl will-change-transform flex justify-between items-center group cursor-none hover:bg-brand-white transition-colors duration-500"
            >
              <div className="flex flex-col gap-2">
                <span className="text-brand-white/50 text-sm font-mono tracking-widest group-hover:text-brand-black/50 transition-colors duration-500">
                  0{project.id} // {project.category}
                </span>
                <h3 className="text-5xl brutalist-text text-brand-white group-hover:text-brand-black transition-colors duration-500">
                  {project.title}
                </h3>
              </div>
              <div 
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                style={{ borderColor: project.color }}
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500" style={{ fill: project.color }}>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
