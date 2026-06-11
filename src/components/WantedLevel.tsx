"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function WantedLevel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(SVGElement | null)[]>([]);

  useGSAP(() => {
    // We animate the stars filling up based on total page scroll
    const totalStars = 6;
    
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Calculate how many stars should be filled based on scroll progress (0.0 to 1.0)
        const filledStars = Math.min(totalStars, Math.floor(self.progress * (totalStars + 1)));
        
        starsRef.current.forEach((star, index) => {
          if (!star) return;
          
          const isFilled = index < filledStars;
          const wasFilled = star.getAttribute("data-filled") === "true";
          
          if (isFilled && !wasFilled) {
            // Star just got filled! Flash it.
            star.setAttribute("data-filled", "true");
            gsap.fromTo(star, 
              { fill: "white", scale: 1.5 },
              { fill: "#ffffff", scale: 1, duration: 0.5, ease: "bounce.out" }
            );
          } else if (!isFilled && wasFilled) {
            // Star lost
            star.setAttribute("data-filled", "false");
            gsap.to(star, { fill: "transparent", scale: 1, duration: 0.2 });
          }
        });
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-6 right-8 z-[60] flex items-center gap-6"
    >
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('togglePauseMenu'))}
        className="text-white font-bold tracking-widest text-xl drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] hover:text-gta-sepia transition-colors pointer-events-auto"
      >
        [ PAUSE ]
      </button>

      <div className="flex items-center gap-2 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <svg 
            key={i}
            ref={(el) => { starsRef.current[i] = el; }}
            data-filled="false"
            viewBox="0 0 24 24" 
            className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)] will-change-transform"
            stroke="currentColor" 
            strokeWidth="2" 
            fill="transparent"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    </div>
  );
}
