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
    // 1. Rockstar "M" Logo flash & scale up
    const tl = gsap.timeline();
    
    tl.fromTo(rLogoRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.2, ease: "power4.out" }
    );
    // Wait a moment, then scale to fill screen
    tl.to(rLogoRef.current, { scale: 50, opacity: 0, duration: 0.8, ease: "power2.in", delay: 1.5 });

    // 2. Fade in background and loading bar
    tl.fromTo([bgRef.current, loadingBarRef.current, progressTextRef.current],
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "none" },
      "-=0.2"
    );

    // 3. Loading progression (5 seconds total)
    // 5000ms / 50ms = 100 steps. 100% / 100 steps = 1% per step.
    let current = 0;
    const interval = setInterval(() => {
      current += 1; // Exact increment to hit 100 in 100 steps
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
      setProgress(Math.floor(current));
      
      // Animate loading bar width
      gsap.to(".loading-fill", {
        width: `${current}%`,
        duration: 0.05,
        ease: "none"
      });
      
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-gta-black flex items-center justify-center overflow-hidden">
      
      {/* Noise overlay */}
      <div className="absolute inset-0 gta-noise z-50" />
      <div className="absolute inset-0 gta-vignette z-40" />

      {/* Police Sirens for Logo */}
      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-90">
        <style>{`
          @keyframes loader-cop-red {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes loader-cop-blue {
            0%, 49% { opacity: 0; }
            50%, 100% { opacity: 1; }
          }
          .animate-loader-red { animation: loader-cop-red 1.2s infinite; }
          .animate-loader-blue { animation: loader-cop-blue 1.2s infinite; }
        `}</style>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_left,rgba(255,0,0,0.8)_0%,transparent_50%)] animate-loader-red" />
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_right,rgba(0,100,255,1)_0%,transparent_50%)] animate-loader-blue" />
      </div>

      {/* Rockstar-style MOBX Logo Phase */}
      <div ref={rLogoRef} className="absolute inset-0 flex items-center justify-center z-30">
        <div className="relative w-64 h-48 bg-[#FFA500] rounded-[2rem] flex items-center justify-center border-[6px] border-black shadow-[0_0_30px_rgba(255,165,0,0.6)]">
          {/* Big MOBX */}
          <span className="font-black text-[65px] text-black tracking-tighter absolute top-8 left-4 font-sans italic pr-2">MOBX</span>
          {/* White Star */}
          <div className="absolute bottom-2 right-3 text-white text-5xl drop-shadow-[2px_2px_0_black]" style={{ WebkitTextStroke: '2px black' }}>★</div>
        </div>
      </div>

      {/* Loading Phase */}
      <div ref={bgRef} className="absolute inset-0 opacity-0 flex flex-col justify-end p-12 z-20">
        
        {/* Background Code Pattern */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-10 pointer-events-none px-12 md:px-32">
          <pre className="text-[#FFA500] font-mono text-sm md:text-xl leading-relaxed overflow-hidden">
{`/* LCPD SECURE NETWORK INITIALIZATION */
function initLCPD_Terminal(auth_token) {
  const connection = new SecureSocket(auth_token);
  
  if (!connection.verify()) {
    throw new SecurityError('UNAUTHORIZED ACCESS ATTEMPT');
  }
  
  System.mount({
    target: '#lcpd-root',
    components: ['CriminalDatabase', 'SurveillanceCams', 'ActiveMissions']
  });

  console.log('[LCPD] Handshake complete.');
  return connection.status;
}

// ESTABLISHING CONNECTION...
// DECRYPTING ASSETS...
// LOAD COMPLETE.`}
          </pre>
        </div>
        
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
