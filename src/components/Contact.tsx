"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const powRef = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !textRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.4;
    const y = (clientY - (top + height / 2)) * 0.4;

    gsap.to(buttonRef.current, {
      x, y,
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.to(textRef.current, {
      x: x * 0.5,
      y: y * 0.5,
      duration: 1,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to([buttonRef.current, textRef.current], {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
    
    gsap.to(powRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // POW Animation
    gsap.fromTo(powRef.current,
      { scale: 0, opacity: 0, rotation: -20 },
      { scale: 1, opacity: 1, rotation: 10, duration: 0.4, ease: "back.out(2)" }
    );
  };

  return (
    <section ref={containerRef} className="relative w-full h-[80vh] bg-brand-yellow flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 halftone-bg opacity-20 mix-blend-overlay pointer-events-none" />

      {/* Massive Speech Bubble Footer */}
      <div className="relative w-[90vw] max-w-5xl bg-brand-white comic-border rounded-[100px] p-20 shadow-[30px_30px_0px_#FF00E5] flex flex-col items-center justify-center">
        
        {/* Speech Bubble Tail */}
        <div 
          className="absolute bottom-[-60px] left-[20%] w-[80px] h-[80px] bg-brand-white"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            borderLeft: '4px solid var(--color-brand-black)',
          }}
        />
        {/* Fake Border for Tail */}
        <svg className="absolute bottom-[-64px] left-[20%] w-[80px] h-[80px] pointer-events-none" style={{ zIndex: -1 }}>
           <path d="M0 0 L0 80 L80 0" fill="var(--color-brand-black)" />
        </svg>

        <h2 className="comic-text text-brand-black text-[5vw] mb-12 text-center">
          READY TO MAKE<br/>NOISE?
        </h2>

        {/* Magnetic Button Container */}
        <div 
          className="relative w-64 h-64 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          {/* POW Micro-animation */}
          <div 
            ref={powRef}
            className="absolute inset-[-40%] bg-brand-cyan comic-border shadow-[10px_10px_0px_#050505] flex items-center justify-center z-0 opacity-0 scale-0"
            style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
          />

          <button 
            ref={buttonRef}
            className="relative z-10 w-48 h-48 bg-brand-magenta rounded-full comic-border flex items-center justify-center shadow-[10px_10px_0px_#050505] transition-colors hover:bg-brand-yellow"
          >
            <span ref={textRef} className="comic-text text-brand-white text-3xl pointer-events-none">
              SAY<br/>HELLO
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
