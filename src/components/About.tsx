"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SKILLS = ["REACT", "NEXT.JS", "GSAP", "WEBGL", "THREE.JS", "TAILWIND", "TYPESCRIPT", "MOTION"];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin and slide the inner contents
    gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      }
    })
    .to(leftPanel.current, { yPercent: 50, ease: "none" }, 0)
    .to(rightPanel.current, { yPercent: -50, ease: "none" }, 0);

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-brand-black border-b-8 border-brand-black">
      
      {/* Background container with diagonal split */}
      <div className="absolute inset-0 flex">
        
        {/* Left Side: Magenta (Diagonal clip-path) */}
        <div 
          className="absolute inset-0 bg-brand-magenta halftone-bg-light z-10"
          style={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}
        >
          {/* Inner scrolling content */}
          <div 
            ref={leftPanel} 
            className="absolute top-[-100%] left-0 w-[50%] flex flex-col items-center justify-center gap-16 py-20 will-change-transform"
          >
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <svg viewBox="0 0 100 100" className="w-12 h-12 fill-brand-yellow drop-shadow-[4px_4px_0px_#050505]">
                  <path d="M50 0 L60 30 L90 20 L70 50 L100 70 L65 75 L60 100 L45 75 L10 80 L35 55 L0 40 L30 35 Z" />
                </svg>
                <h3 className="comic-text text-brand-white text-6xl group-hover:scale-110 transition-transform duration-300">
                  {skill}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Cyan */}
        <div className="absolute inset-0 bg-brand-cyan halftone-bg z-0 flex justify-end">
          {/* Inner scrolling content */}
          <div 
            ref={rightPanel}
            className="absolute top-[100%] right-0 w-[50%] flex flex-col justify-center items-center px-16 gap-10 will-change-transform"
          >
            <div className="bg-brand-white comic-border p-10 rotate-[2deg] shadow-[15px_15px_0px_#FFDE00]">
              <h2 className="comic-text text-brand-magenta text-[6vw] leading-none mb-6">
                I BUILD<br/>REALITIES.
              </h2>
              <p className="font-bold text-2xl uppercase tracking-wider border-l-4 border-brand-black pl-4">
                I am a Front-End Developer with a strong eye for visual arts. 
                My work lies at the intersection of avant-garde design and bleeding-edge technology.
              </p>
            </div>
            
            <div className="bg-brand-yellow comic-border p-8 rotate-[-3deg] shadow-[15px_15px_0px_#050505] self-end">
              <p className="font-bold text-xl uppercase tracking-wider">
                We don't do static. The web is a living, breathing graphic novel.
              </p>
            </div>
          </div>
        </div>

        {/* Diagonal Thick Black Line Divider */}
        <div 
          className="absolute inset-0 bg-brand-black z-20 pointer-events-none w-[10px]"
          style={{ 
            left: '50%',
            height: '150%',
            top: '-25%',
            transform: 'rotate(18deg)', // matches the polygon angle approximately
          }}
        />

      </div>
    </section>
  );
}
