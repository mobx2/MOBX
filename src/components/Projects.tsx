"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const PROJECTS = [
  {
    id: 1,
    title: "PROJECT ZERO",
    tags: ["WEBGL", "AWWWARDS", "CREATIVE"],
    color: "var(--color-brand-cyan)",
  },
  {
    id: 2,
    title: "NEON VOID",
    tags: ["NEXT.JS", "GSAP", "BRUTALIST"],
    color: "var(--color-brand-magenta)",
  },
  {
    id: 3,
    title: "ACID DREAMS",
    tags: ["THREE.JS", "SHADERS", "EXPERIENCE"],
    color: "var(--color-brand-yellow)",
  }
];

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      
      const innerImage = panel.querySelector('.comic-image');
      const title = panel.querySelector('.project-title');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "center center",
          end: "+=100%",
          pin: true,
          scrub: 1,
        }
      });

      // Violently scale up to fill screen and un-skew
      tl.to(panel, {
        scale: 1.2, // Breaks out
        rotation: 0,
        skewX: 0,
        skewY: 0,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: "power3.inOut"
      }, 0);

      // Reveal color from halftone
      tl.to(innerImage, {
        filter: "grayscale(0%) contrast(100%)",
        scale: 1,
        ease: "power2.inOut"
      }, 0);
      
      // Title offset shadow reacts
      tl.to(title, {
        textShadow: `15px 15px 0px var(--color-brand-black)`,
        scale: 1.1,
        ease: "back.out(2)"
      }, 0);
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-brand-white py-32 flex flex-col items-center gap-64 overflow-hidden border-b-8 border-brand-black halftone-bg-light">
      
      <div className="absolute top-10 right-10 bg-brand-yellow comic-border px-6 py-3 rotate-[5deg] z-20">
        <h2 className="comic-text-sm text-brand-black text-3xl">CASE STUDIES</h2>
      </div>

      {PROJECTS.map((project, i) => {
        // Jagged clip paths for comic panels
        const clipPaths = [
          'polygon(5% 0, 100% 2%, 98% 100%, 0 95%)',
          'polygon(0 5%, 95% 0, 100% 95%, 2% 100%)',
          'polygon(2% 2%, 98% 0, 95% 98%, 0 100%)'
        ];
        
        const rotations = [-3, 4, -2];

        return (
          <div 
            key={project.id}
            ref={el => { panelsRef.current[i] = el }}
            className="relative w-[80vw] h-[80vh] comic-border bg-brand-black will-change-transform z-10 overflow-hidden flex items-center justify-center group"
            style={{ 
              clipPath: clipPaths[i % clipPaths.length],
              transform: `rotate(${rotations[i % rotations.length]}deg) skewX(${rotations[i % rotations.length]}deg)`,
            }}
          >
            {/* Halftone Image background */}
            {/* TODO: Replace the background URL below with your actual project images (e.g. bg-[url('/my-project.png')]) */}
            <div 
              className="comic-image absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-80 mix-blend-luminosity scale-[1.2] will-change-transform"
              style={{ filter: "grayscale(100%) contrast(150%)" }}
            />
            
            {/* Halftone Overlay */}
            <div className="absolute inset-0 halftone-bg opacity-30 mix-blend-overlay pointer-events-none" />

            <div className="relative z-20 flex flex-col items-center pointer-events-none text-center">
              <span className="comic-text-sm text-brand-black bg-brand-white comic-border px-4 py-1 mb-4 rotate-[-2deg]">
                EPISODE 0{project.id}
              </span>
              <h3 
                className="project-title text-[8vw] comic-text text-brand-white transition-all duration-500"
                style={{ color: project.color, textShadow: '5px 5px 0px var(--color-brand-black)' }}
              >
                {project.title}
              </h3>
              
              <div className="flex gap-4 mt-8 flex-wrap justify-center">
                {project.tags.map(tag => (
                  <span key={tag} className="comic-text-sm text-brand-white bg-brand-black border-2 border-brand-white px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
