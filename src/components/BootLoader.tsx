"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rLogoRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Rockstar "R" Logo flash
    const tl = gsap.timeline();
    
    tl.fromTo(rLogoRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.1, ease: "power4.in" } // Hard cut in
    );
    tl.to(rLogoRef.current, { opacity: 0, duration: 0.1, delay: 1.5 }); // Hard cut out

    // 2. Fade in background and loading bar
    tl.fromTo([bgRef.current, loadingBarRef.current, progressTextRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "none" }
    );

    // 3. Loading progression
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Wait a bit, then fade out the whole loader
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          onComplete: onComplete
        });
      }
      setProgress(current);
      
      // Animate loading bar width
      gsap.to(".loading-fill", {
        width: `${current}%`,
        duration: 0.2,
        ease: "power1.out"
      });
      
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-gta-black flex items-center justify-center overflow-hidden">
      
      {/* Noise overlay */}
      <div className="absolute inset-0 gta-noise z-50" />
      <div className="absolute inset-0 gta-vignette z-40" />

      {/* R Logo Phase */}
      <div ref={rLogoRef} className="absolute inset-0 flex items-center justify-center z-30">
        <div className="w-32 h-32 bg-[#FFA500] rounded-xl flex items-center justify-center border-4 border-gta-black shadow-[0_0_20px_rgba(255,165,0,0.5)]">
          {/* Fake R Logo */}
          <span className="font-bold text-6xl text-gta-black -ml-2 -mt-2">R*</span>
        </div>
      </div>

      {/* Loading Phase */}
      <div ref={bgRef} className="absolute inset-0 opacity-0 flex flex-col justify-end p-12 z-20">
        
        <div className="flex justify-between items-end w-full max-w-4xl mx-auto mb-4">
          <h2 className="gta-title text-4xl text-gta-sepia">STARTING NEW GAME...</h2>
          <div ref={progressTextRef} className="gta-title text-5xl text-gta-sepia">
            {progress}%
          </div>
        </div>

        {/* The Loading Bar */}
        <div ref={loadingBarRef} className="w-full max-w-4xl mx-auto h-4 bg-gta-brown/50 border-2 border-gta-black rounded-sm overflow-hidden relative">
          <div className="loading-fill h-full bg-[#FFA500] w-0 shadow-[0_0_10px_#FFA500]" />
        </div>
      </div>
    </div>
  );
}
