"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Hero({ name = "JOHN DOE" }: { name?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Extreme Wave Grid Mouse Parallax & Distortion
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current || !textRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5);
      const yPos = (clientY / window.innerHeight - 0.5);

      // Grid moves opposite to mouse
      gsap.to(gridRef.current, {
        x: xPos * -100,
        y: yPos * -100,
        skewX: xPos * 10,
        skewY: yPos * 10,
        duration: 1.5,
        ease: "power3.out",
      });

      // 2. Magnetic 3D Text Tilt
      gsap.to(textRef.current, {
        rotationY: xPos * 30, // 30 degrees tilt max
        rotationX: -yPos * 30,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!textRef.current) return;
    
    const chars = textRef.current.querySelectorAll('.char');
    
    // 3. Savage Glitch Scatter on Start
    gsap.set(chars, {
      x: () => gsap.utils.random(-800, 800),
      y: () => gsap.utils.random(-800, 800),
      z: () => gsap.utils.random(-1000, 500),
      rotationX: () => gsap.utils.random(-360, 360),
      rotationY: () => gsap.utils.random(-360, 360),
      rotationZ: () => gsap.utils.random(-360, 360),
      opacity: 0,
      scale: () => gsap.utils.random(0.1, 4),
      filter: "blur(20px)",
    });

    // Brutal Snap Assembly on scroll
    gsap.to(chars, {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 2,
      ease: "expo.out",
      stagger: {
        amount: 1.5,
        from: "random",
      },
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", 
        end: "center center",
        scrub: 1.5, // Smoother scrub for heavy 3D
      }
    });

    // 4. Random Glitch Effect loop
    const glitchLoop = () => {
      const randomChar = chars[Math.floor(Math.random() * chars.length)];
      gsap.to(randomChar, {
        x: () => gsap.utils.random(-10, 10),
        y: () => gsap.utils.random(-10, 10),
        skewX: () => gsap.utils.random(-20, 20),
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })",
        onComplete: () => {
          gsap.set(randomChar, { x: 0, y: 0, skewX: 0 });
          setTimeout(glitchLoop, gsap.utils.random(2000, 5000)); // Glitch every 2-5 seconds
        }
      });
    };
    
    setTimeout(glitchLoop, 3000);

  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative w-full h-screen bg-brand-black flex items-center justify-center overflow-hidden perspective-[2000px]"
    >
      {/* Dynamic Noise Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] repeat" />

      {/* Reactive Wave Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-[-20%] w-[140%] h-[140%] opacity-[0.15] pointer-events-none will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '4vw 4vw',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 70%)'
        }}
      />
      
      {/* 3D Kinetic Typography */}
      <h1 
        ref={textRef} 
        className="relative z-10 text-[18vw] leading-[0.8] text-brand-white brutalist-text flex flex-col items-center justify-center pointer-events-none transform-style-3d will-change-transform drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        aria-label={name}
      >
        {name.split(" ").map((word, wIndex) => (
          <div key={wIndex} className="flex justify-center w-full overflow-visible">
            {word.split("").map((char, i) => (
              <span 
                key={i} 
                className="char inline-block gpu-accelerated will-change-transform origin-center"
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </h1>
    </section>
  );
}
