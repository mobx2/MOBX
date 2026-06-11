"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function FinalCutscene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // GTA IV Mission Passed / Wasted Style Effect
    const tl = gsap.timeline();

    // Sudden Sepia flash and contrast boost
    tl.to(containerRef.current, {
      filter: "sepia(100%) contrast(200%) brightness(0.5)",
      duration: 0.1,
      ease: "power4.in"
    });

    // Dramatic slow motion pull-back
    tl.to(formRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 4,
      ease: "power2.out"
    }, 0);
    
    // Pulse the wanted star violently
    tl.to(starRef.current, {
      scale: 3,
      rotation: 360,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    }, 0);
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] flex items-center justify-center overflow-hidden transition-all duration-[4000ms]">
      
      <div className="absolute inset-0 gta-noise z-0 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette opacity-100 z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-2xl px-8 flex flex-col items-center">
        
        {!isSubmitted ? (
          <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <div className="text-center mb-8">
              <h2 className="gta-title text-7xl text-gta-sepia tracking-tighter">CONTACT_</h2>
              <p className="gta-hud text-gta-brown mt-2">SECURE CONNECTION ESTABLISHED</p>
            </div>

            <input 
              type="text" 
              placeholder="YOUR ALIAS" 
              className="w-full bg-transparent border-b-2 border-gta-brown/50 py-4 gta-hud text-gta-sepia placeholder:text-gta-brown focus:outline-none focus:border-gta-sepia transition-colors"
              required
            />
            <textarea 
              placeholder="CONTRACT DETAILS" 
              rows={4}
              className="w-full bg-transparent border-b-2 border-gta-brown/50 py-4 gta-hud text-gta-sepia placeholder:text-gta-brown focus:outline-none focus:border-gta-sepia transition-colors resize-none"
              required
            />

            <button 
              type="submit"
              className="group flex items-center justify-center gap-4 bg-[#111] border-2 border-[#333] hover:border-gta-sepia py-6 px-10 mt-8 transition-colors"
            >
              <span ref={starRef} className="text-gta-red text-2xl group-hover:scale-125 transition-transform">★</span>
              <span className="gta-title text-3xl text-gta-sepia group-hover:text-gta-red transition-colors">EXECUTE CONTRACT</span>
            </button>
          </form>
        ) : (
          <div className="text-center will-change-transform">
            <h2 className="gta-title text-[8vw] text-gta-sepia text-shadow-md">MISSION PASSED</h2>
            <p className="gta-hud text-gta-brown text-xl mt-4">RESPECT +</p>
          </div>
        )}
      </div>
    </section>
  );
}
