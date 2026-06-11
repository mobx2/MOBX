"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const leftDoor = useRef<HTMLDivElement>(null);
  const rightDoor = useRef<HTMLDivElement>(null);
  const counterWrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Intense Accelerating Counter
    let current = 0;
    const timer = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
      }
      setProgress(current);
    }, 25);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (container.current) {
            container.current.style.display = 'none';
          }
          onComplete();
        }
      });

      // Brutal Glitch on 100%
      tl.to(counterWrapperRef.current, {
        scale: 1.1,
        skewX: 20,
        filter: "blur(4px)",
        duration: 0.1,
        yoyo: true,
        repeat: 3,
      })
      .to(counterWrapperRef.current, {
        opacity: 0,
        scale: 5, // Explode outwards
        filter: "blur(20px)",
        duration: 0.6,
        ease: "power4.in",
      }, "+=0.2")
      // Vault Door 3D Fold & Split
      .to([leftDoor.current, rightDoor.current], {
        rotationY: (i) => (i === 0 ? 45 : -45),
        z: -500,
        duration: 0.5,
        ease: "power2.in",
      }, "<")
      .to([leftDoor.current, rightDoor.current], {
        xPercent: (i) => (i === 0 ? -120 : 120),
        duration: 1.2,
        ease: "expo.inOut",
      });
    }
  }, [progress]);

  return (
    <div ref={container} className="fixed inset-0 z-[200] flex overflow-hidden pointer-events-none perspective-[1000px]">
      <div 
        ref={leftDoor} 
        className="w-1/2 h-full bg-[#050505] border-r border-brand-white/20 will-change-transform origin-left" 
      />
      <div 
        ref={rightDoor} 
        className="w-1/2 h-full bg-[#050505] will-change-transform origin-right" 
      />
      
      <div 
        ref={counterWrapperRef} 
        className="absolute inset-0 flex items-center justify-center mix-blend-difference will-change-transform"
      >
        <span className="text-brand-white text-[25vw] brutalist-text gpu-accelerated font-black tracking-tighter">
          {Math.min(progress, 100)}
          <span className="text-[10vw] absolute bottom-[15%] text-brand-accent">%</span>
        </span>
      </div>
    </div>
  );
}
