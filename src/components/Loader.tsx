"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTearRef = useRef<HTMLDivElement>(null);
  const rightTearRef = useRef<HTMLDivElement>(null);
  const bamRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // The BAM! and Tear Animation
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        // Bam pops in
        tl.fromTo(bamRef.current, 
          { scale: 0, rotation: -20, opacity: 0 },
          { scale: 1, rotation: 10, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );

        // Tear apart
        tl.to(leftTearRef.current, {
          xPercent: -100,
          rotation: -5,
          duration: 1,
          ease: "power4.inOut"
        }, "+=0.2");
        
        tl.to(rightTearRef.current, {
          xPercent: 100,
          rotation: 5,
          duration: 1,
          ease: "power4.inOut"
        }, "<");

        tl.to(bamRef.current, {
          scale: 3,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in"
        }, "<0.2");

        tl.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.1
        });
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none">
      
      {/* Left Tear */}
      <div 
        ref={leftTearRef}
        className="absolute top-[-10%] bottom-[-10%] left-0 w-[55%] bg-brand-yellow halftone-bg flex items-center justify-end pr-10 origin-bottom-left border-r-8 border-brand-black"
        style={{ clipPath: 'polygon(0 0, 100% 0, 90% 10%, 100% 20%, 95% 30%, 100% 40%, 85% 50%, 100% 60%, 90% 70%, 100% 80%, 95% 90%, 100% 100%, 0 100%)' }}
      >
        <div className="text-[10vw] comic-text text-brand-white -rotate-90 origin-right translate-x-full absolute right-10">
          LOADING
        </div>
      </div>

      {/* Right Tear */}
      <div 
        ref={rightTearRef}
        className="absolute top-[-10%] bottom-[-10%] right-0 w-[55%] bg-brand-magenta halftone-bg flex items-center justify-start pl-10 origin-bottom-right border-l-8 border-brand-black"
        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 5% 90%, 0 80%, 10% 70%, 0 60%, 15% 50%, 0 40%, 5% 30%, 0 20%, 10% 10%)' }}
      >
        <div className="text-[10vw] comic-text text-brand-cyan -rotate-90 origin-left -translate-x-full absolute left-10">
          {progress}%
        </div>
      </div>

      {/* The BAM! Text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div 
          ref={bamRef} 
          className="text-[20vw] comic-text text-brand-yellow bg-brand-black px-10 py-4 border-8 border-brand-black rounded-[50%] opacity-0 scale-0 shadow-[20px_20px_0px_#00F0FF]"
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', padding: '10vw' }}
        >
          BAM!
        </div>
      </div>
      
    </div>
  );
}
