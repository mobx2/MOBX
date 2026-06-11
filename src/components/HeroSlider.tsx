"use client";

import { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SLIDES = [
  {
    id: 1,
    title: "THE DEVELOPER",
    bg: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070", // Gritty city street
    fg: "/ibraheem.png",
    color: "var(--color-gta-sepia)"
  },
  {
    id: 2,
    title: "THE ARTIST",
    bg: "https://images.unsplash.com/photo-1478809846157-ec82fa6ce4ab?q=80&w=2070", // Urban bridge / decay
    fg: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=1936", // Placeholder cutout
    color: "var(--color-gta-sepia)"
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
    const bgX = gsap.quickTo(bgsRef.current, "x", { duration: 1, ease: "power3.out" });
    const bgY = gsap.quickTo(bgsRef.current, "y", { duration: 1, ease: "power3.out" });
    const fgX = gsap.quickTo(fgsRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const fgY = gsap.quickTo(fgsRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Heavy 3D parallax displacement
      bgX(-x * 30);
      bgY(-y * 30);
      fgX(x * 15);
      fgY(y * 15);
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 2. The GTA IV Master Timeline
    const masterTl = gsap.timeline({ repeat: -1 });

    SLIDES.forEach((_, i) => {
      const slideTl = gsap.timeline();

      // Ensure this slide is visible and above others
      slideTl.set(slidesRef.current[i], { autoAlpha: 1, zIndex: 10 });
      SLIDES.forEach((_, j) => {
        if (i !== j) slideTl.set(slidesRef.current[j], { zIndex: 1 }, 0);
      });

      // Layer 1: Background (Extremely slow Ken Burns)
      // Gritty sepia filter applied via CSS, just handle movement here
      slideTl.fromTo(bgsRef.current[i],
        { scale: 1.05, xPercent: 0, yPercent: 0 },
        { scale: 1.15, xPercent: -2, yPercent: -1, duration: 8, ease: "none" },
        0
      );

      // Layer 2: Foreground Cutout (Aggressive enter, screen shake, slow parallax)
      slideTl.fromTo(fgsRef.current[i],
        { xPercent: 100, opacity: 0, scale: 1.1 },
        { xPercent: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power4.out" },
        0
      );
      
      // Screen shake on cutout entry
      slideTl.to(containerRef.current, {
        keyframes: [
          { x: -10, y: 10, duration: 0.05 },
          { x: 10, y: -10, duration: 0.05 },
          { x: -5, y: 5, duration: 0.05 },
          { x: 5, y: -5, duration: 0.05 },
          { x: 0, y: 0, duration: 0.05 },
        ],
        ease: "none"
      }, 0);

      // Foreground slow drift (continues after entry)
      slideTl.to(fgsRef.current[i],
        { xPercent: -3, duration: 7.5, ease: "none" },
        0.5
      );

      // Layer 3: Typography (Slam onto screen)
      slideTl.fromTo(textsRef.current[i],
        { scale: 4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power4.in" },
        1 // The text slams in 1 second after the slide starts
      );
      
      // Secondary screen shake for text slam
      slideTl.to(containerRef.current, {
        keyframes: [
          { x: -15, y: 15, duration: 0.05 },
          { x: 15, y: -15, duration: 0.05 },
          { x: -10, y: 10, duration: 0.05 },
          { x: 10, y: -10, duration: 0.05 },
          { x: 0, y: 0, duration: 0.05 },
        ],
        ease: "none"
      }, 1.3);

      // Add a slight glitch flicker to text
      slideTl.to(textsRef.current[i], {
        opacity: 0.8,
        duration: 0.05,
        yoyo: true,
        repeat: 5,
      }, 1.5);

      // Hold the slide for 6 seconds total, then hard cut
      masterTl.add(slideTl);
      masterTl.set(slidesRef.current[i], { autoAlpha: 0 }, "+=6");
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gta-black">
      
      {/* Global Noise & Vignette */}
      <div className="absolute inset-0 gta-noise z-50" />
      <div className="absolute inset-0 gta-vignette z-40" />

      {SLIDES.map((slide, i) => (
        <div 
          key={slide.id} 
          ref={el => { slidesRef.current[i] = el }}
          className="absolute inset-[-5%] w-[110%] h-[110%] opacity-0 overflow-hidden"
        >
          {/* Layer 1: Background Scene (Sepia / Gritty) */}
          <div 
            ref={el => { bgsRef.current[i] = el }}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ 
              backgroundImage: `url('${slide.bg}')`,
              filter: 'sepia(80%) hue-rotate(5deg) saturate(150%) contrast(150%) brightness(0.6)'
            }}
          />

          {/* Layer 2: Foreground Cutout */}
          <div 
            ref={el => { fgsRef.current[i] = el }}
            className="absolute bottom-[-5%] right-[5%] w-[60%] h-[100%] bg-contain bg-no-repeat bg-bottom z-10 will-change-transform drop-shadow-[15px_15px_0px_#050505]"
            style={{ 
              backgroundImage: `url('${slide.fg}')`,
              filter: 'sepia(40%) contrast(120%) brightness(0.8)'
            }}
          />

          {/* Layer 3: Bold Typography */}
          <div className="absolute inset-0 flex items-center justify-start pl-24 z-20 pointer-events-none">
            <h1 
              ref={el => { textsRef.current[i] = el }}
              className="text-[12vw] gta-title leading-[0.85] text-gta-sepia will-change-transform"
            >
              {slide.title.split(" ").map((word, wIndex) => (
                <span key={wIndex} className="block">{word}</span>
              ))}
            </h1>
          </div>
        </div>
      ))}
      
    </section>
  );
}
