"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATS = [
  { name: "FRONT-END ARCHITECTURE", value: 95 },
  { name: "WEBGL / SHADERS", value: 85 },
  { name: "UI/UX DESIGN", value: 90 },
  { name: "PERFORMANCE OPTIMIZATION", value: 98 },
  { name: "WEAPON ACCURACY (TYPING)", value: 80 }
];

export default function StatsHUD() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Parallax background
    gsap.to(".hud-bg", {
      yPercent: 30,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      
      const width = bar.dataset.value;
      
      gsap.fromTo(bar,
        { width: "0%" },
        {
          width: `${width}%`,
          duration: 1.5,
          ease: "power2.out",
          force3D: true,
          onStart: () => gsap.set(bar, { willChange: "width" }),
          onComplete: () => gsap.set(bar, { willChange: "auto" }),
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add flicker effect on fill
      gsap.to(bar, {
        opacity: 0.5,
        duration: 0.05,
        repeat: 10,
        yoyo: true,
        force3D: true,
        onStart: () => gsap.set(bar, { willChange: "opacity" }),
        onComplete: () => gsap.set(bar, { willChange: "auto" }),
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen bg-gta-black py-32 px-4 md:px-20 overflow-hidden border-t-2 border-b-2 border-gta-brown/30 flex items-center justify-center contain-strict">
      
      {/* Dark Desaturated Map Background */}
      <div 
        className="hud-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover bg-center opacity-10 pointer-events-none scale-150 origin-center"
        style={{ filter: 'grayscale(100%) contrast(200%) invert(100%)' }}
      />
      <div className="absolute inset-0 gta-vignette pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Stats Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 text-gta-sepia">
          <h2 className="gta-title text-6xl">PLAYER STATS</h2>
          
          <div className="gta-hud text-sm flex flex-col gap-4 border-2 border-gta-brown/50 p-6 bg-gta-black/80">
            <div className="flex justify-between border-b border-gta-brown/30 pb-2">
              <span className="text-gta-brown">ALIAS</span>
              <span>MOBX</span>
            </div>
            <div className="flex justify-between border-b border-gta-brown/30 pb-2">
              <span className="text-gta-brown">RANK</span>
              <span>JUNIOR DEVELOPER</span>
            </div>
            <div className="flex justify-between border-b border-gta-brown/30 pb-2">
              <span className="text-gta-brown">WANTED LEVEL</span>
              <span className="text-gta-red">★★★★★★</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gta-brown">TIME PLAYED</span>
              <span>1 YEAR</span>
            </div>
          </div>
        </div>

        {/* Right Side: Skill Bars */}
        <div className="w-full md:w-2/3 flex flex-col gap-8 justify-center">
          {STATS.map((stat, i) => (
            <div key={stat.name} className="flex flex-col gap-2">
              <div className="flex justify-between gta-hud text-xs text-gta-sepia">
                <span>{stat.name}</span>
                <span>{stat.value}%</span>
              </div>
              <div className="w-full h-4 border-2 border-[#222] bg-[#0A0A0A] relative overflow-hidden">
                <div 
                  ref={el => { barsRef.current[i] = el }}
                  data-value={stat.value}
                  className="absolute top-0 left-0 h-full bg-gta-sepia shadow-[0_0_10px_rgba(209,199,172,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
