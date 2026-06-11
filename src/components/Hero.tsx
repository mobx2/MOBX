"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const name = "IBRAHEEM SHAHEEN";

  useGSAP(() => {
    // Mouse Parallax for shadow
    const xTo = gsap.quickTo(textRef.current, "textShadow", { duration: 0.4, ease: "power3" });
    const bgXTo = gsap.quickTo(bgRef.current, "x", { duration: 0.6, ease: "power3" });
    const bgYTo = gsap.quickTo(bgRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;

      // Update text shadow to simulate 3D pop
      const shadowX = -x * 20 + 6;
      const shadowY = -y * 20 + 6;
      
      if (textRef.current) {
        textRef.current.style.textShadow = `${shadowX}px ${shadowY}px 0px var(--color-brand-black)`;
      }

      bgXTo(-x * 30);
      bgYTo(-y * 30);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll Animation: Letters scatter like broken glass panels
    const chars = textRef.current?.querySelectorAll(".char");
    if (chars) {
      gsap.to(chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        x: () => (Math.random() - 0.5) * 1000,
        y: () => (Math.random() - 0.5) * 1000,
        rotationZ: () => (Math.random() - 0.5) * 90,
        rotationX: () => (Math.random() - 0.5) * 90,
        opacity: 0,
        scale: () => 1 + Math.random(),
        ease: "power2.inOut",
        stagger: {
          amount: 0.5,
          from: "random"
        }
      });
    }

    // Rotating Halftone Background
    gsap.to(bgRef.current, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "none"
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-cyan flex flex-col items-center justify-center pt-20 border-b-8 border-brand-black">
      
      {/* Background Halftone */}
      <div 
        ref={bgRef}
        className="absolute inset-[-50%] w-[200%] h-[200%] halftone-bg opacity-30 pointer-events-none will-change-transform"
      />

      {/* Speed Lines */}
      <div className="absolute inset-0 speed-lines opacity-20 pointer-events-none mix-blend-overlay z-0" />

      {/* User Photo Integration (Optional hidden in background) */}
      <div className="absolute inset-[-10%] opacity-20 mix-blend-luminosity bg-[url('/ibraheem.png')] bg-cover bg-center grayscale mask-image-[radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      {/* 3D Comic Typography */}
      <h1 
        ref={textRef} 
        className="relative z-10 text-[18vw] leading-[0.8] text-brand-yellow comic-text flex flex-col items-center justify-center pointer-events-none -skew-x-12 -skew-y-3 transform-style-3d will-change-transform"
        style={{ textShadow: '10px 10px 0px var(--color-brand-black)' }}
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

      {/* Comic Book Label */}
      <div className="absolute top-10 left-10 bg-brand-magenta comic-border px-4 py-2 rotate-[-5deg] z-20">
        <span className="comic-text-sm text-brand-white text-xl">ISSUE #01</span>
      </div>
      
    </section>
  );
}
