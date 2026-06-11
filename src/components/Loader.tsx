"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const leftDoor = useRef<HTMLDivElement>(null);
  const rightDoor = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // Counter Animation
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Accelerate counting
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 30);

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

      // Hide Counter
      tl.to(counterRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Vault Door Split
      .to([leftDoor.current, rightDoor.current], {
        xPercent: (i) => (i === 0 ? -100 : 100),
        duration: 1.5,
        ease: "power4.inOut",
      });
    }
  }, [progress]);

  return (
    <div ref={container} className="fixed inset-0 z-50 flex overflow-hidden pointer-events-none">
      <div ref={leftDoor} className="w-1/2 h-full bg-brand-black border-r border-brand-white/10 will-change-transform" />
      <div ref={rightDoor} className="w-1/2 h-full bg-brand-black will-change-transform" />
      
      <div 
        ref={counterRef} 
        className="absolute inset-0 flex items-center justify-center mix-blend-difference"
      >
        <span className="text-brand-white text-[20vw] brutalist-text gpu-accelerated">
          {Math.min(progress, 100)}
        </span>
      </div>
    </div>
  );
}
