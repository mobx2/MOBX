"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Marquee() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const speedLinesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Infinite Auto Scroll
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(textRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 10
    });

    // Scroll Velocity Ramp Up
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          
          // Ramp up timeScale (auto-scroll speed) based on scroll velocity
          const targetTimeScale = 1 + velocity / 50;
          gsap.to(tl, { timeScale: targetTimeScale, duration: 0.5, ease: "power2.out" });
          
          // Show speed lines when scrolling fast
          gsap.to(speedLinesRef.current, {
            opacity: Math.min(velocity / 1000, 1),
            duration: 0.2
          });
        }
      });
    });

    return () => ctx.revert();
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-10 bg-brand-white flex items-center justify-center overflow-hidden border-b-8 border-brand-black">
      
      {/* Speed Lines Overlay */}
      <div 
        ref={speedLinesRef}
        className="absolute inset-0 speed-lines opacity-0 mix-blend-overlay z-0 pointer-events-none" 
      />

      <div className="w-[120%] bg-brand-yellow comic-border py-4 rotate-[-3deg] transform-origin-center shadow-[10px_10px_0px_#FF00E5] flex overflow-hidden z-10">
        <div ref={textRef} className="flex whitespace-nowrap will-change-transform gap-16 pr-16">
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="text-[6vw] text-brand-black comic-text italic tracking-wider flex items-center gap-8">
              FRONT-END HERO
              <svg viewBox="0 0 100 100" className="w-[4vw] h-[4vw] fill-brand-black">
                {/* Comic burst shape */}
                <path d="M50 0 L60 30 L90 20 L70 50 L100 70 L65 75 L60 100 L45 75 L10 80 L35 55 L0 40 L30 35 Z" />
              </svg>
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
