"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Hero({ name = "JOHN DOE" }: { name?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Wave Grid Mouse Parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(gridRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!textRef.current) return;
    
    // Split text into characters manually to avoid external dependencies like SplitText
    const chars = textRef.current.querySelectorAll('.char');
    
    // Set initial shattered state
    gsap.set(chars, {
      x: () => gsap.utils.random(-400, 400),
      y: () => gsap.utils.random(-400, 400),
      z: () => gsap.utils.random(-400, 400),
      rotationX: () => gsap.utils.random(-90, 90),
      rotationY: () => gsap.utils.random(-90, 90),
      rotationZ: () => gsap.utils.random(-90, 90),
      opacity: 0,
      scale: () => gsap.utils.random(0.5, 2.5),
    });

    // Reassemble animation triggered by scroll
    gsap.to(chars, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power4.out",
      stagger: {
        amount: 0.8,
        from: "random",
      },
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Starts assembling when section comes into view
        end: "center center",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen bg-brand-black flex items-center justify-center overflow-hidden perspective-1000"
    >
      {/* Wave Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
        }}
      />
      
      {/* Kinetic Typography */}
      <h1 
        ref={textRef} 
        className="relative z-10 text-[15vw] text-brand-white brutalist-text flex flex-wrap justify-center pointer-events-none transform-style-3d"
        aria-label={name}
      >
        {name.split("").map((char, i) => (
          <span 
            key={i} 
            className="char inline-block gpu-accelerated"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </h1>
    </section>
  );
}
