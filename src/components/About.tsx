"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SKILLS = ["REACT", "NEXT.JS", "GSAP", "WEBGL", "THREE.JS", "TAILWIND", "TYPESCRIPT", "MOTION"];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the entire section
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=200%", // 200% of viewport height of scroll distance
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to(leftCol.current, { yPercent: 50, ease: "none" }, 0)
        // Right col moves up normally by moving negative Y
        .to(rightCol.current, { yPercent: -50, ease: "none" }, 0)
    });
  }, { scope: container });

  return (
    <section ref={container} className="w-full h-screen bg-brand-black flex overflow-hidden relative z-20">
      {/* Left Column - Skills (Scrolls DOWN) */}
      <div className="w-1/2 h-full border-r border-brand-white/10 relative overflow-hidden flex justify-center">
        <div 
          ref={leftCol}
          className="absolute top-[-100%] w-full flex flex-col items-center justify-center gap-20 py-20 will-change-transform"
        >
          {SKILLS.map((skill, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              {/* SVG Placeholder */}
              <div className="w-32 h-32 rounded-full border border-brand-white/30 flex items-center justify-center">
                <span className="text-brand-white font-mono text-sm">SVG</span>
              </div>
              <h3 className="text-brand-white text-3xl brutalist-text tracking-widest">{skill}</h3>
            </div>
          ))}
          {/* Duplicate for infinite feel during pin */}
          {SKILLS.map((skill, i) => (
            <div key={`${i}-dup`} className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full border border-brand-white/30 flex items-center justify-center">
                <span className="text-brand-white font-mono text-sm">SVG</span>
              </div>
              <h3 className="text-brand-white text-3xl brutalist-text tracking-widest">{skill}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - About Text (Scrolls UP) */}
      <div className="w-1/2 h-full relative overflow-hidden flex justify-center px-24">
        <div 
          ref={rightCol}
          className="absolute top-[100%] w-full flex flex-col justify-center gap-12 py-20 will-change-transform"
        >
          <h2 className="text-[6vw] leading-[0.8] text-brand-white brutalist-text">
            I BUILD<br />
            <span className="text-brand-accent">DIGITAL</span><br />
            REALITIES.
          </h2>
          <p className="text-brand-white/70 text-2xl font-sans max-w-xl leading-relaxed">
            I am a Front-End Developer with a strong eye for photography, visual arts, and digital content. My work lies at the intersection of avant-garde design and bleeding-edge technology.
          </p>
          <p className="text-brand-white/70 text-2xl font-sans max-w-xl leading-relaxed">
            We don't do static. The web is a living, breathing organism. Hardware-accelerated motion, optical illusions, and god-tier performance are non-negotiable.
          </p>
        </div>
      </div>
    </section>
  );
}
