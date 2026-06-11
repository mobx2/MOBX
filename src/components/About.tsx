"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SKILLS = ["REACT", "NEXT.JS", "GSAP", "WEBGL", "THREE.JS", "TAILWIND", "TYPESCRIPT", "MOTION"];

export default function About() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Split Screen Scroll
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=250%", // Increased scroll duration for more time to read
      pin: true,
      scrub: 1,
      animation: gsap.timeline()
        .to(leftCol.current, { yPercent: 50, ease: "none" }, 0)
        .to(rightCol.current, { yPercent: -50, ease: "none" }, 0)
    });

    // 2. Velocity based SVG Rotation
    let rotation = 0;
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Add to rotation based on velocity
        rotation += velocity * 0.05;
        
        gsap.to(iconsRef.current, {
          rotation: rotation,
          ease: "expo.out",
          duration: 0.5,
          overwrite: "auto"
        });
      }
    });

    // 3. Text Reveal Effect
    const texts = rightCol.current?.querySelectorAll('p, h2');
    if (texts) {
      texts.forEach((text) => {
        gsap.fromTo(text, 
          { opacity: 0, y: 100, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              containerAnimation: undefined, // It's pinned, but we can just use normal scroll trigger 
              // Wait, since it's pinned, the trigger positions might be tricky.
              // Actually, since it moves via transform, we can just use the pin timeline or just let it be.
            }
          }
        );
      });
    }

  }, { scope: container });

  return (
    <section ref={container} className="w-full h-screen bg-brand-black flex overflow-hidden relative z-20">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />

      {/* Left Column - Skills (Scrolls DOWN) */}
      <div className="w-1/2 h-full border-r border-brand-white/10 relative overflow-hidden flex justify-center z-10">
        <div 
          ref={leftCol}
          className="absolute top-[-150%] w-full flex flex-col items-center justify-center gap-24 py-20 will-change-transform"
        >
          {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <div 
                ref={el => { iconsRef.current[i] = el }}
                className="w-40 h-40 rounded-full border-[2px] border-dashed border-brand-white/40 flex items-center justify-center will-change-transform"
              >
                {/* SVG Star placeholder */}
                <svg viewBox="0 0 100 100" className="w-16 h-16 fill-brand-white/80">
                  <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
                </svg>
              </div>
              <h3 className="text-brand-white text-5xl brutalist-text tracking-widest mix-blend-difference">{skill}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - About Text (Scrolls UP) */}
      <div className="w-1/2 h-full relative overflow-hidden flex justify-center px-32 z-10">
        <div 
          ref={rightCol}
          className="absolute top-[100%] w-full flex flex-col justify-center gap-16 py-20 will-change-transform"
        >
          <h2 className="text-[7vw] leading-[0.8] text-brand-white brutalist-text uppercase drop-shadow-2xl">
            I BUILD<br />
            <span className="text-brand-accent italic pr-4">DIGITAL</span><br />
            REALITIES.
          </h2>
          <div className="w-24 h-2 bg-brand-accent" />
          <p className="text-brand-white/80 text-3xl font-sans max-w-2xl leading-snug">
            I am a Front-End Developer with a strong eye for photography, visual arts, and digital content. My work lies at the intersection of avant-garde design and bleeding-edge technology.
          </p>
          <p className="text-brand-white/80 text-3xl font-sans max-w-2xl leading-snug">
            We don't do static. The web is a living, breathing organism. Hardware-accelerated motion, optical illusions, and god-tier performance are non-negotiable.
          </p>
        </div>
      </div>
    </section>
  );
}
