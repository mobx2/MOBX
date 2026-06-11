"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SLIDES = [
  {
    id: 1,
    title: "DEVELOPER",
    bg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    fg: "/ibraheem.png", // The user's portrait
    color: "var(--color-brand-yellow)"
  },
  {
    id: 2,
    title: "VISUAL ARTIST",
    bg: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?q=80&w=2070",
    fg: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1936", // Just a placeholder for cutout 2
    color: "var(--color-brand-cyan)"
  }
];

export default function HeroSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const fgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  
  useGSAP(() => {
    // 1. Mouse Parallax (3D Displacement)
    const bgX = gsap.quickTo(bgsRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const bgY = gsap.quickTo(bgsRef.current, "y", { duration: 0.8, ease: "power3.out" });
    const fgX = gsap.quickTo(fgsRef.current, "x", { duration: 0.5, ease: "power3.out" });
    const fgY = gsap.quickTo(fgsRef.current, "y", { duration: 0.5, ease: "power3.out" });
    const textX = gsap.quickTo(textsRef.current, "x", { duration: 0.3, ease: "power3.out" });
    const textY = gsap.quickTo(textsRef.current, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Heavy 3D parallax displacement
      bgX(-x * 50);
      bgY(-y * 50);
      fgX(x * 30);
      fgY(y * 30);
      textX(x * 80);
      textY(y * 80);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 2. The GTA IV Master Timeline
    const masterTl = gsap.timeline({ repeat: -1 });

    SLIDES.forEach((_, i) => {
      const slideTl = gsap.timeline();

      // Ensure this slide is visible and above others
      slideTl.set(slidesRef.current[i], { autoAlpha: 1, zIndex: 10 });
      // Reset other slides
      SLIDES.forEach((_, j) => {
        if (i !== j) slideTl.set(slidesRef.current[j], { zIndex: 1 }, 0);
      });

      // Layer 1: Background (Extremely slow Ken Burns)
      slideTl.fromTo(bgsRef.current[i],
        { scale: 1, filter: "grayscale(100%) contrast(1.2)" },
        { scale: 1.15, filter: "grayscale(50%) contrast(1.5)", duration: 6, ease: "none" },
        0
      );

      // Layer 2: Foreground Cutout (Aggressive slide in, then slow parallax)
      slideTl.fromTo(fgsRef.current[i],
        { xPercent: 100, yPercent: 20, scale: 1.1, filter: "brightness(0)" },
        { xPercent: 0, yPercent: 0, scale: 1, filter: "brightness(1)", duration: 1, ease: "expo.out" },
        0
      );
      // Foreground slow drift (continues after entry)
      slideTl.to(fgsRef.current[i],
        { xPercent: -5, duration: 5, ease: "none" },
        1
      );

      // Layer 3: Typography (Massive stamp with screen shake)
      slideTl.fromTo(textsRef.current[i],
        { scale: 3, opacity: 0, rotationZ: 15 },
        { scale: 1, opacity: 1, rotationZ: 0, duration: 0.6, ease: "power4.out" },
        0.5 // The "Beat Drop" timing
      );

      // The Snap / Camera Shake Effect
      slideTl.to(containerRef.current, {
        keyframes: [
          { x: -20, y: 15, duration: 0.05 },
          { x: 20, y: -15, duration: 0.05 },
          { x: -10, y: 10, duration: 0.05 },
          { x: 10, y: -10, duration: 0.05 },
          { x: 0, y: 0, duration: 0.05 },
        ],
        ease: "none"
      }, 0.5); // Triggered exactly on text stamp

      // Hold the slide for 4.5 seconds, then hard cut
      masterTl.add(slideTl);
      masterTl.set(slidesRef.current[i], { autoAlpha: 0 }, "+=4.5");
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-black border-b-8 border-brand-black">
      
      {/* 
        TODO: HERO ASSET INSTRUCTIONS 
        To perfect the GTA IV effect, replace the SLIDES array above with your own assets:
        - `bg`: A wide scene, city, studio, or landscape (JPG/PNG).
        - `fg`: A perfectly cut-out transparent PNG of yourself (e.g., holding a camera).
        Make sure the `fg` is high-res and tightly cropped around the edges!
      */}

      {SLIDES.map((slide, i) => (
        <div 
          key={slide.id} 
          ref={el => { slidesRef.current[i] = el }}
          className="absolute inset-[-10%] w-[120%] h-[120%] opacity-0 overflow-hidden"
        >
          {/* Layer 1: Background Scene */}
          <div 
            ref={el => { bgsRef.current[i] = el }}
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity will-change-transform"
            style={{ backgroundImage: `url('${slide.bg}')` }}
          />
          
          {/* Halftone Dot Overlay */}
          <div className="absolute inset-0 halftone-bg opacity-40 mix-blend-overlay z-0 pointer-events-none" />

          {/* Speed Lines Overlay (for aggressive feel) */}
          <div className="absolute inset-0 speed-lines opacity-10 mix-blend-overlay z-0 pointer-events-none" />

          {/* Layer 2: Foreground Cutout */}
          <div 
            ref={el => { fgsRef.current[i] = el }}
            className="absolute bottom-[-5%] right-[5%] w-[60%] h-[100%] bg-contain bg-no-repeat bg-bottom z-10 will-change-transform drop-shadow-[20px_20px_0px_#050505]"
            style={{ backgroundImage: `url('${slide.fg}')` }}
          />

          {/* Layer 3: Bold Typography */}
          <div className="absolute inset-0 flex items-center justify-start pl-20 z-20 pointer-events-none">
            <h1 
              ref={el => { textsRef.current[i] = el }}
              className="text-[14vw] comic-text -skew-x-12 -skew-y-3 leading-[0.8] tracking-tight will-change-transform"
              style={{ color: slide.color, textShadow: '15px 15px 0px var(--color-brand-black)' }}
            >
              {slide.title.split(" ").map((word, wIndex) => (
                <span key={wIndex} className="block">{word}</span>
              ))}
            </h1>
          </div>
        </div>
      ))}
      
      {/* Comic Book Label */}
      <div className="absolute top-10 left-10 bg-brand-magenta comic-border px-4 py-2 rotate-[-5deg] z-30">
        <span className="comic-text-sm text-brand-white text-xl tracking-widest">LOADING...</span>
      </div>
      
    </section>
  );
}
