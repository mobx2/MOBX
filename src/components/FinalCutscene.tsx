"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function FinalCutscene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const missionPassedRef = useRef<HTMLImageElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const { contextSafe } = useGSAP();

  const handleSubmit = contextSafe(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Reliable email API via Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          access_key: "8fa94102-2cea-460a-b92a-bdd6d673631f",
          subject: `[MOBX PORTFOLIO] New Contract from ${alias}`,
          from_name: alias,
          email: email, 
          message: details
        })
      });
    } catch (error) {
      console.error("Transmission failed", error);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // GTA IV Mission Passed / Wasted Style Effect
    const tl = gsap.timeline();

    // Sudden Sepia flash and contrast boost
    tl.to(containerRef.current, {
      filter: "sepia(100%) contrast(200%) brightness(0.5)",
      duration: 0.1,
      ease: "power4.in",
      force3D: true,
      onStart: () => gsap.set(containerRef.current, { willChange: "filter" }),
      onComplete: () => gsap.set(containerRef.current, { willChange: "auto" })
    });

    // The form fades out and scales down
    tl.to(formRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      force3D: true,
      onStart: () => gsap.set(formRef.current, { willChange: "transform, opacity" }),
      onComplete: () => {
        gsap.set(formRef.current, { willChange: "auto", display: "none" });
      }
    }, 0);
    
    // Set submitted state immediately so the image can render and animate
    setIsSubmitted(true);
    
    // Pulse the wanted star violently
    tl.to(starRef.current, {
      scale: 3,
      rotation: 360,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      force3D: true,
      onStart: () => gsap.set(starRef.current, { willChange: "transform, opacity" }),
      onComplete: () => gsap.set(starRef.current, { willChange: "auto" })
    }, 0);
  });

  // Animate the Mission Passed Image when it renders
  useGSAP(() => {
    if (isSubmitted && missionPassedRef.current) {
      const tl = gsap.timeline();
      
      // Heavy cinematic impact (GTA IV style)
      tl.fromTo(missionPassedRef.current, 
        { scale: 2.5, opacity: 0, filter: 'brightness(3) blur(10px)', y: -50 },
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'brightness(1) blur(0px)',
          y: 0,
          duration: 0.6, 
          ease: "expo.out", 
          force3D: true,
          delay: 0.2 // Wait a tiny bit for the form to fade
        }
      );

      // Subtle continuous heartbeat pulse after the hit
      tl.to(missionPassedRef.current, {
        scale: 1.05,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    }
  }, { dependencies: [isSubmitted] });

  return (
    <section ref={containerRef} className="level-section relative w-full h-screen bg-[#020202] flex items-center justify-center overflow-hidden transition-all duration-[4000ms] contain-strict">
      
      <div className="absolute inset-0 gta-noise z-0 pointer-events-none" />
      <div className="absolute inset-0 gta-vignette opacity-100 z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-2xl px-8 flex flex-col items-center">
        
        <div className="w-full flex flex-col gap-8 relative z-20" ref={formRef}>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <div className="text-center mb-8">
              <h2 className="gta-title text-7xl text-gta-sepia tracking-tighter">CONTACT_</h2>
              <p className="gta-hud text-gta-brown mt-2">SECURE CONNECTION ESTABLISHED</p>
            </div>

            <input 
              type="text" 
              placeholder="YOUR ALIAS" 
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gta-brown/50 py-4 gta-hud text-gta-sepia placeholder:text-gta-brown focus:outline-none focus:border-gta-sepia transition-colors"
              required
            />
            <input 
              type="email" 
              placeholder="CONTACT EMAIL" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gta-brown/50 py-4 gta-hud text-gta-sepia placeholder:text-gta-brown focus:outline-none focus:border-gta-sepia transition-colors"
              required
            />
            <textarea 
              placeholder="CONTRACT DETAILS" 
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gta-brown/50 py-4 gta-hud text-gta-sepia placeholder:text-gta-brown focus:outline-none focus:border-gta-sepia transition-colors resize-none"
              required
            />

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`group flex items-center justify-center gap-4 bg-[#111] border-2 border-[#333] hover:border-gta-sepia py-6 px-10 mt-8 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span ref={starRef} className="text-gta-red text-2xl group-hover:scale-125 transition-transform">★</span>
              <span className="gta-title text-3xl text-gta-sepia group-hover:text-gta-red transition-colors">
                {isSubmitting ? 'TRANSMITTING...' : 'EXECUTE CONTRACT'}
              </span>
            </button>
          </form>
        </div>

        {isSubmitted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <img 
              ref={missionPassedRef}
              src="/5d0g3g.png" 
              alt="Mission Passed Respect +" 
              className="w-[90vw] md:w-[800px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] will-change-transform"
            />
          </div>
        )}
      </div>
    </section>
  );
}
