"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const SLIDE = {
  id: 1,
  title: "IBRAHEEM SHAHEEN",
  bg: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070",
  fg: "/ibraheem.png",
};

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Master Pinned Scroll Timeline for the Background Zoom & Crosshair Scale
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true, // Lock the user here
        start: "top top",
        end: "+=1500", // Force 1500px of scrolling to complete the zoom
        scrub: 1.5, // Buttery smooth trailing inertia
      }
    });

    tl.to(bgRef.current, {
      scale: 1.5, // The background grows massively
      ease: "power2.inOut",
    }, 0);

    // Crosshair gets bigger and locks onto the head
    tl.to(crosshairRef.current, {
      scale: 8,
      opacity: 0, // Fades out as it gets huge
      ease: "power3.in",
    }, 0);

    // Text moves up and fades out
    tl.to(textRef.current, {
      y: -150,
      scale: 1.1,
      opacity: 0,
      ease: "power2.inOut",
    }, 0);

    // Intro Text Slam (On Page Load)
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      gsap.fromTo(chars,
        { scale: 3, opacity: 0, y: 100 },
        {
          scale: 1, opacity: 1, y: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "expo.out",
          delay: 0.5
        }
      );
    }

  }, { scope: containerRef });

  // Helper to split text into characters for staggering
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block will-change-transform">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen overflow-hidden bg-gta-black">
      
      {/* Global Noise & Vignette & CRT */}
      <div className="absolute inset-0 gta-noise z-50 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette z-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-[45] animate-crt-scroll" />

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Layer 1: Background Scene (Sepia / Gritty) */}
        <div 
          ref={bgRef}
          className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center will-change-transform origin-center"
          style={{ 
            backgroundImage: `url('${SLIDE.bg}')`,
            filter: 'sepia(80%) hue-rotate(5deg) saturate(150%) contrast(150%) brightness(0.6)'
          }}
        />

        {/* Custom Police Strobe Animation */}
        <style>{`
          @keyframes cop-red {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes cop-blue {
            0%, 49% { opacity: 0; }
            50%, 100% { opacity: 1; }
          }
          .animate-cop-red { animation: cop-red 1.2s infinite; }
          .animate-cop-blue { animation: cop-blue 1.2s infinite; }
        `}</style>

        {/* Layer 1.5: Police Sirens Behind Character (Strong Alternating Flashes) */}
        <div className="absolute inset-0 z-[5] pointer-events-none mix-blend-screen opacity-90">
          {/* Strong red and blue flashes restricted to the left background to not be hidden by character */}
          <div className="absolute inset-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,0,0,0.8)_0%,transparent_50%)] animate-cop-red" />
          <div className="absolute inset-0 w-[50%] h-full bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,100,255,1)_0%,transparent_50%)] animate-cop-blue" />
        </div>

        {/* Layer 2: Foreground Cutout */}
        <div 
          ref={fgRef}
          className="absolute bottom-0 right-[5%] w-[60%] h-[100%] bg-contain bg-no-repeat bg-bottom z-10 will-change-transform drop-shadow-[20px_20px_0px_#050505] origin-bottom"
          style={{ 
            backgroundImage: `url('${SLIDE.fg}')`,
            filter: 'sepia(40%) contrast(120%) brightness(0.8)'
          }}
        >
          {/* Target Crosshair on Head */}
          <div 
            ref={crosshairRef} 
            className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-[3px] border-[#cc9933] rounded-full flex items-center justify-center opacity-80 z-20 will-change-transform mix-blend-screen"
          >
            <div className="w-2 h-2 bg-[#cc9933] rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-[-15px] w-5 h-[3px] bg-[#cc9933]" />
            <div className="absolute top-1/2 right-[-15px] w-5 h-[3px] bg-[#cc9933]" />
            <div className="absolute left-1/2 top-[-15px] w-[3px] h-5 bg-[#cc9933]" />
            <div className="absolute left-1/2 bottom-[-15px] w-[3px] h-5 bg-[#cc9933]" />
          </div>
        </div>

        {/* Layer 3: Bold Typography */}
        <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-24 z-20 pointer-events-none">
          <h1 
            ref={textRef}
            className="text-[8vw] gta-title leading-[0.85] text-gta-sepia will-change-transform perspective-1000"
          >
            {SLIDE.title.split(" ").map((word, wIndex) => (
              <span key={wIndex} className="block overflow-hidden pb-4">
                {splitText(word)}
              </span>
            ))}
          </h1>
        </div>
      </div>
      
      {/* Global Foreground Marquee */}
      <div className="absolute top-[10%] left-0 w-[200vw] flex overflow-hidden z-[15] opacity-30 pointer-events-none mix-blend-overlay">
        <div className="flex gap-8 whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, idx) => (
            <span key={idx} className="gta-title text-[150px] text-stroke tracking-widest uppercase">
              HIGHLY CLASSIFIED // LCPD DATABASE // 
            </span>
          ))}
        </div>
      </div>
      
      {/* Police Sirens */}
      <div className="absolute inset-0 z-[15] pointer-events-none mix-blend-screen opacity-60">
        <div className="absolute inset-0 siren-red animate-siren" />
        <div className="absolute inset-0 siren-blue animate-siren" style={{ animationDelay: "1s" }} />
      </div>
      
    </section>
  );
}
