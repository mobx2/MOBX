"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Marquee() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!textRef.current) return;
    
    // We clone the text to create a seamless infinite loop
    const textWidth = textRef.current.offsetWidth;
    let xPos = 0;
    let direction = -1; // -1 for left, 1 for right
    let speedMultiplier = 1;
    let animationFrameId: number;
    
    const render = () => {
      // Base speed is 2px per frame
      xPos += 2 * direction * speedMultiplier;
      
      // Reset position for infinite loop (assuming we have 2 copies filling > 100% width)
      if (xPos <= -textWidth / 2) {
        xPos = 0;
      }
      
      gsap.set(textRef.current, { x: xPos });
      
      // Gradually reduce speedMultiplier back to 1
      speedMultiplier += (1 - speedMultiplier) * 0.1;
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);
    
    // Scroll velocity tracking
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // self.getVelocity() returns pixels per second
        const velocity = Math.abs(self.getVelocity());
        // Aggressively ramp up speed (cap it so it doesn't break)
        const targetMultiplier = 1 + velocity / 100;
        speedMultiplier = Math.min(targetMultiplier, 20); // Max speed multiplier 20x
      }
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, { scope: container });

  return (
    <section ref={container} className="w-full py-24 overflow-hidden bg-brand-black flex items-center relative z-20 border-y border-brand-white/10">
      <div 
        ref={textRef}
        className="whitespace-nowrap flex"
        style={{ width: "fit-content" }}
      >
        {/* We repeat the phrase enough times to allow for smooth looping */}
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-[12vw] brutalist-text text-brand-white mx-8 gpu-accelerated"
            style={{ WebkitTextStroke: '2px white', color: i % 2 === 0 ? 'transparent' : 'white' }}
          >
            VISUAL ARTIST // DEVELOPER //
          </span>
        ))}
      </div>
    </section>
  );
}
